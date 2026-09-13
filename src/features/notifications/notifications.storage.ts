/**
 * Notifications Storage
 * Local persistence for notification read state and deletions.
 */

import { storage, STORAGE_KEYS } from '../../storage/asyncStorage';
import { NotificationState } from './notifications.types';

export async function getNotificationsState(): Promise<Record<string, NotificationState>> {
  const data = await storage.getItem<Record<string, NotificationState>>(STORAGE_KEYS.NOTIFICATIONS_STATE);
  return data || {};
}

async function saveNotificationsState(state: Record<string, NotificationState>): Promise<void> {
  await storage.setItem(STORAGE_KEYS.NOTIFICATIONS_STATE, state);
}

export async function isNotificationRead(id: string): Promise<boolean> {
  const state = await getNotificationsState();
  return state[id]?.isRead || false;
}

export async function isNotificationDeleted(id: string): Promise<boolean> {
  const state = await getNotificationsState();
  return state[id]?.isDeleted || false;
}

export async function markNotificationRead(id: string): Promise<void> {
  const state = await getNotificationsState();
  state[id] = { ...state[id], id, isRead: true, isDeleted: state[id]?.isDeleted || false };
  await saveNotificationsState(state);
}

export async function markAllNotificationsRead(ids: string[]): Promise<void> {
  const state = await getNotificationsState();
  for (const id of ids) {
    state[id] = { ...state[id], id, isRead: true, isDeleted: state[id]?.isDeleted || false };
  }
  await saveNotificationsState(state);
}

export async function deleteNotification(id: string): Promise<void> {
  const state = await getNotificationsState();
  state[id] = { ...state[id], id, isDeleted: true, isRead: true };
  await saveNotificationsState(state);
}

export async function getUnreadCount(ids: string[]): Promise<number> {
  const state = await getNotificationsState();
  return ids.filter((id) => !state[id]?.isRead).length;
}
