import { useState, useCallback, useRef } from 'react';
import { LAB_ESCAPE_LEVELS } from './lab-escape.levels';
import { isStageAnswerCorrect, isLabEscapeComplete, calculateEscapeScore } from './lab-escape.engine';
import { saveLevelCompletion } from '../games.storage';
import { GameStatus } from '../games.types';

export function useLabEscapeGame(initialLevel: number = 0) {
  const [levelIndex, setLevelIndex] = useState<number>(initialLevel);
  const level = LAB_ESCAPE_LEVELS[levelIndex] || LAB_ESCAPE_LEVELS[0];

  const [currentStageIndex, setCurrentStageIndex] = useState<number>(0);
  const [selectedOptionIds, setSelectedOptionIds] = useState<string[]>([]);
  const [mistakes, setMistakes] = useState<number>(0);
  const [moves, setMoves] = useState<number>(0);
  const [status, setStatus] = useState<GameStatus>('ready');
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; message?: string } | null>(null);
  const [score, setScore] = useState<number>(0);
  const [stars, setStars] = useState<1 | 2 | 3>(1);
  const elapsedRef = useRef<number>(0);

  const currentStage = level.stages[currentStageIndex] || null;

  const resetGame = useCallback(() => {
    setCurrentStageIndex(0);
    setSelectedOptionIds([]);
    setMistakes(0);
    setMoves(0);
    setIsCompleted(false);
    setStatus('playing');
    setFeedback(null);
    setScore(0);
    elapsedRef.current = 0;
  }, []);

  const loadLevel = useCallback((idx: number) => {
    const validIdx = Math.max(0, Math.min(idx, LAB_ESCAPE_LEVELS.length - 1));
    setLevelIndex(validIdx);
    setCurrentStageIndex(0);
    setSelectedOptionIds([]);
    setMistakes(0);
    setMoves(0);
    setIsCompleted(false);
    setStatus('playing');
    setFeedback(null);
    elapsedRef.current = 0;
  }, []);

  const nextLevel = useCallback(() => {
    if (levelIndex < LAB_ESCAPE_LEVELS.length - 1) {
      loadLevel(levelIndex + 1);
    }
  }, [levelIndex, loadLevel]);

  const handleSelectOption = useCallback(
    (optionId: string) => {
      if (isCompleted || !currentStage) return;

      setStatus('playing');
      setMoves((m) => m + 1);

      if (isStageAnswerCorrect(currentStageIndex, optionId, level)) {
        setFeedback({ isCorrect: true });
        const nextSelected = [...selectedOptionIds, optionId];
        setSelectedOptionIds(nextSelected);

        const nextStageIdx = currentStageIndex + 1;
        setCurrentStageIndex(nextStageIdx);

        if (isLabEscapeComplete(nextStageIdx, level)) {
          setIsCompleted(true);
          setStatus('completed');
          const outcome = calculateEscapeScore(mistakes, elapsedRef.current, level.stages.length);
          setScore(outcome.score);
          setStars(outcome.stars);
          saveLevelCompletion('lab-escape', levelIndex, level.id, {
            score: outcome.score,
            stars: outcome.stars,
            isPerfect: outcome.isPerfect,
            bestMoves: moves + 1,
            bestTimeSeconds: elapsedRef.current,
          });
        }
      } else {
        setMistakes((m) => m + 1);
        setFeedback({ isCorrect: false });
      }
    },
    [isCompleted, currentStage, currentStageIndex, selectedOptionIds, level, mistakes, moves, levelIndex]
  );

  const handleTimeUpdate = useCallback((seconds: number) => {
    elapsedRef.current = seconds;
  }, []);

  return {
    level,
    levelIndex,
    totalLevels: LAB_ESCAPE_LEVELS.length,
    currentStage,
    currentStageIndex,
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
