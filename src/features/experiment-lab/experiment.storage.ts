/**
 * Experiment Lab Storage Service
 * Local AsyncStorage persistence for experiment progress, bookmarks, and variable states.
 */

import { storage, STORAGE_KEYS } from '../../storage/asyncStorage';
import { ExperimentProgress } from './experiment.types';

export async function getAllExperimentProgress(): Promise<Record<string, ExperimentProgress>> {
  const stored = await storage.getItem<Record<string, ExperimentProgress>>(
    STORAGE_KEYS.EXPERIMENT_PROGRESS,
    {}
  );
  return stored || {};
}

export async function getExperimentProgress(experimentId: string): Promise<ExperimentProgress | null> {
  const all = await getAllExperimentProgress();
  return all[experimentId] || null;
}

export async function saveExperimentProgress(progress: ExperimentProgress): Promise<void> {
  const all = await getAllExperimentProgress();
  all[progress.experimentId] = progress;
  await storage.setItem(STORAGE_KEYS.EXPERIMENT_PROGRESS, all);
}

export async function getExperimentBookmarks(): Promise<string[]> {
  const stored = await storage.getItem<string[]>(STORAGE_KEYS.EXPERIMENT_BOOKMARKS, []);
  return stored || [];
}

export async function toggleExperimentBookmark(experimentId: string): Promise<boolean> {
  const bookmarks = await getExperimentBookmarks();
  const set = new Set(bookmarks);
  let isBookmarked = false;

  if (set.has(experimentId)) {
    set.delete(experimentId);
    isBookmarked = false;
  } else {
    set.add(experimentId);
    isBookmarked = true;
  }

  await storage.setItem(STORAGE_KEYS.EXPERIMENT_BOOKMARKS, Array.from(set));

  // Also update progress item if it exists
  const progress = await getExperimentProgress(experimentId);
  if (progress) {
    await saveExperimentProgress({ ...progress, bookmarked: isBookmarked });
  }

  return isBookmarked;
}

export async function resetExperimentProgress(experimentId: string): Promise<void> {
  const all = await getAllExperimentProgress();
  if (all[experimentId]) {
    all[experimentId] = {
      ...all[experimentId],
      status: 'not_started',
      completed: false,
      completedAt: undefined,
      reflectionAnswered: false,
    };
    await storage.setItem(STORAGE_KEYS.EXPERIMENT_PROGRESS, all);
  }
}
