/**
 * Streak & Activity Calendar Feature Types
 * Strongly-typed models for student streak tracking, calendar visualizer,
 * day details, monthly/weekly aggregates, and milestone progression.
 */

import { ActivityEventType, ActivityHistoryItem } from '../activity/activity.types';
import { DailyGoalWithProgress } from '../daily-goal/dailyGoal.types';
import { AchievementBadgeId } from '../achievements/achievements.types';

/**
 * Qualifying learning and play activity types that count toward an active day.
 * Excludes secondary reward claims (achievements, certificates, missions).
 */
export const STREAK_ELIGIBLE_ACTIVITY_TYPES: ActivityEventType[] = [
  'quiz_completed',
  'riddle_completed',
  'game_completed',
  'mystery_completed',
  'fact_discovered',
  'challenge_completed',
  'micro_lesson_completed',
  'concept_map_completed',
  'concept_node_explored',
  'experiment_completed',
];

/** Core streak state representation */
export interface StreakInfo {
  currentStreak: number;
  longestStreak: number;
  lastActiveDate: string | null; // YYYY-MM-DD local
  /** Sorted unique activity date keys (ascending) */
  activeDates: string[];
}

/** Individual calendar day model */
export interface CalendarDay {
  dateKey: string; // YYYY-MM-DD
  dayNumber: number; // 1-31
  month: number; // 1-12
  year: number;
  dayOfWeek: number; // 0 = Mon, 1 = Tue, ..., 6 = Sun
  isCurrentMonth: boolean;
  isToday: boolean;
  isFuture: boolean;
  isActive: boolean;
  activityCount: number;
  activities: ActivityHistoryItem[];
}

/** Weekly preview day item (Mon..Sun) */
export interface WeeklyDayInfo {
  dateKey: string;
  dayNameEn: string;
  dayNameTa: string;
  dayShortEn: string;
  dayShortTa: string;
  dayNumber: number;
  isToday: boolean;
  isFuture: boolean;
  isActive: boolean;
  activityCount: number;
}

/** Monthly summary statistics */
export interface MonthlySummary {
  year: number;
  month: number;
  monthNameEn: string;
  monthNameTa: string;
  activeDaysCount: number;
  totalActivitiesCount: number;
  bestStreakInMonth: number;
}

/** Streak milestone definition */
export interface StreakMilestone {
  days: number;
  titleEn: string;
  titleTa: string;
  icon: string;
  achievementId?: AchievementBadgeId;
}

/** Milestone status for a student */
export interface MilestoneStatus {
  milestone: StreakMilestone;
  isReached: boolean;
  isNext: boolean;
  progressPct: number; // 0-100
  daysRemaining: number;
}

/** Standard streak milestones */
export const STREAK_MILESTONES: StreakMilestone[] = [
  { days: 3, titleEn: '3-Day Streak', titleTa: '3 நாள் தொடர்ச்சி', icon: '🌱', achievementId: 'streak-3' },
  { days: 5, titleEn: '5-Day Streak', titleTa: '5 நாள் தொடர்ச்சி', icon: '🌿', achievementId: 'streak-5' },
  { days: 7, titleEn: '1-Week Champion', titleTa: '1 வார சாதனையாளர்', icon: '🔥' },
  { days: 14, titleEn: '2-Week Master', titleTa: '2 வார மேதை', icon: '⚡' },
  { days: 30, titleEn: 'Monthly Legend', titleTa: 'மாதந்திர சாதனை', icon: '⭐' },
  { days: 60, titleEn: '60-Day Titan', titleTa: '60 நாள் வீரன்', icon: '🌟' },
  { days: 100, titleEn: 'Century Scholar', titleTa: '100 நாள் மேதை', icon: '👑' },
];

/** Detailed day activity payload for day tap popup/card */
export interface DayActivityDetail {
  dateKey: string;
  formattedDateEn: string;
  formattedDateTa: string;
  isToday: boolean;
  isActive: boolean;
  totalActivities: number;
  totalXp: number;
  activities: ActivityHistoryItem[];
}

/** Consistency insight data */
export interface ConsistencyInsight {
  averageDaysPerWeek: number;
  hasEnoughData: boolean;
  messageEn: string;
  messageTa: string;
}

/** Consolidated hub data bundle for the screen */
export interface StreakHubData {
  streak: StreakInfo;
  isTodayActive: boolean;
  todayKey: string;
  selectedDateKey: string;
  selectedDayDetail: DayActivityDetail;
  calendarMonth: {
    year: number;
    month: number;
    monthNameEn: string;
    monthNameTa: string;
    days: CalendarDay[];
    canGoNext: boolean;
    canGoPrev: boolean;
  };
  weeklyPreview: WeeklyDayInfo[];
  monthlySummary: MonthlySummary;
  consistencyInsight: ConsistencyInsight;
  milestones: MilestoneStatus[];
  dailyGoalSnapshot: DailyGoalWithProgress | null;
  recentActivities: ActivityHistoryItem[];
}
