export interface MemoryCard {
  id: string; // unique card id
  pairId: string; // matches partner card
  content: { en: string; ta: string };
  subtext?: { en: string; ta: string };
  type: 'scientist' | 'discovery' | 'element' | 'organ' | 'symbol';
  icon: string;
}

export interface MemoryMatrixLevel {
  id: string;
  name: string;
  gridSize: { rows: number; cols: number };
  category: string;
  cards: MemoryCard[];
}

export interface MemoryMatrixState {
  levelIndex: number;
  level: MemoryMatrixLevel;
  flippedIndices: number[];
  matchedPairIds: string[];
  mistakes: number;
  moves: number;
  isCompleted: boolean;
  score: number;
}
