/**
 * Search Feature Types
 * Global search across the available product content (games, riddles,
 * fun facts, mystery cases, achievements, certificates, collections).
 * Future extension to Learn topics / Quiz categories is additive.
 */

export type SearchCategory =
  | 'game'
  | 'riddle'
  | 'fact'
  | 'mystery'
  | 'achievement'
  | 'certificate'
  | 'collection'
  | 'explore'
  | 'micro_lesson'
  | 'concept_map'
  | 'experiment'
  | 'scientist'
  | 'invention'
  | 'everyday_science';

export interface SearchItem {
  id: string;
  category: SearchCategory;
  title: string;
  titleTa: string;
  subtitle: string;
  subtitleTa: string;
  /** Destination route (with params where needed). */
  route: string;
  params?: Record<string, string>;
  icon: string;
  tags: string[];
  /** Category label (EN/TA) used by filter chips and result rows. */
  categoryLabel: string;
  categoryLabelTa: string;
  /** Pre-normalized fields for instant zero-allocation search scoring. */
  _normTitleEn?: string;
  _normTitleTa?: string;
  _normSubtitleEn?: string;
  _normSubtitleTa?: string;
  _normTags?: string;
  _normCategoryEn?: string;
  _normCategoryTa?: string;
}

export interface SearchResult {
  item: SearchItem;
  score: number;
  /** Which field produced the match — used for debugging/tests. */
  matchedField: 'title' | 'subtitle' | 'tags' | 'category';
}

export interface SearchIndex {
  items: SearchItem[];
  /** Deterministic recommended queries shown before typing. */
  suggestedQueries: string[];
}