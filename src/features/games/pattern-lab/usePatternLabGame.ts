import { useState, useCallback, useRef } from 'react';
import { PATTERN_LAB_LEVELS } from './pattern-lab.levels';
import { isPatternAnswerCorrect, calculatePatternScore } from './pattern-lab.engine';
import { saveLevelCompletion } from '../games.storage';
import { GameStatus } from '../games.types';

export function usePatternLabGame(initialLevel: number = 0) {
  const [levelIndex, setLevelIndex] = useState<number>(initialLevel);
  const level = PATTERN_LAB_LEVELS[levelIndex] || PATTERN_LAB_LEVELS[0];

  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [mistakes, setMistakes] = useState<number>(0);
  const [moves, setMoves] = useState<number>(0);
  const [status, setStatus] = useState<GameStatus>('ready');
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; message?: string } | null>(null);
  const [score, setScore] = useState<number>(0);
  const [stars, setStars] = useState<1 | 2 | 3>(1);
  const elapsedRef = useRef<number>(0);

  const resetGame = useCallback(() => {
    setSelectedOptionId(null);
    setMistakes(0);
    setMoves(0);
    setIsCompleted(false);
    setStatus('playing');
    setFeedback(null);
    setScore(0);
    elapsedRef.current = 0;
  }, []);

  const loadLevel = useCallback((idx: number) => {
    const validIdx = Math.max(0, Math.min(idx, PATTERN_LAB_LEVELS.length - 1));
    setLevelIndex(validIdx);
    setSelectedOptionId(null);
    setMistakes(0);
    setMoves(0);
    setIsCompleted(false);
    setStatus('playing');
    setFeedback(null);
    elapsedRef.current = 0;
  }, []);

  const nextLevel = useCallback(() => {
    if (levelIndex < PATTERN_LAB_LEVELS.length - 1) {
      loadLevel(levelIndex + 1);
    }
  }, [levelIndex, loadLevel]);

  const handleSelectOption = useCallback(
    (optionId: string) => {
      if (isCompleted) return;

      setStatus('playing');
      setMoves((m) => m + 1);
      setSelectedOptionId(optionId);

      if (isPatternAnswerCorrect(optionId, level)) {
        setFeedback({ isCorrect: true });
        setIsCompleted(true);
        setStatus('completed');
        const outcome = calculatePatternScore(mistakes, elapsedRef.current);
        setScore(outcome.score);
        setStars(outcome.stars);
        saveLevelCompletion('pattern-lab', levelIndex, level.id, {
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
    },
    [isCompleted, level, mistakes, moves, levelIndex]
  );

  const handleTimeUpdate = useCallback((seconds: number) => {
    elapsedRef.current = seconds;
  }, []);

  return {
    level,
    levelIndex,
    totalLevels: PATTERN_LAB_LEVELS.length,
    selectedOptionId,
    feedback,
    mistakes,
    moves,
    status,
    isCompleted,
    score,
    stars,
    handleSelectOption,
    handleTimeUpdate,
    resetGame,
    nextLevel,
    loadLevel,
  };
}
