export interface ElementItem {
  id: string;
  symbol: string;
  name: { en: string; ta: string };
  atomicNumber: number;
  category: 'alkali' | 'noble' | 'halogen' | 'transition' | 'nonmetal' | 'earth';
  color: string;
}

export interface ElementMatchLevel {
  id: string;
  name: string;
  elements: ElementItem[];
  timeLimitSeconds?: number;
}

export interface ElementMatchState {
  levelIndex: number;
  level: ElementMatchLevel;
  selectedSymbol: string | null;
  selectedName: string | null;
  matchedIds: string[];
  mistakes: number;
  moves: number;
  isCompleted: boolean;
  score: number;
}
