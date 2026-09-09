/**
 * RecentActivityCard — latest science activities with earned XP.
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../../theme';
import { SupportedLanguage, getTranslation } from '../../config/i18n';
import { RecentActivityItem } from '../../features/activity';

const ACTIVITY_ICONS: Record<string, string> = {
  quiz_completed: '🔬',
  riddle_completed: '💡',
  game_completed: '🎮',
  mystery_completed: '🕵️',
  fact_discovered: '✨',
  challenge_completed: '🎯',
  mission_completed: '📅',
  achievement_unlocked: '🏆',
  certificate_earned: '📜',
};

interface RecentActivityCardProps {
  items: RecentActivityItem[];
  language: SupportedLanguage;
}

function formatRelativeTime(timestamp: number, language: 'en' | 'ta'): string {
  const diffMs = Date.now() - timestamp;
  const diffMin = Math.floor(diffMs / 60000);
  const diffHr = Math.floor(diffMs / 3600000);
  const diffDay = Math.floor(diffMs / 86400000);
  if (language === 'ta') {
    if (diffMin < 1) return 'இப்போது';
    if (diffMin < 60) return `${diffMin} நிமிடம் முன்`;
    if (diffHr < 24) return `${diffHr} மணிநேரம் முன்`;
    if (diffDay === 1) return 'நேற்று';
    return `${diffDay} நாட்கள் முன்`;
  }
  if (diffMin < 1) return 'Just now';
  if (diffMin < 60) return `${diffMin}m ago`;
  if (diffHr < 24) return `${diffHr}h ago`;
  if (diffDay === 1) return 'Yesterday';
  return `${diffDay}d ago`;
}

export const RecentActivityCard: React.FC<RecentActivityCardProps> = ({ items, language }) => {
  const t = getTranslation(language).progress.profile;

  if (items.length === 0) {
    return (
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>{t.recentActivity.toUpperCase()}</Text>
        <Text style={styles.emptyText}>{t.noActivityYet}</Text>
      </View>
    );
  }

  return (
    <View style={styles.card}>
      <Text style={styles.sectionTitle}>{t.recentActivity.toUpperCase()}</Text>
      {items.slice(0, 6).map((item, index) => (
        <View key={item.id} style={[styles.item, index > 0 && styles.itemBorder]}>
          <Text style={styles.itemIcon}>{ACTIVITY_ICONS[item.type] || '✨'}</Text>
          <View style={styles.itemContent}>
            <Text style={styles.itemTitle} numberOfLines={1}>
              {language === 'ta' ? item.titleTa : item.title}
            </Text>
            <Text style={styles.itemTime}>{formatRelativeTime(item.timestamp, language)}</Text>
          </View>
          {item.xpEarned > 0 && <Text style={styles.itemXp}>+{item.xpEarned} XP</Text>}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: theme.spacing.base,
    marginBottom: theme.spacing.md,
  },
  sectionTitle: {
    ...theme.typography.overline,
    fontSize: 11,
    fontWeight: '800',
    color: theme.colors.navy900,
    letterSpacing: 0.8,
    marginBottom: theme.spacing.sm,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: theme.spacing.sm,
  },
  itemBorder: {
    borderTopWidth: 1,
    borderTopColor: theme.colors.divider,
  },
  itemIcon: {
    fontSize: 18,
    width: 30,
    textAlign: 'center',
  },
  itemContent: {
    flex: 1,
    marginLeft: theme.spacing.sm,
  },
  itemTitle: {
    ...theme.typography.body,
    fontSize: 13,
    fontWeight: '600',
    color: theme.colors.navy800,
  },
  itemTime: {
    ...theme.typography.caption,
    fontSize: 11,
    color: theme.colors.slate400,
    marginTop: 1,
  },
  itemXp: {
    ...theme.typography.caption,
    fontSize: 12,
    fontWeight: '800',
    color: theme.colors.success,
  },
  emptyText: {
    ...theme.typography.body,
    color: theme.colors.slate500,
    paddingVertical: theme.spacing.md,
    textAlign: 'center',
  },
});