/**
 * Learn Feature Types
 * Strongly typed definitions for Level, Subject, and Learning Pathway selection.
 */

export interface LearningLevel {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  grades: number[];
}

export interface LearningSubject {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  supportedLevelIds: string[];
  subspecialties?: string;
}

export interface LocalizedText {
  en: string;
  ta: string;
}

export interface LearningTopic {
  id: string;
  title: LocalizedText;
  /** 2–4 sentences of real explanatory content. */
  summary: LocalizedText;
  /** Optional bullet points reinforcing the summary. */
  keyPoints?: LocalizedText[];
}

export interface LearningPathway {
  id: string;
  subjectId: string;
  levelId: string;
  title: string;
  description: string;
  topicCount: number;
  estimatedMinutes: number;
  /** Optional lesson content shown before the student starts the quiz. */
  topics?: LearningTopic[];
}
