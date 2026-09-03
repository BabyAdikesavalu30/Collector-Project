/**
 * Daily Challenge Feature Engine
 * Deterministically picks "today's" question from the quiz question bank
 * using the current date as a seed, so every student sees the same
 * challenge on a given day and it stays stable on revisits.
 */

import { QuizQuestion } from '../quiz';
import { MOCK_QUIZ_QUESTIONS } from '../quiz';
import { DailyChallengePreview } from './challenges.types';

/**
 * Local YYYY-MM-DD date string for a given timestamp.
 */
export function getChallengeDateString(timestamp: number = Date.now()): string {
  const d = new Date(timestamp);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * 32-bit string hash (stable across platforms — avoids Math.random).
 */
export function hashDateString(dateStr: string): number {
  let hash = 0;
  for (let i = 0; i < dateStr.length; i++) {
    hash = (hash * 31 + dateStr.charCodeAt(i)) & 0xffffffff;
  }
  return Math.abs(hash);
}

/**
 * Deterministically selects today's question from the bank.
 * The question id is derived from the date seed so it cannot drift.
 */
export function pickDailyChallengeQuestion(
  dateStr: string,
  bank: QuizQuestion[] = MOCK_QUIZ_QUESTIONS
): QuizQuestion | null {
  if (bank.length === 0) return null;
  const hash = hashDateString(dateStr);
  const index = hash % bank.length;
  return bank[index];
}

/**
 * Builds the Home-dashboard preview card for today's challenge.
 */
export function buildDailyChallengePreview(
  dateStr: string,
  bank: QuizQuestion[] = MOCK_QUIZ_QUESTIONS
): DailyChallengePreview | null {
  const question = pickDailyChallengeQuestion(dateStr, bank);
  if (!question) return null;
  return {
    id: `dc-${dateStr}`,
    title: {
      en: "Today's Science Challenge",
      ta: 'இன்றைய அறிவியல் சவால்',
    },
    questionPreview: {
      en: question.question.en,
      ta: question.question.ta,
    },
    durationMinutes: 2,
    xpReward: 50,
  };
}