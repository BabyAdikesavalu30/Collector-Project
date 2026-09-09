/**
 * Celebration Feature Types
 * Strongly-typed celebration event model for the centralized
 * Celebration & Micro-interaction System.
 *
 * All events represent meaningful state changes — not every tap.
 */

// ============================================================================
// Celebration Event Types
// ============================================================================

export type CelebrationType =
  | 'activity_complete'
  | 'achievement_unlocked'
  | 'streak_milestone'
  | 'collection_unlocked'
  | 'level_up'
  | 'daily_goal_complete'
  | 'certificate_earned'
  | 'personal_best'
  | 'major_milestone'
  | 'game_level_complete'
  | 'game_milestone'
  | 'mystery_solved'
  | 'riddle_set_complete'
  | 'concept_map_complete'
  | 'experiment_complete'
  | 'micro_lesson_complete'
  | 'xp_earned';

export type CelebrationIntensity = 'subtle' | 'standard' | 'major';

export type CelebrationPriority = 0 | 1 | 2 | 3; // P0 highest, P3 lowest

export type CelebrationSource =
  | 'quiz'
  | 'learn'
  | 'micro-lesson'
  | 'concept-map'
  | 'experiment-lab'
  | 'mystery-lab'
  | 'riddles'
  | 'games'
  | 'achievements'
  | 'certificates'
  | 'collections'
  | 'daily-goal'
  | 'streak'
  | 'passport'
  | 'rewards'
  | 'general';

// ============================================================================
// Celebration Event Model
// ============================================================================

export interface RewardSummary {
  xp?: number;
  points?: number;
  badgeIcon?: string;
  certificateTitle?: string;
  collectionName?: string;
}

export interface CelebrationEvent {
  /** Stable unique identifier for this specific event instance. */
  id: string;

  /** The type of celebration. */
  type: CelebrationType;

  /** The feature module that generated this event. */
  source: CelebrationSource;

  /** Translatable title key. */
  titleKey: string;

  /** Translatable description key (optional). */
  descriptionKey?: string;

  /** Icon or emoji for the celebration. */
  icon?: string;

  /** Reward summary shown in the celebration. */
  reward?: RewardSummary;

  /** Milestone value (e.g., 7 for a 7-day streak). */
  milestone?: number;

  /** ISO timestamp of when the event was created. */
  createdAt: string;

  /**
   * Stable deduplication key.
   * Used to prevent duplicate celebrations.
   * Example: 'achievement:achievement-first-quiz'
   */
  uniqueKey: string;

  /** Visual intensity of the celebration. */
  intensity: CelebrationIntensity;

  /** Priority level for queue ordering. */
  priority: CelebrationPriority;

  /** Optional navigation route for Continue action. */
  continueRoute?: string;

  /** Optional label for the Continue button. */
  continueLabel?: string;

  /** Optional secondary action route (e.g., "View Certificate"). */
  secondaryActionRoute?: string;

  /** Optional label for the secondary action. */
  secondaryActionLabel?: string;
}

// ============================================================================
// Celebration State
// ============================================================================

export type CelebrationDisplayState = 'idle' | 'showing' | 'dismissing';

export interface CelebrationState {
  /** The currently displayed event, or null. */
  currentEvent: CelebrationEvent | null;

  /** Display state. */
  displayState: CelebrationDisplayState;

  /** Whether reduced motion is active. */
  reducedMotion: boolean;

  /** Whether celebrations are enabled (from settings). */
  celebrationsEnabled: boolean;

  /** Celebration intensity setting: 'on' | 'reduced' | 'off'. */
  celebrationLevel: 'on' | 'reduced' | 'off';
}

// ============================================================================
// Celebration Queue
// ============================================================================

export interface CelebrationQueue {
  /** Pending events ordered by priority (P0 first). */
  events: CelebrationEvent[];

  /** Set of handled uniqueKeys for idempotency. */
  handledKeys: Set<string>;
}

// ============================================================================
// Celebration Registry Entry
// ============================================================================

export interface CelebrationRegistryEntry {
  type: CelebrationType;
  defaultIntensity: CelebrationIntensity;
  defaultPriority: CelebrationPriority;
  defaultIcon: string;
  /** Whether confetti should be used for this event type. */
  useConfetti: boolean;
  /** Maximum duration in ms before auto-dismiss. */
  maxDurationMs: number;
}

// ============================================================================
// Settings Integration
// ============================================================================

export interface CelebrationSettings {
  /** Celebration level: 'on' | 'reduced' | 'off'. */
  celebrationLevel: 'on' | 'reduced' | 'off';
}

// ============================================================================
// Storage Model
// ============================================================================

export interface CelebrationStorageState {
  /** Handled celebration uniqueKeys (for idempotency). */
  handledKeys: string[];
  /** Timestamp of last cleanup (for old key purging). */
  lastCleanupAt: number;
}
