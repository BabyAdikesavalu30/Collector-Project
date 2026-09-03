/**
 * Quiz Feature Scoring & Results Packaging
 * Deterministic scoring rules (+10 points per correct answer) and summary statistics.
 */

import { QuizQuestion, QuizSession, QuizResult } from './quiz.types';

export const POINTS_PER_CORRECT_ANSWER = 10;

/**
 * Evaluates whether an option is correct for a given question.
 */
export function isOptionCorrect(question: QuizQuestion, optionId: string | null): boolean {
  if (!optionId) return false;
  return question.correctOptionId.toLowerCase() === optionId.toLowerCase();
}

/**
 * Calculates score, accuracy percentage, and best streak from quiz session.
 */
export function calculateQuizResult(session: QuizSession): QuizResult {
  const totalQuestions = session.questions.length;
  let correctAnswers = 0;
  let wrongAnswers = 0;
  let answeredQuestions = 0;

  let currentStreak = 0;
  let bestStreak = 0;

  session.questions.forEach((q) => {
    const isSubmitted = session.submitted[q.id] === true;
    const selectedOption = session.answers[q.id];

    if (isSubmitted && selectedOption) {
      answeredQuestions++;
      if (isOptionCorrect(q, selectedOption)) {
        correctAnswers++;
        currentStreak++;
        if (currentStreak > bestStreak) {
          bestStreak = currentStreak;
        }
      } else {
        wrongAnswers++;
        currentStreak = 0;
      }
    } else if (isSubmitted && !selectedOption) {
      // Submitted as timed-out / unanswered
      wrongAnswers++;
      currentStreak = 0;
    }
  });

  const unansweredQuestions = totalQuestions - answeredQuestions;
  const score = correctAnswers * POINTS_PER_CORRECT_ANSWER;
  const percentage = totalQuestions > 0 ? Math.round((correctAnswers / totalQuestions) * 100) : 0;
  const completedAt = session.completedAt || Date.now();

  return {
    totalQuestions,
    answeredQuestions,
    correctAnswers,
    wrongAnswers,
    unansweredQuestions,
    score,
    percentage,
    bestStreak,
    startedAt: session.startedAt,
    completedAt,
    config: session.config,
  };
}
