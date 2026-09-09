/**
 * Feedback Feature Hooks
 * Session-safe hint progression and coach state for parent activities.
 * Guarantees:
 *  - Hint reveals strictly one level per interaction; the same level is never
 *    consumed twice (duplication guard).
 *  - Feedback state resets when the question or activity changes.
 *  - Stale async resolutions can never replace newer state.
 *  - Rapid taps cannot trigger duplicate actions (one-shot guards).
 *  - No XP, no scoring, no navigation — parents own all of that.
 */

import { useCallback, useEffect, useRef, useState } from 'react';
import { SupportedLanguage } from '../../config/i18n';
import {
  CoachRequest,
  CoachResult,
  FeedbackActivityType,
  FeedbackConfig,
  FeedbackHint,
  HintResult,
} from './feedback.types';
import { FEEDBACK_HINTS } from './feedback.hintData';
import { FEEDBACK_ENTRIES } from './feedback.data';
import { resolveCoach } from './feedback.engine';
import { localizeHint } from './feedback.repository';
import { resolveFeedbackConfig } from './feedback.utils';

/** Returns the feedback entry id for a question key + activity, or null. */
export function useFeedbackReference(
  questionKey: string,
  activity: 'micro_lesson' | 'experiment' | 'quiz'
): string | null {
  return (
    FEEDBACK_ENTRIES.find((e) => e.key === questionKey && e.activity === activity)?.id || null
  );
}

interface UseHintEngineParams {
  questionKey: string;
  language: SupportedLanguage;
  /** Resets all hint state whenever this changes (question/activity change). */
  resetKey?: string;
  config?: Partial<FeedbackConfig>;
}

interface UseHintEngineResult {
  /** Locally-authored hints available for this question (max 3 levels). */
  availableHints: FeedbackHint[];
  /** Hints revealed so far in this interaction (in level order). */
  revealedHints: FeedbackHint[];
  /** True when at least one hint is visible. */
  hasAnyHint: boolean;
  /** True when no more hints remain. */
  isExhausted: boolean;
  /** Requests the next hint. Safe against double-taps; no-ops when exhausted. */
  revealNextHint: () => void;
  /** Fully resets hint state for the current interaction. */
  resetHints: () => void;
  /** Number of hints still hidden. */
  remainingHints: number;
}

/**
 * Hint engine state hook. Revealed hints persist for the current question
 * interaction and are never charged twice.
 */
export function useHintEngine({
  questionKey,
  language,
  resetKey,
  config,
}: UseHintEngineParams): UseHintEngineResult {
  const cfg = resolveFeedbackConfig(config);
  const availableHints = FEEDBACK_HINTS[questionKey] || [];

  const [revealedCount, setRevealedCount] = useState(0);
  const isProcessingRef = useRef(false);

  // Hard reset when the question or activity changes.
  useEffect(() => {
    setRevealedCount(0);
    isProcessingRef.current = false;
  }, [questionKey, resetKey]);

  const revealNextHint = useCallback(() => {
    // Rapid-tap guard: one transition at a time.
    if (isProcessingRef.current) return;
    const max = Math.min(cfg.maxHints, availableHints.length);
    setRevealedCount((prev) => {
      if (prev >= max) return prev; // exhausted — no double consumption
      isProcessingRef.current = true;
      return prev + 1;
    });
  }, [cfg.maxHints, availableHints.length]);

  const resetHints = useCallback(() => {
    setRevealedCount(0);
    isProcessingRef.current = false;
  }, []);

  const revealedHints =
    cfg.maxHints === 0
      ? []
      : availableHints.slice(0, Math.min(revealedCount, cfg.maxHints));

  return {
    availableHints,
    revealedHints,
    hasAnyHint: revealedHints.length > 0,
    isExhausted: revealedCount >= Math.min(cfg.maxHints, availableHints.length),
    revealNextHint,
    resetHints,
    remainingHints: Math.max(0, Math.min(cfg.maxHints, availableHints.length) - revealedCount),
  };
}

interface UseAnswerCoachParams {
  /** Feedback entry id (fb-...) or null when none exists. */
  feedbackId: string | null;
  questionKey: string;
  activityType: FeedbackActivityType;
  isCorrect: boolean;
  studentAnswer: string | null;
  correctAnswer: string | null;
  attemptNumber: number;
  language: SupportedLanguage;
  /** Visible only when the parent says the attempt is finished. */
  enabled: boolean;
  /** Resets coach state when this changes (question/activity change). */
  resetKey?: string;
  config?: Partial<FeedbackConfig>;
}

interface UseAnswerCoachResult {
  coach: CoachResult | null;
  /** Marks that the student has viewed the feedback (one-shot). */
  markViewed: () => void;
  hasViewed: boolean;
  /** Resolves the localized similar-question key, or null. */
  similarQuestionKey: string | null;
  resetCoach: () => void;
}

/**
 * Coach state hook. Resolves synchronously from the bundled library and
 * guards against rapid-tap duplicate view marking and stale updates.
 */
export function useAnswerCoach({
  feedbackId,
  questionKey,
  activityType,
  isCorrect,
  studentAnswer,
  correctAnswer,
  attemptNumber,
  language,
  enabled,
  resetKey,
  config,
}: UseAnswerCoachParams): UseAnswerCoachResult {
  const [hasViewed, setHasViewed] = useState(false);
  const markViewedRef = useRef(false);

  // Reset state whenever the question/activity changes.
  useEffect(() => {
    setHasViewed(false);
    markViewedRef.current = false;
  }, [questionKey, resetKey]);

  const coach: CoachResult | null = enabled
    ? resolveCoach({
        reference: feedbackId ? { feedbackId, activityType, subject: 'general' } : null,
        studentAnswer,
        correctAnswer,
        isCorrect,
        attemptNumber,
        language,
        config,
      })
    : null;

  const markViewed = useCallback(() => {
    if (markViewedRef.current) return; // duplication guard
    markViewedRef.current = true;
    setHasViewed(true);
  }, []);

  const resetCoach = useCallback(() => {
    setHasViewed(false);
    markViewedRef.current = false;
  }, []);

  const similarQuestionKey: string | null =
    feedbackId && coach?.similarQuestionAvailable
      ? FEEDBACK_ENTRIES.find((e) => e.id === feedbackId)?.similarKey || null
      : null;

  return {
    coach,
    markViewed,
    hasViewed,
    similarQuestionKey,
    resetCoach,
  };
}

export type { HintResult };
