/**
 * Vigyaan Mystery Lab — Investigation Engine
 * Controls investigation state, clue discovery, evidence selection, hints, hypothesis, and conclusion.
 * All logic separated from UI components.
 */

import {
  MysteryCase,
  MysteryStep,
  InvestigationState,
  MysteryResultPayload,
  ConfidenceLevel,
} from './mystery.types';
import { calculateMysteryScore, getEssentialClueCount, getSelectedEssentialCount } from './mystery.scoring';
import { formatElapsedMs, shouldRevealAllClues } from './mystery.utils';

// ============================================================================
// State Creation
// ============================================================================

export function createInvestigationState(caseId: string): InvestigationState {
  return {
    caseId,
    currentStep: 'introduction',
    discoveredClueIds: [],
    inspectedObjectIds: [],
    selectedEvidenceIds: [],
    selectedHypothesisId: undefined,
    confidence: undefined,
    notes: undefined,
    hintsUsed: [],
    startedAt: Date.now(),
    completedAt: undefined,
    elapsedMs: 0,
  };
}

// ============================================================================
// Step Navigation
// ============================================================================

const STEP_TRANSITIONS: Record<MysteryStep, MysteryStep | null> = {
  introduction: 'scene',
  scene: 'investigate',
  investigate: 'clues',
  clues: 'evidence-board',
  'evidence-board': 'hypotheses',
  hypotheses: 'conclusion',
  conclusion: 'result',
  result: 'learning-insight',
  'learning-insight': null,
};

export function getNextStep(current: MysteryStep): MysteryStep | null {
  return STEP_TRANSITIONS[current] || null;
}

export function canAdvanceToStep(state: InvestigationState, target: MysteryStep): boolean {
  const stepOrder: MysteryStep[] = [
    'introduction', 'scene', 'investigate', 'clues',
    'evidence-board', 'hypotheses', 'conclusion', 'result', 'learning-insight',
  ];
  const currentIdx = stepOrder.indexOf(state.currentStep);
  const targetIdx = stepOrder.indexOf(target);
  return targetIdx <= currentIdx + 1;
}

// ============================================================================
// Object Inspection
// ============================================================================

export function inspectObject(
  state: InvestigationState,
  objectId: string,
  mysteryCase: MysteryCase
): InvestigationState {
  const updated = { ...state };

  // Don't re-inspect
  if (updated.inspectedObjectIds.includes(objectId)) {
    return updated;
  }

  updated.inspectedObjectIds = [...updated.inspectedObjectIds, objectId];

  // Find clue connected to this object
  const sceneObj = mysteryCase.sceneObjects.find((obj) => obj.id === objectId);
  if (sceneObj && !updated.discoveredClueIds.includes(sceneObj.clueConnectionId)) {
    updated.discoveredClueIds = [...updated.discoveredClueIds, sceneObj.clueConnectionId];
  }

  return updated;
}

/**
 * For beginner cases, reveal all clues at once when entering investigate step.
 */
export function revealAllClues(state: InvestigationState, mysteryCase: MysteryCase): InvestigationState {
  if (!shouldRevealAllClues(mysteryCase.difficulty)) return state;

  const allClueIds = mysteryCase.clues.map((c) => c.id);
  const allObjectIds = mysteryCase.sceneObjects.map((o) => o.id);

  return {
    ...state,
    discoveredClueIds: [...new Set([...state.discoveredClueIds, ...allClueIds])],
    inspectedObjectIds: [...new Set([...state.inspectedObjectIds, ...allObjectIds])],
  };
}

// ============================================================================
// Evidence Selection
// ============================================================================

export function toggleEvidence(
  state: InvestigationState,
  clueId: string
): InvestigationState {
  const isSelected = state.selectedEvidenceIds.includes(clueId);
  return {
    ...state,
    selectedEvidenceIds: isSelected
      ? state.selectedEvidenceIds.filter((id) => id !== clueId)
      : [...state.selectedEvidenceIds, clueId],
  };
}

// ============================================================================
// Hypothesis Selection
// ============================================================================

export function selectHypothesis(
  state: InvestigationState,
  hypothesisId: string
): InvestigationState {
  return {
    ...state,
    selectedHypothesisId: hypothesisId,
  };
}

// ============================================================================
// Confidence
// ============================================================================

export function setConfidence(
  state: InvestigationState,
  confidence: ConfidenceLevel
): InvestigationState {
  return {
    ...state,
    confidence,
  };
}

// ============================================================================
// Notes
// ============================================================================

export function updateNotes(
  state: InvestigationState,
  notes: string
): InvestigationState {
  return {
    ...state,
    notes,
  };
}

// ============================================================================
// Hints
// ============================================================================

export function useHint(
  state: InvestigationState,
  hintId: string
): InvestigationState {
  if (state.hintsUsed.includes(hintId)) return state;
  return {
    ...state,
    hintsUsed: [...state.hintsUsed, hintId],
  };
}

export function getNextAvailableHint(
  state: InvestigationState,
  mysteryCase: MysteryCase
): { hintId: string; hintText: string; cost: number } | null {
  const usedCount = state.hintsUsed.length;
  if (usedCount >= mysteryCase.hints.length) return null;

  const hint = mysteryCase.hints[usedCount];
  return {
    hintId: hint.id,
    hintText: hint.text.en,
    cost: hint.cost.scoreDeduction,
  };
}

// ============================================================================
// Step Advancement
// ============================================================================

export function advanceToNextStep(state: InvestigationState): InvestigationState {
  const next = getNextStep(state.currentStep);
  if (!next) return state;

  const updated = { ...state, currentStep: next };

  // When entering investigate, start timer if not already
  if (next === 'investigate' && state.startedAt === 0) {
    updated.startedAt = Date.now();
  }

  return updated;
}

export function goToStep(state: InvestigationState, step: MysteryStep): InvestigationState {
  if (!canAdvanceToStep(state, step)) return state;
  return { ...state, currentStep: step };
}

// ============================================================================
// Conclusion & Result
// ============================================================================

export function submitConclusion(state: InvestigationState): InvestigationState {
  const elapsedMs = state.completedAt
    ? state.elapsedMs
    : Date.now() - state.startedAt;

  return {
    ...state,
    currentStep: 'result',
    completedAt: Date.now(),
    elapsedMs,
  };
}

export function buildResultPayload(
  mysteryCase: MysteryCase,
  state: InvestigationState
): MysteryResultPayload {
  const isCorrect = state.selectedHypothesisId === mysteryCase.correctHypothesisId;
  const elapsedMs = state.completedAt
    ? state.elapsedMs
    : Date.now() - state.startedAt;

  const score = calculateMysteryScore(mysteryCase, state, isCorrect);

  return {
    caseId: mysteryCase.id,
    correct: isCorrect,
    score,
    discoveredClueCount: state.discoveredClueIds.length,
    totalClueCount: mysteryCase.clues.length,
    selectedEvidenceCount: state.selectedEvidenceIds.length,
    hintsUsedCount: state.hintsUsed.length,
    elapsedMs,
    elapsedFormatted: formatElapsedMs(elapsedMs),
    selectedHypothesisId: state.selectedHypothesisId || '',
    correctHypothesisId: mysteryCase.correctHypothesisId,
    completedAt: Date.now(),
  };
}

// ============================================================================
// Retry
// ============================================================================

export function createRetryState(caseId: string): InvestigationState {
  return createInvestigationState(caseId);
}

// ============================================================================
// Validation
// ============================================================================

export function canSubmitConclusion(state: InvestigationState): boolean {
  return Boolean(
    state.selectedHypothesisId &&
    state.discoveredClueIds.length > 0
  );
}

export function hasDiscoveredAllClues(state: InvestigationState, mysteryCase: MysteryCase): boolean {
  return state.discoveredClueIds.length >= mysteryCase.clues.length;
}
