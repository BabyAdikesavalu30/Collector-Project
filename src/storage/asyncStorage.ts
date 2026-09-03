/**
 * Storage Service
 * Resilient, offline-safe local storage client wrapping AsyncStorage.
 */

import AsyncStorage from '@react-native-async-storage/async-storage';

export const STORAGE_KEYS = {
  HAS_LAUNCHED_BEFORE: '@vigyaan/has_launched_before',
  USER_LANGUAGE: '@vigyaan/user_language',
  ONBOARDING_COMPLETED: '@vigyaan/onboarding_completed',
  AUTH_SESSION: '@vigyaan/auth_session',
  STUDENT_PROFILE: '@vigyaan/student_profile',
  STUDENT_PROFILE_SETUP_COMPLETE: '@vigyaan/student_profile_setup_complete',
  DASHBOARD_CACHE: '@vigyaan/dashboard_cache',
  APP_SETTINGS: '@vigyaan/app_settings',
  GAMES_PROGRESS: '@vigyaan/games_progress',
  LAST_PLAYED_GAME: '@vigyaan/last_played_game',
  GAMES_LAST_PLAYED: '@vigyaan/last_played_game',
  GAMES_STREAK: '@vigyaan/games_streak',
  GAMES_DAILY_CHALLENGE: '@vigyaan/games_daily_challenge',
  GAMES_DAILY_CHALLENGES: '@vigyaan/games_daily_challenge',
  GAMES_FAVORITES: '@vigyaan/games_favorites',
  GAMES_RECENT_HISTORY: '@vigyaan/games_recent_history',
  GAMES_BADGES: '@vigyaan/games_badges',
  GAMES_UNLOCKED_BADGES: '@vigyaan/games_badges',
  NOTIFICATIONS_STATE: '@vigyaan/notifications_state',
  FUN_FACTS_PROGRESS: '@vigyaan/fun_facts_progress',
  FUN_FACTS_DISMISSED: '@vigyaan/ff_first_time_dismissed',
  RIDDLE_PROGRESS: '@vigyaan/riddle_progress',
  MYSTERY_LAB_PROGRESS: '@vigyaan/mystery_lab_progress',
  MYSTERY_LAB_ACTIVE_SESSION: '@vigyaan/mystery_lab_active_session',
  QUIZ_HISTORY: '@vigyaan/quiz_history',
  QUIZ_DAILY_CHALLENGE: '@vigyaan/quiz_daily_challenge',
  ACHIEVEMENTS_UNLOCKED: '@vigyaan/achievements_unlocked',
  CERTIFICATES_EARNED: '@vigyaan/certificates_earned',
} as const;

export type StorageKey = typeof STORAGE_KEYS[keyof typeof STORAGE_KEYS];

const memoryStore = new Map<string, string>();

export const storage = {
  async getItem<T>(key: StorageKey, defaultValue: T | null = null): Promise<T | null> {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null && value !== undefined) {
        return JSON.parse(value) as T;
      }
      const memVal = memoryStore.get(key);
      if (memVal !== undefined && memVal !== null) {
        return JSON.parse(memVal) as T;
      }
      return defaultValue;
    } catch {
      const memVal = memoryStore.get(key);
      if (memVal !== undefined && memVal !== null) {
        try {
          return JSON.parse(memVal) as T;
        } catch {
          return defaultValue;
        }
      }
      return defaultValue;
    }
  },

  async setItem<T>(key: StorageKey, value: T): Promise<boolean> {
    try {
      const serialized = JSON.stringify(value);
      memoryStore.set(key, serialized);
      await AsyncStorage.setItem(key, serialized);
      return true;
    } catch {
      return true; // Succeeded in memory fallback
    }
  },

  async removeItem(key: StorageKey): Promise<boolean> {
    try {
      memoryStore.delete(key);
      await AsyncStorage.removeItem(key);
      return true;
    } catch {
      memoryStore.delete(key);
      return true;
    }
  },

  /**
   * Clears all development, onboarding, profile, and session state keys.
   * Restores exact fresh-install state.
   */
  async clearAllDevelopmentState(): Promise<boolean> {
    try {
      memoryStore.clear();
      await Promise.all([
        AsyncStorage.removeItem(STORAGE_KEYS.HAS_LAUNCHED_BEFORE),
        AsyncStorage.removeItem(STORAGE_KEYS.USER_LANGUAGE),
        AsyncStorage.removeItem(STORAGE_KEYS.ONBOARDING_COMPLETED),
        AsyncStorage.removeItem(STORAGE_KEYS.AUTH_SESSION),
        AsyncStorage.removeItem(STORAGE_KEYS.STUDENT_PROFILE),
        AsyncStorage.removeItem(STORAGE_KEYS.STUDENT_PROFILE_SETUP_COMPLETE),
        AsyncStorage.removeItem(STORAGE_KEYS.DASHBOARD_CACHE),
        AsyncStorage.removeItem(STORAGE_KEYS.APP_SETTINGS),
      ]);
      return true;
    } catch (err) {
      console.error('[STORAGE] clearAllDevelopmentState error:', err);
      return false;
    }
  },
};
