import { useState, useCallback, useRef } from 'react';
import { REACTION_SORT_LEVELS } from './reaction-sort.levels';
import { isSortCorrect, isReactionSortComplete, calculateSortScore } from './reaction-sort.engine';
import { saveLevelCompletion } from '../games.storage';
import { GameStatus } from '../games.types';

export function useReactionSortGame(initialLevel: number = 0) {
  const [levelIndex, setLevelIndex] = useState<number>(initialLevel);
  const level = REACTION_SORT_LEVELS[levelIndex] || REACTION_SORT_LEVELS[0];

  const [currentItemIndex, setCurrentItemIndex] = useState<number>(0);
  const [sortedItems, setSortedItems] = useState<Record<string, string[]>>({});
  const [mistakes, setMistakes] = useState<number>(0);
  const [moves, setMoves] = useState<number>(0);
  const [status, setStatus] = useState<GameStatus>('ready');
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [lastFeedback, setLastFeedback] = useState<{ isCorrect: boolean; message?: string } | null>(null);
  const [score, setScore] = useState<number>(0);
  const [stars, setStars] = useState<1 | 2 | 3>(1);
  const elapsedRef = useRef<number>(0);

  const currentItem = level.items[currentItemIndex] || null;

  const resetGame = useCallback(() => {
    setCurrentItemIndex(0);
    setSortedItems({});
    setMistakes(0);
    setMoves(0);
    setIsCompleted(false);
    setStatus('playing');
    setLastFeedback(null);
    setScore(0);
    elapsedRef.current = 0;
  }, []);

  const loadLevel = useCallback((idx: number) => {
    const validIdx = Math.max(0, Math.min(idx, REACTION_SORT_LEVELS.length - 1));
    setLevelIndex(validIdx);
    setCurrentItemIndex(0);
    setSortedItems({});
    setMistakes(0);
    setMoves(0);
    setIsCompleted(false);
    setStatus('playing');
    setLastFeedback(null);
    elapsedRef.current = 0;
  }, []);

  const nextLevel = useCallback(() => {
    if (levelIndex < REACTION_SORT_LEVELS.length - 1) {
      loadLevel(levelIndex + 1);
    }
  }, [levelIndex, loadLevel]);

  const handleSortIntoCategory = useCallback(
    (categoryKey: string) => {
      if (isCompleted || !currentItem) return;

      setStatus('playing');
      setMoves((m) => m + 1);

      if (isSortCorrect(currentItem, categoryKey)) {
        setLastFeedback({ isCorrect: true });
        const nextSorted = {
          ...sortedItems,
          [categoryKey]: [...(sortedItems[categoryKey] || []), currentItem.id],
        };
        setSortedItems(nextSorted);

        const nextIndex = currentItemIndex + 1;
        setCurrentItemIndex(nextIndex);

        if (isReactionSortComplete(nextIndex, level)) {
          setIsCompleted(true);
          setStatus('completed');
          const outcome = calculateSortScore(mistakes, elapsedRef.current, level.items.length);
          setScore(outcome.score);
          setStars(outcome.stars);
          saveLevelCompletion('reaction-sort', levelIndex, level.id, {
            score: outcome.score,
            stars: outcome.stars,
            isPerfect: outcome.isPerfect,
            bestMoves: moves + 1,
            bestTimeSeconds: elapsedRef.current,
          });
        }
      } else {
        setMistakes((m) => m + 1);
        setLastFeedback({ isCorrect: false });
      }
    },
    [isCompleted, currentItem, sortedItems, currentItemIndex, level, mistakes, moves, levelIndex]
  );

  const handleTimeUpdate = useCallback((seconds: number) => {
    elapsedRef.current = seconds;
  }, []);

  return {
    level,
    levelIndex,
    totalLevels: REACTION_SORT_LEVELS.length,
    currentItem,
    currentItemIndex,
    sortedItems,
    lastFeedback,
    mistakes,
    moves,
    status,
    isCompleted,
    score,
    stars,
    handleSortIntoCategory,
    handleSortItem: handleSortIntoCategory,
    handleTimeUpdate,
    resetGame,
    nextLevel,
    loadLevel,
  };
}
