/**
 * Daily Goal Feature Storage / Repository
 * Persists daily goal state using the centralized AsyncStorage architecture.
 * Only the claim state and completed activity IDs are stored; progress is derived.
 */

import { storage, STORAGE_KEYS } from '../../storage/asyncStorage';
import { ActivityHistoryItem, recordActivity } from '../activity';
import { recordXp } from '../xp';
import {
  DailyGoalState,
  DailyGoalDefinition,
  DailyGoalWithProgress,
  DAILY_GOAL_DEFINITIONS,
} from './dailyGoal.types';
import {
  getDailyGoalDateKey,
  pickDailyGoal,
  createDailyGoalState,
  validateDailyGoalState,
  computeDailyGoalProgress,
  evaluateGoalStatus,
  getDailyGoalClaimKey,
  getActivityIdentityKey,
  isCountedActivityType,
} from './dailyGoal.engine';

export const DAILY_GOAL_STATE_KEY = STORAGE_KEYS.DAILY_GOAL_STATE || '@vigyaan/daily_goal_state';

const EMPTY_STATE: DailyGoalState = {
  dateKey: '',
  goalId: '',
  targetCount: 0,
  completedCount: 0,
  status: 'active',
  completedActivityIds: [],
  rewardClaimed: false,
  createdAt: 0,
  completedAt: null,
  claimedAt: null,
};

export async function getDailyGoalState(): Promise<DailyGoalState | null> {
  try {
    const data = await storage.getItem<DailyGoalState>(DAILY_GOAL_STATE_KEY);
    if (!data || !validateDailyGoalState(data)) {
      return null;
    }
    return { ...data, completedActivityIds: [...data.completedActivityIds] };
  } catch {
    return null;
  }
}

export async function saveDailyGoalState(state: DailyGoalState): Promise<boolean> {
  try {
    await storage.setItem(DAILY_GOAL_STATE_KEY, state);
    return true;
  } catch {
    return false;
  }
}

export async function clearDailyGoalState(): Promise<void> {
  await storage.removeItem(DAILY_GOAL_STATE_KEY);
}

/**
 * Loads or initializes today's daily goal state.
 * Handles day rollover by generating a new deterministic goal.
 */
export async function loadOrInitializeDailyGoal(
  history: ActivityHistoryItem[],
  now: Date = new Date()
): Promise<DailyGoalWithProgress> {
  const todayKey = getDailyGoalDateKey(now.getTime());
  const stored = await getDailyGoalState();

  let state: DailyGoalState;

  if (stored && stored.dateKey === todayKey) {
    state = stored;
  } else {
    state = createDailyGoalState(todayKey, now.getTime());
    await saveDailyGoalState(state);
  }

  const definition = DAILY_GOAL_DEFINITIONS.find((d) => d.id === state.goalId) || DAILY_GOAL_DEFINITIONS[0];
  const progress = computeDailyGoalProgress(state, history, definition, now);
  const status = evaluateGoalStatus(progress, state.status);

  const todayItems = history.filter((h) => getDailyGoalDateKey(h.timestamp) === todayKey);
  const uniqueIdentities = todayItems.filter((h) => isCountedActivityType(h.type)).map(getActivityIdentityKey);
  const allCompletedIds = Array.from(new Set([...state.completedActivityIds, ...uniqueIdentities]));

  const updatedState: DailyGoalState = {
    ...state,
    completedCount: progress.current,
    completedActivityIds: allCompletedIds,
    status,
    completedAt: progress.completed && state.status !== 'completed' ? now.getTime() : state.completedAt,
  };

  await saveDailyGoalState(updatedState);

  return {
    definition,
    progress,
    status,
    completedActivityIds: [...updatedState.completedActivityIds],
    rewardClaimed: updatedState.rewardClaimed,
    completedAt: updatedState.completedAt,
    claimedAt: updatedState.claimedAt,
  };
}

/**
 * Records a newly completed activity toward the daily goal.
 * Returns updated progress if the activity was new and counted.
 */
export async function recordDailyGoalActivity(
  activityItem: ActivityHistoryItem,
  history: ActivityHistoryItem[],
  now: Date = new Date()
): Promise<DailyGoalWithProgress | null> {
  const todayKey = getDailyGoalDateKey(now.getTime());
  const state = await getDailyGoalState();

  if (!state || state.dateKey !== todayKey) {
    return loadOrInitializeDailyGoal(history, now);
  }

  if (state.status === 'claimed') {
    return buildDailyGoalWithProgress(state, history, now);
  }

  const definition = DAILY_GOAL_DEFINITIONS.find((d) => d.id === state.goalId) || DAILY_GOAL_DEFINITIONS[0];

  const identityKey = getActivityIdentityKey(activityItem);
  if (state.completedActivityIds.includes(identityKey)) {
    return buildDailyGoalWithProgress(state, history, now);
  }

  const newCompletedIds = [...state.completedActivityIds, identityKey];
  const progress = computeDailyGoalProgress({ ...state, completedActivityIds: newCompletedIds }, history, definition, now);
  const status = evaluateGoalStatus(progress, state.status);

  const completedAt = progress.completed && state.status !== 'completed' ? now.getTime() : state.completedAt;

  const updatedState: DailyGoalState = {
    ...state,
    completedCount: progress.current,
    completedActivityIds: newCompletedIds,
    status,
    completedAt,
  };

  await saveDailyGoalState(updatedState);

  // Trigger celebration when daily goal becomes completed
  if (progress.completed && state.status !== 'completed') {
    try {
      const { celebrationService } = await import('../celebration');
      await celebrationService.triggerDailyGoalComplete(definition.reward.xp, definition.reward.points);
    } catch {
      // Best effort celebration
    }
  }

  return buildDailyGoalWithProgress(updatedState, history, now);
}

function buildDailyGoalWithProgress(
  state: DailyGoalState,
  history: ActivityHistoryItem[],
  now: Date
): DailyGoalWithProgress {
  const definition = DAILY_GOAL_DEFINITIONS.find((d) => d.id === state.goalId) || DAILY_GOAL_DEFINITIONS[0];
  const progress = computeDailyGoalProgress(state, history, definition, now);
  const status = evaluateGoalStatus(progress, state.status);
  return {
    definition,
    progress,
    status,
    completedActivityIds: [...state.completedActivityIds],
    rewardClaimed: state.rewardClaimed,
    completedAt: state.completedAt,
    claimedAt: state.claimedAt,
  };
}

/**
 * Claims the daily goal reward.
 * Awards XP and points through the shared infrastructure exactly once.
 */
export async function claimDailyGoalReward(
  goal: DailyGoalWithProgress,
  history: ActivityHistoryItem[],
  now: Date = new Date()
): Promise<{ ok: boolean; reason?: 'not_completed' | 'already_claimed'; claimedAt?: number }> {
  if (goal.status !== 'completed') {
    return { ok: false, reason: 'not_completed' };
  }
  if (goal.rewardClaimed) {
    return { ok: false, reason: 'already_claimed' };
  }

  const state = await getDailyGoalState();
  if (!state || state.rewardClaimed) {
    return { ok: false, reason: 'already_claimed' };
  }

  const claimedAt = now.getTime();
  const claimKey = getDailyGoalClaimKey(state.dateKey);

  await recordXp({
    source: 'daily_mission',
    amount: goal.definition.reward.xp,
    description: goal.definition.title,
    descriptionTa: goal.definition.titleTa,
    icon: '🎯',
    dedupeKey: `daily-goal-reward-${claimKey}`,
    timestamp: claimedAt,
    metadata: { dailyGoalId: goal.definition.id },
  });

  await recordActivity({
    type: 'mission_completed',
    dedupeKey: `daily-goal-claim-${claimKey}`,
    title: goal.definition.title,
    titleTa: goal.definition.titleTa,
    subtitle: 'Daily Goal reward claimed',
    subtitleTa: 'தின இலக்கு வெகுமதி பெறப்பட்டது',
    pointsEarned: goal.definition.reward.points,
    xpEarned: 0,
    timestamp: claimedAt,
    metadata: { dailyGoalId: goal.definition.id, kind: 'daily_goal' },
  });

  const updatedState: DailyGoalState = {
    ...state,
    rewardClaimed: true,
    status: 'claimed',
    claimedAt,
  };

  await saveDailyGoalState(updatedState);

  return { ok: true, claimedAt };
}