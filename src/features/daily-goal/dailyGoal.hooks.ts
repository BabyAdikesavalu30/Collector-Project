/**
 * Daily Goal Feature Hooks
 * React hooks for consuming the daily goal service in components.
 */

import { useEffect, useState, useCallback } from 'react';
import { DailyGoalWithProgress } from './dailyGoal.types';
import { dailyGoalService } from './dailyGoal.service';
import { ActivityHistoryItem } from '../activity';

export function useDailyGoal() {
  const [goal, setGoal] = useState<DailyGoalWithProgress | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isClaiming, setIsClaiming] = useState(false);

  const loadGoal = useCallback(async () => {
    try {
      setIsLoading(true);
      const todayGoal = await dailyGoalService.getTodayGoal();
      setGoal(todayGoal);
    } catch (error) {
      console.warn('[DailyGoal] Failed to load goal:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadGoal();
  }, [loadGoal]);

  const handleClaim = useCallback(async (): Promise<boolean> => {
    if (!goal || goal.status !== 'completed' || goal.rewardClaimed) return false;

    setIsClaiming(true);
    try {
      const result = await dailyGoalService.claimReward(goal);
      if (result.ok) {
        await loadGoal();
        return true;
      }
      return false;
    } finally {
      setIsClaiming(false);
    }
  }, [goal, loadGoal]);

  const refresh = useCallback(async () => {
    await loadGoal();
  }, [loadGoal]);

  return {
    goal,
    isLoading,
    isClaiming,
    claimReward: handleClaim,
    refresh,
  };
}

export function useDailyGoalActivityListener() {
  const [lastUpdate, setLastUpdate] = useState<number>(0);

  const notifyActivityCompleted = useCallback(async (activityItem: ActivityHistoryItem) => {
    try {
      await dailyGoalService.onActivityCompleted(activityItem);
      setLastUpdate(Date.now());
    } catch (error) {
      console.warn('[DailyGoal] Failed to record activity:', error);
    }
  }, []);

  return { notifyActivityCompleted, lastUpdate };
}