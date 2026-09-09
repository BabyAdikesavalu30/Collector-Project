/**
 * Unit tests for Weak Areas Pure Engine
 * Validates deterministic calculations: accuracy, sample size, trend,
 * confidence, priority, and focus-area selection.
 */

import {
  calculateAccuracy,
  calculateRecentAccuracy,
  calculateConfidence,
  calculateFocusPriority,
  calculateTrend,
  getFocusStatus,
  hasEnoughEvidence,
  selectFocusAreas,
} from '../weakAreas.engine';
import {
  DEFAULT_FOCUS_AREA_CONFIG,
  TopicPerformance,
} from '../weakAreas.types';

describe('Weak Areas Pure Engine', () => {
  describe('calculateAccuracy (Section 75)', () => {
    it('returns 0 for 0/0 without NaN or Infinity', () => {
      expect(calculateAccuracy(0, 0)).toBe(0);
      expect(Number.isFinite(calculateAccuracy(0, 0))).toBe(true);
    });

    it('handles exact target ratios from Section 75', () => {
      expect(calculateAccuracy(1, 1)).toBe(100);
      expect(calculateAccuracy(1, 2)).toBe(50);
      expect(calculateAccuracy(3, 5)).toBe(60);
      expect(calculateAccuracy(8, 10)).toBe(80);
      expect(calculateAccuracy(10, 10)).toBe(100);
    });

    it('bounds accuracy strictly between 0 and 100', () => {
      // Correct exceeding attempts is clamped
      expect(calculateAccuracy(15, 10)).toBe(100);
      // Negative values return 0
      expect(calculateAccuracy(-2, 5)).toBe(0);
      expect(calculateAccuracy(2, -5)).toBe(0);
      // Non-finite values return 0
      expect(calculateAccuracy(NaN, 5)).toBe(0);
      expect(calculateAccuracy(3, Infinity)).toBe(0);
    });
  });

  describe('calculateRecentAccuracy (Section 9 & 58)', () => {
    it('returns 0 accuracy and 0 attempts for empty history or invalid window', () => {
      expect(calculateRecentAccuracy([], 5)).toEqual({ accuracy: 0, attempts: 0 });
      expect(calculateRecentAccuracy([true, false], 0)).toEqual({ accuracy: 0, attempts: 0 });
      expect(calculateRecentAccuracy([true, false], -1)).toEqual({ accuracy: 0, attempts: 0 });
    });

    it('slices the most recent attempts in chronological order', () => {
      // 8 attempts: first 3 correct, next 5 mixed [false, false, true, false, true] (2/5 = 40%)
      const history = [true, true, true, false, false, true, false, true];
      const recent = calculateRecentAccuracy(history, 5);
      expect(recent.attempts).toBe(5);
      expect(recent.accuracy).toBe(40);
    });

    it('uses entire history if history length is less than window', () => {
      const history = [false, true, true];
      const recent = calculateRecentAccuracy(history, 5);
      expect(recent.attempts).toBe(3);
      expect(recent.accuracy).toBe(67);
    });
  });

  describe('sample size threshold (Section 76)', () => {
    const config = DEFAULT_FOCUS_AREA_CONFIG; // minimumAttempts = 3

    it('verifies insufficient attempts below threshold', () => {
      expect(hasEnoughEvidence(0, config)).toBe(false);
      expect(hasEnoughEvidence(1, config)).toBe(false);
      expect(hasEnoughEvidence(2, config)).toBe(false);
    });

    it('verifies threshold and sufficient attempts', () => {
      expect(hasEnoughEvidence(3, config)).toBe(true);
      expect(hasEnoughEvidence(5, config)).toBe(true);
      expect(hasEnoughEvidence(10, config)).toBe(true);
    });

    it('handles non-integer and edge values safely', () => {
      expect(hasEnoughEvidence(NaN, config)).toBe(false);
      expect(hasEnoughEvidence(-1, config)).toBe(false);
      expect(hasEnoughEvidence(2.9, config)).toBe(false);
      expect(hasEnoughEvidence(3.1, config)).toBe(true);
    });
  });

  describe('calculateTrend (Section 77)', () => {
    const minTrend = 4;

    it('returns insufficientData when total attempts is below minimumTrendAttempts', () => {
      expect(calculateTrend([], minTrend)).toBe('insufficientData');
      expect(calculateTrend([false], minTrend)).toBe('insufficientData');
      expect(calculateTrend([false, true], minTrend)).toBe('insufficientData');
      expect(calculateTrend([false, true, false], minTrend)).toBe('insufficientData');
    });

    it('detects improving trend when recent accuracy materially exceeds prior accuracy', () => {
      // Earlier: [false, false] (0%), Later: [true, true] (100%)
      const results = [false, false, true, true];
      expect(calculateTrend(results, minTrend)).toBe('improving');
    });

    it('detects declining trend when recent accuracy drops below prior accuracy', () => {
      // Earlier: [true, true] (100%), Later: [false, false] (0%)
      const results = [true, true, false, false];
      expect(calculateTrend(results, minTrend)).toBe('declining');
    });

    it('detects stable trend when past and recent performance are within margin', () => {
      // Earlier: [true, false] (50%), Later: [false, true] (50%)
      const results = [true, false, false, true];
      expect(calculateTrend(results, minTrend)).toBe('stable');
    });
  });

  describe('calculateConfidence (Section 10)', () => {
    it('returns 0 for 0 attempts', () => {
      const perf: TopicPerformance = {
        topicId: 'lesson:light',
        subjectId: 'physics',
        attempts: 0,
        correct: 0,
        incorrect: 0,
        accuracy: 0,
        recentAccuracy: 0,
        lastActivityAt: null,
        streak: 0,
        sourceTypes: [],
        recentAttempts: 0,
        orderedResults: [],
        priority: 0,
      };
      expect(calculateConfidence(perf)).toBe(0);
    });

    it('calculates practice confidence bounded 0-100 without extreme claims', () => {
      const perf: TopicPerformance = {
        topicId: 'lesson:light',
        subjectId: 'physics',
        attempts: 5,
        correct: 3,
        incorrect: 2,
        accuracy: 60,
        recentAccuracy: 60,
        lastActivityAt: Date.now(),
        streak: 1,
        sourceTypes: ['quiz'],
        recentAttempts: 5,
        orderedResults: [false, true, false, true, true],
        priority: 0,
      };
      const conf = calculateConfidence(perf);
      expect(conf).toBeGreaterThanOrEqual(0);
      expect(conf).toBeLessThanOrEqual(100);
      // With 60% accuracy and fresh activity, confidence should be near 60
      expect(conf).toBeCloseTo(60, -1);
    });
  });

  describe('calculateFocusPriority (Section 78)', () => {
    it('orders topics deterministically: lower accuracy and strong evidence ranks higher', () => {
      // Topic A: 40% accuracy, 8 attempts
      const topicA: TopicPerformance = {
        topicId: 'lesson:topicA',
        subjectId: 'physics',
        attempts: 8,
        correct: 3,
        incorrect: 5,
        accuracy: 38,
        recentAccuracy: 40,
        lastActivityAt: Date.now(),
        streak: 0,
        sourceTypes: ['quiz'],
        recentAttempts: 5,
        orderedResults: [false, false, true, false, true, false, false, true],
        priority: 0,
      };

      // Topic B: 60% accuracy, 3 attempts
      const topicB: TopicPerformance = {
        topicId: 'lesson:topicB',
        subjectId: 'chemistry',
        attempts: 3,
        correct: 2,
        incorrect: 1,
        accuracy: 67,
        recentAccuracy: 67,
        lastActivityAt: Date.now(),
        streak: 1,
        sourceTypes: ['quiz'],
        recentAttempts: 3,
        orderedResults: [false, true, true],
        priority: 0,
      };

      const prioA = calculateFocusPriority(topicA, DEFAULT_FOCUS_AREA_CONFIG);
      const prioB = calculateFocusPriority(topicB, DEFAULT_FOCUS_AREA_CONFIG);

      // Topic A has a higher accuracy deficit and more evidence, so it should rank higher
      expect(prioA).toBeGreaterThan(prioB);
    });

    it('returns 0 for 0 attempts', () => {
      const empty: TopicPerformance = {
        topicId: 'lesson:none',
        subjectId: 'biology',
        attempts: 0,
        correct: 0,
        incorrect: 0,
        accuracy: 0,
        recentAccuracy: 0,
        lastActivityAt: null,
        streak: 0,
        sourceTypes: [],
        recentAttempts: 0,
        orderedResults: [],
        priority: 0,
      };
      expect(calculateFocusPriority(empty, DEFAULT_FOCUS_AREA_CONFIG)).toBe(0);
    });
  });

  describe('getFocusStatus (Section 44)', () => {
    const config = DEFAULT_FOCUS_AREA_CONFIG;

    it('categorizes low confidence into needsPractice', () => {
      expect(getFocusStatus(40, config)).toBe('needsPractice');
      expect(getFocusStatus(50, config)).toBe('needsPractice');
    });

    it('categorizes moderate confidence into buildConfidence', () => {
      expect(getFocusStatus(51, config)).toBe('buildConfidence');
      expect(getFocusStatus(70, config)).toBe('buildConfidence');
      expect(getFocusStatus(84, config)).toBe('buildConfidence');
    });

    it('categorizes high confidence into practiceSuggested', () => {
      expect(getFocusStatus(85, config)).toBe('practiceSuggested');
      expect(getFocusStatus(95, config)).toBe('practiceSuggested');
    });
  });

  describe('selectFocusAreas (Section 12)', () => {
    it('excludes topics with insufficient evidence (< 3 attempts)', () => {
      const perfs: TopicPerformance[] = [
        {
          topicId: 'lesson:1',
          subjectId: 'physics',
          attempts: 2,
          correct: 0,
          incorrect: 2,
          accuracy: 0,
          recentAccuracy: 0,
          lastActivityAt: Date.now(),
          streak: 0,
          sourceTypes: ['quiz'],
          recentAttempts: 2,
          orderedResults: [false, false],
          priority: 80,
        },
      ];
      const selected = selectFocusAreas(perfs, DEFAULT_FOCUS_AREA_CONFIG);
      expect(selected).toHaveLength(0);
    });

    it('caps output at maxFocusAreas (5) ordered by descending priority', () => {
      const perfs: TopicPerformance[] = Array.from({ length: 8 }, (_, i) => ({
        topicId: `lesson:${i}`,
        subjectId: 'physics',
        attempts: 5,
        correct: 2,
        incorrect: 3,
        accuracy: 40,
        recentAccuracy: 40,
        lastActivityAt: Date.now(),
        streak: 0,
        sourceTypes: ['quiz'],
        recentAttempts: 5,
        orderedResults: [false, false, true, false, true],
        priority: (i + 1) * 10,
      }));

      const selected = selectFocusAreas(perfs, DEFAULT_FOCUS_AREA_CONFIG);
      expect(selected).toHaveLength(5);
      // Top item should have highest priority
      expect(selected[0].priority).toBe(80);
      expect(selected[4].priority).toBe(40);
    });
  });
});
