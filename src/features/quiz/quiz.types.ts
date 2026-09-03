/**
 * Quiz Feature Types
 * Strongly typed definitions for Quiz Setup, Quiz Engine, Quiz Results, and Answer Review.
 */

export type QuizDifficulty = 'beginner' | 'intermediate' | 'advanced';

export type QuizQuestionCount = 5 | 10 | 15 | 20 | 30;

export type ReviewFilterType = 'all' | 'correct' | 'wrong';

export interface LocalizedText {
  en: string;
  ta: string;
}

export interface QuizOption {
  id: string; // 'a' | 'b' | 'c' | 'd'
  label: string; // 'A' | 'B' | 'C' | 'D'
  text: LocalizedText;
}

export interface QuizQuestion {
  id: string;
  subjectId: string;
  pathwayId: string;
  difficulty: QuizDifficulty;
  question: LocalizedText;
  options: QuizOption[];
  correctOptionId: string;
  explanation?: LocalizedText;
  hint?: LocalizedText;
  points?: number; // default: 10
}

export interface QuizSetupConfig {
  levelId: string;
  subjectId: string;
  pathwayId: string;
  difficulty: QuizDifficulty;
  questionCount: QuizQuestionCount;
  timerEnabled: boolean;
  secondsPerQuestion: 60;
  showExplanation: boolean;
  soundEffects: boolean;
  confirmBeforeFinish: boolean;
}

export interface QuizContextResolved {
  isValid: boolean;
  levelId: string;
  levelTitle: string;
  levelBadge: string;
  subjectId: string;
  subjectTitle: string;
  subjectIcon: string;
  pathwayId: string;
  pathwayTitle: string;
  pathwayDescription: string;
  topicCount: number;
}

export interface QuizSession {
  config: QuizSetupConfig;
  questions: QuizQuestion[];
  currentIndex: number;
  answers: Record<string, string | null>; // questionId -> optionId
  submitted: Record<string, boolean>; // questionId -> boolean
  timeRemaining: Record<string, number>; // questionId -> seconds
  revealedHints: Record<string, boolean>; // questionId -> boolean
  correctCount: number;
  wrongCount: number;
  score: number;
  bestStreak: number;
  currentStreak: number;
  startedAt: number;
  completedAt?: number;
}

export interface QuizResult {
  totalQuestions: number;
  answeredQuestions: number;
  correctAnswers: number;
  wrongAnswers: number;
  unansweredQuestions: number;
  score: number;
  percentage: number;
  bestStreak: number;
  startedAt: number;
  completedAt: number;
  config: QuizSetupConfig;
}

export interface ReviewedQuestion {
  questionId: string;
  questionNumber: number;
  question: LocalizedText;
  selectedOptionId?: string;
  correctOptionId: string;
  selectedOptionText?: LocalizedText | null;
  correctOptionText: LocalizedText;
  isCorrect: boolean;
  isUnanswered: boolean;
  explanation?: LocalizedText;
}
