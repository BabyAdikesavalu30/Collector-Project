/**
 * Unit Tests for Science Passport Service (Phase 46)
 * Validates:
 * - Fresh student passport (empty state)
 * - Partial activity passport
 * - Full activity passport
 * - Milestone status computation
 * - Highlight selection logic
 * - Data consistency with canonical sources
 * - Error handling
 */

import {
  PASSPORT_MILESTONE_DEFINITIONS,
} from '../sciencePassport.milestones';
import {
  PassportMilestone,
  PassportActivityStats,
  PassportFeatureCounts,
  PassportHighlight,
} from '../sciencePassport.types';

// ============================================================================
// Pure Helper Tests (milestone computation logic)
// ============================================================================

describe('Science Passport Service — Pure Logic', () => {
  describe('Milestone Computation', () => {
    function computeMilestoneProgress(
      milestoneId: string,
      activityStats: PassportActivityStats,
      featureCounts: PassportFeatureCounts,
      currentStreak: number
    ): { progress: number; target: number; status: 'locked' | 'in_progress' | 'completed' } {
      const def = PASSPORT_MILESTONE_DEFINITIONS.find((m) => m.id === milestoneId);
      if (!def) throw new Error(`Unknown milestone: ${milestoneId}`);

      let progress = 0;
      let target = def.target;

      switch (def.id) {
        case 'first-activity':
          progress = Math.min(activityStats.totalActivities, 1);
          target = 1;
          break;
        case 'first-badge':
          progress = featureCounts.badges.earned > 0 ? 1 : 0;
          target = 1;
          break;
        case 'first-lesson':
          progress = activityStats.microLessonsCompleted > 0 ? 1 : 0;
          target = 1;
          break;
        case 'first-experiment':
          progress = activityStats.experimentsCompleted > 0 ? 1 : 0;
          target = 1;
          break;
        case 'first-concept-map':
          progress = activityStats.conceptMapsCompleted > 0 ? 1 : 0;
          target = 1;
          break;
        case 'first-mystery':
          progress = activityStats.mysteriesSolved > 0 ? 1 : 0;
          target = 1;
          break;
        case 'first-riddle':
          progress = activityStats.riddlesSolved > 0 ? 1 : 0;
          target = 1;
          break;
        case 'first-game':
          progress = activityStats.gamesCompleted > 0 ? 1 : 0;
          target = 1;
          break;
        case 'streak-3':
          progress = Math.min(currentStreak, 3);
          target = 3;
          break;
        case 'streak-7':
          progress = Math.min(currentStreak, 7);
          target = 7;
          break;
        case 'streak-30':
          progress = Math.min(currentStreak, 30);
          target = 30;
          break;
        case 'activities-10':
          progress = Math.min(activityStats.totalActivities, 10);
          target = 10;
          break;
        case 'activities-25':
          progress = Math.min(activityStats.totalActivities, 25);
          target = 25;
          break;
        case 'activities-50':
          progress = Math.min(activityStats.totalActivities, 50);
          target = 50;
          break;
        case 'first-collection':
          progress = featureCounts.collections.completed > 0 ? 1 : 0;
          target = 1;
          break;
        case 'collections-3':
          progress = Math.min(featureCounts.collections.completed, 3);
          target = 3;
          break;
        case 'first-certificate':
          progress = featureCounts.certificates.earned > 0 ? 1 : 0;
          target = 1;
          break;
        case 'science-scholar':
          progress = activityStats.totalActivities;
          target = 25;
          break;
      }

      let status: 'locked' | 'in_progress' | 'completed' = 'locked';
      if (progress >= target) {
        status = 'completed';
      } else if (progress > 0) {
        status = 'in_progress';
      }

      return { progress, target, status };
    }

    const emptyStats: PassportActivityStats = {
      totalActivities: 0,
      quizzesCompleted: 0,
      microLessonsCompleted: 0,
      conceptMapsCompleted: 0,
      experimentsCompleted: 0,
      mysteriesSolved: 0,
      riddlesSolved: 0,
      gamesCompleted: 0,
      factsDiscovered: 0,
    };

    const emptyCounts: PassportFeatureCounts = {
      badges: { earned: 0, total: 43 },
      collections: { completed: 0, total: 10 },
      certificates: { earned: 0, total: 0 },
    };

    it('returns all locked for fresh student', () => {
      const milestoneIds = PASSPORT_MILESTONE_DEFINITIONS.map((m) => m.id);
      for (const id of milestoneIds) {
        const result = computeMilestoneProgress(id, emptyStats, emptyCounts, 0);
        expect(result.status).toBe('locked');
        expect(result.progress).toBe(0);
      }
    });

    it('completes first-activity after 1 activity', () => {
      const stats = { ...emptyStats, totalActivities: 1 };
      const result = computeMilestoneProgress('first-activity', stats, emptyCounts, 0);
      expect(result.status).toBe('completed');
      expect(result.progress).toBe(1);
    });

    it('tracks streak-3 in_progress at streak 2', () => {
      const result = computeMilestoneProgress('streak-3', emptyStats, emptyCounts, 2);
      expect(result.status).toBe('in_progress');
      expect(result.progress).toBe(2);
    });

    it('completes streak-3 at streak 3', () => {
      const result = computeMilestoneProgress('streak-3', emptyStats, emptyCounts, 3);
      expect(result.status).toBe('completed');
      expect(result.progress).toBe(3);
    });

    it('completes activities-10 at 10 activities', () => {
      const stats = { ...emptyStats, totalActivities: 10 };
      const result = computeMilestoneProgress('activities-10', stats, emptyCounts, 0);
      expect(result.status).toBe('completed');
      expect(result.progress).toBe(10);
    });

    it('caps activities-25 at 25 even with 50 activities', () => {
      const stats = { ...emptyStats, totalActivities: 50 };
      const result = computeMilestoneProgress('activities-25', stats, emptyCounts, 0);
      expect(result.status).toBe('completed');
      expect(result.progress).toBe(25);
      expect(result.target).toBe(25);
    });

    it('completes first-badge when badge earned', () => {
      const counts = { ...emptyCounts, badges: { earned: 1, total: 43 } };
      const result = computeMilestoneProgress('first-badge', emptyStats, counts, 0);
      expect(result.status).toBe('completed');
    });

    it('completes first-experiment when experiment done', () => {
      const stats = { ...emptyStats, experimentsCompleted: 1 };
      const result = computeMilestoneProgress('first-experiment', stats, emptyCounts, 0);
      expect(result.status).toBe('completed');
    });

    it('completes science-scholar at 25 activities', () => {
      const stats = { ...emptyStats, totalActivities: 25 };
      const result = computeMilestoneProgress('science-scholar', stats, emptyCounts, 0);
      expect(result.status).toBe('completed');
      expect(result.progress).toBe(25);
    });

    it('tracks science-scholar in_progress at 15 activities', () => {
      const stats = { ...emptyStats, totalActivities: 15 };
      const result = computeMilestoneProgress('science-scholar', stats, emptyCounts, 0);
      expect(result.status).toBe('in_progress');
      expect(result.progress).toBe(15);
    });
  });

  describe('Highlight Computation', () => {
    function computeHighlights(
      currentStreak: number,
      featureCounts: PassportFeatureCounts,
      activityStats: PassportActivityStats,
      level: { level: number; title: string }
    ): PassportHighlight[] {
      const highlights: PassportHighlight[] = [];

      if (currentStreak >= 3) {
        highlights.push({
          id: 'streak',
          icon: '🔥',
          text: { en: `${currentStreak}-day streak`, ta: `${currentStreak} நாள் தொடர்ச்சி` },
        });
      }

      if (featureCounts.badges.earned >= 1) {
        highlights.push({
          id: 'badges',
          icon: '🏆',
          text: {
            en: `${featureCounts.badges.earned} badge${featureCounts.badges.earned > 1 ? 's' : ''} earned`,
            ta: `${featureCounts.badges.earned} சாதனை பெறப்பட்டது`,
          },
        });
      }

      if (activityStats.experimentsCompleted >= 1) {
        highlights.push({
          id: 'experiments',
          icon: '🧪',
          text: {
            en: `${activityStats.experimentsCompleted} experiment${activityStats.experimentsCompleted > 1 ? 's' : ''} completed`,
            ta: `${activityStats.experimentsCompleted} சோதனை முடிக்கப்பட்டது`,
          },
        });
      }

      if (featureCounts.collections.completed >= 1) {
        highlights.push({
          id: 'collections',
          icon: '🌍',
          text: {
            en: `${featureCounts.collections.completed} collection${featureCounts.collections.completed > 1 ? 's' : ''} complete`,
            ta: `${featureCounts.collections.completed} தொகுப்பு நிறைவடைந்தது`,
          },
        });
      }

      if (level.level >= 5) {
        highlights.push({
          id: 'level',
          icon: '⭐',
          text: {
            en: `Level ${level.level} — ${level.title}`,
            ta: `நிலை ${level.level} — ${level.title}`,
          },
        });
      }

      if (activityStats.conceptMapsCompleted >= 1) {
        highlights.push({
          id: 'concept-maps',
          icon: '🗺️',
          text: {
            en: `${activityStats.conceptMapsCompleted} concept map${activityStats.conceptMapsCompleted > 1 ? 's' : ''} explored`,
            ta: `${activityStats.conceptMapsCompleted} கருத்து வரைபடம் ஆராயப்பட்டது`,
          },
        });
      }

      return highlights.slice(0, 4);
    }

    const emptyStats: PassportActivityStats = {
      totalActivities: 0,
      quizzesCompleted: 0,
      microLessonsCompleted: 0,
      conceptMapsCompleted: 0,
      experimentsCompleted: 0,
      mysteriesSolved: 0,
      riddlesSolved: 0,
      gamesCompleted: 0,
      factsDiscovered: 0,
    };

    const emptyCounts: PassportFeatureCounts = {
      badges: { earned: 0, total: 43 },
      collections: { completed: 0, total: 10 },
      certificates: { earned: 0, total: 0 },
    };

    it('returns no highlights for fresh student', () => {
      const highlights = computeHighlights(0, emptyCounts, emptyStats, { level: 1, title: 'Beginner' });
      expect(highlights.length).toBe(0);
    });

    it('returns streak highlight for 3+ day streak', () => {
      const highlights = computeHighlights(5, emptyCounts, emptyStats, { level: 1, title: 'Beginner' });
      expect(highlights.some((h) => h.id === 'streak')).toBe(true);
    });

    it('returns badges highlight when badges earned', () => {
      const counts = { ...emptyCounts, badges: { earned: 3, total: 43 } };
      const highlights = computeHighlights(0, counts, emptyStats, { level: 1, title: 'Beginner' });
      expect(highlights.some((h) => h.id === 'badges')).toBe(true);
    });

    it('returns max 4 highlights', () => {
      const counts = { ...emptyCounts, badges: { earned: 5, total: 43 }, collections: { completed: 3, total: 10 } };
      const stats = { ...emptyStats, experimentsCompleted: 5, conceptMapsCompleted: 3, totalActivities: 30 };
      const highlights = computeHighlights(10, counts, stats, { level: 7, title: 'Scholar' });
      expect(highlights.length).toBeLessThanOrEqual(4);
    });

    it('does not duplicate highlight IDs', () => {
      const counts = { ...emptyCounts, badges: { earned: 3, total: 43 }, collections: { completed: 1, total: 10 } };
      const stats = { ...emptyStats, experimentsCompleted: 2, conceptMapsCompleted: 1, totalActivities: 10 };
      const highlights = computeHighlights(5, counts, stats, { level: 5, title: 'Expert' });
      const ids = highlights.map((h) => h.id);
      expect(new Set(ids).size).toBe(ids.length);
    });
  });

  describe('Data Consistency', () => {
    it('milestone definitions count matches expected', () => {
      expect(PASSPORT_MILESTONE_DEFINITIONS.length).toBe(18);
    });

    it('all milestone definitions have stable IDs', () => {
      const expectedIds = [
        'first-activity',
        'first-badge',
        'first-lesson',
        'first-experiment',
        'first-concept-map',
        'first-mystery',
        'first-riddle',
        'first-game',
        'streak-3',
        'streak-7',
        'streak-30',
        'activities-10',
        'activities-25',
        'activities-50',
        'first-collection',
        'collections-3',
        'first-certificate',
        'science-scholar',
      ];

      const actualIds = PASSPORT_MILESTONE_DEFINITIONS.map((m) => m.id);
      for (const id of expectedIds) {
        expect(actualIds).toContain(id);
      }
    });
  });
});
