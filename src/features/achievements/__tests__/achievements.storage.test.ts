/**
 * Unit & Integration Tests for Achievements Storage (Phase 44)
 * Validates:
 * - Live context building from quiz, games, streak, and activity
 * - Persistence of unlocked achievements
 * - Prevention of duplicate XP rewards & notifications
 * - Safe recovery from corrupt storage
 */

import {
  getUnlockedAchievements,
  persistUnlockedAchievements,
  buildEvaluationContext,
  evaluateAndSyncAchievements,
  recomputeAndPersistAchievements,
} from '../achievements.storage';
import { storage } from '../../../storage/asyncStorage';
import { getQuizHistory, getQuizStats, QuizHistoryEntry, QuizStats } from '../../quiz';
import { getAllGamesProgress } from '../../games';
import { StreakService } from '../../streaks';
import { recordActivity, getActivityHistory } from '../../activity';
import { createNotification } from '../../notifications/notifications.factory';

jest.mock('../../../storage/asyncStorage', () => ({
  storage: {
    getItem: jest.fn(),
    setItem: jest.fn(),
  },
  STORAGE_KEYS: {
    ACHIEVEMENTS_UNLOCKED: 'achievements_unlocked',
  },
}));

jest.mock('../../quiz', () => ({
  getQuizHistory: jest.fn(),
  getQuizStats: jest.fn(),
}));

jest.mock('../../games', () => ({
  getAllGamesProgress: jest.fn(),
}));

jest.mock('../../streaks', () => ({
  StreakService: {
    getUnifiedStreak: jest.fn(),
  },
}));

jest.mock('../../activity', () => ({
  recordActivity: jest.fn(),
  getActivityHistory: jest.fn(),
}));

jest.mock('../../notifications/notifications.factory', () => ({
  createNotification: jest.fn(),
}));

function createMockQuizEntry(overrides: Partial<QuizHistoryEntry> = {}): QuizHistoryEntry {
  return {
    id: 'quiz-1',
    levelId: 'lvl-1',
    subjectId: 'physics',
    pathwayId: 'forces',
    difficulty: 'beginner',
    totalQuestions: 10,
    correctAnswers: 10,
    wrongAnswers: 0,
    unansweredQuestions: 0,
    score: 100,
    percentage: 100,
    bestStreak: 10,
    completedAt: 1700000000000,
    ...overrides,
  };
}

function createMockQuizStats(overrides: Partial<QuizStats> = {}): QuizStats {
  return {
    totalPoints: 100,
    quizzesCompleted: 1,
    totalQuestionsAttempted: 10,
    totalCorrectAnswers: 10,
    overallAccuracy: 100,
    currentStreakDays: 1,
    longestStreakDays: 1,
    streakHistory: ['2026-03-06'],
    subjectStats: [],
    ...overrides,
  };
}

describe('Achievements Storage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getUnlockedAchievements', () => {
    it('returns empty object when storage is empty', async () => {
      (storage.getItem as jest.Mock).mockResolvedValue(null);
      const result = await getUnlockedAchievements();
      expect(result).toEqual({});
    });

    it('returns stored achievements map', async () => {
      const mockData = {
        'first-quiz': 1700000000000,
      };
      (storage.getItem as jest.Mock).mockResolvedValue(mockData);
      const result = await getUnlockedAchievements();
      expect(result).toEqual(mockData);
    });

    it('recovers gracefully from corrupt storage', async () => {
      (storage.getItem as jest.Mock).mockRejectedValue(new Error('Corrupt storage'));
      const result = await getUnlockedAchievements();
      expect(result).toEqual({});
    });
  });

  describe('persistUnlockedAchievements', () => {
    it('saves map to storage and returns unlocked list', async () => {
      (storage.getItem as jest.Mock).mockResolvedValue({});
      (storage.setItem as jest.Mock).mockResolvedValue(true);
      (recordActivity as jest.Mock).mockResolvedValue(true);
      (createNotification as jest.Mock).mockResolvedValue(true);

      const result = await persistUnlockedAchievements(['first-quiz'], 1700000000000);
      expect(result.length).toBe(1);
      expect(result[0].badgeId).toBe('first-quiz');
      expect(result[0].unlockedAt).toBe(1700000000000);
      expect(storage.setItem).toHaveBeenCalledWith(
        'achievements_unlocked',
        expect.objectContaining({ 'first-quiz': 1700000000000 })
      );
      expect(recordActivity).toHaveBeenCalledWith(
        expect.objectContaining({ type: 'achievement_unlocked' })
      );
      expect(createNotification).toHaveBeenCalled();
    });
  });

  describe('buildEvaluationContext', () => {
    it('aggregates quiz, games, streak, and activity data accurately', async () => {
      (getActivityHistory as jest.Mock).mockResolvedValue([
        { type: 'micro_lesson_completed', metadata: { subjectId: 'physics' } },
        { type: 'concept_map_completed', metadata: { subjectId: 'chemistry' } },
        { type: 'riddle_completed' },
      ]);
      (getQuizHistory as jest.Mock).mockResolvedValue([
        createMockQuizEntry({ id: 'q1' }),
      ]);
      (getQuizStats as jest.Mock).mockResolvedValue(
        createMockQuizStats({
          quizzesCompleted: 1,
          currentStreakDays: 5,
          longestStreakDays: 7,
        })
      );
      (getAllGamesProgress as jest.Mock).mockResolvedValue({
        game1: {
          levels: {
            'lvl-1': { completed: true },
          },
        },
      });
      (StreakService.getUnifiedStreak as jest.Mock).mockResolvedValue({
        currentStreak: 5,
        longestStreak: 7,
        totalActiveDays: 10,
        activeDates: ['2026-03-05', '2026-03-06'],
      });

      const ctx = await buildEvaluationContext();
      expect(ctx.quizHistory.length).toBe(1);
      expect(ctx.streakInfo.currentStreak).toBe(5);
      expect(ctx.gamesPlayedCount).toBe(1);
      expect(ctx.microLessonsCompletedCount).toBe(1);
      expect(ctx.conceptMapsCompletedCount).toBe(1);
      expect(ctx.riddlesSolvedCount).toBe(1);
    });
  });

  describe('evaluateAndSyncAchievements', () => {
    it('awards new achievements, writes to storage, and fires notifications without duplicate triggers', async () => {
      (storage.getItem as jest.Mock).mockImplementation((key) => {
        if (key === 'achievements_unlocked') return Promise.resolve({});
        return Promise.resolve(null);
      });
      (storage.setItem as jest.Mock).mockResolvedValue(true);
      (getActivityHistory as jest.Mock).mockResolvedValue([]);
      (getQuizHistory as jest.Mock).mockResolvedValue([
        createMockQuizEntry({ id: 'q1' }),
      ]);
      (getQuizStats as jest.Mock).mockResolvedValue(
        createMockQuizStats({
          quizzesCompleted: 1,
          currentStreakDays: 1,
          longestStreakDays: 1,
        })
      );
      (getAllGamesProgress as jest.Mock).mockResolvedValue({});
      (StreakService.getUnifiedStreak as jest.Mock).mockResolvedValue({
        currentStreak: 1,
        longestStreak: 1,
        totalActiveDays: 1,
        activeDates: ['2026-03-06'],
      });
      (recordActivity as jest.Mock).mockResolvedValue(true);
      (createNotification as jest.Mock).mockResolvedValue(true);

      const result = await evaluateAndSyncAchievements();
      expect(result.achievements.length).toBe(43);

      const firstQuiz = result.achievements.find((a) => a.id === 'first-quiz');
      expect(firstQuiz?.status).toBe('unlocked');
      expect(createNotification).toHaveBeenCalled();
      expect(recordActivity).toHaveBeenCalledWith(
        expect.objectContaining({ type: 'achievement_unlocked' })
      );

      // Reset mocks to test duplicate prevention
      jest.clearAllMocks();
      (storage.getItem as jest.Mock).mockImplementation((key) => {
        if (key === 'achievements_unlocked') {
          return Promise.resolve({
            'first-quiz': 1700000000000,
            'perfect-score': 1700000000000,
            'first-step': 1700000000000,
          });
        }
        return Promise.resolve(null);
      });

      await evaluateAndSyncAchievements();
      expect(createNotification).not.toHaveBeenCalled();
      expect(recordActivity).not.toHaveBeenCalled();
    });
  });

  describe('recomputeAndPersistAchievements (Legacy Adapter)', () => {
    it('maintains backwards compatibility for legacy callers', async () => {
      (storage.getItem as jest.Mock).mockResolvedValue({});
      (storage.setItem as jest.Mock).mockResolvedValue(true);
      (recordActivity as jest.Mock).mockResolvedValue(true);
      (createNotification as jest.Mock).mockResolvedValue(true);

      const legacyUnlocks = await recomputeAndPersistAchievements({
        quizHistory: [
          createMockQuizEntry({ id: 'q1' }),
        ],
        quizStats: createMockQuizStats({
          quizzesCompleted: 1,
          currentStreakDays: 1,
          longestStreakDays: 1,
        }),
        gamesPlayedCount: 1,
        totalLevelsCleared: 3,
      });

      expect(Array.isArray(legacyUnlocks)).toBe(true);
      const firstQuiz = legacyUnlocks.find((u) => u.badgeId === 'first-quiz');
      expect(firstQuiz).toBeDefined();
    });
  });
});
