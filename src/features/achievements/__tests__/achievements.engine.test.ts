/**
 * Unit Tests for Achievements Engine (Phase 44)
 * Validates:
 * - 43 badge definitions uniqueness & completeness
 * - Legacy IDs backward compatibility
 * - Criteria evaluation math & edge cases
 * - Status transitions (locked, in_progress, unlocked)
 * - Spotlight selection (selectNextAchievement)
 * - Filtering and Summary calculation
 */

import {
  ACHIEVEMENT_DEFINITIONS,
  calculateAchievementProgress,
  evaluateAllAchievements,
  selectNextAchievement,
  getRecentUnlocks,
  filterAchievements,
  calculateAchievementSummary,
} from '../achievements.engine';
import {
  Achievement,
  AchievementBadgeId,
  AchievementEvaluationContext,
} from '../achievements.types';
import { QuizHistoryEntry, QuizStats } from '../../quiz';

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
    totalPoints: 0,
    quizzesCompleted: 0,
    totalQuestionsAttempted: 0,
    totalCorrectAnswers: 0,
    overallAccuracy: 0,
    currentStreakDays: 0,
    longestStreakDays: 0,
    streakHistory: [],
    subjectStats: [],
    ...overrides,
  };
}

describe('Achievements Engine', () => {
  describe('Definitions & Backward Compatibility', () => {
    it('has at least 40 badge definitions', () => {
      expect(ACHIEVEMENT_DEFINITIONS.length).toBeGreaterThanOrEqual(40);
      expect(ACHIEVEMENT_DEFINITIONS.length).toBe(43);
    });

    it('has unique IDs for all definitions', () => {
      const ids = ACHIEVEMENT_DEFINITIONS.map((b) => b.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(ids.length);
    });

    it('preserves canonical legacy achievement IDs', () => {
      const legacyIds: AchievementBadgeId[] = [
        'first-quiz',
        'perfect-score',
        'streak-3',
        'streak-5',
        'quiz-10',
        'subject-master',
        'game-explorer',
        'level-50',
        'first-micro-lesson',
        'micro-lesson-5',
        'micro-lesson-10',
        'micro-lesson-25',
        'micro-lesson-explorer',
        'first-concept-map',
        'concept-map-5',
        'concept-map-10',
        'concept-explorer',
        'first-experiment',
        'experiment-5',
        'experiment-10',
        'science-lab-explorer',
      ];

      const currentIds = new Set(ACHIEVEMENT_DEFINITIONS.map((b) => b.id));
      for (const legId of legacyIds) {
        expect(currentIds.has(legId)).toBe(true);
      }
    });

    it('has bilingual titles, descriptions, and hints for all definitions', () => {
      for (const badge of ACHIEVEMENT_DEFINITIONS) {
        expect(badge.title.en.trim().length).toBeGreaterThan(0);
        expect(badge.title.ta.trim().length).toBeGreaterThan(0);
        expect(badge.description.en.trim().length).toBeGreaterThan(0);
        expect(badge.description.ta.trim().length).toBeGreaterThan(0);
        expect(badge.hint.en.trim().length).toBeGreaterThan(0);
        expect(badge.hint.ta.trim().length).toBeGreaterThan(0);
        expect(badge.icon.trim().length).toBeGreaterThan(0);
        expect(badge.rewardXp).toBeGreaterThan(0);
        expect(['common', 'uncommon', 'rare', 'epic', 'legendary']).toContain(badge.rarity);
      }
    });
  });

  describe('calculateAchievementProgress', () => {
    const emptyContext: AchievementEvaluationContext = {
      activityHistory: [],
      streakInfo: {
        currentStreak: 0,
        longestStreak: 0,
        lastActiveDate: null,
        activeDates: [],
      },
      quizHistory: [],
      quizStats: createMockQuizStats(),
      gamesPlayedCount: 0,
      totalLevelsCleared: 0,
      microLessonsCompletedCount: 0,
      microLessonSubjectsCount: 0,
      conceptMapsCompletedCount: 0,
      conceptMapSubjectsCount: 0,
      experimentsCompletedCount: 0,
      experimentSubjectsCount: 0,
      riddlesSolvedCount: 0,
      mysteriesSolvedCount: 0,
      factsDiscoveredCount: 0,
      dailyGoalsCompletedCount: 0,
    };

    it('evaluates quiz count criteria correctly', () => {
      const def = ACHIEVEMENT_DEFINITIONS.find((b) => b.id === 'quiz-10')!;
      const ctx: AchievementEvaluationContext = {
        ...emptyContext,
        quizHistory: [
          createMockQuizEntry({ id: '1' }),
          createMockQuizEntry({ id: '2' }),
          createMockQuizEntry({ id: '3' }),
          createMockQuizEntry({ id: '4' }),
        ],
      };

      const progress = calculateAchievementProgress(def, ctx, undefined);
      expect(progress.current).toBe(4);
      expect(progress.target).toBe(10);
      expect(progress.percent).toBe(40);
      expect(progress.status).toBe('in_progress');
      expect(progress.remaining).toBe(6);
    });

    it('caps progress percentage at 100% when exceeding target', () => {
      const def = ACHIEVEMENT_DEFINITIONS.find((b) => b.id === 'quiz-10')!;
      const history = Array.from({ length: 15 }, (_, i) =>
        createMockQuizEntry({ id: `quiz-${i}` })
      );

      const ctx: AchievementEvaluationContext = {
        ...emptyContext,
        quizHistory: history,
      };

      const progress = calculateAchievementProgress(def, ctx, undefined);
      expect(progress.current).toBe(15);
      expect(progress.target).toBe(10);
      expect(progress.percent).toBe(100);
      expect(progress.status).toBe('unlocked');
      expect(progress.remaining).toBe(0);
    });

    it('marks as locked if current value is 0', () => {
      const def = ACHIEVEMENT_DEFINITIONS.find((b) => b.id === 'first-riddle')!;
      const ctx: AchievementEvaluationContext = {
        ...emptyContext,
        riddlesSolvedCount: 0,
      };

      const progress = calculateAchievementProgress(def, ctx, undefined);
      expect(progress.current).toBe(0);
      expect(progress.percent).toBe(0);
      expect(progress.status).toBe('locked');
      expect(progress.remaining).toBe(1);
    });

    it('respects existing unlockedAt timestamp even if current metrics drop', () => {
      const def = ACHIEVEMENT_DEFINITIONS.find((b) => b.id === 'streak-7')!;
      const ctx: AchievementEvaluationContext = {
        ...emptyContext,
        streakInfo: {
          currentStreak: 2, // Streak dropped, but was previously unlocked
          longestStreak: 7,
          lastActiveDate: '2026-03-06',
          activeDates: ['2026-03-06'],
        },
      };

      const unlockedTimestamp = 1700000000000;
      const progress = calculateAchievementProgress(def, ctx, unlockedTimestamp);
      expect(progress.status).toBe('unlocked');
      expect(progress.percent).toBe(100);
    });

    it('evaluates streak_days correctly from streakInfo', () => {
      const def = ACHIEVEMENT_DEFINITIONS.find((b) => b.id === 'streak-7')!;
      const ctx: AchievementEvaluationContext = {
        ...emptyContext,
        streakInfo: {
          currentStreak: 7,
          longestStreak: 7,
          lastActiveDate: '2026-03-06',
          activeDates: ['2026-03-06'],
        },
      };

      const progress = calculateAchievementProgress(def, ctx, undefined);
      expect(progress.current).toBe(7);
      expect(progress.status).toBe('unlocked');
    });
  });

  describe('evaluateAllAchievements', () => {
    it('evaluates entire badge suite accurately', () => {
      const context: AchievementEvaluationContext = {
        activityHistory: [],
        streakInfo: {
          currentStreak: 3,
          longestStreak: 3,
          lastActiveDate: '2026-03-06',
          activeDates: ['2026-03-06'],
        },
        quizHistory: [createMockQuizEntry({ id: '1' })],
        quizStats: createMockQuizStats({
          quizzesCompleted: 1,
          totalQuestionsAttempted: 10,
          totalCorrectAnswers: 10,
          overallAccuracy: 100,
          currentStreakDays: 3,
          longestStreakDays: 3,
        }),
        gamesPlayedCount: 2,
        totalLevelsCleared: 5,
        microLessonsCompletedCount: 2,
        microLessonSubjectsCount: 1,
        conceptMapsCompletedCount: 1,
        conceptMapSubjectsCount: 1,
        experimentsCompletedCount: 1,
        experimentSubjectsCount: 1,
        riddlesSolvedCount: 1,
        mysteriesSolvedCount: 0,
        factsDiscoveredCount: 0,
        dailyGoalsCompletedCount: 1,
      };

      const unlockedMap = new Map<AchievementBadgeId, number>([
        ['first-quiz', 1700000000000],
      ]);

      const all = evaluateAllAchievements(ACHIEVEMENT_DEFINITIONS, context, unlockedMap);
      expect(all.length).toBe(ACHIEVEMENT_DEFINITIONS.length);

      const firstQuiz = all.find((b) => b.id === 'first-quiz')!;
      expect(firstQuiz.status).toBe('unlocked');
      expect(firstQuiz.unlockedAt).toBe(1700000000000);

      const streak3 = all.find((b) => b.id === 'streak-3')!;
      expect(streak3.status).toBe('unlocked');
    });
  });

  describe('selectNextAchievement', () => {
    it('selects the in_progress badge with highest progress percentage', () => {
      const mockAchievements: Achievement[] = [
        {
          id: 'quiz-10',
          title: { en: 'Quiz 10', ta: 'வினாடி வினா 10' },
          description: { en: '', ta: '' },
          hint: { en: '', ta: '' },
          icon: '🎯',
          category: 'learning',
          rarity: 'rare',
          criteria: { type: 'activity_type_count', target: 10 },
          rewardXp: 50,
          status: 'in_progress',
          progress: { current: 8, target: 10, percent: 80, status: 'in_progress', remaining: 2 },
          unlockedAt: null,
        },
        {
          id: 'streak-5',
          title: { en: 'Streak 5', ta: 'தொடர்ச்சி 5' },
          description: { en: '', ta: '' },
          hint: { en: '', ta: '' },
          icon: '🔥',
          category: 'streak',
          rarity: 'uncommon',
          criteria: { type: 'streak_days', target: 5 },
          rewardXp: 40,
          status: 'in_progress',
          progress: { current: 2, target: 5, percent: 40, status: 'in_progress', remaining: 3 },
          unlockedAt: null,
        },
      ];

      const next = selectNextAchievement(mockAchievements);
      expect(next).not.toBeNull();
      expect(next?.id).toBe('quiz-10');
      expect(next?.progress.percent).toBe(80);
    });

    it('returns null if all badges are unlocked and none are locked', () => {
      const allUnlocked: Achievement[] = [
        {
          id: 'quiz-10',
          title: { en: 'Quiz 10', ta: 'வினாடி வினா 10' },
          description: { en: '', ta: '' },
          hint: { en: '', ta: '' },
          icon: '🎯',
          category: 'learning',
          rarity: 'rare',
          criteria: { type: 'activity_type_count', target: 10 },
          rewardXp: 50,
          status: 'unlocked',
          progress: { current: 10, target: 10, percent: 100, status: 'unlocked', remaining: 0 },
          unlockedAt: 1700000000000,
        },
      ];

      const next = selectNextAchievement(allUnlocked);
      expect(next).toBeNull();
    });
  });

  describe('getRecentUnlocks', () => {
    it('returns unlocked badges sorted descending by unlockedAt', () => {
      const mockAchievements: Achievement[] = [
        { id: 'b1', status: 'unlocked', unlockedAt: 100 } as any,
        { id: 'b2', status: 'unlocked', unlockedAt: 500 } as any,
        { id: 'b3', status: 'locked', unlockedAt: null } as any,
        { id: 'b4', status: 'unlocked', unlockedAt: 300 } as any,
      ];

      const recent = getRecentUnlocks(mockAchievements, 3);
      expect(recent.length).toBe(3);
      expect(recent[0].id).toBe('b2');
      expect(recent[1].id).toBe('b4');
      expect(recent[2].id).toBe('b1');
    });
  });

  describe('filterAchievements', () => {
    it('filters correctly by status and category', () => {
      const mockAchievements: Achievement[] = [
        { id: 'b1', category: 'learning', status: 'unlocked' } as any,
        { id: 'b2', category: 'streak', status: 'in_progress' } as any,
        { id: 'b3', category: 'games', status: 'locked' } as any,
        { id: 'b4', category: 'learning', status: 'in_progress' } as any,
      ];

      const all = filterAchievements(mockAchievements, 'all', 'all');
      expect(all.length).toBe(4);

      const inProgress = filterAchievements(mockAchievements, 'in_progress', 'all');
      expect(inProgress.length).toBe(2);

      const learningOnly = filterAchievements(mockAchievements, 'all', 'learning');
      expect(learningOnly.length).toBe(2);

      const inProgressLearning = filterAchievements(mockAchievements, 'in_progress', 'learning');
      expect(inProgressLearning.length).toBe(1);
      expect(inProgressLearning[0].id).toBe('b4');
    });
  });

  describe('calculateAchievementSummary', () => {
    it('calculates correct summary statistics', () => {
      const mockAchievements: Achievement[] = [
        { id: 'b1', status: 'unlocked', rewardXp: 50 } as any,
        { id: 'b2', status: 'unlocked', rewardXp: 30 } as any,
        { id: 'b3', status: 'in_progress', rewardXp: 40 } as any,
        { id: 'b4', status: 'locked', rewardXp: 100 } as any,
      ];

      const summary = calculateAchievementSummary(mockAchievements);
      expect(summary.totalCount).toBe(4);
      expect(summary.unlockedCount).toBe(2);
      expect(summary.inProgressCount).toBe(1);
      expect(summary.lockedCount).toBe(1);
      expect(summary.totalRewardXpEarned).toBe(80);
      expect(summary.overallPercent).toBe(50);
    });
  });
});
