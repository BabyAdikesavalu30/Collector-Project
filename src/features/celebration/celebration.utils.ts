/**
 * Celebration Utilities
 * Pure helpers for event creation, validation, and formatting.
 */

import {
  CelebrationEvent,
  CelebrationType,
  CelebrationSource,
  CelebrationIntensity,
  CelebrationPriority,
  RewardSummary,
} from './celebration.types';
import { CELEBRATION_REGISTRY } from './celebration.config';

// ============================================================================
// Event ID Generation
// ============================================================================

let eventCounter = 0;

/**
 * Generates a stable unique event ID.
 * Uses a counter + timestamp to guarantee uniqueness.
 */
export function generateEventId(): string {
  eventCounter += 1;
  return `cel-${Date.now()}-${eventCounter}`;
}

// ============================================================================
// Unique Key Construction
// ============================================================================

/**
 * Builds a deterministic uniqueKey for deduplication.
 * Format: `{source}:{type}:{identifier}`
 */
export function buildUniqueKey(
  source: CelebrationSource,
  type: CelebrationType,
  identifier: string
): string {
  return `${source}:${type}:${identifier}`;
}

// ============================================================================
// Event Factory
// ============================================================================

interface CreateEventInput {
  type: CelebrationType;
  source: CelebrationSource;
  identifier: string;
  titleKey: string;
  descriptionKey?: string;
  icon?: string;
  reward?: RewardSummary;
  milestone?: number;
  continueRoute?: string;
  continueLabel?: string;
  secondaryActionRoute?: string;
  secondaryActionLabel?: string;
  /** Override intensity (defaults to registry value). */
  intensity?: CelebrationIntensity;
  /** Override priority (defaults to registry value). */
  priority?: CelebrationPriority;
}

/**
 * Creates a strongly-typed CelebrationEvent from input.
 * Falls back to registry defaults for missing fields.
 */
export function createCelebrationEvent(input: CreateEventInput): CelebrationEvent {
  const registry = CELEBRATION_REGISTRY[input.type];

  return {
    id: generateEventId(),
    type: input.type,
    source: input.source,
    titleKey: input.titleKey,
    descriptionKey: input.descriptionKey,
    icon: input.icon || registry.defaultIcon,
    reward: input.reward,
    milestone: input.milestone,
    createdAt: new Date().toISOString(),
    uniqueKey: buildUniqueKey(input.source, input.type, input.identifier),
    intensity: input.intensity || registry.defaultIntensity,
    priority: input.priority ?? registry.defaultPriority,
    continueRoute: input.continueRoute,
    continueLabel: input.continueLabel,
    secondaryActionRoute: input.secondaryActionRoute,
    secondaryActionLabel: input.secondaryActionLabel,
  };
}

// ============================================================================
// Priority Comparison
// ============================================================================

/**
 * Sort comparator for events by priority (lower number = higher priority).
 * Within the same priority, earlier events come first (FIFO).
 */
export function compareEventPriority(a: CelebrationEvent, b: CelebrationEvent): number {
  if (a.priority !== b.priority) {
    return a.priority - b.priority;
  }
  return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
}

// ============================================================================
// Event Validation
// ============================================================================

/**
 * Validates that a celebration event has all required fields.
 * Returns true if the event is renderable.
 */
export function isValidEvent(event: unknown): event is CelebrationEvent {
  if (!event || typeof event !== 'object') return false;
  const e = event as Record<string, unknown>;

  return (
    typeof e.id === 'string' &&
    typeof e.type === 'string' &&
    typeof e.source === 'string' &&
    typeof e.titleKey === 'string' &&
    typeof e.uniqueKey === 'string' &&
    typeof e.intensity === 'string' &&
    typeof e.priority === 'number' &&
    typeof e.createdAt === 'string'
  );
}

// ============================================================================
// Intensity Helpers
// ============================================================================

/**
 * Determines whether confetti should be used for a given event.
 */
export function shouldUseConfetti(event: CelebrationEvent): boolean {
  const registry = CELEBRATION_REGISTRY[event.type];
  return registry?.useConfetti ?? false;
}

/**
 * Gets the max display duration for an event.
 */
export function getMaxDurationMs(event: CelebrationEvent): number {
  const registry = CELEBRATION_REGISTRY[event.type];
  return registry?.maxDurationMs ?? 3000;
}

/**
 * Returns whether the event is a "major" celebration.
 */
export function isMajorCelebration(event: CelebrationEvent): boolean {
  return event.intensity === 'major';
}

/**
 * Returns whether the event should show as a modal (standard/major) vs toast (subtle).
 */
export function shouldShowAsModal(event: CelebrationEvent): boolean {
  return event.intensity !== 'subtle';
}

// ============================================================================
// Safe Dismissal
// ============================================================================

/**
 * Determines if a given celebration should be skipped based on settings.
 */
export function shouldSkipCelebration(
  celebrationLevel: 'on' | 'reduced' | 'off',
  eventIntensity: CelebrationIntensity
): boolean {
  if (celebrationLevel === 'off') {
    // Even when "off", we still allow subtle semantic feedback
    // but skip standard/major celebrations
    return eventIntensity !== 'subtle';
  }
  if (celebrationLevel === 'reduced') {
    // In reduced mode, skip only major celebrations
    return eventIntensity === 'major';
  }
  return false; // 'on' = show everything
}
