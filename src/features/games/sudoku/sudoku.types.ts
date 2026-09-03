/**
 * Mini Sudoku Game Types & Models
 * 4x4 Mini Sudoku models for Game 4.
 */

export type SudokuCellVal = number | null;
export type SudokuGrid = SudokuCellVal[][];

export interface SudokuLevel {
  id: string;
  name: string;
  initialGrid: SudokuGrid; // Pre-filled givens
  solution: number[][]; // 4x4 complete solution
}

export interface SudokuGameState {
  levelIndex: number;
  level: SudokuLevel;
  grid: SudokuGrid;
  selectedCell: { row: number; col: number } | null;
  conflicts: { row: number; col: number }[];
  isCompleted: boolean;
  moves: number;
  mistakes: number;
  elapsedSeconds: number;
}
