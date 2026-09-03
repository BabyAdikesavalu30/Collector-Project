import { useState, useCallback, useRef } from 'react';
import { MEMORY_MATRIX_LEVELS } from './memory-matrix.levels';
import { isCardPairMatch, isMemoryMatrixComplete, calculateMemoryScore } from './memory-matrix.engine';
import { saveLevelCompletion } from '../games.storage';
import { GameStatus } from '../games.types';

export function useMemoryMatrixGame(initialLevel: number = 0) {
  const [levelIndex, setLevelIndex] = useState<number>(initialLevel);
  const level = MEMORY_MATRIX_LEVELS[levelIndex] || MEMORY_MATRIX_LEVELS[0];

  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [matchedPairIds, setMatchedPairIds] = useState<string[]>([]);
  const [mistakes, setMistakes] = useState<number>(0);
  const [moves, setMoves] = useState<number>(0);
  const [status, setStatus] = useState<GameStatus>('ready');
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [stars, setStars] = useState<1 | 2 | 3>(1);
  const isBusyRef = useRef<boolean>(false);
  const elapsedRef = useRef<number>(0);

  const resetGame = useCallback(() => {
    setFlippedIndices([]);
    setMatchedPairIds([]);
    setMistakes(0);
    setMoves(0);
    setIsCompleted(false);
    setStatus('playing');
    setScore(0);
    isBusyRef.current = false;
    elapsedRef.current = 0;
  }, []);

  const loadLevel = useCallback((idx: number) => {
    const validIdx = Math.max(0, Math.min(idx, MEMORY_MATRIX_LEVELS.length - 1));
    setLevelIndex(validIdx);
    setFlippedIndices([]);
    setMatchedPairIds([]);
    setMistakes(0);
    setMoves(0);
    setIsCompleted(false);
    setStatus('playing');
    isBusyRef.current = false;
    elapsedRef.current = 0;
  }, []);

  const nextLevel = useCallback(() => {
    if (levelIndex < MEMORY_MATRIX_LEVELS.length - 1) {
      loadLevel(levelIndex + 1);
    }
  }, [levelIndex, loadLevel]);

  const handleCardPress = useCallback(
    (index: number) => {
      if (
        isBusyRef.current ||
        isCompleted ||
        flippedIndices.includes(index) ||
        matchedPairIds.includes(level.cards[index].pairId)
      ) {
        return;
      }

      setStatus('playing');
      const nextFlipped = [...flippedIndices, index];
      setFlippedIndices(nextFlipped);

      if (nextFlipped.length === 2) {
        setMoves((m) => m + 1);
        const cardA = level.cards[nextFlipped[0]];
        const cardB = level.cards[nextFlipped[1]];

        if (isCardPairMatch(cardA, cardB)) {
          const nextMatched = [...matchedPairIds, cardA.pairId];
          setMatchedPairIds(nextMatched);
          setFlippedIndices([]);

          if (isMemoryMatrixComplete(nextMatched, level)) {
            setIsCompleted(true);
            setStatus('completed');
            const totalPairs = level.cards.length / 2;
            const outcome = calculateMemoryScore(moves + 1, mistakes, elapsedRef.current, totalPairs);
            setScore(outcome.score);
            setStars(outcome.stars);
            saveLevelCompletion('memory-matrix', levelIndex, level.id, {
              score: outcome.score,
              stars: outcome.stars,
              isPerfect: outcome.isPerfect,
              bestMoves: moves + 1,
              bestTimeSeconds: elapsedRef.current,
            });
          }
        } else {
          setMistakes((m) => m + 1);
          isBusyRef.current = true;
          setTimeout(() => {
            setFlippedIndices([]);
            isBusyRef.current = false;
          }, 850);
        }
      }
    },
    [isCompleted, flippedIndices, matchedPairIds, level, moves, mistakes, levelIndex]
  );

  const handleTimeUpdate = useCallback((seconds: number) => {
    elapsedRef.current = seconds;
  }, []);

  return {
    level,
    levelIndex,
    totalLevels: MEMORY_MATRIX_LEVELS.length,
    flippedIndices,
    matchedPairIds,
    mistakes,
    moves,
    status,
    isCompleted,
    score,
    stars,
    handleCardPress,
    handleTimeUpdate,
    resetGame,
    nextLevel,
    loadLevel,
  };
}
