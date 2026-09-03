/**
 * usePatchesGame Hook
 * State machine and game coordinator for Game 3: Patches.
 */

import { useState, useCallback, useRef } from 'react';
import { PlacedPieceInfo, PatchesLevel, PatchesGameState } from './patches.types';
import { PATCHES_LEVELS } from './patches.levels';
import { canPlacePiece, isPatchesComplete } from './patches.engine';
import { saveLevelCompletion } from '../games.storage';
import { GameStatus } from '../games.types';

export function usePatchesGame(initialLevelIndex = 0) {
  const [levelIndex, setLevelIndex] = useState<number>(initialLevelIndex);
  const level: PatchesLevel = PATCHES_LEVELS[levelIndex] || PATCHES_LEVELS[0];

  const [placedPieces, setPlacedPieces] = useState<Record<string, PlacedPieceInfo>>({});
  const [selectedPieceId, setSelectedPieceId] = useState<string | undefined>(level.pieces[0]?.id);
  const [status, setStatus] = useState<GameStatus>('ready');
  const [moves, setMoves] = useState<number>(0);
  const [mistakes, setMistakes] = useState<number>(0);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const elapsedRef = useRef<number>(0);

  const loadLevel = useCallback((idx: number) => {
    const clampedIdx = Math.max(0, Math.min(idx, PATCHES_LEVELS.length - 1));
    const nextLvl = PATCHES_LEVELS[clampedIdx];
    setLevelIndex(clampedIdx);
    setPlacedPieces({});
    setSelectedPieceId(nextLvl.pieces[0]?.id);
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

  const selectPiece = useCallback((id: string) => {
    setSelectedPieceId(id);
  }, []);

  const removePlacedPiece = useCallback((id: string) => {
    if (isCompleted) return;
    setPlacedPieces((prev) => {
      const copy = { ...prev };
      delete copy[id];
      return copy;
    });
    setSelectedPieceId(id);
    setMoves((m) => m + 1);
  }, [isCompleted]);

  const handleBoardCellPress = useCallback(
    (row: number, col: number) => {
      if (isCompleted || !selectedPieceId) return;

      if (status === 'ready') {
        setStatus('playing');
      }

      const piece = level.pieces.find((p) => p.id === selectedPieceId);
      if (!piece) return;

      const placement = canPlacePiece(piece, row, col, level, placedPieces);
      if (placement.valid) {
        const nextPlaced = {
          ...placedPieces,
          [piece.id]: { row, col },
        };
        setPlacedPieces(nextPlaced);
        setMoves((m) => m + 1);

        // Pick next unplaced piece
        const remaining = level.pieces.find((p) => !nextPlaced[p.id]);
        setSelectedPieceId(remaining?.id);

        if (isPatchesComplete(nextPlaced, level)) {
          setIsCompleted(true);
          setStatus('completed');

          const score = Math.max(20, 150 - (elapsedRef.current * 2) - (mistakes * 5));
          saveLevelCompletion('patches', levelIndex, level.id, {
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
    [isCompleted, selectedPieceId, status, level, placedPieces, levelIndex, mistakes, moves]
  );

  const nextLevel = useCallback(() => {
    if (levelIndex < PATCHES_LEVELS.length - 1) {
      loadLevel(levelIndex + 1);
    }
  }, [levelIndex, loadLevel]);

  const state: PatchesGameState = {
    levelIndex,
    level,
    placedPieces,
    selectedPieceId,
    isCompleted,
    moves,
    mistakes,
    elapsedSeconds: elapsedRef.current,
  };

  return {
    state,
    level,
    levelIndex,
    placedPieces,
    selectedPieceId,
    status,
    moves,
    mistakes,
    isCompleted,
    totalLevels: PATCHES_LEVELS.length,
    selectPiece,
    removePlacedPiece,
    handleBoardCellPress,
    handleTimeUpdate,
    resetGame,
    pauseGame,
    resumeGame,
    nextLevel,
    loadLevel,
  };
}
