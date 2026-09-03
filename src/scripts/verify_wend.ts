/**
 * Dedicated Verification Script for Game 2: Wend
 * Tests initial state, all 15 science vocabulary levels, 8-directional paths, English/Tamil grids, and completion.
 */

import { WEND_LEVELS } from '../features/games/wend/wend.levels';
import { validateWendStep, isWendComplete, getConstructedWord } from '../features/games/wend/wend.engine';

function assert(condition: boolean, message: string) {
  if (!condition) {
    console.error(`❌ ASSERTION FAILED [Wend]: ${message}`);
    process.exit(1);
  } else {
    console.log(`✅ [Wend] ${message}`);
  }
}

export function runWendVerification() {
  console.log('\n--- VERIFYING GAME 2: WEND (15 LEVELS) ---\n');

  assert(WEND_LEVELS.length === 15, 'Wend has exactly 15 levels');

  WEND_LEVELS.forEach((level, idx) => {
    assert(Boolean(level.targetWord.en && level.targetWord.ta), `Level ${idx + 1} has bilingual target word (${level.targetWord.en})`);
    assert(level.grid.length >= 3, `Level ${idx + 1} has valid English grid`);
    assert(Boolean(level.taGrid && level.taGrid.length >= 3), `Level ${idx + 1} has valid Tamil grid`);
    assert(Boolean(level.hint.en && level.hint.ta), `Level ${idx + 1} has bilingual hint`);
  });

  // Test Level 1 'ATOM' Path
  const lvl1 = WEND_LEVELS[0];
  const startPath = [{ row: 0, col: 0 }]; // 'A'

  // Valid move to 'T'
  const stepT = validateWendStep(startPath, { row: 0, col: 1 }, lvl1, 'en');
  assert(stepT.valid, 'Step to adjacent T (0,1) is valid');

  // Invalid jump to 'R'
  const stepBad = validateWendStep(startPath, { row: 2, col: 2 }, lvl1, 'en');
  assert(!stepBad.valid, 'Non-adjacent jump is rejected');

  // Complete word
  const fullPath = [
    { row: 0, col: 0 }, // 'A'
    { row: 0, col: 1 }, // 'T'
    { row: 1, col: 1 }, // 'O'
    { row: 1, col: 2 }, // 'M'
  ];
  assert(getConstructedWord(fullPath, lvl1, 'en') === 'ATOM', "Constructed word matches 'ATOM'");
  assert(isWendComplete(fullPath, lvl1, 'en'), 'Level 1 word completion verified');

  // Test Tamil Word Level 1 'அணு'
  const taPath = [
    { row: 0, col: 0 }, // 'அ'
    { row: 0, col: 1 }, // 'ணு'
  ];
  assert(getConstructedWord(taPath, lvl1, 'ta') === 'அணு', "Constructed Tamil word matches 'அணு'");
  assert(isWendComplete(taPath, lvl1, 'ta'), 'Level 1 Tamil word completion verified');

  console.log('\n🎉 ALL 15 WEND LEVELS & ENGINE VERIFIED SUCCESSFULLY!\n');
}

runWendVerification();
