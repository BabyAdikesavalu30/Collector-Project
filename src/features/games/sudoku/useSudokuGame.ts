/**
 * useSudokuGame Hook
 * State machine and game coordinator for Game 4: Mini Sudoku.
 */

import { useState, useCallback, useRef } from 'react';
import { SudokuGrid, SudokuCellVal, SudokuLevel, SudokuGameState } from './sudoku.types';
import { SUDOKU_LEVELS } from './sudoku.levels';
import { getSudokuConflicts, isSudokuComplete } from './sudoku.engine';
import { saveLevelCompletion } from '../games.storage';
import { GameStatus } from '../games.types';

export function useSudokuGame(initialLevelIndex = 0) {
  const [levelIndex, setLevelIndex] = useState<number>(initialLevelIndex);
  const level: SudokuLevel = SUDOKU_LEVELS[levelIndex] || SUDOKU_LEVELS[0];

  const [grid, setGrid] = useState<SudokuGrid>(() =>
    level.initialGrid.map((row) => [...row])
  );
  const [selectedCell, setSelectedCell] = useState<{ row: number; col: number } | null>(null);
  const [status, setStatus] = useState<GameStatus>('ready');
  const [moves, setMoves] = useState<number>(0);
  const [mistakes, setMistakes] = useState<number>(0);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const elapsedRef = useRef<number>(0);

  const loadLevel = useCallback((idx: number) => {
    const clampedIdx = Math.max(0, Math.min(idx, SUDOKU_LEVELS.length - 1));
    const nextLvl = SUDOKU_LEVELS[clampedIdx];
    setLevelIndex(clampedIdx);
    setGrid(nextLvl.initialGrid.map((row) => [...row]));
    setSelectedCell(null);
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

  const selectCell = useCallback(
    (row: number, col: number) => {
      if (isCompleted) return;
      if (status === 'ready') setStatus('playing');
      setSelectedCell({ row, col });
    },
    [isCompleted, status]
  );

  const setCellValue = useCallback(
    (val: SudokuCellVal) => {
      if (!selectedCell || isCompleted) return;
      const { row, col } = selectedCell;

      // Cannot modify initial given numbers
      if (level.initialGrid[row][col] !== null) return;

      const nextGrid = grid.map((r, rIdx) =>
        r.map((c, cIdx) => (rIdx === row && cIdx === col ? val : c))
      );

      setGrid(nextGrid);
      setMoves((m) => m + 1);

      const conflicts = getSudokuConflicts(nextGrid);
      const isCellConflicted = conflicts.some(
        (c) => c.row === row && c.col === col
      );
      if (isCellConflicted && val !== null) {
        setMistakes((m) => m + 1);
      }

      if (isSudokuComplete(nextGrid, level)) {
        setIsCompleted(true);
        setStatus('completed');

        const score = Math.max(20, 150 - (elapsedRef.current * 2) - (mistakes * 5));
        saveLevelCompletion('mini-sudoku', levelIndex, level.id, {
          completed: true,
          bestTimeSeconds: elapsedRef.current,
          bestMoves: moves + 1,
          score,
        });
      }
    },
    [selectedCell, isCompleted, level, grid, levelIndex, mistakes, moves]
  );

  const nextLevel = useCallback(() => {
    if (levelIndex < SUDOKU_LEVELS.length - 1) {
      loadLevel(levelIndex + 1);
    }
  }, [levelIndex, loadLevel]);

  const conflicts = getSudokuConflicts(grid);

  const state: SudokuGameState = {
    levelIndex,
    level,
    grid,
    selectedCell,
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
    selectedCell,
    conflicts,
    status,
    moves,
    mistakes,
    isCompleted,
    totalLevels: SUDOKU_LEVELS.length,
    selectCell,
    setCellValue,
    handleTimeUpdate,
    resetGame,
    pauseGame,
    resumeGame,
    nextLevel,
    loadLevel,
  };
}
