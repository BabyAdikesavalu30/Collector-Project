/**
 * Feedback Feature Types
 * Strongly typed models for the shared Hint System and Incorrect Answer Coach.
 * The feedback layer NEVER owns questions, sessions, timers, scores, XP, or
 * navigation — parent activities stay authoritative. No `any`.
 */

import { SupportedLanguage } from '../../config/i18n';

/** Activity kinds that can consume the shared feedback layer. */
export type FeedbackActivityType =
  | 'quiz'
  | 'riddle'
  | 'micro_lesson'
  | 'experiment'
  | 'mystery_lab'
  | 'game'
  | 'concept_map';

/** Feedback outcome severity. Not every activity uses every state. */
export type FeedbackResult = 'correct' | 'almost' | 'incorrect' | 'partiallyCorrect' | 'revealed';

/** Misconception tagging for future Weak Areas support (Phase 41). */
export type MisconceptionTag =
  | 'confusesMassWithWeight'
  | 'confusesTemperatureWithHeat'
  | 'confusesRotationWithRevolution'
  | 'confusesSpeedWithVelocity'
  | 'confusesInertiaWithForce'
  | 'confusesReflectionWithRefraction'
  | 'confusesSolubilityWithMelting'
  | 'confusesEvaporationWithBoiling'
  | 'confusesPhotosynthesisWithRespiration'
  | 'confusesPlanetWithStar'
  | 'confusesCurrentWithVoltage'
  | 'confusesFoodChainLevels'
  | 'none';

/** Subjects recognized by the feedback content library. */
export type FeedbackSubject = 'physics' | 'chemistry' | 'biology' | 'space' | 'environment' | 'general';

/** A single localized progressive hint. */
export interface FeedbackHint {
  id: string;
  /** 1 = gentle direction, 2 = specific clue, 3 = strong guidance. */
  level: 1 | 2 | 3;
  text: string;
  localizedText: { en: string; ta: string };
  /** Optional deeper "why" shown only when the feature opts in. */
  optionalExplanation?: string;
  /** Whether revealing this hint exposes the correct answer itself. */
  revealAnswer: boolean;
  /** Feature-specific hint economy cost; shared engine defaults to 0. */
  cost: number;
  /** Minimum attempt number before this hint may be requested (0 = anytime). */
  availableAfterAttempt: number;
}

/** Parameters for requesting the next hint for a question. */
export interface HintRequest {
  questionId: string;
  activityType: FeedbackActivityType;
  attemptNumber: number;
  /** Optional explicit level; when omitted the engine advances by one. */
  hintLevel?: 1 | 2 | 3;
}

/** Result of a hint request. */
export interface HintResult {
  hint: FeedbackHint | null;
  remainingHints: number;
  answerRevealed: boolean;
}

/** References a question entry in the shared feedback content library. */
export interface FeedbackReference {
  /** Feedback entry id (e.g. 'fb-micro-newtons-first-law'). */
  feedbackId: string;
  activityType: FeedbackActivityType;
  subject: FeedbackSubject;
  /** Weak-area metadata (not displayed yet — prepared for Phase 41). */
  topicId?: string;
  subjectId?: string;
  conceptId?: string;
  misconceptionTag?: MisconceptionTag;
}

/** A coached answer payload: your answer / correct answer / why / remember. */
export interface AnswerFeedback {
  id: string;
  result: FeedbackResult;
  studentAnswer: string | null;
  correctAnswer: string | null;
  explanation: string;
  takeaway: string;
  hint: string | null;
  retryAvailable: boolean;
  similarQuestionAvailable: boolean;
  relatedLessonId?: string;
  relatedConceptMapId?: string;
  relatedExperimentId?: string;
  /** Attempt-aware follow-up messaging (see feedbackCoach explanations). */
  attemptNumber: number;
  /** Extensible metadata: topic / subject / concept / misconception. */
  metadata?: {
    topicId?: string;
    subjectId?: string;
    conceptId?: string;
    misconceptionTag?: MisconceptionTag;
  };
}

/** Configuration controlling coach behavior per activity. */
export interface FeedbackConfig {
  /** Max hints the parent activity allows for one question (default 3). */
  maxHints: 0 | 1 | 2 | 3;
  /** Allow the guided retry action to be shown. */
  retryEnabled: boolean;
  /** Show "Try a similar question" when a sibling entry exists. */
  similarQuestionEnabled: boolean;
  /** Escalate coaching strength with repeated wrong attempts. */
  escalateWithAttempts: boolean;
}

/** Default non-punitive configuration shared by all activities. */
export const DEFAULT_FEEDBACK_CONFIG: FeedbackConfig = {
  maxHints: 3,
  retryEnabled: true,
  similarQuestionEnabled: true,
  escalateWithAttempts: true,
};

/** Options accepted by the coach resolver. */
export interface CoachRequest {
  reference: FeedbackReference | null;
  studentAnswer: string | null;
  correctAnswer: string | null;
  isCorrect: boolean;
  /** 1-based attempt count for this question. */
  attemptNumber: number;
  language: SupportedLanguage;
  config?: Partial<FeedbackConfig>;
}

/** Resolved, localized coach output ready for rendering. */
export interface CoachResult {
  result: FeedbackResult;
  greeting: string;
  studentAnswer: string | null;
  correctAnswer: string | null;
  explanation: string;
  takeaway: string | null;
  hint: string | null;
  retryAvailable: boolean;
  similarQuestionAvailable: boolean;
  relatedLessonId?: string;
  relatedConceptMapId?: string;
  relatedExperimentId?: string;
  /** Attempt-aware follow-up messaging (see feedbackCoach explanations). */
  attemptNumber: number;
  metadata?: AnswerFeedback['metadata'];
}

/** Consumable feedback events (no analytics engine — passive metadata only). */
export type FeedbackEventType = 'hint_used' | 'answer_correct' | 'answer_incorrect' | 'feedback_viewed';

export interface FeedbackEvent {
  type: FeedbackEventType;
  activityType: FeedbackActivityType;
  questionId: string;
  hintLevel?: number;
  attemptNumber?: number;
  misconceptionTag?: MisconceptionTag;
  timestamp: number;
}

/** Payload for the shared takeaway card. */
export interface LearningTakeaway {
  text: string;
  sourceLabel?: string;
}

/** Bilingual coached-content block authored in the feedback library. */
export interface LocalizedFeedbackContent {
  explanation: { en: string; ta: string };
  /** Stronger, more guided version used from attempt 2 onward. */
  guidedExplanation?: { en: string; ta: string };
  takeaway: { en: string; ta: string };
  memoryTip: { en: string; ta: string };
  keyIdea: { en: string; ta: string };
}

/** Computes the authored min/max hint levels of a set. */
export function resolveHintLevelBounds(hints: FeedbackHint[]): {
  minLevel: number;
  maxLevel: number;
} {
  if (!hints || hints.length === 0) return { minLevel: 1, maxLevel: 0 };
  const levels = hints.map((h) => h.level);
  return { minLevel: Math.min(...levels), maxLevel: Math.max(...levels) };
}
