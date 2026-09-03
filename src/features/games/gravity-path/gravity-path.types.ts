export type GravityDirection = 'up' | 'down' | 'left' | 'right';

export type GravityGridCell =
  | 'empty'
  | 'wall'
  | 'start'
  | 'target'
  | 'hazard'
  | 'portal-a'
  | 'portal-b';

export interface GravityPathLevel {
  id: string;
  name: string;
  gridSize: { rows: number; cols: number };
  grid: GravityGridCell[][];
  start: { row: number; col: number };
  target: { row: number; col: number };
  portalA?: { row: number; col: number };
  portalB?: { row: number; col: number };
  maxMoves: number;
  description: { en: string; ta: string };
}

export interface GravityPathState {
  levelIndex: number;
  level: GravityPathLevel;
  currentPos: { row: number; col: number };
  pathHistory: { row: number; col: number }[];
  moves: number;
  isCompleted: boolean;
  isFailed: boolean;
  score: number;
}
