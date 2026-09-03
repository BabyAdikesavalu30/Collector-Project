import { ElementItem, ElementMatchLevel } from './element-match.types';

export function checkElementMatch(
  selectedSymbolId: string,
  selectedNameId: string
): boolean {
  return selectedSymbolId === selectedNameId;
}

export function isElementMatchComplete(
  matchedIds: string[],
  level: ElementMatchLevel
): boolean {
  return matchedIds.length === level.elements.length;
}

export function calculateElementScore(
  moves: number,
  mistakes: number,
  elapsedSeconds: number,
  elementCount: number
): { score: number; stars: 1 | 2 | 3; isPerfect: boolean } {
  const baseScore = elementCount * 100;
  const mistakePenalty = mistakes * 25;
  const timePenalty = Math.min(100, Math.floor(elapsedSeconds * 2));
  const score = Math.max(50, baseScore - mistakePenalty - timePenalty);

  const isPerfect = mistakes === 0;
  let stars: 1 | 2 | 3 = 1;
  if (mistakes === 0 && elapsedSeconds < elementCount * 8) {
    stars = 3;
  } else if (mistakes <= 1) {
    stars = 2;
  }

  return { score, stars, isPerfect };
}
