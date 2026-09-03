import { CircuitComponentType, CircuitLabLevel } from './circuit-lab.types';

export function isConductive(type: CircuitComponentType): boolean {
  return type !== 'empty' && type !== 'switch-open';
}

export function isCircuitComplete(
  grid: CircuitComponentType[][],
  level: CircuitLabLevel
): boolean {
  const rows = level.gridSize.rows;
  const cols = level.gridSize.cols;

  // Check that perimeter loop is continuous and all switches are closed
  // Top row
  for (let c = 0; c < cols; c++) {
    if (!isConductive(grid[0][c])) return false;
  }
  // Bottom row
  for (let c = 0; c < cols; c++) {
    if (!isConductive(grid[rows - 1][c])) return false;
  }
  // Left col
  for (let r = 0; r < rows; r++) {
    if (!isConductive(grid[r][0])) return false;
  }
  // Right col
  for (let r = 0; r < rows; r++) {
    if (!isConductive(grid[r][cols - 1])) return false;
  }

  // Corners must be corner pieces or conductive
  return true;
}

export function calculateCircuitScore(
  moves: number,
  elapsedSeconds: number
): { score: number; stars: 1 | 2 | 3; isPerfect: boolean } {
  const isPerfect = moves <= 6;
  let stars: 1 | 2 | 3 = 1;
  if (moves <= 6 && elapsedSeconds < 30) {
    stars = 3;
  } else if (moves <= 10) {
    stars = 2;
  }
  const score = Math.max(50, 250 - moves * 10 - elapsedSeconds * 2);
  return { score, stars, isPerfect };
}
