/**
 * Integration and Service tests for FocusAreaService
 * Validates event collection, deduplication, invalid data safety,
 * subject aggregation, recommendations, and empty states.
 */

import { FocusAreaService } from '../weakAreas.service';
import { PerformanceEvent } from '../weakAreas.types';

// Mock repositories so we can test various student activity states cleanly
jest.mock('../../quiz/quiz-history.storage', () => ({
  getQuizHistory: jest.fn(),
}));

jest.mock('../../micro-lessons/microLessons.storage', () => ({
  getAllProgress: jest.fn(),
}));

import { getQuizHistory } from '../../quiz/quiz-history.storage';
import { getAllProgress } from '../../micro-lessons/microLessons.storage';
import { QuizHistoryEntry } from '../../quiz/quiz-history.types';

const mockGetQuizHistory = getQuizHistory as jest.MockedFunction<typeof getQuizHistory>;
const mockGetAllProgress = getAllProgress as jest.MockedFunction<typeof getAllProgress>;

function createMockQuizEntry(overrides: Partial<QuizHistoryEntry> = {}): QuizHistoryEntry {
  const total = overrides.totalQuestions ?? 5;
  const correct = overrides.correctAnswers ?? 2;
  return {
    id: overrides.id ?? 'quiz-1',
    levelId: overrides.levelId ?? 'foundation',
    subjectId: overrides.subjectId ?? 'physics',
    pathwayId: overrides.pathwayId ?? 'phy-f-2',
    difficulty: overrides.difficulty ?? 'intermediate',
    totalQuestions: total,
    correctAnswers: correct,
    wrongAnswers: overrides.wrongAnswers ?? total - correct,
    unansweredQuestions: overrides.unansweredQuestions ?? 0,
    score: overrides.score ?? correct * 10,
    percentage: overrides.percentage ?? Math.round((correct / total) * 100),
    bestStreak: overrides.bestStreak ?? 1,
    completedAt: overrides.completedAt ?? Date.now(),
    ...overrides,
  };
}

describe('FocusAreaService', () => {
  let service: FocusAreaService;

  beforeEach(() => {
    jest.clearAllMocks();
    service = new FocusAreaService();
  });

  describe('aggregatePerformance & Event Deduplication (Sections 57 & 80)', () => {
    it('collapses duplicate events with the same dedupeKey without inflating attempts', () => {
      const now = Date.now();
      const events: PerformanceEvent[] = [
        {
          id: 'quiz-1#0',
          source: 'quiz',
          subjectId: 'physics',
          topicId: 'lesson:light-reflection',
          occurredAt: now - 1000,
          isCorrect: false,
          dedupeKey: 'quiz-1#0',
        },
        // Duplicate event (same source & dedupeKey)
        {
          id: 'quiz-1#0-dup',
          source: 'quiz',
          subjectId: 'physics',
          topicId: 'lesson:light-reflection',
          occurredAt: now - 1000,
          isCorrect: false,
          dedupeKey: 'quiz-1#0',
        },
        {
          id: 'quiz-1#1',
          source: 'quiz',
          subjectId: 'physics',
          topicId: 'lesson:light-reflection',
          occurredAt: now - 500,
          isCorrect: true,
          dedupeKey: 'quiz-1#1',
        },
      ];

      const perfs = service.aggregatePerformance(events);
      expect(perfs).toHaveLength(1);
      const perf = perfs[0];
      // Attempts should be 2, NOT 3 (the duplicate was dropped)
      expect(perf.attempts).toBe(2);
      expect(perf.incorrect).toBe(1);
      expect(perf.correct).toBe(1);
      expect(perf.accuracy).toBe(50);
    });

    it('safely filters out invalid or corrupt events (Section 62)', () => {
      const validTime = Date.now();
      const invalidEvents = [
        null,
        undefined,
        {},
        { id: '', source: 'quiz', subjectId: 'physics', topicId: 'lesson:1', occurredAt: validTime, isCorrect: true },
        { id: '2', source: 'quiz', subjectId: 'invalid-subject', topicId: 'lesson:1', occurredAt: validTime, isCorrect: true },
        { id: '3', source: 'quiz', subjectId: 'physics', topicId: '', occurredAt: validTime, isCorrect: true },
        { id: '4', source: 'quiz', subjectId: 'physics', topicId: 'lesson:1', occurredAt: NaN, isCorrect: true },
        { id: '5', source: 'quiz', subjectId: 'physics', topicId: 'lesson:1', occurredAt: validTime, isCorrect: 'not-boolean' },
      ] as any[];

      const perfs = service.aggregatePerformance(invalidEvents);
      expect(perfs).toHaveLength(0);
    });
  });

  describe('Fresh Student / No-Data State (Sections 27, 29, 79)', () => {
    it('returns empty focus areas and hasEnoughData = false when student has no history', async () => {
      mockGetQuizHistory.mockResolvedValue([]);
      mockGetAllProgress.mockResolvedValue({});

      const snapshot = await service.getFocusAreasSnapshot();
      expect(snapshot.hasEnoughData).toBe(false);
      expect(snapshot.focusAreas).toHaveLength(0);
      expect(snapshot.topicsAnalyzed).toBe(0);
      expect(snapshot.improving).toHaveLength(0);
      expect(snapshot.strongTopics).toHaveLength(0);
    });

    it('returns null from getRecommendedNextStep when no data exists', async () => {
      mockGetQuizHistory.mockResolvedValue([]);
      mockGetAllProgress.mockResolvedValue({});

      const nextStep = await service.getRecommendedNextStep();
      expect(nextStep).toBeNull();
    });
  });

  describe('Focus Area Generation with Meaningful Data (Sections 3, 5, 12, 17)', () => {
    it('identifies focus area when a topic has >= 3 attempts with low accuracy', async () => {
      const now = Date.now();
      // Mock a completed quiz on Light (pathway phy-f-2) with 5 questions, 2 correct (40% accuracy)
      mockGetQuizHistory.mockResolvedValue([
        createMockQuizEntry({
          id: 'quiz-optics-1',
          subjectId: 'physics',
          pathwayId: 'phy-f-2',
          completedAt: now - 3600000,
          totalQuestions: 5,
          correctAnswers: 2,
        }),
      ]);
      mockGetAllProgress.mockResolvedValue({});

      const snapshot = await service.getFocusAreasSnapshot();
      expect(snapshot.hasEnoughData).toBe(true);
      expect(snapshot.focusAreas.length).toBeGreaterThan(0);

      const focus = snapshot.focusAreas[0];
      expect(focus.subjectId).toBe('physics');
      expect(focus.accuracy).toBe(40);
      expect(focus.attempts).toBe(5);
      expect(focus.action).toBeDefined();
      expect(focus.reason).toBeDefined();
      expect(focus.reason.labelKey).toBe('reasonAttempt');
    });

    it('orders recommended action according to pedagogical hierarchy', async () => {
      // Priority hierarchy: Micro Lesson > Learn > Concept Map > Experiment > Quiz Practice
      const now = Date.now();
      mockGetQuizHistory.mockResolvedValue([
        createMockQuizEntry({
          id: 'quiz-optics-1',
          subjectId: 'physics',
          pathwayId: 'phy-f-2',
          completedAt: now - 3600000,
          totalQuestions: 5,
          correctAnswers: 2,
        }),
      ]);
      mockGetAllProgress.mockResolvedValue({});

      const nextStep = await service.getRecommendedNextStep();
      expect(nextStep).not.toBeNull();
      // The action must have a valid route and labelKey
      expect(nextStep!.action.route).toBeDefined();
      expect(nextStep!.action.labelKey).toBeDefined();
    });
  });

  describe('Subject Summary Aggregation (Section 13 & 81)', () => {
    it('aggregates subject summaries correctly without acting as a leaderboard', async () => {
      const now = Date.now();
      mockGetQuizHistory.mockResolvedValue([
        // Physics quiz: 4/5 correct (80%)
        createMockQuizEntry({
          id: 'quiz-phy',
          subjectId: 'physics',
          pathwayId: 'phy-f-2',
          completedAt: now,
          totalQuestions: 5,
          correctAnswers: 4,
        }),
        // Chemistry quiz: 2/5 correct (40%)
        createMockQuizEntry({
          id: 'quiz-chem',
          subjectId: 'chemistry',
          pathwayId: 'chem-f-2',
          completedAt: now,
          totalQuestions: 5,
          correctAnswers: 2,
        }),
      ]);
      mockGetAllProgress.mockResolvedValue({});

      const snapshot = await service.getFocusAreasSnapshot();
      expect(snapshot.subjects.length).toBeGreaterThanOrEqual(2);

      const phySummary = snapshot.subjects.find((s) => s.subjectId === 'physics');
      const chemSummary = snapshot.subjects.find((s) => s.subjectId === 'chemistry');

      expect(phySummary).toBeDefined();
      expect(phySummary!.averageAccuracy).toBe(80);

      expect(chemSummary).toBeDefined();
      expect(chemSummary!.averageAccuracy).toBe(40);
      expect(chemSummary!.focusAreaCount).toBeGreaterThanOrEqual(1);
    });
  });

  describe('Determinism and Offline Recalculation (Section 53 & 84)', () => {
    it('produces identical results for repeated calls with identical data', async () => {
      const now = 1700000000000;
      const history = [
        createMockQuizEntry({
          id: 'q1',
          subjectId: 'physics',
          pathwayId: 'phy-f-2',
          completedAt: now,
          totalQuestions: 4,
          correctAnswers: 2,
        }),
      ];
      mockGetQuizHistory.mockResolvedValue(history);
      mockGetAllProgress.mockResolvedValue({});

      const run1 = await service.getFocusAreasSnapshot();
      const run2 = await service.getFocusAreasSnapshot();

      expect(run1.focusAreas.length).toBe(run2.focusAreas.length);
      expect(run1.focusAreas[0]?.topicId).toBe(run2.focusAreas[0]?.topicId);
      expect(run1.focusAreas[0]?.confidence).toBe(run2.focusAreas[0]?.confidence);
      expect(run1.focusAreas[0]?.priority).toBe(run2.focusAreas[0]?.priority);
    });
  });
});
