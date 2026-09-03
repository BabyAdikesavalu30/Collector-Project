/**
 * Spin Wheel Feature Types & Models
 * Defines outcomes, segments, questions, facts, session, and result contracts for Screen 24.
 */

export type SpinOutcomeType =
  | 'scientist'
  | 'invention'
  | 'scienceFact'
  | 'thinkFast'
  | 'bonus'
  | 'challenge';

export type SpinState =
  | 'ready'
  | 'spinning'
  | 'challenge'
  | 'feedback'
  | 'completed';

export interface LocalizedText {
  en: string;
  ta: string;
}

export interface SpinWheelSegment {
  id: SpinOutcomeType;
  label: LocalizedText;
  icon: string;
  bgColor: string;
  textColor: string;
  accentColor: string;
}

export interface SpinOptionItem {
  id: string;
  text: LocalizedText;
}

export interface SpinWheelQuestion {
  id: string;
  category: SpinOutcomeType;
  badge: LocalizedText;
  question: LocalizedText;
  options: SpinOptionItem[];
  correctOptionId: string;
  explanation: LocalizedText;
  points: number;
}

export interface SpinWheelFact {
  id: string;
  badge: LocalizedText;
  title: LocalizedText;
  fact: LocalizedText;
  points: number;
}

export interface SpinWheelBonus {
  id: string;
  badge: LocalizedText;
  title: LocalizedText;
  message: LocalizedText;
  points: number;
}

export type SpinWheelPayload =
  | { type: 'question'; data: SpinWheelQuestion }
  | { type: 'fact'; data: SpinWheelFact }
  | { type: 'bonus'; data: SpinWheelBonus };

export interface SpinWheelOutcome {
  type: SpinOutcomeType;
  segment: SpinWheelSegment;
  payload: SpinWheelPayload;
}

export interface SpinWheelSession {
  state: SpinState;
  selectedOutcomeType: SpinOutcomeType | null;
  outcome: SpinWheelOutcome | null;
  selectedOptionId?: string;
  answeredCorrectly?: boolean;
  pointsEarned: number;
  isDailyCompleted: boolean;
  startedAt: number;
  completedAt?: number;
}

export interface SpinWheelResult {
  outcome: SpinOutcomeType;
  completed: boolean;
  answeredCorrectly?: boolean;
  pointsEarned: number;
  completedAt: number;
}
