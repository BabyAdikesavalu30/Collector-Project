/**
 * Achievements Feature Storage & Sync Service
 * Persists unlocked achievements, gathers live canonical data context,
 * evaluates badge rules, awards XP, and triggers notifications with duplicate protection.
 */

import { storage, STORAGE_KEYS } from '../../storage/asyncStorage';
import { recordActivity, getActivityHistory } from '../activity';
import { getQuizHistory, getQuizStats } from '../quiz';
import { getAllGamesProgress } from '../games';
import { StreakService } from '../streaks';
import { createNotification } from '../notifications/notifications.factory';
import {
  Achievement,
  AchievementBadgeId,
  AchievementEvaluationContext,
  AchievementInput,
  AchievementSummary,
  UnlockedAchievement,
} from './achievements.types';
import {
  ACHIEVEMENT_DEFINITIONS,
  calculateAchievementSummary,
  evaluateAllAchievements,
  getBadgeDefinition,
  getRecentUnlocks,
  selectNextAchievement,
} from './achievements.engine';

export const ACHIEVEMENTS_KEY = STORAGE_KEYS.ACHIEVEMENTS_UNLOCKED;

/**
 * Returns badgeId -> unlockedAt map of previously persisted unlocks.
 * Recovers safely from malformed or corrupted storage.
 */
export async function getUnlockedAchievements(): Promise<Record<string, number>> {
  try {
    const data = await storage.getItem<Record<string, number>>(ACHIEVEMENTS_KEY);
    return data && typeof data === 'object' ? data : {};
  } catch (error) {
    console.warn('[AchievementsStorage] Failed to read unlocked achievements:', error);
    return {};
  }
}

/**
 * Gathers canonical live data context across all Vigyaan feature repositories.
 */
export async function buildEvaluationContext(): Promise<AchievementEvaluationContext> {
  const [activityHistory, streakInfo, quizHistory, quizStats, games] = await Promise.all([
    getActivityHistory().catch(() => []),
    StreakService.getUnifiedStreak().catch(() => ({
      currentStreak: 0,
      longestStreak: 0,
      lastActiveDate: null,
      activeDates: [],
    })),
    getQuizHistory().catch(() => []),
    getQuizStats().catch(() => ({
      totalPoints: 0,
      quizzesCompleted: 0,
      totalQuestionsAttempted: 0,
      totalCorrectAnswers: 0,
      overallAccuracy: 0,
      currentStreakDays: 0,
      longestStreakDays: 0,
      streakHistory: [],
      subjectStats: [],
    })),
    getAllGamesProgress().catch(() => ({})),
  ]);

  // Compute games stats
  let gamesPlayedCount = 0;
  let totalLevelsCleared = 0;
  Object.values(games).forEach((g) => {
    let gameHasCompletion = false;
    Object.entries(g.levels).forEach(([lvlKey, lvl]) => {
      if (!lvlKey.startsWith('level-') && lvl.completed) {
        totalLevelsCleared++;
        gameHasCompletion = true;
      }
    });
    if (gameHasCompletion) gamesPlayedCount++;
  });

  // Extract counts by activity type from activityHistory
  const microLessonsCompleted = activityHistory.filter((a) => a.type === 'micro_lesson_completed');
  const conceptMapsCompleted = activityHistory.filter((a) => a.type === 'concept_map_completed');
  const experimentsCompleted = activityHistory.filter((a) => a.type === 'experiment_completed');
  const riddlesSolved = activityHistory.filter((a) => a.type === 'riddle_completed');
  const mysteriesSolved = activityHistory.filter((a) => a.type === 'mystery_completed');
  const factsDiscovered = activityHistory.filter((a) => a.type === 'fact_discovered');

  // Count distinct subjects explored
  const microSubjects = new Set(microLessonsCompleted.map((a) => a.metadata?.subjectId).filter(Boolean));
  const conceptSubjects = new Set(conceptMapsCompleted.map((a) => a.metadata?.subjectId).filter(Boolean));
  const experimentSubjects = new Set(experimentsCompleted.map((a) => a.metadata?.subjectId).filter(Boolean));

  return {
    activityHistory,
    streakInfo,
    quizHistory,
    quizStats,
    gamesPlayedCount,
    totalLevelsCleared,
    microLessonsCompletedCount: microLessonsCompleted.length,
    microLessonSubjectsCount: microSubjects.size,
    conceptMapsCompletedCount: conceptMapsCompleted.length,
    conceptMapSubjectsCount: conceptSubjects.size,
    experimentsCompletedCount: experimentsCompleted.length,
    experimentSubjectsCount: experimentSubjects.size,
    riddlesSolvedCount: riddlesSolved.length,
    mysteriesSolvedCount: mysteriesSolved.length,
    factsDiscoveredCount: factsDiscovered.length,
    dailyGoalsCompletedCount: activityHistory.filter(
      (a) => a.type === 'challenge_completed' || (a.type === 'mission_completed' && a.metadata?.kind === 'daily_goal')
    ).length,
  };
}

/**
 * Persists the unlocked-at timestamps for newly satisfied badges.
 * Deduplicated: each badge is unlocked and rewarded exactly once.
 */
export async function persistUnlockedAchievements(
  badgeIds: AchievementBadgeId[],
  now: number = Date.now()
): Promise<UnlockedAchievement[]> {
  const existing = await getUnlockedAchievements();
  let changed = false;
  const newlyUnlocked: AchievementBadgeId[] = [];

  badgeIds.forEach((id) => {
    if (existing[id] === undefined) {
      existing[id] = now;
      changed = true;
      newlyUnlocked.push(id);
    }
  });

  if (changed) {
    await storage.setItem(ACHIEVEMENTS_KEY, existing);
  }

  // Award XP, trigger notification, and trigger celebration for each newly unlocked badge exactly once
  for (const badgeId of newlyUnlocked) {
    const def = getBadgeDefinition(badgeId);
    const xp = def.rewardXp || 40;

    await recordActivity({
      type: 'achievement_unlocked',
      dedupeKey: `achievement-${badgeId}`,
      title: def.title.en,
      titleTa: def.title.ta,
      subtitle: 'Achievement unlocked',
      subtitleTa: 'சாதனை திறக்கப்பட்டது',
      xpEarned: xp,
      timestamp: now,
      metadata: { badgeId, icon: def.icon },
    }).catch((err) => console.warn('[AchievementsStorage] recordActivity failed:', err));

    // Optional notification integration
    await createNotification({
      type: 'achievement',
      title: {
        en: `Badge Unlocked: ${def.title.en}!`,
        ta: `சாதனை திறக்கப்பட்டது: ${def.title.ta}!`,
      },
      body: {
        en: def.description.en,
        ta: def.description.ta,
      },
      action: { route: '/achievements' },
      id: `notif-achieve-${badgeId}`,
      timestamp: now,
    }).catch(() => null);

    // Centralized celebration integration
    try {
      const { celebrationService } = await import('../celebration');
      await celebrationService.triggerAchievementUnlocked(badgeId, def.title.en, def.icon, xp);
    } catch {
      // Best effort celebration
    }
  }

  // Re-evaluate certificates when new achievements are unlocked
  if (newlyUnlocked.length > 0) {
    try {
      const { recomputeAndPersistCertificates } = await import('../certificates/certificates.storage');
      const profile = await storage.getItem<{ fullName?: string; name?: string; grade?: string; school?: string }>(
        STORAGE_KEYS.STUDENT_PROFILE
      );
      const recipient = {
        name: profile?.fullName || profile?.name || 'Student',
        grade: String(profile?.grade || '8'),
        location: profile?.school || 'Tamil Nadu',
      };
      const totalUnlocks = Object.keys(existing).length;
      await recomputeAndPersistCertificates(
        {
          quizStats: await getQuizStats().catch(() => ({
            totalPoints: 0,
            quizzesCompleted: 0,
            totalQuestionsAttempted: 0,
            totalCorrectAnswers: 0,
            overallAccuracy: 0,
            currentStreakDays: 0,
            longestStreakDays: 0,
            streakHistory: [],
            subjectStats: [],
          })),
          unlockedBadgeCount: totalUnlocks,
        },
        recipient
      );
    } catch {
      // Best-effort certificate recheck
    }
  }

  return Object.entries(existing)
    .map(([badgeId, unlockedAt]) => ({ badgeId: badgeId as AchievementBadgeId, unlockedAt }))
    .sort((a, b) => b.unlockedAt - a.unlockedAt);
}

/**
 * Evaluates live context against all 43 achievement definitions,
 * persists new unlocks, and returns complete gallery state.
 */
export async function evaluateAndSyncAchievements(): Promise<{
  achievements: Achievement[];
  summary: AchievementSummary;
  nextBadge: Achievement | null;
  recentUnlocks: Achievement[];
}> {
  const context = await buildEvaluationContext();
  const existingUnlocks = await getUnlockedAchievements();
  const unlockedMap = new Map<AchievementBadgeId, number>(
    Object.entries(existingUnlocks).map(([id, time]) => [id as AchievementBadgeId, time])
  );

  const achievements = evaluateAllAchievements(ACHIEVEMENT_DEFINITIONS, context, unlockedMap);

  // Identify any badges newly satisfied
  const newlySatisfied: AchievementBadgeId[] = [];
  const now = Date.now();
  for (const a of achievements) {
    if (a.progress.percent >= 100 && !unlockedMap.has(a.id)) {
      newlySatisfied.push(a.id);
      unlockedMap.set(a.id, now);
      a.status = 'unlocked';
      a.unlockedAt = now;
    }
  }

  if (newlySatisfied.length > 0) {
    await persistUnlockedAchievements(newlySatisfied, now);
  }

  const summary = calculateAchievementSummary(achievements);
  const nextBadge = selectNextAchievement(achievements);
  const recentUnlocks = getRecentUnlocks(achievements, 4);

  return {
    achievements,
    summary,
    nextBadge,
    recentUnlocks,
  };
}

/**
 * Returns single achievement detail by badgeId.
 */
export async function getAchievementDetail(badgeId: AchievementBadgeId): Promise<Achievement | null> {
  const { achievements } = await evaluateAndSyncAchievements();
  return achievements.find((a) => a.id === badgeId) || null;
}

/**
 * Legacy compatibility wrapper: recomputes and returns unlocked achievements.
 */
export async function recomputeAndPersistAchievements(
  input: AchievementInput
): Promise<UnlockedAchievement[]> {
  const { evaluateUnlockedBadges } = await import('./achievements.engine');
  const satisfied = evaluateUnlockedBadges(input);
  return persistUnlockedAchievements(satisfied);
}

/**
 * Returns the most recently unlocked achievement, or null when none yet.
 * Used by Home dashboard and Profile.
 */
export async function getMostRecentAchievement(): Promise<UnlockedAchievement | null> {
  const all = await getUnlockedAchievements();
  const entries = Object.entries(all).sort((a, b) => b[1] - a[1]);
  if (entries.length === 0) return null;
  return { badgeId: entries[0][0] as AchievementBadgeId, unlockedAt: entries[0][1] };
}