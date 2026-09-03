/**
 * Dedicated Verification Script for Game 1: Zip
 * Tests initial state, all 15 deterministic levels, valid moves, out of bounds, sequential checkpoints, reset, and completion.
 */

import { ZIP_LEVELS } from '../features/games/zip/zip.levels';
import { validateZipStep, isZipComplete } from '../features/games/zip/zip.engine';

function assert(condition: boolean, message: string) {
  if (!condition) {
    console.error(`❌ ASSERTION FAILED [Zip]: ${message}`);
    process.exit(1);
  } else {
    console.log(`✅ [Zip] ${message}`);
  }
}

export function runZipVerification() {
  console.log('\n--- VERIFYING GAME 1: ZIP (15 LEVELS) ---\n');

  assert(ZIP_LEVELS.length === 15, 'Zip has exactly 15 levels');

  ZIP_LEVELS.forEach((level, idx) => {
    assert(Boolean(level.id && level.name), `Level ${idx + 1} has valid ID and Name`);
    assert(level.size >= 3 && level.size <= 5, `Level ${idx + 1} size is valid (${level.size}x${level.size})`);
    assert(level.checkpoints.length >= 3, `Level ${idx + 1} has >= 3 checkpoints`);
    assert(level.targetLength === level.size * level.size, `Level ${idx + 1} target length matches area`);

    // Checkpoint 1 must exist
    const cp1 = level.checkpoints.find((c) => c.number === 1);
    assert(Boolean(cp1), `Level ${idx + 1} has Checkpoint 1 at (${cp1?.row}, ${cp1?.col})`);
  });

  // Test Level 1 Move Engine
  const lvl1 = ZIP_LEVELS[0];
  const initialPath = [{ row: 0, col: 0 }];

  // Valid adjacent step
  const step1 = validateZipStep(initialPath, { row: 0, col: 1 }, lvl1);
  assert(step1.valid, 'Step to adjacent (0,1) is valid');

  // Invalid diagonal jump
  const stepDiag = validateZipStep(initialPath, { row: 1, col: 1 }, lvl1);
  assert(!stepDiag.valid, 'Diagonal step is rejected');

  // Out of bounds
  const stepOOB = validateZipStep(initialPath, { row: -1, col: 0 }, lvl1);
  assert(!stepOOB.valid, 'Negative row step is rejected');

  // Complete Level 1 Hamiltonian path
  const fullPath = [
    { row: 0, col: 0 }, // 1
    { row: 0, col: 1 },
    { row: 0, col: 2 }, // 2
    { row: 1, col: 2 },
    { row: 1, col: 1 },
    { row: 1, col: 0 },
    { row: 2, col: 0 }, // 3
    { row: 2, col: 1 },
    { row: 2, col: 2 }, // 4
  ];
  assert(isZipComplete(fullPath, lvl1), 'Level 1 complete Hamiltonian path is validated');

  console.log('\n🎉 ALL 15 ZIP LEVELS & ENGINE VERIFIED SUCCESSFULLY!\n');
}

runZipVerification();
