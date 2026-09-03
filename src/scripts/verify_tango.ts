/**
 * Dedicated Verification Script for Game 5: Tango
 * Tests all 15 Sun/Moon balance levels, row/column counts, no-3-in-a-row rules, clues, and completion.
 */

import { TANGO_LEVELS } from '../features/games/tango/tango.levels';
import { getTangoConflicts, isTangoComplete } from '../features/games/tango/tango.engine';

function assert(condition: boolean, message: string) {
  if (!condition) {
    console.error(`❌ ASSERTION FAILED [Tango]: ${message}`);
    process.exit(1);
  } else {
    console.log(`✅ [Tango] ${message}`);
  }
}

export function runTangoVerification() {
  console.log('\n--- VERIFYING GAME 5: TANGO (15 LEVELS) ---\n');

  assert(TANGO_LEVELS.length === 15, 'Tango has exactly 15 levels');

  TANGO_LEVELS.forEach((level, idx) => {
    assert(level.initialGrid.length === 4, `Level ${idx + 1} initial grid has 4 rows`);
    assert(level.solution.length === 4, `Level ${idx + 1} solution has 4 rows`);
    assert(isTangoComplete(level.solution, level), `Level ${idx + 1} solution satisfies all harmony & clue rules`);
  });

  // Test 3-in-a-row conflict
  const threeInARow: ('sun' | 'moon' | null)[][] = [
    ['sun', 'sun', 'sun', 'moon'],
    ['moon', 'sun', 'moon', 'sun'],
    ['sun', 'moon', 'sun', 'moon'],
    ['moon', 'moon', 'sun', 'moon'],
  ];
  const tConf = getTangoConflicts(threeInARow, []);
  assert(tConf.length > 0, 'Three consecutive suns detected as conflict');

  console.log('\n🎉 ALL 15 TANGO LEVELS & ENGINE VERIFIED SUCCESSFULLY!\n');
}

runTangoVerification();
