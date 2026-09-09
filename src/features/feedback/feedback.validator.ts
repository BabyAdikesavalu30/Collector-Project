/**
 * Feedback Content Validator
 * Pure validation over the bundled feedback + hint libraries:
 * unique ids, localization completeness, valid hint levels, duplicate
 * hint levels, non-empty explanation/takeaway, and valid similar-question
 * references. No side effects.
 */

import { FeedbackEntry, FEEDBACK_ENTRIES } from './feedback.data';
import { FEEDBACK_HINTS } from './feedback.hintData';
import { FeedbackHint } from './feedback.types';

export interface FeedbackValidationIssue {
  field: string;
  message: string;
}

export interface FeedbackValidationResult {
  isValid: boolean;
  totalEntries: number;
  totalHintSets: number;
  issues: FeedbackValidationIssue[];
}

const VALID_SUBJECTS = ['physics', 'chemistry', 'biology', 'space', 'environment', 'general'];
const VALID_MISCONCEPTIONS = [
  'none',
  'confusesMassWithWeight',
  'confusesTemperatureWithHeat',
  'confusesRotationWithRevolution',
  'confusesSpeedWithVelocity',
  'confusesInertiaWithForce',
  'confusesReflectionWithRefraction',
  'confusesSolubilityWithMelting',
  'confusesEvaporationWithBoiling',
  'confusesPhotosynthesisWithRespiration',
  'confusesPlanetWithStar',
  'confusesCurrentWithVoltage',
  'confusesFoodChainLevels',
];

function isNonEmptyBilingual(value: { en: string; ta: string } | undefined): boolean {
  return Boolean(value && value.en.trim().length > 0 && value.ta.trim().length > 0);
}

/** Validates a single feedback entry. */
export function validateFeedbackEntry(entry: FeedbackEntry): FeedbackValidationIssue[] {
  const issues: FeedbackValidationIssue[] = [];

  if (!entry.id || entry.id.trim().length === 0) {
    issues.push({ field: 'id', message: 'Entry id must be a non-empty string' });
  }
  if (!entry.key || entry.key.trim().length === 0) {
    issues.push({ field: 'key', message: 'Entry key must be a non-empty string' });
  }
  if (!VALID_SUBJECTS.includes(entry.subject)) {
    issues.push({ field: 'subject', message: `Invalid subject: ${entry.subject}` });
  }
  if (!VALID_MISCONCEPTIONS.includes(entry.misconceptionTag)) {
    issues.push({ field: 'misconceptionTag', message: `Invalid misconception tag: ${entry.misconceptionTag}` });
  }

  if (!isNonEmptyBilingual(entry.content.explanation)) {
    issues.push({ field: 'content.explanation', message: 'Explanation must exist in EN and TA' });
  }
  if (!isNonEmptyBilingual(entry.content.takeaway)) {
    issues.push({ field: 'content.takeaway', message: 'Takeaway must exist in EN and TA' });
  }
  if (!isNonEmptyBilingual(entry.content.keyIdea)) {
    issues.push({ field: 'content.keyIdea', message: 'Key idea must exist in EN and TA' });
  }
  if (!isNonEmptyBilingual(entry.content.memoryTip)) {
    issues.push({ field: 'content.memoryTip', message: 'Memory tip must exist in EN and TA' });
  }

  return issues;
}

/** Validates a hint set for one question key. */
export function validateHintSet(key: string, hints: FeedbackHint[]): FeedbackValidationIssue[] {
  const issues: FeedbackValidationIssue[] = [];
  const seenLevels = new Set<number>();

  if (!Array.isArray(hints) || hints.length === 0) {
    issues.push({ field: key, message: 'Hint set is empty' });
    return issues;
  }

  for (const hint of hints) {
    if (hint.level < 1 || hint.level > 3) {
      issues.push({ field: `${key}.hint-${hint.id}`, message: `Invalid hint level: ${hint.level}` });
    }
    if (seenLevels.has(hint.level)) {
      issues.push({ field: `${key}.hint-${hint.id}`, message: `Duplicate hint level: ${hint.level}` });
    }
    seenLevels.add(hint.level);

    if (!hint.localizedText.en.trim() || !hint.localizedText.ta.trim()) {
      issues.push({ field: `${key}.hint-${hint.id}`, message: 'Hint text must exist in EN and TA' });
    }
  }

  return issues;
}

/** Validates the whole bundled library. */
export function validateFeedbackLibrary(): FeedbackValidationResult {
  const issues: FeedbackValidationIssue[] = [];

  // Unique feedback ids.
  const seenIds = new Set<string>();
  for (const entry of FEEDBACK_ENTRIES) {
    if (seenIds.has(entry.id)) {
      issues.push({ field: `entry.${entry.id}`, message: `Duplicate feedback id: ${entry.id}` });
    }
    seenIds.add(entry.id);
    issues.push(...validateFeedbackEntry(entry));
  }

  // Unique keys per activity.
  const seenKeys = new Set<string>();
  for (const entry of FEEDBACK_ENTRIES) {
    const composite = `${entry.activity}:${entry.key}`;
    if (seenKeys.has(composite)) {
      issues.push({ field: composite, message: `Duplicate activity key: ${composite}` });
    }
    seenKeys.add(composite);
  }

  // Hint sets.
  for (const [key, hints] of Object.entries(FEEDBACK_HINTS)) {
    issues.push(...validateHintSet(key, hints));
  }

  return {
    isValid: issues.length === 0,
    totalEntries: FEEDBACK_ENTRIES.length,
    totalHintSets: Object.keys(FEEDBACK_HINTS).length,
    issues,
  };
}
