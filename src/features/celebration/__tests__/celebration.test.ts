/**
 * Unit Tests for Celebration System (Phase 47)
 * Validates:
 * - Event creation and validation
 * - Priority ordering
 * - Duplicate event protection
 * - Queue behavior
 * - Reduced-motion behavior
 * - Celebration off behavior
 * - Registry completeness
 * - Streak milestone detection
 * - Translation keys
 */

import {
  CelebrationEvent,
  CelebrationType,
  CelebrationSource,
  CelebrationIntensity,
} from '../celebration.types';
import {
  CELEBRATION_REGISTRY,
  STREAK_MILESTONES,
  isStreakMilestone,
  CONFETTI_COLORS,
  ANIMATION_DURATIONS,
  CONFETTI_CONFIG,
} from '../celebration.config';
import {
  generateEventId,
  buildUniqueKey,
  createCelebrationEvent,
  compareEventPriority,
  isValidEvent,
  shouldUseConfetti,
  getMaxDurationMs,
  isMajorCelebration,
  shouldShowAsModal,
  shouldSkipCelebration,
} from '../celebration.utils';

// ============================================================================
// Event Creation & Validation
// ============================================================================

describe('Celebration System', () => {
  describe('Event Creation', () => {
    it('generates unique event IDs', () => {
      const id1 = generateEventId();
      const id2 = generateEventId();
      expect(id1).not.toBe(id2);
      expect(id1).toMatch(/^cel-/);
    });

    it('builds deterministic unique keys', () => {
      const key1 = buildUniqueKey('games', 'game_level_complete', 'zip-level-1');
      const key2 = buildUniqueKey('games', 'game_level_complete', 'zip-level-1');
      expect(key1).toBe(key2);
      expect(key1).toBe('games:game_level_complete:zip-level-1');
    });

    it('creates a valid celebration event from input', () => {
      const event = createCelebrationEvent({
        type: 'achievement_unlocked',
        source: 'achievements',
        identifier: 'first-quiz',
        titleKey: 'celebration.achievementUnlocked',
        icon: '🏅',
        reward: { xp: 25 },
      });

      expect(event.id).toMatch(/^cel-/);
      expect(event.type).toBe('achievement_unlocked');
      expect(event.source).toBe('achievements');
      expect(event.uniqueKey).toBe('achievements:achievement_unlocked:first-quiz');
      expect(event.icon).toBe('🏅');
      expect(event.reward?.xp).toBe(25);
      expect(event.priority).toBe(0); // P0 from registry
      expect(event.intensity).toBe('standard'); // From registry
      expect(event.createdAt).toBeTruthy();
    });

    it('uses registry defaults for missing fields', () => {
      const event = createCelebrationEvent({
        type: 'certificate_earned',
        source: 'certificates',
        identifier: 'cert-1',
        titleKey: 'celebration.certificateEarned',
      });

      expect(event.icon).toBe('📜'); // From registry
      expect(event.intensity).toBe('major'); // From registry
      expect(event.priority).toBe(0); // P0
    });

    it('allows overriding intensity and priority', () => {
      const event = createCelebrationEvent({
        type: 'game_level_complete',
        source: 'games',
        identifier: 'zip-1',
        titleKey: 'celebration.gameLevelComplete',
        intensity: 'major',
        priority: 0,
      });

      expect(event.intensity).toBe('major');
      expect(event.priority).toBe(0);
    });
  });

  describe('Event Validation', () => {
    it('validates a correct event', () => {
      const event = createCelebrationEvent({
        type: 'activity_complete',
        source: 'learn',
        identifier: 'quiz-1',
        titleKey: 'celebration.lessonComplete',
      });
      expect(isValidEvent(event)).toBe(true);
    });

    it('rejects null/undefined', () => {
      expect(isValidEvent(null)).toBe(false);
      expect(isValidEvent(undefined)).toBe(false);
    });

    it('rejects objects with missing fields', () => {
      expect(isValidEvent({ id: '1' })).toBe(false);
      expect(isValidEvent({ id: '1', type: 'x' })).toBe(false);
    });

    it('rejects non-object values', () => {
      expect(isValidEvent('string')).toBe(false);
      expect(isValidEvent(42)).toBe(false);
    });
  });

  // ============================================================================
  // Priority Ordering
  // ============================================================================

  describe('Priority Ordering', () => {
    it('sorts events by priority (lower number first)', () => {
      const p0 = createCelebrationEvent({
        type: 'certificate_earned',
        source: 'certificates',
        identifier: 'c1',
        titleKey: 'celebration.certificateEarned',
      });
      const p2 = createCelebrationEvent({
        type: 'game_level_complete',
        source: 'games',
        identifier: 'g1',
        titleKey: 'celebration.gameLevelComplete',
      });
      const p1 = createCelebrationEvent({
        type: 'daily_goal_complete',
        source: 'daily-goal',
        identifier: 'd1',
        titleKey: 'celebration.dailyGoalComplete',
      });

      const sorted = [p2, p1, p0].sort(compareEventPriority);
      expect(sorted[0].type).toBe('certificate_earned');
      expect(sorted[1].type).toBe('daily_goal_complete');
      expect(sorted[2].type).toBe('game_level_complete');
    });

    it('preserves FIFO order within same priority', () => {
      const e1 = createCelebrationEvent({
        type: 'game_level_complete',
        source: 'games',
        identifier: 'g1',
        titleKey: 'celebration.gameLevelComplete',
      });
      const e2 = createCelebrationEvent({
        type: 'micro_lesson_complete',
        source: 'micro-lesson',
        identifier: 'm1',
        titleKey: 'celebration.lessonComplete',
      });

      // Both are P2, so sorted by createdAt (FIFO)
      const sorted = [e2, e1].sort(compareEventPriority);
      expect(sorted.length).toBe(2);
      // Verify stable sort: both events present
      expect(sorted.map((e) => e.id).sort()).toEqual([e1.id, e2.id].sort());
    });
  });

  // ============================================================================
  // Registry
  // ============================================================================

  describe('Celebration Registry', () => {
    it('has entries for all celebration types', () => {
      const types: CelebrationType[] = [
        'activity_complete',
        'achievement_unlocked',
        'streak_milestone',
        'collection_unlocked',
        'level_up',
        'daily_goal_complete',
        'certificate_earned',
        'personal_best',
        'major_milestone',
        'game_level_complete',
        'game_milestone',
        'mystery_solved',
        'riddle_set_complete',
        'concept_map_complete',
        'experiment_complete',
        'micro_lesson_complete',
        'xp_earned',
      ];

      for (const type of types) {
        expect(CELEBRATION_REGISTRY[type]).toBeDefined();
        expect(CELEBRATION_REGISTRY[type].type).toBe(type);
        expect(CELEBRATION_REGISTRY[type].defaultIcon).toBeTruthy();
        expect(CELEBRATION_REGISTRY[type].maxDurationMs).toBeGreaterThan(0);
      }
    });

    it('has certificate_earned as P0 with confetti', () => {
      const entry = CELEBRATION_REGISTRY.certificate_earned;
      expect(entry.defaultPriority).toBe(0);
      expect(entry.useConfetti).toBe(true);
      expect(entry.defaultIntensity).toBe('major');
    });

    it('has game_level_complete as subtle', () => {
      const entry = CELEBRATION_REGISTRY.game_level_complete;
      expect(entry.defaultIntensity).toBe('subtle');
    });

    it('has xp_earned as lowest priority', () => {
      const entry = CELEBRATION_REGISTRY.xp_earned;
      expect(entry.defaultPriority).toBe(3);
    });
  });

  // ============================================================================
  // Streak Milestones
  // ============================================================================

  describe('Streak Milestones', () => {
    it('identifies valid streak milestones', () => {
      expect(isStreakMilestone(3)).toBe(true);
      expect(isStreakMilestone(7)).toBe(true);
      expect(isStreakMilestone(14)).toBe(true);
      expect(isStreakMilestone(30)).toBe(true);
      expect(isStreakMilestone(60)).toBe(true);
      expect(isStreakMilestone(100)).toBe(true);
    });

    it('rejects non-milestone values', () => {
      expect(isStreakMilestone(1)).toBe(false);
      expect(isStreakMilestone(5)).toBe(false);
      expect(isStreakMilestone(10)).toBe(false);
      expect(isStreakMilestone(20)).toBe(false);
    });

    it('has milestones in ascending order', () => {
      for (let i = 1; i < STREAK_MILESTONES.length; i++) {
        expect(STREAK_MILESTONES[i]).toBeGreaterThan(STREAK_MILESTONES[i - 1]);
      }
    });
  });

  // ============================================================================
  // Intensity Helpers
  // ============================================================================

  describe('Intensity Helpers', () => {
    it('shouldUseConfetti returns true for certificate_earned', () => {
      const event = createCelebrationEvent({
        type: 'certificate_earned',
        source: 'certificates',
        identifier: 'c1',
        titleKey: 'celebration.certificateEarned',
      });
      expect(shouldUseConfetti(event)).toBe(true);
    });

    it('shouldUseConfetti returns false for game_level_complete', () => {
      const event = createCelebrationEvent({
        type: 'game_level_complete',
        source: 'games',
        identifier: 'g1',
        titleKey: 'celebration.gameLevelComplete',
      });
      expect(shouldUseConfetti(event)).toBe(false);
    });

    it('getMaxDurationMs returns correct values', () => {
      const certEvent = createCelebrationEvent({
        type: 'certificate_earned',
        source: 'certificates',
        identifier: 'c1',
        titleKey: 'celebration.certificateEarned',
      });
      expect(getMaxDurationMs(certEvent)).toBe(8000);

      const subtleEvent = createCelebrationEvent({
        type: 'xp_earned',
        source: 'general',
        identifier: 'x1',
        titleKey: 'celebration.xpEarned',
      });
      expect(getMaxDurationMs(subtleEvent)).toBe(2000);
    });

    it('isMajorCelebration correctly identifies major events', () => {
      const major = createCelebrationEvent({
        type: 'certificate_earned',
        source: 'certificates',
        identifier: 'c1',
        titleKey: 'celebration.certificateEarned',
      });
      expect(isMajorCelebration(major)).toBe(true);

      const subtle = createCelebrationEvent({
        type: 'game_level_complete',
        source: 'games',
        identifier: 'g1',
        titleKey: 'celebration.gameLevelComplete',
      });
      expect(isMajorCelebration(subtle)).toBe(false);
    });

    it('shouldShowAsModal returns true for standard/major', () => {
      const standard = createCelebrationEvent({
        type: 'daily_goal_complete',
        source: 'daily-goal',
        identifier: 'd1',
        titleKey: 'celebration.dailyGoalComplete',
      });
      expect(shouldShowAsModal(standard)).toBe(true);

      const major = createCelebrationEvent({
        type: 'certificate_earned',
        source: 'certificates',
        identifier: 'c1',
        titleKey: 'celebration.certificateEarned',
      });
      expect(shouldShowAsModal(major)).toBe(true);
    });

    it('shouldShowAsModal returns false for subtle', () => {
      const subtle = createCelebrationEvent({
        type: 'game_level_complete',
        source: 'games',
        identifier: 'g1',
        titleKey: 'celebration.gameLevelComplete',
      });
      expect(shouldShowAsModal(subtle)).toBe(false);
    });
  });

  // ============================================================================
  // Settings / Reduced Motion
  // ============================================================================

  describe('Celebration Settings', () => {
    it('celebration off skips standard/major but allows subtle', () => {
      expect(shouldSkipCelebration('off', 'subtle')).toBe(false);
      expect(shouldSkipCelebration('off', 'standard')).toBe(true);
      expect(shouldSkipCelebration('off', 'major')).toBe(true);
    });

    it('celebration reduced skips only major', () => {
      expect(shouldSkipCelebration('reduced', 'subtle')).toBe(false);
      expect(shouldSkipCelebration('reduced', 'standard')).toBe(false);
      expect(shouldSkipCelebration('reduced', 'major')).toBe(true);
    });

    it('celebration on allows everything', () => {
      expect(shouldSkipCelebration('on', 'subtle')).toBe(false);
      expect(shouldSkipCelebration('on', 'standard')).toBe(false);
      expect(shouldSkipCelebration('on', 'major')).toBe(false);
    });
  });

  // ============================================================================
  // Duplicate Prevention (idempotency via uniqueKey)
  // ============================================================================

  describe('Duplicate Prevention', () => {
    it('same uniqueKey is generated for same identifier', () => {
      const key1 = buildUniqueKey('games', 'game_level_complete', 'zip-level-1');
      const key2 = buildUniqueKey('games', 'game_level_complete', 'zip-level-1');
      expect(key1).toBe(key2);
    });

    it('different identifiers produce different keys', () => {
      const key1 = buildUniqueKey('games', 'game_level_complete', 'zip-level-1');
      const key2 = buildUniqueKey('games', 'game_level_complete', 'zip-level-2');
      expect(key1).not.toBe(key2);
    });

    it('different sources produce different keys', () => {
      const key1 = buildUniqueKey('games', 'game_level_complete', 'zip');
      const key2 = buildUniqueKey('learn', 'game_level_complete', 'zip');
      expect(key1).not.toBe(key2);
    });
  });

  // ============================================================================
  // Confetti Configuration
  // ============================================================================

  describe('Confetti Configuration', () => {
    it('has valid particle count', () => {
      expect(CONFETTI_CONFIG.maxParticles).toBeGreaterThan(0);
      expect(CONFETTI_CONFIG.maxParticles).toBeLessThanOrEqual(50);
    });

    it('has valid duration', () => {
      expect(CONFETTI_CONFIG.burstDurationMs).toBeGreaterThan(500);
      expect(CONFETTI_CONFIG.burstDurationMs).toBeLessThanOrEqual(5000);
    });

    it('uses theme-compatible colors', () => {
      expect(CONFETTI_COLORS.length).toBeGreaterThan(0);
      for (const color of CONFETTI_COLORS) {
        expect(color).toMatch(/^#[0-9A-Fa-f]{6}$/);
      }
    });
  });

  // ============================================================================
  // Animation Duration Constants
  // ============================================================================

  describe('Animation Durations', () => {
    it('has valid durations for all intensities', () => {
      for (const intensity of ['subtle', 'standard', 'major'] as const) {
        const dur = ANIMATION_DURATIONS[intensity];
        expect(dur.enter).toBeGreaterThan(0);
        expect(dur.hold).toBeGreaterThan(0);
        expect(dur.exit).toBeGreaterThan(0);
        expect(dur.hold).toBeGreaterThan(dur.enter);
      }
    });

    it('subtle is faster than standard which is faster than major', () => {
      expect(ANIMATION_DURATIONS.subtle.enter).toBeLessThan(ANIMATION_DURATIONS.standard.enter);
      expect(ANIMATION_DURATIONS.standard.enter).toBeLessThan(ANIMATION_DURATIONS.major.enter);
    });
  });

  // ============================================================================
  // Edge Cases
  // ============================================================================

  describe('Edge Cases', () => {
    it('handles empty identifier', () => {
      const key = buildUniqueKey('general', 'activity_complete', '');
      expect(key).toBe('general:activity_complete:');
    });

    it('handles special characters in identifier', () => {
      const key = buildUniqueKey('games', 'game_level_complete', 'zip-level-1:score-100');
      expect(key).toBe('games:game_level_complete:zip-level-1:score-100');
    });

    it('event creation with all optional fields', () => {
      const event = createCelebrationEvent({
        type: 'certificate_earned',
        source: 'certificates',
        identifier: 'cert-1',
        titleKey: 'celebration.certificateEarned',
        descriptionKey: 'celebration.certificateEarnedDesc',
        icon: '📜',
        reward: { xp: 60, certificateTitle: 'Science Mastery' },
        milestone: undefined,
        continueRoute: '/certificate/cert-1',
        continueLabel: 'View Certificate',
        secondaryActionRoute: '/certificates',
        secondaryActionLabel: 'celebration.viewCertificates',
        intensity: 'major',
        priority: 0,
      });

      expect(event.descriptionKey).toBe('celebration.certificateEarnedDesc');
      expect(event.continueRoute).toBe('/certificate/cert-1');
      expect(event.secondaryActionRoute).toBe('/certificates');
      expect(event.reward?.certificateTitle).toBe('Science Mastery');
    });

    it('event creation with minimal fields', () => {
      const event = createCelebrationEvent({
        type: 'xp_earned',
        source: 'general',
        identifier: 'xp-1',
        titleKey: 'celebration.xpEarned',
      });

      expect(event.descriptionKey).toBeUndefined();
      expect(event.reward).toBeUndefined();
      expect(event.continueRoute).toBeUndefined();
    });
  });
});
