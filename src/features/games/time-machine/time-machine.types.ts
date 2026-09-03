export interface TimelineEvent {
  id: string;
  year: number;
  yearDisplay: string; // e.g. "1687 CE", "1905 CE", "1969 CE"
  title: { en: string; ta: string };
  scientist: { en: string; ta: string };
  description: { en: string; ta: string };
  icon: string;
}

export interface TimeMachineLevel {
  id: string;
  name: string;
  era: { en: string; ta: string };
  events: TimelineEvent[]; // Given in shuffled or challenge order
}

export interface TimeMachineState {
  levelIndex: number;
  level: TimeMachineLevel;
  orderedEventIds: string[];
  mistakes: number;
  moves: number;
  isCompleted: boolean;
  score: number;
}
