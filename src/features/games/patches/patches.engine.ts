/**
 * Patches Game Engine
 * Validates piece placement, collision detection, and full board coverage.
 */

import { PatchPiece, PatchesLevel, PlacedPieceInfo } from './patches.types';

export function getOccupiedCells(
  piece: PatchPiece,
  atRow: number,
  atCol: number
): { row: number; col: number }[] {
  const cells: { row: number; col: number }[] = [];
  for (let r = 0; r < piece.shape.length; r++) {
    for (let c = 0; c < piece.shape[r].length; c++) {
      if (piece.shape[r][c] === 1) {
        cells.push({ row: atRow + r, col: atCol + c });
      }
    }
  }
  return cells;
}

export function canPlacePiece(
  piece: PatchPiece,
  atRow: number,
  atCol: number,
  level: PatchesLevel,
  placedPieces: Record<string, PlacedPieceInfo>
): { valid: boolean; error?: string } {
  const cells = getOccupiedCells(piece, atRow, atCol);

  // 1. Boundary and target shape check
  for (const cell of cells) {
    if (
      cell.row < 0 ||
      cell.row >= level.boardSize.rows ||
      cell.col < 0 ||
      cell.col >= level.boardSize.cols
    ) {
      return { valid: false, error: 'Piece extends beyond board boundary' };
    }

    if (!level.targetShape[cell.row][cell.col]) {
      return { valid: false, error: 'Cannot place outside the target outline' };
    }
  }

  // 2. Collision with other placed pieces
  for (const [placedId, placement] of Object.entries(placedPieces)) {
    if (placedId === piece.id) continue; // Same piece being moved is allowed
    const otherPiece = level.pieces.find((p) => p.id === placedId);
    if (!otherPiece) continue;

    const otherCells = getOccupiedCells(otherPiece, placement.row, placement.col);
    for (const cell of cells) {
      const collision = otherCells.some(
        (oc) => oc.row === cell.row && oc.col === cell.col
      );
      if (collision) {
        return { valid: false, error: 'Overlaps with another placed piece' };
      }
    }
  }

  return { valid: true };
}

export function isPatchesComplete(
  placedPieces: Record<string, PlacedPieceInfo>,
  level: PatchesLevel
): boolean {
  // 1. All pieces must be placed
  if (Object.keys(placedPieces).length !== level.pieces.length) {
    return false;
  }

  // 2. Target matrix must be fully covered
  const covered: boolean[][] = Array.from({ length: level.boardSize.rows }, () =>
    Array(level.boardSize.cols).fill(false)
  );

  for (const [pieceId, placement] of Object.entries(placedPieces)) {
    const piece = level.pieces.find((p) => p.id === pieceId);
    if (!piece) return false;

    const cells = getOccupiedCells(piece, placement.row, placement.col);
    for (const cell of cells) {
      if (
        cell.row < 0 ||
        cell.row >= level.boardSize.rows ||
        cell.col < 0 ||
        cell.col >= level.boardSize.cols
      ) {
        return false;
      }
      if (covered[cell.row][cell.col]) {
        return false; // Overlap detected
      }
      covered[cell.row][cell.col] = true;
    }
  }

  for (let r = 0; r < level.boardSize.rows; r++) {
    for (let c = 0; c < level.boardSize.cols; c++) {
      if (level.targetShape[r][c] && !covered[r][c]) {
        return false;
      }
    }
  }

  return true;
}
