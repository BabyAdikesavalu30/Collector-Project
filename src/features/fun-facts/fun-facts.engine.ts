/**
 * Fun Facts Engine
 * Deterministic daily fact selection, quiz logic, and game mechanics.
 */

import { FunFact, FunFactCategory, FactQuestion, FunFactMode, FunFactsResult } from './fun-facts.types';
import { FUN_FACTS, FACT_QUESTIONS } from './fun-facts.mock';

/**
 * Simple deterministic hash from date string to integer.
 */
function dateHash(dateStr: string): number {
  let hash = 0;
  for (let i = 0; i < dateStr.length; i++) {
    const char = dateStr.charCodeAt(i);
    hash = ((hash << 5) - hash + char) | 0;
  }
  return Math.abs(hash);
}

/**
 * Get today's date string in YYYY-MM-DD format (local time).
 */
export function getTodayString(): string {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const d = String(now.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

/**
 * Get the daily deterministic fact for a given date.
 */
export function getDailyFact(dateStr?: string): FunFact {
  const date = dateStr || getTodayString();
  const hash = dateHash(date);
  const index = hash % FUN_FACTS.length;
  return FUN_FACTS[index];
}

/**
 * Get facts filtered by category.
 */
export function getFactsByCategory(category: FunFactCategory | 'all'): FunFact[] {
  if (category === 'all') return [...FUN_FACTS];
  return FUN_FACTS.filter((f) => f.category === category);
}

/**
 * Search facts by text query (searches fact text, tags, and category).
 */
export function searchFacts(query: string): FunFact[] {
  const q = query.toLowerCase().trim();
  if (!q) return [...FUN_FACTS];
  return FUN_FACTS.filter(
    (f) =>
      f.fact.en.toLowerCase().includes(q) ||
      f.fact.ta.toLowerCase().includes(q) ||
      f.tags.some((t) => t.toLowerCase().includes(q)) ||
      f.category.toLowerCase().includes(q)
  );
}

/**
 * Get a random subset of facts for swipe mode.
 */
export function getSwipeFacts(count: number = 20, seed?: number): FunFact[] {
  const shuffled = [...FUN_FACTS];
  let s = seed ?? Date.now();
  for (let i = shuffled.length - 1; i > 0; i--) {
    s = (s * 1103515245 + 12345) & 0x7fffffff;
    const j = s % (i + 1);
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled.slice(0, Math.min(count, shuffled.length));
}

/**
 * Get true/false questions.
 */
export function getTrueFalseQuestions(count: number = 10): FactQuestion[] {
  const tf = FACT_QUESTIONS.filter((q) => q.type === 'true-false');
  const shuffled = [...tf];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled.slice(0, Math.min(count, shuffled.length));
}

/**
 * Get multiple choice questions.
 */
export function getMultipleChoiceQuestions(count: number = 10): FactQuestion[] {
  const mc = FACT_QUESTIONS.filter((q) => q.type === 'multiple-choice');
  const shuffled = [...mc];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled.slice(0, Math.min(count, shuffled.length));
}

/**
 * Get quiz questions (mix of true/false and multiple choice).
 */
export function getQuizQuestions(count: number = 5): FactQuestion[] {
  const tfCount = Math.min(Math.ceil(count / 2), FACT_QUESTIONS.filter((q) => q.type === 'true-false').length);
  const mcCount = count - tfCount;
  const tf = getTrueFalseQuestions(tfCount);
  const mc = getMultipleChoiceQuestions(mcCount);
  const all = [...tf, ...mc];
  for (let i = all.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [all[i], all[j]] = [all[j], all[i]];
  }
  return all.slice(0, count);
}

/**
 * Validate a true/false answer.
 */
export function validateTrueFalse(question: FactQuestion, answer: string): boolean {
  return question.correctAnswer === answer;
}

/**
 * Validate a multiple-choice answer.
 */
export function validateMultipleChoice(question: FactQuestion, answer: string): boolean {
  return question.correctAnswer === answer;
}

/**
 * Calculate quiz result.
 */
export function calculateQuizResult(
  questions: FactQuestion[],
  answers: string[],
  mode: FunFactMode
): FunFactsResult {
  let correct = 0;
  let wrong = 0;
  let streak = 0;
  let bestStreak = 0;

  for (let i = 0; i < questions.length; i++) {
    const q = questions[i];
    const a = answers[i] || '';
    const isCorrect =
      q.type === 'true-false'
        ? validateTrueFalse(q, a)
        : validateMultipleChoice(q, a);

    if (isCorrect) {
      correct++;
      streak++;
      if (streak > bestStreak) bestStreak = streak;
    } else {
      wrong++;
      streak = 0;
    }
  }

  const score = correct * (mode === 'true-false' ? 5 : 10);

  return {
    mode,
    totalQuestions: questions.length,
    correctAnswers: correct,
    wrongAnswers: wrong,
    score,
    streak: bestStreak,
    completedAt: Date.now(),
  };
}

/**
 * Get daily streak info from history.
 */
export function calculateStreak(dates: string[]): { current: number; longest: number } {
  if (dates.length === 0) return { current: 0, longest: 0 };
  const sorted = [...new Set(dates)].sort().reverse();
  const today = getTodayString();
  const yesterday = getYesterdayString();

  let current = 0;
  let longest = 0;
  let tempStreak = 0;

  for (let i = 0; i < sorted.length; i++) {
    if (i === 0 && sorted[i] !== today && sorted[i] !== yesterday) break;
    if (i === 0) {
      tempStreak = 1;
    } else {
      const prev = new Date(sorted[i - 1]);
      const curr = new Date(sorted[i]);
      const diffDays = Math.round((prev.getTime() - curr.getTime()) / (1000 * 60 * 60 * 24));
      if (diffDays === 1) {
        tempStreak++;
      } else {
        if (tempStreak > longest) longest = tempStreak;
        tempStreak = 1;
      }
    }
  }
  if (tempStreak > longest) longest = tempStreak;
  if (sorted[0] === today || sorted[0] === yesterday) current = tempStreak;

  return { current, longest };
}

function getYesterdayString(): string {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}
