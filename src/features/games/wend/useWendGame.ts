/**
 * useWendGame Hook
 * State machine and game coordinator for Game 2: Wend.
 */

import { useState, useCallback, useRef } from 'react';
import { WendCell, WendLevel, WendGameState } from './wend.types';
import { WEND_LEVELS } from './wend.levels';
import { validateWendStep, isWendComplete, getConstructedWord } from './wend.engine';
import { saveLevelCompletion } from '../games.storage';
import { SupportedLanguage } from '../../../config/i18n';
import { GameStatus } from '../games.types';

export function useWendGame(initialLevelIndex = 0, language: SupportedLanguage = 'en') {
  const [levelIndex, setLevelIndex] = useState<number>(initialLevelIndex);
  const level: WendLevel = WEND_LEVELS[levelIndex] || WEND_LEVELS[0];

  const [selectedPath, setSelectedPath] = useState<WendCell[]>([]);
  const [status, setStatus] = useState<GameStatus>('ready');
  const [moves, setMoves] = useState<number>(0);
  const [mistakes, setMistakes] = useState<number>(0);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const elapsedRef = useRef<number>(0);

  const loadLevel = useCallback((idx: number) => {
    const clampedIdx = Math.max(0, Math.min(idx, WEND_LEVELS.length - 1));
    setLevelIndex(clampedIdx);
    setSelectedPath([]);
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

      // Check undo if user taps the last selected cell
      if (selectedPath.length > 0) {
        const lastCell = selectedPath[selectedPath.length - 1];
        if (lastCell.row === row && lastCell.col === col) {
          setSelectedPath((p) => p.slice(0, p.length - 1));
          setMoves((m) => m + 1);
          return;
        }
      }

      const step = validateWendStep(selectedPath, { row, col }, level, language);
      if (step.valid) {
        const nextPath = [...selectedPath, { row, col }];
        setSelectedPath(nextPath);
        setMoves((m) => m + 1);

        if (isWendComplete(nextPath, level, language)) {
          setIsCompleted(true);
          setStatus('completed');

          const score = Math.max(20, 150 - (elapsedRef.current * 2) - (mistakes * 5));
          saveLevelCompletion('wend', levelIndex, level.id, {
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
    [isCompleted, status, selectedPath, level, language, levelIndex, mistakes, moves]
  );

  const undoMove = useCallback(() => {
    if (selectedPath.length > 0 && !isCompleted) {
      setSelectedPath((p) => p.slice(0, p.length - 1));
      setMoves((m) => m + 1);
    }
  }, [selectedPath, isCompleted]);

  const nextLevel = useCallback(() => {
    if (levelIndex < WEND_LEVELS.length - 1) {
      loadLevel(levelIndex + 1);
    }
  }, [levelIndex, loadLevel]);

  const currentWord = getConstructedWord(selectedPath, level, language);

  const state: WendGameState = {
    levelIndex,
    level,
    selectedPath,
    currentWord,
    isCompleted,
    moves,
    mistakes,
    elapsedSeconds: elapsedRef.current,
  };

  return {
    state,
    level,
    levelIndex,
    selectedPath,
    currentWord,
    status,
    moves,
    mistakes,
    isCompleted,
    totalLevels: WEND_LEVELS.length,
    handleCellPress,
    handleTimeUpdate,
    undoMove,
    resetGame,
    pauseGame,
    resumeGame,
    nextLevel,
    loadLevel,
  };
}
