/**
 * Concept Maps Feature Types
 * Strongly typed models for Vigyaan's visual concept maps learning layer.
 * Strictly no 'any'.
 */

export type ConceptMapSubjectId =
  | 'physics'
  | 'chemistry'
  | 'biology'
  | 'space'
  | 'environment'
  | 'human-body';

export type ConceptGradeGroup = 'junior' | 'secondary' | 'senior';

export type ConceptDifficulty = 'easy' | 'medium' | 'hard';

export type ConceptNodeType =
  | 'root'
  | 'concept'
  | 'cause'
  | 'effect'
  | 'input'
  | 'process'
  | 'output'
  | 'example'
  | 'definition'
  | 'related';

export type RelationshipType =
  | 'causes'
  | 'produces'
  | 'requires'
  | 'contains'
  | 'partOf'
  | 'leadsTo'
  | 'relatedTo'
  | 'exampleOf'
  | 'dependsOn';

export interface LocalizedText {
  en: string;
  ta: string;
}

export interface NodePosition {
  /** X coordinate (0 to 400 virtual coordinate space) */
  x: number;
  /** Y coordinate (0 to 600 virtual coordinate space) */
  y: number;
}

export interface QuizContextResolved {
  levelId: string;
  subjectId: string;
  pathwayId: string;
}

export interface ConceptMapNode {
  id: string;
  title: LocalizedText;
  /** Short compact label used on canvas pills */
  shortLabel: LocalizedText;
  description: LocalizedText;
  type: ConceptNodeType;
  position: NodePosition;
  icon: string;
  /** Detailed educational explanation */
  definition: LocalizedText;
  /** Real-world practical example */
  example: LocalizedText;
  /** Is this a key required concept to mark map exploration complete? */
  keyNode: boolean;
  /** Stable IDs of related/connected nodes */
  relatedNodeIds: string[];
  /** Optional deep-link to an existing Micro Lesson */
  microLessonId?: string;
  /** Optional deep-link to Learn pathway route */
  learnRoute?: string;
  /** Optional Quiz practice context params */
  quizContext?: QuizContextResolved;
}

export interface ConceptMapConnection {
  id: string;
  fromNodeId: string;
  toNodeId: string;
  relationship: RelationshipType;
  label?: LocalizedText;
  direction?: 'forward' | 'bidirectional';
}

export interface ConceptMap {
  id: string;
  title: LocalizedText;
  subtitle: LocalizedText;
  subject: ConceptMapSubjectId;
  category: string;
  gradeRange: string;
  gradeGroup: ConceptGradeGroup;
  estimatedMinutes: number;
  difficulty: ConceptDifficulty;
  icon: string;
  description: LocalizedText;
  keyTakeaway: LocalizedText;
  nodes: ConceptMapNode[];
  connections: ConceptMapConnection[];
  canvasWidth?: number;
  canvasHeight?: number;
  tags: string[];
  xpReward?: number; // default: 10
  relatedMicroLessonIds?: string[];
}

export type ConceptMapStatus = 'not_started' | 'in_progress' | 'completed';

export interface ConceptMapProgress {
  mapId: string;
  exploredNodeIds: string[];
  progressPercent: number;
  status: ConceptMapStatus;
  completed?: boolean;
  startedAt?: number;
  completedAt?: number;
  lastSelectedNodeId?: string;
  bookmarked?: boolean;
}

export interface ConceptMapSubjectMeta {
  id: ConceptMapSubjectId;
  title: LocalizedText;
  subtitle: LocalizedText;
  icon: string;
  accentColor: string;
  badgeBg: string;
}

export type ConceptMapFilterStatus = 'all' | 'not_started' | 'in_progress' | 'completed' | 'bookmarked';

export interface ConceptMapFilterState {
  status: ConceptMapFilterStatus;
  subjectId: ConceptMapSubjectId | 'all';
  searchQuery: string;
}

export type ConceptViewMode = 'canvas' | 'list';

// Aliases for component convenience
export type ConceptNode = ConceptMapNode;
export type ConceptConnection = ConceptMapConnection;
export type ConceptSubjectId = ConceptMapSubjectId;

