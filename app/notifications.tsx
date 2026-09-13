/**
 * Notifications Route (/notifications)
 * Production-quality activity inbox with filtering, grouping, and actions.
 */

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
  Platform,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { theme } from '../src/theme';
import { SupportedLanguage, getTranslation } from '../src/config/i18n';
import { AppBackButton } from '../src/components/navigation';
import { useLanguage } from '../src/context';
import {
  AppNotification,
  NotificationCategory,
  NOTIFICATION_TYPE_ICONS,
  getNotificationCategory,
} from '../src/features/notifications/notifications.types';
import {
  getAllNotifications,
} from '../src/features/notifications/notifications.mock';
import { getGeneratedNotifications } from '../src/features/notifications/notifications.factory';
import {
  getNotificationsState,
  markNotificationRead,
  markAllNotificationsRead,
  deleteNotification,
} from '../src/features/notifications/notifications.storage';
import {
  getRelativeTime,
  groupNotificationsByDate,
  filterNotificationsByCategory,
  filterDeleted,
} from '../src/features/notifications/notifications.utils';

type FilterTab = 'all' | 'unread' | NotificationCategory;

const FILTER_TABS: FilterTab[] = ['all', 'unread', 'learning', 'games', 'achievements', 'rewards', 'missions', 'system'];

export default function NotificationsScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { language } = useLanguage();
  const [notifications, setNotifications] = useState<AppNotification[]>([]);
  const [activeFilter, setActiveFilter] = useState<FilterTab>('all');
  const [loading, setLoading] = useState(true);

  const isTamil = language === 'ta';

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = useCallback(async () => {
    setLoading(true);
    const mock = getAllNotifications();
    const generated = await getGeneratedNotifications();
    const all = [...generated, ...mock];
    // Apply stored read/deleted states via notification repository
    const storedState = await getNotificationsState();
    if (storedState) {
      const updated = all
        .map((n) => {
          const state = storedState[n.id];
          if (state) {
            return { ...n, isRead: state.isRead || n.isRead };
          }
          return n;
        })
        .filter((n) => !storedState[n.id]?.isDeleted);
      setNotifications(updated);
    } else {
      setNotifications(all);
    }
    setLoading(false);
  }, []);

  const unreadCount = useMemo(
    () => notifications.filter((n) => !n.isRead).length,
    [notifications]
  );

  const filteredNotifications = useMemo(() => {
    let result = filterDeleted(notifications);
    if (activeFilter === 'unread') {
      result = result.filter((n) => !n.isRead);
    } else if (activeFilter !== 'all') {
      result = filterNotificationsByCategory(result, activeFilter as NotificationCategory);
    }
    return result;
  }, [notifications, activeFilter]);

  const grouped = useMemo(
    () => groupNotificationsByDate(filteredNotifications),
    [filteredNotifications]
  );

  const handleMarkAsRead = useCallback(async (id: string) => {
    await markNotificationRead(id);
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
  }, []);

  const handleMarkAllRead = useCallback(async () => {
    const ids = notifications.filter((n) => !n.isRead).map((n) => n.id);
    if (ids.length === 0) return;
    await markAllNotificationsRead(ids);
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  }, [notifications]);

  const handleDelete = useCallback(async (id: string) => {
    await deleteNotification(id);
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  const handleNotificationPress = useCallback(
    async (notification: AppNotification) => {
      await handleMarkAsRead(notification.id);
      if (notification.action) {
        try {
          router.push(notification.action.route);
        } catch {
          // Invalid destination — stay on screen
        }
      }
    },
    [handleMarkAsRead, router]
  );

  const renderHeader = () => (
    <View style={styles.header}>
      <AppBackButton
        onPress={() => router.back()}
        language={language}
        style={styles.backBtn}
      />
      <View style={styles.headerCenter}>
        <Text style={styles.headerTitle}>{isTamil ? 'அறிவிப்புகள்' : 'Notifications'}</Text>
        {unreadCount > 0 && (
          <Text style={styles.unreadBadge}>{unreadCount}</Text>
        )}
      </View>
      <TouchableOpacity
        onPress={handleMarkAllRead}
        disabled={unreadCount === 0}
        accessible
        accessibilityRole="button"
        accessibilityLabel={isTamil ? 'அனைத்தையும் படித்ததாகக் குறிக்கவும்' : 'Mark all as read'}
        style={[styles.markAllBtn, unreadCount === 0 && styles.markAllBtnDisabled]}
      >
        <Text style={[styles.markAllBtnText, unreadCount === 0 && styles.markAllBtnTextDisabled]}>
          {isTamil ? 'அனைத்தையும் படித்ததாகக் குறி' : 'Mark all read'}
        </Text>
      </TouchableOpacity>
    </View>
  );

  const renderSubtitle = () => (
    <Text style={styles.subtitle}>
      {isTamil
        ? 'உங்கள் கற்றல் பயணத்திலிருந்து புதுப்பிப்புகளைப் பெறுங்கள்.'
        : 'Stay updated with your learning journey.'}
    </Text>
  );

  const renderFilterTabs = () => (
    <View style={styles.filterContainer}>
      <FlatList
        horizontal
        data={FILTER_TABS}
        keyExtractor={(item) => item}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filterList}
        renderItem={({ item }) => {
          const isActive = activeFilter === item;
          const notifT = getTranslation(language).progress.notif;
          const labelMap: Record<string, string> = {
            all: notifT.all,
            unread: notifT.unread,
            learning: notifT.learning,
            games: notifT.games,
            achievements: notifT.achievements,
            rewards: notifT.rewards,
            missions: notifT.missions,
            system: notifT.system,
          };
          const label = labelMap[item] || item;
          return (
            <TouchableOpacity
              style={[styles.filterTab, isActive && styles.filterTabActive]}
              onPress={() => setActiveFilter(item)}
              accessible
              accessibilityRole="tab"
              accessibilityState={{ selected: isActive }}
            >
              <Text style={[styles.filterTabText, isActive && styles.filterTabTextActive]}>
                {label}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );

  const renderNotificationItem = useCallback(
    ({ item }: { item: AppNotification }) => (
      <TouchableOpacity
        style={[styles.notifCard, !item.isRead && styles.notifCardUnread]}
        onPress={() => handleNotificationPress(item)}
        onLongPress={() => {
          Alert.alert(
            isTamil ? 'அறிவிப்பை நீக்கு' : 'Delete notification',
            isTamil ? 'இந்த அறிவிப்பை நீக்க விரும்புகிறீர்களா?' : 'Do you want to delete this notification?',
            [
              { text: isTamil ? 'ரத்து' : 'Cancel', style: 'cancel' },
              {
                text: isTamil ? 'நீக்கு' : 'Delete',
                style: 'destructive',
                onPress: () => handleDelete(item.id),
              },
            ]
          );
        }}
        accessible
        accessibilityRole="button"
        accessibilityLabel={`${item.title[language]}. ${item.body[language]}. ${item.isRead ? '' : (isTamil ? 'படிக்காதது' : 'Unread')}. ${getRelativeTime(item.createdAt, language)}`}
      >
        <Text style={styles.notifIcon}>{NOTIFICATION_TYPE_ICONS[item.type]}</Text>
        <View style={styles.notifContent}>
          <Text style={[styles.notifTitle, !item.isRead && styles.notifTitleUnread]}>
            {item.title[language]}
          </Text>
          <Text style={styles.notifBody} numberOfLines={2}>
            {item.body[language]}
          </Text>
          <Text style={styles.notifTime}>{getRelativeTime(item.createdAt, language)}</Text>
        </View>
        {!item.isRead && <View style={styles.unreadDot} />}
        {item.action && <Text style={styles.notifChevron}>›</Text>}
      </TouchableOpacity>
    ),
    [language, isTamil, handleNotificationPress, handleDelete]
  );

  const renderSectionHeader = (title: string) => (
    <Text style={styles.sectionHeader}>{title}</Text>
  );

  const renderEmpty = () => {
    if (loading) return null;
    const isUnreadEmpty = activeFilter === 'unread';
    return (
      <View style={styles.emptyContainer}>
        <View style={styles.emptyIcon}>
          <Text style={{ fontSize: 48 }}>🔔</Text>
        </View>
        <Text style={styles.emptyTitle}>
          {isTamil ? 'அனைத்தும் பார்த்துவிட்டீர்கள்!' : "You're all caught up!"}
        </Text>
        <Text style={styles.emptySubtitle}>
          {isUnreadEmpty
            ? isTamil
              ? 'படிக்க எதுவும் இல்லை.'
              : "There's nothing new to read."
            : isTamil
            ? 'உங்கள் கற்றல் பயணத்திலிருந்து புதிய புதுப்பிப்புகள் இங்கு தோன்றும்.'
            : 'New updates from your learning journey will appear here.'}
        </Text>
      </View>
    );
  };

  const sections: { title: string; data: AppNotification[] }[] = [];
  if (grouped.today.length > 0) {
    sections.push({ title: isTamil ? 'இன்று' : 'TODAY', data: grouped.today });
  }
  if (grouped.yesterday.length > 0) {
    sections.push({ title: isTamil ? 'நேற்று' : 'YESTERDAY', data: grouped.yesterday });
  }
  if (grouped.earlier.length > 0) {
    sections.push({ title: isTamil ? 'முன்னர்' : 'EARLIER', data: grouped.earlier });
  }

  type NotificationListItem =
    | { itemType: 'section'; title: string; id: string }
    | (AppNotification & { itemType: 'notification' });

  const listData: NotificationListItem[] = [];
  for (const section of sections) {
    listData.push({ itemType: 'section', title: section.title, id: `section-${section.title}` });
    for (const n of section.data) {
      listData.push({ ...n, itemType: 'notification' });
    }
  }

  const renderItem = useCallback(
    ({ item }: { item: NotificationListItem }) => {
      if (item.itemType === 'section') {
        return renderSectionHeader(item.title);
      }
      return renderNotificationItem({ item });
    },
    [renderNotificationItem]
  );

  return (
    <View style={styles.container}>
      <StatusBar style="dark" translucent backgroundColor="transparent" />
      {renderHeader()}
      {renderSubtitle()}
      {renderFilterTabs()}

      {sections.length === 0 ? (
        renderEmpty()
      ) : (
        <FlatList<NotificationListItem>
          data={listData}
          keyExtractor={(item) => item.id}
          contentContainerStyle={[styles.listContent, { paddingBottom: insets.bottom + theme.spacing.xl }]}
          showsVerticalScrollIndicator={false}
          renderItem={renderItem}
          initialNumToRender={10}
          maxToRenderPerBatch={10}
          windowSize={5}
          removeClippedSubviews={Platform.OS === 'android'}
        />
      )}
    </View>
  );
}

// ═══════════════════════════════════════════════════════════════════
// STYLES
// ═══════════════════════════════════════════════════════════════════
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.pearlWhite,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.sm,
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: theme.colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  backBtnText: {
    fontSize: 18,
    color: theme.colors.navy900,
  },
  headerCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  headerTitle: {
    ...theme.typography.h2,
    color: theme.colors.navy900,
  },
  unreadBadge: {
    backgroundColor: theme.colors.actionPrimary,
    color: theme.colors.textOnAction,
    fontSize: 11,
    fontWeight: '700',
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 10,
    overflow: 'hidden',
  },
  markAllBtn: {
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  markAllBtnDisabled: {
    opacity: 0.4,
  },
  markAllBtnText: {
    ...theme.typography.caption,
    color: theme.colors.actionPrimary,
    fontWeight: '600',
  },
  markAllBtnTextDisabled: {
    color: theme.colors.slate400,
  },
  subtitle: {
    ...theme.typography.body,
    color: theme.colors.slate600,
    paddingHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.md,
    lineHeight: 20,
  },
  filterContainer: {
    marginBottom: theme.spacing.md,
  },
  filterList: {
    paddingHorizontal: theme.spacing.lg,
    gap: 8,
  },
  filterTab: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: theme.colors.white,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  filterTabActive: {
    backgroundColor: theme.colors.actionPrimary,
    borderColor: theme.colors.actionPrimary,
  },
  filterTabText: {
    ...theme.typography.caption,
    color: theme.colors.slate600,
    fontWeight: '600',
  },
  filterTabTextActive: {
    color: theme.colors.textOnAction,
  },
  listContent: {
    paddingHorizontal: theme.spacing.lg,
  },
  sectionHeader: {
    ...theme.typography.overline,
    color: theme.colors.slate500,
    marginTop: theme.spacing.md,
    marginBottom: theme.spacing.sm,
    letterSpacing: 1.5,
  },
  notifCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: 14,
    marginBottom: 8,
  },
  notifCardUnread: {
    borderLeftWidth: 3,
    borderLeftColor: theme.colors.actionPrimary,
  },
  notifIcon: {
    fontSize: 22,
    marginRight: 12,
    marginTop: 2,
  },
  notifContent: {
    flex: 1,
  },
  notifTitle: {
    ...theme.typography.bodyLarge,
    color: theme.colors.navy900,
    fontWeight: '500',
    marginBottom: 2,
  },
  notifTitleUnread: {
    fontWeight: '700',
  },
  notifBody: {
    ...theme.typography.body,
    color: theme.colors.slate600,
    lineHeight: 18,
    marginBottom: 4,
  },
  notifTime: {
    ...theme.typography.caption,
    color: theme.colors.slate400,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: theme.colors.actionPrimary,
    marginTop: 6,
    marginLeft: 8,
  },
  notifChevron: {
    fontSize: 20,
    color: theme.colors.slate400,
    marginTop: 6,
    marginLeft: 4,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.xl,
  },
  emptyIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: theme.colors.blue50,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing.lg,
  },
  emptyTitle: {
    ...theme.typography.h2,
    color: theme.colors.navy900,
    textAlign: 'center',
    marginBottom: theme.spacing.sm,
  },
  emptySubtitle: {
    ...theme.typography.body,
    color: theme.colors.slate600,
    textAlign: 'center',
    lineHeight: 22,
  },
});
