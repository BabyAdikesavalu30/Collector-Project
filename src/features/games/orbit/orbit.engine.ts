import { OrbitLevel } from './orbit.types';

export function isObstacle(row: number, col: number, level: OrbitLevel): boolean {
  return level.obstacles.some((o) => o.row === row && o.col === col);
}

export function isAdjacent(
  cellA: { row: number; col: number },
  cellB: { row: number; col: number }
): boolean {
  const dRow = Math.abs(cellA.row - cellB.row);
  const dCol = Math.abs(cellA.col - cellB.col);
  return (dRow === 1 && dCol === 0) || (dRow === 0 && dCol === 1);
}

export function isOrbitComplete(
  path: { row: number; col: number }[],
  level: OrbitLevel
): boolean {
  if (path.length === 0) return false;
  const last = path[path.length - 1];
  if (last.row !== level.target.row || last.col !== level.target.col) {
    return false;
  }

  // Check all waypoints visited in numerical order
  let currentOrder = 1;
  for (const cell of path) {
    const wp = level.waypoints.find((w) => w.row === cell.row && w.col === cell.col);
    if (wp) {
      if (wp.order === currentOrder) {
        currentOrder++;
      }
    }
  }

  return currentOrder === level.waypoints.length + 1;
}

export function calculateOrbitScore(
  moves: number,
  maxFuel: number,
  elapsedSeconds: number
): { score: number; stars: 1 | 2 | 3; isPerfect: boolean } {
  const isPerfect = moves <= maxFuel - 4;
  let stars: 1 | 2 | 3 = 1;
  if (moves <= maxFuel - 2 && elapsedSeconds < 40) {
    stars = 3;
  } else if (moves <= maxFuel) {
    stars = 2;
  }
  const score = Math.max(50, 300 - moves * 10 - elapsedSeconds);
  return { score, stars, isPerfect };
}
