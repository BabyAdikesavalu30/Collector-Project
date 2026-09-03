export interface SpaceObstacle {
  row: number;
  col: number;
  type: 'asteroid' | 'black-hole' | 'space-debris';
}

export interface OrbitWaypoint {
  order: number;
  row: number;
  col: number;
}

export interface OrbitLevel {
  id: string;
  name: string;
  gridSize: { rows: number; cols: number };
  start: { row: number; col: number };
  target: { row: number; col: number };
  waypoints: OrbitWaypoint[];
  obstacles: SpaceObstacle[];
  maxFuelMoves: number;
  description: { en: string; ta: string };
}

export interface OrbitState {
  levelIndex: number;
  level: OrbitLevel;
  path: { row: number; col: number }[];
  currentFuel: number;
  isCompleted: boolean;
  isCrashed: boolean;
  moves: number;
  score: number;
}
