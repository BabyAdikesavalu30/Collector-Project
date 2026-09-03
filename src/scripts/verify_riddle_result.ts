/**
 * Verification Script for Screen 23: Riddle Results
 * Tests result data schema, performance tier mapping, in-memory result store,
 * fallback parameter parser, and bilingual localization.
 */

import {
  RiddleResult,
  riddleResultStore,
  getRiddlePerformanceTier,
  createRiddleFallbackResult,
} from '../features/riddles';
import { getTranslation } from '../config/i18n';

function assert(condition: boolean, message: string) {
  if (!condition) {
    console.error(`❌ ASSERTION FAILED: ${message}`);
    process.exit(1);
  } else {
    console.log(`✅ ${message}`);
  }
}

export function runRiddleResultVerification() {
  console.log('\n--- STARTING SCREEN 23: RIDDLE RESULTS VERIFICATION ---\n');

  // =========================================================================
  // 1. Result Data Schema & Tier Evaluation
  // =========================================================================
  console.log('[1] Verifying Performance Tiers:');

  assert(getRiddlePerformanceTier(5, 5) === 'excellent', '5/5 (100%) maps to excellent');
  assert(getRiddlePerformanceTier(4, 5) === 'great', '4/5 (80%) maps to great');
  assert(getRiddlePerformanceTier(3, 5) === 'good', '3/5 (60%) maps to good');
  assert(getRiddlePerformanceTier(1, 5) === 'practice', '1/5 (20%) maps to practice');
  assert(getRiddlePerformanceTier(0, 5) === 'practice', '0/5 (0%) maps to practice');
  assert(getRiddlePerformanceTier(0, 0) === 'practice', '0/0 total maps to practice safely');

  // =========================================================================
  // 2. In-Memory Result Store
  // =========================================================================
  console.log('\n[2] Verifying Riddle Result Store:');

  const mockResult: RiddleResult = {
    difficulty: 'hard',
    totalRiddles: 5,
    solvedRiddles: 4,
    skippedRiddles: 1,
    score: 70,
    hintsUsed: 1,
    bestStreak: 3,
    completedAt: Date.now(),
  };

  riddleResultStore.setResult(mockResult);
  const retrieved = riddleResultStore.getResult();

  assert(retrieved !== null, 'Store holds non-null result');
  assert(retrieved?.difficulty === 'hard', 'Store difficulty matches hard');
  assert(retrieved?.solvedRiddles === 4, 'Store solved riddles matches 4');
  assert(retrieved?.skippedRiddles === 1, 'Store skipped riddles matches 1');
  assert(retrieved?.score === 70, 'Store score matches 70');
  assert(retrieved?.hintsUsed === 1, 'Store hints used matches 1');
  assert(retrieved?.bestStreak === 3, 'Store best streak matches 3');

  riddleResultStore.clear();
  assert(riddleResultStore.getResult() === null, 'Store clears successfully');

  // =========================================================================
  // 3. Fallback Parameter Parser
  // =========================================================================
  console.log('\n[3] Verifying Fallback Parameter Parser:');

  const rawParams = {
    difficulty: 'genius',
    totalRiddles: '5',
    solvedRiddles: '5',
    skippedRiddles: '0',
    score: '150',
    hintsUsed: '0',
    bestStreak: '5',
    completedAt: '1700000000000',
  };

  const parsed = createRiddleFallbackResult(rawParams);
  assert(parsed !== null, 'Fallback parser successfully creates RiddleResult');
  assert(parsed?.difficulty === 'genius', 'Parsed difficulty is genius');
  assert(parsed?.totalRiddles === 5, 'Parsed total is 5');
  assert(parsed?.solvedRiddles === 5, 'Parsed solved is 5');
  assert(parsed?.score === 150, 'Parsed score is 150');
  assert(parsed?.bestStreak === 5, 'Parsed best streak is 5');

  const invalidParsed = createRiddleFallbackResult(null as any);
  assert(invalidParsed === null, 'Null params safely return null');

  // =========================================================================
  // 4. Bilingual Localization Completeness
  // =========================================================================
  console.log('\n[4] Verifying Localization Completeness:');

  const en = getTranslation('en').riddles;
  const ta = getTranslation('ta').riddles;

  assert(en.resultsHeaderTitle === 'Riddle Results', "English resultsHeaderTitle is 'Riddle Results'");
  assert(ta.resultsHeaderTitle === 'புதிர் முடிவுகள்', "Tamil resultsHeaderTitle is 'புதிர் முடிவுகள்'");
  assert(Boolean(en.yourScore && en.pointsWord), 'English score tokens present');
  assert(Boolean(ta.yourScore && ta.pointsWord), 'Tamil score tokens present');
  assert(Boolean(en.riddlesSolved && en.solvedRatio), 'English solved ratio tokens present');
  assert(Boolean(ta.riddlesSolved && ta.solvedRatio), 'Tamil solved ratio tokens present');
  assert(Boolean(en.tierExcellentTitle && en.tierGreatTitle && en.tierGoodTitle && en.tierPracticeTitle), 'English tier titles present');
  assert(Boolean(ta.tierExcellentTitle && ta.tierGreatTitle && ta.tierGoodTitle && ta.tierPracticeTitle), 'Tamil tier titles present');
  assert(Boolean(en.playAgain && en.backToRiddles && en.backToHome), 'English result action buttons present');
  assert(Boolean(ta.playAgain && ta.backToRiddles && ta.backToHome), 'Tamil result action buttons present');
  assert(Boolean(en.resultUnavailableTitle && en.resultUnavailableDesc), 'English fallback error strings present');
  assert(Boolean(ta.resultUnavailableTitle && ta.resultUnavailableDesc), 'Tamil fallback error strings present');

  console.log('\n🎉 ALL SCREEN 23 RIDDLE RESULTS VERIFICATIONS PASSED SUCCESSFULLY!\n');
}

runRiddleResultVerification();
