import { LogicLockLevel } from './logic-lock.types';

export function isLockSolved(guess: string[], level: LogicLockLevel): boolean {
  if (guess.length !== level.solution.length) return false;
  return level.solution.every((digit, idx) => digit === guess[idx]);
}

export function calculateLockScore(
  mistakes: number,
  elapsedSeconds: number
): { score: number; stars: 1 | 2 | 3; isPerfect: boolean } {
  const isPerfect = mistakes === 0;
  let stars: 1 | 2 | 3 = 1;
  if (mistakes === 0 && elapsedSeconds < 30) {
    stars = 3;
  } else if (mistakes <= 2) {
    stars = 2;
  }
  const score = Math.max(50, 200 - mistakes * 25 - elapsedSeconds);
  return { score, stars, isPerfect };
}
