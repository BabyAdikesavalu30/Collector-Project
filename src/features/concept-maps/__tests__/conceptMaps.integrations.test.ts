/**
 * Concept Maps Integrations Unit Tests
 * Verifies unified progression, Daily Goal, Achievements, Search Indexer, and Profile summary.
 */

import { storage, STORAGE_KEYS } from '../../../storage/asyncStorage';
import { recordActivity, getActivityHistory, getTotalXpBalance } from '../../activity';
import { COUNTED_ACTIVITY_TYPES } from '../../daily-goal/dailyGoal.types';
import { getActivityIdentityKey } from '../../daily-goal/dailyGoal.engine';
import { evaluateUnlockedBadges } from '../../achievements/achievements.engine';
import { buildSearchIndex } from '../../search/search.indexer';
import { computeActivitySummary } from '../../profile/profile.aggregate';

describe('Concept Maps Shared System Integrations', () => {
  beforeEach(async () => {
    await storage.removeItem(STORAGE_KEYS.CONCEPT_MAPS_PROGRESS);
    await storage.removeItem(STORAGE_KEYS.CONCEPT_MAPS_BOOKMARKS);
    await storage.removeItem(STORAGE_KEYS.ACTIVITY_HISTORY);
    await storage.removeItem(STORAGE_KEYS.XP_TRANSACTIONS);
    await storage.removeItem(STORAGE_KEYS.ACHIEVEMENTS_UNLOCKED);
    await storage.removeItem(STORAGE_KEYS.DAILY_GOAL_STATE);
  });

  it('awards unified +10 XP and logs activity event on map completion', async () => {
    const result = await recordActivity({
      type: 'concept_map_completed',
      dedupeKey: 'test-map-force-and-motion',
      title: 'Force & Motion',
      titleTa: 'விசை மற்றும் இயக்கம்',
      metadata: {
        subject: 'physics',
      },
    });

    expect(result).not.toBeNull();
    expect(result?.xpEarned).toBe(10);

    const balance = await getTotalXpBalance();
    expect(balance).toBe(10);

    const history = await getActivityHistory();
    expect(history.length).toBe(1);
    expect(history[0].type).toBe('concept_map_completed');
    expect(history[0].metadata?.subject).toBe('physics');
  });

  it('includes concept_map_completed in COUNTED_ACTIVITY_TYPES and resolves unique identity key', () => {
    expect(COUNTED_ACTIVITY_TYPES).toContain('concept_map_completed');

    const activity = {
      id: 'act-1',
      type: 'concept_map_completed' as const,
      title: 'Force & Motion',
      titleTa: 'விசை மற்றும் இயக்கம்',
      timestamp: Date.now(),
      xpEarned: 10,
      pointsEarned: 0,
      metadata: {
        mapId: 'map-force-and-motion',
      },
    };

    const key = getActivityIdentityKey(activity);
    expect(key).toBe('concept_map:map-force-and-motion');
  });

  const baseQuizStats = {
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

  it('unlocks first-concept-map achievement when 1 map is completed', () => {
    const badges = evaluateUnlockedBadges({
      quizHistory: [],
      quizStats: baseQuizStats,
      gamesPlayedCount: 0,
      totalLevelsCleared: 0,
      conceptMapsCompletedCount: 1,
      conceptMapSubjectsCount: 1,
    });

    expect(badges).toContain('first-concept-map');
    expect(badges).not.toContain('concept-map-5');
  });

  it('unlocks concept-map-5 and concept-explorer achievements at thresholds', () => {
    const badges = evaluateUnlockedBadges({
      quizHistory: [],
      quizStats: baseQuizStats,
      gamesPlayedCount: 0,
      totalLevelsCleared: 0,
      conceptMapsCompletedCount: 5,
      conceptMapSubjectsCount: 4,
    });

    expect(badges).toContain('first-concept-map');
    expect(badges).toContain('concept-map-5');
    expect(badges).toContain('concept-explorer');
    expect(badges).not.toContain('concept-map-10');
  });

  it('unlocks concept-map-10 achievement when 10 maps are completed', () => {
    const badges = evaluateUnlockedBadges({
      quizHistory: [],
      quizStats: baseQuizStats,
      gamesPlayedCount: 0,
      totalLevelsCleared: 0,
      conceptMapsCompletedCount: 10,
      conceptMapSubjectsCount: 5,
    });

    expect(badges).toContain('first-concept-map');
    expect(badges).toContain('concept-map-5');
    expect(badges).toContain('concept-map-10');
    expect(badges).toContain('concept-explorer');
  });

  it('indexes all 16 concept maps in the global search index', () => {
    const index = buildSearchIndex();
    const mapItems = index.items.filter((item) => item.category === 'concept_map');

    expect(mapItems.length).toBe(16);

    const photosynth = mapItems.find((item) => item.route === '/concept-map/map-photosynthesis');
    expect(photosynth).toBeDefined();
    expect(photosynth?.title).toBe('Photosynthesis');
    expect(photosynth?.titleTa).toBe('ஒளிச்சேர்க்கை');
    expect(photosynth?.route).toBe('/concept-map/map-photosynthesis');
  });

  it('aggregates conceptMapsCompleted in profile activity summary', () => {
    const summary = computeActivitySummary({
      concept_map_completed: 2,
      quiz_completed: 1,
    });
    expect(summary.conceptMapsCompleted).toBe(2);
    expect(summary.quizzesCompleted).toBe(1);
    expect(summary.totalActivities).toBe(3);
  });
});
