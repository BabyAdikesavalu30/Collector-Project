/**
 * Topic Mapping Layer
 * Maps stable topic IDs to existing localized content and validated routes in
 * Micro Lessons, Concept Maps, Experiment Lab, Learn, and Quiz. Never
 * duplicates topic definitions — resolves against the existing catalogs and
 * only emits routes that actually exist.
 */

import { MICRO_LESSONS, MICRO_LESSON_SUBJECTS } from '../micro-lessons/microLessons.data';
import { CONCEPT_MAPS } from '../concept-maps/conceptMaps.data';
import { EXPERIMENTS } from '../experiment-lab/experiment.data';
import { LEARNING_PATHWAYS } from '../learn/learn.mock';
import {
  FocusSubjectId,
  RecommendedAction,
  RecommendedActionType,
} from './weakAreas.types';

/** Localized topic title. */
export interface TopicTitle {
  en: string;
  ta: string;
}

/** Everything the UI needs to render one topic. */
export interface TopicDescriptor {
  topicId: string;
  subjectId: FocusSubjectId;
  title: TopicTitle;
  relatedMicroLessonId?: string;
  relatedConceptMapId?: string;
  relatedExperimentId?: string;
  learnPathwayId?: string;
  quizReference?: { levelId: string; subjectId: string; pathwayId: string };
}

const microLessonsById = new Map(MICRO_LESSONS.map((l) => [l.id, l]));
const conceptMapsById = new Map(CONCEPT_MAPS.map((m) => [m.id, m]));
const experimentsById = new Map(EXPERIMENTS.map((e) => [e.id, e]));
const pathwaysById = new Map(LEARNING_PATHWAYS.map((p) => [p.id, p]));

/** Micro Lesson subject ids that align 1:1 with FocusSubjectId values. */
const MICRO_SUBJECT_IDS: ReadonlySet<string> = new Set(
  MICRO_LESSON_SUBJECTS.map((s) => s.id)
);

function isFocusSubject(value: string): value is FocusSubjectId {
  return MICRO_SUBJECT_IDS.has(value);
}

/**
 * Derives a topic descriptor from the micro-lesson catalog. Topic IDs are
 * prefixed `lesson:` to stay disjoint from quiz pathway topics.
 */
export function getTopicDescriptorForLesson(lessonId: string): TopicDescriptor | null {
  const lesson = microLessonsById.get(lessonId);
  if (!lesson || !isFocusSubject(lesson.subject)) return null;

  const conceptMap = lesson.relatedConceptMapId
    ? conceptMapsById.get(lesson.relatedConceptMapId)
    : undefined;
  const experiment = lesson.relatedExperimentId
    ? experimentsById.get(lesson.relatedExperimentId)
    : undefined;

  return {
    topicId: `lesson:${lesson.id}`,
    subjectId: lesson.subject,
    title: { en: lesson.title.en, ta: lesson.title.ta },
    relatedMicroLessonId: lesson.id,
    relatedConceptMapId: conceptMap?.id,
    relatedExperimentId: experiment?.id,
  };
}

/**
 * Derives a topic descriptor from a Learn pathway (the same identity the Quiz
 * engine keys on via pathwayId). Topic IDs are prefixed `pathway:`.
 */
export function getTopicDescriptorForPathway(pathwayId: string): TopicDescriptor | null {
  const pathway = pathwaysById.get(pathwayId);
  if (!pathway || !isFocusSubject(pathway.subjectId)) return null;

  // Best-effort links to related supporting content by matching the lesson
  // catalog's learnRoute/subject — never fabricates IDs.
  const lesson = MICRO_LESSONS.find(
    (l) => l.subject === pathway.subjectId && l.learnRoute === `/learn`
  );

  return {
    topicId: `pathway:${pathway.id}`,
    subjectId: pathway.subjectId,
    title: { en: pathway.title, ta: pathway.title },
    learnPathwayId: pathway.id,
    quizReference: {
      levelId: pathway.levelId,
      subjectId: pathway.subjectId,
      pathwayId: pathway.id,
    },
    relatedMicroLessonId: lesson?.id,
  };
}

/**
 * Action priority order: Micro Lesson > Learn > Concept Map > Experiment >
 * Quiz Practice. Only emits actions whose references resolve to real routes.
 */
export function resolveRecommendedAction(topic: TopicDescriptor): RecommendedAction | null {
  const candidates: Array<RecommendedActionType | null> = [];

  if (topic.relatedMicroLessonId && microLessonsById.has(topic.relatedMicroLessonId)) {
    candidates.push('micro_lesson');
  }
  if (topic.learnPathwayId && pathwaysById.has(topic.learnPathwayId)) {
    candidates.push('learn');
  }
  if (topic.relatedConceptMapId && conceptMapsById.has(topic.relatedConceptMapId)) {
    candidates.push('concept_map');
  }
  if (topic.relatedExperimentId && experimentsById.has(topic.relatedExperimentId)) {
    candidates.push('experiment');
  }
  if (
    topic.quizReference &&
    pathwaysById.has(topic.quizReference.pathwayId)
  ) {
    candidates.push('quiz_practice');
  }

  const chosen = candidates.find((c) => c !== null);
  if (!chosen) return null;

  switch (chosen) {
    case 'micro_lesson':
      return {
        type: 'micro_lesson',
        route: `/micro-lesson/${topic.relatedMicroLessonId}`,
        labelKey: 'learnIn2Min',
      };
    case 'learn':
      return {
        type: 'learn',
        route: '/learn',
        labelKey: 'continueLearning',
      };
    case 'concept_map':
      return {
        type: 'concept_map',
        route: `/concept-map/${topic.relatedConceptMapId}`,
        labelKey: 'seeBigPicture',
      };
    case 'experiment':
      return {
        type: 'experiment',
        route: `/experiment/${topic.relatedExperimentId}`,
        labelKey: 'tryExperiment',
      };
    case 'quiz_practice':
      return {
        type: 'quiz_practice',
        route: '/quiz-setup',
        labelKey: 'practiceQuestions',
        params: {
          levelId: topic.quizReference!.levelId,
          subjectId: topic.quizReference!.subjectId,
          pathwayId: topic.quizReference!.pathwayId,
        },
      };
  }
}

/** Localized subject label resolved from the existing micro-lesson metadata. */
export function getSubjectTitle(subjectId: FocusSubjectId): TopicTitle {
  const meta = MICRO_LESSON_SUBJECTS.find((s) => s.id === subjectId);
  if (meta) return { en: meta.title.en, ta: meta.title.ta };
  return { en: subjectId, ta: subjectId };
}
