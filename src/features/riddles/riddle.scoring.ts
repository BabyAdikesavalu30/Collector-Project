/**
 * Riddle Scoring Utilities
 * Deterministic scoring formulas and streak tracking.
 */

export function calculateRiddlePoints(
  basePoints: number,
  attemptNumber: number,
  isCorrect: boolean
): number {
  if (!isCorrect) return 0;
  if (attemptNumber <= 1) return basePoints;
  // Attempt 2 correct earns half points rounded up
  return Math.ceil(basePoints / 2);
}

export function updateRiddleStreak(
  currentStreak: number,
  bestStreak: number,
  isCorrect: boolean
): { currentStreak: number; bestStreak: number } {
  if (isCorrect) {
    const nextCurrent = currentStreak + 1;
    return {
      currentStreak: nextCurrent,
      bestStreak: Math.max(bestStreak, nextCurrent),
    };
  }

  return {
    currentStreak: 0,
    bestStreak,
  };
}
