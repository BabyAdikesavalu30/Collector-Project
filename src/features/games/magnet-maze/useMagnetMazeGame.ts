import { useState, useCallback, useRef } from 'react';
import { MAGNET_MAZE_LEVELS } from './magnet-maze.levels';
import { MagnetPole } from './magnet-maze.types';
import { isWall, isMagnetAdjacent, isMagnetMazeComplete, calculateMagnetScore } from './magnet-maze.engine';
import { saveLevelCompletion } from '../games.storage';
import { GameStatus } from '../games.types';

export function useMagnetMazeGame(initialLevel: number = 0) {
  const [levelIndex, setLevelIndex] = useState<number>(initialLevel);
  const level = MAGNET_MAZE_LEVELS[levelIndex] || MAGNET_MAZE_LEVELS[0];

  const [currentPos, setCurrentPos] = useState<{ row: number; col: number }>({
    row: level.start.row,
    col: level.start.col,
  });
  const [currentPole, setCurrentPole] = useState<MagnetPole>(level.start.initialPole);
  const [path, setPath] = useState<{ row: number; col: number }[]>([
    { row: level.start.row, col: level.start.col },
  ]);
  const [moves, setMoves] = useState<number>(0);
  const [status, setStatus] = useState<GameStatus>('ready');
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [stars, setStars] = useState<1 | 2 | 3>(1);
  const elapsedRef = useRef<number>(0);

  const resetGame = useCallback(() => {
    setCurrentPos({ row: level.start.row, col: level.start.col });
    setCurrentPole(level.start.initialPole);
    setPath([{ row: level.start.row, col: level.start.col }]);
    setMoves(0);
    setIsCompleted(false);
    setStatus('playing');
    setScore(0);
    elapsedRef.current = 0;
  }, [level]);

  const loadLevel = useCallback((idx: number) => {
    const validIdx = Math.max(0, Math.min(idx, MAGNET_MAZE_LEVELS.length - 1));
    const nextLvl = MAGNET_MAZE_LEVELS[validIdx];
    setLevelIndex(validIdx);
    setCurrentPos({ row: nextLvl.start.row, col: nextLvl.start.col });
    setCurrentPole(nextLvl.start.initialPole);
    setPath([{ row: nextLvl.start.row, col: nextLvl.start.col }]);
    setMoves(0);
    setIsCompleted(false);
    setStatus('playing');
    elapsedRef.current = 0;
  }, []);

  const nextLevel = useCallback(() => {
    if (levelIndex < MAGNET_MAZE_LEVELS.length - 1) {
      loadLevel(levelIndex + 1);
    }
  }, [levelIndex, loadLevel]);

  const handleTogglePole = useCallback(() => {
    if (isCompleted) return;
    setStatus('playing');
    setMoves((m) => m + 1);
    setCurrentPole((p) => (p === 'N' ? 'S' : 'N'));
  }, [isCompleted]);

  const handleCellPress = useCallback(
    (row: number, col: number) => {
      if (isCompleted) return;

      if (path.length > 1 && path[path.length - 2].row === row && path[path.length - 2].col === col) {
        // Undo step
        setPath((prev) => prev.slice(0, prev.length - 1));
        setCurrentPos({ row, col });
        return;
      }

      if (!isMagnetAdjacent(currentPos, { row, col })) return;
      if (isWall(row, col, level)) return;

      setStatus('playing');
      const nextMoves = moves + 1;
      setMoves(nextMoves);
      const nextPos = { row, col };
      setCurrentPos(nextPos);
      const nextPath = [...path, nextPos];
      setPath(nextPath);

      if (isMagnetMazeComplete(nextPos, currentPole, level)) {
        setIsCompleted(true);
        setStatus('completed');
        const outcome = calculateMagnetScore(nextMoves, level.maxSteps, elapsedRef.current);
        setScore(outcome.score);
        setStars(outcome.stars);
        saveLevelCompletion('magnet-maze', levelIndex, level.id, {
          score: outcome.score,
          stars: outcome.stars,
          isPerfect: outcome.isPerfect,
          bestMoves: nextMoves,
          bestTimeSeconds: elapsedRef.current,
        });
      }
    },
    [isCompleted, path, currentPos, currentPole, level, moves, levelIndex]
  );

  const handleTimeUpdate = useCallback((seconds: number) => {
    elapsedRef.current = seconds;
  }, []);

  return {
    level,
    levelIndex,
    totalLevels: MAGNET_MAZE_LEVELS.length,
    currentPos,
    currentPole,
    path,
    remainingSteps: Math.max(0, level.maxSteps - moves),
    moves,
    status,
    isCompleted,
    score,
    stars,
    handleTogglePole,
    handleCellPress,
    handleTimeUpdate,
    resetGame,
    nextLevel,
    loadLevel,
  };
}
