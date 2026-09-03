/**
 * Queens Game Types & Models
 * Crown each region puzzle models for Game 6.
 */

export type QueenCellState = 'empty' | 'queen' | 'cross';

export interface QueensLevel {
  id: string;
  name: string;
  size: number; // 4 or 5
  regions: number[][]; // Region ID for each cell
  regionColors: string[]; // Distinct pastel/soft colors for regions
  solution: { row: number; col: number }[];
}

export interface QueensGameState {
  levelIndex: number;
  level: QueensLevel;
  grid: QueenCellState[][];
  conflicts: { row: number; col: number }[];
  isCompleted: boolean;
  moves: number;
  mistakes: number;
  elapsedSeconds: number;
}
