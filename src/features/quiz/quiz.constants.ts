/**
 * Quiz Feature Constants
 * Core options and default constants for Quiz Setup.
 */

import { QuizDifficulty, QuizQuestionCount } from './quiz.types';

export const QUIZ_DIFFICULTIES: {
  id: QuizDifficulty;
  titleKey: 'difficultyBeginner' | 'difficultyIntermediate' | 'difficultyAdvanced';
  subtitleKey: 'difficultyBeginnerSub' | 'difficultyIntermediateSub' | 'difficultyAdvancedSub';
  defaultTitle: string;
  defaultSubtitle: string;
}[] = [
  {
    id: 'beginner',
    titleKey: 'difficultyBeginner',
    subtitleKey: 'difficultyBeginnerSub',
    defaultTitle: 'Beginner',
    defaultSubtitle: 'Gentle / introductory',
  },
  {
    id: 'intermediate',
    titleKey: 'difficultyIntermediate',
    subtitleKey: 'difficultyIntermediateSub',
    defaultTitle: 'Intermediate',
    defaultSubtitle: 'Moderate challenge',
  },
  {
    id: 'advanced',
    titleKey: 'difficultyAdvanced',
    subtitleKey: 'difficultyAdvancedSub',
    defaultTitle: 'Advanced',
    defaultSubtitle: 'Higher challenge',
  },
];

export const QUIZ_QUESTION_COUNTS: QuizQuestionCount[] = [5, 10, 15, 20, 30];

export const QUIZ_SECONDS_PER_QUESTION = 60;

export const DEFAULT_QUIZ_CONFIG = {
  difficulty: 'beginner' as QuizDifficulty,
  questionCount: 10 as QuizQuestionCount,
  timerEnabled: true,
  secondsPerQuestion: 60 as const,
  showExplanation: true,
  soundEffects: true,
  confirmBeforeFinish: true,
};
