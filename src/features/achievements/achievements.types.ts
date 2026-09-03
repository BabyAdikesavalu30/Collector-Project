/**
 * Achievements Feature Types
 * A small, honest badge system computed entirely from local learning data.
 * No backend, no fake unlocks — every badge is derived from quiz history,
 * quiz stats, and games progress.
 */

import { QuizHistoryEntry, QuizStats } from '../quiz';

export type AchievementBadgeId =
  | 'first-quiz'
  | 'perfect-score'
  | 'streak-3'
  | 'streak-5'
  | 'quiz-10'
  | 'subject-master'
  | 'game-explorer'
  | 'level-50';

export interface LocalizedBadgeText {
  en: string;
  ta: string;
}

export type AchievementCategory = 'learning' | 'streak' | 'mastery' | 'games';

export interface AchievementBadgeDefinition {
  id: AchievementBadgeId;
  title: LocalizedBadgeText;
  /** One-line hint shown on locked badges explaining how to unlock. */
  hint: LocalizedBadgeText;
  icon: string;
  category: AchievementCategory;
}

/**
 * Inputs consumed by the pure badge evaluator.
 */
export interface AchievementInput {
  quizHistory: QuizHistoryEntry[];
  quizStats: QuizStats;
  /** Number of different games with at least one completed level. */
  gamesPlayedCount: number;
  /** Total completed levels across all games. */
  totalLevelsCleared: number;
  /** Whether today's quiz daily challenge has been completed. */
  dailyChallengeCompleted?: boolean;
}

export interface UnlockedAchievement {
  badgeId: AchievementBadgeId;
  unlockedAt: number;
}