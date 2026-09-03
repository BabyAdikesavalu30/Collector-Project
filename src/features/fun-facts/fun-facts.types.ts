/**
 * Fun Facts Feature Types
 * Core data models for the science discovery experience.
 */

export type FunFactCategory =
  | 'physics'
  | 'chemistry'
  | 'biology'
  | 'space'
  | 'environment'
  | 'human-body'
  | 'science-history';

export type FunFactMode =
  | 'daily'
  | 'swipe'
  | 'true-false'
  | 'guess'
  | 'quiz'
  | 'collections';

export interface LocalizedText {
  en: string;
  ta: string;
}

export interface FunFact {
  id: string;
  category: FunFactCategory;
  fact: LocalizedText;
  explanation?: LocalizedText;
  icon: string;
  tags: string[];
}

export interface FactQuestion {
  id: string;
  type: 'true-false' | 'multiple-choice';
  statement: LocalizedText;
  options?: LocalizedText[];
  correctAnswer: string;
  explanation?: LocalizedText;
  category: FunFactCategory;
}

export interface FactCollection {
  id: string;
  title: LocalizedText;
  description: LocalizedText;
  icon: string;
  accentColor: string;
  factIds: string[];
}

export interface FunFactsResult {
  mode: FunFactMode;
  totalQuestions: number;
  correctAnswers: number;
  wrongAnswers: number;
  score: number;
  streak: number;
  completedAt: number;
}

export interface FunFactStreak {
  currentStreak: number;
  longestStreak: number;
  lastViewedDate: string;
}

export interface FunFactsProgress {
  factsDiscovered: string[];
  savedFactIds: string[];
  trueFalseCorrect: number;
  trueFalseTotal: number;
  quizCorrect: number;
  quizTotal: number;
  collectionsCompleted: string[];
  factHistory: string[];
  streak: FunFactStreak;
  totalPoints: number;
  dailyFactViewedDate: string | null;
}

export const FUN_FACT_CATEGORIES: FunFactCategory[] = [
  'physics',
  'chemistry',
  'biology',
  'space',
  'environment',
  'human-body',
  'science-history',
];

export const CATEGORY_ICONS: Record<FunFactCategory, string> = {
  physics: '⚡',
  chemistry: '🧪',
  biology: '🧬',
  space: '🌍',
  'human-body': '🫀',
  environment: '🌿',
  'science-history': '📜',
};

export const CATEGORY_ACCENTS: Record<FunFactCategory, string> = {
  physics: '#2563EB',
  chemistry: '#7E22CE',
  biology: '#16A34A',
  space: '#4F46E5',
  'human-body': '#DC2626',
  environment: '#059669',
  'science-history': '#D97706',
};
