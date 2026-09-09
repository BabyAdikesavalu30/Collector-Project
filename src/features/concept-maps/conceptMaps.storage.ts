/**
 * Concept Maps Storage Layer
 * Manages local persistence for explored nodes, progress, and bookmarks.
 * Safeguards against corrupted state.
 */

import { storage, STORAGE_KEYS } from '../../storage/asyncStorage';
import { ConceptMapProgress } from './conceptMaps.types';

export async function getAllConceptMapProgress(): Promise<Record<string, ConceptMapProgress>> {
  try {
    const raw = await storage.getItem<Record<string, ConceptMapProgress>>(
      STORAGE_KEYS.CONCEPT_MAPS_PROGRESS
    );
    if (!raw || typeof raw !== 'object') {
      return {};
    }
    return raw;
  } catch (error) {
    console.warn('[CONCEPT_MAPS_STORAGE] Failed to load progress:', error);
    return {};
  }
}

export async function getConceptMapProgress(mapId: string): Promise<ConceptMapProgress | null> {
  if (!mapId) return null;
  const all = await getAllConceptMapProgress();
  return all[mapId] || null;
}

export async function saveConceptMapProgress(progress: ConceptMapProgress): Promise<boolean> {
  if (!progress || !progress.mapId) return false;
  try {
    const all = await getAllConceptMapProgress();
    all[progress.mapId] = progress;
    await storage.setItem(STORAGE_KEYS.CONCEPT_MAPS_PROGRESS, all);
    return true;
  } catch (error) {
    console.warn('[CONCEPT_MAPS_STORAGE] Failed to save progress:', error);
    return false;
  }
}

export async function resetConceptMapProgress(mapId: string): Promise<boolean> {
  if (!mapId) return false;
  try {
    const all = await getAllConceptMapProgress();
    if (all[mapId]) {
      // Keep completion and bookmark flags, reset explored nodes
      all[mapId] = {
        ...all[mapId],
        exploredNodeIds: [],
        progressPercent: 0,
        status: all[mapId].status === 'completed' ? 'completed' : 'not_started',
        lastSelectedNodeId: undefined,
      };
      await storage.setItem(STORAGE_KEYS.CONCEPT_MAPS_PROGRESS, all);
    }
    return true;
  } catch (error) {
    console.warn('[CONCEPT_MAPS_STORAGE] Failed to reset progress:', error);
    return false;
  }
}

export async function getAllBookmarks(): Promise<string[]> {
  try {
    const raw = await storage.getItem<string[]>(STORAGE_KEYS.CONCEPT_MAPS_BOOKMARKS);
    if (!Array.isArray(raw)) {
      return [];
    }
    return raw;
  } catch (error) {
    console.warn('[CONCEPT_MAPS_STORAGE] Failed to load bookmarks:', error);
    return [];
  }
}

export async function toggleBookmark(mapId: string): Promise<boolean> {
  if (!mapId) return false;
  try {
    const bookmarks = await getAllBookmarks();
    const set = new Set(bookmarks);
    let nowBookmarked = false;

    if (set.has(mapId)) {
      set.delete(mapId);
      nowBookmarked = false;
    } else {
      set.add(mapId);
      nowBookmarked = true;
    }

    const updated = Array.from(set);
    await storage.setItem(STORAGE_KEYS.CONCEPT_MAPS_BOOKMARKS, updated);

    // Also update bookmark flag in progress record if it exists
    const progress = await getConceptMapProgress(mapId);
    if (progress) {
      progress.bookmarked = nowBookmarked;
      await saveConceptMapProgress(progress);
    }

    return nowBookmarked;
  } catch (error) {
    console.warn('[CONCEPT_MAPS_STORAGE] Failed to toggle bookmark:', error);
    return false;
  }
}
