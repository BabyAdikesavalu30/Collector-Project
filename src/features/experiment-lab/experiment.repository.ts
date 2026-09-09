/**
 * Experiment Lab Feature Repository
 * Single point of access for loading experiments, tracking student simulation runs,
 * atomic completion, deduplicated XP awarding, and achievement synchronization.
 */

import { recordActivity } from '../activity';
import { Experiment, ExperimentProgress } from './experiment.types';
import { EXPERIMENTS, getExperimentById } from './experiment.data';
import { pickFeaturedExperiment } from './experiment.engine';
import {
  getAllExperimentProgress,
  getExperimentProgress,
  saveExperimentProgress,
  getExperimentBookmarks,
  toggleExperimentBookmark,
  resetExperimentProgress,
} from './experiment.storage';

export interface ExperimentCompletionResult {
  xpEarned: number;
  newlyCompleted: boolean;
}

export interface ExperimentRepository {
  getAllExperiments(): Promise<Experiment[]>;
  getExperimentById(id: string): Promise<Experiment | null>;
  getFeaturedExperiment(): Promise<Experiment>;
  getExperimentProgress(id: string): Promise<ExperimentProgress | null>;
  getAllProgress(): Promise<Record<string, ExperimentProgress>>;
  updateVariableValues(id: string, variables: Record<string, unknown>): Promise<void>;
  completeExperiment(experiment: Experiment, variables: Record<string, unknown>): Promise<ExperimentCompletionResult>;
  toggleBookmark(id: string): Promise<boolean>;
  getBookmarks(): Promise<string[]>;
  resetProgress(id: string): Promise<void>;
}

export class DemoExperimentRepository implements ExperimentRepository {
  async getAllExperiments(): Promise<Experiment[]> {
    return EXPERIMENTS;
  }

  async getExperimentById(id: string): Promise<Experiment | null> {
    const exp = getExperimentById(id);
    return exp || null;
  }

  async getFeaturedExperiment(): Promise<Experiment> {
    return pickFeaturedExperiment(EXPERIMENTS);
  }

  async getExperimentProgress(id: string): Promise<ExperimentProgress | null> {
    return getExperimentProgress(id);
  }

  async getAllProgress(): Promise<Record<string, ExperimentProgress>> {
    return getAllExperimentProgress();
  }

  async updateVariableValues(id: string, variables: Record<string, unknown>): Promise<void> {
    const existing = await getExperimentProgress(id);
    const bookmarks = await getExperimentBookmarks();
    const isBookmarked = bookmarks.includes(id);

    const updated: ExperimentProgress = existing
      ? {
          ...existing,
          status: existing.completed ? 'completed' : 'in_progress',
          lastRunAt: Date.now(),
          lastVariableValues: variables,
          bookmarked: isBookmarked,
        }
      : {
          experimentId: id,
          status: 'in_progress',
          lastRunAt: Date.now(),
          runCount: 1,
          completed: false,
          bookmarked: isBookmarked,
          lastVariableValues: variables,
        };

    await saveExperimentProgress(updated);
  }

  async completeExperiment(
    experiment: Experiment,
    variables: Record<string, unknown>
  ): Promise<ExperimentCompletionResult> {
    const existing = await getExperimentProgress(experiment.id);
    const bookmarks = await getExperimentBookmarks();
    const isBookmarked = bookmarks.includes(experiment.id);
    const alreadyCompleted = existing?.completed ?? false;

    const now = Date.now();
    const newRunCount = (existing?.runCount ?? 0) + 1;

    // Save progress state
    await saveExperimentProgress({
      experimentId: experiment.id,
      status: 'completed',
      lastRunAt: now,
      runCount: newRunCount,
      completed: true,
      completedAt: existing?.completedAt ?? now,
      bookmarked: isBookmarked,
      lastVariableValues: variables,
      reflectionAnswered: true,
    });

    if (alreadyCompleted) {
      return { xpEarned: 0, newlyCompleted: false };
    }

    // Award +25 XP atomically via central activity system
    const dedupeKey = `experiment:${experiment.id}`;
    const activityItem = await recordActivity({
      type: 'experiment_completed',
      dedupeKey,
      title: experiment.title.en,
      titleTa: experiment.title.ta,
      subtitle: `${experiment.durationMinutes} min simulation · ${experiment.subject.toUpperCase()}`,
      subtitleTa: `${experiment.durationMinutes} நிமிட மாதிரி · ${experiment.subject.toUpperCase()}`,
      xpEarned: experiment.xpReward || 25,
      metadata: {
        experimentId: experiment.id,
        subject: experiment.subject,
        gradeGroup: experiment.gradeGroup,
        icon: experiment.heroAsset || '🧪',
      },
    });

    const xpEarned = activityItem ? activityItem.xpEarned : 0;

    // Evaluate achievements for newly completed experiments only
    if (activityItem) {
      try {
        const { evaluateAndSyncAchievements } = await import('../achievements');
        await evaluateAndSyncAchievements();
      } catch {
        // Best-effort
      }
    }

    return { xpEarned, newlyCompleted: true };
  }

  async toggleBookmark(id: string): Promise<boolean> {
    return toggleExperimentBookmark(id);
  }

  async getBookmarks(): Promise<string[]> {
    return getExperimentBookmarks();
  }

  async resetProgress(id: string): Promise<void> {
    return resetExperimentProgress(id);
  }
}

export const experimentRepository: ExperimentRepository = new DemoExperimentRepository();
