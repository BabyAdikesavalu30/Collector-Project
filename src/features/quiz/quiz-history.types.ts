/**
 * Quiz History Types
 * Strongly typed models for persisted quiz attempts and derived analytics.
 */

import { QuizDifficulty } from './quiz.types';

export interface QuizHistoryEntry {
  id: string;
  levelId: string;
  subjectId: string;
  pathwayId: string;
  difficulty: QuizDifficulty;
  totalQuestions: number;
  correctAnswers: number;
  wrongAnswers: number;
  unansweredQuestions: number;
  score: number; // points earned
  percentage: number; // 0 - 100
  bestStreak: number;
  completedAt: number; // epoch ms
  isDailyChallenge?: boolean;
}

export interface QuizSubjectStats {
  subjectId: string;
  quizzesCompleted: number;
  questionsAttempted: number;
  correctAnswers: number;
  accuracy: number; // 0 - 100 rounded
}

export interface QuizStats {
  totalPoints: number;
  quizzesCompleted: number;
  totalQuestionsAttempted: number;
  totalCorrectAnswers: number;
  overallAccuracy: number; // 0 - 100 rounded
  currentStreakDays: number;
  longestStreakDays: number;
  streakHistory: string[]; // YYYY-MM-DD dates with at least one quiz
  subjectStats: QuizSubjectStats[];
}