/**
 * Vigyaan Mystery Lab — Verification Script
 * Validates case registry, uniqueness, localization, scoring, and completeness.
 */

import { getMysteryCases } from '../features/mystery-lab/mystery.cases';
import { MysteryCase, MysteryCategory, GradeRange, MysteryDifficulty } from '../features/mystery-lab/mystery.types';
import { calculateMysteryScore } from '../features/mystery-lab/mystery.scoring';
import { createInvestigationState, inspectObject, toggleEvidence, selectHypothesis, submitConclusion, buildResultPayload } from '../features/mystery-lab/mystery.engine';
import { getDailyCaseId, isValidGradeRange, isValidDifficulty, isValidCategory } from '../features/mystery-lab/mystery.utils';

interface ValidationResult {
  check: string;
  passed: boolean;
  message: string;
}

function validate(): ValidationResult[] {
  const results: ValidationResult[] = [];
  const cases = getMysteryCases();

  // 1. Case registry exists
  results.push({
    check: 'Case Registry',
    passed: cases.length > 0,
    message: `Found ${cases.length} cases`,
  });

  // 2. Case count >= 30
  results.push({
    check: 'Case Count (>=30)',
    passed: cases.length >= 30,
    message: `Found ${cases.length} cases (need >= 30)`,
  });

  // 3. Unique IDs
  const ids = cases.map((c) => c.id);
  const uniqueIds = new Set(ids);
  results.push({
    check: 'Unique Case IDs',
    passed: uniqueIds.size === ids.length,
    message: `${uniqueIds.size} unique IDs out of ${ids.length} total`,
  });

  // 4. Validate each case
  const categoryCounts: Record<string, number> = {};
  const gradeCounts: Record<string, number> = {};
  const difficultyCounts: Record<string, number> = {};

  for (const c of cases) {
    // Category
    categoryCounts[c.category] = (categoryCounts[c.category] || 0) + 1;
    if (!isValidCategory(c.category)) {
      results.push({ check: `Case ${c.id} Category`, passed: false, message: `Invalid category: ${c.category}` });
    }

    // Grade Range
    gradeCounts[c.gradeRange] = (gradeCounts[c.gradeRange] || 0) + 1;
    if (!isValidGradeRange(c.gradeRange)) {
      results.push({ check: `Case ${c.id} GradeRange`, passed: false, message: `Invalid grade range: ${c.gradeRange}` });
    }

    // Difficulty
    difficultyCounts[c.difficulty] = (difficultyCounts[c.difficulty] || 0) + 1;
    if (!isValidDifficulty(c.difficulty)) {
      results.push({ check: `Case ${c.id} Difficulty`, passed: false, message: `Invalid difficulty: ${c.difficulty}` });
    }

    // Clues
    if (c.clues.length < 3) {
      results.push({ check: `Case ${c.id} ClueCount`, passed: false, message: `Only ${c.clues.length} clues (need >= 3)` });
    }

    // Hypotheses
    if (c.hypotheses.length < 2 || c.hypotheses.length > 5) {
      results.push({ check: `Case ${c.id} HypothesisCount`, passed: false, message: `${c.hypotheses.length} hypotheses (need 2-5)` });
    }

    // Correct hypothesis exists
    const correctHyp = c.hypotheses.find((h) => h.id === c.correctHypothesisId);
    if (!correctHyp) {
      results.push({ check: `Case ${c.id} CorrectHypothesis`, passed: false, message: `correctHypothesisId "${c.correctHypothesisId}" not found in hypotheses` });
    }

    // Localization
    if (!c.title.en || !c.title.ta) {
      results.push({ check: `Case ${c.id} Title i18n`, passed: false, message: 'Missing English or Tamil title' });
    }
    if (!c.description.en || !c.description.ta) {
      results.push({ check: `Case ${c.id} Description i18n`, passed: false, message: 'Missing English or Tamil description' });
    }
    if (!c.explanation.en || !c.explanation.ta) {
      results.push({ check: `Case ${c.id} Explanation i18n`, passed: false, message: 'Missing English or Tamil explanation' });
    }

    // Clue validity
    const clueIds = c.clues.map((cl) => cl.id);
    const uniqueClueIds = new Set(clueIds);
    if (uniqueClueIds.size !== clueIds.length) {
      results.push({ check: `Case ${c.id} DuplicateClueIDs`, passed: false, message: 'Duplicate clue IDs found' });
    }

    // Scene objects
    if (c.sceneObjects.length < 2) {
      results.push({ check: `Case ${c.id} SceneObjects`, passed: false, message: `Only ${c.sceneObjects.length} scene objects (need >= 2)` });
    }

    // Hints
    if (c.hints.length < 3) {
      results.push({ check: `Case ${c.id} HintCount`, passed: false, message: `Only ${c.hints.length} hints (need >= 3)` });
    }

    // Learning concepts
    if (c.learningConcepts.length === 0) {
      results.push({ check: `Case ${c.id} LearningConcepts`, passed: false, message: 'No learning concepts defined' });
    }
  }

  // 5. Category coverage
  const requiredCategories: MysteryCategory[] = ['physics', 'chemistry', 'biology', 'space', 'environment'];
  for (const cat of requiredCategories) {
    results.push({
      check: `Category: ${cat}`,
      passed: (categoryCounts[cat] || 0) >= 2,
      message: `${categoryCounts[cat] || 0} cases in ${cat}`,
    });
  }

  // 6. Grade coverage
  const requiredGrades: GradeRange[] = ['6-7', '8-10', '11-12'];
  for (const grade of requiredGrades) {
    results.push({
      check: `Grade: ${grade}`,
      passed: (gradeCounts[grade] || 0) >= 3,
      message: `${gradeCounts[grade] || 0} cases for grade ${grade}`,
    });
  }

  // 7. Daily case determinism
  const daily1 = getDailyCaseId(cases, '2026-09-03');
  const daily2 = getDailyCaseId(cases, '2026-09-03');
  results.push({
    check: 'Daily Case Determinism',
    passed: daily1 === daily2,
    message: `Same date produces: ${daily1} === ${daily2}`,
  });

  // 8. Scoring validation
  const testCase = cases[0];
  const testState = createInvestigationState(testCase.id);
  const inspectedState = testCase.sceneObjects.reduce(
    (s, obj) => inspectObject(s, obj.id, testCase),
    testState
  );
  const selectedEvidence = inspectedState.discoveredClueIds.slice(0, 3);
  const evidenceState = selectedEvidence.reduce((s, id) => toggleEvidence(s, id), inspectedState);
  const hypoState = selectHypothesis(evidenceState, testCase.correctHypothesisId);
  const concluded = submitConclusion({ ...hypoState, startedAt: Date.now() - 60000 });
  const payload = buildResultPayload(testCase, concluded);

  results.push({
    check: 'Scoring Range',
    passed: payload.score.totalScore >= 0 && payload.score.totalScore <= 100,
    message: `Score: ${payload.score.totalScore}`,
  });

  results.push({
    check: 'Correct Answer Scoring',
    passed: payload.correct === true,
    message: `Correct: ${payload.correct}`,
  });

  results.push({
    check: 'Star Rating',
    passed: [0, 1, 2, 3].includes(payload.score.stars),
    message: `Stars: ${payload.score.stars}`,
  });

  // 9. Total results summary
  const passed = results.filter((r) => r.passed).length;
  const failed = results.filter((r) => !r.passed).length;

  console.log('\n========================================');
  console.log('  VIGYAAN MYSTERY LAB VERIFICATION');
  console.log('========================================\n');
  console.log(`Total Checks: ${results.length}`);
  console.log(`Passed: ${passed}`);
  console.log(`Failed: ${failed}`);
  console.log('');

  for (const r of results) {
    const icon = r.passed ? '✅' : '❌';
    console.log(`${icon} ${r.check}: ${r.message}`);
  }

  console.log('\n========================================');
  if (failed === 0) {
    console.log('  ALL CHECKS PASSED ✅');
  } else {
    console.log(`  ${failed} CHECK(S) FAILED ❌`);
  }
  console.log('========================================\n');

  return results;
}

// Run if executed directly
validate();
