/**
 * Zip Game Engine
 * Validates path connectivity, checkpoint sequences, and completion rules.
 */

import { ZipCell, ZipLevel } from './zip.types';

export function isSameCell(a: ZipCell, b: ZipCell): boolean {
  return a.row === b.row && a.col === b.col;
}

export function isOrthogonallyAdjacent(a: ZipCell, b: ZipCell): boolean {
  const dRow = Math.abs(a.row - b.row);
  const dCol = Math.abs(a.col - b.col);
  return (dRow === 1 && dCol === 0) || (dRow === 0 && dCol === 1);
}

export function getCheckpointAt(
  level: ZipLevel,
  row: number,
  col: number
): number | undefined {
  const cp = level.checkpoints.find((c) => c.row === row && c.col === col);
  return cp ? cp.number : undefined;
}

/**
 * Checks if tapping/moving to nextCell is valid.
 */
export function validateZipStep(
  currentPath: ZipCell[],
  nextCell: ZipCell,
  level: ZipLevel
): { valid: boolean; isUndo?: boolean; nextExpectedCheckpoint?: number; error?: string } {
  // 1. Boundary check
  if (
    nextCell.row < 0 ||
    nextCell.row >= level.size ||
    nextCell.col < 0 ||
    nextCell.col >= level.size
  ) {
    return { valid: false, error: 'Out of bounds' };
  }

  // 2. Empty path: Must start at Checkpoint 1
  if (currentPath.length === 0) {
    const cp = getCheckpointAt(level, nextCell.row, nextCell.col);
    if (cp === 1) {
      return { valid: true };
    }
    return { valid: false, error: 'Must start at checkpoint 1' };
  }

  // 3. Tapping the previous step is an UNDO
  if (
    currentPath.length >= 2 &&
    isSameCell(currentPath[currentPath.length - 2], nextCell)
  ) {
    return { valid: true, isUndo: true };
  }

  // 4. Must be adjacent to last cell
  const lastCell = currentPath[currentPath.length - 1];
  if (isSameCell(lastCell, nextCell)) {
    return { valid: false, error: 'Already on cell' };
  }

  if (!isOrthogonallyAdjacent(lastCell, nextCell)) {
    return { valid: false, error: 'Must connect to adjacent cell' };
  }

  // 5. Cannot overlap with existing path
  const alreadyInPath = currentPath.some((cell) => isSameCell(cell, nextCell));
  if (alreadyInPath) {
    return { valid: false, error: 'Cell already visited' };
  }

  // 6. Checkpoint sequencing
  const cellCheckpoint = getCheckpointAt(level, nextCell.row, nextCell.col);
  if (cellCheckpoint !== undefined) {
    // Find highest checkpoint visited so far
    let highestVisited = 0;
    for (const cell of currentPath) {
      const num = getCheckpointAt(level, cell.row, cell.col);
      if (num !== undefined && num > highestVisited) {
        highestVisited = num;
      }
    }

    if (cellCheckpoint !== highestVisited + 1) {
      return {
        valid: false,
        error: `Must visit checkpoint ${highestVisited + 1} next`,
        nextExpectedCheckpoint: highestVisited + 1,
      };
    }
  }

  return { valid: true };
}

/**
 * Checks if path is fully complete and all checkpoints visited in order.
 */
export function isZipComplete(path: ZipCell[], level: ZipLevel): boolean {
  if (path.length !== level.targetLength) {
    return false;
  }

  // Check all checkpoints are visited in exact numerical order
  let currentCp = 1;
  for (const cell of path) {
    const cp = getCheckpointAt(level, cell.row, cell.col);
    if (cp !== undefined) {
      if (cp !== currentCp) {
        return false;
      }
      currentCp++;
    }
  }

  return currentCp === level.checkpoints.length + 1;
}
