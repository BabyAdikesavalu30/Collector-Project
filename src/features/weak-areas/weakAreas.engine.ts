/**
 * Weak Areas / Focus Areas Pure Engine
 * Deterministic, unit-testable calculations: accuracy, recent accuracy,
 * confidence, trend, focus priority, and focus-area selection.
 *
 * - accuracy = correct / attempts * 100, always bounded 0–100, 0 attempts -> 0.
 * - Confidence is a "practice confidence" heuristic on available evidence
 *   (attempts, accuracy, recency). It is NOT a psychological measurement.
 * - Focus priority is deterministic: lower accuracy and stronger recent
 *   evidence rank higher; outliers are bounded by the evidence count.
 */

import {
  FocusAreaConfig,
  PerformanceTrend,
  TopicPerformance,
} from './weakAreas.types';

/** Calculates overall accuracy in percent, bounded 0–100, 0 attempts -> 0. */
export function calculateAccuracy(correct: number, attempts: number): number {
  if (!Number.isFinite(correct) || !Number.isFinite(attempts) || attempts <= 0 || correct <= 0) {
    return 0;
  }
  const boundedCorrect = Math.min(correct, attempts);
  return Math.min(100, Math.max(0, Math.round((boundedCorrect / attempts) * 100)));
}

/** Recent accuracy over the last `window` attempts (chronological, oldest first). */
export function calculateRecentAccuracy(
  orderedResults: boolean[],
  window: number
): { accuracy: number; attempts: number } {
  const w = Number.isFinite(window) && window > 0 ? Math.floor(window) : 0;
  if (orderedResults.length === 0 || w <= 0) return { accuracy: 0, attempts: 0 };
  const recent = orderedResults.slice(-w);
  return {
    accuracy: calculateAccuracy(recent.filter(Boolean).length, recent.length),
    attempts: recent.length,
  };
}

/**
 * Practice confidence (0–100): deterministic blend of accuracy, evidence
 * volume, and recency. More recent evidence and more attempts move the value
 * toward the observed accuracy; thin evidence pulls it toward a neutral 50.
 */
export function calculateConfidence(perf: TopicPerformance): number {
  const attempts = Math.max(0, Math.floor(perf.attempts));
  if (attempts === 0) return 0;

  const recencyDays = perf.lastActivityAt
    ? Math.max(0, (Date.now() - perf.lastActivityAt) / (1000 * 60 * 60 * 24))
    : 30;
  const recencyWeight = Math.max(0.25, 1 - recencyDays / 60);
  const evidenceWeight = Math.min(1, attempts / 5);
  const weight = Math.max(0.2, recencyWeight) * (0.55 + 0.45 * evidenceWeight);

  return Math.min(100, Math.max(0, Math.round(perf.accuracy * weight + 50 * (1 - weight))));
}

/**
 * Deterministic trend from the two halves of the chronological results.
 * Requires at least `minimumTrendAttempts` total attempts; otherwise the
 * trend is `insufficientData`. Midpoint is the last correct answer position
 * so one-sided splits cannot fabricate a trend.
 */
export function calculateTrend(
  orderedResults: boolean[],
  minimumTrendAttempts: number
): PerformanceTrend {
  if (!Array.isArray(orderedResults) || orderedResults.length < minimumTrendAttempts) {
    return 'insufficientData';
  }
  const total = orderedResults.length;
  const lastCorrectIdx = orderedResults.lastIndexOf(true);
  // Anchor midpoint at the last correct attempt: everything before it is the
  // "past", everything after it is the "recent". Splits of 1 attempt on a side
  // carry no trend signal — the boundary then guarantees both sides have >= 2.
  let split = lastCorrectIdx <= 0 ? Math.floor(total / 2) : Math.ceil((lastCorrectIdx + 1) / 2);
  split = Math.min(Math.max(split, 2), total - 2);
  if (split < 2 || total - split < 2) return 'insufficientData';

  const before = orderedResults.slice(0, split);
  const after = orderedResults.slice(split);
  const beforePct = calculateAccuracy(before.filter(Boolean).length, before.length);
  const afterPct = calculateAccuracy(after.filter(Boolean).length, after.length);

  if (afterPct >= beforePct + 10) return 'improving';
  if (afterPct + 10 <= beforePct) return 'declining';
  return 'stable';
}

/**
 * Focus priority: higher = more useful to practice now.
 * accuracyDeficit (0–100) dominates; recent struggles and total evidence
 * refine it with hard bounds so a single bad result cannot dominate.
 */
export function calculateFocusPriority(
  perf: TopicPerformance,
  config: FocusAreaConfig
): number {
  if (perf.attempts <= 0) return 0;
  const accuracyDeficit = Math.max(0, 100 - perf.accuracy);
  const recentDeficit = Math.max(0, 100 - perf.recentAccuracy);
  const recentStruggle = Math.max(0, recentDeficit - accuracyDeficit);

  // Evidence scales impact with a hard cap: >= 10 attempts no longer amplify.
  const evidenceScale = Math.min(1, perf.attempts / 10);
  const priority =
    accuracyDeficit * (0.7 + 0.3 * evidenceScale) + recentStruggle * 0.3 * evidenceScale;

  // Recency boost decays over 30 days; stale topics lose half their urgency.
  const daysSince = perf.lastActivityAt
    ? Math.max(0, (Date.now() - perf.lastActivityAt) / (1000 * 60 * 60 * 24))
    : 30;
  const recencyBoost = 1 - Math.min(0.5, daysSince / 60);

  return Math.round(Math.min(100, priority * recencyBoost));
}

/** True when a topic has at least `minimumAttempts` of evidence. */
export function hasEnoughEvidence(attempts: number, config: FocusAreaConfig): boolean {
  const a = Number.isFinite(attempts) ? Math.floor(attempts) : 0;
  return a >= config.minimumAttempts;
}

/** Focus-area status label (never shaming; red is never used here). */
export function getFocusStatus(
  confidence: number,
  config: FocusAreaConfig
): 'needsPractice' | 'buildConfidence' | 'practiceSuggested' {
  if (confidence <= config.needsPracticeThreshold) return 'needsPractice';
  if (confidence < config.strongAccuracyThreshold) return 'buildConfidence';
  return 'practiceSuggested';
}

/**
 * Selects the top focus areas: enough evidence + below the accuracy
 * threshold, ordered by descending priority, capped at maxFocusAreas.
 */
export function selectFocusAreas(
  performances: TopicPerformance[],
  config: FocusAreaConfig
): TopicPerformance[] {
  return performances
    .filter((p) => hasEnoughEvidence(p.attempts, config) && p.accuracy <= config.focusAccuracyThreshold)
    .sort((a, b) => b.priority - a.priority || a.topicId.localeCompare(b.topicId))
    .slice(0, config.maxFocusAreas);
}
