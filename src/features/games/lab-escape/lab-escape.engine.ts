import { LabEscapeLevel } from './lab-escape.types';

export function isStageAnswerCorrect(
  stageIndex: number,
  optionId: string,
  level: LabEscapeLevel
): boolean {
  const stage = level.stages[stageIndex];
  if (!stage) return false;
  return stage.correctOptionId === optionId;
}

export function isLabEscapeComplete(
  currentStageIndex: number,
  level: LabEscapeLevel
): boolean {
  return currentStageIndex >= level.stages.length;
}

export function calculateEscapeScore(
  mistakes: number,
  elapsedSeconds: number,
  stageCount: number
): { score: number; stars: 1 | 2 | 3; isPerfect: boolean } {
  const isPerfect = mistakes === 0;
  let stars: 1 | 2 | 3 = 1;
  if (mistakes === 0 && elapsedSeconds < stageCount * 15) {
    stars = 3;
  } else if (mistakes <= 1) {
    stars = 2;
  }
  const score = Math.max(50, stageCount * 100 - mistakes * 30 - elapsedSeconds);
  return { score, stars, isPerfect };
}
