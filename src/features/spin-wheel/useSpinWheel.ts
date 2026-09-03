/**
 * useSpinWheel Custom Hook
 * Manages the full 5-stage lifecycle of the Daily Spin Wheel.
 */

import { useState, useRef, useCallback, useEffect } from 'react';
import { Animated, Easing, AccessibilityInfo } from 'react-native';
import {
  SpinState,
  SpinOutcomeType,
  SpinWheelOutcome,
  SpinWheelSession,
  SpinWheelResult,
} from './spin-wheel.types';
import {
  selectWheelOutcome,
  getSegmentIndex,
  calculateTargetRotation,
  resolveOutcomePayload,
} from './spin-wheel.engine';
import { calculateSpinPoints } from './spin-wheel.scoring';

export function useSpinWheel() {
  const [state, setState] = useState<SpinState>('ready');
  const [selectedOutcomeType, setSelectedOutcomeType] = useState<SpinOutcomeType | null>(null);
  const [outcome, setOutcome] = useState<SpinWheelOutcome | null>(null);
  const [selectedOptionId, setSelectedOptionId] = useState<string | undefined>(undefined);
  const [answeredCorrectly, setAnsweredCorrectly] = useState<boolean | undefined>(undefined);
  const [pointsEarned, setPointsEarned] = useState<number>(0);
  const [isDailyCompleted, setIsDailyCompleted] = useState<boolean>(false);

  // Animated rotation value
  const rotationAnim = useRef(new Animated.Value(0)).current;
  const currentRotationRef = useRef<number>(0);
  const [reduceMotion, setReduceMotion] = useState<boolean>(false);

  useEffect(() => {
    AccessibilityInfo.isReduceMotionEnabled().then(setReduceMotion);
  }, []);

  /**
   * Triggers the wheel spin animation towards a target outcome.
   */
  const spinWheel = useCallback(
    (forcedOutcome?: SpinOutcomeType) => {
      if (state !== 'ready' || isDailyCompleted) return;

      const winningOutcome = forcedOutcome || selectWheelOutcome();
      const segmentIndex = getSegmentIndex(winningOutcome);
      const targetAngle = calculateTargetRotation(
        segmentIndex,
        currentRotationRef.current,
        reduceMotion ? 0 : 3
      );

      setSelectedOutcomeType(winningOutcome);
      setState('spinning');

      if (reduceMotion) {
        currentRotationRef.current = targetAngle;
        rotationAnim.setValue(targetAngle);
        const resolved = resolveOutcomePayload(winningOutcome);
        setOutcome(resolved);
        setState('challenge');
        return;
      }

      Animated.timing(rotationAnim, {
        toValue: targetAngle,
        duration: 3200,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }).start(() => {
        currentRotationRef.current = targetAngle;
        const resolved = resolveOutcomePayload(winningOutcome);
        setOutcome(resolved);
        setState('challenge');
      });
    },
    [state, isDailyCompleted, reduceMotion, rotationAnim]
  );

  /**
   * Handles multiple-choice option selection.
   */
  const selectOption = useCallback((optionId: string) => {
    setSelectedOptionId(optionId);
  }, []);

  /**
   * Submits chosen question answer.
   */
  const submitAnswer = useCallback(() => {
    if (!outcome || outcome.payload.type !== 'question' || !selectedOptionId) return;

    const question = outcome.payload.data;
    const isCorrect = selectedOptionId === question.correctOptionId;
    const earned = calculateSpinPoints(outcome.type, isCorrect);

    setAnsweredCorrectly(isCorrect);
    setPointsEarned(earned);
    setState('feedback');
  }, [outcome, selectedOptionId]);

  /**
   * Acknowledges fact or bonus reward.
   */
  const acknowledgeReward = useCallback(() => {
    if (!outcome) return;

    if (outcome.payload.type === 'bonus') {
      const earned = calculateSpinPoints('bonus');
      setPointsEarned(earned);
    } else if (outcome.payload.type === 'fact') {
      const earned = calculateSpinPoints('scienceFact');
      setPointsEarned(earned);
    }

    setState('completed');
    setIsDailyCompleted(true);
  }, [outcome]);

  /**
   * Completes question flow from feedback state.
   */
  const finishSession = useCallback(() => {
    setState('completed');
    setIsDailyCompleted(true);
  }, []);

  /**
   * Packages current state into session and result.
   */
  const session: SpinWheelSession = {
    state,
    selectedOutcomeType,
    outcome,
    selectedOptionId,
    answeredCorrectly,
    pointsEarned,
    isDailyCompleted,
    startedAt: Date.now(),
  };

  const result: SpinWheelResult | null =
    state === 'completed' && selectedOutcomeType
      ? {
          outcome: selectedOutcomeType,
          completed: true,
          answeredCorrectly,
          pointsEarned,
          completedAt: Date.now(),
        }
      : null;

  return {
    state,
    session,
    result,
    outcome,
    rotationAnim,
    selectedOptionId,
    answeredCorrectly,
    pointsEarned,
    isDailyCompleted,
    spinWheel,
    selectOption,
    submitAnswer,
    acknowledgeReward,
    finishSession,
  };
}
