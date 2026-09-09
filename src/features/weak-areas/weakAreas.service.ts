/**
 * FocusAreaService
 * Aggregates existing activity/performance data (quiz history, micro-lesson
 * quick checks, experiment reflections) into topic performance and focus
 * areas. Reads through the EXISTING repositories — no duplicate storage, no
 * network, no AI. Everything is derivable and recalculable.
 */

import { getQuizHistory } from '../quiz/quiz-history.storage';
import { QuizHistoryEntry } from '../quiz/quiz-history.types';
import { getAllProgress } from '../micro-lessons/microLessons.storage';
import { MicroLessonProgress } from '../micro-lessons/microLessons.types';
import {
  EXPERIMENTS,
  getExperimentById,
} from '../experiment-lab/experiment.data';
import {
  DEFAULT_FOCUS_AREA_CONFIG,
  FocusArea,
  FocusAreaConfig,
  FocusReason,
  FocusSubjectId,
  FocusAreasSnapshot,
  PerformanceEvent,
  PerformanceSource,
  PerformanceTrend,
  RecommendedAction,
  SubjectFocusSummary,
  TopicPerformance,
} from './weakAreas.types';
import {
  calculateAccuracy,
  calculateConfidence,
  calculateFocusPriority,
  calculateRecentAccuracy,
  calculateTrend,
  getFocusStatus,
  hasEnoughEvidence,
  selectFocusAreas,
} from './weakAreas.engine';
import {
  TopicDescriptor,
  getTopicDescriptorForLesson,
  getTopicDescriptorForPathway,
  getSubjectTitle,
  resolveRecommendedAction,
} from './weakAreas.topics';

/** Configurable service instance. Defaults to the documented thresholds. */
export class FocusAreaService {
  private readonly config: FocusAreaConfig;

  constructor(config: Partial<FocusAreaConfig> = {}) {
    this.config = { ...DEFAULT_FOCUS_AREA_CONFIG, ...config };
  }

  // -------------------------------------------------------------------------
  // Event collection — reads ONLY existing repositories
  // -------------------------------------------------------------------------

  /** Converts quiz history entries into per-question performance events. */
  private collectQuizEvents(history: QuizHistoryEntry[]): PerformanceEvent[] {
    const events: PerformanceEvent[] = [];
    for (const entry of history) {
      const descriptor = getTopicDescriptorForPathway(entry.pathwayId);
      if (!descriptor) continue;

      const total = Number.isFinite(entry.totalQuestions) ? Math.max(0, Math.floor(entry.totalQuestions)) : 0;
      const correct = Number.isFinite(entry.correctAnswers)
        ? Math.min(total, Math.max(0, Math.floor(entry.correctAnswers)))
        : 0;
      if (total <= 0) continue;

      // Each question inside a completed quiz is one attempt. Dedupe keys are
      // source-specific: identical quiz completions (same id) collapse.
      for (let i = 0; i < total; i += 1) {
        events.push({
          id: `${entry.id}#${i}`,
          source: 'quiz',
          subjectId: descriptor.subjectId,
          topicId: descriptor.topicId,
          occurredAt: entry.completedAt,
          isCorrect: i < correct,
          dedupeKey: `${entry.id}#${i}`,
        });
      }
    }
    return events;
  }

  /**
   * Converts completed micro-lesson quick checks into events. A quick check is
   * one graded attempt per lesson; passing is treated as correct evidence,
   * and incomplete lessons carry no performance evidence.
   */
  private collectMicroLessonEvents(progress: MicroLessonProgress[]): PerformanceEvent[] {
    const events: PerformanceEvent[] = [];
    for (const p of progress) {
      if (!p.quickCheckCompleted || p.status !== 'completed') continue;
      const descriptor = getTopicDescriptorForLesson(p.lessonId);
      if (!descriptor) continue;
      events.push({
        id: `ml-${p.lessonId}`,
        source: 'micro_lesson_quick_check',
        subjectId: descriptor.subjectId,
        topicId: descriptor.topicId,
        occurredAt: p.completedAt ?? Date.now(),
        isCorrect: true,
        dedupeKey: `ml-${p.lessonId}`,
      });
    }
  return events;
  }

  /**
   * Experiment reflections are only persisted as completions (no per-question
   * correctness), so they contribute topic exposure but no correctness
   * evidence — and are therefore excluded from accuracy calculations. Listed
   * here explicitly to document the decision and keep the source registry
   * honest.
   */
  private static readonly UNSCORED_SOURCES: ReadonlySet<PerformanceSource> = new Set([
    'experiment_reflection',
  ]);

  private collectExperimentEvents(): PerformanceEvent[] {
    // No per-question persisted correctness exists in Experiment Lab storage;
    // emitting unscored events would fabricate evidence. Intentionally empty.
    return [];
  }

  // -------------------------------------------------------------------------
  // Aggregation
  // -------------------------------------------------------------------------

  /**
   * Aggregates events into per-topic performance. Duplicate events sharing the
   * same (source, dedupeKey) are collapsed — replayed or mirrored data can
   * never inflate attempts, incorrect counts, or focus scores. Invalid events
   * (bad ids/subjects/topics/dates) are safely ignored.
   */
  aggregatePerformance(events: PerformanceEvent[]): TopicPerformance[] {
    interface Accumulator {
      subjectId: FocusSubjectId;
      attempts: number;
      correct: number;
      lastActivityAt: number | null;
      sources: Set<PerformanceSource>;
      ordered: Array<{ occurredAt: number; isCorrect: boolean }>;
    }

    const byTopic = new Map<string, Accumulator>();
    const seen = new Set<string>();

    for (const e of events) {
      if (!e || typeof e !== 'object') continue;
      if (typeof e.id !== 'string' || e.id.length === 0) continue;
      if (!isFocusSubject(e.subjectId)) continue;
      if (typeof e.topicId !== 'string' || e.topicId.length === 0) continue;
      if (!Number.isFinite(e.occurredAt)) continue;
      if (typeof e.isCorrect !== 'boolean') continue;

      const dedupeKey = e.dedupeKey ? `${e.source}::${e.dedupeKey}` : null;
      if (dedupeKey) {
        if (seen.has(dedupeKey)) continue;
        seen.add(dedupeKey);
      }

      let acc = byTopic.get(e.topicId);
      if (!acc) {
        acc = {
          subjectId: e.subjectId,
          attempts: 0,
          correct: 0,
          lastActivityAt: null,
          sources: new Set(),
          ordered: [],
        };
        byTopic.set(e.topicId, acc);
      }
      acc.attempts += 1;
      if (e.isCorrect) acc.correct += 1;
      acc.lastActivityAt =
        acc.lastActivityAt === null || e.occurredAt > acc.lastActivityAt
          ? e.occurredAt
          : acc.lastActivityAt;
      acc.sources.add(e.source);
      acc.ordered.push({ occurredAt: e.occurredAt, isCorrect: e.isCorrect });
    }

    const now = Date.now();
    const results: TopicPerformance[] = [];

    for (const [topicId, acc] of byTopic) {
      acc.ordered.sort((a, b) => a.occurredAt - b.occurredAt);
      const orderedResults = acc.ordered.map((o) => o.isCorrect);
      const recent = calculateRecentAccuracy(orderedResults, this.config.recentWindow);

      // Streak: consecutive correct answers ending at the latest attempt.
      let streak = 0;
      for (let i = orderedResults.length - 1; i >= 0; i -= 1) {
        if (!orderedResults[i]) break;
        streak += 1;
      }

      const perf: TopicPerformance = {
        topicId,
        subjectId: acc.subjectId,
        attempts: acc.attempts,
        correct: acc.correct,
        incorrect: acc.attempts - acc.correct,
        accuracy: calculateAccuracy(acc.correct, acc.attempts),
        recentAccuracy: recent.accuracy,
        lastActivityAt: acc.lastActivityAt,
        streak,
        sourceTypes: Array.from(acc.sources),
        recentAttempts: recent.attempts,
        orderedResults,
        priority: 0,
      };
      perf.priority = calculateFocusPriority(perf, this.config);
      results.push(perf);
    }

    void now;
    return results.sort((a, b) => b.attempts - a.attempts || a.topicId.localeCompare(b.topicId));
  }

  // -------------------------------------------------------------------------
  // Focus area assembly
  // -------------------------------------------------------------------------

  private buildFocusArea(perf: TopicPerformance): FocusArea | null {
    const descriptor = resolveTopicDescriptor(perf.topicId);
    if (!descriptor) return null;

    const action = resolveRecommendedAction(descriptor);
    if (!action) return null;

    const confidence = calculateConfidence(perf);
    const trend = calculateTrend(perf.orderedResults, this.config.minimumTrendAttempts);
    const reason = buildReason(perf, trend, this.config);

    // Previous accuracy = accuracy before the most recent attempt, when the
    // history is long enough to make that meaningful (>= 4 attempts).
    let previousAccuracy: number | null = null;
    if (perf.orderedResults.length >= 4) {
      const past = perf.orderedResults.slice(0, -1);
      previousAccuracy = calculateAccuracy(
        past.filter(Boolean).length,
        past.length
      );
    }

    return {
      topicId: perf.topicId,
      subjectId: descriptor.subjectId,
      title: descriptor.title,
      accuracy: perf.accuracy,
      confidence,
      attempts: perf.attempts,
      incorrect: perf.incorrect,
      recentAccuracy: perf.recentAccuracy,
      lastActivityAt: perf.lastActivityAt,
      reason,
      priority: perf.priority,
      trend,
      previousAccuracy,
      action,
      recommendedAction: action,
      relatedMicroLessonId: descriptor.relatedMicroLessonId,
      relatedConceptMapId: descriptor.relatedConceptMapId,
      relatedExperimentId: descriptor.relatedExperimentId,
      learnPathwayId: descriptor.learnPathwayId,
      learnReference: descriptor.learnPathwayId ? '/learn' : undefined,
      quizReference: descriptor.quizReference,
    };
  }

  /** Full derivation from existing data. Deterministic for identical inputs. */
  async getFocusAreasSnapshot(): Promise<FocusAreasSnapshot> {
    const [quizHistory, lessonProgress] = await Promise.all([
      getQuizHistory(),
      getAllProgress(),
    ]);

    const events = [
      ...this.collectQuizEvents(quizHistory),
      ...this.collectMicroLessonEvents(Object.values(lessonProgress)),
      ...this.collectExperimentEvents(),
    ];

    const performances = this.aggregatePerformance(events);
    void EXPERIMENTS;
    void getExperimentById;

    const selected = selectFocusAreas(performances, this.config);

    const focusAreas: FocusArea[] = [];
    for (const perf of selected) {
      const area = this.buildFocusArea(perf);
      if (area) focusAreas.push(area);
    }

    // Strong topics: enough evidence, above threshold, not focus areas.
    const focusIds = new Set(focusAreas.map((f) => f.topicId));
    const strongTopics = performances
      .filter(
        (p) =>
          hasEnoughEvidence(p.attempts, this.config) &&
          p.accuracy >= this.config.strongAccuracyThreshold &&
          !focusIds.has(p.topicId)
      )
      .slice(0, 5)
      .map((p) => this.buildFocusArea(p))
      .filter((a): a is FocusArea => a !== null);

    // Improving: reliable evidence of getting better — previous accuracy
    // materially below current, and trend confirms.
    const improving = performances
      .filter((p) => {
        if (!hasEnoughEvidence(p.attempts, this.config)) return false;
        if (p.orderedResults.length < 4) return false;
        const past = p.orderedResults.slice(0, -1);
        const pastAcc = calculateAccuracy(past.filter(Boolean).length, past.length);
        const overallAcc = calculateAccuracy(p.correct, p.attempts);
        if (overallAcc - pastAcc < this.config.improvementMargin) return false;
        return calculateTrend(p.orderedResults, this.config.minimumTrendAttempts) === 'improving';
      })
      .slice(0, 3)
      .map((p) => this.buildFocusArea(p))
      .filter((a): a is FocusArea => a !== null);

    const subjects = buildSubjectSummaries(
      performances,
      focusAreas,
      this.config
    );

    const topicsAnalyzed = performances.length;
    const hasEnoughData = performances.some((p) =>
      hasEnoughEvidence(p.attempts, this.config)
    );

    return {
      focusAreas,
      improving,
      strongTopics,
      subjects,
      topicsAnalyzed,
      hasEnoughData,
      computedAt: Date.now(),
    };
  }

  /** Single top recommendation (used by Home / Progress cards). */
  async getRecommendedNextStep(): Promise<FocusArea | null> {
    const snapshot = await this.getFocusAreasSnapshot();
    return snapshot.focusAreas[0] ?? null;
  }

  /** Subject rollups only (used by Profile / Progress). */
  async getSubjectSummary(): Promise<SubjectFocusSummary[]> {
    const snapshot = await this.getFocusAreasSnapshot();
    return snapshot.subjects;
  }

  /** Raw per-topic performance (used by tests and future integrations). */
  async getTopicPerformance(): Promise<TopicPerformance[]> {
    const [quizHistory, lessonProgress] = await Promise.all([
      getQuizHistory(),
      getAllProgress(),
    ]);
    const events = [
      ...this.collectQuizEvents(quizHistory),
      ...this.collectMicroLessonEvents(Object.values(lessonProgress)),
    ];
    return this.aggregatePerformance(events);
  }

  getConfig(): FocusAreaConfig {
    return { ...this.config };
  }
}

// ---------------------------------------------------------------------------
// Module-level helpers
// ---------------------------------------------------------------------------

function isFocusSubject(value: string): value is FocusSubjectId {
  return ['physics', 'chemistry', 'biology', 'space', 'environment', 'human-body', 'everyday-science'].includes(value);
}

function isFocusSubjectString(topicId: string): boolean {
  // Topic IDs are `lesson:<id>` or `pathway:<id>`; both descriptor resolvers
  // already guarantee a valid subject, so the aggregator can trust events.
  return true;
}

function deriveSubject(topicId: string): FocusSubjectId {
  // Fallback only; real subjects come from the event stream which is
  // validated. Kept deterministic for tests.
  return 'everyday-science';
}

function resolveTopicDescriptor(topicId: string): TopicDescriptor | null {
  if (topicId.startsWith('lesson:')) {
    return getTopicDescriptorForLesson(topicId.slice('lesson:'.length));
  }
  if (topicId.startsWith('pathway:')) {
    return getTopicDescriptorForPathway(topicId.slice('pathway:'.length));
  }
  return null;
}

/** Builds a data-supported reason (only claims what the data shows). */
function buildReason(
  perf: TopicPerformance,
  trend: PerformanceTrend,
  config: FocusAreaConfig
): FocusReason {
  const recent = perf.orderedResults.slice(-config.recentWindow);
  const recentIncorrect = recent.filter((r) => !r).length;

  if (recent.length > 0 && recentIncorrect > 0) {
    return {
      kind: 'recentIncorrect',
      labelKey: 'reasonAttempt',
      values: { incorrect: String(recentIncorrect), total: String(recent.length) },
    };
  }
  if (
    perf.recentAttempts > 0 &&
    perf.recentAccuracy + config.declineMargin <= perf.accuracy
  ) {
    return {
      kind: 'recentLowerThanOverall',
      labelKey: 'reasonRecentLower',
    };
  }
  return {
    kind: 'strengthenWithPractice',
    labelKey: 'reasonStrengthen',
  };
}

/** Builds subject-level rollups (never a leaderboard). */
function buildSubjectSummaries(
  performances: TopicPerformance[],
  focusAreas: FocusArea[],
  config: FocusAreaConfig
): SubjectFocusSummary[] {
  const subjectIds = new Set<FocusSubjectId>();
  for (const p of performances) subjectIds.add(p.subjectId);

  const summaries: SubjectFocusSummary[] = [];
  for (const subjectId of subjectIds) {
    const subjectPerfs = performances.filter((p) => p.subjectId === subjectId);
    const subjectFocus = focusAreas.filter((f) => f.subjectId === subjectId);
    const totalAttempts = subjectPerfs.reduce((s, p) => s + p.attempts, 0);
    const totalCorrect = subjectPerfs.reduce((s, p) => s + p.correct, 0);

    const strongEnough = subjectPerfs.some((p) => hasEnoughEvidence(p.attempts, config));
    const averageAccuracy = calculateAccuracy(totalCorrect, totalAttempts);

    const top = subjectFocus[0];
    summaries.push({
      subjectId,
      focusAreaCount: subjectFocus.length,
      averageAccuracy,
      strongOverall: strongEnough && subjectFocus.length === 0,
      insufficientData: !strongEnough,
      topTopicTitle: top?.title,
      topTopicId: top?.topicId,
    });
  }
  return summaries.sort(
    (a, b) => b.focusAreaCount - a.focusAreaCount || a.subjectId.localeCompare(b.subjectId)
  );
}

/** Singleton used by screens/hooks. */
export const focusAreaService = new FocusAreaService();
