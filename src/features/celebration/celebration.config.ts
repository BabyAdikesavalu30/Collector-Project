/**
 * Celebration Configuration & Registry
 * Central registry describing how each celebration event behaves,
 * including default intensity, priority, and visual settings.
 */

import {
  CelebrationType,
  CelebrationIntensity,
  CelebrationPriority,
  CelebrationRegistryEntry,
} from './celebration.types';

// ============================================================================
// Celebration Registry — maps each event type to its default behavior
// ============================================================================

export const CELEBRATION_REGISTRY: Record<CelebrationType, CelebrationRegistryEntry> = {
  // ─── P0: Highest priority — major life events ────────────────────────
  certificate_earned: {
    type: 'certificate_earned',
    defaultIntensity: 'major',
    defaultPriority: 0,
    defaultIcon: '📜',
    useConfetti: true,
    maxDurationMs: 8000,
  },
  major_milestone: {
    type: 'major_milestone',
    defaultIntensity: 'major',
    defaultPriority: 0,
    defaultIcon: '🏆',
    useConfetti: true,
    maxDurationMs: 8000,
  },
  achievement_unlocked: {
    type: 'achievement_unlocked',
    defaultIntensity: 'standard',
    defaultPriority: 0,
    defaultIcon: '🏅',
    useConfetti: false,
    maxDurationMs: 5000,
  },

  // ─── P1: High priority — meaningful milestones ──────────────────────
  daily_goal_complete: {
    type: 'daily_goal_complete',
    defaultIntensity: 'standard',
    defaultPriority: 1,
    defaultIcon: '🎯',
    useConfetti: false,
    maxDurationMs: 5000,
  },
  collection_unlocked: {
    type: 'collection_unlocked',
    defaultIntensity: 'standard',
    defaultPriority: 1,
    defaultIcon: '📦',
    useConfetti: false,
    maxDurationMs: 4000,
  },
  personal_best: {
    type: 'personal_best',
    defaultIntensity: 'standard',
    defaultPriority: 1,
    defaultIcon: '⭐',
    useConfetti: false,
    maxDurationMs: 4000,
  },
  level_up: {
    type: 'level_up',
    defaultIntensity: 'standard',
    defaultPriority: 1,
    defaultIcon: '⬆️',
    useConfetti: false,
    maxDurationMs: 5000,
  },
  streak_milestone: {
    type: 'streak_milestone',
    defaultIntensity: 'standard',
    defaultPriority: 1,
    defaultIcon: '🔥',
    useConfetti: false,
    maxDurationMs: 5000,
  },

  // ─── P2: Standard priority — activity completions ────────────────────
  activity_complete: {
    type: 'activity_complete',
    defaultIntensity: 'subtle',
    defaultPriority: 2,
    defaultIcon: '✅',
    useConfetti: false,
    maxDurationMs: 3000,
  },
  micro_lesson_complete: {
    type: 'micro_lesson_complete',
    defaultIntensity: 'subtle',
    defaultPriority: 2,
    defaultIcon: '📖',
    useConfetti: false,
    maxDurationMs: 3000,
  },
  concept_map_complete: {
    type: 'concept_map_complete',
    defaultIntensity: 'standard',
    defaultPriority: 2,
    defaultIcon: '🗺️',
    useConfetti: false,
    maxDurationMs: 4000,
  },
  experiment_complete: {
    type: 'experiment_complete',
    defaultIntensity: 'standard',
    defaultPriority: 2,
    defaultIcon: '🧪',
    useConfetti: false,
    maxDurationMs: 4000,
  },
  mystery_solved: {
    type: 'mystery_solved',
    defaultIntensity: 'standard',
    defaultPriority: 2,
    defaultIcon: '🕵️',
    useConfetti: false,
    maxDurationMs: 4000,
  },
  riddle_set_complete: {
    type: 'riddle_set_complete',
    defaultIntensity: 'standard',
    defaultPriority: 2,
    defaultIcon: '🧩',
    useConfetti: false,
    maxDurationMs: 3500,
  },
  game_level_complete: {
    type: 'game_level_complete',
    defaultIntensity: 'subtle',
    defaultPriority: 2,
    defaultIcon: '🎮',
    useConfetti: false,
    maxDurationMs: 2500,
  },
  game_milestone: {
    type: 'game_milestone',
    defaultIntensity: 'standard',
    defaultPriority: 2,
    defaultIcon: '🎮',
    useConfetti: false,
    maxDurationMs: 4000,
  },

  // ─── P3: Low priority — lightweight micro-success ────────────────────
  xp_earned: {
    type: 'xp_earned',
    defaultIntensity: 'subtle',
    defaultPriority: 3,
    defaultIcon: '⚡',
    useConfetti: false,
    maxDurationMs: 2000,
  },
};

// ============================================================================
// Priority Ordering (lower number = higher priority)
// ============================================================================

export function getPriorityOrder(priority: CelebrationPriority): number {
  return priority;
}

// ============================================================================
// Streak Milestone Thresholds
// ============================================================================

export const STREAK_MILESTONES = [3, 7, 14, 30, 60, 100] as const;

export function isStreakMilestone(days: number): boolean {
  return (STREAK_MILESTONES as readonly number[]).includes(days);
}

// ============================================================================
// Confetti Color Palette (theme-compatible)
// ============================================================================

export const CONFETTI_COLORS = [
  '#2563EB', // Blue (primary)
  '#7E22CE', // Purple (brand)
  '#16A34A', // Green (success)
  '#F8FAFC', // White (pearl)
  '#D97706', // Gold (sparingly, for achievement moments)
] as const;

// ============================================================================
// Animation Duration Constants
// ============================================================================

export const ANIMATION_DURATIONS = {
  subtle: {
    enter: 150,
    hold: 1500,
    exit: 200,
  },
  standard: {
    enter: 250,
    hold: 2500,
    exit: 250,
  },
  major: {
    enter: 350,
    hold: 3500,
    exit: 300,
  },
} as const;

// ============================================================================
// Confetti Configuration
// ============================================================================

export const CONFETTI_CONFIG = {
  /** Maximum number of particles rendered at once. */
  maxParticles: 24,
  /** Duration of the confetti burst in ms. */
  burstDurationMs: 1800,
  /** Particle size range in dp. */
  particleSize: { min: 4, max: 8 },
  /** Gravity factor (higher = faster fall). */
  gravity: 0.6,
  /** Spread angle in degrees. */
  spread: 60,
} as const;
