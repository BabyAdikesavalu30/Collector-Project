/**
 * Concept Maps Repository Boundary
 * ConceptMapRepository contract and DemoConceptMapRepository implementation.
 * Integrates with unified activity/XP system and achievements.
 */

import {
  ConceptMap,
  ConceptMapProgress,
  ConceptMapSubjectId,
} from './conceptMaps.types';
import { CONCEPT_MAPS, CONCEPT_MAPS_MAP } from './conceptMaps.data';
import {
  getAllConceptMapProgress,
  getConceptMapProgress,
  saveConceptMapProgress,
  resetConceptMapProgress,
  getAllBookmarks,
  toggleBookmark as toggleBookmarkStorage,
} from './conceptMaps.storage';
import {
  getTodayConceptMap,
  calculateConceptMapProgress,
} from './conceptMaps.engine';
import { recordActivity } from '../activity';

export interface MapCompletionResult {
  ok: boolean;
  xpAwarded: number;
  alreadyCompleted: boolean;
}

export interface ConceptMapRepository {
  getAllMaps(): Promise<ConceptMap[]>;
  getMapById(id: string): Promise<ConceptMap | null>;
  getMapsBySubject(subjectId: ConceptMapSubjectId): Promise<ConceptMap[]>;
  getTodayMap(): Promise<ConceptMap>;
  getAllProgress(): Promise<Record<string, ConceptMapProgress>>;
  getProgress(mapId: string): Promise<ConceptMapProgress | null>;
  saveProgress(progress: ConceptMapProgress): Promise<boolean>;
  resetProgress(mapId: string): Promise<boolean>;
  exploreNode(mapId: string, nodeId: string): Promise<ConceptMapProgress | null>;
  completeMap(mapId: string): Promise<MapCompletionResult>;
  toggleBookmark(mapId: string): Promise<boolean>;
  getBookmarks(): Promise<string[]>;
}

export class DemoConceptMapRepository implements ConceptMapRepository {
  async getAllMaps(): Promise<ConceptMap[]> {
    return CONCEPT_MAPS;
  }

  async getMapById(id: string): Promise<ConceptMap | null> {
    return CONCEPT_MAPS_MAP[id] || null;
  }

  async getMapsBySubject(subjectId: ConceptMapSubjectId): Promise<ConceptMap[]> {
    return CONCEPT_MAPS.filter((m) => m.subject === subjectId);
  }

  async getTodayMap(): Promise<ConceptMap> {
    return getTodayConceptMap(CONCEPT_MAPS);
  }

  async getAllProgress(): Promise<Record<string, ConceptMapProgress>> {
    return getAllConceptMapProgress();
  }

  async getProgress(mapId: string): Promise<ConceptMapProgress | null> {
    return getConceptMapProgress(mapId);
  }

  async saveProgress(progress: ConceptMapProgress): Promise<boolean> {
    return saveConceptMapProgress(progress);
  }

  async resetProgress(mapId: string): Promise<boolean> {
    return resetConceptMapProgress(mapId);
  }

  async exploreNode(mapId: string, nodeId: string): Promise<ConceptMapProgress | null> {
    const map = CONCEPT_MAPS_MAP[mapId];
    if (!map) return null;

    const existing = await getConceptMapProgress(mapId);
    const now = Date.now();
    const currentExplored = new Set(existing?.exploredNodeIds || []);
    currentExplored.add(nodeId);

    const exploredList = Array.from(currentExplored);
    const { progressPercent, isCompleted } = calculateConceptMapProgress(map, exploredList);

    const isNowCompleted = existing?.status === 'completed' || isCompleted;
    const updated: ConceptMapProgress = {
      mapId,
      exploredNodeIds: exploredList,
      progressPercent,
      status: isNowCompleted ? 'completed' : 'in_progress',
      completed: isNowCompleted,
      startedAt: existing?.startedAt || now,
      completedAt: existing?.completedAt || (isCompleted ? now : undefined),
      lastSelectedNodeId: nodeId,
      bookmarked: existing?.bookmarked || false,
    };

    if (isCompleted && existing?.status !== 'completed') {
      await this.completeMap(mapId);
      const afterComplete = await getConceptMapProgress(mapId);
      return afterComplete || updated;
    }

    await saveConceptMapProgress(updated);
    return updated;
  }

  async completeMap(mapId: string): Promise<MapCompletionResult> {
    const map = CONCEPT_MAPS_MAP[mapId];
    if (!map) {
      return { ok: false, xpAwarded: 0, alreadyCompleted: false };
    }

    const currentProgress = await getConceptMapProgress(mapId);
    if (currentProgress && currentProgress.status === 'completed') {
      return { ok: true, xpAwarded: 0, alreadyCompleted: true };
    }

    const now = Date.now();
    // Ensure all node IDs are registered as explored upon explicit completion
    const allNodeIds = map.nodes.map((n) => n.id);

    const updatedProgress: ConceptMapProgress = {
      mapId,
      exploredNodeIds: allNodeIds,
      progressPercent: 100,
      status: 'completed',
      completed: true,
      startedAt: currentProgress?.startedAt || now,
      completedAt: now,
      lastSelectedNodeId: currentProgress?.lastSelectedNodeId || map.nodes[0]?.id,
      bookmarked: currentProgress?.bookmarked || false,
    };

    await saveConceptMapProgress(updatedProgress);

    const xpAmount = map.xpReward || 10;

    // Record via unified activity system (deduped by logical map completion)
    // Downstream Daily Goal, Achievements, and Celebrations are orchestrated centrally
    await recordActivity({
      type: 'concept_map_completed',
      dedupeKey: `concept-map-${map.id}`,
      title: map.title.en,
      titleTa: map.title.ta,
      subtitle: `${map.estimatedMinutes} min concept map`,
      subtitleTa: `${map.estimatedMinutes} நிமிட கருத்து வரைபடம்`,
      xpEarned: xpAmount,
      timestamp: now,
      metadata: {
        mapId: map.id,
        subject: map.subject,
        icon: map.icon,
      },
    });

    // Evaluate achievements for this newly completed map
    try {
      const { evaluateAndSyncAchievements } = await import('../achievements');
      await evaluateAndSyncAchievements();
    } catch {
      // Best-effort
    }

    return { ok: true, xpAwarded: xpAmount, alreadyCompleted: false };
  }

  async toggleBookmark(mapId: string): Promise<boolean> {
    return toggleBookmarkStorage(mapId);
  }

  async getBookmarks(): Promise<string[]> {
    return getAllBookmarks();
  }
}

/** Singleton instance used across the app */
export const conceptMapRepository: ConceptMapRepository = new DemoConceptMapRepository();
