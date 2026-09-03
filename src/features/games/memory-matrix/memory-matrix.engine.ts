import { MemoryCard, MemoryMatrixLevel } from './memory-matrix.types';

export function isCardPairMatch(cardA: MemoryCard, cardB: MemoryCard): boolean {
  return cardA.pairId === cardB.pairId && cardA.id !== cardB.id;
}

export function isMemoryMatrixComplete(
  matchedPairIds: string[],
  level: MemoryMatrixLevel
): boolean {
  const totalPairs = level.cards.length / 2;
  return matchedPairIds.length >= totalPairs;
}

export function calculateMemoryScore(
  moves: number,
  mistakes: number,
  elapsedSeconds: number,
  totalPairs: number
): { score: number; stars: 1 | 2 | 3; isPerfect: boolean } {
  const isPerfect = mistakes === 0;
  let stars: 1 | 2 | 3 = 1;
  if (mistakes <= 1 && elapsedSeconds < totalPairs * 8) {
    stars = 3;
  } else if (mistakes <= totalPairs) {
    stars = 2;
  }
  const score = Math.max(50, totalPairs * 100 - mistakes * 20 - elapsedSeconds * 2);
  return { score, stars, isPerfect };
}
