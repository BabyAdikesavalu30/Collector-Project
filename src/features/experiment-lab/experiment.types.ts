/**
 * Experiment Lab Feature Types
 * Strongly typed science simulation models, variable controls, deterministic
 * outputs, observations, reflection questions, and progression tracking.
 *
 * No `any`, no fake physics engine dependencies.
 */

export type ExperimentSubject = 'physics' | 'chemistry' | 'biology' | 'environment' | 'space';

export type GradeGroup = '6-7' | '8-10' | '11-12';

export type ExperimentDifficulty = 'easy' | 'medium' | 'hard';

export type VariableControlType = 'slider' | 'stepper' | 'segmented' | 'toggle';

export interface LocalizedText {
  en: string;
  ta: string;
}

export interface ExperimentVariableOption {
  value: string | number;
  label: LocalizedText;
}

export interface ExperimentVariable {
  id: string;
  label: LocalizedText;
  unit: string;
  unitTa?: string;
  type: VariableControlType;
  min?: number;
  max?: number;
  step?: number;
  defaultValue: number | string | boolean;
  options?: ExperimentVariableOption[];
  description?: LocalizedText;
}

export interface SimulationResultMetric {
  id: string;
  label: LocalizedText;
  value: number | string;
  unit: string;
  unitTa?: string;
  formattedValue: string;
}

export interface SimulationResult {
  metrics: SimulationResultMetric[];
  visualState: Record<string, unknown>;
  summaryText: LocalizedText;
}

export interface ExperimentObservationRule {
  id: string;
  condition: (variables: Record<string, unknown>, result: SimulationResult) => boolean;
  title: LocalizedText;
  text: LocalizedText;
  explanation: LocalizedText;
}

export interface ExperimentReflectionOption {
  id: string;
  text: LocalizedText;
}

export interface ExperimentReflectionQuestion {
  question: LocalizedText;
  options: ExperimentReflectionOption[];
  correctOptionId: string;
  explanation: LocalizedText;
}

export interface Experiment {
  id: string;
  title: LocalizedText;
  subtitle: LocalizedText;
  description: LocalizedText;
  subject: ExperimentSubject;
  gradeGroup: GradeGroup;
  durationMinutes: number;
  difficulty: ExperimentDifficulty;
  heroAsset?: string;
  learningObjective: LocalizedText;
  variables: ExperimentVariable[];
  simulationId: string;
  observations: ExperimentObservationRule[];
  reflectionQuestion: ExperimentReflectionQuestion;
  keyTakeaways: {
    en: string[];
    ta: string[];
  };
  microLessonId?: string;
  conceptMapId?: string;
  learnReference?: string;
  quizReference?: {
    subject: string;
    topic?: string;
  };
  xpReward: number;
  tags: string[];
}

export interface ExperimentProgress {
  experimentId: string;
  status: 'not_started' | 'in_progress' | 'completed';
  lastRunAt?: number;
  runCount: number;
  completed: boolean;
  completedAt?: number;
  bookmarked: boolean;
  lastVariableValues?: Record<string, unknown>;
  reflectionAnswered?: boolean;
}

export interface RunSnapshot {
  runLabel: string;
  variables: Record<string, unknown>;
  result: SimulationResult;
  timestamp: number;
}

export interface ExperimentSubjectMeta {
  id: ExperimentSubject;
  title: LocalizedText;
  subtitle: LocalizedText;
  icon: string;
  color: string;
}

export interface ExperimentFilterState {
  subject: ExperimentSubject | 'all';
  searchQuery: string;
  statusFilter: 'all' | 'not_started' | 'in_progress' | 'completed' | 'bookmarked';
}
