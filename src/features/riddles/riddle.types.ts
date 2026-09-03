/**
 * Riddle Feature Types
 * Strongly typed definitions for Riddle Categories, Questions, Sessions, and Results.
 */

export type RiddleDifficulty = 'easy' | 'medium' | 'hard' | 'genius';

export interface LocalizedText {
  en: string;
  ta: string;
}

export interface RiddleCategory {
  id: RiddleDifficulty;
  title: LocalizedText;
  description: LocalizedText;
  icon: string;
  score: number;
  totalAvailable: number;
  accentBg: string;
  accentBorder: string;
}

export interface RiddleQuestion {
  id: string;
  difficulty: RiddleDifficulty;
  question: LocalizedText;
  answer: LocalizedText;
  acceptedAnswers?: LocalizedText[];
  hint?: LocalizedText;
  explanation?: LocalizedText;
  points: number;
}

export type RiddleStatus = 'unanswered' | 'correct' | 'incorrect';

export interface RiddleAnswerState {
  questionId: string;
  userAnswer: string;
  attempts: number;
  isCorrect: boolean;
  pointsEarned: number;
  hintUsed: boolean;
}

export interface RiddleSessionConfig {
  difficulty: RiddleDifficulty;
}

export interface RiddleSession {
  difficulty: RiddleDifficulty;
  riddles: RiddleQuestion[];
  currentIndex: number;
  answers: Record<string, RiddleAnswerState>;
  score: number;
  solvedCount: number;
  hintsUsedCount: number;
  currentStreak: number;
  bestStreak: number;
  isCompleted: boolean;
  startedAt: number;
  completedAt?: number;
}

export interface RiddleResult {
  difficulty: RiddleDifficulty;
  totalRiddles: number;
  solvedRiddles: number;
  skippedRiddles: number;
  score: number;
  hintsUsed: number;
  bestStreak: number;
  completedAt: number;
}

export interface RiddleProgress {
  difficulty: RiddleDifficulty;
  solved: number;
  total: number;
  score: number;
}
