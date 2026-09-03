/**
 * Mini Sudoku Game Engine
 * Validates 4x4 row, column, and 2x2 box uniqueness rules.
 */

import { SudokuGrid, SudokuCellVal, SudokuLevel } from './sudoku.types';

export function getSudokuConflicts(grid: SudokuGrid): { row: number; col: number }[] {
  const conflicts: Set<string> = new Set();

  // 1. Check Row Conflicts
  for (let r = 0; r < 4; r++) {
    const seen: Record<number, number[]> = {};
    for (let c = 0; c < 4; c++) {
      const val = grid[r][c];
      if (val !== null) {
        if (!seen[val]) seen[val] = [];
        seen[val].push(c);
      }
    }
    for (const [, cols] of Object.entries(seen)) {
      if (cols.length > 1) {
        cols.forEach((c) => conflicts.add(`${r},${c}`));
      }
    }
  }

  // 2. Check Column Conflicts
  for (let c = 0; c < 4; c++) {
    const seen: Record<number, number[]> = {};
    for (let r = 0; r < 4; r++) {
      const val = grid[r][c];
      if (val !== null) {
        if (!seen[val]) seen[val] = [];
        seen[val].push(r);
      }
    }
    for (const [, rows] of Object.entries(seen)) {
      if (rows.length > 1) {
        rows.forEach((r) => conflicts.add(`${r},${c}`));
      }
    }
  }

  // 3. Check 2x2 Box Region Conflicts
  const regions = [
    [
      { r: 0, c: 0 },
      { r: 0, c: 1 },
      { r: 1, c: 0 },
      { r: 1, c: 1 },
    ],
    [
      { r: 0, c: 2 },
      { r: 0, c: 3 },
      { r: 1, c: 2 },
      { r: 1, c: 3 },
    ],
    [
      { r: 2, c: 0 },
      { r: 2, c: 1 },
      { r: 3, c: 0 },
      { r: 3, c: 1 },
    ],
    [
      { r: 2, c: 2 },
      { r: 2, c: 3 },
      { r: 3, c: 2 },
      { r: 3, c: 3 },
    ],
  ];

  for (const box of regions) {
    const seen: Record<number, { r: number; c: number }[]> = {};
    for (const cell of box) {
      const val = grid[cell.r][cell.c];
      if (val !== null) {
        if (!seen[val]) seen[val] = [];
        seen[val].push(cell);
      }
    }
    for (const [, cells] of Object.entries(seen)) {
      if (cells.length > 1) {
        cells.forEach((cell) => conflicts.add(`${cell.r},${cell.c}`));
      }
    }
  }

  return Array.from(conflicts).map((key) => {
    const [row, col] = key.split(',').map(Number);
    return { row, col };
  });
}

export function isSudokuComplete(grid: SudokuGrid, level: SudokuLevel): boolean {
  // All cells must be non-null
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 4; c++) {
      if (grid[r][c] === null) return false;
      if (grid[r][c] !== level.solution[r][c]) return false;
    }
  }

  const conflicts = getSudokuConflicts(grid);
  return conflicts.length === 0;
}
