/**
 * Achievements Feature Storage
 * Persists which badges have been unlocked and when, and recomputes the
 * unlocked set from current local data so badges unlock retroactively.
 */

import { storage, STORAGE_KEYS } from '../../storage/asyncStorage';
import { AchievementBadgeId, AchievementInput, UnlockedAchievement } from './achievements.types';
import { evaluateUnlockedBadges } from './achievements.engine';

export const ACHIEVEMENTS_KEY = STORAGE_KEYS.ACHIEVEMENTS_UNLOCKED;

/**
 * Returns badgeId -> unlockedAt map of previously persisted unlocks.
 */
export async function getUnlockedAchievements(): Promise<Record<string, number>> {
  try {
    const data = await storage.getItem<Record<string, number>>(ACHIEVEMENTS_KEY);
    return data && typeof data === 'object' ? data : {};
  } catch {
    return {};
  }
}

/**
 * Persists the unlocked-at timestamps for any newly satisfied badges.
 * Existing timestamps are preserved (a badge is only stamped once).
 */
export async function persistUnlockedAchievements(
  badgeIds: AchievementBadgeId[],
  now: number = Date.now()
): Promise<UnlockedAchievement[]> {
  const existing = await getUnlockedAchievements();
  let changed = false;
  badgeIds.forEach((id) => {
    if (existing[id] === undefined) {
      existing[id] = now;
      changed = true;
    }
  });
  if (changed) {
    await storage.setItem(ACHIEVEMENTS_KEY, existing);
  }
  return Object.entries(existing)
    .map(([badgeId, unlockedAt]) => ({ badgeId: badgeId as AchievementBadgeId, unlockedAt }))
    .sort((a, b) => b.unlockedAt - a.unlockedAt);
}

/**
 * Recomputes the full unlocked set from live data and persists any new
 * unlocks. Returns every unlocked achievement, most recent first.
 */
export async function recomputeAndPersistAchievements(
  input: AchievementInput
): Promise<UnlockedAchievement[]> {
  const satisfied = evaluateUnlockedBadges(input);
  return persistUnlockedAchievements(satisfied);
}

/**
 * Returns the most recently unlocked achievement, or null when none yet.
 * Used to feed the Home dashboard's recent-achievement card.
 */
export async function getMostRecentAchievement(): Promise<UnlockedAchievement | null> {
  const all = await getUnlockedAchievements();
  const entries = Object.entries(all).sort((a, b) => b[1] - a[1]);
  if (entries.length === 0) return null;
  return { badgeId: entries[0][0] as AchievementBadgeId, unlockedAt: entries[0][1] };
}