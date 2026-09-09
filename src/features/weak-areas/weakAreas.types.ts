/**
 * Weak Areas / Focus Areas Feature Types
 * Strongly typed models for deriving personal learning focus areas from
 * existing activity data. Deterministic, offline, no AI claims, no `any`.
 *
 * Data principle: No evidence -> no focus-area claim. Enough evidence ->
 * a Focus Area appears. New activity -> recalculation. Improvement ->
 * priority drops naturally.
 */

import { SupportedLanguage } from '../../config/i18n';

/** Subjects that activity data can originate from. */
export type FocusSubjectId =
  | 'physics'
  | 'chemistry'
  | 'biology'
  | 'space'
  | 'environment'
  | 'human-body'
  | 'everyday-science';

/** Where a performance event came from. Extensible for future features. */
export type PerformanceSource =
  | 'quiz'
  | 'micro_lesson_quick_check'
  | 'experiment_reflection'
  | 'riddle';

/** One answerable educational event. */
export interface PerformanceEvent {
  /** Unique event id — used to deduplicate identical events. */
  id: string;
  source: PerformanceSource;
  subjectId: FocusSubjectId;
  /** Stable topic identity (never a display name). */
  topicId: string;
  /** Epoch ms of the attempt. Invalid dates are dropped by the aggregator. */
  occurredAt: number;
  /** Was the attempt answered correctly. */
  isCorrect: boolean;
  /**
   * Source-specific event key that identifies the same underlying question.
   * Events sharing the same (source, dedupeKey) never double-count.
   */
  dedupeKey?: string;
}

/** Raw aggregate of evidence for one topic. */
export interface TopicPerformance {
  topicId: string;
  subjectId: FocusSubjectId;
  attempts: number;
  correct: number;
  incorrect: number;
  /** Overall accuracy 0–100. 0 attempts -> 0 (never NaN/Infinity). */
  accuracy: number;
  /** Accuracy over the most recent window of attempts (see config). */
  recentAccuracy: number;
  /** Epoch ms of the latest attempt, or null when no valid attempts exist. */
  lastActivityAt: number | null;
  /** Current run of consecutive correct answers ending at the latest attempt. */
  streak: number;
  /** Distinct sources that contributed evidence. */
  sourceTypes: PerformanceSource[];
  /** Attempts inside the recent window. */
  recentAttempts: number;
  /** Chronological correct (true) / incorrect (false) flags, oldest first. */
  orderedResults: boolean[];
  /** Deterministic focus priority (populated by the engine). */
  priority: number;
}

/** Strongly typed learning performance model matching Section 7 */
export interface LearningPerformance {
  topicId: string;
  subjectId: FocusSubjectId;
  attempts: number;
  correct: number;
  incorrect: number;
  accuracy: number;
  recentAccuracy: number;
  confidence: number;
  lastActivityAt: number | null;
  streak: number;
  sourceTypes: PerformanceSource[];
}

/** Deterministic trend classification. */
export type PerformanceTrend = 'improving' | 'stable' | 'declining' | 'insufficientData';

/** Recommended action, ranked by pedagogical priority. */
export type RecommendedActionType =
  | 'micro_lesson'
  | 'learn'
  | 'concept_map'
  | 'experiment'
  | 'quiz_practice';

export interface RecommendedAction {
  type: RecommendedActionType;
  /** Route the parent screen navigates to. Validated against existing routes. */
  route: string;
  /** i18n key of the CTA label. */
  labelKey:
    | 'learnIn2Min'
    | 'continueLearning'
    | 'seeBigPicture'
    | 'tryExperiment'
    | 'practiceQuestions';
  /** Params for routes like /quiz-setup that require them. */
  params?: Record<string, string>;
}

/** Human-explainable reason, backed only by real data. */
export interface FocusReason {
  kind: 'recentIncorrect' | 'recentLowerThanOverall' | 'strengthenWithPractice';
  /** i18n key for the reason line. */
  labelKey: 'reasonAttempt' | 'reasonRecentLower' | 'reasonStrengthen';
  /** Values interpolated into the localized reason template. */
  values?: Record<string, string>;
}

/** A topic the engine suggests practicing. */
export interface FocusArea {
  topicId: string;
  subjectId: FocusSubjectId;
  /** Localized title ({en, ta}). */
  title: { en: string; ta: string };
  /** Optional localized description. */
  description?: { en: string; ta: string };
  accuracy: number;
  confidence: number;
  attempts: number;
  incorrect: number;
  recentAccuracy: number;
  lastActivityAt: number | null;
  reason: FocusReason;
  priority: number;
  trend: PerformanceTrend;
  previousAccuracy: number | null;
  action: RecommendedAction;
  /** Alias for action per Section 7 specs */
  recommendedAction?: RecommendedAction;
  /** Optional validated references into existing features. */
  relatedMicroLessonId?: string;
  relatedConceptMapId?: string;
  relatedExperimentId?: string;
  learnPathwayId?: string;
  /** Reference to learn route or pathway */
  learnReference?: string;
  quizReference?: { levelId: string; subjectId: string; pathwayId: string };
}

/** Status shown on a focus-area card. */
export type FocusAreaStatus = 'needsPractice' | 'buildConfidence' | 'practiceSuggested';

/** Subject-level rollup. */
export interface SubjectFocusSummary {
  subjectId: FocusSubjectId;
  focusAreaCount: number;
  averageAccuracy: number;
  /** True when the subject has evidence but no focus areas. */
  strongOverall: boolean;
  /** True when the subject lacks the minimum evidence to judge. */
  insufficientData: boolean;
  topTopicTitle?: { en: string; ta: string };
  topTopicId?: string;
}

/** Snapshot returned by FocusAreaService. */
export interface FocusAreasSnapshot {
  focusAreas: FocusArea[];
  improving: FocusArea[];
  strongTopics: FocusArea[];
  subjects: SubjectFocusSummary[];
  topicsAnalyzed: number;
  hasEnoughData: boolean;
  computedAt: number;
}

/** Configurable thresholds — deterministic and overridable for tests. */
export interface FocusAreaConfig {
  /** Minimum attempts before a topic may become a focus area. */
  minimumAttempts: number;
  /** Attempts (most recent) used for recentAccuracy. */
  recentWindow: number;
  /** Minimum attempts before a trend may be reported. */
  minimumTrendAttempts: number;
  /** Accuracy at/below which a topic with enough evidence becomes a focus area. */
  focusAccuracyThreshold: number;
  /** Accuracy at/below which status becomes "Needs More Practice". */
  needsPracticeThreshold: number;
  /** Accuracy at/above which a topic counts as strong. */
  strongAccuracyThreshold: number;
  /** Accuracy drop (recent vs overall) treated as a real decline. */
  declineMargin: number;
  /** Relative accuracy rise treated as reliable improvement evidence. */
  improvementMargin: number;
  /** Maximum focus areas surfaced. */
  maxFocusAreas: number;
}

export const DEFAULT_FOCUS_AREA_CONFIG: FocusAreaConfig = {
  minimumAttempts: 3,
  recentWindow: 5,
  minimumTrendAttempts: 4,
  focusAccuracyThreshold: 75,
  needsPracticeThreshold: 50,
  strongAccuracyThreshold: 85,
  declineMargin: 10,
  improvementMargin: 10,
  maxFocusAreas: 5,
};

/** Screen-level UI state (no-data / error / loaded). */
export interface FocusAreaScreenState {
  status: 'loading' | 'noData' | 'error' | 'loaded';
  snapshot: FocusAreasSnapshot | null;
  selectedSubjectId: FocusSubjectId | 'all';
}

export type FocusAreaLanguage = SupportedLanguage;
