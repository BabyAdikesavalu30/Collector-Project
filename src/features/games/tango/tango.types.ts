/**
 * Tango Game Types & Models
 * Sun ☀️ and Moon 🌙 balance puzzle models for Game 5.
 */

export type TangoSymbol = 'sun' | 'moon' | null;
export type TangoClueType = 'equal' | 'opposite';

export interface TangoClue {
  type: TangoClueType;
  cell1: { row: number; col: number };
  cell2: { row: number; col: number };
}

export interface TangoLevel {
  id: string;
  name: string;
  initialGrid: TangoSymbol[][];
  clues: TangoClue[];
  solution: ('sun' | 'moon')[][];
}

export interface TangoGameState {
  levelIndex: number;
  level: TangoLevel;
  grid: TangoSymbol[][];
  conflicts: { row: number; col: number }[];
  isCompleted: boolean;
  moves: number;
  mistakes: number;
  elapsedSeconds: number;
}
