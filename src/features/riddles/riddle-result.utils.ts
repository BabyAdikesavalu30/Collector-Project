/**
 * Riddle Result Utilities
 * Performance tier calculations and fallback parameter parsers.
 */

import { RiddleDifficulty, RiddleResult } from './riddle.types';
import { isValidRiddleDifficulty } from './riddle.utils';

export type RiddlePerformanceTier = 'excellent' | 'great' | 'good' | 'practice';

export function getRiddlePerformanceTier(
  solvedRiddles: number,
  totalRiddles: number
): RiddlePerformanceTier {
  if (totalRiddles <= 0) return 'practice';
  const percentage = (solvedRiddles / totalRiddles) * 100;

  if (percentage >= 90) return 'excellent';
  if (percentage >= 70) return 'great';
  if (percentage >= 40) return 'good';
  return 'practice';
}

export function createRiddleFallbackResult(
  params: Record<string, string | undefined> | null
): RiddleResult | null {
  if (!params) return null;

  const difficultyStr = params.difficulty;
  const difficulty: RiddleDifficulty = isValidRiddleDifficulty(difficultyStr)
    ? difficultyStr
    : 'easy';

  const totalRiddles = parseInt(params.totalRiddles || '5', 10);
  const solvedRiddles = parseInt(params.solvedRiddles || '0', 10);
  const skippedRiddles = parseInt(params.skippedRiddles || '0', 10);
  const score = parseInt(params.score || '0', 10);
  const hintsUsed = parseInt(params.hintsUsed || '0', 10);
  const bestStreak = parseInt(params.bestStreak || '0', 10);
  const completedAt = parseInt(params.completedAt || String(Date.now()), 10);

  // Validate essential bounds
  if (isNaN(totalRiddles) || isNaN(solvedRiddles) || isNaN(score)) {
    return null;
  }

  return {
    difficulty,
    totalRiddles: Math.max(1, totalRiddles),
    solvedRiddles: Math.max(0, solvedRiddles),
    skippedRiddles: Math.max(0, skippedRiddles),
    score: Math.max(0, score),
    hintsUsed: Math.max(0, hintsUsed),
    bestStreak: Math.max(0, bestStreak),
    completedAt,
  };
}
