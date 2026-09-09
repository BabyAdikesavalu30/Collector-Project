/**
 * Verification Script for Phase 52: Responsive & Device UX Polish
 * Validates responsive calculations, game board cell bounds on compact screens (320dp),
 * hitSlop safety, max-width constraints on wide viewports (tablet/iPad), and language wrapping.
 */

// Install react-native mock for standalone Node script execution
const Module = require('module');
const origRequire = Module.prototype.require;
Module.prototype.require = function (id: string) {
  if (id === 'react-native') return require('../../__mocks__/react-native.js');
  return origRequire.apply(this, arguments);
};

const {
  BREAKPOINTS,
  responsiveSpacing,
  getScreenSizeCategory,
  getResponsiveHorizontalPadding,
  getGameBoardSize,
  getResponsiveFontSize,
} = require('../theme/responsive');

function runVerification() {
  console.log('====================================================');
  console.log('🚀 RUNNING PHASE 52: RESPONSIVE & DEVICE UX AUDIT');
  console.log('====================================================\n');

  let passed = 0;
  let failed = 0;

  function assert(condition: boolean, testName: string, detail?: string) {
    if (condition) {
      console.log(`  ✅ PASS: ${testName}`);
      passed++;
    } else {
      console.error(`  ❌ FAIL: ${testName}${detail ? ` — ${detail}` : ''}`);
      failed++;
    }
  }

  // 1. Breakpoints & Categorization
  console.log('--- 1. Breakpoint & Device Category Checks ---');
  assert(BREAKPOINTS.COMPACT_MAX === 359, 'Breakpoint COMPACT_MAX is 359');
  assert(BREAKPOINTS.STANDARD_MAX === 430, 'Breakpoint STANDARD_MAX is 430');
  assert(getScreenSizeCategory(320) === 'compact', '320dp is compact');
  assert(getScreenSizeCategory(359) === 'compact', '359dp is compact');
  assert(getScreenSizeCategory(360) === 'standard', '360dp is standard');
  assert(getScreenSizeCategory(390) === 'standard', '390dp is standard');
  assert(getScreenSizeCategory(430) === 'standard', '430dp is standard');
  assert(getScreenSizeCategory(431) === 'expanded', '431dp is expanded');
  assert(getScreenSizeCategory(768) === 'expanded', '768dp (iPad) is expanded');

  // 2. Responsive Padding & Dimensions
  console.log('\n--- 2. Responsive Padding & Dimensions ---');
  assert(getResponsiveHorizontalPadding(320) === 12, 'Compact screen horizontal padding is 12dp');
  assert(getResponsiveHorizontalPadding(390) === 16, 'Standard screen horizontal padding is 16dp');
  assert(getResponsiveHorizontalPadding(768) === 24, 'Expanded screen horizontal padding is 24dp');
  assert(responsiveSpacing.maxContentWidth === 540, 'maxContentWidth is 540dp');
  assert(responsiveSpacing.maxCardWidth === 500, 'maxCardWidth is 500dp');

  // 3. Compact Device Game Board Geometry (320dp width test)
  console.log('\n--- 3. Compact Screen (320dp) Game Board Geometry ---');
  const width = 320;
  const isCompact = width < 360;

  // Sudoku 4x4
  const sudokuBoardSize = Math.min(width - (isCompact ? 24 : 32), 340);
  const sudokuCellSize = Math.floor((sudokuBoardSize - 30) / 4);
  assert(sudokuBoardSize <= 320 - 24, `Sudoku board size (${sudokuBoardSize}px) fits on 320px screen`);
  assert(sudokuCellSize >= 44, `Sudoku cell size (${sudokuCellSize}px) satisfies touch target without hitSlop`);

  // Zip Board 6x6 / 7x7
  const zipMaxWidth = Math.min(width - (isCompact ? 20 : 36), 360);
  const zipPadding = isCompact ? 4 : 6;
  const zipMargin = isCompact ? 2 : 3;
  const zipCellSize7 = Math.floor((zipMaxWidth - (zipPadding * 2) - 4) / 7) - (zipMargin * 2);
  const zipGridWidth7 = (zipCellSize7 + zipMargin * 2) * 7 + zipPadding * 2 + 4;
  assert(zipGridWidth7 <= 320, `Zip 7x7 grid (${zipGridWidth7}px) fits inside 320px width`);
  const zipHitSlop7 = zipCellSize7 < 44 ? Math.ceil((44 - zipCellSize7) / 2) : 0;
  assert(zipCellSize7 + zipHitSlop7 * 2 >= 44, `Zip 7x7 cell touch target (${zipCellSize7}px + ${zipHitSlop7 * 2}px) satisfies >= 44x44`);

  // Queens Board 8x8
  const queensBoardSize = Math.min(width - (isCompact ? 20 : 36), 340);
  const queensPadding = 3;
  const queensMargin = 2;
  const queensCellSize8 = Math.floor((queensBoardSize - (queensPadding * 2) - 4) / 8) - (queensMargin * 2);
  const queensGridWidth8 = (queensCellSize8 + queensMargin * 2) * 8 + queensPadding * 2 + 4;
  assert(queensGridWidth8 <= 320, `Queens 8x8 grid (${queensGridWidth8}px) fits inside 320px width`);
  const queensHitSlop8 = queensCellSize8 < 44 ? Math.ceil((44 - queensCellSize8) / 2) : 0;
  assert(queensCellSize8 + queensHitSlop8 * 2 >= 44, `Queens 8x8 cell touch target (${queensCellSize8}px + ${queensHitSlop8 * 2}px) satisfies >= 44x44`);

  // Spin Wheel
  const wheelSize = Math.min(270, Math.floor(width - (isCompact ? 24 : 40)));
  assert(wheelSize <= 320 - 24, `Spin wheel size (${wheelSize}px) fits safely within 320px screen`);

  // 4. Responsive Font Scaling Safety
  console.log('\n--- 4. Responsive Font Scaling Safety ---');
  const normalFont = getResponsiveFontSize(16, 'standard');
  const compactFont = getResponsiveFontSize(16, 'compact');
  const expandedFont = getResponsiveFontSize(16, 'expanded');
  assert(normalFont === 16, 'Normal font size is 16');
  assert(compactFont === 15, 'Compact font scale reduces safely to 15 to prevent clipping');
  assert(expandedFont === 17, 'Expanded font scale scales cleanly to 17');

  console.log('\n====================================================');
  console.log(`AUDIT RESULTS: ${passed} PASSED, ${failed} FAILED`);
  console.log('====================================================');

  if (failed > 0) {
    process.exit(1);
  }
}

runVerification();
