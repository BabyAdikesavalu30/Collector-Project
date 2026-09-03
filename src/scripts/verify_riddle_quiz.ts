/**
 * Verification Script for Screen 22: Riddle Question / Solving Experience
 * Tests dataset resolution, answer normalization, deterministic matching,
 * attempt-based scoring, streak calculations, and bilingual localization.
 */

import {
  RiddleDifficulty,
  getRiddlesForDifficulty,
  normalizeRiddleAnswer,
  checkRiddleAnswer,
  calculateRiddlePoints,
  updateRiddleStreak,
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

export function runRiddleQuizVerification() {
  console.log('\n--- STARTING SCREEN 22: RIDDLE QUESTION / SOLVING EXPERIENCE VERIFICATION ---\n');

  // =========================================================================
  // 1. Difficulty Dataset Resolution
  // =========================================================================
  console.log('[1] Verifying Difficulty Datasets:');

  const difficulties: RiddleDifficulty[] = ['easy', 'medium', 'hard', 'genius'];

  difficulties.forEach((diff) => {
    const list = getRiddlesForDifficulty(diff);
    assert(list.length >= 5, `Difficulty '${diff}' has at least 5 riddles (found ${list.length})`);
    list.forEach((r, idx) => {
      assert(Boolean(r.id), `Riddle [${diff}:${idx}] has id (${r.id})`);
      assert(r.difficulty === diff, `Riddle [${diff}:${idx}] has correct difficulty (${r.difficulty})`);
      assert(Boolean(r.question.en && r.question.en.length > 0), `Riddle [${diff}:${idx}] has English question`);
      assert(Boolean(r.question.ta && r.question.ta.length > 0), `Riddle [${diff}:${idx}] has Tamil question`);
      assert(Boolean(r.answer.en && r.answer.en.length > 0), `Riddle [${diff}:${idx}] has English answer`);
      assert(Boolean(r.answer.ta && r.answer.ta.length > 0), `Riddle [${diff}:${idx}] has Tamil answer`);
      assert(r.points > 0, `Riddle [${diff}:${idx}] has positive points value (${r.points})`);
    });
  });

  const invalidList = getRiddlesForDifficulty('invalid' as RiddleDifficulty);
  assert(invalidList.length === 0, 'Invalid difficulty returns empty array safely');

  // =========================================================================
  // 2. Answer Normalization
  // =========================================================================
  console.log('\n[2] Verifying Answer Normalization:');

  assert(normalizeRiddleAnswer('  Clock  ') === 'clock', "Trims and lowercases '  Clock  ' to 'clock'");
  assert(normalizeRiddleAnswer('A Clock!') === 'clock', "Strips leading article and exclamation from 'A Clock!'");
  assert(normalizeRiddleAnswer('The Wall Clock.') === 'wall clock', "Strips leading 'The' and period from 'The Wall Clock.'");
  assert(normalizeRiddleAnswer('   ') === '', "Empty string returns ''");
  assert(normalizeRiddleAnswer('கடிகாரம்.') === 'கடிகாரம்', "Strips punctuation from Tamil answer 'கடிகாரம்.'");

  // =========================================================================
  // 3. Answer Matching Engine
  // =========================================================================
  console.log('\n[3] Verifying Answer Matching Engine:');

  const clockRiddle = getRiddlesForDifficulty('easy')[0]; // Clock riddle

  assert(checkRiddleAnswer('Clock', clockRiddle, 'en') === true, "Matches 'Clock' in English");
  assert(checkRiddleAnswer('a clock', clockRiddle, 'en') === true, "Matches 'a clock' via alias");
  assert(checkRiddleAnswer('wall clock', clockRiddle, 'en') === true, "Matches 'wall clock' via alias");
  assert(checkRiddleAnswer('watch', clockRiddle, 'en') === true, "Matches 'watch' via alias");
  assert(checkRiddleAnswer('கடிகாரம்', clockRiddle, 'ta') === true, "Matches 'கடிகாரம்' in Tamil");
  assert(checkRiddleAnswer('Wrong Answer', clockRiddle, 'en') === false, "Rejects 'Wrong Answer'");
  assert(checkRiddleAnswer('', clockRiddle, 'en') === false, 'Rejects empty input');

  // =========================================================================
  // 4. Attempt-Based Scoring Rules
  // =========================================================================
  console.log('\n[4] Verifying Attempt Scoring Rules:');

  // Attempt 1 Correct: Full base points
  assert(calculateRiddlePoints(10, 1, true) === 10, 'Easy Attempt 1 correct yields 10 pts');
  assert(calculateRiddlePoints(15, 1, true) === 15, 'Medium Attempt 1 correct yields 15 pts');
  assert(calculateRiddlePoints(20, 1, true) === 20, 'Hard Attempt 1 correct yields 20 pts');
  assert(calculateRiddlePoints(30, 1, true) === 30, 'Genius Attempt 1 correct yields 30 pts');

  // Attempt 2 Correct: Half base points rounded up
  assert(calculateRiddlePoints(10, 2, true) === 5, 'Easy Attempt 2 correct yields 5 pts (10/2)');
  assert(calculateRiddlePoints(15, 2, true) === 8, 'Medium Attempt 2 correct yields 8 pts (ceil(15/2))');
  assert(calculateRiddlePoints(20, 2, true) === 10, 'Hard Attempt 2 correct yields 10 pts (20/2)');
  assert(calculateRiddlePoints(30, 2, true) === 15, 'Genius Attempt 2 correct yields 15 pts (30/2)');

  // Failed: 0 points
  assert(calculateRiddlePoints(10, 1, false) === 0, 'Incorrect attempt yields 0 pts');
  assert(calculateRiddlePoints(30, 2, false) === 0, 'Exhausted incorrect attempts yield 0 pts');

  // =========================================================================
  // 5. Streak Tracking
  // =========================================================================
  console.log('\n[5] Verifying Streak Calculations:');

  let streakState = { currentStreak: 0, bestStreak: 0 };

  // First correct
  streakState = updateRiddleStreak(streakState.currentStreak, streakState.bestStreak, true);
  assert(streakState.currentStreak === 1 && streakState.bestStreak === 1, '1st correct sets streak to 1, best to 1');

  // Second correct
  streakState = updateRiddleStreak(streakState.currentStreak, streakState.bestStreak, true);
  assert(streakState.currentStreak === 2 && streakState.bestStreak === 2, '2nd correct sets streak to 2, best to 2');

  // Third wrong
  streakState = updateRiddleStreak(streakState.currentStreak, streakState.bestStreak, false);
  assert(streakState.currentStreak === 0 && streakState.bestStreak === 2, 'Wrong resets current streak to 0, preserves best streak 2');

  // Fourth correct
  streakState = updateRiddleStreak(streakState.currentStreak, streakState.bestStreak, true);
  assert(streakState.currentStreak === 1 && streakState.bestStreak === 2, '4th correct sets current to 1, best remains 2');

  // =========================================================================
  // 6. Bilingual Localization Completeness
  // =========================================================================
  console.log('\n[6] Verifying Screen 22 Localization:');

  const en = getTranslation('en').riddles;
  const ta = getTranslation('ta').riddles;

  assert(Boolean(en.riddleNumber && en.riddleOf), 'English riddleNumber & riddleOf present');
  assert(Boolean(ta.riddleNumber && ta.riddleOf), 'Tamil riddleNumber & riddleOf present');
  assert(Boolean(en.yourAnswer && en.typeAnswerPlaceholder && en.checkAnswer), 'English input strings present');
  assert(Boolean(ta.yourAnswer && ta.typeAnswerPlaceholder && ta.checkAnswer), 'Tamil input strings present');
  assert(Boolean(en.correctTitle && en.incorrectTitle && en.tryAgain), 'English feedback strings present');
  assert(Boolean(ta.correctTitle && ta.incorrectTitle && ta.tryAgain), 'Tamil feedback strings present');
  assert(Boolean(en.needHint && en.hintLabel && en.whyExplanation), 'English hint & explanation strings present');
  assert(Boolean(ta.needHint && ta.hintLabel && ta.whyExplanation), 'Tamil hint & explanation strings present');
  assert(Boolean(en.nextRiddle && en.viewResults), 'English navigation actions present');
  assert(Boolean(ta.nextRiddle && ta.viewResults), 'Tamil navigation actions present');
  assert(Boolean(en.exitTitle && en.exitMessage && en.cancel && en.exit), 'English exit dialog strings present');
  assert(Boolean(ta.exitTitle && ta.exitMessage && ta.cancel && ta.exit), 'Tamil exit dialog strings present');

  console.log('\n🎉 ALL SCREEN 22 RIDDLE QUESTION VERIFICATIONS PASSED SUCCESSFULLY!\n');
}

runRiddleQuizVerification();
