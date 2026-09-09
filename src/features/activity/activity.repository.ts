/**
 * Activity Feature Repository
 * Single entry point for recording student activity. Recording an activity
 * event atomically:
 *   1. writes the event to the unified activity history (deduped),
 *   2. awards the matching XP transaction (same dedupe key),
 *   3. returns the stored item (or null when it was a duplicate).
 *
 * Missions, profile stats, explore recommendations, points history, and
 * notifications all read from this shared history — no parallel histories.
 */

import { ActivityEventInput, ActivityHistoryItem, ActivityTypeCounts, ActivityEventType } from './activity.types';
import { getActivityHistory, insertActivityItem } from './activity.storage';
import { recordXp, getXpTransactions, XPSource, XP_AMOUNTS } from '../xp';
import { calculateStreak, STREAK_ELIGIBLE_ACTIVITY_TYPES } from '../streaks';

/** Maps activity event types to their XP ledger source. */
const ACTIVITY_XP_SOURCE: Partial<Record<ActivityEventType, XPSource>> = {
  quiz_completed: 'quiz_completion',
  riddle_completed: 'riddle_completion',
  game_completed: 'game_completion',
  mystery_completed: 'mystery_completion',
  fact_discovered: 'fact_discovery',
  challenge_completed: 'challenge_completion',
  achievement_unlocked: 'achievement',
  certificate_earned: 'certificate',
  micro_lesson_completed: 'micro_lesson_completion',
  concept_map_completed: 'concept_map_completion',
  experiment_completed: 'experiment_completion',
};

/**
 * Records an activity event and its XP reward atomically.
 * Returns the history item, or null when the same dedupe key already exists.
 */
export async function recordActivity(
  input: ActivityEventInput
): Promise<ActivityHistoryItem | null> {
  const timestamp = input.timestamp ?? Date.now();

  // Award XP with the same dedupe key so one logical event = one XP reward.
  // Events with no ledger source (e.g. mission_completed, whose XP is
  // awarded explicitly at claim time) or explicit zero XP are skipped.
  const source = ACTIVITY_XP_SOURCE[input.type];
  const amount = input.xpEarned ?? (source ? XP_AMOUNTS[source] : 0);

  const item = await insertActivityItem({ ...input, timestamp, xpEarned: amount });
  if (!item) return null;

  if (source && amount !== 0) {
    await recordXp({
      source,
      amount,
      description: input.title,
      descriptionTa: input.titleTa,
      icon: input.metadata?.icon ? String(input.metadata.icon) : undefined,
      activityId: item.id,
      timestamp,
      dedupeKey: input.dedupeKey,
      metadata: input.metadata,
    });
  }

  // 1. Notify Daily Goal service (deduped by item identity)
  try {
    const { dailyGoalService } = await import('../daily-goal');
    await dailyGoalService.onActivityCompleted(item);
  } catch (err) {
    // Resilient isolation: failure in daily goal never corrupts core activity record
    console.warn('[ActivityRepository] Daily goal sync deferred:', err);
  }

  // 2. Trigger appropriate celebration for the completed activity
  try {
    const { celebrationService } = await import('../celebration');
    const meta = input.metadata || {};
    switch (input.type) {
      case 'micro_lesson_completed':
        await celebrationService.triggerMicroLessonComplete(input.title, amount);
        break;
      case 'concept_map_completed':
        await celebrationService.triggerConceptMapComplete(input.title, amount);
        break;
      case 'experiment_completed':
        await celebrationService.triggerExperimentComplete(input.title, amount);
        break;
      case 'mystery_completed':
        await celebrationService.triggerMysterySolved(input.title, Number(meta.score) || 100);
        break;
      case 'riddle_completed':
        await celebrationService.triggerRiddleSetComplete(Number(meta.solved) || 10);
        break;
      case 'game_completed':
        await celebrationService.triggerGameLevelComplete(
          String(meta.gameId || 'game'),
          Number(meta.levelIndex !== undefined ? Number(meta.levelIndex) + 1 : 1)
        );
        break;
      default:
        break;
    }
  } catch {
    // Celebration failure isolation
  }

  return item;
}

/** Latest activity items (newest first). */
export async function getRecentActivity(limit: number = 20): Promise<ActivityHistoryItem[]> {
  const history = await getActivityHistory();
  return history.slice(0, limit);
}

/** Per-type counts across the full history. */
export async function getActivityCounts(): Promise<ActivityTypeCounts> {
  const history = await getActivityHistory();
  return countActivityTypes(history);
}

/** Pure per-type counting helper (exported for tests). */
export function countActivityTypes(history: ActivityHistoryItem[]): ActivityTypeCounts {
  const counts: ActivityTypeCounts = {};
  for (const item of history) {
    counts[item.type] = (counts[item.type] || 0) + 1;
  }
  return counts;
}

/** Unified daily streak across all qualifying learning activity types. */
export async function getUnifiedStreak(): Promise<ReturnType<typeof calculateStreak>> {
  const history = await getActivityHistory();
  const qualifying = history.filter((h) => STREAK_ELIGIBLE_ACTIVITY_TYPES.includes(h.type));
  return calculateStreak(qualifying.map((h) => h.timestamp));
}

/** Total XP currently in the account (from the XP ledger). */
export async function getTotalXpBalance(): Promise<number> {
  const transactions = await getXpTransactions();
  return transactions.reduce((sum, t) => sum + t.amount, 0);
}

/** Clears all activity data (used on logout / demo reset). */
export async function clearAllActivityData(): Promise<void> {
  const { clearActivityHistory } = await import('./activity.storage');
  await clearActivityHistory();
}