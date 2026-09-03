import { useState, useCallback, useRef } from 'react';
import { GRAVITY_PATH_LEVELS } from './gravity-path.levels';
import { GravityDirection } from './gravity-path.types';
import { slideParticle, calculateGravityScore } from './gravity-path.engine';
import { saveLevelCompletion } from '../games.storage';
import { GameStatus } from '../games.types';

export function useGravityPathGame(initialLevel: number = 0) {
  const [levelIndex, setLevelIndex] = useState<number>(initialLevel);
  const level = GRAVITY_PATH_LEVELS[levelIndex] || GRAVITY_PATH_LEVELS[0];

  const [currentPos, setCurrentPos] = useState<{ row: number; col: number }>(level.start);
  const [pathHistory, setPathHistory] = useState<{ row: number; col: number }[]>([level.start]);
  const [moves, setMoves] = useState<number>(0);
  const [status, setStatus] = useState<GameStatus>('ready');
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [isFailed, setIsFailed] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [stars, setStars] = useState<1 | 2 | 3>(1);
  const elapsedRef = useRef<number>(0);

  const resetGame = useCallback(() => {
    setCurrentPos(level.start);
    setPathHistory([level.start]);
    setMoves(0);
    setIsCompleted(false);
    setIsFailed(false);
    setStatus('playing');
    setScore(0);
    elapsedRef.current = 0;
  }, [level]);

  const loadLevel = useCallback((idx: number) => {
    const validIdx = Math.max(0, Math.min(idx, GRAVITY_PATH_LEVELS.length - 1));
    const nextLvl = GRAVITY_PATH_LEVELS[validIdx];
    setLevelIndex(validIdx);
    setCurrentPos(nextLvl.start);
    setPathHistory([nextLvl.start]);
    setMoves(0);
    setIsCompleted(false);
    setIsFailed(false);
    setStatus('playing');
    elapsedRef.current = 0;
  }, []);

  const nextLevel = useCallback(() => {
    if (levelIndex < GRAVITY_PATH_LEVELS.length - 1) {
      loadLevel(levelIndex + 1);
    }
  }, [levelIndex, loadLevel]);

  const handleApplyGravity = useCallback(
    (dir: GravityDirection) => {
      if (isCompleted || isFailed) return;

      setStatus('playing');
      const result = slideParticle(currentPos, dir, level);
      const nextMoves = moves + 1;
      setMoves(nextMoves);
      setCurrentPos(result.finalPos);
      setPathHistory((prev) => [...prev, result.finalPos]);

      if (result.hitHazard) {
        setIsFailed(true);
        setStatus('paused');
        return;
      }

      if (result.hitTarget) {
        setIsCompleted(true);
        setStatus('completed');
        const outcome = calculateGravityScore(nextMoves, level.maxMoves, elapsedRef.current);
        setScore(outcome.score);
        setStars(outcome.stars);
        saveLevelCompletion('gravity-path', levelIndex, level.id, {
          score: outcome.score,
          stars: outcome.stars,
          isPerfect: outcome.isPerfect,
          bestMoves: nextMoves,
          bestTimeSeconds: elapsedRef.current,
        });
      } else if (nextMoves >= level.maxMoves) {
        setIsFailed(true);
        setStatus('paused');
      }
    },
    [isCompleted, isFailed, currentPos, level, moves, levelIndex]
  );

  const handleTimeUpdate = useCallback((seconds: number) => {
    elapsedRef.current = seconds;
  }, []);

  return {
    level,
    levelIndex,
    totalLevels: GRAVITY_PATH_LEVELS.length,
    currentPos,
    pathHistory,
    moves,
    remainingMoves: Math.max(0, level.maxMoves - moves),
    status,
    isCompleted,
    isFailed,
    score,
    stars,
    handleApplyGravity,
    handleTimeUpdate,
    resetGame,
    nextLevel,
    loadLevel,
  };
}
