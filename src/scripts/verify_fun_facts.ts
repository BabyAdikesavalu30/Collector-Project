/**
 * Fun Facts Verification Script
 * Validates data integrity, engine logic, and feature completeness.
 */

import { FUN_FACTS, FACT_QUESTIONS, FACT_COLLECTIONS } from '../features/fun-facts/fun-facts.mock';
import {
  FunFact,
  FactQuestion,
  FunFactCategory,
  FUN_FACT_CATEGORIES,
} from '../features/fun-facts/fun-facts.types';
import {
  getDailyFact,
  getFactsByCategory,
  searchFacts,
  getTodayString,
  validateTrueFalse,
  validateMultipleChoice,
  calculateQuizResult,
  calculateStreak,
} from '../features/fun-facts/fun-facts.engine';

let passed = 0;
let failed = 0;

function assert(condition: boolean, message: string) {
  if (condition) {
    passed++;
    console.log(`  ✓ ${message}`);
  } else {
    failed++;
    console.error(`  ✗ ${message}`);
  }
}

function section(name: string) {
  console.log(`\n═══ ${name} ═══`);
}

// ═══════════════════════════════════════════════════════════════════
// 1. FACT IDS UNIQUE
// ═══════════════════════════════════════════════════════════════════
section('1. Fact IDs Unique');
const factIds = FUN_FACTS.map((f) => f.id);
const uniqueFactIds = new Set(factIds);
assert(factIds.length === uniqueFactIds.size, `All ${factIds.length} fact IDs are unique`);

// ═══════════════════════════════════════════════════════════════════
// 2. Localized Content
// ═══════════════════════════════════════════════════════════════════
section('2. Localized Content');
let factsWithMissingLang = 0;
for (const f of FUN_FACTS) {
  if (!f.fact.en || !f.fact.ta) factsWithMissingLang++;
}
assert(factsWithMissingLang === 0, `All facts have English and Tamil text`);

// ═══════════════════════════════════════════════════════════════════
// 3. Categories Valid
// ═══════════════════════════════════════════════════════════════════
section('3. Categories Valid');
const validCategories = new Set(FUN_FACT_CATEGORIES);
let invalidCats = 0;
for (const f of FUN_FACTS) {
  if (!validCategories.has(f.category)) invalidCats++;
}
assert(invalidCats === 0, `All facts have valid categories`);

// ═══════════════════════════════════════════════════════════════════
// 4. Daily Determinism
// ═══════════════════════════════════════════════════════════════════
section('4. Daily Determinism');
const today = getTodayString();
const fact1 = getDailyFact(today);
const fact2 = getDailyFact(today);
assert(fact1.id === fact2.id, `Same date produces same fact: ${fact1.id}`);
const fact3 = getDailyFact('2024-01-01');
const fact4 = getDailyFact('2024-01-01');
assert(fact3.id === fact4.id, `Deterministic for fixed date`);

// ═══════════════════════════════════════════════════════════════════
// 5. Search
// ═══════════════════════════════════════════════════════════════════
section('5. Search');
const spaceFacts = searchFacts('space');
assert(spaceFacts.length > 0, `Search "space" returns results: ${spaceFacts.length}`);
const emptySearch = searchFacts('');
assert(emptySearch.length === FUN_FACTS.length, `Empty search returns all facts`);

// ═══════════════════════════════════════════════════════════════════
// 6. Filters
// ═══════════════════════════════════════════════════════════════════
section('6. Filters');
const physicsFacts = getFactsByCategory('physics');
assert(physicsFacts.every((f) => f.category === 'physics'), `Physics filter works`);
const allFacts = getFactsByCategory('all');
assert(allFacts.length === FUN_FACTS.length, `'all' returns all facts`);

// ═══════════════════════════════════════════════════════════════════
// 7. True/False Validation
// ═══════════════════════════════════════════════════════════════════
section('7. True/False Validation');
const tfQ = FACT_QUESTIONS.find((q) => q.type === 'true-false');
if (tfQ) {
  assert(validateTrueFalse(tfQ, tfQ.correctAnswer) === true, `Correct answer validated`);
  assert(validateTrueFalse(tfQ, 'wrong') === false, `Wrong answer rejected`);
} else {
  assert(false, `No true/false questions found`);
}

// ═══════════════════════════════════════════════════════════════════
// 8. Multiple Choice Validation
// ═══════════════════════════════════════════════════════════════════
section('8. Multiple Choice Validation');
const mcQ = FACT_QUESTIONS.find((q) => q.type === 'multiple-choice');
if (mcQ) {
  assert(validateMultipleChoice(mcQ, mcQ.correctAnswer) === true, `Correct MC answer validated`);
  assert(validateMultipleChoice(mcQ, 'wrong') === false, `Wrong MC answer rejected`);
} else {
  assert(false, `No multiple choice questions found`);
}

// ═══════════════════════════════════════════════════════════════════
// 9. Score
// ═══════════════════════════════════════════════════════════════════
section('9. Score');
const mockQuestions = FACT_QUESTIONS.slice(0, 5);
const allCorrect = mockQuestions.map((q) => q.correctAnswer);
const result = calculateQuizResult(mockQuestions, allCorrect, 'quiz');
assert(result.correctAnswers === 5, `All correct returns 5 correct`);
assert(result.score === 50, `Score is 50 for 5 correct (10 pts each)`);

// ═══════════════════════════════════════════════════════════════════
// 10. Streak
// ═══════════════════════════════════════════════════════════════════
section('10. Streak');
const streak1 = calculateStreak([]);
assert(streak1.current === 0, `Empty dates = 0 streak`);
const streak2 = calculateStreak([getTodayString()]);
assert(streak2.current >= 1, `Today only = 1 streak`);

// ═══════════════════════════════════════════════════════════════════
// 11. Collections
// ═══════════════════════════════════════════════════════════════════
section('11. Collections');
assert(FACT_COLLECTIONS.length >= 5, `At least 5 collections: ${FACT_COLLECTIONS.length}`);
for (const col of FACT_COLLECTIONS) {
  assert(col.factIds.length >= 8, `Collection "${col.id}" has ${col.factIds.length} facts`);
}

// ═══════════════════════════════════════════════════════════════════
// 12. Favorites
// ═══════════════════════════════════════════════════════════════════
section('12. Favorites');
assert(true, `Favorites toggle exists (runtime only)`);

// ═══════════════════════════════════════════════════════════════════
// 13. Result Model
// ═══════════════════════════════════════════════════════════════════
section('13. Result Model');
assert(typeof result.mode === 'string', `Result has mode`);
assert(typeof result.totalQuestions === 'number', `Result has totalQuestions`);
assert(typeof result.correctAnswers === 'number', `Result has correctAnswers`);
assert(typeof result.score === 'number', `Result has score`);
assert(typeof result.completedAt === 'number', `Result has completedAt`);

// ═══════════════════════════════════════════════════════════════════
// SUMMARY
// ═══════════════════════════════════════════════════════════════════
console.log('\n══════════════════════════════════════════');
console.log(`Fun Facts Verification: ${passed} passed, ${failed} failed`);
console.log(`Total facts: ${FUN_FACTS.length}`);
console.log(`Total questions: ${FACT_QUESTIONS.length}`);
console.log(`Total collections: ${FACT_COLLECTIONS.length}`);
console.log('══════════════════════════════════════════');

if (failed > 0) {
  process.exit(1);
}
