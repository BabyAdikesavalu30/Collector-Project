/**
 * Authentication Service Contract
 * Clean frontend boundary for password authentication, OTP, demo access, and logout.
 * Connects demoAuthAdapter in development or backend adapter in production.
 */

import { PasswordLoginPayload, OtpLoginPayload, AuthActionResult } from './auth.types';
import { AUTH_CONFIG } from './auth.config';
import { demoAuthAdapter } from './auth.demo';
import { SessionRepository } from './auth.session';

export interface IAuthService {
  loginWithPassword(payload: PasswordLoginPayload): Promise<AuthActionResult>;
  requestLoginOtp(payload: OtpLoginPayload): Promise<AuthActionResult>;
  loginAsDemo(): Promise<AuthActionResult>;
  logout(): Promise<boolean>;
  resetDemo(): Promise<boolean>;
}

class AuthService implements IAuthService {
  /**
   * Direct Instant Demo Access (No credentials)
   */
  async loginAsDemo(): Promise<AuthActionResult> {
    return await demoAuthAdapter.createDemoAccessSession();
  }

  /**
   * Request sign in with identifier (email/phone) and password.
   */
  async loginWithPassword(payload: PasswordLoginPayload): Promise<AuthActionResult> {
    if (AUTH_CONFIG.AUTH_MODE === 'demo') {
      return await demoAuthAdapter.loginWithPassword(payload);
    }

    // Backend mode without active backend integration must not return fake success
    return {
      success: false,
      error: 'Backend authentication service is not configured',
    };
  }

  /**
   * Request a 6-digit OTP to be sent to the identifier.
   */
  async requestLoginOtp(payload: OtpLoginPayload): Promise<AuthActionResult> {
    if (AUTH_CONFIG.AUTH_MODE === 'demo') {
      return await demoAuthAdapter.requestLoginOtp(payload);
    }

    // Backend mode without active backend integration must not return fake success
    return {
      success: false,
      error: 'Backend OTP service is not configured',
    };
  }

  /**
   * Terminate active user session and clear per-student local progress
   * (activity history, XP ledger, mission claims, generated notifications,
   * recent searches). Device-level preferences are preserved.
   */
  async logout(): Promise<boolean> {
    await SessionRepository.clearSession();
    try {
      const { clearAllActivityData } = await import('../activity');
      const { clearXpData } = await import('../xp');
      const { clearMissionData } = await import('../missions');
      const { clearGeneratedNotifications } = await import('../notifications/notifications.factory');
      const { clearRecentSearches } = await import('../search');
      const { storage, STORAGE_KEYS } = await import('../../storage/asyncStorage');

      await Promise.all([
        clearAllActivityData(),
        clearXpData(),
        clearMissionData(),
        clearGeneratedNotifications(),
        clearRecentSearches(),
        storage.removeItem(STORAGE_KEYS.STUDENT_PROFILE),
        storage.removeItem(STORAGE_KEYS.STUDENT_PROFILE_SETUP_COMPLETE),
        storage.removeItem(STORAGE_KEYS.DAILY_GOAL_STATE),
        storage.removeItem(STORAGE_KEYS.ACHIEVEMENTS_UNLOCKED),
        storage.removeItem(STORAGE_KEYS.CERTIFICATES_EARNED),
        storage.removeItem(STORAGE_KEYS.GAMES_PROGRESS),
        storage.removeItem(STORAGE_KEYS.GAMES_STREAK),
        storage.removeItem(STORAGE_KEYS.GAMES_RECENT_HISTORY),
        storage.removeItem(STORAGE_KEYS.GAMES_FAVORITES),
        storage.removeItem(STORAGE_KEYS.GAMES_BADGES),
        storage.removeItem(STORAGE_KEYS.GAMES_DAILY_CHALLENGE),
        storage.removeItem(STORAGE_KEYS.LAST_PLAYED_GAME),
        storage.removeItem(STORAGE_KEYS.QUIZ_HISTORY),
        storage.removeItem(STORAGE_KEYS.QUIZ_DAILY_CHALLENGE),
        storage.removeItem(STORAGE_KEYS.MICRO_LESSONS_PROGRESS),
        storage.removeItem(STORAGE_KEYS.MICRO_LESSONS_BOOKMARKS),
        storage.removeItem(STORAGE_KEYS.CONCEPT_MAPS_PROGRESS),
        storage.removeItem(STORAGE_KEYS.CONCEPT_MAPS_BOOKMARKS),
        storage.removeItem(STORAGE_KEYS.EXPERIMENT_PROGRESS),
        storage.removeItem(STORAGE_KEYS.EXPERIMENT_BOOKMARKS),
        storage.removeItem(STORAGE_KEYS.MYSTERY_LAB_PROGRESS),
        storage.removeItem(STORAGE_KEYS.MYSTERY_LAB_ACTIVE_SESSION),
        storage.removeItem(STORAGE_KEYS.RIDDLE_PROGRESS),
        storage.removeItem(STORAGE_KEYS.CELEBRATION_STATE),
        storage.removeItem(STORAGE_KEYS.SPIN_WHEEL_STATE),
        storage.removeItem(STORAGE_KEYS.COLLECTIONS_PROGRESS),
        storage.removeItem(STORAGE_KEYS.EXPLORE_FAVORITES),
        storage.removeItem(STORAGE_KEYS.EXPLORE_RECENTLY_VIEWED),
        storage.removeItem(STORAGE_KEYS.DASHBOARD_CACHE),
        storage.removeItem(STORAGE_KEYS.NOTIFICATION_INBOX),
        storage.removeItem(STORAGE_KEYS.NOTIFICATIONS_STATE),
        storage.removeItem(STORAGE_KEYS.FUN_FACTS_PROGRESS),
      ]);
      storage.invalidateCache();
    } catch {
      // Progress cleanup is best-effort; the session is already cleared.
    }
    return true;
  }

  /**
   * Reset local demo artifacts.
   */
  async resetDemo(): Promise<boolean> {
    return await demoAuthAdapter.resetDemoData();
  }
}

export const authService = new AuthService();
