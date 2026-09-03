/**
 * useTangoGame Hook
 * State machine and game coordinator for Game 5: Tango.
 */

import { useState, useCallback, useRef } from 'react';
import { TangoSymbol, TangoLevel, TangoGameState } from './tango.types';
import { TANGO_LEVELS } from './tango.levels';
import { getTangoConflicts, isTangoComplete } from './tango.engine';
import { saveLevelCompletion } from '../games.storage';
import { GameStatus } from '../games.types';

export function useTangoGame(initialLevelIndex = 0) {
  const [levelIndex, setLevelIndex] = useState<number>(initialLevelIndex);
  const level: TangoLevel = TANGO_LEVELS[levelIndex] || TANGO_LEVELS[0];

  const [grid, setGrid] = useState<TangoSymbol[][]>(() =>
    level.initialGrid.map((row) => [...row])
  );
  const [status, setStatus] = useState<GameStatus>('ready');
  const [moves, setMoves] = useState<number>(0);
  const [mistakes, setMistakes] = useState<number>(0);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const elapsedRef = useRef<number>(0);

  const loadLevel = useCallback((idx: number) => {
    const clampedIdx = Math.max(0, Math.min(idx, TANGO_LEVELS.length - 1));
    const nextLvl = TANGO_LEVELS[clampedIdx];
    setLevelIndex(clampedIdx);
    setGrid(nextLvl.initialGrid.map((row) => [...row]));
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

  const cycleCell = useCallback(
    (row: number, col: number) => {
      if (isCompleted) return;
      if (status === 'ready') setStatus('playing');

      // Cannot modify initial given cells
      if (level.initialGrid[row][col] !== null) return;

      const current = grid[row][col];
      let next: TangoSymbol = null;
      if (current === null) next = 'sun';
      else if (current === 'sun') next = 'moon';
      else if (current === 'moon') next = null;

      const nextGrid = grid.map((r, rIdx) =>
        r.map((c, cIdx) => (rIdx === row && cIdx === col ? next : c))
      );

      setGrid(nextGrid);
      setMoves((m) => m + 1);

      const conflicts = getTangoConflicts(nextGrid, level.clues);
      const isCellConflicted = conflicts.some(
        (c) => c.row === row && c.col === col
      );
      if (isCellConflicted && next !== null) {
        setMistakes((m) => m + 1);
      }

      if (isTangoComplete(nextGrid, level)) {
        setIsCompleted(true);
        setStatus('completed');

        const score = Math.max(20, 150 - (elapsedRef.current * 2) - (mistakes * 5));
        saveLevelCompletion('tango', levelIndex, level.id, {
          completed: true,
          bestTimeSeconds: elapsedRef.current,
          bestMoves: moves + 1,
          score,
        });
      }
    },
    [isCompleted, status, level, grid, levelIndex, mistakes, moves]
  );

  const nextLevel = useCallback(() => {
    if (levelIndex < TANGO_LEVELS.length - 1) {
      loadLevel(levelIndex + 1);
    }
  }, [levelIndex, loadLevel]);

  const conflicts = getTangoConflicts(grid, level.clues);

  const state: TangoGameState = {
    levelIndex,
    level,
    grid,
    conflicts,
    isCompleted,
    moves,
    mistakes,
    elapsedSeconds: elapsedRef.current,
  };

  return {
    state,
    level,
    levelIndex,
    grid,
    conflicts,
    status,
    moves,
    mistakes,
    isCompleted,
    totalLevels: TANGO_LEVELS.length,
    cycleCell,
    handleTimeUpdate,
    resetGame,
    pauseGame,
    resumeGame,
    nextLevel,
    loadLevel,
  };
}
