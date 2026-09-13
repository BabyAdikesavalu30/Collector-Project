/**
 * Dashboard Service Contract
 * Clean frontend service boundary for fetching and caching dashboard telemetry.
 * Ready for future Supabase / REST API integration.
 */

import { storage, STORAGE_KEYS } from '../../storage/asyncStorage';
import { DashboardData, DailyGoalPreview } from './home.types';
import { MOCK_ACTIVE_DASHBOARD, MOCK_EMPTY_DASHBOARD } from './home.mock';
import { getMostRecentAchievement, getBadgeDefinition } from '../achievements';
import { getChallengeDateString, buildDailyChallengePreview } from '../challenges';
import { calculateScienceLevel } from '../levels';
import { getXpTransactions } from '../xp';
import { getActivityHistory } from '../activity';
import { getMissionsSnapshot } from '../missions';
import { loadOrInitializeDailyGoal, DailyGoalWithProgress } from '../daily-goal';
import { buildRecommendations } from '../recommendations';
import { StreakService } from '../streaks';
import { SessionRepository } from '../auth';

export interface IDashboardService {
  getDashboard(options?: { forceRefresh?: boolean; mockEmpty?: boolean }): Promise<DashboardData>;
  getCachedDashboard(): Promise<DashboardData | null>;
}

class DashboardService implements IDashboardService {
  /**
   * Retrieves dashboard data, preferring cached data if offline, or simulating network fetch.
   */
  async getDashboard(options?: { forceRefresh?: boolean; mockEmpty?: boolean }): Promise<DashboardData> {
    // Try cached data first for offline resilience (skip if forceRefresh)
    if (!options?.forceRefresh) {
      const cached = await this.getCachedDashboard();
      if (cached) {
        return cached;
      }
    }

    // Simulated short delay for network transition
    await new Promise((resolve) => setTimeout(resolve, 550));

    const session = await SessionRepository.getSession();
    const isDemo = session?.authMode === 'demo';

    // Base template: Demo mode uses mock template; production uses clean zero-valued base
    const baseData: DashboardData = (isDemo && !options?.mockEmpty)
      ? JSON.parse(JSON.stringify(MOCK_ACTIVE_DASHBOARD))
      : options?.mockEmpty
      ? JSON.parse(JSON.stringify(MOCK_EMPTY_DASHBOARD))
      : {
          student: {
            name: session?.fullName || 'Young Scientist',
            grade: '—',
            schoolName: '',
            unreadNotificationsCount: 0,
          },
          overallProgressPercentage: 0,
          streakDays: 0,
          points: 0,
          rank: undefined,
          continueTopic: null,
          dailyChallenge: null,
          recentAchievement: null,
          isNewStudent: true,
        };

    // Try reading registered profile info to personalize dashboard
    try {
      const storedProfile = await storage.getItem<{ fullName?: string; grade?: string; school?: string }>(
        STORAGE_KEYS.STUDENT_PROFILE
      );
      if (storedProfile) {
        if (storedProfile.fullName) {
          baseData.student.name = storedProfile.fullName.trim().split(' ')[0] || storedProfile.fullName;
        }
        if (storedProfile.grade) {
          baseData.student.grade = storedProfile.grade;
        }
        if (storedProfile.school) {
          baseData.student.schoolName = storedProfile.school;
        }
      }
    } catch {
      // Keep defaults
    }

    // Wire the recent-achievement card to the real, most-recently-unlocked badge.
    // Falls back to null (card hidden) when nothing is unlocked yet.
    try {
      const recent = await getMostRecentAchievement();
      if (recent) {
        const def = getBadgeDefinition(recent.badgeId);
        baseData.recentAchievement = {
          id: recent.badgeId,
          title: def.title.en,
          titleTa: def.title.ta,
          unlockedLabel: 'Unlocked recently',
          icon: def.icon,
        };
      } else {
        baseData.recentAchievement = null;
      }
    } catch {
      // Keep mock default if storage unavailable
    }

    // Wire the daily-challenge card to today's real, deterministic question
    // instead of the hardcoded mock question.
    try {
      const preview = buildDailyChallengePreview(getChallengeDateString());
      if (preview) {
        baseData.dailyChallenge = {
          id: preview.id,
          title: preview.title.en,
          titleTa: preview.title.ta,
          questionPreview: preview.questionPreview.en,
          questionPreviewTa: preview.questionPreview.ta,
          durationMinutes: preview.durationMinutes,
          xpReward: preview.xpReward,
        };
      } else {
        baseData.dailyChallenge = null;
      }
    } catch {
      // Keep mock default if question bank is unavailable
    }

    // Wire unified science level + XP progress & points (additive; derived from ledger)
    try {
      const transactions = await getXpTransactions();
      const totalXp = transactions.reduce((sum, t) => sum + t.amount, 0);
      const level = calculateScienceLevel(totalXp);
      baseData.scienceLevel = {
        level: level.level,
        title: level.title,
        titleTa: level.titleTa,
        icon: level.icon,
        progressPercent: level.progressPercent,
        totalXp,
        xpToNextLevel: level.xpToNextLevel,
        isMaxLevel: level.isMaxLevel,
      };
      if (transactions.length > 0 || options?.mockEmpty) {
        baseData.points = totalXp;
      }
    } catch {
      baseData.scienceLevel = null;
      if (options?.mockEmpty) baseData.points = 0;
    }

    // Read canonical activity history once and share across consumers
    let history: Awaited<ReturnType<typeof getActivityHistory>> = [];
    try {
      history = await getActivityHistory();
    } catch {
      history = [];
    }

    // Wire streak and activity progress from canonical activity history
    try {
      if (history.length > 0 || options?.mockEmpty) {
        const streak = await StreakService.getUnifiedStreak();
        baseData.streakDays = streak.currentStreak;
        baseData.overallProgressPercentage = Math.min(100, Math.round((history.length / 50) * 100));
        if (history.length === 0) {
          baseData.rank = undefined;
        }
      }
    } catch {
      if (options?.mockEmpty) {
        baseData.streakDays = 0;
        baseData.overallProgressPercentage = 0;
      }
    }

    // Wire the first daily mission preview.
    try {
      const snapshot = await getMissionsSnapshot(history);
      const first = snapshot.daily[0];
      if (first) {
        baseData.dailyMissionPreview = {
          title: first.mission.title,
          titleTa: first.mission.titleTa,
          icon: first.mission.icon,
          current: first.progress.current,
          target: first.progress.target,
          claimed: first.status === 'claimed',
        };
      } else {
        baseData.dailyMissionPreview = null;
      }
    } catch {
      baseData.dailyMissionPreview = null;
    }

    // Wire the daily goal preview.
    try {
      const dailyGoal = await loadOrInitializeDailyGoal(history);
      if (dailyGoal) {
        baseData.dailyGoalPreview = {
          title: dailyGoal.definition.title,
          titleTa: dailyGoal.definition.titleTa,
          current: dailyGoal.progress.current,
          target: dailyGoal.progress.target,
          rewardPoints: dailyGoal.definition.reward.points,
          rewardXp: dailyGoal.definition.reward.xp,
          status: dailyGoal.status,
        };
      } else {
        baseData.dailyGoalPreview = null;
      }
    } catch {
      baseData.dailyGoalPreview = null;
    }

    // Wire a rule-based recommendation.
    try {
      const counts = history.reduce<Record<string, number>>((acc, h) => {
        acc[h.type] = (acc[h.type] || 0) + 1;
        return acc;
      }, {});
      const recommendations = buildRecommendations({
        recentlyPlayedGameIds: [],
        favoriteGameIds: [],
        activityCounts: counts,
        totalXp: baseData.scienceLevel?.totalXp || 0,
        streakDays: baseData.streakDays,
        strengths: {},
      });
      if (recommendations.length > 0) {
        const rec = recommendations[0];
        baseData.recommendedActivity = {
          title: rec.title,
          titleTa: rec.titleTa,
          subtitle: rec.subtitle,
          subtitleTa: rec.subtitleTa,
          icon: rec.icon,
          route: rec.route,
        };
      }
    } catch {
      baseData.recommendedActivity = null;
    }

    // Cache updated data
    await storage.setItem(STORAGE_KEYS.DASHBOARD_CACHE, baseData);

    return baseData;
  }

  /**
   * Fast synchronous-like cached read for instant rendering / offline fallback.
   */
  async getCachedDashboard(): Promise<DashboardData | null> {
    try {
      const cached = await storage.getItem<DashboardData>(STORAGE_KEYS.DASHBOARD_CACHE);
      return cached;
    } catch {
      return null;
    }
  }
}

export const dashboardService = new DashboardService();
