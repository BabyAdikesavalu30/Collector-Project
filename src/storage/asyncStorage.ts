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
  GAMES_STREAK: '@vigyaan/games_streak',
  GAMES_DAILY_CHALLENGE: '@vigyaan/games_daily_challenge',
  GAMES_FAVORITES: '@vigyaan/games_favorites',
  GAMES_RECENT_HISTORY: '@vigyaan/games_recent_history',
  GAMES_BADGES: '@vigyaan/games_badges',
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
  ACTIVITY_HISTORY: '@vigyaan/activity_history',
  XP_TRANSACTIONS: '@vigyaan/xp_transactions',
  MISSIONS_STATE: '@vigyaan/missions_state',
  DAILY_GOAL_STATE: '@vigyaan/daily_goal_state',
  RECENT_SEARCHES: '@vigyaan/recent_searches',
  NOTIFICATION_PREFERENCES: '@vigyaan/notification_preferences',
  NOTIFICATION_INBOX: '@vigyaan/notification_inbox',
  MICRO_LESSONS_PROGRESS: '@vigyaan/micro_lessons_progress',
  MICRO_LESSONS_BOOKMARKS: '@vigyaan/micro_lessons_bookmarks',
  CONCEPT_MAPS_PROGRESS: '@vigyaan/concept_maps_progress',
  CONCEPT_MAPS_BOOKMARKS: '@vigyaan/concept_maps_bookmarks',
  EXPERIMENT_PROGRESS: '@vigyaan/experiment_progress',
  EXPERIMENT_BOOKMARKS: '@vigyaan/experiment_bookmarks',
  CELEBRATION_STATE: '@vigyaan/celebration_state',
  SPIN_WHEEL_STATE: '@vigyaan/spin_wheel_state',
  COLLECTIONS_PROGRESS: '@vigyaan/collections_progress',
  EXPLORE_FAVORITES: '@vigyaan/explore_favorites',
  EXPLORE_RECENTLY_VIEWED: '@vigyaan/explore_recently_viewed',
} as const;

export type StorageKey = typeof STORAGE_KEYS[keyof typeof STORAGE_KEYS];

const memoryStore = new Map<string, string>();
const cacheStore = new Map<string, unknown>();

export const storage = {
  async getItem<T>(key: StorageKey, defaultValue: T | null = null): Promise<T | null> {
    if (cacheStore.has(key)) {
      const cached = cacheStore.get(key) as T;
      if (cached !== null && cached !== undefined) {
        return cached;
      }
      if (defaultValue !== null && defaultValue !== undefined) {
        return defaultValue;
      }
      return cached;
    }
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null && value !== undefined) {
        try {
          const parsed = JSON.parse(value) as T;
          const result = (parsed !== null && parsed !== undefined) ? parsed : defaultValue;
          if (result !== null && result !== undefined) {
            cacheStore.set(key, result);
          }
          return result;
        } catch {
          return defaultValue;
        }
      }
      const memVal = memoryStore.get(key);
      if (memVal !== undefined && memVal !== null) {
        try {
          const parsed = JSON.parse(memVal) as T;
          const result = (parsed !== null && parsed !== undefined) ? parsed : defaultValue;
          if (result !== null && result !== undefined) {
            cacheStore.set(key, result);
          }
          return result;
        } catch {
          return defaultValue;
        }
      }
      return defaultValue;
    } catch {
      const memVal = memoryStore.get(key);
      if (memVal !== undefined && memVal !== null) {
        try {
          const parsed = JSON.parse(memVal) as T;
          const result = (parsed !== null && parsed !== undefined) ? parsed : defaultValue;
          if (result !== null && result !== undefined) {
            cacheStore.set(key, result);
          }
          return result;
        } catch {
          return defaultValue;
        }
      }
      return defaultValue;
    }
  },

  async setItem<T>(key: StorageKey, value: T): Promise<boolean> {
    try {
      cacheStore.set(key, value);
      const serialized = JSON.stringify(value);
      memoryStore.set(key, serialized);
      await AsyncStorage.setItem(key, serialized);
      return true;
    } catch {
      cacheStore.set(key, value);
      return true; // Succeeded in memory fallback
    }
  },

  async removeItem(key: StorageKey): Promise<boolean> {
    cacheStore.delete(key);
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
   * Invalidates in-memory cache for one or all keys.
   * Useful for testing or when synchronizing after external changes.
   */
  invalidateCache(key?: StorageKey): void {
    if (key) {
      cacheStore.delete(key);
    } else {
      cacheStore.clear();
    }
  },

  /**
   * Clears all development, onboarding, profile, session, and activity state keys.
   * Restores exact fresh-install state.
   */
  async clearAllDevelopmentState(): Promise<boolean> {
    try {
      cacheStore.clear();
      memoryStore.clear();
      const allKeys = Array.from(new Set(Object.values(STORAGE_KEYS)));
      await Promise.all(allKeys.map((k) => AsyncStorage.removeItem(k)));
      return true;
    } catch (err) {
      console.error('[STORAGE] clearAllDevelopmentState error:', err);
      return false;
    }
  },
};
