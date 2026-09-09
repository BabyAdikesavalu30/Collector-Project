/**
 * Profile Aggregation Types
 * Views built from existing local data sources — no fake analytics.
 */

import { ScienceLevelInfo } from '../levels';
import { StreakInfo } from '../streaks';
import { ActivityTypeCounts, RecentActivityItem } from '../activity';
import { UnlockedAchievement } from '../achievements';
import { Certificate } from '../certificates';
import { Milestone } from '../xp';

export type ScienceDomain = 'physics' | 'chemistry' | 'biology' | 'space' | 'environment' | 'general';

export interface ScienceStrength {
  domain: ScienceDomain;
  label: string;
  labelTa: string;
  icon: string;
  /** 0 - 100 computed from available local data. */
  percent: number;
  /** Signals that contributed (for transparency in tests/UI hints). */
  signals: string[];
}

export interface ActivitySummaryData {
  quizzesCompleted: number;
  riddlesSolved: number;
  gamesPlayed: number;
  mysteriesSolved: number;
  factsDiscovered: number;
  challengesCompleted: number;
  microLessonsCompleted?: number;
  conceptMapsCompleted?: number;
  experimentsCompleted?: number;
  totalActivities: number;
}

export interface RecognitionSummary {
  achievements: UnlockedAchievement[];
  certificates: Certificate[];
  milestonesReached: Milestone[];
}

export interface ProfileViewData {
  profile: {
    name: string;
    grade: string;
    section: string;
    school: string;
    city: string;
    avatarId?: string;
    initials: string;
    isDemo: boolean;
  };
  level: ScienceLevelInfo;
  totalXp: number;
  streak: StreakInfo;
  counts: ActivityTypeCounts;
  activitySummary: ActivitySummaryData;
  strengths: ScienceStrength[];
  recognition: RecognitionSummary;
  recentActivity: RecentActivityItem[];
}