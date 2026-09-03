/**
 * Notifications Feature Types
 * Strongly typed notification models for the Vigyaan inbox.
 */

export type NotificationType =
  | 'quiz_completed'
  | 'achievement'
  | 'daily_challenge'
  | 'streak'
  | 'learning_reminder'
  | 'game'
  | 'riddle'
  | 'spin_wheel'
  | 'certificate'
  | 'progress'
  | 'new_content'
  | 'system';

export type NotificationCategory = 'learning' | 'achievements' | 'games' | 'rewards';

export interface LocalizedText {
  en: string;
  ta: string;
}

export interface NotificationAction {
  route: string;
  params?: Record<string, string>;
}

export interface AppNotification {
  id: string;
  type: NotificationType;
  title: LocalizedText;
  body: LocalizedText;
  createdAt: number;
  isRead: boolean;
  action?: NotificationAction;
  priority?: 'normal' | 'important';
}

export interface NotificationState {
  id: string;
  isRead: boolean;
  isDeleted: boolean;
}

export const NOTIFICATION_TYPE_ICONS: Record<NotificationType, string> = {
  quiz_completed: '🔬',
  achievement: '🏆',
  daily_challenge: '🎯',
  streak: '🔥',
  learning_reminder: '📚',
  game: '🎮',
  riddle: '💡',
  spin_wheel: '🎡',
  certificate: '📜',
  progress: '📈',
  new_content: '✨',
  system: '🔔',
};

export function getNotificationCategory(type: NotificationType): NotificationCategory {
  switch (type) {
    case 'quiz_completed':
    case 'learning_reminder':
    case 'progress':
    case 'new_content':
      return 'learning';
    case 'achievement':
    case 'certificate':
    case 'streak':
      return 'achievements';
    case 'game':
    case 'riddle':
    case 'spin_wheel':
    case 'daily_challenge':
      return 'games';
    case 'spin_wheel':
    case 'achievement':
    case 'certificate':
      return 'rewards';
    default:
      return 'learning';
  }
}
