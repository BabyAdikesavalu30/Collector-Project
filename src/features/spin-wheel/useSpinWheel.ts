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
import {
  getSpinWheelDailyState,
  isSpinCompletedToday,
  markSpinCompletedToday,
} from './spin-wheel.storage';
import { recordXp, getXpDateKey } from '../xp';

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

  // Restore persisted once-per-day completion state on mount
  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        const state = await getSpinWheelDailyState();
        if (isMounted && isSpinCompletedToday(state)) {
          setIsDailyCompleted(true);
        }
      } catch {
        // Default to available on storage failure
      }
    })();
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    AccessibilityInfo.isReduceMotionEnabled().then(setReduceMotion);
    const subscription = AccessibilityInfo.addEventListener('reduceMotionChanged', setReduceMotion);
    return () => {
      subscription?.remove?.();
    };
  }, []);

  /**
   * Persists the daily completion and awards XP exactly once per local day
   * (dedupe key is date-keyed, so replays of the same day are no-ops).
   */
  const completeDailySpin = useCallback(async (earnedPoints: number) => {
    setIsDailyCompleted(true);
    try {
      await markSpinCompletedToday();
      if (earnedPoints > 0) {
        await recordXp({
          source: 'spin_wheel',
          amount: earnedPoints,
          description: 'Daily spin wheel reward',
          descriptionTa: 'தினசரி சுழல் சக்கர வெகுமதி',
          icon: '🎡',
          dedupeKey: `spin-wheel-${getXpDateKey(Date.now())}`,
        });
      }
    } catch {
      // Reward persistence failure must not crash the completion flow
    }
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
        AccessibilityInfo.announceForAccessibility(`Spin wheel outcome: ${winningOutcome}`);
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
        AccessibilityInfo.announceForAccessibility(`Spin wheel outcome: ${winningOutcome}`);
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

    let earned = 0;
    if (outcome.payload.type === 'bonus') {
      earned = calculateSpinPoints('bonus');
      setPointsEarned(earned);
    } else if (outcome.payload.type === 'fact') {
      earned = calculateSpinPoints('scienceFact');
      setPointsEarned(earned);
    }

    setState('completed');
    void completeDailySpin(earned);
  }, [outcome, completeDailySpin]);

  /**
   * Completes question flow from feedback state.
   */
  const finishSession = useCallback(() => {
    setState('completed');
    void completeDailySpin(pointsEarned);
  }, [pointsEarned, completeDailySpin]);

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
