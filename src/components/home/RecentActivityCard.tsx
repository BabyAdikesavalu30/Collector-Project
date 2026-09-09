/**
 * RecentActivityCard — Compact recent activity list for Home 2.0.
 * Shows last 3-5 activities with icon, title, time, and XP.
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../../theme';
import { SupportedLanguage } from '../../config/i18n';
import { HomeRecentActivity } from '../../features/home/home2.types';

interface RecentActivityCardProps {
  activities: HomeRecentActivity[];
  language: SupportedLanguage;
}

function formatTimeAgo(timestamp: number): string {
  const diff = Date.now() - timestamp;
  const minutes = Math.floor(diff / 60000);
  if (minutes < 1) return 'Just now';
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

export const RecentActivityCard: React.FC<RecentActivityCardProps> = ({
  activities,
  language,
}) => {
  const isTamil = language === 'ta';

  if (activities.length === 0) return null;

  return (
    <View style={styles.container} accessible accessibilityRole="list">
      <Text style={styles.sectionTitle}>
        {isTamil ? 'சமீபத்திய செயல்பாடு' : 'RECENT ACTIVITY'}
      </Text>

      {activities.slice(0, 4).map((item, index) => (
        <View
          key={item.id}
          style={[styles.activityRow, index < activities.length - 1 && styles.activityRowBorder]}
          accessibilityRole="text"
        >
          <Text style={styles.activityIcon}>{item.icon}</Text>
          <View style={styles.activityContent}>
            <Text style={styles.activityTitle} numberOfLines={1}>
              {isTamil ? item.titleTa : item.title}
            </Text>
            <Text style={styles.activityTime}>
              {formatTimeAgo(item.timestamp)}
            </Text>
          </View>
          {item.xpEarned > 0 && (
            <Text style={styles.activityXp}>+{item.xpEarned} XP</Text>
          )}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: theme.spacing.base,
    marginBottom: theme.spacing.sm,
  },
  sectionTitle: {
    ...theme.typography.caption,
    fontSize: 12,
    fontWeight: '800',
    color: theme.colors.navy900,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: theme.spacing.sm,
  },
  activityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  activityRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.divider,
  },
  activityIcon: {
    fontSize: 18,
    width: 24,
    marginRight: 10,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    ...theme.typography.body,
    fontSize: 13,
    color: theme.colors.navy800,
  },
  activityTime: {
    ...theme.typography.caption,
    fontSize: 10,
    color: theme.colors.slate400,
    marginTop: 1,
  },
  activityXp: {
    ...theme.typography.caption,
    fontSize: 11,
    fontWeight: '700',
    color: theme.colors.textSuccess,
    marginLeft: 8,
  },
});
