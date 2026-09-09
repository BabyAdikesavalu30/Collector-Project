/**
 * Feedback Feature Utilities
 * Pure helpers: localization pickers, severity tone mapping, and safe fallbacks.
 * No side effects, no storage, no navigation.
 */

import { SupportedLanguage } from '../../config/i18n';
import {
  AnswerFeedback,
  CoachResult,
  FeedbackConfig,
  FeedbackResult,
  LocalizedFeedbackContent,
  DEFAULT_FEEDBACK_CONFIG,
} from './feedback.types';

/** Picks the localized string from a bilingual pair with English fallback. */
export function pickLocalized(text: { en: string; ta: string }, language: SupportedLanguage): string {
  if (!text) return '';
  if (language === 'ta' && text.ta && text.ta.trim().length > 0) return text.ta;
  return text.en || text.ta || '';
}

/** Normalizes a possibly-partial config into a full one. */
export function resolveFeedbackConfig(partial?: Partial<FeedbackConfig>): FeedbackConfig {
  return { ...DEFAULT_FEEDBACK_CONFIG, ...(partial || {}) };
}

/**
 * Safe generic educational fallback — never pretends to know a
 * question-specific reason when no authored content exists.
 */
export function buildFallbackExplanation(language: SupportedLanguage): string {
  return pickLocalized(
    {
      en: 'Review the key idea of this question and try again. You are learning every time you retry.',
      ta: 'இந்த வினாவின் முக்கியக் கருத்தை மீண்டும் பாருங்கள், பிறகு முயற்சிக்கவும். ஒவ்வொரு முயற்சியும் கற்றலே.',
    },
    language
  );
}

/** Safe generic takeaway fallback. */
export function buildFallbackTakeaway(language: SupportedLanguage): string {
  return pickLocalized(
    {
      en: "Let's look at the concept again.",
      ta: 'இந்தக் கருத்தை மீண்டும் ஒருமுறை பார்ப்போம்.',
    },
    language
  );
}

/**
 * Chooses the attempt-appropriate explanation escalation.
 * Attempt 1: general. Attempt 2: more guided. Attempt 3+: strongest support.
 */
export function pickAttemptExplanation(
  content: LocalizedFeedbackContent,
  attemptNumber: number,
  escalate: boolean,
  language: SupportedLanguage
): string {
  if (!escalate || attemptNumber <= 1) {
    return pickLocalized(content.explanation, language);
  }
  const guided = content.guidedExplanation;
  if (guided && guided.en.trim().length > 0) {
    return pickLocalized(guided, language);
  }
  return pickLocalized(content.explanation, language);
}

/** Encouraging, never punitive tone for each severity. */
export function getFeedbackGreeting(result: FeedbackResult, language: SupportedLanguage): string {
  const table: Record<FeedbackResult, { en: string; ta: string }> = {
    correct: { en: 'Nice work!', ta: 'நன்று!' },
    almost: { en: 'Almost there!', ta: 'கிட்டத்தட்ட சரி!' },
    incorrect: { en: 'Not quite', ta: 'சரியாக இல்லை' },
    partiallyCorrect: { en: "You're close", ta: 'நீங்கள் நெருங்கிவிட்டீர்கள்' },
    revealed: { en: "Let's understand why", ta: 'ஏன் என்று புரிந்துகொள்வோம்' },
  };
  return pickLocalized(table[result], language);
}

/** Semantic color roles for each severity (calm for incorrect — never alarm-red). */
export function getFeedbackSeverityTone(result: FeedbackResult): {
  background: string;
  border: string;
  title: string;
  icon: string;
} {
  switch (result) {
    case 'correct':
      return { background: '#F0FDF4', border: '#BBF7D0', title: '#15803D', icon: '✓' };
    case 'almost':
      return { background: '#FFFBEB', border: '#FDE68A', title: '#B45309', icon: '◐' };
    case 'partiallyCorrect':
      return { background: '#EFF6FF', border: '#BFDBFE', title: '#1D4ED8', icon: '◐' };
    case 'revealed':
      return { background: '#FAF5FF', border: '#E9D5FF', title: '#7E22CE', icon: '💡' };
    case 'incorrect':
    default:
      // Calm educational emphasis — purple/blue, not error red.
      return { background: '#FAF5FF', border: '#E9D5FF', title: '#7E22CE', icon: 'ℹ️' };
  }
}

/** True when the answer text is presentable (guards against undefined/[object Object]). */
export function isPresentableAnswer(value: string | null | undefined): value is string {
  if (typeof value !== 'string') return false;
  const trimmed = value.trim();
  if (trimmed.length === 0) return false;
  if (trimmed === 'undefined' || trimmed === 'null' || trimmed === '[object Object]') return false;
  return true;
}

/** Sanitizes raw answer strings into a displayable form or null. */
export function sanitizeAnswerText(value: unknown): string | null {
  if (!isPresentableAnswer(typeof value === 'string' ? value : null)) return null;
  return (value as string).trim();
}

/** Serializes a full AnswerFeedback into the compact CoachResult shape. */
export function toCoachResult(
  feedback: AnswerFeedback,
  language: SupportedLanguage
): CoachResult {
  return {
    result: feedback.result,
    greeting: getFeedbackGreeting(feedback.result, language),
    studentAnswer: feedback.studentAnswer,
    correctAnswer: feedback.correctAnswer,
    explanation: feedback.explanation,
    takeaway: feedback.takeaway,
    hint: feedback.hint,
    retryAvailable: feedback.retryAvailable,
    similarQuestionAvailable: feedback.similarQuestionAvailable,
    relatedLessonId: feedback.relatedLessonId,
    relatedConceptMapId: feedback.relatedConceptMapId,
    relatedExperimentId: feedback.relatedExperimentId,
    attemptNumber: feedback.attemptNumber,
    metadata: feedback.metadata,
  };
}
