/**
 * Notifications Factory
 * Creates deterministic in-app notifications for real events (mission
 * claimed, achievement unlocked, certificate earned, streak milestone).
 * These are persisted locally and surfaced alongside the demo inbox.
 * No push infrastructure — this is the boundary a backend will replace.
 */

import { storage, STORAGE_KEYS } from '../../storage/asyncStorage';
import { AppNotification, NotificationAction, NotificationType } from './notifications.types';
import { getNotificationPreferences } from './notifications.preferences';

export const NOTIFICATION_INBOX_KEY = STORAGE_KEYS.NOTIFICATION_INBOX;
export const GENERATED_NOTIFICATIONS_LIMIT = 60;

export interface GeneratedNotificationInput {
  type: NotificationType;
  title: { en: string; ta: string };
  body: { en: string; ta: string };
  action?: NotificationAction;
  priority?: 'normal' | 'important';
  timestamp?: number;
}

/**
 * Determines whether a notification type is allowed by the current
 * preferences (in-app gating only — never claims OS push).
 */
export async function isNotificationAllowed(type: NotificationType): Promise<boolean> {
  const prefs = await getNotificationPreferences();
  switch (type) {
    case 'mission_completed':
    case 'daily_challenge':
      return prefs.dailyMissions;
    case 'achievement':
      return prefs.achievementAlerts;
    case 'game':
    case 'riddle':
    case 'spin_wheel':
      return prefs.gameUpdates;
    case 'new_content':
      return prefs.mysteryUpdates;
    case 'certificate':
    case 'streak':
    case 'progress':
      return prefs.rewardAlerts;
    case 'learning_reminder':
      return prefs.reminderNotifications;
    default:
      return true;
  }
}

/** Returns all locally generated notifications (newest first). */
export async function getGeneratedNotifications(): Promise<AppNotification[]> {
  try {
    const list = await storage.getItem<AppNotification[]>(NOTIFICATION_INBOX_KEY);
    if (!Array.isArray(list)) return [];
    return [...list].sort((a, b) => b.createdAt - a.createdAt);
  } catch {
    return [];
  }
}

/**
 * Creates one notification (deduped by a stable id when provided).
 */
export async function createNotification(
  input: GeneratedNotificationInput & { id?: string }
): Promise<AppNotification | null> {
  const allowed = await isNotificationAllowed(input.type);
  if (!allowed) return null;

  const now = Date.now();
  const notification: AppNotification = {
    id: input.id || `gen-${now}-${Math.random().toString(36).slice(2, 8)}`,
    type: input.type,
    title: input.title,
    body: input.body,
    createdAt: input.timestamp ?? now,
    isRead: false,
    action: input.action,
    priority: input.priority,
  };

  const existing = await getGeneratedNotifications();
  if (existing.some((n) => n.id === notification.id)) {
    return null;
  }

  await storage.setItem(NOTIFICATION_INBOX_KEY, [notification, ...existing].slice(0, GENERATED_NOTIFICATIONS_LIMIT));
  return notification;
}

/** Clears generated notifications (used on logout / demo reset). */
export async function clearGeneratedNotifications(): Promise<void> {
  await storage.removeItem(NOTIFICATION_INBOX_KEY);
}