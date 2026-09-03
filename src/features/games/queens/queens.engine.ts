/**
 * Queens Game Engine
 * Validates row, column, region uniqueness, and 8-direction non-adjacency rules.
 */

import { QueenCellState, QueensLevel } from './queens.types';

export function getQueensConflicts(
  grid: QueenCellState[][],
  level: QueensLevel
): { row: number; col: number }[] {
  const conflicts: Set<string> = new Set();
  const queenPositions: { row: number; col: number }[] = [];

  for (let r = 0; r < level.size; r++) {
    for (let c = 0; c < level.size; c++) {
      if (grid[r][c] === 'queen') {
        queenPositions.push({ row: r, col: c });
      }
    }
  }

  // 1. Check Row Conflicts (> 1 queen in same row)
  for (let r = 0; r < level.size; r++) {
    const rowQueens = queenPositions.filter((q) => q.row === r);
    if (rowQueens.length > 1) {
      rowQueens.forEach((q) => conflicts.add(`${q.row},${q.col}`));
    }
  }

  // 2. Check Col Conflicts (> 1 queen in same col)
  for (let c = 0; c < level.size; c++) {
    const colQueens = queenPositions.filter((q) => q.col === c);
    if (colQueens.length > 1) {
      colQueens.forEach((q) => conflicts.add(`${q.row},${q.col}`));
    }
  }

  // 3. Check Region Conflicts (> 1 queen in same region)
  const regionQueens: Record<number, { row: number; col: number }[]> = {};
  for (const q of queenPositions) {
    const regId = level.regions[q.row][q.col];
    if (!regionQueens[regId]) regionQueens[regId] = [];
    regionQueens[regId].push(q);
  }
  for (const [, qList] of Object.entries(regionQueens)) {
    if (qList.length > 1) {
      qList.forEach((q) => conflicts.add(`${q.row},${q.col}`));
    }
  }

  // 4. Check 8-Direction Adjacency Conflicts (no two queens can touch horizontally, vertically, or diagonally)
  for (let i = 0; i < queenPositions.length; i++) {
    for (let j = i + 1; j < queenPositions.length; j++) {
      const q1 = queenPositions[i];
      const q2 = queenPositions[j];
      const dRow = Math.abs(q1.row - q2.row);
      const dCol = Math.abs(q1.col - q2.col);

      // Touching if dRow <= 1 and dCol <= 1
      if (dRow <= 1 && dCol <= 1) {
        conflicts.add(`${q1.row},${q1.col}`);
        conflicts.add(`${q2.row},${q2.col}`);
      }
    }
  }

  return Array.from(conflicts).map((key) => {
    const [row, col] = key.split(',').map(Number);
    return { row, col };
  });
}

export function isQueensComplete(
  grid: QueenCellState[][],
  level: QueensLevel
): boolean {
  const queenPositions: { row: number; col: number }[] = [];
  for (let r = 0; r < level.size; r++) {
    for (let c = 0; c < level.size; c++) {
      if (grid[r][c] === 'queen') {
        queenPositions.push({ row: r, col: c });
      }
    }
  }

  if (queenPositions.length !== level.size) {
    return false;
  }

  const conflicts = getQueensConflicts(grid, level);
  return conflicts.length === 0;
}
