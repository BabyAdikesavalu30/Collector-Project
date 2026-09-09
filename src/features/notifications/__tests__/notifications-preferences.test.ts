/**
 * Notifications Preferences & Factory Tests
 * Toggle persistence, preference gating, and dedupe of generated alerts.
 */

import { storage, STORAGE_KEYS } from '../../../storage/asyncStorage';
import {
  DEFAULT_NOTIFICATION_PREFERENCES,
  getNotificationPreferences,
  updateNotificationPreference,
  saveNotificationPreferences,
} from '../notifications.preferences';
import {
  createNotification,
  getGeneratedNotifications,
  isNotificationAllowed,
  clearGeneratedNotifications,
} from '../notifications.factory';
import { getNotificationCategory } from '../notifications.types';

describe('notification preferences', () => {
  beforeEach(async () => {
    await storage.removeItem(STORAGE_KEYS.NOTIFICATION_PREFERENCES);
  });

  it('returns defaults when nothing is stored', async () => {
    const prefs = await getNotificationPreferences();
    expect(prefs).toEqual(DEFAULT_NOTIFICATION_PREFERENCES);
  });

  it('persists a single toggle change', async () => {
    await updateNotificationPreference('dailyMissions', false);
    const prefs = await getNotificationPreferences();
    expect(prefs.dailyMissions).toBe(false);
    expect(prefs.achievementAlerts).toBe(true);
  });

  it('merges partial/malformed stored data with defaults', async () => {
    await storage.setItem(STORAGE_KEYS.NOTIFICATION_PREFERENCES, { dailyMissions: false });
    const prefs = await getNotificationPreferences();
    expect(prefs.dailyMissions).toBe(false);
    expect(prefs.gameUpdates).toBe(true);
  });

  it('rejects corrupt stored values gracefully', async () => {
    await storage.setItem(STORAGE_KEYS.NOTIFICATION_PREFERENCES, 'not-an-object');
    const prefs = await getNotificationPreferences();
    expect(prefs).toEqual(DEFAULT_NOTIFICATION_PREFERENCES);
  });
});

describe('notification factory', () => {
  beforeEach(async () => {
    await clearGeneratedNotifications();
    await storage.removeItem(STORAGE_KEYS.NOTIFICATION_PREFERENCES);
  });

  it('creates a notification when the category preference is on', async () => {
    const notification = await createNotification({
      id: 'n1',
      type: 'mission_completed',
      title: { en: 'Mission', ta: 'பணி' },
      body: { en: 'Done', ta: 'முடிந்தது' },
      action: { route: '/daily-missions' },
    });
    expect(notification).not.toBeNull();
    expect(notification?.action?.route).toBe('/daily-missions');
    const list = await getGeneratedNotifications();
    expect(list.length).toBe(1);
  });

  it('gates creation when the preference is off', async () => {
    await updateNotificationPreference('dailyMissions', false);
    const notification = await createNotification({
      id: 'n2',
      type: 'mission_completed',
      title: { en: 'Mission', ta: 'பணி' },
      body: { en: 'Done', ta: 'முடிந்தது' },
    });
    expect(notification).toBeNull();
  });

  it('dedupes by id', async () => {
    const input = {
      id: 'n3',
      type: 'achievement' as const,
      title: { en: 'Badge', ta: 'பதக்கம்' },
      body: { en: 'New', ta: 'புதியது' },
    };
    await createNotification(input);
    await createNotification(input);
    const list = await getGeneratedNotifications();
    expect(list.length).toBe(1);
  });

  it('maps notification types to the new categories', () => {
    expect(getNotificationCategory('mission_completed')).toBe('missions');
    expect(getNotificationCategory('certificate')).toBe('achievements');
    expect(getNotificationCategory('streak')).toBe('rewards');
    expect(getNotificationCategory('system')).toBe('system');
  });

  it('isNotificationAllowed respects each preference group', async () => {
    await updateNotificationPreference('achievementAlerts', false);
    expect(await isNotificationAllowed('achievement')).toBe(false);
    expect(await isNotificationAllowed('quiz_completed')).toBe(true);
  });
});