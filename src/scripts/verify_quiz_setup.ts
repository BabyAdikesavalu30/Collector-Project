/**
 * Standalone Verification Script for Screen 18: Quiz Setup
 * Validates contracts, context resolution, timer calculations,
 * settings defaults, strong types, and localization completeness.
 */

import {
  QUIZ_DIFFICULTIES,
  QUIZ_QUESTION_COUNTS,
  QUIZ_SECONDS_PER_QUESTION,
  DEFAULT_QUIZ_CONFIG,
  resolveQuizContext,
  calculateQuizTimeMinutes,
  validateQuizConfig,
  QuizDifficulty,
  QuizQuestionCount,
  QuizSetupConfig,
} from '../features/quiz';
import { getTranslation } from '../config/i18n';
import { DEFAULT_APP_SETTINGS } from '../features/settings/settings.defaults';

function assert(condition: boolean, message: string) {
  if (!condition) {
    console.error(`❌ ASSERTION FAILED: ${message}`);
    throw new Error(message);
  }
  console.log(`✅ ${message}`);
}

export function runQuizSetupVerification() {
  console.log('--- STARTING SCREEN 18: QUIZ SETUP VERIFICATION ---');

  // 1. Verify Quiz Difficulty Values
  console.log('\n[1] Verifying Quiz Difficulty Values:');
  const difficulties: QuizDifficulty[] = ['beginner', 'intermediate', 'advanced'];
  assert(QUIZ_DIFFICULTIES.length === 3, 'Exactly 3 difficulty options exist');
  difficulties.forEach((diff) => {
    assert(
      QUIZ_DIFFICULTIES.some((d) => d.id === diff),
      `Difficulty '${diff}' is supported in constants`
    );
  });

  // 2. Verify Question Counts
  console.log('\n[2] Verifying Question Count Contract:');
  const expectedCounts: QuizQuestionCount[] = [5, 10, 15, 20, 30];
  assert(
    JSON.stringify(QUIZ_QUESTION_COUNTS) === JSON.stringify(expectedCounts),
    `Supported question counts match [5, 10, 15, 20, 30]`
  );

  // 3. Verify Timer Calculations (60 seconds / question)
  console.log('\n[3] Verifying 60-Second Timer Calculations:');
  assert(QUIZ_SECONDS_PER_QUESTION === 60, 'Timer per question is strictly 60 seconds');
  assert(calculateQuizTimeMinutes(5, true) === 5, '5 questions = 5 min');
  assert(calculateQuizTimeMinutes(10, true) === 10, '10 questions = 10 min');
  assert(calculateQuizTimeMinutes(15, true) === 15, '15 questions = 15 min');
  assert(calculateQuizTimeMinutes(20, true) === 20, '20 questions = 20 min');
  assert(calculateQuizTimeMinutes(30, true) === 30, '30 questions = 30 min');
  assert(calculateQuizTimeMinutes(10, false) === null, 'Timer disabled yields null minutes');

  // 4. Verify Context Resolution with Mock Learning Data
  console.log('\n[4] Verifying Context Resolution from Screen 17:');
  const resolved = resolveQuizContext('core', 'physics', 'phy-c-1');
  assert(resolved.isValid === true, 'Valid pathway phy-c-1 resolves successfully');
  assert(resolved.subjectTitle === 'Physics', "Subject maps to 'Physics'");
  assert(resolved.pathwayTitle === 'Force & Laws of Motion', "Pathway maps to 'Force & Laws of Motion'");
  assert(resolved.levelBadge === 'Classes 8–10', "Level maps to 'Classes 8–10'");
  assert(resolved.topicCount === 5, 'Topic count resolves correctly');

  // 5. Verify Graceful Fallback for Invalid / Missing Pathway
  console.log('\n[5] Verifying Missing/Invalid Pathway Fallback:');
  const invalid = resolveQuizContext('invalid-level', 'invalid-sub', 'invalid-path');
  assert(invalid.isValid === false, 'Invalid pathway marked as invalid safely');
  const empty = resolveQuizContext(null, null, null);
  assert(empty.isValid === false, 'Null parameters marked as invalid safely without throwing');

  // 6. Verify Config Validation
  console.log('\n[6] Verifying Config Validation:');
  const validConfig: QuizSetupConfig = {
    levelId: 'core',
    subjectId: 'physics',
    pathwayId: 'phy-c-1',
    difficulty: 'beginner',
    questionCount: 10,
    timerEnabled: true,
    secondsPerQuestion: 60,
    showExplanation: true,
    soundEffects: true,
    confirmBeforeFinish: true,
  };
  assert(validateQuizConfig(validConfig) === true, 'Complete config validates as true');
  assert(
    validateQuizConfig({ ...validConfig, pathwayId: '' }) === false,
    'Missing pathwayId validates as false'
  );
  assert(
    validateQuizConfig({ ...validConfig, questionCount: 0 as unknown as QuizQuestionCount }) === false,
    'Zero question count validates as false'
  );

  // 7. Verify Settings Repository Defaults Alignment
  console.log('\n[7] Verifying Settings Defaults Alignment:');
  assert(DEFAULT_APP_SETTINGS.difficulty === 'beginner', 'Settings default difficulty is beginner');
  assert(DEFAULT_APP_SETTINGS.questionsPerQuiz === 10, 'Settings default questions is 10');
  assert(DEFAULT_APP_SETTINGS.quizTimer === true, 'Settings default timer is true');
  assert(DEFAULT_APP_SETTINGS.answerExplanation === true, 'Settings default answer explanation is true');
  assert(DEFAULT_APP_SETTINGS.confirmBeforeFinish === true, 'Settings default confirm before finish is true');

  // 8. Verify Localization Completeness (English & Tamil)
  console.log('\n[8] Verifying Localization Completeness:');
  const en = getTranslation('en').quizSetup;
  const ta = getTranslation('ta').quizSetup;

  assert(en.headerTitle === 'Quiz Setup', "English headerTitle is 'Quiz Setup'");
  assert(ta.headerTitle === 'வினாடி வினா அமைப்பு', "Tamil headerTitle is 'வினாடி வினா அமைப்பு'");
  assert(en.introTitle === 'Customize Your Quiz', "English introTitle is 'Customize Your Quiz'");
  assert(ta.introTitle === 'உங்கள் வினாடி வினாவைத் தேர்வு செய்யுங்கள்', "Tamil introTitle is localized");
  assert(en.startQuiz === 'Start Quiz', "English CTA is 'Start Quiz'");
  assert(ta.startQuiz === 'வினாடி வினாவைத் தொடங்குங்கள்', "Tamil CTA is 'வினாடி வினாவைத் தொடங்குங்கள்'");
  assert(en.timerPerQuestion === '60 seconds per question', 'English 60s timer string present');
  assert(ta.timerPerQuestion === 'ஒவ்வொரு வினாவிற்கும் 60 வினாடிகள்', 'Tamil 60s timer string present');
  assert(en.learningPathUnavailable === 'Learning path unavailable', 'English fallback string present');
  assert(ta.learningPathUnavailable === 'கற்றல் பாதை கிடைக்கவில்லை', 'Tamil fallback string present');

  console.log('\n🎉 ALL SCREEN 18 QUIZ SETUP VERIFICATIONS PASSED SUCCESSFULLY!\n');
}

// Auto-run if invoked directly
if (typeof require !== 'undefined' && require.main === module) {
  runQuizSetupVerification();
}
