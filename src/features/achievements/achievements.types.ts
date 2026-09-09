/**
 * Achievements Feature Types
 * Strongly typed models for the Science Badge Gallery.
 * All badges are calculated deterministically from local activity, streak, quiz,
 * games, and daily goal progress.
 */

import { QuizHistoryEntry, QuizStats } from '../quiz';
import { ActivityEventType, ActivityHistoryItem } from '../activity/activity.types';
import { StreakInfo } from '../streaks/streaks.types';

export type AchievementBadgeId =
  // Existing 21 canonical badges (100% backward-compatible)
  | 'first-quiz'
  | 'perfect-score'
  | 'streak-3'
  | 'streak-5'
  | 'quiz-10'
  | 'subject-master'
  | 'game-explorer'
  | 'level-50'
  | 'first-micro-lesson'
  | 'micro-lesson-5'
  | 'micro-lesson-10'
  | 'micro-lesson-25'
  | 'micro-lesson-explorer'
  | 'first-concept-map'
  | 'concept-map-5'
  | 'concept-map-10'
  | 'concept-explorer'
  | 'first-experiment'
  | 'experiment-5'
  | 'experiment-10'
  | 'science-lab-explorer'
  // 22 new gallery badges
  | 'first-step'
  | 'quick-learner'
  | 'science-scholar'
  | 'knowledge-seeker'
  | 'streak-7'
  | 'streak-14'
  | 'streak-30'
  | 'streak-100'
  | 'first-game'
  | 'puzzle-starter'
  | 'puzzle-explorer'
  | 'first-riddle'
  | 'riddle-explorer'
  | 'riddle-master'
  | 'first-case'
  | 'detective'
  | 'science-detective'
  | 'fact-finder'
  | 'curious-mind'
  | 'daily-goal-starter'
  | 'goal-getter'
  | 'science-polymath';

export type AchievementCategory =
  | 'learning'
  | 'streak'
  | 'games'
  | 'riddles'
  | 'mystery'
  | 'experiments'
  | 'micro-lessons'
  | 'concept-maps'
  | 'discovery'
  | 'special'
  | 'mastery'
  | 'experiment-lab'; // Legacy category compatibility aliases

export type AchievementRarity = 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';

export type AchievementStatus = 'locked' | 'in_progress' | 'unlocked';

export type AchievementCriteriaType =
  | 'activity_count'
  | 'activity_type_count'
  | 'streak_days'
  | 'game_level_count'
  | 'game_count'
  | 'riddle_count'
  | 'mystery_count'
  | 'experiment_count'
  | 'micro_lesson_count'
  | 'concept_map_count'
  | 'fact_count'
  | 'daily_goal_count'
  | 'multi_type_count'
  | 'subject_quiz_count'
  | 'perfect_score_count';

export interface AchievementCriteria {
  type: AchievementCriteriaType;
  target: number;
  activityType?: ActivityEventType;
  requiredTypes?: ActivityEventType[];
  subjectCount?: number;
  accuracyThreshold?: number;
}

export interface LocalizedBadgeText {
  en: string;
  ta: string;
}

export interface AchievementBadgeDefinition {
  id: AchievementBadgeId;
  title: LocalizedBadgeText;
  description: LocalizedBadgeText;
  hint: LocalizedBadgeText;
  icon: string;
  category: AchievementCategory;
  rarity: AchievementRarity;
  criteria: AchievementCriteria;
  rewardXp: number;
  relatedRoute?: string;
  certificateEligible?: boolean;
}

export interface AchievementProgress {
  current: number;
  target: number;
  percent: number; // 0 to 100
  status: AchievementStatus;
  remaining: number;
}

export interface Achievement extends AchievementBadgeDefinition {
  status: AchievementStatus;
  progress: AchievementProgress;
  unlockedAt: number | null;
}

/**
 * Raw data context bundled for pure evaluation.
 */
export interface AchievementEvaluationContext {
  activityHistory: ActivityHistoryItem[];
  streakInfo: StreakInfo;
  quizHistory: QuizHistoryEntry[];
  quizStats: QuizStats;
  gamesPlayedCount: number;
  totalLevelsCleared: number;
  microLessonsCompletedCount: number;
  microLessonSubjectsCount: number;
  conceptMapsCompletedCount: number;
  conceptMapSubjectsCount: number;
  experimentsCompletedCount: number;
  experimentSubjectsCount: number;
  riddlesSolvedCount: number;
  mysteriesSolvedCount: number;
  factsDiscoveredCount: number;
  dailyGoalsCompletedCount: number;
}

/** Legacy input shape preserved for backward compatibility */
export interface AchievementInput {
  quizHistory: QuizHistoryEntry[];
  quizStats: QuizStats;
  gamesPlayedCount: number;
  totalLevelsCleared: number;
  dailyChallengeCompleted?: boolean;
  microLessonsCompletedCount?: number;
  microLessonSubjectsCount?: number;
  conceptMapsCompletedCount?: number;
  conceptMapSubjectsCount?: number;
  experimentsCompletedCount?: number;
  experimentSubjectsCount?: number;
  riddlesSolvedCount?: number;
  mysteriesSolvedCount?: number;
  factsDiscoveredCount?: number;
  dailyGoalsCompletedCount?: number;
}

export interface UnlockedAchievement {
  badgeId: AchievementBadgeId;
  unlockedAt: number;
}

export interface AchievementSummary {
  totalCount: number;
  unlockedCount: number;
  inProgressCount: number;
  lockedCount: number;
  totalRewardXpEarned: number;
  overallPercent: number;
}