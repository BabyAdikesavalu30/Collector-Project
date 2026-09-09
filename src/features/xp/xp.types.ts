/**
 * XP Feature Types
 * Strongly typed unified progression currency models.
 */

export type XPSource =
  | 'quiz_completion'
  | 'riddle_completion'
  | 'game_completion'
  | 'mystery_completion'
  | 'fact_discovery'
  | 'challenge_completion'
  | 'daily_mission'
  | 'weekly_mission'
  | 'achievement'
  | 'certificate'
  | 'profile_setup_bonus'
  | 'micro_lesson_completion'
  | 'concept_map_completion'
  | 'experiment_completion'
  | 'spin_wheel';

export interface XPTransaction {
  id: string;
  source: XPSource;
  amount: number;
  /** Human readable description (localized pair). */
  description: string;
  descriptionTa: string;
  /** Optional icon/emoji used by points history rows. */
  icon: string;
  timestamp: number;
  /** Optional id of the activity this transaction is tied to. */
  activityId?: string;
  metadata?: Record<string, string | number | boolean | undefined>;
}

/** Milestone = a rewards goal shown on the Rewards center. */
export interface Milestone {
  id: string;
  xpThreshold: number;
  title: string;
  titleTa: string;
  icon: string;
  /** Optional badge id granted when reached (local label only). */
  badgeLabel: string;
  badgeLabelTa: string;
}

export interface RewardSummary {
  totalXp: number;
  totalEarned: number;
  todayXp: number;
  weekXp: number;
  monthXp: number;
  /** 0–100 progress within the current science level (progress bar basis). */
  levelProgressPercent: number;
  transactions: XPTransaction[];
  /** Newest-first daily grouped view used by points history. */
  dailyGroups: XPDailyGroup[];
}

export interface XPDailyGroup {
  dateKey: string; // YYYY-MM-DD local
  label: string;
  labelTa: string;
  totalXp: number;
  transactions: XPTransaction[];
}