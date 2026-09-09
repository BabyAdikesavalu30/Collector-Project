/**
 * Experiment Lab Shared System Integrations Unit Tests
 * Verifies Daily Goal, Achievements, Search Indexer, and Profile aggregation integrations.
 */

import { storage, STORAGE_KEYS } from '../../../storage/asyncStorage';
import { recordActivity, getActivityHistory, getTotalXpBalance } from '../../activity';
import { COUNTED_ACTIVITY_TYPES } from '../../daily-goal/dailyGoal.types';
import { getActivityIdentityKey } from '../../daily-goal/dailyGoal.engine';
import { evaluateUnlockedBadges } from '../../achievements/achievements.engine';
import { buildSearchIndex } from '../../search/search.indexer';
import { computeActivitySummary } from '../../profile/profile.aggregate';

describe('Experiment Lab Shared System Integrations', () => {
  beforeEach(async () => {
    await storage.removeItem(STORAGE_KEYS.EXPERIMENT_PROGRESS);
    await storage.removeItem(STORAGE_KEYS.EXPERIMENT_BOOKMARKS);
    await storage.removeItem(STORAGE_KEYS.ACTIVITY_HISTORY);
    await storage.removeItem(STORAGE_KEYS.XP_TRANSACTIONS);
    await storage.removeItem(STORAGE_KEYS.ACHIEVEMENTS_UNLOCKED);
    await storage.removeItem(STORAGE_KEYS.DAILY_GOAL_STATE);
  });

  it('awards +25 XP and writes experiment_completed to activity history', async () => {
    const result = await recordActivity({
      type: 'experiment_completed',
      dedupeKey: 'experiment:exp-ohms-law',
      title: "Ohm's Law",
      titleTa: 'ஓம் விதி',
      metadata: {
        experimentId: 'exp-ohms-law',
        subject: 'physics',
      },
    });

    expect(result).not.toBeNull();
    expect(result?.xpEarned).toBe(25);

    const balance = await getTotalXpBalance();
    expect(balance).toBe(25);

    const history = await getActivityHistory();
    expect(history.length).toBe(1);
    expect(history[0].type).toBe('experiment_completed');
    expect(history[0].metadata?.experimentId).toBe('exp-ohms-law');
  });

  it('includes experiment_completed in COUNTED_ACTIVITY_TYPES and resolves identity key', () => {
    expect(COUNTED_ACTIVITY_TYPES).toContain('experiment_completed');

    const activity = {
      id: 'act-exp-1',
      type: 'experiment_completed' as const,
      title: "Ohm's Law",
      titleTa: 'ஓம் விதி',
      timestamp: Date.now(),
      xpEarned: 25,
      pointsEarned: 0,
      metadata: {
        experimentId: 'exp-ohms-law',
      },
    };

    const key = getActivityIdentityKey(activity);
    expect(key).toBe('experiment:exp-ohms-law');
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

  it('unlocks first-experiment achievement when 1 experiment is completed', () => {
    const badges = evaluateUnlockedBadges({
      quizHistory: [],
      quizStats: baseQuizStats,
      gamesPlayedCount: 0,
      totalLevelsCleared: 0,
      experimentsCompletedCount: 1,
      experimentSubjectsCount: 1,
    });

    expect(badges).toContain('first-experiment');
    expect(badges).not.toContain('experiment-5');
  });

  it('unlocks experiment-5 and science-lab-explorer achievements at thresholds', () => {
    const badges = evaluateUnlockedBadges({
      quizHistory: [],
      quizStats: baseQuizStats,
      gamesPlayedCount: 0,
      totalLevelsCleared: 0,
      experimentsCompletedCount: 5,
      experimentSubjectsCount: 4,
    });

    expect(badges).toContain('first-experiment');
    expect(badges).toContain('experiment-5');
    expect(badges).toContain('science-lab-explorer');
    expect(badges).not.toContain('experiment-10');
  });

  it('unlocks experiment-10 achievement when 10 experiments are completed', () => {
    const badges = evaluateUnlockedBadges({
      quizHistory: [],
      quizStats: baseQuizStats,
      gamesPlayedCount: 0,
      totalLevelsCleared: 0,
      experimentsCompletedCount: 10,
      experimentSubjectsCount: 5,
    });

    expect(badges).toContain('first-experiment');
    expect(badges).toContain('experiment-5');
    expect(badges).toContain('experiment-10');
    expect(badges).toContain('science-lab-explorer');
  });

  it('indexes all 15 experiments in the global search index', () => {
    const index = buildSearchIndex();
    const expItems = index.items.filter((item) => item.category === 'experiment');

    expect(expItems.length).toBe(15);

    const ohmsLawItem = expItems.find((item) => item.route === '/experiment/exp-ohms-law');
    expect(ohmsLawItem).toBeDefined();
    expect(ohmsLawItem?.title).toBe("Ohm's Law");
    expect(ohmsLawItem?.titleTa).toBe('ஓம் விதி');
    expect(ohmsLawItem?.categoryLabel).toBe('Experiment');
    expect(ohmsLawItem?.categoryLabelTa).toBe('பரிசோதனை');
  });

  it('aggregates experimentsCompleted in profile activity summary', () => {
    const summary = computeActivitySummary({
      experiment_completed: 3,
      quiz_completed: 2,
    });
    expect(summary.experimentsCompleted).toBe(3);
    expect(summary.quizzesCompleted).toBe(2);
    expect(summary.totalActivities).toBe(5);
  });
});
