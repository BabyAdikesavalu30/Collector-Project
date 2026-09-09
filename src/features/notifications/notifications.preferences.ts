/**
 * Notifications Preferences
 * Frontend notification preference toggles. Persisted locally. This is the
 * clean boundary where future push notification registration will hook in —
 * today it only gates in-app notifications.
 */

import { storage, STORAGE_KEYS } from '../../storage/asyncStorage';

export type NotificationPreferenceKey =
  | 'dailyMissions'
  | 'achievementAlerts'
  | 'gameUpdates'
  | 'mysteryUpdates'
  | 'rewardAlerts'
  | 'reminderNotifications';

export interface NotificationPreferences {
  dailyMissions: boolean;
  achievementAlerts: boolean;
  gameUpdates: boolean;
  mysteryUpdates: boolean;
  rewardAlerts: boolean;
  reminderNotifications: boolean;
}

export const DEFAULT_NOTIFICATION_PREFERENCES: NotificationPreferences = {
  dailyMissions: true,
  achievementAlerts: true,
  gameUpdates: true,
  mysteryUpdates: true,
  rewardAlerts: true,
  reminderNotifications: true,
};

export const NOTIFICATION_PREFERENCES_KEY = STORAGE_KEYS.NOTIFICATION_PREFERENCES;

function isValid(value: unknown): value is NotificationPreferences {
  if (!value || typeof value !== 'object') return false;
  const prefs = value as Partial<NotificationPreferences>;
  return (
    typeof prefs.dailyMissions === 'boolean' &&
    typeof prefs.achievementAlerts === 'boolean' &&
    typeof prefs.gameUpdates === 'boolean' &&
    typeof prefs.mysteryUpdates === 'boolean' &&
    typeof prefs.rewardAlerts === 'boolean' &&
    typeof prefs.reminderNotifications === 'boolean'
  );
}

export async function getNotificationPreferences(): Promise<NotificationPreferences> {
  try {
    const data = await storage.getItem<unknown>(NOTIFICATION_PREFERENCES_KEY);
    if (isValid(data)) return data;
    // Merge partial objects with defaults so newly added keys default to on.
    if (data && typeof data === 'object' && !Array.isArray(data)) {
      return { ...DEFAULT_NOTIFICATION_PREFERENCES, ...(data as Partial<NotificationPreferences>) };
    }
    return { ...DEFAULT_NOTIFICATION_PREFERENCES };
  } catch {
    return { ...DEFAULT_NOTIFICATION_PREFERENCES };
  }
}

export async function saveNotificationPreferences(
  prefs: NotificationPreferences
): Promise<boolean> {
  return storage.setItem(NOTIFICATION_PREFERENCES_KEY, prefs);
}

export async function updateNotificationPreference(
  key: NotificationPreferenceKey,
  value: boolean
): Promise<NotificationPreferences> {
  const current = await getNotificationPreferences();
  const next = { ...current, [key]: value };
  await saveNotificationPreferences(next);
  return next;
}

export const NOTIFICATION_PREFERENCE_KEYS: NotificationPreferenceKey[] = [
  'dailyMissions',
  'achievementAlerts',
  'gameUpdates',
  'mysteryUpdates',
  'rewardAlerts',
  'reminderNotifications',
];