/**
 * Quiz Feature Utilities
 * Resolution helpers, time calculators, and validation for Quiz Setup.
 */

import { LEARNING_LEVELS, LEARNING_SUBJECTS, LEARNING_PATHWAYS } from '../learn';
import { QuizContextResolved, QuizSetupConfig, QuizQuestionCount } from './quiz.types';
import { QUIZ_SECONDS_PER_QUESTION } from './quiz.constants';

/**
 * Resolve raw route parameters into human-readable educational context.
 */
export function resolveQuizContext(
  levelId?: string | null,
  subjectId?: string | null,
  pathwayId?: string | null
): QuizContextResolved {
  if (!levelId || !subjectId || !pathwayId) {
    return {
      isValid: false,
      levelId: levelId || '',
      levelTitle: 'Unknown Level',
      levelBadge: 'Classes 6–12',
      subjectId: subjectId || '',
      subjectTitle: 'Science',
      subjectIcon: '⚛️',
      pathwayId: pathwayId || '',
      pathwayTitle: 'Learning Pathway',
      pathwayDescription: '',
      topicCount: 0,
    };
  }

  const level = LEARNING_LEVELS.find((l) => l.id === levelId);
  const subject = LEARNING_SUBJECTS.find((s) => s.id === subjectId);
  const pathway = LEARNING_PATHWAYS.find(
    (p) => p.id === pathwayId && p.subjectId === subjectId && p.levelId === levelId
  ) || LEARNING_PATHWAYS.find((p) => p.id === pathwayId);

  if (!pathway) {
    return {
      isValid: false,
      levelId,
      levelTitle: level?.title || 'Unknown Level',
      levelBadge: level?.badge || 'Classes 6–12',
      subjectId,
      subjectTitle: subject?.title || 'Science',
      subjectIcon: subject?.icon || '⚛️',
      pathwayId,
      pathwayTitle: 'Learning Pathway',
      pathwayDescription: '',
      topicCount: 0,
    };
  }

  return {
    isValid: true,
    levelId: level?.id || levelId,
    levelTitle: level?.title || 'Classes 8–10',
    levelBadge: level?.badge || 'Classes 8–10',
    subjectId: subject?.id || pathway.subjectId,
    subjectTitle: subject?.title || 'Physics',
    subjectIcon: subject?.icon || '⚛️',
    pathwayId: pathway.id,
    pathwayTitle: pathway.title,
    pathwayDescription: pathway.description,
    topicCount: pathway.topicCount,
  };
}

/**
 * Calculate total quiz duration in minutes when timer is enabled.
 * 60 seconds per question = questionCount * 1 minute.
 */
export function calculateQuizTimeMinutes(
  questionCount: number,
  timerEnabled: boolean
): number | null {
  if (!timerEnabled) return null;
  return Math.round((questionCount * QUIZ_SECONDS_PER_QUESTION) / 60);
}

/**
 * Validates whether the quiz configuration is fully complete to start the quiz.
 */
export function validateQuizConfig(config: Partial<QuizSetupConfig>): boolean {
  if (!config.levelId || !config.subjectId || !config.pathwayId) return false;
  if (!config.difficulty) return false;
  if (!config.questionCount || config.questionCount <= 0) return false;
  return true;
}
