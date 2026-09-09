/**
 * Activity Feature Types
 * Lightweight frontend activity/event layer. Every meaningful student action
 * (quiz completed, riddle solved, game finished, mystery solved, fact
 * discovered, mission completed, achievement unlocked, certificate earned)
 * is recorded here once and reused by XP, missions, profile statistics,
 * points history, explore recommendations, and notifications.
 *
 * No fake network, no backend — local and synchronous.
 */

export type ActivityEventType =
  | 'quiz_completed'
  | 'riddle_completed'
  | 'game_completed'
  | 'mystery_completed'
  | 'fact_discovered'
  | 'challenge_completed'
  | 'mission_completed'
  | 'achievement_unlocked'
  | 'certificate_earned'
  | 'micro_lesson_completed'
  | 'concept_map_completed'
  | 'concept_node_explored'
  | 'experiment_completed';

/**
 * Source payload handed to recordActivity by feature completion points.
 * `dedupeKey` must be stable per logical completion so the same event can
 * never be recorded twice (e.g. navigating back to a results screen).
 */
export interface ActivityEventInput {
  type: ActivityEventType;
  /** Stable unique key for this specific completion instance. */
  dedupeKey: string;
  title: string;
  titleTa: string;
  subtitle?: string;
  subtitleTa?: string;
  /** Optional amount earned by the activity itself (legacy points). */
  pointsEarned?: number;
  /** Optional XP earned for this activity (defaults to XPSource amount). */
  xpEarned?: number;
  /** Optional extra structured metadata for missions / recommendations. */
  metadata?: Record<string, string | number | boolean | undefined>;
  timestamp?: number;
}

export interface ActivityHistoryItem {
  id: string;
  type: ActivityEventType;
  title: string;
  titleTa: string;
  subtitle?: string;
  subtitleTa?: string;
  timestamp: number;
  xpEarned: number;
  pointsEarned: number;
  metadata?: Record<string, string | number | boolean | undefined>;
}

export type ActivityTypeCounts = Partial<Record<ActivityEventType, number>>;

/** Per-day activity tally used by missions and points history. */
export interface DailyActivitySummary {
  dateKey: string; // YYYY-MM-DD local
  total: number;
  counts: ActivityTypeCounts;
}

/** One-line activity history list entry for Profile / Rewards. */
export interface RecentActivityItem {
  id: string;
  type: ActivityEventType;
  title: string;
  titleTa: string;
  timestamp: number;
  xpEarned: number;
}