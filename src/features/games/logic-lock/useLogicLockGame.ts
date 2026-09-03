import { useState, useCallback, useRef } from 'react';
import { LOGIC_LOCK_LEVELS } from './logic-lock.levels';
import { isLockSolved, calculateLockScore } from './logic-lock.engine';
import { saveLevelCompletion } from '../games.storage';
import { GameStatus } from '../games.types';

export function useLogicLockGame(initialLevel: number = 0) {
  const [levelIndex, setLevelIndex] = useState<number>(initialLevel);
  const level = LOGIC_LOCK_LEVELS[levelIndex] || LOGIC_LOCK_LEVELS[0];

  const [currentGuess, setCurrentGuess] = useState<string[]>(() =>
    Array(level.codeLength).fill('0')
  );
  const [selectedDigitIndex, setSelectedDigitIndex] = useState<number>(0);
  const [mistakes, setMistakes] = useState<number>(0);
  const [moves, setMoves] = useState<number>(0);
  const [status, setStatus] = useState<GameStatus>('ready');
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; message?: string } | null>(null);
  const [score, setScore] = useState<number>(0);
  const [stars, setStars] = useState<1 | 2 | 3>(1);
  const elapsedRef = useRef<number>(0);

  const resetGame = useCallback(() => {
    setCurrentGuess(Array(level.codeLength).fill('0'));
    setSelectedDigitIndex(0);
    setMistakes(0);
    setMoves(0);
    setIsCompleted(false);
    setStatus('playing');
    setFeedback(null);
    setScore(0);
    elapsedRef.current = 0;
  }, [level]);

  const loadLevel = useCallback((idx: number) => {
    const validIdx = Math.max(0, Math.min(idx, LOGIC_LOCK_LEVELS.length - 1));
    const nextLvl = LOGIC_LOCK_LEVELS[validIdx];
    setLevelIndex(validIdx);
    setCurrentGuess(Array(nextLvl.codeLength).fill('0'));
    setSelectedDigitIndex(0);
    setMistakes(0);
    setMoves(0);
    setIsCompleted(false);
    setStatus('playing');
    setFeedback(null);
    elapsedRef.current = 0;
  }, []);

  const nextLevel = useCallback(() => {
    if (levelIndex < LOGIC_LOCK_LEVELS.length - 1) {
      loadLevel(levelIndex + 1);
    }
  }, [levelIndex, loadLevel]);

  const handleDigitChange = useCallback((dialIndex: number, delta: number) => {
    if (isCompleted) return;
    setStatus('playing');
    setMoves((m) => m + 1);

    setCurrentGuess((prev) => {
      const next = [...prev];
      const currentVal = parseInt(next[dialIndex] || '0', 10);
      let nextVal = currentVal + delta;
      if (nextVal > 9) nextVal = 0;
      if (nextVal < 0) nextVal = 9;
      next[dialIndex] = String(nextVal);
      return next;
    });
  }, [isCompleted]);

  const handleCheckCode = useCallback(() => {
    if (isCompleted) return;

    setStatus('playing');
    if (isLockSolved(currentGuess, level)) {
      setFeedback({ isCorrect: true });
      setIsCompleted(true);
      setStatus('completed');
      const outcome = calculateLockScore(mistakes, elapsedRef.current);
      setScore(outcome.score);
      setStars(outcome.stars);
      saveLevelCompletion('logic-lock', levelIndex, level.id, {
        score: outcome.score,
        stars: outcome.stars,
        isPerfect: outcome.isPerfect,
        bestMoves: moves + 1,
        bestTimeSeconds: elapsedRef.current,
      });
    } else {
      setMistakes((m) => m + 1);
      setFeedback({ isCorrect: false });
    }
  }, [isCompleted, currentGuess, level, mistakes, moves, levelIndex]);

  const handleTimeUpdate = useCallback((seconds: number) => {
    elapsedRef.current = seconds;
  }, []);

  return {
    level,
    levelIndex,
    totalLevels: LOGIC_LOCK_LEVELS.length,
    currentGuess,
    selectedDigitIndex,
    setSelectedDigitIndex,
    feedback,
    mistakes,
    moves,
    status,
    isCompleted,
    score,
    stars,
    handleDigitChange,
    handleCheckCode,
    handleTimeUpdate,
    resetGame,
    nextLevel,
    loadLevel,
  };
}
