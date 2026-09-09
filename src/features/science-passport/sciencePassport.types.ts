/**
 * Science Passport Feature Types
 * Aggregated "My Science Journey" identity card.
 * All data is DERIVED from existing canonical feature stores.
 * No duplicate XP, streak, achievements, or progress systems.
 */

import { ScienceLevelInfo } from '../levels';
import { StreakInfo } from '../streaks';
import { UnlockedAchievement } from '../achievements';
import { Certificate } from '../certificates';
import { ActivityHistoryItem } from '../activity';

// ============================================================================
// Milestone System
// ============================================================================

export type MilestoneCategory =
  | 'journey'
  | 'learning'
  | 'discovery'
  | 'experiment'
  | 'games'
  | 'streak'
  | 'achievements'
  | 'collections'
  | 'recognition';

export type MilestoneStatus = 'locked' | 'in_progress' | 'completed';

export interface PassportMilestone {
  id: string;
  title: { en: string; ta: string };
  description: { en: string; ta: string };
  status: MilestoneStatus;
  progress: number;
  target: number;
  category: MilestoneCategory;
  icon: string;
  relatedAchievementId?: string;
  relatedRoute?: string;
}

// ============================================================================
// Activity Statistics (derived from activity history)
// ============================================================================

export interface PassportActivityStats {
  totalActivities: number;
  quizzesCompleted: number;
  microLessonsCompleted: number;
  conceptMapsCompleted: number;
  experimentsCompleted: number;
  mysteriesSolved: number;
  riddlesSolved: number;
  gamesCompleted: number;
  factsDiscovered: number;
}

// ============================================================================
// Feature Counts (derived from existing feature stores)
// ============================================================================

export interface PassportFeatureCounts {
  badges: { earned: number; total: number };
  collections: { completed: number; total: number };
  certificates: { earned: number; total: number };
}

// ============================================================================
// Highlight
// ============================================================================

export interface PassportHighlight {
  id: string;
  icon: string;
  text: { en: string; ta: string };
  relatedRoute?: string;
}

// ============================================================================
// Personal Bests
// ============================================================================

export interface PassportPersonalBests {
  longestStreak: number;
  highestGameLevels: number;
  mostRiddlesSolved: number;
  mostExperiments: number;
  mostCollections: number;
}

// ============================================================================
// Journey Timeline Entry
// ============================================================================

export interface JourneyTimelineEntry {
  id: string;
  type: string;
  title: { en: string; ta: string };
  xpEarned: number;
  timestamp: number;
  icon: string;
}

// ============================================================================
// Full Passport Summary
// ============================================================================

export interface SciencePassportSummary {
  // Identity
  student: {
    name: string;
    initials: string;
    grade: string;
    school: string;
    avatarId?: string;
  };

  // Level & XP (canonical)
  level: ScienceLevelInfo;
  totalXp: number;

  // Streak (canonical)
  streak: {
    current: number;
    longest: number;
  };

  // Activity stats (derived)
  activityStats: PassportActivityStats;

  // Feature counts (derived)
  featureCounts: PassportFeatureCounts;

  // Milestones (derived from achievement/activity data)
  milestones: PassportMilestone[];

  // Highlights (deterministically selected)
  highlights: PassportHighlight[];

  // Personal bests (derived)
  personalBests: PassportPersonalBests;

  // Recent timeline (latest 5-10 entries)
  recentTimeline: JourneyTimelineEntry[];

  // Recent achievements for display
  recentAchievements: UnlockedAchievement[];

  // Latest certificate
  latestCertificate: Certificate | null;
}

// ============================================================================
// Passport Error State
// ============================================================================

export interface PassportErrorState {
  hasError: boolean;
  message: string;
  canRetry: boolean;
}
