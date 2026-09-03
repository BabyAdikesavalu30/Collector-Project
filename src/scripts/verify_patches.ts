/**
 * Dedicated Verification Script for Game 3: Patches
 * Tests all 15 polyomino puzzle levels, target boundary checks, piece placement, collision detection, and completion.
 */

import { PATCHES_LEVELS } from '../features/games/patches/patches.levels';
import { canPlacePiece, isPatchesComplete } from '../features/games/patches/patches.engine';

function assert(condition: boolean, message: string) {
  if (!condition) {
    console.error(`❌ ASSERTION FAILED [Patches]: ${message}`);
    process.exit(1);
  } else {
    console.log(`✅ [Patches] ${message}`);
  }
}

export function runPatchesVerification() {
  console.log('\n--- VERIFYING GAME 3: PATCHES (15 LEVELS) ---\n');

  assert(PATCHES_LEVELS.length === 15, 'Patches has exactly 15 levels');

  PATCHES_LEVELS.forEach((level, idx) => {
    assert(level.pieces.length >= 2, `Level ${idx + 1} has >= 2 pieces`);
    assert(level.boardSize.rows >= 3 && level.boardSize.cols >= 3, `Level ${idx + 1} board size valid`);

    // Verify pieces total area matches target shape area
    let targetArea = 0;
    for (let r = 0; r < level.boardSize.rows; r++) {
      for (let c = 0; c < level.boardSize.cols; c++) {
        if (level.targetShape[r][c]) targetArea++;
      }
    }

    let piecesArea = 0;
    level.pieces.forEach((piece) => {
      piece.shape.forEach((row) => {
        row.forEach((val) => {
          if (val === 1) piecesArea++;
        });
      });
    });

    assert(targetArea === piecesArea, `Level ${idx + 1} total pieces area (${piecesArea}) matches target area (${targetArea})`);
  });

  // Test Level 1 Placement
  const lvl1 = PATCHES_LEVELS[0];
  const p1 = lvl1.pieces[0];
  const p2 = lvl1.pieces[1];

  const place1 = canPlacePiece(p1, 0, 0, lvl1, {});
  assert(place1.valid, 'Placing piece 1 at (0,0) is valid');

  const placeOverlap = canPlacePiece(p2, 0, 0, lvl1, { p1: { row: 0, col: 0 } });
  assert(!placeOverlap.valid, 'Overlapping piece placement is rejected');

  const placeOOB = canPlacePiece(p1, 2, 0, lvl1, {});
  assert(!placeOOB.valid, 'Placing piece on non-target row is rejected');

  const completed = {
    p1: { row: 0, col: 0 },
    p2: { row: 1, col: 0 },
  };
  assert(isPatchesComplete(completed, lvl1), 'Level 1 complete placement verified');

  console.log('\n🎉 ALL 15 PATCHES LEVELS & ENGINE VERIFIED SUCCESSFULLY!\n');
}

runPatchesVerification();
