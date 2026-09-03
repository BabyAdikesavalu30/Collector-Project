export interface WordGridWord {
  id: string;
  word: { en: string; ta: string };
  hint: { en: string; ta: string };
  path: { row: number; col: number }[];
}

export interface ScienceWordGridLevel {
  id: string;
  name: string;
  category: { en: string; ta: string };
  grid: string[][]; // 4x4 or 5x5 English letter grid
  taGrid: string[][]; // 4x4 or 5x5 Tamil letter grid
  words: WordGridWord[];
}

export interface ScienceWordGridState {
  levelIndex: number;
  level: ScienceWordGridLevel;
  selectedCells: { row: number; col: number }[];
  foundWordIds: string[];
  mistakes: number;
  moves: number;
  isCompleted: boolean;
  score: number;
}
