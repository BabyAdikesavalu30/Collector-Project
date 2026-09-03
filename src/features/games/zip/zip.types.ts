/**
 * Zip Game Types & Models
 * Path connection logic models for Game 1.
 */

export interface ZipCell {
  row: number;
  col: number;
}

export interface ZipCheckpoint {
  number: number;
  row: number;
  col: number;
}

export interface ZipLevel {
  id: string;
  name: string;
  size: number; // e.g. 3, 4, 5
  checkpoints: ZipCheckpoint[];
  targetLength: number; // total cells needed for full path
}

export interface ZipGameState {
  levelIndex: number;
  level: ZipLevel;
  path: ZipCell[];
  isCompleted: boolean;
  moves: number;
  mistakes: number;
  elapsedSeconds: number;
}
