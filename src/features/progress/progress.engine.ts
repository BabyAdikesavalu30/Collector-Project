/**
 * Progress Feature Pure Engine
 * Deterministic, unit-testable calculation functions for Subject Progress 2.0.
 *
 * Distinguishes:
 * - Activity Progress: actions taken (lessons completed, simulations run, maps explored)
 * - Topic Coverage: ratio of topics explored vs available in curriculum
 * - Practice Accuracy: answer-based correctness on quizzes & quick checks
 * - Recent Accuracy: improvement over the most recent attempts window
 *
 * Strictly no `any`, no NaN, and no Infinity.
 */

import {
  PerformanceTrend,
  StrengthLevel,
  TopicProgress,
  TopicStatus,
} from './progress.types';

/**
 * Calculates overall accuracy percentage bounded 0–100.
 * 0 attempts -> 0%. Handled safely against NaN, negative, or infinite values.
 */
export function calculateAccuracy(correct: number, attempts: number): number {
  if (
    !Number.isFinite(correct) ||
    !Number.isFinite(attempts) ||
    attempts <= 0 ||
    correct <= 0
  ) {
    return 0;
  }
  const boundedCorrect = Math.min(correct, attempts);
  return Math.min(100, Math.max(0, Math.round((boundedCorrect / attempts) * 100)));
}

/**
 * Recent accuracy over the last `window` attempts (chronological order, oldest to newest).
 * Default window = 5 attempts (aligned with Phase 41).
 */
export function calculateRecentAccuracy(
  orderedResults: boolean[],
  window: number = 5
): { accuracy: number; attempts: number } {
  const w = Number.isFinite(window) && window > 0 ? Math.floor(window) : 0;
  if (!Array.isArray(orderedResults) || orderedResults.length === 0 || w <= 0) {
    return { accuracy: 0, attempts: 0 };
  }
  const recent = orderedResults.slice(-w);
  return {
    accuracy: calculateAccuracy(recent.filter(Boolean).length, recent.length),
    attempts: recent.length,
  };
}

/**
 * Coverage percentage: (completed / total) * 100, bounded 0–100.
 * Example: 8 explored / 12 topics = 67%.
 */
export function calculateActivityCoverage(completed: number, total: number): number {
  if (
    !Number.isFinite(completed) ||
    !Number.isFinite(total) ||
    total <= 0 ||
    completed <= 0
  ) {
    return 0;
  }
  const boundedCompleted = Math.min(completed, total);
  return Math.min(100, Math.max(0, Math.round((boundedCompleted / total) * 100)));
}

/**
 * Performance trend over chronological results (oldest first).
 * Requires at least `minAttempts` (default: 4) attempts with >= 2 on each side.
 * Consistent with Phase 41 focus area trend logic.
 */
export function calculateTrend(
  orderedResults: boolean[],
  minAttempts: number = 4
): PerformanceTrend {
  if (!Array.isArray(orderedResults) || orderedResults.length < minAttempts) {
    return 'insufficientData';
  }
  const total = orderedResults.length;
  const lastCorrectIdx = orderedResults.lastIndexOf(true);
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
 * Calculates topic progress percentage (0–100).
 * Blends activity completion (Micro Lessons, Concept Maps, Experiments)
 * with question practice accuracy if attempted.
 */
export function calculateTopicProgress(
  topicActivities: { completed: number; total: number },
  quizPerf?: { attempts: number; correct: number }
): number {
  const activityCoverage = calculateActivityCoverage(
    topicActivities.completed,
    topicActivities.total
  );

  if (!quizPerf || quizPerf.attempts <= 0) {
    return activityCoverage;
  }

  const accuracy = calculateAccuracy(quizPerf.correct, quizPerf.attempts);
  // When practice attempts exist, blend 55% activity completion + 45% practice accuracy
  return Math.min(100, Math.max(0, Math.round(activityCoverage * 0.55 + accuracy * 0.45)));
}

export interface TopicStatusParams {
  progressPercent: number;
  attempts: number;
  accuracy: number;
  trend: PerformanceTrend;
  isFocusArea: boolean;
  completedAllActivities?: boolean;
}

/**
 * Calculates topic status deterministically according to Section 13:
 * - not_started: No activity and no attempts
 * - focus_area: Identified as focus area or accuracy < 65% with >= 3 attempts
 * - completed: All activities completed & decent performance (or progress == 100%)
 * - strong: High accuracy (>= 80%) with sufficient attempts (>= 3)
 * - improving: Improving trend with at least 2 attempts
 * - in_progress: Meaningful progress (> 20% or >= 2 attempts)
 * - exploring: Initial exploration (touched once or > 0% progress)
 */
export function calculateTopicStatus(params: TopicStatusParams): TopicStatus {
  const {
    progressPercent,
    attempts,
    accuracy,
    trend,
    isFocusArea,
    completedAllActivities,
  } = params;

  if (progressPercent === 0 && attempts === 0) {
    return 'not_started';
  }

  if (isFocusArea || (attempts >= 3 && accuracy < 65)) {
    return 'focus_area';
  }

  if (
    (completedAllActivities && (attempts === 0 || accuracy >= 70)) ||
    progressPercent >= 100
  ) {
    return 'completed';
  }

  if (attempts >= 3 && accuracy >= 80) {
    return 'strong';
  }

  if (trend === 'improving' && attempts >= 2) {
    return 'improving';
  }

  if (progressPercent > 20 || attempts >= 2) {
    return 'in_progress';
  }

  return 'exploring';
}

/**
 * Calculates overall subject progress (0–100%) from topic progress and activity completion.
 */
export function calculateSubjectProgress(
  topics: TopicProgress[],
  completedActivities: number,
  totalActivities: number
): number {
  if (!Array.isArray(topics) || topics.length === 0) {
    return calculateActivityCoverage(completedActivities, totalActivities);
  }

  const startedTopics = topics.filter((t) => t.status !== 'not_started');
  if (startedTopics.length === 0 && completedActivities === 0) {
    return 0;
  }

  // Topic average progress (breadth and depth across topics)
  const totalTopicProgress = topics.reduce((sum, t) => sum + t.progressPercent, 0);
  const avgTopicProgress = Math.round(totalTopicProgress / topics.length);

  // Overall activity coverage across all activities available in this subject
  const activityCoverage = calculateActivityCoverage(completedActivities, totalActivities);

  // 65% topic progress + 35% activity completion
  return Math.min(100, Math.max(0, Math.round(avgTopicProgress * 0.65 + activityCoverage * 0.35)));
}

/**
 * Evaluates subject strength level based on progress, accuracy, and topic completion.
 */
export function calculateStrengthLevel(
  overallProgress: number,
  averageAccuracy: number,
  topicsCompleted: number,
  topicCount: number
): StrengthLevel {
  const completionRatio = topicCount > 0 ? topicsCompleted / topicCount : 0;

  if (
    overallProgress >= 75 &&
    (averageAccuracy >= 75 || averageAccuracy === 0) &&
    (completionRatio >= 0.4 || topicsCompleted >= 2)
  ) {
    return 'advanced';
  }

  if (
    overallProgress >= 60 &&
    (averageAccuracy >= 65 || averageAccuracy === 0) &&
    topicsCompleted >= 1
  ) {
    return 'strong';
  }

  if (overallProgress >= 25 || topicsCompleted >= 1) {
    return 'developing';
  }

  return 'exploring';
}
