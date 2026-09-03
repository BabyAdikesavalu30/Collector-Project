/**
 * Daily Challenge Feature Types
 * A single, deterministic science question served once per calendar day.
 * Completion is tracked in local storage so students cannot replay the
 * same day's challenge for extra points.
 */

export interface DailyChallengeResult {
  questionId: string;
  selectedOptionId: string | null;
  isCorrect: boolean;
  pointsEarned: number;
  answeredAt: number;
}

export interface DailyChallengeState {
  /** YYYY-MM-DD */
  date: string;
  questionId: string;
  completed: boolean;
  result?: DailyChallengeResult;
}

export interface DailyChallengePreview {
  id: string;
  title: { en: string; ta: string };
  questionPreview: { en: string; ta: string };
  durationMinutes: number;
  xpReward: number;
}