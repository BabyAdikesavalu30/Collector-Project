import { GravityDirection, GravityPathLevel } from './gravity-path.types';

export function slideParticle(
  pos: { row: number; col: number },
  dir: GravityDirection,
  level: GravityPathLevel
): {
  finalPos: { row: number; col: number };
  hitHazard: boolean;
  hitTarget: boolean;
  usedPortal: boolean;
} {
  let dRow = 0;
  let dCol = 0;
  if (dir === 'up') dRow = -1;
  if (dir === 'down') dRow = 1;
  if (dir === 'left') dCol = -1;
  if (dir === 'right') dCol = 1;

  let r = pos.row;
  let c = pos.col;
  const rows = level.gridSize.rows;
  const cols = level.gridSize.cols;

  while (true) {
    const nextR = r + dRow;
    const nextC = c + dCol;

    // Check bounds
    if (nextR < 0 || nextR >= rows || nextC < 0 || nextC >= cols) {
      break;
    }

    const cellType = level.grid[nextR][nextC];
    if (cellType === 'wall') {
      break;
    }

    r = nextR;
    c = nextC;

    if (cellType === 'hazard') {
      return { finalPos: { row: r, col: c }, hitHazard: true, hitTarget: false, usedPortal: false };
    }

    if (r === level.target.row && c === level.target.col) {
      return { finalPos: { row: r, col: c }, hitHazard: false, hitTarget: true, usedPortal: false };
    }

    // Portal teleportation
    if (cellType === 'portal-a' && level.portalB) {
      return {
        finalPos: { row: level.portalB.row, col: level.portalB.col },
        hitHazard: false,
        hitTarget: false,
        usedPortal: true,
      };
    }
    if (cellType === 'portal-b' && level.portalA) {
      return {
        finalPos: { row: level.portalA.row, col: level.portalA.col },
        hitHazard: false,
        hitTarget: false,
        usedPortal: true,
      };
    }
  }

  return {
    finalPos: { row: r, col: c },
    hitHazard: false,
    hitTarget: r === level.target.row && c === level.target.col,
    usedPortal: false,
  };
}

export function calculateGravityScore(
  moves: number,
  maxMoves: number,
  elapsedSeconds: number
): { score: number; stars: 1 | 2 | 3; isPerfect: boolean } {
  const isPerfect = moves <= maxMoves - 2;
  let stars: 1 | 2 | 3 = 1;
  if (moves <= maxMoves - 1 && elapsedSeconds < 25) {
    stars = 3;
  } else if (moves <= maxMoves) {
    stars = 2;
  }
  const score = Math.max(50, 250 - moves * 15 - elapsedSeconds * 2);
  return { score, stars, isPerfect };
}
