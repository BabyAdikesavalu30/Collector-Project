/**
 * Tango Game Engine
 * Validates Sun ☀️ & Moon 🌙 balance, no-3-in-a-row rules, and equality/opposite clues.
 */

import { TangoSymbol, TangoClue, TangoLevel } from './tango.types';

export function getTangoConflicts(
  grid: TangoSymbol[][],
  clues: TangoClue[]
): { row: number; col: number }[] {
  const conflicts: Set<string> = new Set();

  // 1. Check > 2 suns or > 2 moons in any row
  for (let r = 0; r < 4; r++) {
    let suns = 0;
    let moons = 0;
    for (let c = 0; c < 4; c++) {
      if (grid[r][c] === 'sun') suns++;
      if (grid[r][c] === 'moon') moons++;
    }
    if (suns > 2 || moons > 2) {
      for (let c = 0; c < 4; c++) {
        if (grid[r][c] !== null) conflicts.add(`${r},${c}`);
      }
    }
  }

  // 2. Check > 2 suns or > 2 moons in any col
  for (let c = 0; c < 4; c++) {
    let suns = 0;
    let moons = 0;
    for (let r = 0; r < 4; r++) {
      if (grid[r][c] === 'sun') suns++;
      if (grid[r][c] === 'moon') moons++;
    }
    if (suns > 2 || moons > 2) {
      for (let r = 0; r < 4; r++) {
        if (grid[r][c] !== null) conflicts.add(`${r},${c}`);
      }
    }
  }

  // 3. Check 3 consecutive identical symbols in rows
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c <= 1; c++) {
      const a = grid[r][c];
      const b = grid[r][c + 1];
      const d = grid[r][c + 2];
      if (a !== null && a === b && b === d) {
        conflicts.add(`${r},${c}`);
        conflicts.add(`${r},${c + 1}`);
        conflicts.add(`${r},${c + 2}`);
      }
    }
  }

  // 4. Check 3 consecutive identical symbols in cols
  for (let c = 0; c < 4; c++) {
    for (let r = 0; r <= 1; r++) {
      const a = grid[r][c];
      const b = grid[r + 1][c];
      const d = grid[r + 2][c];
      if (a !== null && a === b && b === d) {
        conflicts.add(`${r},${c}`);
        conflicts.add(`${r + 1},${c}`);
        conflicts.add(`${r + 2},${c}`);
      }
    }
  }

  // 5. Check clues
  for (const clue of clues) {
    const s1 = grid[clue.cell1.row][clue.cell1.col];
    const s2 = grid[clue.cell2.row][clue.cell2.col];
    if (s1 !== null && s2 !== null) {
      if (clue.type === 'equal' && s1 !== s2) {
        conflicts.add(`${clue.cell1.row},${clue.cell1.col}`);
        conflicts.add(`${clue.cell2.row},${clue.cell2.col}`);
      } else if (clue.type === 'opposite' && s1 === s2) {
        conflicts.add(`${clue.cell1.row},${clue.cell1.col}`);
        conflicts.add(`${clue.cell2.row},${clue.cell2.col}`);
      }
    }
  }

  return Array.from(conflicts).map((key) => {
    const [row, col] = key.split(',').map(Number);
    return { row, col };
  });
}

export function isTangoComplete(grid: TangoSymbol[][], level: TangoLevel): boolean {
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 4; c++) {
      if (grid[r][c] === null) return false;
      if (grid[r][c] !== level.solution[r][c]) return false;
    }
  }

  const conflicts = getTangoConflicts(grid, level.clues);
  return conflicts.length === 0;
}
