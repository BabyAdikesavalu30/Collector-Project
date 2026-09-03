/**
 * Dedicated Verification Script for Game 6: Queens
 * Tests all 15 Queens levels, row/column/region uniqueness, 8-direction proximity rules, and completion.
 */

import { QUEENS_LEVELS } from '../features/games/queens/queens.levels';
import { getQueensConflicts, isQueensComplete } from '../features/games/queens/queens.engine';

function assert(condition: boolean, message: string) {
  if (!condition) {
    console.error(`❌ ASSERTION FAILED [Queens]: ${message}`);
    process.exit(1);
  } else {
    console.log(`✅ [Queens] ${message}`);
  }
}

export function runQueensVerification() {
  console.log('\n--- VERIFYING GAME 6: QUEENS (15 LEVELS) ---\n');

  assert(QUEENS_LEVELS.length === 15, 'Queens has exactly 15 levels');

  QUEENS_LEVELS.forEach((level, idx) => {
    assert(level.size === 4 || level.size === 5, `Level ${idx + 1} size is valid (${level.size}x${level.size})`);
    assert(level.regions.length === level.size, `Level ${idx + 1} region map matches size`);
    assert(level.solution.length === level.size, `Level ${idx + 1} solution has exactly ${level.size} queens`);

    const qGrid = Array.from({ length: level.size }, () =>
      Array(level.size).fill('empty' as const)
    );
    level.solution.forEach((q) => {
      qGrid[q.row][q.col] = 'queen';
    });

    assert(isQueensComplete(qGrid, level), `Level ${idx + 1} solution satisfies non-attacking and region rules`);
  });

  // Test Touching Queens Conflict (diagonal)
  const diagonalConflictGrid: ('empty' | 'queen' | 'cross')[][] = [
    ['queen', 'empty', 'empty', 'empty'],
    ['empty', 'queen', 'empty', 'empty'], // Diagonally touching
    ['empty', 'empty', 'empty', 'empty'],
    ['empty', 'empty', 'empty', 'empty'],
  ];
  const qConf = getQueensConflicts(diagonalConflictGrid, QUEENS_LEVELS[0]);
  assert(qConf.length > 0, 'Diagonally touching queens detected as conflict');

  console.log('\n🎉 ALL 15 QUEENS LEVELS & ENGINE VERIFIED SUCCESSFULLY!\n');
}

runQueensVerification();
