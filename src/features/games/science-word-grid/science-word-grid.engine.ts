import { ScienceWordGridLevel, WordGridWord } from './science-word-grid.types';

export function checkWordSelection(
  selectedCells: { row: number; col: number }[],
  level: ScienceWordGridLevel
): WordGridWord | undefined {
  if (selectedCells.length < 3) return undefined;

  for (const w of level.words) {
    if (w.path.length !== selectedCells.length) continue;

    // Check exact path or reverse path
    const isExact = w.path.every(
      (cell, idx) => cell.row === selectedCells[idx].row && cell.col === selectedCells[idx].col
    );
    const isReverse = w.path.every(
      (cell, idx) =>
        cell.row === selectedCells[selectedCells.length - 1 - idx].row &&
        cell.col === selectedCells[selectedCells.length - 1 - idx].col
    );

    if (isExact || isReverse) {
      return w;
    }
  }

  return undefined;
}

export function isScienceWordGridComplete(
  foundWordIds: string[],
  level: ScienceWordGridLevel
): boolean {
  return foundWordIds.length >= level.words.length;
}

export function calculateWordGridScore(
  moves: number,
  mistakes: number,
  elapsedSeconds: number,
  totalWords: number
): { score: number; stars: 1 | 2 | 3; isPerfect: boolean } {
  const isPerfect = mistakes === 0;
  let stars: 1 | 2 | 3 = 1;
  if (mistakes === 0 && elapsedSeconds < totalWords * 10) {
    stars = 3;
  } else if (mistakes <= 2) {
    stars = 2;
  }
  const score = Math.max(50, totalWords * 100 - mistakes * 20 - elapsedSeconds);
  return { score, stars, isPerfect };
}
