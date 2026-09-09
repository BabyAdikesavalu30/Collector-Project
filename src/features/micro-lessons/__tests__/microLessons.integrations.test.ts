/**
 * Micro Lessons Cross-System Integration Tests
 * Verifies unified progression: Daily Goal, Achievements, Search Index, and Profile.
 */

import { storage, STORAGE_KEYS } from '../../../storage/asyncStorage';
import { recordActivity, getActivityHistory, countActivityTypes } from '../../activity';
import {
  COUNTED_ACTIVITY_TYPES,
  loadOrInitializeDailyGoal,
} from '../../daily-goal';
import {
  evaluateUnlockedBadges,
  AchievementInput,
  getBadgeDefinition,
} from '../../achievements';
import { buildSearchIndex, searchCatalog, SearchItem, SearchResult } from '../../search';
import { computeActivitySummary } from '../../profile';
import { QuizStats } from '../../quiz';

describe('Micro Lessons Cross-System Integrations', () => {
  beforeEach(async () => {
    await storage.removeItem(STORAGE_KEYS.ACTIVITY_HISTORY);
    await storage.removeItem(STORAGE_KEYS.XP_TRANSACTIONS);
    await storage.removeItem(STORAGE_KEYS.DAILY_GOAL_STATE);
  });

  describe('Daily Goal Integration', () => {
    it('includes micro_lesson_completed in COUNTED_ACTIVITY_TYPES', () => {
      expect(COUNTED_ACTIVITY_TYPES).toContain('micro_lesson_completed');
    });

    it('counts micro_lesson_completed activity towards daily goal target', async () => {
      // Record a micro lesson completed event
      await recordActivity({
        type: 'micro_lesson_completed',
        dedupeKey: 'test-micro-lesson-1',
        title: 'Micro Lesson 1',
        titleTa: 'மைக்ரோ பாடம் 1',
        xpEarned: 20,
      });

      const history = await getActivityHistory();
      const goal = await loadOrInitializeDailyGoal(history);

      expect(goal.progress.current).toBe(1);
      expect(goal.progress.target).toBe(goal.definition.targetCount);
      expect(goal.definition).toBeDefined();
    });
  });

  describe('Achievements Integration', () => {
    const dummyQuizStats: QuizStats = {
      totalPoints: 0,
      quizzesCompleted: 0,
      totalQuestionsAttempted: 0,
      totalCorrectAnswers: 0,
      overallAccuracy: 0,
      currentStreakDays: 0,
      longestStreakDays: 0,
      streakHistory: [],
      subjectStats: [],
    };

    const baseInput: AchievementInput = {
      quizHistory: [],
      quizStats: dummyQuizStats,
      gamesPlayedCount: 0,
      totalLevelsCleared: 0,
      microLessonsCompletedCount: 0,
      microLessonSubjectsCount: 0,
    };

    it('unlocks first-micro-lesson after 1 completed micro lesson', () => {
      const unlockedBefore = evaluateUnlockedBadges(baseInput);
      expect(unlockedBefore).not.toContain('first-micro-lesson');

      const unlockedAfter = evaluateUnlockedBadges({
        ...baseInput,
        microLessonsCompletedCount: 1,
        microLessonSubjectsCount: 1,
      });
      expect(unlockedAfter).toContain('first-micro-lesson');
    });

    it('unlocks tiered badges at 5, 10, and 25 lessons completed', () => {
      const at4 = evaluateUnlockedBadges({ ...baseInput, microLessonsCompletedCount: 4 });
      expect(at4).not.toContain('micro-lesson-5');

      const at5 = evaluateUnlockedBadges({ ...baseInput, microLessonsCompletedCount: 5 });
      expect(at5).toContain('micro-lesson-5');
      expect(at5).not.toContain('micro-lesson-10');

      const at10 = evaluateUnlockedBadges({ ...baseInput, microLessonsCompletedCount: 10 });
      expect(at10).toContain('micro-lesson-10');
      expect(at10).not.toContain('micro-lesson-25');

      const at25 = evaluateUnlockedBadges({ ...baseInput, microLessonsCompletedCount: 25 });
      expect(at25).toContain('micro-lesson-25');
    });

    it('unlocks micro-lesson-explorer when completing lessons across at least 4 distinct subjects', () => {
      const at3Subjects = evaluateUnlockedBadges({
        ...baseInput,
        microLessonsCompletedCount: 10,
        microLessonSubjectsCount: 3,
      });
      expect(at3Subjects).not.toContain('micro-lesson-explorer');

      const at4Subjects = evaluateUnlockedBadges({
        ...baseInput,
        microLessonsCompletedCount: 10,
        microLessonSubjectsCount: 4,
      });
      expect(at4Subjects).toContain('micro-lesson-explorer');
    });

    it('verifies all 5 micro lesson badge definitions have valid titles and icons', () => {
      const badges = [
        'first-micro-lesson',
        'micro-lesson-5',
        'micro-lesson-10',
        'micro-lesson-25',
        'micro-lesson-explorer',
      ] as const;

      badges.forEach((id) => {
        const def = getBadgeDefinition(id);
        expect(def.id).toBe(id);
        expect(def.title.en).toBeTruthy();
        expect(def.title.ta).toBeTruthy();
        expect(def.icon).toBeTruthy();
      });
    });
  });

  describe('Search Index Integration', () => {
    it('indexes all 30 micro lessons in search catalog', () => {
      const index = buildSearchIndex();
      const microLessonsInIndex = index.items.filter((item: SearchItem) => item.category === 'micro_lesson');

      expect(microLessonsInIndex.length).toBe(30);
    });

    it('finds micro lessons through search queries', () => {
      const index = buildSearchIndex();
      const results = searchCatalog(index, { query: 'Newton' });

      const lessonResult = results.find((r: SearchResult) => r.item.category === 'micro_lesson');
      expect(lessonResult).toBeDefined();
      expect(lessonResult?.item.route).toContain('/micro-lesson/');
    });
  });

  describe('Profile Activity Summary Integration', () => {
    it('accurately counts microLessonsCompleted in profile activity summary', () => {
      const history = [
        {
          id: '1',
          type: 'micro_lesson_completed' as const,
          title: 'L1',
          titleTa: 'பாடம் 1',
          xpEarned: 20,
          pointsEarned: 0,
          timestamp: Date.now(),
        },
        {
          id: '2',
          type: 'micro_lesson_completed' as const,
          title: 'L2',
          titleTa: 'பாடம் 2',
          xpEarned: 20,
          pointsEarned: 0,
          timestamp: Date.now(),
        },
        {
          id: '3',
          type: 'quiz_completed' as const,
          title: 'Q1',
          titleTa: 'வி1',
          xpEarned: 30,
          pointsEarned: 10,
          timestamp: Date.now(),
        },
      ];

      const counts = countActivityTypes(history);
      const summary = computeActivitySummary(counts);
      expect(summary.microLessonsCompleted).toBe(2);
      expect(summary.totalActivities).toBe(3);
    });
  });
});
