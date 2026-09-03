import { MagnetMazeLevel, MagnetPole } from './magnet-maze.types';

export function isWall(row: number, col: number, level: MagnetMazeLevel): boolean {
  return level.walls.some((w) => w.row === row && w.col === col);
}

export function isMagnetAdjacent(
  cellA: { row: number; col: number },
  cellB: { row: number; col: number }
): boolean {
  const dRow = Math.abs(cellA.row - cellB.row);
  const dCol = Math.abs(cellA.col - cellB.col);
  return (dRow === 1 && dCol === 0) || (dRow === 0 && dCol === 1);
}

export function isMagnetMazeComplete(
  pos: { row: number; col: number },
  currentPole: MagnetPole,
  level: MagnetMazeLevel
): boolean {
  if (pos.row !== level.target.row || pos.col !== level.target.col) {
    return false;
  }
  if (level.target.targetPole && level.target.targetPole !== currentPole) {
    return false;
  }
  return true;
}

export function calculateMagnetScore(
  moves: number,
  maxSteps: number,
  elapsedSeconds: number
): { score: number; stars: 1 | 2 | 3; isPerfect: boolean } {
  const isPerfect = moves <= maxSteps - 2;
  let stars: 1 | 2 | 3 = 1;
  if (moves <= maxSteps - 1 && elapsedSeconds < 30) {
    stars = 3;
  } else if (moves <= maxSteps) {
    stars = 2;
  }
  const score = Math.max(50, 250 - moves * 12 - elapsedSeconds * 2);
  return { score, stars, isPerfect };
}
