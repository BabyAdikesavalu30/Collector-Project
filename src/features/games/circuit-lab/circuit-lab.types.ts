export type CircuitComponentType =
  | 'battery'
  | 'wire-horizontal'
  | 'wire-vertical'
  | 'corner-tl'
  | 'corner-tr'
  | 'corner-bl'
  | 'corner-br'
  | 'bulb'
  | 'switch-closed'
  | 'switch-open'
  | 'resistor'
  | 'empty';

export interface CircuitCell {
  row: number;
  col: number;
  type: CircuitComponentType;
  isFixed?: boolean;
}

export interface CircuitLabLevel {
  id: string;
  name: string;
  gridSize: { rows: number; cols: number };
  initialGrid: CircuitComponentType[][];
  fixedCells: { row: number; col: number }[];
  targetComponents: CircuitComponentType[];
  description: { en: string; ta: string };
}

export interface CircuitLabState {
  levelIndex: number;
  level: CircuitLabLevel;
  grid: CircuitComponentType[][];
  isCompleted: boolean;
  moves: number;
  score: number;
}
