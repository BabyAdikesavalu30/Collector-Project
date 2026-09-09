/**
 * Missions Feature Types
 * Daily + weekly mission engine. Progress is derived from the unified
 * activity history (never duplicated counters); only claim state persists.
 */

export type MissionKind = 'daily' | 'weekly';

/**
 * Requirement kinds map 1:1 to achievable actions in the existing app:
 *  - playGame        game_completed
 *  - solveRiddle     riddle_completed
 *  - discoverFact    fact_discovered
 *  - solveMystery    mystery_completed
 *  - completeQuiz    quiz_completed
 *  - completeChallenge challenge_completed
 *  - completeActivity any activity event
 *  - playDifferentGames  unique game ids from game_completed metadata
 *  - maintainStreak  unified daily streak >= target
 */
export type MissionRequirementKind =
  | 'playGame'
  | 'solveRiddle'
  | 'discoverFact'
  | 'solveMystery'
  | 'completeQuiz'
  | 'completeChallenge'
  | 'completeActivity'
  | 'playDifferentGames'
  | 'maintainStreak';

export interface MissionRequirement {
  kind: MissionRequirementKind;
  target: number;
}

export interface MissionReward {
  xp: number;
  points: number;
  badgeLabel?: string;
  badgeLabelTa?: string;
}

export interface MissionDefinition {
  id: string;
  kind: MissionKind;
  title: string;
  titleTa: string;
  description: string;
  descriptionTa: string;
  icon: string;
  requirement: MissionRequirement;
  reward: MissionReward;
}

export type MissionStatus = 'not_started' | 'in_progress' | 'completed' | 'claimed';

export interface MissionProgress {
  current: number;
  target: number;
  completed: boolean;
}

export interface MissionWithProgress {
  mission: MissionDefinition;
  progress: MissionProgress;
  status: MissionStatus;
  claimedAt?: number;
}

/** Persisted claim state: `kind:id:periodKey` -> claimedAt. */
export interface MissionClaimState {
  claims: Record<string, number>;
}

export interface MissionsSnapshot {
  daily: MissionWithProgress[];
  weekly: MissionWithProgress[];
  /** Daily missions completed & claimed today (deterministic). */
  dailyClaimedCount: number;
  weeklyClaimedCount: number;
}