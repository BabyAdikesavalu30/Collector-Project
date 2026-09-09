/**
 * Science Passport — Collection Progress Helpers
 * Reads collection progress from the existing collections feature.
 * If no dedicated collections storage exists, returns safe defaults.
 */

import { storage, STORAGE_KEYS } from '../../storage/asyncStorage';

interface CollectionProgressData {
  completedCount: number;
  totalCount: number;
}

// Total number of science collections in the app
const TOTAL_COLLECTIONS = 10;

/**
 * Attempts to read collection progress from AsyncStorage.
 * Falls back to a safe default if collections storage doesn't exist yet.
 */
export async function getAllCollectionProgress(): Promise<CollectionProgressData> {
  try {
    // Try reading from the collections progress key
    const data = await storage.getItem<Record<string, { status?: string }>>(
      STORAGE_KEYS.COLLECTIONS_PROGRESS
    );

    if (data && typeof data === 'object') {
      const entries = Object.values(data);
      const completedCount = entries.filter(
        (p) => p && typeof p === 'object' && p.status === 'completed'
      ).length;

      return {
        completedCount,
        totalCount: TOTAL_COLLECTIONS,
      };
    }

    return { completedCount: 0, totalCount: TOTAL_COLLECTIONS };
  } catch {
    return { completedCount: 0, totalCount: TOTAL_COLLECTIONS };
  }
}
