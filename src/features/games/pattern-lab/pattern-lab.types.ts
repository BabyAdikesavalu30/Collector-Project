export interface PatternLabOption {
  id: string;
  value: string;
  label: { en: string; ta: string };
  icon?: string;
}

export interface PatternLabLevel {
  id: string;
  name: string;
  ruleDescription: { en: string; ta: string };
  sequence: { display: string; icon?: string }[];
  missingIndex: number;
  options: PatternLabOption[];
  correctOptionId: string;
  explanation: { en: string; ta: string };
}

export interface PatternLabState {
  levelIndex: number;
  level: PatternLabLevel;
  selectedOptionId: string | null;
  mistakes: number;
  moves: number;
  isCompleted: boolean;
  score: number;
}
