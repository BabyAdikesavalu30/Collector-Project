/**
 * Daily Goal Feature Engine
 * Deterministic goal generation, progress evaluation, and date handling.
 * Pure functions with injectable time for testability.
 */

import { ActivityHistoryItem, ActivityEventType } from '../activity';
import {
  DailyGoalDefinition,
  DailyGoalState,
  DailyGoalProgress,
  DailyGoalStatus,
  DAILY_GOAL_DEFINITIONS,
  COUNTED_ACTIVITY_TYPES,
  getDailyGoalDefinition,
  getDefaultDailyGoal,
} from './dailyGoal.types';

export const DAILY_GOAL_STORAGE_KEY = '@vigyaan/daily_goal_state';

/** Local YYYY-MM-DD key for a timestamp (user's local calendar day). */
export function getDailyGoalDateKey(timestamp: number = Date.now()): string {
  const d = new Date(timestamp);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

/** Deterministically selects today's goal from the definition pool. */
export function pickDailyGoal(dateKey: string): DailyGoalDefinition {
  let hash = 0;
  for (let i = 0; i < dateKey.length; i++) {
    hash = (hash * 31 + dateKey.charCodeAt(i)) & 0xffffffff;
  }
  const index = Math.abs(hash) % DAILY_GOAL_DEFINITIONS.length;
  return DAILY_GOAL_DEFINITIONS[index];
}

/** Builds a fresh DailyGoalState for the given date. */
export function createDailyGoalState(dateKey: string, now: number = Date.now()): DailyGoalState {
  const definition = pickDailyGoal(dateKey);
  return {
    dateKey,
    goalId: definition.id,
    targetCount: definition.targetCount,
    completedCount: 0,
    status: 'active',
    completedActivityIds: [],
    rewardClaimed: false,
    createdAt: now,
    completedAt: null,
    claimedAt: null,
  };
}

/** Validates a stored DailyGoalState for structural integrity. */
export function validateDailyGoalState(value: unknown): value is DailyGoalState {
  if (!value || typeof value !== 'object') return false;
  const s = value as Record<string, unknown>;
  return (
    typeof s.dateKey === 'string' &&
    typeof s.goalId === 'string' &&
    typeof s.targetCount === 'number' &&
    typeof s.completedCount === 'number' &&
    ['active', 'completed', 'claimed'].includes(s.status as string) &&
    Array.isArray(s.completedActivityIds) &&
    typeof s.rewardClaimed === 'boolean' &&
    typeof s.createdAt === 'number' &&
    (s.completedAt === null || typeof s.completedAt === 'number') &&
    (s.claimedAt === null || typeof s.claimedAt === 'number')
  );
}

/** Checks if an activity type counts toward the daily goal. */
export function isCountedActivityType(type: ActivityEventType): boolean {
  return COUNTED_ACTIVITY_TYPES.includes(type);
}

/** Extracts a stable identity key from an activity item for deduplication. */
export function getActivityIdentityKey(item: ActivityHistoryItem): string {
  const meta = item.metadata || {};
  switch (item.type) {
    case 'quiz_completed':
      return `quiz:${meta.quizResultId || item.id}`;
    case 'game_completed':
      return `game:${meta.gameId || ''}:${meta.levelId || ''}`;
    case 'riddle_completed':
      return `riddle:${meta.riddleId || meta.sessionId || item.id}`;
    case 'mystery_completed':
      return `mystery:${meta.caseId || item.id}`;
    case 'fact_discovered':
      return `fact:${meta.factId || item.id}`;
    case 'challenge_completed':
      return `challenge:${meta.challengeId || item.id}`;
    case 'micro_lesson_completed':
      return `micro_lesson:${meta.lessonId || item.id}`;
    case 'concept_map_completed':
      return `concept_map:${meta.mapId || item.id}`;
    case 'experiment_completed':
      return `experiment:${meta.experimentId || item.id}`;
    default:
      return `${item.type}:${item.id}`;
  }
}

/** Computes progress for the daily goal based on activity history. */
export function computeDailyGoalProgress(
  state: DailyGoalState,
  history: ActivityHistoryItem[],
  definition: DailyGoalDefinition,
  now: Date = new Date()
): DailyGoalProgress {
  const todayKey = getDailyGoalDateKey(now.getTime());

  const todayItems = history.filter((h) => getDailyGoalDateKey(h.timestamp) === todayKey);

  const countedItems = todayItems.filter((h) => isCountedActivityType(h.type));

  const uniqueIdentities = new Set<string>();
  for (const item of countedItems) {
    uniqueIdentities.add(getActivityIdentityKey(item));
  }

  const allCompletedIds = new Set([...state.completedActivityIds, ...uniqueIdentities]);
  const current = Math.min(allCompletedIds.size, definition.targetCount);

  return {
    current,
    target: definition.targetCount,
    completed: current >= definition.targetCount,
  };
}

/** Determines if the goal should transition to completed status. */
export function evaluateGoalStatus(
  progress: DailyGoalProgress,
  currentStatus: DailyGoalStatus
): DailyGoalStatus {
  if (currentStatus === 'claimed') return 'claimed';
  if (currentStatus === 'completed') return 'completed';
  return progress.completed ? 'completed' : 'active';
}

/** Creates a stable dedupe key for the daily goal reward claim. */
export function getDailyGoalClaimKey(dateKey: string): string {
  return `daily-goal:${dateKey}`;
}