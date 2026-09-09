/**
 * useRiddleEngine Hook
 * State management for Riddle Question Solving session.
 * Manages active riddle, text input, attempt counters (max 2), hint usage,
 * deterministic evaluation, score accumulation, streak tracking, and result packaging.
 */

import { useState, useMemo, useCallback, useEffect } from 'react';
import {
  RiddleDifficulty,
  RiddleQuestion,
  RiddleResult,
  RiddleStatus,
} from './riddle.types';
import { getRiddlesForDifficulty } from './riddle.mock';
import { checkRiddleAnswer } from './riddle.engine';
import { calculateRiddlePoints, updateRiddleStreak } from './riddle.scoring';
import { SupportedLanguage } from '../../config/i18n';

interface UseRiddleEngineProps {
  difficulty?: RiddleDifficulty | string | null;
  language?: SupportedLanguage;
  onComplete?: (result: RiddleResult) => void;
}

export function useRiddleEngine({
  difficulty,
  language = 'en',
  onComplete,
}: UseRiddleEngineProps) {
  const safeDifficulty: RiddleDifficulty =
    difficulty === 'easy' ||
    difficulty === 'medium' ||
    difficulty === 'hard' ||
    difficulty === 'genius'
      ? difficulty
      : 'easy';

  // Load riddles
  const riddles = useMemo(() => {
    return getRiddlesForDifficulty(safeDifficulty);
  }, [safeDifficulty]);

  const totalCount = riddles.length;

  // Session state
  const [currentIndex, setCurrentIndex] = useState(0);
  const [inputText, setInputText] = useState('');
  const [attemptsUsed, setAttemptsUsed] = useState(0);
  const [status, setStatus] = useState<RiddleStatus>('unanswered');
  const [pointsAwarded, setPointsAwarded] = useState(0);
  const [hintRevealed, setHintRevealed] = useState(false);
  const [hintsUsedCount, setHintsUsedCount] = useState(0);

  // Cumulative session metrics
  const [score, setScore] = useState(0);
  const [solvedCount, setSolvedCount] = useState(0);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [isSessionCompleted, setIsSessionCompleted] = useState(false);
  const [startedAt] = useState<number>(() => Date.now());

  const currentRiddle: RiddleQuestion | undefined = riddles[currentIndex];
  const isLastRiddle = currentIndex === totalCount - 1;
  const maxAttempts = 2;
  const isExhausted = attemptsUsed >= maxAttempts;
  const isQuestionResolved = status === 'correct' || isExhausted;

  // Reveal hint
  const revealHint = useCallback(() => {
    if (!hintRevealed) {
      setHintRevealed(true);
      setHintsUsedCount((prev) => prev + 1);
    }
  }, [hintRevealed]);

  // Submit answer
  const submitAnswer = useCallback(() => {
    if (!currentRiddle || !inputText.trim() || isQuestionResolved) {
      return;
    }

    const nextAttempts = attemptsUsed + 1;
    setAttemptsUsed(nextAttempts);

    const isMatch = checkRiddleAnswer(inputText, currentRiddle, language);

    if (isMatch) {
      setStatus('correct');
      const pts = calculateRiddlePoints(currentRiddle.points, nextAttempts, true);
      setPointsAwarded(pts);
      setScore((prev) => prev + pts);
      setSolvedCount((prev) => prev + 1);

      const streakRes = updateRiddleStreak(currentStreak, bestStreak, true);
      setCurrentStreak(streakRes.currentStreak);
      setBestStreak(streakRes.bestStreak);
    } else {
      setStatus('incorrect');
      if (nextAttempts >= maxAttempts) {
        setPointsAwarded(0);
        const streakRes = updateRiddleStreak(currentStreak, bestStreak, false);
        setCurrentStreak(streakRes.currentStreak);
        setBestStreak(streakRes.bestStreak);
      }
    }
  }, [
    currentRiddle,
    inputText,
    isQuestionResolved,
    attemptsUsed,
    maxAttempts,
    language,
    currentStreak,
    bestStreak,
  ]);

  // Retry after first wrong attempt
  const retryQuestion = useCallback(() => {
    if (status === 'incorrect' && attemptsUsed < maxAttempts) {
      setInputText('');
      setStatus('unanswered');
    }
  }, [status, attemptsUsed, maxAttempts]);

  // Move to next riddle or finalize
  const nextRiddle = useCallback(() => {
    if (!isLastRiddle) {
      setCurrentIndex((prev) => prev + 1);
      setInputText('');
      setAttemptsUsed(0);
      setStatus('unanswered');
      setPointsAwarded(0);
      setHintRevealed(false);
    } else {
      setIsSessionCompleted(true);
      const finalResult: RiddleResult = {
        difficulty: safeDifficulty,
        totalRiddles: totalCount,
        solvedRiddles: solvedCount,
        skippedRiddles: totalCount - solvedCount,
        score,
        hintsUsed: hintsUsedCount,
        bestStreak,
        completedAt: Date.now(),
      };
      if (onComplete) {
        onComplete(finalResult);
      }
    }
  }, [
    isLastRiddle,
    safeDifficulty,
    totalCount,
    solvedCount,
    score,
    hintsUsedCount,
    bestStreak,
    onComplete,
  ]);

  return {
    riddles,
    currentRiddle,
    currentIndex,
    totalCount,
    isLastRiddle,
    inputText,
    setInputText,
    attemptsUsed,
    maxAttempts,
    status,
    pointsAwarded,
    hintRevealed,
    revealHint,
    submitAnswer,
    retryQuestion,
    nextRiddle,
    isQuestionResolved,
    isExhausted,
    score,
    solvedCount,
    currentStreak,
    bestStreak,
    isSessionCompleted,
    startedAt,
    baseCoinBalance: score,
  };
}
