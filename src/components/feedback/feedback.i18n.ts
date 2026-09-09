/**
 * Feedback UI i18n Bridge
 * Types the shared `feedback` section of config/i18n for the feedback
 * components and provides a small resolver so no UI label is hardcoded.
 */

import { SupportedLanguage, getTranslation } from '../../config/i18n';

export interface FeedbackI18n {
  notQuite: string;
  letsUnderstand: string;
  yourAnswer: string;
  correctAnswer: string;
  why: string;
  whyWasThisWrong: string;
  tapToUnderstand: string;
  remember: string;
  keyIdea: string;
  tryAgain: string;
  trySimilarQuestion: string;
  hint: string;
  hint1: string;
  hint2: string;
  hint3: string;
  needHint: string;
  hintTooltip: string;
  nextHint: string;
  allHintsUsed: string;
  noHintsAvailable: string;
  greatWork: string;
  exactly: string;
  niceWork: string;
  youGotIt: string;
  almostThere: string;
  youreClose: string;
  wellUnderstood: string;
  almostCorrectLead: string;
  revealed: string;
  revealedDesc: string;
  continue: string;
  retryAvailable: string;
  nextStep: string;
  memoryTip: string;
  unanswered: string;
  accessibility: {
    feedbackAlert: string;
    correctAlert: string;
    hintButton: string;
    whyToggle: string;
    takeawayCard: string;
  };
}

export function getFeedbackI18n(language: SupportedLanguage): FeedbackI18n {
  return getTranslation(language).feedback as unknown as FeedbackI18n;
}

/** Substitutes {placeholder} tokens. */
export function interpolate(template: string, values: Record<string, string>): string {
  return template.replace(/\{(\w+)\}/g, (_, key: string) => values[key] ?? `{${key}}`);
}

/** Localized hint level labels (Hint 1 / Hint 2 / Hint 3). */
export function getHintLevelLabel(level: number, t: FeedbackI18n): string {
  if (level <= 1) return t.hint1;
  if (level === 2) return t.hint2;
  return t.hint3;
}
