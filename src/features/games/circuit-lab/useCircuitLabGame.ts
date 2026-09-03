import { useState, useCallback, useRef } from 'react';
import { CIRCUIT_LAB_LEVELS } from './circuit-lab.levels';
import { CircuitComponentType } from './circuit-lab.types';
import { isCircuitComplete, calculateCircuitScore } from './circuit-lab.engine';
import { saveLevelCompletion } from '../games.storage';
import { GameStatus } from '../games.types';

export function useCircuitLabGame(initialLevel: number = 0) {
  const [levelIndex, setLevelIndex] = useState<number>(initialLevel);
  const level = CIRCUIT_LAB_LEVELS[levelIndex] || CIRCUIT_LAB_LEVELS[0];

  const [grid, setGrid] = useState<CircuitComponentType[][]>(() =>
    level.initialGrid.map((row) => [...row])
  );
  const [selectedTool, setSelectedTool] = useState<CircuitComponentType>('wire-horizontal');
  const [moves, setMoves] = useState<number>(0);
  const [status, setStatus] = useState<GameStatus>('ready');
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [stars, setStars] = useState<1 | 2 | 3>(1);
  const elapsedRef = useRef<number>(0);

  const resetGame = useCallback(() => {
    setGrid(level.initialGrid.map((row) => [...row]));
    setMoves(0);
    setIsCompleted(false);
    setStatus('playing');
    setScore(0);
    elapsedRef.current = 0;
  }, [level]);

  const loadLevel = useCallback((idx: number) => {
    const validIdx = Math.max(0, Math.min(idx, CIRCUIT_LAB_LEVELS.length - 1));
    const nextLvl = CIRCUIT_LAB_LEVELS[validIdx];
    setLevelIndex(validIdx);
    setGrid(nextLvl.initialGrid.map((row) => [...row]));
    setMoves(0);
    setIsCompleted(false);
    setStatus('playing');
    elapsedRef.current = 0;
  }, []);

  const nextLevel = useCallback(() => {
    if (levelIndex < CIRCUIT_LAB_LEVELS.length - 1) {
      loadLevel(levelIndex + 1);
    }
  }, [levelIndex, loadLevel]);

  const isCellFixed = useCallback(
    (row: number, col: number): boolean => {
      return level.fixedCells.some((c) => c.row === row && c.col === col);
    },
    [level]
  );

  const handleCellPress = useCallback(
    (row: number, col: number) => {
      if (isCompleted || isCellFixed(row, col)) return;
      setStatus('playing');
      setMoves((m) => m + 1);

      const nextGrid = grid.map((r, rIdx) =>
        r.map((cell, cIdx) => {
          if (rIdx === row && cIdx === col) {
            // Cycle tool or toggle
            return cell === selectedTool ? 'empty' : selectedTool;
          }
          return cell;
        })
      );
      setGrid(nextGrid);

      if (isCircuitComplete(nextGrid, level)) {
        setIsCompleted(true);
        setStatus('completed');
        const outcome = calculateCircuitScore(moves + 1, elapsedRef.current);
        setScore(outcome.score);
        setStars(outcome.stars);
        saveLevelCompletion('circuit-lab', levelIndex, level.id, {
          score: outcome.score,
          stars: outcome.stars,
          isPerfect: outcome.isPerfect,
          bestMoves: moves + 1,
          bestTimeSeconds: elapsedRef.current,
        });
      }
    },
    [isCompleted, isCellFixed, grid, selectedTool, level, moves, levelIndex]
  );

  const handleTimeUpdate = useCallback((seconds: number) => {
    elapsedRef.current = seconds;
  }, []);

  return {
    level,
    levelIndex,
    totalLevels: CIRCUIT_LAB_LEVELS.length,
    grid,
    selectedTool,
    setSelectedTool,
    isCellFixed,
    moves,
    status,
    isCompleted,
    isCircuitClosed: isCompleted,
    handleSelectTool: setSelectedTool,
    score,
    stars,
    handleCellPress,
    handleTimeUpdate,
    resetGame,
    nextLevel,
    loadLevel,
  };
}
