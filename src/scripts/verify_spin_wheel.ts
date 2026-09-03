/**
 * Verification Script for Screen 24: Daily Spin Wheel
 * Tests outcome models, segments, questions, deterministic randomization,
 * angle calculations, scoring rules, outcome resolvers, and bilingual i18n.
 */

import {
  SPIN_WHEEL_SEGMENTS,
  SCIENTIST_QUESTIONS,
  INVENTION_QUESTIONS,
  THINK_FAST_QUESTIONS,
  CHALLENGE_QUESTIONS,
  SCIENCE_FACTS,
  BONUS_REWARD,
} from '../features/spin-wheel/spin-wheel.mock';
import {
  ALL_OUTCOME_TYPES,
  selectWheelOutcome,
  getSegmentIndex,
  calculateTargetRotation,
  resolveOutcomePayload,
} from '../features/spin-wheel/spin-wheel.engine';
import { calculateSpinPoints } from '../features/spin-wheel/spin-wheel.scoring';
import { getTranslation } from '../config/i18n';

function assert(condition: boolean, message: string) {
  if (!condition) {
    console.error(`❌ ASSERTION FAILED: ${message}`);
    process.exit(1);
  } else {
    console.log(`✅ ${message}`);
  }
}

export function runSpinWheelVerification() {
  console.log('\n--- STARTING SCREEN 24: DAILY SPIN WHEEL VERIFICATION ---\n');

  // =========================================================================
  // 1. Outcome Types and Segments
  // =========================================================================
  console.log('[1] Verifying Outcome Types & Segments:');
  assert(ALL_OUTCOME_TYPES.length === 6, 'Exactly 6 outcome types defined');
  assert(SPIN_WHEEL_SEGMENTS.length === 6, 'Exactly 6 wheel segments defined');

  SPIN_WHEEL_SEGMENTS.forEach((seg, i) => {
    assert(Boolean(seg.id), `Segment [${i}] has valid id (${seg.id})`);
    assert(Boolean(seg.label.en && seg.label.ta), `Segment [${i}] has English & Tamil label`);
    assert(Boolean(seg.icon), `Segment [${i}] has icon (${seg.icon})`);
    assert(Boolean(seg.bgColor && seg.textColor), `Segment [${i}] has color styling`);
  });

  // =========================================================================
  // 2. Question & Fact Repositories
  // =========================================================================
  console.log('\n[2] Verifying Science Question & Fact Repositories:');

  assert(SCIENTIST_QUESTIONS.length >= 2, 'At least 2 scientist questions available');
  SCIENTIST_QUESTIONS.forEach((q, i) => {
    assert(q.options.length >= 4, `Scientist Q[${i}] has at least 4 options`);
    assert(q.options.some((opt) => opt.id === q.correctOptionId), `Scientist Q[${i}] has valid correctOptionId`);
    assert(Boolean(q.explanation.en && q.explanation.ta), `Scientist Q[${i}] has bilingual explanation`);
    assert(q.points === 20, `Scientist Q[${i}] rewards 20 points`);
  });

  assert(INVENTION_QUESTIONS.length >= 2, 'At least 2 invention questions available');
  INVENTION_QUESTIONS.forEach((q, i) => {
    assert(q.options.length >= 4, `Invention Q[${i}] has at least 4 options`);
    assert(q.options.some((opt) => opt.id === q.correctOptionId), `Invention Q[${i}] has valid correctOptionId`);
    assert(q.points === 20, `Invention Q[${i}] rewards 20 points`);
  });

  assert(THINK_FAST_QUESTIONS.length >= 1, 'Think Fast question available');
  assert(CHALLENGE_QUESTIONS.length >= 1, 'Challenge question available');
  assert(SCIENCE_FACTS.length >= 2, 'Science facts available');
  assert(BONUS_REWARD.points === 25, 'Bonus rewards 25 points');

  // =========================================================================
  // 3. Deterministic Randomization & Target Math
  // =========================================================================
  console.log('\n[3] Verifying Randomization & Rotation Math:');

  assert(selectWheelOutcome('scientist') === 'scientist', "Deterministic seed 'scientist' resolves correctly");
  assert(selectWheelOutcome('bonus') === 'bonus', "Deterministic seed 'bonus' resolves correctly");
  assert(selectWheelOutcome('invention') === 'invention', "Deterministic seed 'invention' resolves correctly");
  assert(ALL_OUTCOME_TYPES.includes(selectWheelOutcome()), 'Unseeded outcome returns valid type');

  const scientistIndex = getSegmentIndex('scientist');
  assert(scientistIndex === 0, 'Scientist segment is at index 0');

  const rot1 = calculateTargetRotation(0, 0, 3);
  assert(rot1 > 0 && rot1 % 360 === 330, 'Segment 0 rotation correctly lands under top pointer');

  const rot2 = calculateTargetRotation(1, 0, 3);
  assert(rot2 > 0 && rot2 % 360 === 270, 'Segment 1 rotation correctly lands under top pointer');

  // =========================================================================
  // 4. Scoring Calculations
  // =========================================================================
  console.log('\n[4] Verifying Scoring Rules:');

  assert(calculateSpinPoints('scientist', true) === 20, 'Scientist correct answer yields 20 pts');
  assert(calculateSpinPoints('scientist', false) === 0, 'Scientist incorrect answer yields 0 pts');
  assert(calculateSpinPoints('invention', true) === 20, 'Invention correct answer yields 20 pts');
  assert(calculateSpinPoints('thinkFast', true) === 15, 'Think Fast correct answer yields 15 pts');
  assert(calculateSpinPoints('challenge', true) === 30, 'Challenge correct answer yields 30 pts');
  assert(calculateSpinPoints('scienceFact') === 10, 'Science Fact yields 10 pts');
  assert(calculateSpinPoints('bonus') === 25, 'Bonus reward yields 25 pts');

  // =========================================================================
  // 5. Outcome Resolvers
  // =========================================================================
  console.log('\n[5] Verifying Outcome Resolvers:');

  const scOutcome = resolveOutcomePayload('scientist');
  assert(scOutcome.payload.type === 'question', 'Scientist resolves to question payload');

  const factOutcome = resolveOutcomePayload('scienceFact');
  assert(factOutcome.payload.type === 'fact', 'ScienceFact resolves to fact payload');

  const bonusOutcome = resolveOutcomePayload('bonus');
  assert(bonusOutcome.payload.type === 'bonus', 'Bonus resolves to bonus payload');

  // =========================================================================
  // 6. Localization Completeness
  // =========================================================================
  console.log('\n[6] Verifying Bilingual Localization:');

  const en = getTranslation('en').spinWheel;
  const ta = getTranslation('ta').spinWheel;

  assert(en.title === 'Daily Spin', "English title is 'Daily Spin'");
  assert(ta.title === 'தினசரி சுழல்', "Tamil title is 'தினசரி சுழல்'");
  assert(Boolean(en.todaysSpin && ta.todaysSpin), 'Today spin tokens present');
  assert(Boolean(en.scientist && ta.scientist), 'Scientist segment tokens present');
  assert(Boolean(en.invention && ta.invention), 'Invention segment tokens present');
  assert(Boolean(en.scienceFact && ta.scienceFact), 'Science Fact segment tokens present');
  assert(Boolean(en.thinkFast && ta.thinkFast), 'Think Fast segment tokens present');
  assert(Boolean(en.bonus && ta.bonus), 'Bonus segment tokens present');
  assert(Boolean(en.challenge && ta.challenge), 'Challenge segment tokens present');
  assert(Boolean(en.checkAnswer && ta.checkAnswer), 'Check Answer button tokens present');
  assert(Boolean(en.correctTitle && ta.correctTitle), 'Correct feedback tokens present');
  assert(Boolean(en.incorrectTitle && ta.incorrectTitle), 'Incorrect feedback tokens present');
  assert(Boolean(en.spinCompleteTitle && ta.spinCompleteTitle), 'Spin complete tokens present');
  assert(Boolean(en.backToGames && ta.backToGames), 'Back to Games button tokens present');
  assert(Boolean(en.accessibility.wheelLabel && ta.accessibility.wheelLabel), 'Wheel accessibility label present');

  console.log('\n🎉 ALL SCREEN 24 DAILY SPIN WHEEL VERIFICATIONS PASSED SUCCESSFULLY!\n');
}

runSpinWheelVerification();
