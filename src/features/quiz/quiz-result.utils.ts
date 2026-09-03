/**
 * Quiz Result & Review Utilities
 * Filtering, performance tier evaluation, and fallback generation.
 */

import { ReviewedQuestion, ReviewFilterType, QuizResult, QuizDifficulty, QuizQuestionCount } from './quiz.types';

export type PerformanceTier = 'excellent' | 'great' | 'good' | 'practice';

/**
 * Filter reviewed questions by active tab category.
 */
export function filterReviewedQuestions(
  questions: ReviewedQuestion[],
  filter: ReviewFilterType
): ReviewedQuestion[] {
  switch (filter) {
    case 'correct':
      return questions.filter((q) => q.isCorrect);
    case 'wrong':
      return questions.filter((q) => !q.isCorrect);
    case 'all':
    default:
      return [...questions];
  }
}

/**
 * Categorizes quiz percentage into performance tier for messaging.
 * - 90–100%: Excellent Work!
 * - 75–89%: Great Job!
 * - 50–74%: Good Effort!
 * - <50%: Keep Practicing!
 */
export function getPerformanceTier(percentage: number): PerformanceTier {
  if (percentage >= 90) return 'excellent';
  if (percentage >= 75) return 'great';
  if (percentage >= 50) return 'good';
  return 'practice';
}

/**
 * Safely parse fallback result parameters if accessed directly with URL query params.
 */
export function createFallbackResultFromParams(
  params: Record<string, string | undefined>
): QuizResult | null {
  const total = parseInt(params.totalQuestions || '0', 10);
  if (!total || isNaN(total)) return null;

  const correct = parseInt(params.correctAnswers || '0', 10) || 0;
  const wrong = parseInt(params.wrongAnswers || '0', 10) || 0;
  const unanswered = parseInt(params.unansweredQuestions || '0', 10) || 0;
  const score = parseInt(params.score || '0', 10) || correct * 10;
  const percentage = parseInt(params.percentage || '0', 10) || Math.round((correct / total) * 100);
  const bestStreak = parseInt(params.bestStreak || '0', 10) || 0;

  return {
    totalQuestions: total,
    answeredQuestions: total - unanswered,
    correctAnswers: correct,
    wrongAnswers: wrong,
    unansweredQuestions: unanswered,
    score,
    percentage,
    bestStreak,
    startedAt: Date.now() - 60000,
    completedAt: Date.now(),
    config: {
      levelId: params.levelId || 'core',
      subjectId: params.subjectId || 'physics',
      pathwayId: params.pathwayId || 'phy-c-1',
      difficulty: (params.difficulty as QuizDifficulty) || 'beginner',
      questionCount: (total as QuizQuestionCount) || 10,
      timerEnabled: params.timerEnabled !== 'false',
      secondsPerQuestion: 60,
      showExplanation: params.showExplanation !== 'false',
      soundEffects: params.soundEffects !== 'false',
      confirmBeforeFinish: params.confirmBeforeFinish !== 'false',
    },
  };
}
