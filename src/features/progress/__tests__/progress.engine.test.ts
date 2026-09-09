/**
 * Unit Tests for Progress Pure Engine
 * Verifies calculation accuracy, coverage, trend, topic status,
 * subject progress, and strength levels.
 */

import {
  calculateAccuracy,
  calculateActivityCoverage,
  calculateRecentAccuracy,
  calculateStrengthLevel,
  calculateSubjectProgress,
  calculateTopicProgress,
  calculateTopicStatus,
  calculateTrend,
} from '../progress.engine';
import { TopicProgress } from '../progress.types';

describe('Progress Engine — calculateAccuracy', () => {
  it('handles standard fractions correctly', () => {
    expect(calculateAccuracy(1, 1)).toBe(100);
    expect(calculateAccuracy(1, 2)).toBe(50);
    expect(calculateAccuracy(3, 5)).toBe(60);
    expect(calculateAccuracy(8, 10)).toBe(80);
    expect(calculateAccuracy(10, 10)).toBe(100);
  });

  it('safely handles 0 attempts and 0 correct without NaN or Infinity', () => {
    expect(calculateAccuracy(0, 0)).toBe(0);
    expect(Number.isFinite(calculateAccuracy(0, 0))).toBe(true);
    expect(calculateAccuracy(0, 10)).toBe(0);
  });

  it('safely handles invalid, negative, or infinite values', () => {
    expect(calculateAccuracy(-1, 5)).toBe(0);
    expect(calculateAccuracy(5, -1)).toBe(0);
    expect(calculateAccuracy(NaN, 10)).toBe(0);
    expect(calculateAccuracy(5, NaN)).toBe(0);
    expect(calculateAccuracy(Infinity, 10)).toBe(0);
    expect(calculateAccuracy(5, Infinity)).toBe(0);
  });

  it('bounds correct to not exceed attempts', () => {
    expect(calculateAccuracy(12, 10)).toBe(100);
  });
});

describe('Progress Engine — calculateActivityCoverage', () => {
  it('calculates rounded percentages correctly', () => {
    // Section 84 example: 8 explored / 12 topics -> 67%
    expect(calculateActivityCoverage(8, 12)).toBe(67);
    expect(calculateActivityCoverage(0, 12)).toBe(0);
    expect(calculateActivityCoverage(12, 12)).toBe(100);
    expect(calculateActivityCoverage(1, 3)).toBe(33);
    expect(calculateActivityCoverage(2, 3)).toBe(67);
  });

  it('handles zero or negative total safely', () => {
    expect(calculateActivityCoverage(5, 0)).toBe(0);
    expect(calculateActivityCoverage(0, 0)).toBe(0);
    expect(calculateActivityCoverage(-1, 5)).toBe(0);
  });
});

describe('Progress Engine — calculateRecentAccuracy', () => {
  it('computes accuracy over the last window of attempts', () => {
    const results = [false, false, true, true, true, true, true];
    // Window = 5 takes the last 5: all true -> 100%
    const res = calculateRecentAccuracy(results, 5);
    expect(res.attempts).toBe(5);
    expect(res.accuracy).toBe(100);
  });

  it('handles smaller lists than window', () => {
    const results = [true, false];
    const res = calculateRecentAccuracy(results, 5);
    expect(res.attempts).toBe(2);
    expect(res.accuracy).toBe(50);
  });

  it('handles empty results safely', () => {
    const res = calculateRecentAccuracy([], 5);
    expect(res.attempts).toBe(0);
    expect(res.accuracy).toBe(0);
  });
});

describe('Progress Engine — calculateTrend', () => {
  it('returns insufficientData when attempts are below threshold', () => {
    expect(calculateTrend([true, true, true], 4)).toBe('insufficientData');
    expect(calculateTrend([], 4)).toBe('insufficientData');
  });

  it('detects improving performance', () => {
    // Before: 0/2 = 0%, After: 2/2 = 100% -> +100% diff -> improving
    const history = [false, false, true, true];
    expect(calculateTrend(history, 4)).toBe('improving');
  });

  it('detects declining performance', () => {
    // Before: 2/2 = 100%, After: 0/2 = 0% -> declining
    const history = [true, true, false, false];
    expect(calculateTrend(history, 4)).toBe('declining');
  });

  it('detects stable performance', () => {
    // Consistent 50% on both sides
    const history = [true, false, true, false];
    expect(calculateTrend(history, 4)).toBe('stable');
  });
});

describe('Progress Engine — calculateTopicProgress', () => {
  it('returns pure activity coverage if no quiz attempts exist', () => {
    expect(calculateTopicProgress({ completed: 2, total: 2 })).toBe(100);
    expect(calculateTopicProgress({ completed: 1, total: 2 })).toBe(50);
    expect(calculateTopicProgress({ completed: 0, total: 2 })).toBe(0);
  });

  it('blends activity coverage and question accuracy when attempts exist', () => {
    // 100% activity coverage + 80% accuracy -> 55 + 36 = 91%
    const progress = calculateTopicProgress(
      { completed: 2, total: 2 },
      { attempts: 10, correct: 8 }
    );
    expect(progress).toBe(91);
  });
});

describe('Progress Engine — calculateTopicStatus', () => {
  it('evaluates not_started when no attempts and no progress', () => {
    const status = calculateTopicStatus({
      progressPercent: 0,
      attempts: 0,
      accuracy: 0,
      trend: 'insufficientData',
      isFocusArea: false,
    });
    expect(status).toBe('not_started');
  });

  it('evaluates focus_area when marked as focus area or low accuracy with >= 3 attempts', () => {
    const status1 = calculateTopicStatus({
      progressPercent: 40,
      attempts: 5,
      accuracy: 40,
      trend: 'declining',
      isFocusArea: true,
    });
    expect(status1).toBe('focus_area');

    const status2 = calculateTopicStatus({
      progressPercent: 40,
      attempts: 4,
      accuracy: 50,
      trend: 'stable',
      isFocusArea: false,
    });
    expect(status2).toBe('focus_area');
  });

  it('evaluates strong when accuracy is >= 80% and attempts >= 3', () => {
    const status = calculateTopicStatus({
      progressPercent: 90,
      attempts: 5,
      accuracy: 85,
      trend: 'stable',
      isFocusArea: false,
    });
    expect(status).toBe('strong');
  });

  it('evaluates improving when trend is improving with attempts >= 2', () => {
    const status = calculateTopicStatus({
      progressPercent: 60,
      attempts: 4,
      accuracy: 70,
      trend: 'improving',
      isFocusArea: false,
    });
    expect(status).toBe('improving');
  });

  it('evaluates completed when progress is 100%', () => {
    const status = calculateTopicStatus({
      progressPercent: 100,
      attempts: 5,
      accuracy: 80,
      trend: 'stable',
      isFocusArea: false,
      completedAllActivities: true,
    });
    expect(status).toBe('completed');
  });

  it('evaluates in_progress when progress > 20% or attempts >= 2', () => {
    const status = calculateTopicStatus({
      progressPercent: 30,
      attempts: 1,
      accuracy: 70,
      trend: 'insufficientData',
      isFocusArea: false,
    });
    expect(status).toBe('in_progress');
  });

  it('evaluates exploring for touched/initial items', () => {
    const status = calculateTopicStatus({
      progressPercent: 15,
      attempts: 1,
      accuracy: 100,
      trend: 'insufficientData',
      isFocusArea: false,
    });
    expect(status).toBe('exploring');
  });
});

describe('Progress Engine — calculateSubjectProgress', () => {
  it('returns 0 when no topics are started and no activities completed', () => {
    const mockTopics: TopicProgress[] = [
      {
        topicId: 't1',
        subjectId: 'physics',
        title: 'Force',
        progressPercent: 0,
        attempts: 0,
        correct: 0,
        incorrect: 0,
        accuracy: 0,
        recentAccuracy: 0,
        status: 'not_started',
        trend: 'insufficientData',
        lastActivityAt: null,
      },
    ];
    expect(calculateSubjectProgress(mockTopics, 0, 5)).toBe(0);
  });

  it('calculates blended progress from topic progress and activity coverage', () => {
    const mockTopics: TopicProgress[] = [
      {
        topicId: 't1',
        subjectId: 'physics',
        title: 'Force',
        progressPercent: 80,
        attempts: 5,
        correct: 4,
        incorrect: 1,
        accuracy: 80,
        recentAccuracy: 80,
        status: 'strong',
        trend: 'stable',
        lastActivityAt: Date.now(),
      },
      {
        topicId: 't2',
        subjectId: 'physics',
        title: 'Light',
        progressPercent: 60,
        attempts: 4,
        correct: 3,
        incorrect: 1,
        accuracy: 75,
        recentAccuracy: 75,
        status: 'in_progress',
        trend: 'stable',
        lastActivityAt: Date.now(),
      },
    ];

    // Avg topic progress = (80 + 60) / 2 = 70.
    // 3 completed out of 4 activities = 75% coverage.
    // 70 * 0.65 + 75 * 0.35 = 45.5 + 26.25 = 71.75 -> 72%
    expect(calculateSubjectProgress(mockTopics, 3, 4)).toBe(72);
  });
});

describe('Progress Engine — calculateStrengthLevel', () => {
  it('returns advanced for high progress, high accuracy, and strong completion', () => {
    expect(calculateStrengthLevel(85, 80, 4, 6)).toBe('advanced');
  });

  it('returns strong for solid progress and accuracy', () => {
    expect(calculateStrengthLevel(68, 72, 1, 6)).toBe('strong');
  });

  it('returns developing for moderate progress', () => {
    expect(calculateStrengthLevel(35, 60, 1, 6)).toBe('developing');
  });

  it('returns exploring for early or minimal progress', () => {
    expect(calculateStrengthLevel(10, 0, 0, 6)).toBe('exploring');
  });
});
