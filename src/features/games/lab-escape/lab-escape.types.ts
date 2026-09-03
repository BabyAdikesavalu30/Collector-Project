export interface EscapeStage {
  id: string;
  stageNumber: number;
  title: { en: string; ta: string };
  prompt: { en: string; ta: string };
  hint: { en: string; ta: string };
  options: { id: string; label: { en: string; ta: string }; icon?: string }[];
  correctOptionId: string;
}

export interface LabEscapeLevel {
  id: string;
  name: string;
  theme: { en: string; ta: string };
  stages: EscapeStage[];
  description: { en: string; ta: string };
}

export interface LabEscapeState {
  levelIndex: number;
  level: LabEscapeLevel;
  currentStageIndex: number;
  selectedOptionIds: string[];
  mistakes: number;
  moves: number;
  isCompleted: boolean;
  score: number;
}
