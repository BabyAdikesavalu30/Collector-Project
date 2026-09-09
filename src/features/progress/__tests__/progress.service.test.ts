/**
 * Integration and Unit Tests for ProgressService
 * Validates overall progress, subject progress, fresh user empty states,
 * partial data states, duplicate event handling, strengths, and Focus Areas synchronization.
 */

import { ProgressService } from '../progress.service';

// Mock underlying feature storage functions to feed controlled states
jest.mock('../../quiz/quiz-history.storage', () => ({
  getQuizHistory: jest.fn(),
}));

jest.mock('../../micro-lessons/microLessons.storage', () => ({
  getAllProgress: jest.fn(),
}));

jest.mock('../../concept-maps/conceptMaps.storage', () => ({
  getAllConceptMapProgress: jest.fn(),
}));

jest.mock('../../experiment-lab/experiment.storage', () => ({
  getAllExperimentProgress: jest.fn(),
}));

jest.mock('../../activity/activity.repository', () => ({
  getRecentActivity: jest.fn(),
  getUnifiedStreak: jest.fn(),
  getTotalXpBalance: jest.fn(),
}));

jest.mock('../../achievements/achievements.storage', () => ({
  getUnlockedAchievements: jest.fn(),
}));

jest.mock('../../certificates/certificates.storage', () => ({
  getCertificates: jest.fn(),
}));

jest.mock('../../../storage/asyncStorage', () => ({
  storage: {
    getItem: jest.fn(),
    setItem: jest.fn(),
  },
  STORAGE_KEYS: {
    STUDENT_PROFILE: '@vigyaan/student_profile',
    USER_LANGUAGE: '@vigyaan/user_language',
  },
}));

import { getQuizHistory } from '../../quiz/quiz-history.storage';
import { getAllProgress as getAllMicroLessonProgress } from '../../micro-lessons/microLessons.storage';
import { getAllConceptMapProgress } from '../../concept-maps/conceptMaps.storage';
import { getAllExperimentProgress } from '../../experiment-lab/experiment.storage';
import {
  getRecentActivity,
  getTotalXpBalance,
  getUnifiedStreak,
} from '../../activity/activity.repository';
import { getUnlockedAchievements } from '../../achievements/achievements.storage';
import { getCertificates } from '../../certificates/certificates.storage';
import { storage } from '../../../storage/asyncStorage';

const mockGetQuizHistory = getQuizHistory as jest.MockedFunction<typeof getQuizHistory>;
const mockGetMicroLessons = getAllMicroLessonProgress as jest.MockedFunction<typeof getAllMicroLessonProgress>;
const mockGetConceptMaps = getAllConceptMapProgress as jest.MockedFunction<typeof getAllConceptMapProgress>;
const mockGetExperiments = getAllExperimentProgress as jest.MockedFunction<typeof getAllExperimentProgress>;
const mockGetRecentActivity = getRecentActivity as jest.MockedFunction<typeof getRecentActivity>;
const mockGetUnifiedStreak = getUnifiedStreak as jest.MockedFunction<typeof getUnifiedStreak>;
const mockGetTotalXp = getTotalXpBalance as jest.MockedFunction<typeof getTotalXpBalance>;
const mockGetAchievements = getUnlockedAchievements as jest.MockedFunction<typeof getUnlockedAchievements>;
const mockGetCertificates = getCertificates as jest.MockedFunction<typeof getCertificates>;
const mockStorageGet = storage.getItem as jest.MockedFunction<typeof storage.getItem>;

describe('ProgressService', () => {
  let service: ProgressService;

  beforeEach(() => {
    jest.clearAllMocks();
    service = new ProgressService();

    // Default clean state
    mockGetQuizHistory.mockResolvedValue([]);
    mockGetMicroLessons.mockResolvedValue({});
    mockGetConceptMaps.mockResolvedValue({});
    mockGetExperiments.mockResolvedValue({});
    mockGetRecentActivity.mockResolvedValue([]);
    mockGetUnifiedStreak.mockResolvedValue({
      currentStreak: 0,
      longestStreak: 0,
      lastActiveDate: null,
      activeDates: [],
    });
    mockGetTotalXp.mockResolvedValue(0);
    mockGetAchievements.mockResolvedValue({});
    mockGetCertificates.mockResolvedValue([]);
    mockStorageGet.mockResolvedValue({ grade: 'Grade 8' });
  });

  describe('Fresh User Empty State (Sections 41, 43, 80)', () => {
    it('returns 0 progress and 0 subjects explored when no activity exists', async () => {
      const overall = await service.getOverallProgress();
      expect(overall.overallProgress).toBe(0);
      expect(overall.subjectsExplored).toBe(0);
      expect(overall.topicsExplored).toBe(0);
      expect(overall.activitiesCompleted).toBe(0);
      expect(overall.streakDays).toBe(0);
      expect(overall.totalXp).toBe(0);
    });

    it('returns empty strengths when there is no data (Section 21)', async () => {
      const strengths = await service.getStrengths();
      expect(strengths).toEqual([]);
    });

    it('marks subjects as not explored yet with 0 completed activities without failing', async () => {
      const subjects = await service.getAllSubjectProgress();
      expect(subjects.length).toBe(7);
      for (const s of subjects) {
        expect(s.topicsStarted).toBe(0);
        expect(s.completedActivities).toBe(0);
        expect(s.overallProgress).toBe(0);
      }
    });
  });

  describe('Partial Data State (Sections 42 & 81)', () => {
    it('shows real progress for explored subjects and unstarted for unexplored subjects', async () => {
      // Physics has completed micro-lesson and high quiz accuracy
      mockGetMicroLessons.mockResolvedValue({
        'micro-newtons-first-law': {
          lessonId: 'micro-newtons-first-law',
          status: 'completed',
          progressPercent: 100,
          completedAt: Date.now(),
        },
      });

      mockGetQuizHistory.mockResolvedValue([
        {
          id: 'q-1',
          pathwayId: 'path-phy-forces-fnd',
          subjectId: 'physics',
          levelId: 'foundation',
          totalQuestions: 5,
          correctAnswers: 5,
          wrongAnswers: 0,
          score: 50,
          percentage: 100,
          completedAt: Date.now(),
        } as any,
      ]);

      mockGetUnifiedStreak.mockResolvedValue({
        currentStreak: 3,
        longestStreak: 3,
        lastActiveDate: '2026-09-06',
        activeDates: ['2026-09-06', '2026-09-05', '2026-09-04'],
      });
      mockGetTotalXp.mockResolvedValue(150);

      const subjects = await service.getAllSubjectProgress();
      const physics = subjects.find((s) => s.subjectId === 'physics')!;
      const chemistry = subjects.find((s) => s.subjectId === 'chemistry')!;

      // Physics has real progress
      expect(physics.topicsStarted).toBeGreaterThan(0);
      expect(physics.completedActivities).toBeGreaterThan(0);
      expect(physics.overallProgress).toBeGreaterThan(0);
      expect(physics.averageAccuracy).toBe(100);

      // Chemistry is unstarted
      expect(chemistry.topicsStarted).toBe(0);
      expect(chemistry.completedActivities).toBe(0);
      expect(chemistry.overallProgress).toBe(0);
    });
  });

  describe('Evidence-Based Subject Strengths (Section 21)', () => {
    it('includes subjects with sufficient activity and high progress', async () => {
      mockGetMicroLessons.mockResolvedValue({
        'micro-cell-structure': {
          lessonId: 'micro-cell-structure',
          status: 'completed',
          progressPercent: 100,
          completedAt: Date.now(),
        },
        'micro-photosynthesis': {
          lessonId: 'micro-photosynthesis',
          status: 'completed',
          progressPercent: 100,
          completedAt: Date.now(),
        },
      });

      mockGetQuizHistory.mockResolvedValue([
        {
          id: 'q-bio',
          pathwayId: 'path-bio-living-fnd',
          subjectId: 'biology',
          levelId: 'foundation',
          totalQuestions: 10,
          correctAnswers: 9,
          percentage: 90,
          completedAt: Date.now(),
        } as any,
      ]);

      const strengths = await service.getStrengths();
      expect(strengths.length).toBeGreaterThan(0);
      expect(strengths[0].subjectId).toBe('biology');
      expect(strengths[0].accuracy).toBe(90);
    });
  });

  describe('Recent Activity Deduplication (Section 86)', () => {
    it('deduplicates recent activity sharing the same type and ID', async () => {
      const now = Date.now();
      mockGetRecentActivity.mockResolvedValue([
        {
          id: 'act-1',
          type: 'quiz_completed',
          title: 'Forces Quiz',
          titleTa: 'விசைகள் வினாடி வினா',
          timestamp: now,
          xpEarned: 20,
          pointsEarned: 20,
        },
        // Duplicate event with identical ID and type
        {
          id: 'act-1',
          type: 'quiz_completed',
          title: 'Forces Quiz',
          titleTa: 'விசைகள் வினாடி வினா',
          timestamp: now,
          xpEarned: 20,
          pointsEarned: 20,
        },
        {
          id: 'act-2',
          type: 'micro_lesson_completed',
          title: 'Cell Structure Lesson',
          titleTa: 'செல் அமைப்பு பாடம்',
          timestamp: now - 1000,
          xpEarned: 15,
          pointsEarned: 15,
        },
      ]);

      const recent = await service.getRecentActivities();
      expect(recent.length).toBe(2);
      expect(recent[0].id).toBe('act-1');
      expect(recent[1].id).toBe('act-2');
    });
  });
});
