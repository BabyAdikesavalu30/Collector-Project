import { useState, useCallback, useRef } from 'react';
import { MOLECULE_LEVELS } from './molecule-builder.levels';
import { AtomToken } from './molecule-builder.types';
import { isMoleculeComplete, calculateMoleculeScore } from './molecule-builder.engine';
import { saveLevelCompletion } from '../games.storage';
import { GameStatus } from '../games.types';

export function useMoleculeBuilderGame(initialLevel: number = 0) {
  const [levelIndex, setLevelIndex] = useState<number>(initialLevel);
  const [selectedAtoms, setSelectedAtoms] = useState<AtomToken[]>([]);
  const [moves, setMoves] = useState<number>(0);
  const [status, setStatus] = useState<GameStatus>('ready');
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [stars, setStars] = useState<1 | 2 | 3>(1);
  const elapsedRef = useRef<number>(0);

  const level = MOLECULE_LEVELS[levelIndex] || MOLECULE_LEVELS[0];

  const resetGame = useCallback(() => {
    setSelectedAtoms([]);
    setMoves(0);
    setIsCompleted(false);
    setStatus('playing');
    setScore(0);
    elapsedRef.current = 0;
  }, []);

  const loadLevel = useCallback((idx: number) => {
    const validIdx = Math.max(0, Math.min(idx, MOLECULE_LEVELS.length - 1));
    setLevelIndex(validIdx);
    setSelectedAtoms([]);
    setMoves(0);
    setIsCompleted(false);
    setStatus('playing');
    elapsedRef.current = 0;
  }, []);

  const nextLevel = useCallback(() => {
    if (levelIndex < MOLECULE_LEVELS.length - 1) {
      loadLevel(levelIndex + 1);
    }
  }, [levelIndex, loadLevel]);

  const handleAddAtom = useCallback((atom: AtomToken) => {
    if (isCompleted) return;
    setStatus('playing');
    setMoves((m) => m + 1);
    const nextAtoms = [...selectedAtoms, atom];
    setSelectedAtoms(nextAtoms);

    if (isMoleculeComplete(nextAtoms, level)) {
      setIsCompleted(true);
      setStatus('completed');
      const targetCount = Object.values(level.requiredAtoms).reduce((a, b) => a + b, 0);
      const outcome = calculateMoleculeScore(moves + 1, elapsedRef.current, targetCount);
      setScore(outcome.score);
      setStars(outcome.stars);
      saveLevelCompletion('molecule-builder', levelIndex, level.id, {
        score: outcome.score,
        stars: outcome.stars,
        isPerfect: outcome.isPerfect,
        bestMoves: moves + 1,
        bestTimeSeconds: elapsedRef.current,
      });
    }
  }, [isCompleted, selectedAtoms, level, moves, levelIndex]);

  const handleRemoveAtom = useCallback((index: number) => {
    if (isCompleted) return;
    setSelectedAtoms((prev) => prev.filter((_, i) => i !== index));
  }, [isCompleted]);

  const handleTimeUpdate = useCallback((seconds: number) => {
    elapsedRef.current = seconds;
  }, []);

  return {
    level,
    levelIndex,
    totalLevels: MOLECULE_LEVELS.length,
    selectedAtoms,
    moves,
    status,
    isCompleted,
    score,
    stars,
    handleAddAtom,
    handleRemoveAtom,
    handleTimeUpdate,
    resetGame,
    nextLevel,
    loadLevel,
  };
}
