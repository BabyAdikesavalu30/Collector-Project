/**
 * Quiz Question Bank Coverage Verification
 * Asserts that every pathwayId defined in LEARNING_PATHWAYS has at least
 * MIN_QUESTIONS_PER_PATHWAY unique questions in MOCK_QUIZ_QUESTIONS, so the
 * Phase 8 gap (foundation/advanced pathways silently receiving core-level
 * questions via the fallback) cannot silently reappear.
 *
 * Run with: npx ts-node src/scripts/verify_quiz_coverage.ts
 */

import { MOCK_QUIZ_QUESTIONS } from '../features/quiz/quiz.mock';
import { LEARNING_PATHWAYS } from '../features/learn/learn.mock';

interface TestResult {
  name: string;
  passed: boolean;
  details?: string;
}

export const MIN_QUESTIONS_PER_PATHWAY = 8;

const results: TestResult[] = [];

function assert(condition: boolean, name: string, details?: string) {
  results.push({ name, passed: condition, details });
  const icon = condition ? '✅ PASS' : '❌ FAIL';
  console.log(`[${icon}] ${name}${details ? ` (${details})` : ''}`);
}

function runQuizCoverageTests() {
  console.log('====================================================');
  console.log('QUIZ QUESTION BANK COVERAGE VERIFICATION SUITE');
  console.log('====================================================\n');

  // 1. Global dataset integrity
  console.log('--- Phase 1: Dataset Integrity ---');
  const ids = MOCK_QUIZ_QUESTIONS.map((q) => q.id);
  const duplicateIds = ids.filter((id, i) => ids.indexOf(id) !== i);
  assert(
    new Set(duplicateIds).size === 0,
    'All question ids are unique',
    `${ids.length} questions total`
  );

  const invalidOptions = MOCK_QUIZ_QUESTIONS.filter((q) => {
    const optionIds = q.options.map((o) => o.id);
    return !optionIds.includes(q.correctOptionId) || q.options.length < 2;
  });
  assert(
    invalidOptions.length === 0,
    'Every question has a valid correctOptionId',
    invalidOptions.length === 0 ? 'All valid' : `Invalid: ${invalidOptions.map((q) => q.id).join(', ')}`
  );

  const nonBilingual = MOCK_QUIZ_QUESTIONS.filter(
    (q) =>
      !q.question.en || !q.question.ta || !q.explanation?.en || !q.explanation?.ta
  );
  assert(
    nonBilingual.length === 0,
    'Every question is bilingual (question + explanation in en/ta)',
    nonBilingual.length === 0 ? 'All bilingual' : `Missing: ${nonBilingual.map((q) => q.id).join(', ')}`
  );

  // 2. Per-pathway coverage
  console.log('\n--- Phase 2: Per-Pathway Coverage ---');
  const countByPathway: Record<string, number> = {};
  const difficultyByPathway: Record<string, Set<string>> = {};
  MOCK_QUIZ_QUESTIONS.forEach((q) => {
    countByPathway[q.pathwayId] = (countByPathway[q.pathwayId] || 0) + 1;
    if (!difficultyByPathway[q.pathwayId]) difficultyByPathway[q.pathwayId] = new Set();
    difficultyByPathway[q.pathwayId].add(q.difficulty);
  });

  const uncovered: string[] = [];
  const underCovered: string[] = [];
  const noSpread: string[] = [];

  LEARNING_PATHWAYS.forEach((p) => {
    const count = countByPathway[p.id] || 0;
    if (count === 0) {
      uncovered.push(p.id);
    } else if (count < MIN_QUESTIONS_PER_PATHWAY) {
      underCovered.push(`${p.id} (${count})`);
    }
    const spread = difficultyByPathway[p.id];
    if (spread && spread.size < 3) {
      noSpread.push(`${p.id} (${Array.from(spread).join('/')})`);
    }
  });

  assert(
    uncovered.length === 0,
    `Every pathway has questions (min ${MIN_QUESTIONS_PER_PATHWAY})`,
    uncovered.length === 0 ? `${LEARNING_PATHWAYS.length} pathways covered` : `Zero: ${uncovered.join(', ')}`
  );
  assert(
    underCovered.length === 0,
    `All pathways meet the ${MIN_QUESTIONS_PER_PATHWAY}+ question minimum`,
    underCovered.length === 0 ? 'All sufficient' : `Low: ${underCovered.join(', ')}`
  );
  assert(
    noSpread.length === 0,
    'Every pathway spreads questions across beginner/intermediate/advanced',
    noSpread.length === 0 ? 'All spread' : `No spread: ${noSpread.join(', ')}`
  );

  // 3. Difficulty balance in the whole bank
  console.log('\n--- Phase 3: Global Difficulty Balance ---');
  const diffCount: Record<string, number> = {};
  MOCK_QUIZ_QUESTIONS.forEach((q) => {
    diffCount[q.difficulty] = (diffCount[q.difficulty] || 0) + 1;
  });
  assert(
    diffCount.beginner > 0 && diffCount.intermediate > 0 && diffCount.advanced > 0,
    'Bank contains all three difficulty levels',
    `beginner:${diffCount.beginner} intermediate:${diffCount.intermediate} advanced:${diffCount.advanced}`
  );

  // Summary
  console.log('\n====================================================');
  const allPassed = results.every((r) => r.passed);
  if (allPassed) {
    console.log(`🎉 ALL ${results.length} QUIZ COVERAGE TESTS PASSED SUCCESSFULLY!`);
  } else {
    console.log(`⚠️ ${results.filter((r) => !r.passed).length} TESTS FAILED!`);
    process.exitCode = 1;
  }
  console.log('====================================================\n');
}

runQuizCoverageTests();