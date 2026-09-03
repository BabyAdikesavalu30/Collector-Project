import { useState, useCallback, useRef } from 'react';
import { TIME_MACHINE_LEVELS } from './time-machine.levels';
import { isTimelineCorrect, calculateTimeMachineScore } from './time-machine.engine';
import { saveLevelCompletion } from '../games.storage';
import { GameStatus } from '../games.types';

export function useTimeMachineGame(initialLevel: number = 0) {
  const [levelIndex, setLevelIndex] = useState<number>(initialLevel);
  const level = TIME_MACHINE_LEVELS[levelIndex] || TIME_MACHINE_LEVELS[0];

  // Initialize with shuffled order
  const [currentOrder, setCurrentOrder] = useState<string[]>(() => {
    const ids = level.events.map((e) => e.id);
    return [...ids].reverse(); // Simple initial shuffle
  });

  const [mistakes, setMistakes] = useState<number>(0);
  const [moves, setMoves] = useState<number>(0);
  const [status, setStatus] = useState<GameStatus>('ready');
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; message?: string } | null>(null);
  const [score, setScore] = useState<number>(0);
  const [stars, setStars] = useState<1 | 2 | 3>(1);
  const elapsedRef = useRef<number>(0);

  const resetGame = useCallback(() => {
    setCurrentOrder([...level.events.map((e) => e.id)].reverse());
    setMistakes(0);
    setMoves(0);
    setIsCompleted(false);
    setStatus('playing');
    setFeedback(null);
    setScore(0);
    elapsedRef.current = 0;
  }, [level]);

  const loadLevel = useCallback((idx: number) => {
    const validIdx = Math.max(0, Math.min(idx, TIME_MACHINE_LEVELS.length - 1));
    const nextLvl = TIME_MACHINE_LEVELS[validIdx];
    setLevelIndex(validIdx);
    setCurrentOrder([...nextLvl.events.map((e) => e.id)].reverse());
    setMistakes(0);
    setMoves(0);
    setIsCompleted(false);
    setStatus('playing');
    setFeedback(null);
    elapsedRef.current = 0;
  }, []);

  const nextLevel = useCallback(() => {
    if (levelIndex < TIME_MACHINE_LEVELS.length - 1) {
      loadLevel(levelIndex + 1);
    }
  }, [levelIndex, loadLevel]);

  const handleMoveUp = useCallback(
    (index: number) => {
      if (isCompleted || index <= 0) return;
      setStatus('playing');
      setMoves((m) => m + 1);

      setCurrentOrder((prev) => {
        const next = [...prev];
        const temp = next[index - 1];
        next[index - 1] = next[index];
        next[index] = temp;
        return next;
      });
    },
    [isCompleted]
  );

  const handleMoveDown = useCallback(
    (index: number) => {
      if (isCompleted || index >= currentOrder.length - 1) return;
      setStatus('playing');
      setMoves((m) => m + 1);

      setCurrentOrder((prev) => {
        const next = [...prev];
        const temp = next[index + 1];
        next[index + 1] = next[index];
        next[index] = temp;
        return next;
      });
    },
    [isCompleted, currentOrder.length]
  );

  const handleVerifyTimeline = useCallback(() => {
    if (isCompleted) return;

    setStatus('playing');
    if (isTimelineCorrect(currentOrder, level)) {
      setFeedback({ isCorrect: true });
      setIsCompleted(true);
      setStatus('completed');
      const outcome = calculateTimeMachineScore(mistakes, elapsedRef.current);
      setScore(outcome.score);
      setStars(outcome.stars);
      saveLevelCompletion('time-machine', levelIndex, level.id, {
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
  }, [isCompleted, currentOrder, level, mistakes, moves, levelIndex]);

  const handleTimeUpdate = useCallback((seconds: number) => {
    elapsedRef.current = seconds;
  }, []);

  return {
    level,
    levelIndex,
    totalLevels: TIME_MACHINE_LEVELS.length,
    currentOrder,
    feedback,
    mistakes,
    moves,
    status,
    isCompleted,
    score,
    stars,
    handleMoveUp,
    handleMoveDown,
    handleVerifyTimeline,
    handleTimeUpdate,
    resetGame,
    nextLevel,
    loadLevel,
  };
}
