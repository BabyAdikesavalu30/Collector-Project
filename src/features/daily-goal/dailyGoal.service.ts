/**
 * Daily Goal Feature Service
 * High-level orchestrator for the daily goal experience.
 * Wraps storage + engine + reward logic into a clean async API.
 */

import { ActivityHistoryItem, getActivityHistory } from '../activity';
import { DailyGoalWithProgress } from './dailyGoal.types';
import {
  loadOrInitializeDailyGoal,
  recordDailyGoalActivity,
  claimDailyGoalReward,
  clearDailyGoalState,
} from './dailyGoal.storage';

export interface DailyGoalService {
  getTodayGoal(): Promise<DailyGoalWithProgress>;
  onActivityCompleted(activityItem: ActivityHistoryItem): Promise<DailyGoalWithProgress | null>;
  claimReward(goal: DailyGoalWithProgress): Promise<{ ok: boolean; reason?: string; claimedAt?: number }>;
  reset(): Promise<void>;
}

class DailyGoalServiceImpl implements DailyGoalService {
  async getTodayGoal(): Promise<DailyGoalWithProgress> {
    const history = await getActivityHistory();
    return loadOrInitializeDailyGoal(history);
  }

  async onActivityCompleted(activityItem: ActivityHistoryItem): Promise<DailyGoalWithProgress | null> {
    const history = await getActivityHistory();
    return recordDailyGoalActivity(activityItem, history);
  }

  async claimReward(goal: DailyGoalWithProgress): Promise<{ ok: boolean; reason?: string; claimedAt?: number }> {
    const history = await getActivityHistory();
    return claimDailyGoalReward(goal, history);
  }

  async reset(): Promise<void> {
    await clearDailyGoalState();
  }
}

export const dailyGoalService = new DailyGoalServiceImpl();