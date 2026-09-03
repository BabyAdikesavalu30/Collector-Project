import { useState, useCallback, useRef } from 'react';
import { SCIENCE_WORD_GRID_LEVELS } from './science-word-grid.levels';
import { checkWordSelection, isScienceWordGridComplete, calculateWordGridScore } from './science-word-grid.engine';
import { saveLevelCompletion } from '../games.storage';
import { GameStatus } from '../games.types';

export function useScienceWordGridGame(initialLevel: number = 0) {
  const [levelIndex, setLevelIndex] = useState<number>(initialLevel);
  const level = SCIENCE_WORD_GRID_LEVELS[levelIndex] || SCIENCE_WORD_GRID_LEVELS[0];

  const [selectedCells, setSelectedCells] = useState<{ row: number; col: number }[]>([]);
  const [foundWordIds, setFoundWordIds] = useState<string[]>([]);
  const [mistakes, setMistakes] = useState<number>(0);
  const [moves, setMoves] = useState<number>(0);
  const [status, setStatus] = useState<GameStatus>('ready');
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [stars, setStars] = useState<1 | 2 | 3>(1);
  const elapsedRef = useRef<number>(0);

  const resetGame = useCallback(() => {
    setSelectedCells([]);
    setFoundWordIds([]);
    setMistakes(0);
    setMoves(0);
    setIsCompleted(false);
    setStatus('playing');
    setScore(0);
    elapsedRef.current = 0;
  }, []);

  const loadLevel = useCallback((idx: number) => {
    const validIdx = Math.max(0, Math.min(idx, SCIENCE_WORD_GRID_LEVELS.length - 1));
    setLevelIndex(validIdx);
    setSelectedCells([]);
    setFoundWordIds([]);
    setMistakes(0);
    setMoves(0);
    setIsCompleted(false);
    setStatus('playing');
    elapsedRef.current = 0;
  }, []);

  const nextLevel = useCallback(() => {
    if (levelIndex < SCIENCE_WORD_GRID_LEVELS.length - 1) {
      loadLevel(levelIndex + 1);
    }
  }, [levelIndex, loadLevel]);

  const handleCellPress = useCallback(
    (row: number, col: number) => {
      if (isCompleted) return;

      setStatus('playing');
      const alreadyIndex = selectedCells.findIndex((c) => c.row === row && c.col === col);

      let nextSelection: { row: number; col: number }[];
      if (alreadyIndex >= 0) {
        // Unselect from this index onward
        nextSelection = selectedCells.slice(0, alreadyIndex);
      } else {
        nextSelection = [...selectedCells, { row, col }];
      }

      setSelectedCells(nextSelection);

      // Check if matches any word
      const matchedWord = checkWordSelection(nextSelection, level);
      if (matchedWord && !foundWordIds.includes(matchedWord.id)) {
        setMoves((m) => m + 1);
        const nextFound = [...foundWordIds, matchedWord.id];
        setFoundWordIds(nextFound);
        setSelectedCells([]);

        if (isScienceWordGridComplete(nextFound, level)) {
          setIsCompleted(true);
          setStatus('completed');
          const outcome = calculateWordGridScore(moves + 1, mistakes, elapsedRef.current, level.words.length);
          setScore(outcome.score);
          setStars(outcome.stars);
          saveLevelCompletion('science-word-grid', levelIndex, level.id, {
            score: outcome.score,
            stars: outcome.stars,
            isPerfect: outcome.isPerfect,
            bestMoves: moves + 1,
            bestTimeSeconds: elapsedRef.current,
          });
        }
      }
    },
    [isCompleted, selectedCells, level, foundWordIds, moves, mistakes, levelIndex]
  );

  const handleClearSelection = useCallback(() => {
    setSelectedCells([]);
  }, []);

  const handleTimeUpdate = useCallback((seconds: number) => {
    elapsedRef.current = seconds;
  }, []);

  return {
    level,
    levelIndex,
    totalLevels: SCIENCE_WORD_GRID_LEVELS.length,
    selectedCells,
    foundWordIds,
    mistakes,
    moves,
    status,
    isCompleted,
    score,
    stars,
    handleCellPress,
    handleClearSelection,
    handleTimeUpdate,
    resetGame,
    nextLevel,
    loadLevel,
  };
}
