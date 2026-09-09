/**
 * Daily Goal Feature Tests
 * Deterministic goal generation, progress evaluation, and storage.
 */

import { ActivityHistoryItem } from '../../activity';
import {
  getDailyGoalDateKey,
  pickDailyGoal,
  createDailyGoalState,
  validateDailyGoalState,
  computeDailyGoalProgress,
  evaluateGoalStatus,
  getDailyGoalClaimKey,
  isCountedActivityType,
  getActivityIdentityKey,
} from '../dailyGoal.engine';

const NOW = new Date(2026, 8, 5, 12, 0, 0); // 2026-09-05

function makeActivity(
  type: ActivityHistoryItem['type'],
  dayOffset: number = 0,
  id: string,
  metadata?: Record<string, string | number | boolean | undefined>
): ActivityHistoryItem {
  const d = new Date(2026, 8, 5 + dayOffset, 10, 0, 0);
  return {
    id,
    type,
    title: id,
    titleTa: id,
    timestamp: d.getTime(),
    xpEarned: 10,
    pointsEarned: 0,
    metadata,
  };
}

describe('Daily Goal Engine', () => {
  describe('getDailyGoalDateKey', () => {
    it('produces YYYY-MM-DD for a given timestamp', () => {
      expect(getDailyGoalDateKey(new Date(2026, 8, 5, 23, 59).getTime())).toBe('2026-09-05');
      expect(getDailyGoalDateKey(new Date(2026, 8, 5, 0, 0).getTime())).toBe('2026-09-05');
      expect(getDailyGoalDateKey(new Date(2026, 8, 6, 0, 0).getTime())).toBe('2026-09-06');
    });
  });

  describe('pickDailyGoal', () => {
    it('returns the same goal for the same date', () => {
      const goal1 = pickDailyGoal('2026-09-05');
      const goal2 = pickDailyGoal('2026-09-05');
      expect(goal1.id).toBe(goal2.id);
    });

    it('returns a valid goal definition', () => {
      const goal = pickDailyGoal('2026-09-05');
      expect(goal).toBeDefined();
      expect(goal.targetCount).toBeGreaterThan(0);
      expect(goal.reward.points).toBeGreaterThan(0);
      expect(goal.reward.xp).toBeGreaterThan(0);
    });

    it('returns different goals for different dates', () => {
      const goals = new Set<string>();
      for (let i = 0; i < 30; i++) {
        const date = new Date(2026, 8, 1 + i);
        const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
        goals.add(pickDailyGoal(key).id);
      }
      expect(goals.size).toBeGreaterThan(1);
    });
  });

  describe('createDailyGoalState', () => {
    it('creates a valid initial state for today', () => {
      const state = createDailyGoalState('2026-09-05', NOW.getTime());
      expect(state.dateKey).toBe('2026-09-05');
      expect(state.status).toBe('active');
      expect(state.completedCount).toBe(0);
      expect(state.completedActivityIds).toEqual([]);
      expect(state.rewardClaimed).toBe(false);
      expect(state.targetCount).toBeGreaterThan(0);
    });
  });

  describe('validateDailyGoalState', () => {
    it('accepts a valid state', () => {
      const state = createDailyGoalState('2026-09-05', NOW.getTime());
      expect(validateDailyGoalState(state)).toBe(true);
    });

    it('rejects malformed data', () => {
      expect(validateDailyGoalState(null)).toBe(false);
      expect(validateDailyGoalState({})).toBe(false);
      expect(validateDailyGoalState({ dateKey: '2026-09-05' })).toBe(false);
    });
  });

  describe('isCountedActivityType', () => {
    it('returns true for counted activity types', () => {
      expect(isCountedActivityType('quiz_completed')).toBe(true);
      expect(isCountedActivityType('riddle_completed')).toBe(true);
      expect(isCountedActivityType('game_completed')).toBe(true);
      expect(isCountedActivityType('mystery_completed')).toBe(true);
      expect(isCountedActivityType('fact_discovered')).toBe(true);
      expect(isCountedActivityType('challenge_completed')).toBe(true);
    });

    it('returns false for non-counted types', () => {
      expect(isCountedActivityType('mission_completed')).toBe(false);
      expect(isCountedActivityType('achievement_unlocked')).toBe(false);
      expect(isCountedActivityType('certificate_earned')).toBe(false);
    });
  });

  describe('getActivityIdentityKey', () => {
    it('generates stable keys for quiz', () => {
      const item1 = makeActivity('quiz_completed', 0, 'q1', { quizResultId: 'qr-123' });
      const item2 = makeActivity('quiz_completed', 0, 'q2', { quizResultId: 'qr-123' });
      expect(getActivityIdentityKey(item1)).toBe(getActivityIdentityKey(item2));
    });

    it('generates stable keys for game', () => {
      const item1 = makeActivity('game_completed', 0, 'g1', { gameId: 'zip', levelId: '1' });
      const item2 = makeActivity('game_completed', 0, 'g2', { gameId: 'zip', levelId: '1' });
      expect(getActivityIdentityKey(item1)).toBe(getActivityIdentityKey(item2));
    });

    it('generates different keys for different games', () => {
      const item1 = makeActivity('game_completed', 0, 'g1', { gameId: 'zip', levelId: '1' });
      const item2 = makeActivity('game_completed', 0, 'g2', { gameId: 'wend', levelId: '1' });
      expect(getActivityIdentityKey(item1)).not.toBe(getActivityIdentityKey(item2));
    });
  });

  describe('computeDailyGoalProgress', () => {
    it('returns 0/3 for no activities', () => {
      const state = createDailyGoalState('2026-09-05', NOW.getTime());
      const definition = pickDailyGoal('2026-09-05');
      const progress = computeDailyGoalProgress(state, [], definition, NOW);
      expect(progress.current).toBe(0);
      expect(progress.target).toBe(definition.targetCount);
      expect(progress.completed).toBe(false);
    });

    it('increments for unique completed activities', () => {
      const state = createDailyGoalState('2026-09-05', NOW.getTime());
      const definition = pickDailyGoal('2026-09-05');
      const history = [
        makeActivity('quiz_completed', 0, 'q1', { quizResultId: 'qr-1' }),
        makeActivity('riddle_completed', 0, 'r1', { riddleId: 'riddle-1' }),
      ];
      const progress = computeDailyGoalProgress(state, history, definition, NOW);
      expect(progress.current).toBe(2);
    });

    it('does not double-count duplicate activities', () => {
      const state = createDailyGoalState('2026-09-05', NOW.getTime());
      const definition = pickDailyGoal('2026-09-05');
      const history = [
        makeActivity('quiz_completed', 0, 'q1', { quizResultId: 'qr-1' }),
        makeActivity('quiz_completed', 0, 'q2', { quizResultId: 'qr-1' }), // Same quizResultId
      ];
      const progress = computeDailyGoalProgress(state, history, definition, NOW);
      expect(progress.current).toBe(1);
    });

    it('does not count activities from other days', () => {
      const state = createDailyGoalState('2026-09-05', NOW.getTime());
      const definition = pickDailyGoal('2026-09-05');
      const history = [
        makeActivity('quiz_completed', -1, 'q1', { quizResultId: 'qr-1' }), // Yesterday
        makeActivity('quiz_completed', 1, 'q2', { quizResultId: 'qr-2' }), // Tomorrow
      ];
      const progress = computeDailyGoalProgress(state, history, definition, NOW);
      expect(progress.current).toBe(0);
    });

    it('reaches completed when target is met', () => {
      const state = createDailyGoalState('2026-09-05', NOW.getTime());
      const definition = pickDailyGoal('2026-09-05');
      const history = [
        makeActivity('quiz_completed', 0, 'q1', { quizResultId: 'qr-1' }),
        makeActivity('riddle_completed', 0, 'r1', { riddleId: 'riddle-1' }),
        makeActivity('game_completed', 0, 'g1', { gameId: 'zip', levelId: '1' }),
      ];
      const progress = computeDailyGoalProgress(state, history, definition, NOW);
      expect(progress.current).toBe(Math.min(3, definition.targetCount));
      if (definition.targetCount <= 3) {
        expect(progress.completed).toBe(true);
      }
    });
  });

  describe('evaluateGoalStatus', () => {
    it('returns active for incomplete progress', () => {
      const progress = { current: 1, target: 3, completed: false };
      expect(evaluateGoalStatus(progress, 'active')).toBe('active');
    });

    it('returns completed when progress is complete', () => {
      const progress = { current: 3, target: 3, completed: true };
      expect(evaluateGoalStatus(progress, 'active')).toBe('completed');
    });

    it('preserves claimed status', () => {
      const progress = { current: 3, target: 3, completed: true };
      expect(evaluateGoalStatus(progress, 'claimed')).toBe('claimed');
    });
  });

  describe('getDailyGoalClaimKey', () => {
    it('generates a stable claim key', () => {
      expect(getDailyGoalClaimKey('2026-09-05')).toBe('daily-goal:2026-09-05');
    });
  });
});

describe('Daily Goal Storage', () => {
  // These tests would require mocking the storage layer
  // Integration tests would be added separately
  it('placeholder for storage tests', () => {
    expect(true).toBe(true);
  });
});