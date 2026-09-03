/**
 * Notifications Utilities
 * Helper functions for grouping, time display, and filtering.
 */

import { AppNotification, NotificationType, NotificationCategory, getNotificationCategory } from './notifications.types';

/**
 * Get relative time string from timestamp.
 */
export function getRelativeTime(timestamp: number, lang: 'en' | 'ta'): string {
  const now = Date.now();
  const diffMs = now - timestamp;
  const diffMin = Math.floor(diffMs / 60000);
  const diffHr = Math.floor(diffMs / 3600000);
  const diffDay = Math.floor(diffMs / 86400000);

  if (lang === 'ta') {
    if (diffMin < 1) return 'இப்போது';
    if (diffMin < 60) return `${diffMin} நிமிடம் முன்`;
    if (diffHr < 24) return `${diffHr} மணிநேரம் முன்`;
    if (diffDay === 1) return 'நேற்று';
    if (diffDay < 7) return `${diffDay} நாட்களுக்கு முன்`;
    return `${Math.floor(diffDay / 7)} வாரங்களுக்கு முன்`;
  }

  if (diffMin < 1) return 'Just now';
  if (diffMin < 60) return `${diffMin} min ago`;
  if (diffHr < 24) return `${diffHr}h ago`;
  if (diffDay === 1) return 'Yesterday';
  if (diffDay < 7) return `${diffDay} days ago`;
  return `${Math.floor(diffDay / 7)} weeks ago`;
}

/**
 * Group notifications by date.
 */
export function groupNotificationsByDate(notifications: AppNotification[]): {
  today: AppNotification[];
  yesterday: AppNotification[];
  earlier: AppNotification[];
} {
  const now = new Date();
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
  const yesterdayStart = todayStart - 86400000;

  const today: AppNotification[] = [];
  const yesterday: AppNotification[] = [];
  const earlier: AppNotification[] = [];

  for (const n of notifications) {
    if (n.createdAt >= todayStart) {
      today.push(n);
    } else if (n.createdAt >= yesterdayStart) {
      yesterday.push(n);
    } else {
      earlier.push(n);
    }
  }

  return { today, yesterday, earlier };
}

/**
 * Filter notifications by category.
 */
export function filterNotificationsByCategory(
  notifications: AppNotification[],
  category: NotificationCategory | 'all'
): AppNotification[] {
  if (category === 'all') return notifications;
  return notifications.filter((n) => getNotificationCategory(n.type) === category);
}

/**
 * Filter notifications by read status.
 */
export function filterUnread(notifications: AppNotification[]): AppNotification[] {
  return notifications.filter((n) => !n.isRead);
}

/**
 * Filter notifications (no deleted field on AppNotification, handled by storage layer).
 */
export function filterDeleted(notifications: AppNotification[]): AppNotification[] {
  return notifications;
}
