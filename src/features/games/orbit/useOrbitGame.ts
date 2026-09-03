import { useState, useCallback, useRef } from 'react';
import { ORBIT_LEVELS } from './orbit.levels';
import { isObstacle, isAdjacent, isOrbitComplete, calculateOrbitScore } from './orbit.engine';
import { saveLevelCompletion } from '../games.storage';
import { GameStatus } from '../games.types';

export function useOrbitGame(initialLevel: number = 0) {
  const [levelIndex, setLevelIndex] = useState<number>(initialLevel);
  const level = ORBIT_LEVELS[levelIndex] || ORBIT_LEVELS[0];

  const [path, setPath] = useState<{ row: number; col: number }[]>([level.start]);
  const [status, setStatus] = useState<GameStatus>('ready');
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [isCrashed, setIsCrashed] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [stars, setStars] = useState<1 | 2 | 3>(1);
  const elapsedRef = useRef<number>(0);

  const resetGame = useCallback(() => {
    setPath([level.start]);
    setIsCompleted(false);
    setIsCrashed(false);
    setStatus('playing');
    setScore(0);
    elapsedRef.current = 0;
  }, [level]);

  const loadLevel = useCallback((idx: number) => {
    const validIdx = Math.max(0, Math.min(idx, ORBIT_LEVELS.length - 1));
    const nextLvl = ORBIT_LEVELS[validIdx];
    setLevelIndex(validIdx);
    setPath([nextLvl.start]);
    setIsCompleted(false);
    setIsCrashed(false);
    setStatus('playing');
    elapsedRef.current = 0;
  }, []);

  const nextLevel = useCallback(() => {
    if (levelIndex < ORBIT_LEVELS.length - 1) {
      loadLevel(levelIndex + 1);
    }
  }, [levelIndex, loadLevel]);

  const handleCellPress = useCallback(
    (row: number, col: number) => {
      if (isCompleted || isCrashed) return;

      const current = path[path.length - 1];
      // Check undo if tapping previous cell
      if (path.length > 1 && path[path.length - 2].row === row && path[path.length - 2].col === col) {
        setPath((prev) => prev.slice(0, prev.length - 1));
        return;
      }

      if (!isAdjacent(current, { row, col })) {
        return; // Must be adjacent step
      }

      setStatus('playing');

      if (isObstacle(row, col, level)) {
        setIsCrashed(true);
        setStatus('paused');
        return;
      }

      const nextPath = [...path, { row, col }];
      setPath(nextPath);

      if (isOrbitComplete(nextPath, level)) {
        setIsCompleted(true);
        setStatus('completed');
        const outcome = calculateOrbitScore(nextPath.length, level.maxFuelMoves, elapsedRef.current);
        setScore(outcome.score);
        setStars(outcome.stars);
        saveLevelCompletion('orbit', levelIndex, level.id, {
          score: outcome.score,
          stars: outcome.stars,
          isPerfect: outcome.isPerfect,
          bestMoves: nextPath.length,
          bestTimeSeconds: elapsedRef.current,
        });
      }
    },
    [isCompleted, isCrashed, path, level, levelIndex]
  );

  const handleTimeUpdate = useCallback((seconds: number) => {
    elapsedRef.current = seconds;
  }, []);

  return {
    level,
    levelIndex,
    totalLevels: ORBIT_LEVELS.length,
    path,
    remainingFuel: Math.max(0, level.maxFuelMoves - path.length + 1),
    status,
    moves: path.length,
    isCompleted,
    isCrashed,
    score,
    stars,
    handleCellPress,
    handleTimeUpdate,
    resetGame,
    nextLevel,
    loadLevel,
  };
}
