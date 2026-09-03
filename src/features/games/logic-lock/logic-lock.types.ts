export interface LogicClue {
  guess: string[]; // e.g. ['6', '8', '2']
  hint: { en: string; ta: string };
  badge: { en: string; ta: string };
}

export interface LogicLockLevel {
  id: string;
  name: string;
  codeLength: number;
  digitsRange: number[]; // e.g. [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
  solution: string[]; // e.g. ['0', '4', '2']
  clues: LogicClue[];
  description: { en: string; ta: string };
}

export interface LogicLockState {
  levelIndex: number;
  level: LogicLockLevel;
  currentGuess: string[];
  mistakes: number;
  moves: number;
  isCompleted: boolean;
  score: number;
}
