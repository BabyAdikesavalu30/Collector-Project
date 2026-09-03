export type MagnetPole = 'N' | 'S';

export interface MagnetEmitter {
  row: number;
  col: number;
  pole: MagnetPole;
  strength: number; // 1, 2
}

export interface MagnetMazeLevel {
  id: string;
  name: string;
  gridSize: { rows: number; cols: number };
  start: { row: number; col: number; initialPole: MagnetPole };
  target: { row: number; col: number; targetPole?: MagnetPole };
  walls: { row: number; col: number }[];
  emitters: MagnetEmitter[];
  maxSteps: number;
  description: { en: string; ta: string };
}

export interface MagnetMazeState {
  levelIndex: number;
  level: MagnetMazeLevel;
  currentPos: { row: number; col: number };
  currentPole: MagnetPole;
  path: { row: number; col: number }[];
  moves: number;
  isCompleted: boolean;
  score: number;
}
