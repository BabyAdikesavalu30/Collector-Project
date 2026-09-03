/**
 * Mystery Lab — Case Validation Tests
 */

import { getMysteryCases } from '../mystery.cases';
import { getDailyCaseId, isValidGradeRange, isValidDifficulty, isValidCategory } from '../mystery.utils';

const cases = getMysteryCases();

describe('Mystery Lab Case Validation', () => {
  describe('Case Registry', () => {
    it('has at least 30 cases', () => {
      expect(cases.length).toBeGreaterThanOrEqual(30);
    });

    it('has unique IDs', () => {
      const ids = cases.map((c) => c.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(ids.length);
    });
  });

  describe('Individual Case Validation', () => {
    for (const c of cases) {
      describe(`Case: ${c.id}`, () => {
        it('has valid category', () => {
          expect(isValidCategory(c.category)).toBe(true);
        });

        it('has valid grade range', () => {
          expect(isValidGradeRange(c.gradeRange)).toBe(true);
        });

        it('has valid difficulty', () => {
          expect(isValidDifficulty(c.difficulty)).toBe(true);
        });

        it('has English and Tamil title', () => {
          expect(c.title.en).toBeTruthy();
          expect(c.title.ta).toBeTruthy();
        });

        it('has English and Tamil description', () => {
          expect(c.description.en).toBeTruthy();
          expect(c.description.ta).toBeTruthy();
        });

        it('has English and Tamil explanation', () => {
          expect(c.explanation.en).toBeTruthy();
          expect(c.explanation.ta).toBeTruthy();
        });

        it('has at least 3 clues', () => {
          expect(c.clues.length).toBeGreaterThanOrEqual(3);
        });

        it('has unique clue IDs', () => {
          const clueIds = c.clues.map((cl) => cl.id);
          const unique = new Set(clueIds);
          expect(unique.size).toBe(clueIds.length);
        });

        it('has 2-5 hypotheses', () => {
          expect(c.hypotheses.length).toBeGreaterThanOrEqual(2);
          expect(c.hypotheses.length).toBeLessThanOrEqual(5);
        });

        it('has valid correct hypothesis', () => {
          const correct = c.hypotheses.find((h) => h.id === c.correctHypothesisId);
          expect(correct).toBeDefined();
        });

        it('has at least 2 scene objects', () => {
          expect(c.sceneObjects.length).toBeGreaterThanOrEqual(2);
        });

        it('has at least 3 hints', () => {
          expect(c.hints.length).toBeGreaterThanOrEqual(3);
        });

        it('has learning concepts', () => {
          expect(c.learningConcepts.length).toBeGreaterThan(0);
        });

        it('has estimated minutes > 0', () => {
          expect(c.estimatedMinutes).toBeGreaterThan(0);
        });
      });
    }
  });

  describe('Daily Case Determinism', () => {
    it('returns same case for same date', () => {
      const date = '2026-09-03';
      const case1 = getDailyCaseId(cases, date);
      const case2 = getDailyCaseId(cases, date);
      expect(case1).toBe(case2);
    });

    it('returns valid case ID', () => {
      const caseId = getDailyCaseId(cases, '2026-09-03');
      const found = cases.find((c) => c.id === caseId);
      expect(found).toBeDefined();
    });
  });

  describe('Category Coverage', () => {
    it('has physics cases', () => {
      expect(cases.some((c) => c.category === 'physics')).toBe(true);
    });

    it('has chemistry cases', () => {
      expect(cases.some((c) => c.category === 'chemistry')).toBe(true);
    });

    it('has biology cases', () => {
      expect(cases.some((c) => c.category === 'biology')).toBe(true);
    });

    it('has space cases', () => {
      expect(cases.some((c) => c.category === 'space')).toBe(true);
    });

    it('has environment cases', () => {
      expect(cases.some((c) => c.category === 'environment')).toBe(true);
    });
  });

  describe('Grade Coverage', () => {
    it('has grade 6-7 cases', () => {
      expect(cases.some((c) => c.gradeRange === '6-7')).toBe(true);
    });

    it('has grade 8-10 cases', () => {
      expect(cases.some((c) => c.gradeRange === '8-10')).toBe(true);
    });

    it('has grade 11-12 cases', () => {
      expect(cases.some((c) => c.gradeRange === '11-12')).toBe(true);
    });
  });
});
