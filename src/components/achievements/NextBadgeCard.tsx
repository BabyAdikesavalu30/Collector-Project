/**
 * NextBadgeCard Component
 * Highlights the closest attainable milestone to encourage continuous student learning.
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { theme } from '../../theme';
import { SupportedLanguage } from '../../config/i18n';
import { Achievement } from '../../features/achievements';
import { getAchievementsI18n } from './achievements.i18n';

interface NextBadgeCardProps {
  badge: Achievement | null;
  language?: SupportedLanguage;
  onPressBadge: (badge: Achievement) => void;
  onAction?: (route: string) => void;
}

export const NextBadgeCard: React.FC<NextBadgeCardProps> = ({
  badge,
  language = 'en',
  onPressBadge,
  onAction,
}) => {
  const i18n = getAchievementsI18n(language);
  const isTamil = language === 'ta';

  if (!badge) {
    // All achievements completed state!
    return (
      <View style={[styles.card, styles.allCompletedCard]}>
        <Text style={styles.celebrationIcon}>🎉</Text>
        <Text style={styles.allCompletedTitle}>{i18n.allCompletedTitle}</Text>
        <Text style={styles.allCompletedDesc}>{i18n.allCompletedDesc}</Text>
      </View>
    );
  }

  const title = isTamil ? badge.title.ta : badge.title.en;
  const description = isTamil ? badge.description.ta : badge.description.en;
  const percentage = Math.round(badge.progress.percent);

  const handleAction = () => {
    if (badge.relatedRoute && onAction) {
      onAction(badge.relatedRoute);
    } else {
      onPressBadge(badge);
    }
  };

  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.9}
      onPress={() => onPressBadge(badge)}
      accessible={true}
      accessibilityRole="button"
      accessibilityLabel={`${i18n.nextBadgeTitle}: ${title}. ${percentage}% complete. ${badge.progress.current} of ${badge.progress.target}.`}
    >
      {/* Top Banner Tag */}
      <View style={styles.tagRow}>
        <View style={styles.tagBadge}>
          <Text style={styles.tagText}>🎯 {i18n.nextBadgeTitle.toUpperCase()}</Text>
        </View>
        <View style={styles.xpPill}>
          <Text style={styles.xpText}>+{badge.rewardXp} XP</Text>
        </View>
      </View>

      {/* Main Info Row */}
      <View style={styles.contentRow}>
        <View style={styles.iconCircle}>
          <Text style={styles.iconText}>{badge.icon}</Text>
        </View>
        <View style={styles.infoCol}>
          <Text style={styles.badgeTitle} numberOfLines={1}>
            {title}
          </Text>
          <Text style={styles.badgeDesc} numberOfLines={2}>
            {description}
          </Text>
        </View>
      </View>

      {/* Progress Track */}
      <View style={styles.progressContainer}>
        <View style={styles.progressMeta}>
          <Text style={styles.progressCounter}>
            {badge.progress.current} / {badge.progress.target}
          </Text>
          <Text style={styles.progressPct}>{percentage}%</Text>
        </View>
        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, { width: `${Math.min(percentage, 100)}%` }]} />
        </View>
      </View>

      {/* Action Button */}
      {badge.relatedRoute && (
        <TouchableOpacity
          style={styles.actionBtn}
          onPress={handleAction}
          activeOpacity={0.85}
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel={`${i18n.continueBtn} for ${title}`}
        >
          <Text style={styles.actionBtnText}>{i18n.continueBtn} →</Text>
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FAF5FF',
    borderRadius: theme.borderRadius.xl,
    padding: theme.spacing.lg,
    borderWidth: 1.5,
    borderColor: '#C084FC',
    shadowColor: '#9333EA',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 3,
  },
  allCompletedCard: {
    backgroundColor: '#F0FDF4',
    borderColor: '#86EFAC',
    alignItems: 'center',
    paddingVertical: theme.spacing.xl,
  },
  celebrationIcon: {
    fontSize: 40,
    marginBottom: theme.spacing.sm,
  },
  allCompletedTitle: {
    ...theme.typography.h2,
    fontSize: 18,
    fontWeight: '800',
    color: '#15803D',
    textAlign: 'center',
    marginBottom: 4,
  },
  allCompletedDesc: {
    ...theme.typography.body,
    fontSize: 13,
    color: '#166534',
    textAlign: 'center',
    lineHeight: 18,
  },
  tagRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  tagBadge: {
    backgroundColor: '#E9D5FF',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  tagText: {
    ...theme.typography.caption,
    fontSize: 10.5,
    fontWeight: '800',
    color: '#7E22CE',
    letterSpacing: 0.5,
  },
  xpPill: {
    backgroundColor: '#FEF08A',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  xpText: {
    ...theme.typography.caption,
    fontSize: 11,
    fontWeight: '800',
    color: '#854D0E',
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E9D5FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.md,
  },
  iconText: {
    fontSize: 26,
  },
  infoCol: {
    flex: 1,
  },
  badgeTitle: {
    ...theme.typography.h3,
    fontSize: 16,
    fontWeight: '800',
    color: theme.colors.navy900,
    marginBottom: 2,
  },
  badgeDesc: {
    ...theme.typography.caption,
    fontSize: 12.5,
    color: theme.colors.slate600,
    lineHeight: 16,
  },
  progressContainer: {
    marginBottom: theme.spacing.md,
  },
  progressMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  progressCounter: {
    ...theme.typography.caption,
    fontSize: 11.5,
    fontWeight: '700',
    color: theme.colors.slate600,
  },
  progressPct: {
    ...theme.typography.caption,
    fontSize: 11.5,
    fontWeight: '800',
    color: '#7E22CE',
  },
  progressTrack: {
    height: 7,
    backgroundColor: '#E9D5FF',
    borderRadius: 3.5,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#9333EA',
    borderRadius: 3.5,
  },
  actionBtn: {
    backgroundColor: '#9333EA',
    borderRadius: theme.borderRadius.md,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 44,
  },
  actionBtnText: {
    ...theme.typography.button,
    fontSize: 13.5,
    fontWeight: '800',
    color: theme.colors.white,
  },
});
