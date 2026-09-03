import { useState, useCallback, useRef } from 'react';
import { DNA_SEQUENCE_LEVELS } from './dna-sequence.levels';
import { DnaBase } from './dna-sequence.types';
import { getComplementBase, isDnaSequenceComplete, calculateDnaScore } from './dna-sequence.engine';
import { saveLevelCompletion } from '../games.storage';
import { GameStatus } from '../games.types';

export function useDnaSequenceGame(initialLevel: number = 0) {
  const [levelIndex, setLevelIndex] = useState<number>(initialLevel);
  const level = DNA_SEQUENCE_LEVELS[levelIndex] || DNA_SEQUENCE_LEVELS[0];

  const [playerStrand, setPlayerStrand] = useState<(DnaBase | null)[]>(() =>
    Array(level.templateStrand.length).fill(null)
  );
  const [activeSlotIndex, setActiveSlotIndex] = useState<number>(0);
  const [mistakes, setMistakes] = useState<number>(0);
  const [moves, setMoves] = useState<number>(0);
  const [status, setStatus] = useState<GameStatus>('ready');
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [stars, setStars] = useState<1 | 2 | 3>(1);
  const elapsedRef = useRef<number>(0);

  const resetGame = useCallback(() => {
    setPlayerStrand(Array(level.templateStrand.length).fill(null));
    setActiveSlotIndex(0);
    setMistakes(0);
    setMoves(0);
    setIsCompleted(false);
    setStatus('playing');
    setScore(0);
    elapsedRef.current = 0;
  }, [level]);

  const loadLevel = useCallback((idx: number) => {
    const validIdx = Math.max(0, Math.min(idx, DNA_SEQUENCE_LEVELS.length - 1));
    const nextLvl = DNA_SEQUENCE_LEVELS[validIdx];
    setLevelIndex(validIdx);
    setPlayerStrand(Array(nextLvl.templateStrand.length).fill(null));
    setActiveSlotIndex(0);
    setMistakes(0);
    setMoves(0);
    setIsCompleted(false);
    setStatus('playing');
    elapsedRef.current = 0;
  }, []);

  const nextLevel = useCallback(() => {
    if (levelIndex < DNA_SEQUENCE_LEVELS.length - 1) {
      loadLevel(levelIndex + 1);
    }
  }, [levelIndex, loadLevel]);

  const handleSelectBase = useCallback(
    (base: DnaBase) => {
      if (isCompleted || activeSlotIndex >= level.templateStrand.length) return;

      setStatus('playing');
      setMoves((m) => m + 1);
      const expected = getComplementBase(level.templateStrand[activeSlotIndex], level.mode);

      if (base === expected) {
        const nextStrand = [...playerStrand];
        nextStrand[activeSlotIndex] = base;
        setPlayerStrand(nextStrand);

        const nextSlot = activeSlotIndex + 1;
        setActiveSlotIndex(nextSlot);

        if (isDnaSequenceComplete(nextStrand, level)) {
          setIsCompleted(true);
          setStatus('completed');
          const outcome = calculateDnaScore(mistakes, elapsedRef.current, level.templateStrand.length);
          setScore(outcome.score);
          setStars(outcome.stars);
          saveLevelCompletion('dna-sequence', levelIndex, level.id, {
            score: outcome.score,
            stars: outcome.stars,
            isPerfect: outcome.isPerfect,
            bestMoves: moves + 1,
            bestTimeSeconds: elapsedRef.current,
          });
        }
      } else {
        setMistakes((m) => m + 1);
      }
    },
    [isCompleted, activeSlotIndex, level, playerStrand, mistakes, moves, levelIndex]
  );

  const handleUndo = useCallback(() => {
    if (isCompleted || activeSlotIndex === 0) return;
    const prevSlot = activeSlotIndex - 1;
    const nextStrand = [...playerStrand];
    nextStrand[prevSlot] = null;
    setPlayerStrand(nextStrand);
    setActiveSlotIndex(prevSlot);
  }, [isCompleted, activeSlotIndex, playerStrand]);

  const handleTimeUpdate = useCallback((seconds: number) => {
    elapsedRef.current = seconds;
  }, []);

  return {
    level,
    levelIndex,
    totalLevels: DNA_SEQUENCE_LEVELS.length,
    playerStrand,
    activeSlotIndex,
    mistakes,
    moves,
    status,
    isCompleted,
    score,
    stars,
    handleSelectBase,
    handleUndo,
    handleTimeUpdate,
    resetGame,
    nextLevel,
    loadLevel,
  };
}
