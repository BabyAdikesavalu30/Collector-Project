/**
 * Mystery Lab — Engine Tests
 */

import {
  createInvestigationState,
  inspectObject,
  toggleEvidence,
  selectHypothesis,
  useHint,
  advanceToNextStep,
  submitConclusion,
  buildResultPayload,
  createRetryState,
  canSubmitConclusion,
  revealAllClues,
  setConfidence,
  updateNotes,
} from '../mystery.engine';
import { getMysteryCases } from '../mystery.cases';

const cases = getMysteryCases();
const testCase = cases[0];

describe('Mystery Lab Engine', () => {
  describe('createInvestigationState', () => {
    it('creates initial state with correct defaults', () => {
      const state = createInvestigationState('test-case');
      expect(state.caseId).toBe('test-case');
      expect(state.currentStep).toBe('introduction');
      expect(state.discoveredClueIds).toEqual([]);
      expect(state.inspectedObjectIds).toEqual([]);
      expect(state.selectedEvidenceIds).toEqual([]);
      expect(state.selectedHypothesisId).toBeUndefined();
      expect(state.hintsUsed).toEqual([]);
      expect(state.completedAt).toBeUndefined();
    });
  });

  describe('inspectObject', () => {
    it('discovers clue connected to inspected object', () => {
      const state = createInvestigationState(testCase.id);
      const obj = testCase.sceneObjects[0];
      const updated = inspectObject(state, obj.id, testCase);
      expect(updated.inspectedObjectIds).toContain(obj.id);
      expect(updated.discoveredClueIds).toContain(obj.clueConnectionId);
    });

    it('does not re-inspect same object', () => {
      const state = createInvestigationState(testCase.id);
      const obj = testCase.sceneObjects[0];
      let updated = inspectObject(state, obj.id, testCase);
      updated = inspectObject(updated, obj.id, testCase);
      expect(updated.inspectedObjectIds.filter((id) => id === obj.id).length).toBe(1);
    });
  });

  describe('toggleEvidence', () => {
    it('adds and removes evidence', () => {
      const state = createInvestigationState(testCase.id);
      const clueId = testCase.clues[0].id;
      let updated = toggleEvidence(state, clueId);
      expect(updated.selectedEvidenceIds).toContain(clueId);
      updated = toggleEvidence(updated, clueId);
      expect(updated.selectedEvidenceIds).not.toContain(clueId);
    });
  });

  describe('selectHypothesis', () => {
    it('selects a hypothesis', () => {
      const state = createInvestigationState(testCase.id);
      const updated = selectHypothesis(state, 'h1');
      expect(updated.selectedHypothesisId).toBe('h1');
    });
  });

  describe('useHint', () => {
    it('adds hint to used list', () => {
      const state = createInvestigationState(testCase.id);
      const updated = useHint(state, 'hint-1');
      expect(updated.hintsUsed).toContain('hint-1');
    });

    it('does not add duplicate hints', () => {
      const state = createInvestigationState(testCase.id);
      let updated = useHint(state, 'hint-1');
      updated = useHint(updated, 'hint-1');
      expect(updated.hintsUsed.filter((h) => h === 'hint-1').length).toBe(1);
    });
  });

  describe('advanceToNextStep', () => {
    it('advances from introduction to scene', () => {
      const state = createInvestigationState(testCase.id);
      const updated = advanceToNextStep(state);
      expect(updated.currentStep).toBe('scene');
    });
  });

  describe('submitConclusion', () => {
    it('completes the investigation', () => {
      const state = createInvestigationState(testCase.id);
      state.startedAt = Date.now() - 60000;
      const updated = submitConclusion(state);
      expect(updated.currentStep).toBe('result');
      expect(updated.completedAt).toBeDefined();
    });
  });

  describe('buildResultPayload', () => {
    it('correct answer produces correct result', () => {
      const state = createInvestigationState(testCase.id);
      state.startedAt = Date.now() - 60000;
      state.discoveredClueIds = testCase.clues.map((c) => c.id);
      state.selectedEvidenceIds = testCase.clues.filter((c) => c.relevance === 'essential').map((c) => c.id);
      state.selectedHypothesisId = testCase.correctHypothesisId;
      state.completedAt = Date.now();
      state.elapsedMs = 60000;

      const payload = buildResultPayload(testCase, state);
      expect(payload.correct).toBe(true);
      expect(payload.score.totalScore).toBeGreaterThan(0);
      expect(payload.score.totalScore).toBeLessThanOrEqual(100);
      expect([0, 1, 2, 3]).toContain(payload.score.stars);
    });

    it('incorrect answer produces incorrect result', () => {
      const state = createInvestigationState(testCase.id);
      state.startedAt = Date.now() - 60000;
      state.discoveredClueIds = testCase.clues.slice(0, 1).map((c) => c.id);
      state.selectedHypothesisId = testCase.hypotheses.find((h) => h.id !== testCase.correctHypothesisId)?.id;
      state.completedAt = Date.now();
      state.elapsedMs = 60000;

      const payload = buildResultPayload(testCase, state);
      expect(payload.correct).toBe(false);
    });
  });

  describe('createRetryState', () => {
    it('creates fresh state', () => {
      const state = createInvestigationState(testCase.id);
      state.discoveredClueIds = ['some-clue'];
      state.selectedHypothesisId = 'h1';
      const retry = createRetryState(testCase.id);
      expect(retry.discoveredClueIds).toEqual([]);
      expect(retry.selectedHypothesisId).toBeUndefined();
    });
  });

  describe('canSubmitConclusion', () => {
    it('returns true when hypothesis selected and clues discovered', () => {
      const state = createInvestigationState(testCase.id);
      state.discoveredClueIds = ['some-clue'];
      state.selectedHypothesisId = 'h1';
      expect(canSubmitConclusion(state)).toBe(true);
    });

    it('returns false when no hypothesis', () => {
      const state = createInvestigationState(testCase.id);
      state.discoveredClueIds = ['some-clue'];
      expect(canSubmitConclusion(state)).toBe(false);
    });
  });

  describe('revealAllClues', () => {
    it('reveals all clues for beginner cases', () => {
      const beginnerCase = cases.find((c) => c.difficulty === 'beginner');
      if (beginnerCase) {
        const state = createInvestigationState(beginnerCase.id);
        const updated = revealAllClues(state, beginnerCase);
        expect(updated.discoveredClueIds.length).toBe(beginnerCase.clues.length);
      }
    });
  });

  describe('setConfidence', () => {
    it('sets confidence level', () => {
      const state = createInvestigationState(testCase.id);
      const updated = setConfidence(state, 'high');
      expect(updated.confidence).toBe('high');
    });
  });

  describe('updateNotes', () => {
    it('updates notes', () => {
      const state = createInvestigationState(testCase.id);
      const updated = updateNotes(state, 'My investigation notes');
      expect(updated.notes).toBe('My investigation notes');
    });
  });
});
