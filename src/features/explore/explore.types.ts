/**
 * Explore 2.0 — Discovery Entity Types
 * Strongly typed models for the science discovery layer.
 * No `any`, no duplicate sources of truth.
 */

// ============================================================================
// Shared Primitives
// ============================================================================

export interface LocalizedText {
  en: string;
  ta: string;
}

// ============================================================================
// Discovery Types
// ============================================================================

export type DiscoveryType =
  | 'micro_lesson'
  | 'concept_map'
  | 'experiment'
  | 'fun_fact'
  | 'collection'
  | 'mystery'
  | 'game'
  | 'riddle'
  | 'scientist'
  | 'invention'
  | 'everyday_science'
  | 'daily_discovery';

// ============================================================================
// Topic / Taxonomy
// ============================================================================

export type DiscoveryTopicId =
  | 'physics'
  | 'chemistry'
  | 'biology'
  | 'space'
  | 'earth_environment'
  | 'environment'
  | 'human_body'
  | 'animals_plants'
  | 'scientists'
  | 'inventions'
  | 'everyday_science'
  | 'mathematics'
  | 'medicine'
  | 'engineering';

export interface DiscoveryTopic {
  id: DiscoveryTopicId;
  title: LocalizedText;
  subtitle: LocalizedText;
  icon: string;
  accentColor: string;
  discoveryCount: number;
}

// ============================================================================
// Activity Type (for filtering by activity kind)
// ============================================================================

export type ActivityTypeFilter =
  | 'all'
  | 'learn'
  | 'experiments'
  | 'facts'
  | 'mysteries'
  | 'games'
  | 'riddles'
  | 'collections'
  | 'scientists'
  | 'inventions';

// ============================================================================
// Discovery Item (unified card model)
// ============================================================================

export interface DiscoveryItem {
  id: string;
  type: DiscoveryType;
  title: LocalizedText;
  description: LocalizedText;
  topicId: DiscoveryTopicId;
  tags: string[];
  route: string;
  params?: Record<string, string>;
  durationMinutes?: number;
  progress?: number;
  isSaveable: boolean;
  icon: string;
  /** Secondary metadata line */
  meta?: LocalizedText;
  /** Badge or accent label */
  badge?: LocalizedText;
  /** Accent color override */
  accentColor?: string;
  /** Background color override */
  bgColor?: string;
}

// ============================================================================
// Scientist
// ============================================================================

export interface Scientist {
  id: string;
  name: LocalizedText;
  field: DiscoveryTopicId;
  keyContribution: LocalizedText;
  shortBio: LocalizedText;
  interestingFacts: LocalizedText[];
  relatedTopics: string[];
  icon: string;
  accentColor: string;
}

// ============================================================================
// Invention
// ============================================================================

export interface Invention {
  id: string;
  name: LocalizedText;
  inventor: LocalizedText;
  description: LocalizedText;
  sciencePrinciple: LocalizedText;
  whyItMatters: LocalizedText;
  field: DiscoveryTopicId;
  relatedTopics: string[];
  icon: string;
  accentColor: string;
}

// ============================================================================
// Everyday Science
// ============================================================================

export interface EverydayScienceItem {
  id: string;
  title: LocalizedText;
  description: LocalizedText;
  sciencePrinciple: LocalizedText;
  field: DiscoveryTopicId;
  icon: string;
  tags: string[];
}

// ============================================================================
// Daily Discovery
// ============================================================================

export interface DailyDiscoveryEntry {
  id: string;
  title: LocalizedText;
  description: LocalizedText;
  type: DiscoveryType;
  topicId: DiscoveryTopicId;
  route: string;
  params?: Record<string, string>;
  icon: string;
}

// ============================================================================
// Recommended Item (with reason code)
// ============================================================================

export type RecommendationReason =
  | 'continue'
  | 'related'
  | 'favorite_topic'
  | 'collection'
  | 'new_topic'
  | 'daily';

export interface ExploreRecommendation {
  item: DiscoveryItem;
  reason: RecommendationReason;
  reasonText: LocalizedText;
}

// ============================================================================
// Recently Viewed
// ============================================================================

export interface RecentlyViewedEntry {
  id: string;
  type: DiscoveryType;
  title: LocalizedText;
  icon: string;
  route: string;
  params?: Record<string, string>;
  viewedAt: number;
}

// ============================================================================
// Favorites
// ============================================================================

export interface FavoriteEntry {
  id: string;
  type: DiscoveryType;
  title: LocalizedText;
  icon: string;
  route: string;
  params?: Record<string, string>;
  savedAt: number;
}

// ============================================================================
// Sort Options
// ============================================================================

export type SortOption = 'recommended' | 'newest' | 'alpha';

// ============================================================================
// Filter State
// ============================================================================

export interface ExploreFilterState {
  query: string;
  topicFilter: DiscoveryTopicId | 'all';
  activityFilter: ActivityTypeFilter;
  sortOption: SortOption;
}

// ============================================================================
// Search Result (extends existing search system)
// ============================================================================

export type SearchResultType =
  | 'micro_lesson'
  | 'concept_map'
  | 'experiment'
  | 'fun_fact'
  | 'collection'
  | 'mystery'
  | 'game'
  | 'riddle'
  | 'scientist'
  | 'invention'
  | 'topic'
  | 'everyday_science';

// ============================================================================
// Explore ViewModel
// ============================================================================

export interface ExploreViewModel {
  featured: DiscoveryItem | null;
  dailyDiscovery: DailyDiscoveryEntry | null;
  continueDiscovering: DiscoveryItem[];
  topicGroups: DiscoveryTopic[];
  activityGroups: Array<{
    id: string;
    title: LocalizedText;
    icon: string;
    items: DiscoveryItem[];
  }>;
  collections: Array<{
    id: string;
    title: LocalizedText;
    icon: string;
    progress: number;
    totalItems: number;
  }>;
  recentlyViewed: RecentlyViewedEntry[];
  favorites: FavoriteEntry[];
  recommendations: ExploreRecommendation[];
  funFact: EverydayScienceItem | null;
  scientists: Scientist[];
  inventions: Invention[];
  everydayScience: EverydayScienceItem[];
  searchResults: Array<{
    id: string;
    type: DiscoveryType | SearchResultType;
    title: LocalizedText;
    description: LocalizedText;
    icon: string;
    route: string;
    params?: Record<string, string>;
    meta?: LocalizedText;
  }>;
  loading: boolean;
  empty: boolean;
  error: string | null;
}
