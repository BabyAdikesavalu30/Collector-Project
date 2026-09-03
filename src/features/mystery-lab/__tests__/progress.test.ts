/**
 * Mystery Lab — Progress Tests
 */

import { getMysteryProgress, saveCaseCompletion, isDailyMysteryCompleted } from '../mystery.storage';
import { buildResultPayload } from '../mystery.engine';
import { createInvestigationState, submitConclusion } from '../mystery.engine';
import { getMysteryCases } from '../mystery.cases';

const cases = getMysteryCases();

describe('Mystery Lab Progress', () => {
  describe('getMysteryProgress', () => {
    it('returns default progress when no data exists', async () => {
      const progress = await getMysteryProgress();
      expect(progress).toBeDefined();
      expect(Array.isArray(progress.completedCases)).toBe(true);
      expect(Array.isArray(progress.attemptedCases)).toBe(true);
      expect(typeof progress.caseProgress).toBe('object');
      expect(typeof progress.bestScores).toBe('object');
      expect(typeof progress.mysteryStreak).toBe('object');
    });
  });

  describe('isDailyMysteryCompleted', () => {
    it('returns false for non-completed dates', async () => {
      const result = await isDailyMysteryCompleted('2099-01-01');
      expect(result).toBe(false);
    });
  });
});
