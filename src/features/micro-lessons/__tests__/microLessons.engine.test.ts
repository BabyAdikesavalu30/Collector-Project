/**
 * Micro Lessons Engine Unit Tests
 */

import { MICRO_LESSONS } from '../microLessons.data';
import {
  getLocalDateKey,
  getTodayQuickLesson,
  filterMicroLessons,
  getRecentlyOpenedLesson,
  getRecommendedLessons,
  calculateMicroLessonsSummary,
} from '../microLessons.engine';
import { MicroLessonProgress } from '../microLessons.types';

describe('Micro Lessons Feature Engine', () => {
  const lesson1Id = MICRO_LESSONS[0].id;
  const lesson2Id = MICRO_LESSONS[1].id;
  const lesson3Id = MICRO_LESSONS[7].id;

  describe('getTodayQuickLesson', () => {
    it('deterministically returns the same lesson for the same date key', () => {
      const lesson1 = getTodayQuickLesson(MICRO_LESSONS, '2026-09-05');
      const lesson2 = getTodayQuickLesson(MICRO_LESSONS, '2026-09-05');
      expect(lesson1.id).toBe(lesson2.id);
    });

    it('returns a different lesson on different dates', () => {
      const lesson1 = getTodayQuickLesson(MICRO_LESSONS, '2026-09-05');
      const lesson2 = getTodayQuickLesson(MICRO_LESSONS, '2026-09-06');
      const lesson3 = getTodayQuickLesson(MICRO_LESSONS, '2026-09-07');
      expect(lesson1.id !== lesson2.id || lesson2.id !== lesson3.id).toBe(true);
    });

    it('throws when given an empty catalog', () => {
      expect(() => getTodayQuickLesson([], '2026-09-05')).toThrow(
        'Cannot select daily lesson from an empty catalog'
      );
    });
  });

  describe('getLocalDateKey', () => {
    it('returns a valid YYYY-MM-DD formatted date string', () => {
      const date = new Date(2026, 8, 5); // Month 8 is September
      expect(getLocalDateKey(date)).toBe('2026-09-05');
    });
  });

  describe('filterMicroLessons', () => {
    const mockProgressMap: Record<string, MicroLessonProgress> = {
      [lesson1Id]: {
        lessonId: lesson1Id,
        status: 'completed',
        progressPercent: 100,
        bookmarked: false,
      },
      [lesson2Id]: {
        lessonId: lesson2Id,
        status: 'in_progress',
        progressPercent: 50,
        bookmarked: true,
      },
      [lesson3Id]: {
        lessonId: lesson3Id,
        status: 'not_started',
        progressPercent: 0,
        bookmarked: true,
      },
    };

    it('filters by subject', () => {
      const filtered = filterMicroLessons(
        MICRO_LESSONS,
        { subjectId: 'physics', status: 'all', searchQuery: '' },
        mockProgressMap
      );

      expect(filtered.length).toBe(7);
      filtered.forEach((l) => expect(l.subject).toBe('physics'));
    });

    it('filters by completed status', () => {
      const filtered = filterMicroLessons(
        MICRO_LESSONS,
        { subjectId: 'all', status: 'completed', searchQuery: '' },
        mockProgressMap
      );

      expect(filtered.length).toBe(1);
      expect(filtered[0].id).toBe(lesson1Id);
    });

    it('filters by in_progress status', () => {
      const filtered = filterMicroLessons(
        MICRO_LESSONS,
        { subjectId: 'all', status: 'in_progress', searchQuery: '' },
        mockProgressMap
      );

      expect(filtered.length).toBe(1);
      expect(filtered[0].id).toBe(lesson2Id);
    });

    it('filters by bookmarked status', () => {
      const filtered = filterMicroLessons(
        MICRO_LESSONS,
        { subjectId: 'all', status: 'bookmarked', searchQuery: '' },
        mockProgressMap,
        [lesson2Id, lesson3Id]
      );

      expect(filtered.length).toBe(2);
      expect(filtered.map((l) => l.id)).toEqual(
        expect.arrayContaining([lesson2Id, lesson3Id])
      );
    });

    it('searches in English and Tamil', () => {
      // English search
      const resEn = filterMicroLessons(
        MICRO_LESSONS,
        { subjectId: 'all', status: 'all', searchQuery: 'gravity' },
        {}
      );
      expect(resEn.length).toBeGreaterThan(0);

      // Tamil search for light / ஒளி
      const resTa = filterMicroLessons(
        MICRO_LESSONS,
        { subjectId: 'all', status: 'all', searchQuery: 'ஒளி' },
        {}
      );
      expect(resTa.length).toBeGreaterThan(0);
    });
  });

  describe('getRecentlyOpenedLesson', () => {
    it('returns the most recently started in-progress lesson', () => {
      const progressMap: Record<string, MicroLessonProgress> = {
        [lesson1Id]: {
          lessonId: lesson1Id,
          status: 'in_progress',
          progressPercent: 30,
          startedAt: 1000,
        },
        [lesson2Id]: {
          lessonId: lesson2Id,
          status: 'in_progress',
          progressPercent: 60,
          startedAt: 5000,
        },
        [lesson3Id]: {
          lessonId: lesson3Id,
          status: 'completed',
          progressPercent: 100,
          startedAt: 10000,
        },
      };

      const recent = getRecentlyOpenedLesson(MICRO_LESSONS, progressMap);
      expect(recent).not.toBeNull();
      expect(recent?.id).toBe(lesson2Id);
    });

    it('returns null when no lessons are in progress', () => {
      const recent = getRecentlyOpenedLesson(MICRO_LESSONS, {});
      expect(recent).toBeNull();
    });
  });

  describe('getRecommendedLessons', () => {
    it('prioritizes uncompleted lessons in subjects the student engaged with', () => {
      const progressMap: Record<string, MicroLessonProgress> = {
        [lesson1Id]: {
          lessonId: lesson1Id,
          status: 'completed',
          progressPercent: 100,
        },
      };

      const recs = getRecommendedLessons(MICRO_LESSONS, progressMap, 3);
      expect(recs.length).toBe(3);
      expect(recs[0].subject).toBe('physics');
    });

    it('falls back to all lessons when everything is completed', () => {
      const progressMap: Record<string, MicroLessonProgress> = {};
      MICRO_LESSONS.forEach((l) => {
        progressMap[l.id] = {
          lessonId: l.id,
          status: 'completed',
          progressPercent: 100,
        };
      });

      const recs = getRecommendedLessons(MICRO_LESSONS, progressMap, 4);
      expect(recs.length).toBe(4);
    });
  });

  describe('calculateMicroLessonsSummary', () => {
    it('accurately computes total, completed, in-progress and percentage', () => {
      const progressMap: Record<string, MicroLessonProgress> = {
        [lesson1Id]: {
          lessonId: lesson1Id,
          status: 'completed',
          progressPercent: 100,
        },
        [lesson2Id]: {
          lessonId: lesson2Id,
          status: 'completed',
          progressPercent: 100,
        },
        [lesson3Id]: {
          lessonId: lesson3Id,
          status: 'in_progress',
          progressPercent: 50,
        },
      };

      const summary = calculateMicroLessonsSummary(MICRO_LESSONS, progressMap);
      expect(summary.total).toBe(30);
      expect(summary.completed).toBe(2);
      expect(summary.inProgress).toBe(1);
      expect(summary.percent).toBe(Math.round((2 / 30) * 100));
    });
  });
});
