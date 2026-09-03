/**
 * useZipGame Hook
 * State machine and game coordinator for Game 1: Zip.
 */

import { useState, useCallback, useRef } from 'react';
import { ZipCell, ZipLevel, ZipGameState } from './zip.types';
import { ZIP_LEVELS } from './zip.levels';
import { validateZipStep, isZipComplete } from './zip.engine';
import { saveLevelCompletion } from '../games.storage';
import { GameStatus } from '../games.types';

export function useZipGame(initialLevelIndex = 0) {
  const [levelIndex, setLevelIndex] = useState<number>(initialLevelIndex);
  const level: ZipLevel = ZIP_LEVELS[levelIndex] || ZIP_LEVELS[0];

  const [path, setPath] = useState<ZipCell[]>(() => {
    const firstCp = level.checkpoints.find((c) => c.number === 1);
    return firstCp ? [{ row: firstCp.row, col: firstCp.col }] : [{ row: 0, col: 0 }];
  });

  const [status, setStatus] = useState<GameStatus>('ready');
  const [moves, setMoves] = useState<number>(0);
  const [mistakes, setMistakes] = useState<number>(0);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const elapsedRef = useRef<number>(0);

  const loadLevel = useCallback((idx: number) => {
    const clampedIdx = Math.max(0, Math.min(idx, ZIP_LEVELS.length - 1));
    const nextLvl = ZIP_LEVELS[clampedIdx];
    const firstCp = nextLvl.checkpoints.find((c) => c.number === 1);

    setLevelIndex(clampedIdx);
    setPath(firstCp ? [{ row: firstCp.row, col: firstCp.col }] : [{ row: 0, col: 0 }]);
    setMoves(0);
    setMistakes(0);
    setIsCompleted(false);
    setStatus('ready');
    elapsedRef.current = 0;
  }, []);

  const resetGame = useCallback(() => {
    loadLevel(levelIndex);
  }, [levelIndex, loadLevel]);

  const pauseGame = useCallback(() => {
    if (status === 'playing') setStatus('paused');
  }, [status]);

  const resumeGame = useCallback(() => {
    if (status === 'paused') setStatus('playing');
  }, [status]);

  const handleTimeUpdate = useCallback((secs: number) => {
    elapsedRef.current = secs;
  }, []);

  const handleCellPress = useCallback(
    (row: number, col: number) => {
      if (isCompleted) return;

      if (status === 'ready') {
        setStatus('playing');
      }

      // Check undo (tapping on the second to last cell)
      if (path.length > 1) {
        const prevCell = path[path.length - 2];
        if (prevCell.row === row && prevCell.col === col) {
          setPath((p) => p.slice(0, p.length - 1));
          setMoves((m) => m + 1);
          return;
        }
      }

      const step = validateZipStep(path, { row, col }, level);
      if (step.valid) {
        const nextPath = [...path, { row, col }];
        setPath(nextPath);
        setMoves((m) => m + 1);

        if (isZipComplete(nextPath, level)) {
          setIsCompleted(true);
          setStatus('completed');

          const score = Math.max(20, 150 - (elapsedRef.current * 2) - (mistakes * 5));
          saveLevelCompletion('zip', levelIndex, level.id, {
            completed: true,
            bestTimeSeconds: elapsedRef.current,
            bestMoves: moves + 1,
            score,
          });
        }
      } else {
        setMistakes((m) => m + 1);
      }
    },
    [isCompleted, status, path, level, levelIndex, mistakes, moves]
  );

  const nextLevel = useCallback(() => {
    if (levelIndex < ZIP_LEVELS.length - 1) {
      loadLevel(levelIndex + 1);
    }
  }, [levelIndex, loadLevel]);

  const state: ZipGameState = {
    levelIndex,
    level,
    path,
    isCompleted,
    moves,
    mistakes,
    elapsedSeconds: elapsedRef.current,
  };

  return {
    state,
    level,
    levelIndex,
    path,
    status,
    moves,
    mistakes,
    isCompleted,
    totalLevels: ZIP_LEVELS.length,
    handleCellPress,
    handleTimeUpdate,
    resetGame,
    pauseGame,
    resumeGame,
    nextLevel,
    loadLevel,
  };
}
