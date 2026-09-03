import { PatternLabLevel } from './pattern-lab.types';

export function isPatternAnswerCorrect(
  selectedOptionId: string,
  level: PatternLabLevel
): boolean {
  return selectedOptionId === level.correctOptionId;
}

export function calculatePatternScore(
  mistakes: number,
  elapsedSeconds: number
): { score: number; stars: 1 | 2 | 3; isPerfect: boolean } {
  const isPerfect = mistakes === 0;
  let stars: 1 | 2 | 3 = 1;
  if (mistakes === 0 && elapsedSeconds < 15) {
    stars = 3;
  } else if (mistakes <= 1) {
    stars = 2;
  }
  const score = Math.max(50, 150 - mistakes * 40 - elapsedSeconds * 2);
  return { score, stars, isPerfect };
}
