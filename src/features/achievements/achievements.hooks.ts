/**
 * Achievements Feature Hooks
 * Provides reactive state management for the badge collection gallery,
 * filter toggles, selected badge detail, and pull-to-refresh.
 */

import { useState, useEffect, useCallback, useMemo } from 'react';
import {
  Achievement,
  AchievementSummary,
  AchievementStatus,
} from './achievements.types';
import {
  evaluateAndSyncAchievements,
} from './achievements.storage';
import {
  filterAchievements,
} from './achievements.engine';

export function useAchievements() {
  const [allAchievements, setAllAchievements] = useState<Achievement[]>([]);
  const [summary, setSummary] = useState<AchievementSummary | null>(null);
  const [nextBadge, setNextBadge] = useState<Achievement | null>(null);
  const [recentUnlocks, setRecentUnlocks] = useState<Achievement[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const [statusFilter, setStatusFilter] = useState<'all' | 'unlocked' | 'in_progress' | 'locked'>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [selectedBadge, setSelectedBadge] = useState<Achievement | null>(null);

  const loadData = useCallback(async () => {
    try {
      const data = await evaluateAndSyncAchievements();
      setAllAchievements(data.achievements);
      setSummary(data.summary);
      setNextBadge(data.nextBadge);
      setRecentUnlocks(data.recentUnlocks);
    } catch (error) {
      console.warn('[useAchievements] Failed to evaluate achievements:', error);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const refresh = useCallback(async () => {
    setIsRefreshing(true);
    await loadData();
  }, [loadData]);

  const filteredAchievements = useMemo(() => {
    return filterAchievements(allAchievements, statusFilter, categoryFilter);
  }, [allAchievements, statusFilter, categoryFilter]);

  const selectBadge = useCallback((badge: Achievement | null) => {
    setSelectedBadge(badge);
  }, []);

  return {
    achievements: filteredAchievements,
    allAchievements,
    summary,
    nextBadge,
    recentUnlocks,
    statusFilter,
    categoryFilter,
    selectedBadge,
    isLoading,
    isRefreshing,
    setStatusFilter,
    setCategoryFilter,
    selectBadge,
    refresh,
  };
}
