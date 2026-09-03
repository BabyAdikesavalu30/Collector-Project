import { SortItem, ReactionSortLevel } from './reaction-sort.types';

export function isSortCorrect(item: SortItem, targetCategoryKey: string): boolean {
  return item.categoryKey === targetCategoryKey;
}

export function isReactionSortComplete(
  sortedCount: number,
  level: ReactionSortLevel
): boolean {
  return sortedCount >= level.items.length;
}

export function calculateSortScore(
  mistakes: number,
  elapsedSeconds: number,
  totalItems: number
): { score: number; stars: 1 | 2 | 3; isPerfect: boolean } {
  const isPerfect = mistakes === 0;
  let stars: 1 | 2 | 3 = 1;
  if (mistakes === 0 && elapsedSeconds < totalItems * 5) {
    stars = 3;
  } else if (mistakes <= 1) {
    stars = 2;
  }
  const score = Math.max(50, totalItems * 100 - mistakes * 25 - elapsedSeconds);
  return { score, stars, isPerfect };
}
