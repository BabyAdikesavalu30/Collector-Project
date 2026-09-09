/**
 * ProgressHeroCard Component
 * Dominant visual card showing overall science learning progress,
 * animated green progress fill for positive mastery, daily streak, total points, and rank.
 * Clean White card on Pearl White base.
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { theme } from '../../theme';
import { SupportedLanguage, getTranslation } from '../../config/i18n';

interface ProgressHeroCardProps {
  progressPercentage: number;
  streakDays: number;
  points: number;
  rank?: number | string | null;
  language?: SupportedLanguage;
  onStreakPress?: () => void;
}

export const ProgressHeroCard: React.FC<ProgressHeroCardProps> = ({
  progressPercentage,
  streakDays,
  points,
  rank,
  language = 'en',
  onStreakPress,
}) => {
  const t = getTranslation(language).home;
  const clampedProgress = Math.min(100, Math.max(0, progressPercentage));

  const accessibilityText = rank
    ? `${t.learningProgress}: ${clampedProgress} percent. ${streakDays} ${t.streak}. ${points} ${t.points}. ${t.rank}: ${rank}.`
    : `${t.learningProgress}: ${clampedProgress} percent. ${streakDays} ${t.streak}. ${points} ${t.points}.`;

  return (
    <View
      style={styles.container}
      accessible={true}
      accessibilityRole="summary"
      accessibilityLabel={accessibilityText}
    >
      {/* Category Pill (Purple Brand Accent) & Percentage (Green Mastery) */}
      <View style={styles.headerRow}>
        <View style={styles.badgePill}>
          <View style={styles.badgeDot} />
          <Text style={styles.badgeText}>{t.progressTitle}</Text>
        </View>
        <Text style={styles.percentageText}>{clampedProgress}%</Text>
      </View>

      {/* Progress Label */}
      <Text style={styles.progressLabel}>{t.learningProgress}</Text>

      {/* Progress Track with Green Mastery Fill */}
      <View style={styles.track}>
        <View style={[styles.fill, { width: `${clampedProgress}%` }]} />
      </View>

      {/* Metric Stat Pills */}
      <View style={styles.statsRow}>
        <TouchableOpacity
          style={styles.statPill}
          onPress={onStreakPress}
          disabled={!onStreakPress}
          activeOpacity={0.7}
          accessibilityRole={onStreakPress ? 'button' : 'text'}
          accessibilityLabel={`${streakDays} ${t.streak}`}
        >
          <Text style={styles.statIcon}>🔥</Text>
          <Text style={styles.statText}>
            {streakDays} {t.streak}
          </Text>
        </TouchableOpacity>

        <View style={styles.statPill}>
          <Text style={styles.statIcon}>⭐</Text>
          <Text style={styles.statText}>
            {points} {t.points}
          </Text>
        </View>

        {Boolean(rank) && (
          <View style={[styles.statPill, styles.rankPill]}>
            <Text style={styles.statIcon}>👑</Text>
            <Text style={[styles.statText, styles.rankText]}>
              {t.rank} {rank}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: theme.spacing.base,
    marginVertical: theme.spacing.xs,
    shadowColor: theme.colors.navy900,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  badgePill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.purple100,
    borderWidth: 1,
    borderColor: theme.colors.purple200,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: theme.borderRadius.full,
  },
  badgeDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: theme.colors.brandPrimary,
    marginRight: 6,
  },
  badgeText: {
    ...theme.typography.overline,
    fontSize: 9.5,
    color: theme.colors.brandPrimary,
    letterSpacing: 1.2,
    fontWeight: '700',
  },
  percentageText: {
    ...theme.typography.h2,
    fontSize: 22,
    fontWeight: '800',
    color: theme.colors.success,
  },
  progressLabel: {
    ...theme.typography.caption,
    fontSize: 13,
    color: theme.colors.slate600,
    marginBottom: theme.spacing.sm,
  },
  track: {
    width: '100%',
    height: 10,
    backgroundColor: theme.colors.gray100,
    borderRadius: 5,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: theme.colors.border,
    marginBottom: theme.spacing.md,
  },
  fill: {
    height: '100%',
    backgroundColor: theme.colors.success,
    borderRadius: 5,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 6,
  },
  statPill: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.gray50,
    borderWidth: 1,
    borderColor: theme.colors.border,
    paddingVertical: 7,
    paddingHorizontal: 4,
    borderRadius: theme.borderRadius.full,
  },
  rankPill: {
    backgroundColor: theme.colors.blue50,
    borderColor: theme.colors.blue200,
  },
  statIcon: {
    fontSize: 13,
    marginRight: 4,
  },
  statText: {
    ...theme.typography.caption,
    fontSize: 11,
    fontWeight: '700',
    color: theme.colors.navy900,
  },
  rankText: {
    color: theme.colors.actionPrimary,
    fontWeight: '800',
  },
});
