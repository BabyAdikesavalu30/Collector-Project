/**
 * Mystery Lab — Scoring Tests
 */

import { calculateMysteryScore, getStarRating, getEssentialClueCount, getSelectedEssentialCount } from '../mystery.scoring';
import { createInvestigationState, inspectObject, toggleEvidence, selectHypothesis, submitConclusion } from '../mystery.engine';
import { getMysteryCases } from '../mystery.cases';

const cases = getMysteryCases();

describe('Mystery Lab Scoring', () => {
  describe('getStarRating', () => {
    it('returns 3 stars for 90+', () => {
      expect(getStarRating(90)).toBe(3);
      expect(getStarRating(100)).toBe(3);
    });

    it('returns 2 stars for 70-89', () => {
      expect(getStarRating(70)).toBe(2);
      expect(getStarRating(89)).toBe(2);
    });

    it('returns 1 star for 1-69', () => {
      expect(getStarRating(1)).toBe(1);
      expect(getStarRating(69)).toBe(1);
    });

    it('returns 0 for 0', () => {
      expect(getStarRating(0)).toBe(0);
    });
  });

  describe('calculateMysteryScore', () => {
    it('gives high score for correct answer with full evidence', () => {
      const testCase = cases[0];
      const state = createInvestigationState(testCase.id);
      state.startedAt = Date.now() - 120000;
      state.discoveredClueIds = testCase.clues.map((c) => c.id);
      state.inspectedObjectIds = testCase.sceneObjects.map((o) => o.id);
      state.selectedEvidenceIds = testCase.clues.filter((c) => c.relevance === 'essential').map((c) => c.id);
      state.selectedHypothesisId = testCase.correctHypothesisId;
      state.completedAt = Date.now();
      state.elapsedMs = 120000;

      const score = calculateMysteryScore(testCase, state, true);
      expect(score.totalScore).toBeGreaterThanOrEqual(70);
      expect(score.totalScore).toBeLessThanOrEqual(100);
      expect(score.conclusionPoints).toBe(50);
      expect(score.stars).toBeGreaterThanOrEqual(2);
    });

    it('gives 0 conclusion points for wrong answer', () => {
      const testCase = cases[0];
      const state = createInvestigationState(testCase.id);
      state.selectedHypothesisId = testCase.hypotheses.find((h) => h.id !== testCase.correctHypothesisId)?.id || '';

      const score = calculateMysteryScore(testCase, state, false);
      expect(score.conclusionPoints).toBe(0);
      expect(score.totalScore).toBeLessThan(50);
    });

    it('deducts points for hints', () => {
      const testCase = cases[0];
      const state = createInvestigationState(testCase.id);
      state.hintsUsed = ['hint-1', 'hint-2'];
      state.selectedHypothesisId = testCase.correctHypothesisId;

      const score = calculateMysteryScore(testCase, state, true);
      expect(score.hintDeductions).toBe(-15); // -5 + -10
    });

    it('never goes below 0', () => {
      const testCase = cases[0];
      const state = createInvestigationState(testCase.id);
      state.hintsUsed = ['hint-1', 'hint-2', 'hint-3'];
      state.selectedHypothesisId = testCase.hypotheses.find((h) => h.id !== testCase.correctHypothesisId)?.id || '';

      const score = calculateMysteryScore(testCase, state, false);
      expect(score.totalScore).toBeGreaterThanOrEqual(0);
    });

    it('never exceeds 100', () => {
      const testCase = cases[0];
      const state = createInvestigationState(testCase.id);
      state.startedAt = Date.now() - 1000;
      state.discoveredClueIds = testCase.clues.map((c) => c.id);
      state.inspectedObjectIds = testCase.sceneObjects.map((o) => o.id);
      state.selectedEvidenceIds = testCase.clues.filter((c) => c.relevance === 'essential').map((c) => c.id);
      state.selectedHypothesisId = testCase.correctHypothesisId;
      state.completedAt = Date.now();
      state.elapsedMs = 1000;

      const score = calculateMysteryScore(testCase, state, true);
      expect(score.totalScore).toBeLessThanOrEqual(100);
    });
  });

  describe('getEssentialClueCount', () => {
    it('counts essential clues correctly', () => {
      const testCase = cases[0];
      const count = getEssentialClueCount(testCase);
      expect(count).toBeGreaterThan(0);
      expect(count).toBeLessThanOrEqual(testCase.clues.length);
    });
  });

  describe('getSelectedEssentialCount', () => {
    it('counts selected essential clues', () => {
      const testCase = cases[0];
      const essentialIds = testCase.clues.filter((c) => c.relevance === 'essential').map((c) => c.id);
      const count = getSelectedEssentialCount(testCase, essentialIds);
      expect(count).toBe(essentialIds.length);
    });
  });
});
