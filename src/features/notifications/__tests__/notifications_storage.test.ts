/**
 * Notifications Storage Unit Tests
 */

import {
  isNotificationRead,
  isNotificationDeleted,
  markNotificationRead,
  markAllNotificationsRead,
  deleteNotification,
  getUnreadCount,
} from '../notifications.storage';

describe('Notifications Storage & Read/Delete Contracts', () => {
  const notif1 = 'daily-streak-reminder';
  const notif2 = 'level-unlocked-zip-02';

  test('notifications start unread and not deleted', async () => {
    expect(await isNotificationRead(notif1)).toBe(false);
    expect(await isNotificationDeleted(notif1)).toBe(false);
  });

  test('markNotificationRead updates read state', async () => {
    await markNotificationRead(notif1);
    expect(await isNotificationRead(notif1)).toBe(true);
    expect(await isNotificationDeleted(notif1)).toBe(false);
  });

  test('markAllNotificationsRead marks multiple notifications as read', async () => {
    await markAllNotificationsRead([notif1, notif2]);
    expect(await isNotificationRead(notif1)).toBe(true);
    expect(await isNotificationRead(notif2)).toBe(true);
  });

  test('deleteNotification flags notification as deleted', async () => {
    await deleteNotification(notif1);
    expect(await isNotificationDeleted(notif1)).toBe(true);
  });

  test('getUnreadCount accurately counts unread ids', async () => {
    const ids = ['test-unread-1', 'test-unread-2', notif2];
    const unread = await getUnreadCount(ids);
    // notif2 was marked read above, so 2 remain unread
    expect(unread).toBe(2);
  });
});
