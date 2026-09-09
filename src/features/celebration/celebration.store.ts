/**
 * Celebration Store
 * Handles persistence of handled celebration keys for idempotency,
 * preventing duplicate celebrations across remounts and app restarts.
 */

import { storage, STORAGE_KEYS } from '../../storage/asyncStorage';
import { CelebrationStorageState } from './celebration.types';

const STATE_KEY = STORAGE_KEYS.CELEBRATION_STATE;

const DEFAULT_STATE: CelebrationStorageState = {
  handledKeys: [],
  lastCleanupAt: Date.now(),
};

// Max age for handled keys before cleanup (7 days)
const KEY_MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000;

// ============================================================================
// Read
// ============================================================================

export async function getHandledKeys(): Promise<Set<string>> {
  try {  const state = await storage.getItem<CelebrationStorageState>(STATE_KEY);
    if (state && Array.isArray(state.handledKeys)) {
      return new Set(state.handledKeys);
    }
    return new Set();
  } catch {
    return new Set();
  }
}

// ============================================================================
// Write
//============================================================================

export async function markKeyHandled(uniqueKey: string): Promise<void> {
  try {
    const state = await storage.getItem<CelebrationStorageState>(STATE_KEY);
    const current = state && Array.isArray(state.handledKeys) ? state : DEFAULT_STATE;

    if (!current.handledKeys.includes(uniqueKey)) {
      current.handledKeys.push(uniqueKey);
    }

    // Cleanup old keys periodically
    if (Date.now() - current.lastCleanupAt > KEY_MAX_AGE_MS) {
      // Keep only the most recent 200 keys (safe limit)
      current.handledKeys = current.handledKeys.slice(-200);
      current.lastCleanupAt = Date.now();
    }    await storage.setItem(STATE_KEY, current);
  } catch {
    // Silent fail — idempotency is best-effort, not critical
  }
}

export async function isKeyHandled(uniqueKey: string): Promise<boolean> {
  const handled = await getHandledKeys();
  return handled.has(uniqueKey);
}

// ============================================================================
// Bulk Check
//============================================================================

export async function areKeysHandled(keys: string[]): Promise<Set<string>> {
  const handled = await getHandledKeys();
  return new Set(keys.filter((k) => handled.has(k)));
}

// ============================================================================
// Reset (for testing / demo reset)
//============================================================================

export async function clearCelebrationState(): Promise<void> {
  try {
    await storage.setItem(STATE_KEY, DEFAULT_STATE);
  } catch {
    // Silent fail
  }
}
