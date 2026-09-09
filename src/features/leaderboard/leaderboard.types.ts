/**
 * Leaderboard Feature Types
 * Frontend-ready presentation layer. Demo rankings are deterministic and
 * clearly labeled as local — the repository boundary lets a real backend
 * replace them later without touching screens.
 */

export type LeaderboardScope = 'class' | 'school' | 'state' | 'overall';
export type LeaderboardPeriod = 'weekly' | 'monthly' | 'all_time';

export interface LeaderboardEntry {
  rank: number;
  studentId: string;
  displayName: string;
  /** Science level of the student (visual only in demo data). */
  level: number;
  totalXp: number;
  /** XP gained in the selected period. */
  periodXp: number;
  /** Rank movement: positive = climbed, negative = dropped, 0 = unchanged. */
  movement: number;
  isCurrentUser: boolean;
  avatarInitials: string;
}

export interface CurrentUserRank {
  rank: number;
  totalEntries: number;
  periodXp: number;
  movement: number;
  isDemo: boolean;
}

export interface LeaderboardData {
  scope: LeaderboardScope;
  period: LeaderboardPeriod;
  isDemo: boolean;
  entries: LeaderboardEntry[];
  currentUser: CurrentUserRank;
}