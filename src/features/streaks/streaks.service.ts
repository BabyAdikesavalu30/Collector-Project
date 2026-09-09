/**
 * Streak Feature Service
 * Single canonical service for streaks and activity calendar across Vigyaan.
 * Aggregates canonical activity history, filters by STREAK_ELIGIBLE_ACTIVITY_TYPES,
 * synchronizes with Daily Goal, and computes unified streak and calendar views.
 */

import { getActivityHistory } from '../activity/activity.storage';
import { ActivityHistoryItem } from '../activity/activity.types';
import { loadOrInitializeDailyGoal, DailyGoalWithProgress } from '../daily-goal';
import {
  StreakInfo,
  CalendarDay,
  WeeklyDayInfo,
  MonthlySummary,
  MilestoneStatus,
  DayActivityDetail,
  ConsistencyInsight,
  StreakHubData,
  STREAK_ELIGIBLE_ACTIVITY_TYPES,
} from './streaks.types';
import {
  calculateStreak,
  getTodayKey,
  getStreakDateKey,
  getMonthDays,
  getWeeklyDays,
  calculateMonthlySummary,
  getMilestoneStatuses,
  getConsistencyInsight,
  getDayActivityDetail,
  getMonthName,
  dayDifference,
} from './streaks.engine';

export class StreakService {
  /**
   * Loads and normalizes qualifying learning activities.
   * Filters out corrupt entries, non-finite timestamps, future events,
   * and non-qualifying secondary events.
   */
  private static async getQualifyingActivities(now: Date = new Date()): Promise<ActivityHistoryItem[]> {
    try {
      const history = await getActivityHistory();
      if (!Array.isArray(history)) return [];

      const todayKey = getTodayKey(now);

      return history.filter((item) => {
        if (!item || typeof item !== 'object') return false;
        if (!Number.isFinite(item.timestamp)) return false;
        if (!STREAK_ELIGIBLE_ACTIVITY_TYPES.includes(item.type)) return false;

        const dateKey = getStreakDateKey(item.timestamp);
        // Exclude future events
        if (dayDifference(dateKey, todayKey) < 0) return false;

        return true;
      });
    } catch (error) {
      console.warn('[StreakService] Failed to load activity history:', error);
      return [];
    }
  }

  /**
   * Computes the unified streak across all qualifying learning activities.
   */
  public static async getUnifiedStreak(now: Date = new Date()): Promise<StreakInfo> {
    const activities = await this.getQualifyingActivities(now);
    return calculateStreak(activities.map((a) => a.timestamp), now);
  }

  /**
   * Returns current streak day count.
   */
  public static async getCurrentStreak(now: Date = new Date()): Promise<number> {
    const info = await this.getUnifiedStreak(now);
    return info.currentStreak;
  }

  /**
   * Returns longest historical streak day count.
   */
  public static async getLongestStreak(now: Date = new Date()): Promise<number> {
    const info = await this.getUnifiedStreak(now);
    return info.longestStreak;
  }

  /**
   * Returns sorted array of active YYYY-MM-DD date strings.
   */
  public static async getActiveDates(now: Date = new Date()): Promise<string[]> {
    const info = await this.getUnifiedStreak(now);
    return info.activeDates;
  }

  /**
   * Returns activities completed on a specific calendar date (newest first).
   */
  public static async getDayActivities(dateKey: string): Promise<ActivityHistoryItem[]> {
    const activities = await this.getQualifyingActivities();
    return activities.filter((a) => getStreakDateKey(a.timestamp) === dateKey);
  }

  /**
   * Returns DayActivityDetail for a specific dateKey.
   */
  public static async getDayActivityDetail(
    dateKey: string,
    now: Date = new Date()
  ): Promise<DayActivityDetail> {
    const activities = await this.getQualifyingActivities(now);
    return getDayActivityDetail(dateKey, activities, now);
  }

  /**
   * Returns monthly summary for a specific year and month (1-indexed).
   */
  public static async getMonthlySummary(
    year: number,
    month: number,
    now: Date = new Date()
  ): Promise<MonthlySummary> {
    const activities = await this.getQualifyingActivities(now);
    const streak = calculateStreak(activities.map((a) => a.timestamp), now);
    return calculateMonthlySummary(year, month, streak.activeDates, activities);
  }

  /**
   * Returns weekly preview for the 7 days of the current week.
   */
  public static async getWeeklyPreview(now: Date = new Date()): Promise<WeeklyDayInfo[]> {
    const activities = await this.getQualifyingActivities(now);
    const activeDates = new Set(activities.map((a) => getStreakDateKey(a.timestamp)));
    const actMap = new Map<string, ActivityHistoryItem[]>();
    for (const a of activities) {
      const k = getStreakDateKey(a.timestamp);
      const list = actMap.get(k) || [];
      list.push(a);
      actMap.set(k, list);
    }
    return getWeeklyDays(now, activeDates, actMap);
  }

  /**
   * Returns consistency insight (last 4 weeks average).
   */
  public static async getConsistencyInsight(now: Date = new Date()): Promise<ConsistencyInsight> {
    const info = await this.getUnifiedStreak(now);
    return getConsistencyInsight(info.activeDates, now);
  }

  /**
   * Returns milestone progression statuses.
   */
  public static async getMilestones(now: Date = new Date()): Promise<MilestoneStatus[]> {
    const info = await this.getUnifiedStreak(now);
    return getMilestoneStatuses(info.currentStreak);
  }

  /**
   * Comprehensive Hub Data bundle for the /streak screen.
   */
  public static async getStreakHubData(
    selectedDateKey?: string,
    calendarYear?: number,
    calendarMonth?: number,
    now: Date = new Date()
  ): Promise<StreakHubData> {
    const todayKey = getTodayKey(now);
    const targetDateKey = selectedDateKey || todayKey;

    const currentYear = calendarYear ?? now.getFullYear();
    const currentMonth = calendarMonth ?? (now.getMonth() + 1);

    const activities = await this.getQualifyingActivities(now);
    const streak = calculateStreak(activities.map((a) => a.timestamp), now);
    const activeDateSet = new Set(streak.activeDates);

    // Group activities by date
    const activityMap = new Map<string, ActivityHistoryItem[]>();
    for (const a of activities) {
      const k = getStreakDateKey(a.timestamp);
      const list = activityMap.get(k) || [];
      list.push(a);
      activityMap.set(k, list);
    }

    const calendarDays = getMonthDays(currentYear, currentMonth, activeDateSet, activityMap, now);
    const weeklyPreview = getWeeklyDays(now, activeDateSet, activityMap);
    const monthlySummary = calculateMonthlySummary(currentYear, currentMonth, streak.activeDates, activities);
    const consistencyInsight = getConsistencyInsight(streak.activeDates, now);
    const milestones = getMilestoneStatuses(streak.currentStreak);
    const selectedDayDetail = getDayActivityDetail(targetDateKey, activities, now);

    // Month boundary controls (cannot navigate into future months)
    const isCurrentOrFutureMonth =
      currentYear > now.getFullYear() ||
      (currentYear === now.getFullYear() && currentMonth >= now.getMonth() + 1);

    // Daily Goal snapshot (safe try/catch)
    let dailyGoalSnapshot: DailyGoalWithProgress | null = null;
    try {
      dailyGoalSnapshot = await loadOrInitializeDailyGoal(activities);
    } catch {
      dailyGoalSnapshot = null;
    }

    return {
      streak,
      isTodayActive: activeDateSet.has(todayKey),
      todayKey,
      selectedDateKey: targetDateKey,
      selectedDayDetail,
      calendarMonth: {
        year: currentYear,
        month: currentMonth,
        monthNameEn: getMonthName(currentMonth, 'en'),
        monthNameTa: getMonthName(currentMonth, 'ta'),
        days: calendarDays,
        canGoNext: !isCurrentOrFutureMonth,
        canGoPrev: true,
      },
      weeklyPreview,
      monthlySummary,
      consistencyInsight,
      milestones,
      dailyGoalSnapshot,
      recentActivities: activities.slice(0, 10),
    };
  }
}

export const streakService = StreakService;
