/**
 * Patches Game Types & Models
 * Tiling and shape placement models for Game 3.
 */

export interface PatchPiece {
  id: string;
  name: string;
  shape: number[][]; // 2D binary matrix representing filled blocks
  color: string;
  symbol: string;
}

export interface PlacedPieceInfo {
  row: number;
  col: number;
}

export interface PatchesLevel {
  id: string;
  name: string;
  boardSize: { rows: number; cols: number };
  targetShape: boolean[][]; // Target area to cover
  pieces: PatchPiece[];
}

export interface PatchesGameState {
  levelIndex: number;
  level: PatchesLevel;
  placedPieces: Record<string, PlacedPieceInfo>;
  selectedPieceId?: string;
  isCompleted: boolean;
  moves: number;
  mistakes: number;
  elapsedSeconds: number;
}
