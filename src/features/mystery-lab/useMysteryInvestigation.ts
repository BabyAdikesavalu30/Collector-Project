/**
 * Vigyaan Mystery Lab — Investigation Hook
 * Main hook managing investigation state, timer, and actions.
 */

import { useState, useCallback, useRef, useEffect } from 'react';
import { MysteryCase, InvestigationState, MysteryResultPayload, MysteryStep, ConfidenceLevel } from './mystery.types';
import {
  createInvestigationState,
  inspectObject,
  revealAllClues,
  toggleEvidence,
  selectHypothesis,
  setConfidence,
  updateNotes,
  useHint,
  advanceToNextStep,
  goToStep,
  submitConclusion,
  buildResultPayload,
  createRetryState,
  canSubmitConclusion,
} from './mystery.engine';
import { saveCaseCompletion, saveActiveSession, clearActiveSession } from './mystery.storage';

interface UseMysteryInvestigationReturn {
  state: InvestigationState;
  result: MysteryResultPayload | null;
  elapsedSeconds: number;
  isTimerActive: boolean;

  // Actions
  startInvestigation: () => void;
  inspectSceneObject: (objectId: string) => void;
  toggleEvidenceSelection: (clueId: string) => void;
  selectHypothesisChoice: (hypothesisId: string) => void;
  setConfidenceLevel: (level: ConfidenceLevel) => void;
  updateInvestigationNotes: (notes: string) => void;
  useInvestigationHint: () => void;
  advanceStep: () => void;
  goToInvestigationStep: (step: MysteryStep) => void;
  submitFinalConclusion: () => Promise<void>;
  retryCase: () => void;
  goBack: () => void;

  // Computed
  canSubmit: boolean;
  currentHintIndex: number;
  maxHints: number;
}

export function useMysteryInvestigation(mysteryCase: MysteryCase): UseMysteryInvestigationReturn {
  const [state, setState] = useState<InvestigationState>(() =>
    createInvestigationState(mysteryCase.id)
  );
  const [result, setResult] = useState<MysteryResultPayload | null>(null);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startTimeRef = useRef<number>(0);

  // Timer management
  const startTimer = useCallback(() => {
    startTimeRef.current = Date.now();
    setIsTimerActive(true);
  }, []);

  const stopTimer = useCallback(() => {
    setIsTimerActive(false);
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  // Timer tick
  useEffect(() => {
    if (!isTimerActive) return;

    timerRef.current = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTimeRef.current) / 1000);
      setElapsedSeconds(elapsed);
    }, 1000);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [isTimerActive]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  // Start investigation
  const startInvestigation = useCallback(() => {
    startTimer();
    let updated = advanceToNextStep(state);
    // For beginner cases, reveal all clues
    updated = revealAllClues(updated, mysteryCase);
    setState(updated);
    saveActiveSession(updated);
  }, [state, mysteryCase, startTimer]);

  // Inspect object
  const inspectSceneObject = useCallback((objectId: string) => {
    setState((prev) => {
      const updated = inspectObject(prev, objectId, mysteryCase);
      saveActiveSession(updated);
      return updated;
    });
  }, [mysteryCase]);

  // Toggle evidence
  const toggleEvidenceSelection = useCallback((clueId: string) => {
    setState((prev) => {
      const updated = toggleEvidence(prev, clueId);
      saveActiveSession(updated);
      return updated;
    });
  }, []);

  // Select hypothesis
  const selectHypothesisChoice = useCallback((hypothesisId: string) => {
    setState((prev) => {
      const updated = selectHypothesis(prev, hypothesisId);
      saveActiveSession(updated);
      return updated;
    });
  }, []);

  // Set confidence
  const setConfidenceLevel = useCallback((level: ConfidenceLevel) => {
    setState((prev) => {
      const updated = setConfidence(prev, level);
      saveActiveSession(updated);
      return updated;
    });
  }, []);

  // Update notes
  const updateInvestigationNotes = useCallback((notes: string) => {
    setState((prev) => {
      const updated = updateNotes(prev, notes);
      saveActiveSession(updated);
      return updated;
    });
  }, []);

  // Use hint
  const useInvestigationHint = useCallback(() => {
    const usedCount = state.hintsUsed.length;
    if (usedCount >= mysteryCase.hints.length) return;

    const hint = mysteryCase.hints[usedCount];
    setState((prev) => {
      const updated = useHint(prev, hint.id);
      saveActiveSession(updated);
      return updated;
    });
  }, [state, mysteryCase]);

  // Advance step
  const advanceStep = useCallback(() => {
    setState((prev) => {
      const updated = advanceToNextStep(prev);
      saveActiveSession(updated);
      return updated;
    });
  }, []);

  // Go to step
  const goToInvestigationStep = useCallback((step: MysteryStep) => {
    setState((prev) => {
      const updated = goToStep(prev, step);
      saveActiveSession(updated);
      return updated;
    });
  }, []);

  // Submit conclusion
  const submitFinalConclusion = useCallback(async () => {
    stopTimer();
    const finalState = {
      ...state,
      elapsedMs: Date.now() - startTimeRef.current,
    };
    const concluded = submitConclusion(finalState);
    const payload = buildResultPayload(mysteryCase, concluded);
    setResult(payload);
    setState(concluded);
    await saveCaseCompletion(mysteryCase.id, payload);
    await clearActiveSession();
  }, [state, mysteryCase, stopTimer]);

  // Retry
  const retryCase = useCallback(() => {
    stopTimer();
    const fresh = createRetryState(mysteryCase.id);
    setState(fresh);
    setResult(null);
    setElapsedSeconds(0);
    startTimeRef.current = 0;
  }, [mysteryCase, stopTimer]);

  // Go back
  const goBack = useCallback(() => {
    stopTimer();
  }, [stopTimer]);

  return {
    state,
    result,
    elapsedSeconds,
    isTimerActive,
    startInvestigation,
    inspectSceneObject,
    toggleEvidenceSelection,
    selectHypothesisChoice,
    setConfidenceLevel,
    updateInvestigationNotes,
    useInvestigationHint,
    advanceStep,
    goToInvestigationStep,
    submitFinalConclusion,
    retryCase,
    goBack,
    canSubmit: canSubmitConclusion(state),
    currentHintIndex: state.hintsUsed.length,
    maxHints: mysteryCase.hints.length,
  };
}
