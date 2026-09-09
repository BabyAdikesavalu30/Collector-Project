/**
 * Recommendations Feature Types
 * Lightweight, deterministic, rule-based recommendations. No AI, no backend.
 */

export type RecommendationKind =
  | 'game'
  | 'mystery'
  | 'collection'
  | 'milestone'
  | 'riddle'
  | 'fun-fact'
  | 'explore';

export interface RecommendedItem {
  id: string;
  kind: RecommendationKind;
  title: string;
  titleTa: string;
  subtitle: string;
  subtitleTa: string;
  route: string;
  params?: Record<string, string>;
  icon: string;
  /** Deterministic rule that produced this recommendation. */
  reasonKey: string;
}

export interface RecommendationInput {
  recentlyPlayedGameIds: string[];
  favoriteGameIds: string[];
  /** Counts of completed activities by type (from activity history). */
  activityCounts: Record<string, number>;
  totalXp: number;
  streakDays: number;
  /** Per-domain strength percentages (physics, chemistry, ...). */
  strengths: Record<string, number>;
}