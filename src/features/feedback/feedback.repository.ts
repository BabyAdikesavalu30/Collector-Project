/**
 * Feedback Feature Repository
 * Thin repository boundary for feedback content access. The demo implementation
 * serves the bundled local library synchronously; a future backend or
 * content-service implementation can replace it without touching consumers.
 */

import { SupportedLanguage } from '../../config/i18n';
import {
  AnswerFeedback,
  CoachRequest,
  CoachResult,
  FeedbackHint,
  HintRequest,
  HintResult,
} from './feedback.types';
import { FEEDBACK_ENTRIES, FeedbackEntry } from './feedback.data';
import { FEEDBACK_HINTS, FEEDBACK_HINT_SET_COUNT } from './feedback.hintData';
import { resolveCoach, resolveAnswerFeedback, requestHint } from './feedback.engine';
import { pickLocalized } from './feedback.utils';

export interface FeedbackRepository {
  /** Authored coached-answer entry for a question key, if one exists. */
  getFeedbackEntry(questionKey: string): Promise<FeedbackEntry | null>;
  /** All hints authored for a question key. */
  getHints(questionKey: string): Promise<FeedbackHint[]>;
  /** Deterministic similar-question key from the same library. */
  getSimilarQuestionKey(feedbackId: string): Promise<string | null>;
  /** Full coach resolution in one call. */
  resolveFeedback(request: CoachRequest): Promise<CoachResult>;
  /** Full answer-feedback model resolution in one call. */
  resolveAnswerFeedbackModel(request: CoachRequest): Promise<AnswerFeedback>;
  /** One hint request through the engine. */
  requestHint(request: HintRequest): Promise<HintResult>;
}

export class DemoFeedbackRepository implements FeedbackRepository {
  async getFeedbackEntry(questionKey: string): Promise<FeedbackEntry | null> {
    return FEEDBACK_ENTRIES.find((e) => e.key === questionKey) || null;
  }

  async getHints(questionKey: string): Promise<FeedbackHint[]> {
    return FEEDBACK_HINTS[questionKey] || [];
  }

  async getSimilarQuestionKey(feedbackId: string): Promise<string | null> {
    const entry = FEEDBACK_ENTRIES.find((e) => e.id === feedbackId);
    return entry?.similarKey || null;
  }

  async resolveFeedback(request: CoachRequest): Promise<CoachResult> {
    return resolveCoach(request);
  }

  async resolveAnswerFeedbackModel(request: CoachRequest): Promise<AnswerFeedback> {
    return resolveAnswerFeedback(request);
  }

  async requestHint(request: HintRequest): Promise<HintResult> {
    return requestHint(request);
  }
}

/** Singleton instance used across the app. */
export const feedbackRepository: FeedbackRepository = new DemoFeedbackRepository();

/** Helper used by UI: resolves a localized hint text in one call. */
export function localizeHint(hint: FeedbackHint, language: SupportedLanguage): string {
  return pickLocalized(hint.localizedText, language);
}

/** Library sizes, handy for dev diagnostics and tests. */
export function getFeedbackLibraryStats(): {
  feedbackEntries: number;
  hintSets: number;
  hintSetsExpected: number;
} {
  return {
    feedbackEntries: FEEDBACK_ENTRIES.length,
    hintSets: FEEDBACK_HINT_SET_COUNT,
    hintSetsExpected: 45,
  };
}
