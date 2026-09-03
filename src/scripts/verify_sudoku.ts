/**
 * Dedicated Verification Script for Game 4: Mini Sudoku
 * Tests all 15 4x4 Sudoku levels, row/column/2x2 box uniqueness, conflict detection, and completion.
 */

import { SUDOKU_LEVELS } from '../features/games/sudoku/sudoku.levels';
import { getSudokuConflicts, isSudokuComplete } from '../features/games/sudoku/sudoku.engine';

function assert(condition: boolean, message: string) {
  if (!condition) {
    console.error(`❌ ASSERTION FAILED [Mini Sudoku]: ${message}`);
    process.exit(1);
  } else {
    console.log(`✅ [Mini Sudoku] ${message}`);
  }
}

export function runSudokuVerification() {
  console.log('\n--- VERIFYING GAME 4: MINI SUDOKU (15 LEVELS) ---\n');

  assert(SUDOKU_LEVELS.length === 15, 'Mini Sudoku has exactly 15 levels');

  SUDOKU_LEVELS.forEach((level, idx) => {
    assert(level.initialGrid.length === 4, `Level ${idx + 1} initial grid has 4 rows`);
    assert(level.solution.length === 4, `Level ${idx + 1} solution has 4 rows`);
    assert(isSudokuComplete(level.solution, level), `Level ${idx + 1} solution satisfies 4x4 Latin Square & 2x2 box constraints`);
  });

  // Test Conflict Detection
  const duplicateInRow = [
    [1, 1, 3, 4],
    [3, 4, 1, 2],
    [2, 3, 4, 1],
    [4, 2, 2, 3],
  ];
  const rowConflicts = getSudokuConflicts(duplicateInRow);
  assert(rowConflicts.length > 0, 'Row duplicate is flagged as conflict');

  const duplicateInBox = [
    [1, 2, 3, 4],
    [2, 4, 1, 3], // Box 0,0 has two '2's
    [3, 1, 4, 2],
    [4, 3, 2, 1],
  ];
  const boxConflicts = getSudokuConflicts(duplicateInBox);
  assert(boxConflicts.length > 0, '2x2 Box duplicate is flagged as conflict');

  console.log('\n🎉 ALL 15 MINI SUDOKU LEVELS & ENGINE VERIFIED SUCCESSFULLY!\n');
}

runSudokuVerification();
