/**
 * Feedback Engine
 * Deterministic HintEngine and Incorrect Answer Coach resolver.
 * Pure functions only: no storage, no XP, no navigation, no timers.
 * The parent activity stays authoritative for scoring and completion.
 */

import { SupportedLanguage } from '../../config/i18n';
import {
  AnswerFeedback,
  CoachRequest,
  CoachResult,
  FeedbackConfig,
  FeedbackHint,
  HintRequest,
  HintResult,
  MisconceptionTag,
  resolveHintLevelBounds,
} from './feedback.types';
import { FEEDBACK_HINTS } from './feedback.hintData';
import { FEEDBACK_ENTRIES_BY_ID, FeedbackEntry } from './feedback.data';
import {
  buildFallbackExplanation,
  buildFallbackTakeaway,
  getFeedbackGreeting,
  isPresentableAnswer,
  pickAttemptExplanation,
  pickLocalized,
  resolveFeedbackConfig,
  sanitizeAnswerText,
} from './feedback.utils';

/** Resolves the hints authored for a question key. */
export function getHintsForQuestion(questionKey: string): FeedbackHint[] {
  return FEEDBACK_HINTS[questionKey] || [];
}

/**
 * Requests the next hint for a question (or an explicit level).
 * Rules:
 *  - Levels reveal strictly one at a time; requesting the same level twice
 *    returns the same hint without re-consumption.
 *  - Configurable maxHints caps the progression (0 disables hints entirely).
 *  - `availableAfterAttempt` gates a hint until the given attempt number.
 */
export function requestHint(request: HintRequest, config?: Partial<FeedbackConfig>): HintResult {
  const cfg = resolveFeedbackConfig(config);
  const all = getHintsForQuestion(request.questionId);

  if (cfg.maxHints === 0 || all.length === 0) {
    return { hint: null, remainingHints: 0, answerRevealed: false };
  }

  const { minLevel, maxLevel } = resolveHintLevelBounds(all);
  const totalLevels = maxLevel - minLevel + 1;

  let requestedLevel: number;
  if (request.hintLevel !== undefined) {
    requestedLevel = request.hintLevel;
  } else {
    // Advance: level-1 on first request, +1 per subsequently consumed hint.
    const consumedBefore = Math.min(request.attemptNumber >= 0 ? totalLevels : 0, totalLevels);
    requestedLevel = minLevel + Math.min(consumedBefore, totalLevels - 1);
  }

  // Clamp into the authored range.
  requestedLevel = Math.max(minLevel, Math.min(maxLevel, requestedLevel));

  const hint = all.find((h) => h.level === requestedLevel) || null;
  if (!hint) {
    return { hint: null, remainingHints: 0, answerRevealed: false };
  }

  // Attempt gating.
  if (hint.availableAfterAttempt > request.attemptNumber) {
    const laterHint = all.find(
      (h) => h.availableAfterAttempt <= request.attemptNumber && h.level >= minLevel
    );
    const remaining = all.filter((h) => h.level > (laterHint?.level ?? maxLevel)).length;
    return { hint: laterHint || null, remainingHints: remaining, answerRevealed: false };
  }

  const levelsRevealedSoFar = requestedLevel - minLevel + 1;
  const remainingHints = Math.max(0, totalLevels - levelsRevealedSoFar);

  return {
    hint,
    remainingHints,
    answerRevealed: hint.revealAnswer,
  };
}

/**
 * A session-safe variant: the parent passes how many distinct hints were
 * already revealed for this question; the engine returns exactly the next one.
 */
export function requestNextHint(
  questionKey: string,
  revealedCount: number,
  config?: Partial<FeedbackConfig>
): HintResult {
  const cfg = resolveFeedbackConfig(config);
  const all = getHintsForQuestion(questionKey);

  if (cfg.maxHints === 0 || all.length === 0) {
    return { hint: null, remainingHints: 0, answerRevealed: false };
  }

  const { minLevel, maxLevel } = resolveHintLevelBounds(all);
  const totalLevels = maxLevel - minLevel + 1;

  const nextIndex = Math.max(0, Math.min(revealedCount, totalLevels));
  if (nextIndex >= totalLevels) {
    return { hint: null, remainingHints: 0, answerRevealed: false };
  }

  const sorted = [...all].sort((a, b) => a.level - b.level);
  const hint = sorted[nextIndex];
  const cappedRevealed = Math.min(revealedCount, cfg.maxHints);
  if (nextIndex >= cfg.maxHints) {
    return { hint: null, remainingHints: 0, answerRevealed: false };
  }

  return {
    hint,
    remainingHints: Math.max(0, totalLevels - cappedRevealed - 1),
    answerRevealed: hint.revealAnswer,
  };
}

/** Maximum authored hint count for a question. */
export function getHintCount(questionKey: string): number {
  return getHintsForQuestion(questionKey).length;
}

/** Finds a feedback entry by exact feedback id (fb-...). */
export function getFeedbackEntryById(feedbackId: string): FeedbackEntry | null {
  return FEEDBACK_ENTRIES_BY_ID[feedbackId] || null;
}

/** Finds a feedback entry by question key and activity family. */
export function findFeedbackEntry(
  questionKey: string,
  activity: FeedbackEntry['activity']
): FeedbackEntry | null {
  const found = Object.values(FEEDBACK_ENTRIES_BY_ID).find(
    (e) => e.key === questionKey && e.activity === activity
  );
  return found || null;
}

/**
 * Resolves a complete coached answer. Missing or invalid content always
 * falls back to safe, generic educational language — never fabricated
 * question-specific explanations and never undefined/[object Object].
 */
export function resolveCoach(request: CoachRequest): CoachResult {
  const cfg = resolveFeedbackConfig(request.config);
  const language = request.language;
  const entry = request.reference
    ? FEEDBACK_ENTRIES_BY_ID[request.reference.feedbackId] || null
    : null;

  const studentAnswer = sanitizeAnswerText(request.studentAnswer);
  const correctAnswer = sanitizeAnswerText(request.correctAnswer);

  const attemptNumber = Math.max(1, Math.floor(request.attemptNumber || 1));

  // Correct answer path: positive, minimal, no XP handling here.
  if (request.isCorrect) {
    return {
      result: 'correct',
      greeting: getFeedbackGreeting('correct', language),
      studentAnswer,
      correctAnswer,
      explanation: pickLocalized(
        {
          en: 'You understood the concept correctly.',
          ta: 'இந்தக் கருத்தை நீங்கள் சரியாகப் புரிந்துள்ளீர்கள்.',
        },
        language
      ),
      takeaway: entry ? pickLocalized(entry.content.takeaway, language) : null,
      hint: null,
      retryAvailable: false,
      similarQuestionAvailable: false,
      relatedLessonId: entry?.relatedLessonId,
      relatedConceptMapId: entry?.relatedConceptMapId,
      relatedExperimentId: entry?.relatedExperimentId,
      attemptNumber,
      metadata: entry
        ? {
            topicId: entry.topicId,
            subjectId: entry.subject,
            conceptId: entry.conceptId,
            misconceptionTag: entry.misconceptionTag as MisconceptionTag,
          }
        : undefined,
    };
  }

  // Incorrect path.
  const explanation = entry
    ? pickAttemptExplanation(entry.content, attemptNumber, cfg.escalateWithAttempts, language)
    : buildFallbackExplanation(language);

  const takeaway = entry ? pickLocalized(entry.content.takeaway, language) : buildFallbackTakeaway(language);

  // Attempt-aware hint attached to the coach when one exists for this question.
  const hintSet = entry ? FEEDBACK_HINTS[entry.key] || [] : [];
  const hintForAttempt =
    attemptNumber >= 2 && hintSet.length > 0
      ? pickLocalized(hintSet[Math.min(hintSet.length - 1, attemptNumber - 2)].localizedText, language)
      : null;

  const similarQuestionAvailable =
    cfg.similarQuestionEnabled && Boolean(entry?.similarKey);

  return {
    result: 'incorrect',
    greeting: getFeedbackGreeting('incorrect', language),
    studentAnswer,
    correctAnswer,
    explanation,
    takeaway,
    hint: hintForAttempt,
    retryAvailable: cfg.retryEnabled,
    similarQuestionAvailable,
    relatedLessonId: entry?.relatedLessonId,
    relatedConceptMapId: entry?.relatedConceptMapId,
    relatedExperimentId: entry?.relatedExperimentId,
    attemptNumber,
    metadata: entry
      ? {
          topicId: entry.topicId,
          subjectId: entry.subject,
          conceptId: entry.conceptId,
          misconceptionTag: entry.misconceptionTag as MisconceptionTag,
        }
      : undefined,
  };
}

/** Convenience: builds a full AnswerFeedback model from a coach request. */
export function resolveAnswerFeedback(request: CoachRequest): AnswerFeedback {
  const coach = resolveCoach(request);
  return {
    id: request.reference?.feedbackId || 'fb-fallback',
    result: coach.result,
    studentAnswer: coach.studentAnswer,
    correctAnswer: coach.correctAnswer,
    explanation: coach.explanation,
    takeaway: coach.takeaway || '',
    hint: coach.hint,
    retryAvailable: coach.retryAvailable,
    similarQuestionAvailable: coach.similarQuestionAvailable,
    relatedLessonId: coach.relatedLessonId,
    relatedConceptMapId: coach.relatedConceptMapId,
    relatedExperimentId: coach.relatedExperimentId,
    attemptNumber: coach.attemptNumber,
    metadata: coach.metadata,
  };
}

/** Builds a non-null displayable answer list guard for coach rendering. */
export function hasComparableAnswers(result: CoachResult): boolean {
  return isPresentableAnswer(result.studentAnswer) && isPresentableAnswer(result.correctAnswer);
}
