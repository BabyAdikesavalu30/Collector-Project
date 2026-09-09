/**
 * Daily Goal Feature Types
 * Thin product experience layer on top of existing activity/mission/reward infrastructure.
 */

import { ActivityEventType } from '../activity';

export type DailyGoalStatus = 'active' | 'completed' | 'claimed';

export type DailyGoalKind =
  | 'complete_3_activities'
  | 'complete_2_science_activities'
  | 'complete_1_game_1_riddle'
  | 'complete_3_different_activities';

export interface DailyGoalDefinition {
  id: string;
  kind: DailyGoalKind;
  title: string;
  titleTa: string;
  description: string;
  descriptionTa: string;
  targetCount: number;
  reward: DailyGoalReward;
}

export interface DailyGoalReward {
  points: number;
  xp: number;
}

export interface DailyGoalProgress {
  current: number;
  target: number;
  completed: boolean;
}

export interface DailyGoalState {
  dateKey: string;
  goalId: string;
  targetCount: number;
  completedCount: number;
  status: DailyGoalStatus;
  completedActivityIds: string[];
  rewardClaimed: boolean;
  createdAt: number;
  completedAt: number | null;
  claimedAt: number | null;
}

export interface DailyGoalWithProgress {
  definition: DailyGoalDefinition;
  progress: DailyGoalProgress;
  status: DailyGoalStatus;
  completedActivityIds: string[];
  rewardClaimed: boolean;
  completedAt: number | null;
  claimedAt: number | null;
}

export const DAILY_GOAL_DEFINITIONS: DailyGoalDefinition[] = [
  {
    id: 'complete_3_activities',
    kind: 'complete_3_activities',
    title: "Today's Goal",
    titleTa: 'இன்றைய இலக்கு',
    description: 'Complete 3 science activities',
    descriptionTa: '3 அறிவியல் செயல்பாடுகளை முடிக்கவும்',
    targetCount: 3,
    reward: { points: 60, xp: 30 },
  },
  {
    id: 'complete_2_science_activities',
    kind: 'complete_2_science_activities',
    title: "Today's Goal",
    titleTa: 'இன்றைய இலக்கு',
    description: 'Complete 2 science activities',
    descriptionTa: '2 அறிவியல் செயல்பாடுகளை முடிக்கவும்',
    targetCount: 2,
    reward: { points: 40, xp: 20 },
  },
  {
    id: 'complete_1_game_1_riddle',
    kind: 'complete_1_game_1_riddle',
    title: "Today's Goal",
    titleTa: 'இன்றைய இலக்கு',
    description: 'Play 1 game and solve 1 riddle',
    descriptionTa: '1 ஆட்டம் விளையாடி 1 புதிரை தீர்க்கவும்',
    targetCount: 2,
    reward: { points: 50, xp: 25 },
  },
  {
    id: 'complete_3_different_activities',
    kind: 'complete_3_different_activities',
    title: "Today's Goal",
    titleTa: 'இன்றைய இலக்கு',
    description: 'Complete 3 different activities',
    descriptionTa: '3 வெவ்வேறு செயல்பாடுகளை முடிக்கவும்',
    targetCount: 3,
    reward: { points: 70, xp: 35 },
  },
];

export const COUNTED_ACTIVITY_TYPES: ActivityEventType[] = [
  'quiz_completed',
  'riddle_completed',
  'game_completed',
  'mystery_completed',
  'fact_discovered',
  'challenge_completed',
  'micro_lesson_completed',
  'concept_map_completed',
  'experiment_completed',
];

export function getDailyGoalDefinition(goalId: string): DailyGoalDefinition | undefined {
  return DAILY_GOAL_DEFINITIONS.find((g) => g.id === goalId);
}

export function getDefaultDailyGoal(): DailyGoalDefinition {
  return DAILY_GOAL_DEFINITIONS[0];
}