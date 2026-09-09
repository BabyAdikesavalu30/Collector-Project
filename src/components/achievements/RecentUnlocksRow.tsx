/**
 * RecentUnlocksRow Component
 * Horizontal strip showing the student's most recently earned badges.
 */

import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { theme } from '../../theme';
import { SupportedLanguage } from '../../config/i18n';
import { Achievement } from '../../features/achievements';
import { getAchievementsI18n } from './achievements.i18n';

interface RecentUnlocksRowProps {
  badges: Achievement[];
  language?: SupportedLanguage;
  onPressBadge: (badge: Achievement) => void;
}

function formatRelativeDate(timestamp: number | null | undefined, isTamil: boolean): string {
  if (!timestamp) return '';
  const d = new Date(timestamp);
  const day = d.getDate();
  const months = isTamil
    ? ['ஜன', 'பிப்', 'மார்', 'ஏப்', 'மே', 'ஜூன்', 'ஜூலை', 'ஆக', 'செப்', 'அக்', 'நவ', 'டிச']
    : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${day} ${months[d.getMonth()]}`;
}

export const RecentUnlocksRow: React.FC<RecentUnlocksRowProps> = ({
  badges,
  language = 'en',
  onPressBadge,
}) => {
  const i18n = getAchievementsI18n(language);
  const isTamil = language === 'ta';

  if (!badges || badges.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.sectionHeader}>{i18n.recentUnlocksTitle}</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollList}
      >
        {badges.map((badge) => {
          const title = isTamil ? badge.title.ta : badge.title.en;
          const dateStr = formatRelativeDate(badge.unlockedAt, isTamil);

          return (
            <TouchableOpacity
              key={badge.id}
              style={styles.chip}
              activeOpacity={0.8}
              onPress={() => onPressBadge(badge)}
              accessible={true}
              accessibilityRole="button"
              accessibilityLabel={`${title}, ${i18n.unlockedOn} ${dateStr}`}
            >
              <View style={styles.iconCircle}>
                <Text style={styles.badgeIcon}>{badge.icon}</Text>
              </View>
              <View style={styles.chipInfo}>
                <Text style={styles.badgeTitle} numberOfLines={1}>
                  {title}
                </Text>
                <Text style={styles.badgeDate}>
                  {dateStr}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: theme.spacing.xs,
  },
  sectionHeader: {
    ...theme.typography.caption,
    fontSize: 13,
    fontWeight: '800',
    color: theme.colors.navy900,
    marginBottom: theme.spacing.xs,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  scrollList: {
    gap: theme.spacing.sm,
    paddingRight: theme.spacing.base,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0FDF4',
    borderWidth: 1,
    borderColor: '#BBF7D0',
    borderRadius: 24,
    paddingVertical: 6,
    paddingHorizontal: 10,
    minHeight: 44,
  },
  iconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#DCFCE7',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  badgeIcon: {
    fontSize: 18,
  },
  chipInfo: {
    maxWidth: 120,
  },
  badgeTitle: {
    ...theme.typography.caption,
    fontSize: 12,
    fontWeight: '700',
    color: '#166534',
  },
  badgeDate: {
    ...theme.typography.caption,
    fontSize: 10,
    color: '#15803D',
    fontWeight: '600',
  },
});
