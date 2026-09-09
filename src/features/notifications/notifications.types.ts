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
  | 'mission_completed'
  | 'system';

export type NotificationCategory =
  | 'learning'
  | 'achievements'
  | 'games'
  | 'rewards'
  | 'missions'
  | 'system';

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
  mission_completed: '📅',
  system: '🔔',
};

export const NOTIFICATION_CATEGORIES: NotificationCategory[] = [
  'learning',
  'games',
  'achievements',
  'rewards',
  'missions',
  'system',
];

export function getNotificationCategory(type: NotificationType): NotificationCategory {
  switch (type) {
    case 'quiz_completed':
    case 'learning_reminder':
    case 'progress':
    case 'new_content':
      return 'learning';
    case 'achievement':
    case 'certificate':
      return 'achievements';
    case 'game':
    case 'riddle':
    case 'spin_wheel':
    case 'daily_challenge':
      return 'games';
    case 'streak':
      return 'rewards';
    case 'mission_completed':
      return 'missions';
    case 'system':
      return 'system';
    default:
      return 'learning';
  }
}
