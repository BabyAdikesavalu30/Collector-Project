/**
 * Activity Feature Storage
 * Persists the unified activity history (newest first). Stored JSON is
 * treated as untrusted: malformed entries are dropped, never crash.
 *
 * Phase 54: `insertActivityItem` uses a module-level write queue so that
 * concurrent calls (e.g. Promise.all) are serialized — preventing the
 * read-check-write race that would allow duplicate dedupeKeys to be stored.
 */

import { storage, STORAGE_KEYS } from '../../storage/asyncStorage';
import { ActivityHistoryItem, ActivityEventInput } from './activity.types';

export const ACTIVITY_HISTORY_KEY = STORAGE_KEYS.ACTIVITY_HISTORY;

/** Cap so the local history can never grow unbounded. */
export const ACTIVITY_HISTORY_LIMIT = 500;

export function createActivityId(dedupeKey: string): string {
  return `act-${dedupeKey}`;
}

function isHistoryItem(value: unknown): value is ActivityHistoryItem {
  if (!value || typeof value !== 'object') return false;
  const item = value as Partial<ActivityHistoryItem>;
  return (
    typeof item.id === 'string' &&
    typeof item.type === 'string' &&
    typeof item.title === 'string' &&
    typeof item.timestamp === 'number'
  );
}

export async function getActivityHistory(): Promise<ActivityHistoryItem[]> {
  try {
    const list = await storage.getItem<ActivityHistoryItem[]>(ACTIVITY_HISTORY_KEY);
    if (!Array.isArray(list)) return [];
    const valid = list.filter(isHistoryItem);
    return [...valid].sort((a, b) => b.timestamp - a.timestamp);
  } catch {
    return [];
  }
}

/**
 * Write queue: ensures only one insertActivityItem runs at a time.
 * This prevents the read-check-write race condition under concurrent calls.
 */
let writeQueue: Promise<unknown> = Promise.resolve();

/**
 * Inserts an event only when no item with the same id exists yet
 * (dedupe by stable dedupeKey). Returns null when already recorded.
 * Serialized through a write queue to prevent concurrent duplicate inserts.
 */
export async function insertActivityItem(
  input: ActivityEventInput
): Promise<ActivityHistoryItem | null> {
  const result = writeQueue.then(async (): Promise<ActivityHistoryItem | null> => {
    const id = createActivityId(input.dedupeKey);
    const existing = await getActivityHistory();
    if (existing.some((item) => item.id === id)) {
      return null;
    }

    const timestamp = input.timestamp ?? Date.now();
    const item: ActivityHistoryItem = {
      id,
      type: input.type,
      title: input.title,
      titleTa: input.titleTa,
      subtitle: input.subtitle,
      subtitleTa: input.subtitleTa,
      timestamp,
      xpEarned: input.xpEarned ?? 0,
      pointsEarned: input.pointsEarned ?? 0,
      metadata: input.metadata,
    };

    const next = [item, ...existing].slice(0, ACTIVITY_HISTORY_LIMIT);
    await storage.setItem(ACTIVITY_HISTORY_KEY, next);
    return item;
  });
  // Chain the queue forward; suppress errors so they don't block subsequent inserts
  writeQueue = result.catch(() => null);
  return result;
}

/** Clears the activity history (used on logout / demo reset). */
export async function clearActivityHistory(): Promise<void> {
  await storage.removeItem(ACTIVITY_HISTORY_KEY);
}