/**
 * Dashboard Service Contract
 * Clean frontend service boundary for fetching and caching dashboard telemetry.
 * Ready for future Supabase / REST API integration.
 */

import { storage, STORAGE_KEYS } from '../../storage/asyncStorage';
import { DashboardData } from './home.types';
import { MOCK_ACTIVE_DASHBOARD } from './home.mock';
import { getMostRecentAchievement, getBadgeDefinition } from '../achievements';
import { getChallengeDateString, buildDailyChallengePreview } from '../challenges';

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

    // Base template
    const baseData: DashboardData = JSON.parse(JSON.stringify(MOCK_ACTIVE_DASHBOARD));

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
