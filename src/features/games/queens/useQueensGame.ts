/**
 * useQueensGame Hook
 * State machine and game coordinator for Game 6: Queens.
 */

import { useState, useCallback, useRef } from 'react';
import { QueenCellState, QueensLevel, QueensGameState } from './queens.types';
import { QUEENS_LEVELS } from './queens.levels';
import { getQueensConflicts, isQueensComplete } from './queens.engine';
import { saveLevelCompletion } from '../games.storage';
import { GameStatus } from '../games.types';

export function useQueensGame(initialLevelIndex = 0) {
  const [levelIndex, setLevelIndex] = useState<number>(initialLevelIndex);
  const level: QueensLevel = QUEENS_LEVELS[levelIndex] || QUEENS_LEVELS[0];

  const [grid, setGrid] = useState<QueenCellState[][]>(() =>
    Array.from({ length: level.size }, () =>
      Array(level.size).fill('empty' as QueenCellState)
    )
  );
  const [status, setStatus] = useState<GameStatus>('ready');
  const [moves, setMoves] = useState<number>(0);
  const [mistakes, setMistakes] = useState<number>(0);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const elapsedRef = useRef<number>(0);

  const loadLevel = useCallback((idx: number) => {
    const clampedIdx = Math.max(0, Math.min(idx, QUEENS_LEVELS.length - 1));
    const nextLvl = QUEENS_LEVELS[clampedIdx];
    setLevelIndex(clampedIdx);
    setGrid(
      Array.from({ length: nextLvl.size }, () =>
        Array(nextLvl.size).fill('empty' as QueenCellState)
      )
    );
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

      const current = grid[row][col];
      let next: QueenCellState = 'empty';
      if (current === 'empty') next = 'queen';
      else if (current === 'queen') next = 'cross';
      else if (current === 'cross') next = 'empty';

      const nextGrid = grid.map((r, rIdx) =>
        r.map((c, cIdx) => (rIdx === row && cIdx === col ? next : c))
      );

      setGrid(nextGrid);
      setMoves((m) => m + 1);

      const conflicts = getQueensConflicts(nextGrid, level);
      const isCellConflicted = conflicts.some(
        (c) => c.row === row && c.col === col
      );
      if (isCellConflicted && next === 'queen') {
        setMistakes((m) => m + 1);
      }

      if (isQueensComplete(nextGrid, level)) {
        setIsCompleted(true);
        setStatus('completed');

        const score = Math.max(20, 150 - (elapsedRef.current * 2) - (mistakes * 5));
        saveLevelCompletion('queens', levelIndex, level.id, {
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
    if (levelIndex < QUEENS_LEVELS.length - 1) {
      loadLevel(levelIndex + 1);
    }
  }, [levelIndex, loadLevel]);

  const conflicts = getQueensConflicts(grid, level);

  const state: QueensGameState = {
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
    totalLevels: QUEENS_LEVELS.length,
    cycleCell,
    handleTimeUpdate,
    resetGame,
    pauseGame,
    resumeGame,
    nextLevel,
    loadLevel,
  };
}
