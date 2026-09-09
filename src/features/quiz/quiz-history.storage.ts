/**
 * Quiz History Storage & Analytics Service
 * Persists quiz results locally (offline-safe) and computes real points,
 * streaks, accuracy, and subject-wise breakdowns for the Progress,
 * Achievements, and Daily Challenge screens.
 */

import { storage, STORAGE_KEYS } from '../../storage/asyncStorage';
import { recordActivity } from '../activity';
import { QuizResult } from './quiz.types';
import { QuizHistoryEntry, QuizStats, QuizSubjectStats } from './quiz-history.types';

export const QUIZ_HISTORY_KEY = STORAGE_KEYS.QUIZ_HISTORY;

/**
 * Returns a local YYYY-MM-DD date string (used for streak calculations).
 */
export function getQuizDateString(timestamp: number = Date.now()): string {
  const d = new Date(timestamp);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Day difference between two YYYY-MM-DD strings (dateB - dateA).
 */
export function getQuizDayDifference(dateA: string, dateB: string): number {
  const msPerDay = 1000 * 60 * 60 * 24;
  const utcA = Date.UTC(
    parseInt(dateA.substring(0, 4), 10),
    parseInt(dateA.substring(5, 7), 10) - 1,
    parseInt(dateA.substring(8, 10), 10)
  );
  const utcB = Date.UTC(
    parseInt(dateB.substring(0, 4), 10),
    parseInt(dateB.substring(5, 7), 10) - 1,
    parseInt(dateB.substring(8, 10), 10)
  );
  return Math.round((utcB - utcA) / msPerDay);
}

/**
 * Retrieves all persisted quiz attempts, most recent first.
 */
export async function getQuizHistory(): Promise<QuizHistoryEntry[]> {
  try {
    const list = await storage.getItem<QuizHistoryEntry[]>(QUIZ_HISTORY_KEY);
    if (!Array.isArray(list)) return [];
    return [...list].sort((a, b) => b.completedAt - a.completedAt);
  } catch {
    return [];
  }
}

/**
 * Persists a completed quiz result and returns the stored entry.
 * Regular quizzes and the daily challenge both flow through here so every
 * attempt counts toward points, streaks, accuracy, and subject stats.
 */
export async function saveQuizResult(
  result: Pick<
    QuizResult,
    'config' | 'totalQuestions' | 'correctAnswers' | 'wrongAnswers' | 'unansweredQuestions' | 'score' | 'percentage' | 'bestStreak' | 'completedAt'
  >,
  extra?: { isDailyChallenge?: boolean }
): Promise<QuizHistoryEntry> {
  const entry: QuizHistoryEntry = {
    id: `qz-${result.completedAt}-${result.config.pathwayId}`,
    levelId: result.config.levelId,
    subjectId: result.config.subjectId,
    pathwayId: result.config.pathwayId,
    difficulty: result.config.difficulty,
    totalQuestions: result.totalQuestions,
    correctAnswers: result.correctAnswers,
    wrongAnswers: result.wrongAnswers,
    unansweredQuestions: result.unansweredQuestions,
    score: result.score,
    percentage: result.percentage,
    bestStreak: result.bestStreak,
    completedAt: result.completedAt,
    isDailyChallenge: Boolean(extra?.isDailyChallenge),
  };

  const existing = await getQuizHistory();
  // Avoid double-counting the exact same completion (same timestamp + pathway)
  const deduped = existing.filter((e) => e.id !== entry.id);
  await storage.setItem(QUIZ_HISTORY_KEY, [entry, ...deduped]);

  // Safe, additive shared integration: feed the unified activity/XP layer.
  // This does not alter quiz storage, scoring, or navigation behavior.
  await recordActivity({
    type: 'quiz_completed',
    dedupeKey: `quiz-${entry.id}`,
    title: 'Quiz Completed',
    titleTa: 'வினாடி வினா முடிந்தது',
    subtitle: `${result.config.subjectId} • ${result.percentage}%`,
    subtitleTa: `${result.config.subjectId} • ${result.percentage}%`,
    timestamp: result.completedAt,
    metadata: {
      subjectId: result.config.subjectId,
      pathwayId: result.config.pathwayId,
      percentage: result.percentage,
      icon: '🔬',
    },
  });

  return entry;
}

/**
 * Computes streak days from a list of quiz completions (pure, testable).
 * A streak counts consecutive calendar days with at least one quiz, measured
 * from the most recent activity day (today counts once completed).
 */
export function computeStreakDays(history: QuizHistoryEntry[]): {
  currentStreakDays: number;
  longestStreakDays: number;
  streakHistory: string[];
} {
  const uniqueDates = Array.from(
    new Set(history.map((e) => getQuizDateString(e.completedAt)))
  ).sort();

  // Longest run of consecutive days in the full history
  let longest = 0;
  let run = 0;
  let prev: string | null = null;
  for (const date of uniqueDates) {
    if (prev !== null && getQuizDayDifference(prev, date) === 1) {
      run += 1;
    } else {
      run = 1;
    }
    if (run > longest) longest = run;
    prev = date;
  }

  // Current streak: consecutive days ending at the most recent activity day
  let current = 0;
  if (uniqueDates.length > 0) {
    let idx = uniqueDates.length - 1;
    current = 1;
    while (idx > 0 && getQuizDayDifference(uniqueDates[idx - 1], uniqueDates[idx]) === 1) {
      current += 1;
      idx -= 1;
    }
  }

  return {
    currentStreakDays: current,
    longestStreakDays: longest,
    streakHistory: uniqueDates,
  };
}

/**
 * Computes full analytics from quiz history (pure, testable).
 */
export function computeQuizStats(history: QuizHistoryEntry[]): QuizStats {
  const subjectMap = new Map<string, { quizzes: number; attempted: number; correct: number }>();

  let totalPoints = 0;
  let totalAttempted = 0;
  let totalCorrect = 0;

  for (const entry of history) {
    totalPoints += entry.score;
    totalAttempted += entry.totalQuestions;
    totalCorrect += entry.correctAnswers;

    const s = subjectMap.get(entry.subjectId) || { quizzes: 0, attempted: 0, correct: 0 };
    s.quizzes += 1;
    s.attempted += entry.totalQuestions;
    s.correct += entry.correctAnswers;
    subjectMap.set(entry.subjectId, s);
  }

  const subjectStats: QuizSubjectStats[] = Array.from(subjectMap.entries()).map(
    ([subjectId, s]) => ({
      subjectId,
      quizzesCompleted: s.quizzes,
      questionsAttempted: s.attempted,
      correctAnswers: s.correct,
      accuracy: s.attempted > 0 ? Math.round((s.correct / s.attempted) * 100) : 0,
    })
  );

  const streaks = computeStreakDays(history);

  return {
    totalPoints,
    quizzesCompleted: history.length,
    totalQuestionsAttempted: totalAttempted,
    totalCorrectAnswers: totalCorrect,
    overallAccuracy: totalAttempted > 0 ? Math.round((totalCorrect / totalAttempted) * 100) : 0,
    currentStreakDays: streaks.currentStreakDays,
    longestStreakDays: streaks.longestStreakDays,
    streakHistory: streaks.streakHistory,
    subjectStats,
  };
}

/**
 * Retrieves full quiz analytics (reads storage then computes).
 */
export async function getQuizStats(): Promise<QuizStats> {
  const history = await getQuizHistory();
  return computeQuizStats(history);
}