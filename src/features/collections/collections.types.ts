/**
 * Science Collections Feature Types
 * Strongly typed models for Vigyaan's collectible discovery system.
 * Strictly no 'any'.
 */

export type CollectionCategory =
  | 'space'
  | 'human-body'
  | 'chemistry'
  | 'physics'
  | 'biology'
  | 'earth-environment'
  | 'everyday-science'
  | 'scientists'
  | 'inventions'
  | 'general';

export type GradeGroup = 'junior' | 'secondary' | 'senior';

export type ItemType =
  | 'concept'
  | 'scientist'
  | 'invention'
  | 'organism'
  | 'element'
  | 'planet'
  | 'space-object'
  | 'body-part'
  | 'discovery'
  | 'phenomenon'
  | 'experiment'
  | 'science-tool';

export type UnlockConditionType =
  | 'micro_lesson_completed'
  | 'concept_map_completed'
  | 'experiment_completed'
  | 'game_completed'
  | 'riddle_completed'
  | 'mystery_completed'
  | 'fact_discovered'
  | 'achievement_unlocked'
  | 'subject_activity_count'
  | 'collection_progress'
  | 'specific_activity_completed';

export interface LocalizedText {
  en: string;
  ta: string;
}

export interface CollectionUnlockCondition {
  type: UnlockConditionType;
  targetId?: string;
  requiredCount?: number;
  requiredActivityType?: string;
  subjectId?: string;
  topicId?: string;
}

export interface ScienceCollection {
  id: string;
  title: LocalizedText;
  subtitle: LocalizedText;
  description: LocalizedText;
  category: CollectionCategory;
  gradeGroups: GradeGroup[];
  coverAsset: string;
  itemIds: string[];
  totalItems: number;
  themeToken: string;
  featured: boolean;
  sortOrder: number;
}

export interface CollectionItem {
  id: string;
  collectionId: string;
  title: LocalizedText;
  shortTitle: LocalizedText;
  description: LocalizedText;
  scientificExplanation: LocalizedText;
  imageAsset: string;
  icon: string;
  itemType: ItemType;
  unlockCondition: CollectionUnlockCondition;
  relatedSubjectId?: string;
  relatedTopicId?: string;
  microLessonId?: string;
  conceptMapId?: string;
  experimentId?: string;
  learnReference?: string;
  quizReference?: string;
  riddleId?: string;
  factId?: string;
  gameId?: string;
  achievementId?: string;
}

export type CollectionStatus = 'locked' | 'in_progress' | 'completed';

export interface CollectionProgress {
  collectionId: string;
  collectedItemIds: string[];
  progressPercent: number;
  status: CollectionStatus;
  lastUpdatedAt: number;
}

export interface ItemProgress {
  itemId: string;
  collected: boolean;
  collectedAt?: number;
  triggerActivityId?: string;
}

export interface CollectionDiscoveryEvent {
  collectionId: string;
  itemId: string;
  triggerActivityId: string;
  timestamp: number;
}

export interface CollectionCompletionEvent {
  collectionId: string;
  timestamp: number;
}