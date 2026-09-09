/**
 * ProgressHeroCard Component
 * Dominant visual card showing overall science journey progress,
 * daily streak, total XP, and achievements earned.
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { theme } from '../../theme';
import { SupportedLanguage } from '../../config/i18n';
import { getProgressI18n, interpolate } from './progress.i18n';

export interface ProgressHeroCardProps {
  progressPercentage: number;
  streakDays: number;
  totalXp: number;
  achievementsCount: number;
  language?: SupportedLanguage;
  onStreakPress?: () => void;
}

export const ProgressHeroCard: React.FC<ProgressHeroCardProps> = ({
  progressPercentage,
  streakDays,
  totalXp,
  achievementsCount,
  language = 'en',
  onStreakPress,
}) => {
  const t = getProgressI18n(language);
  const clampedProgress = Math.min(100, Math.max(0, Math.round(progressPercentage)));

  const a11yLabel = interpolate(t.accessibility.heroCard, {
    progress: clampedProgress,
    streak: streakDays,
    xp: totalXp,
    badges: achievementsCount,
  });

  return (
    <View
      style={styles.card}
      accessible={true}
      accessibilityRole="summary"
      accessibilityLabel={a11yLabel}
    >
      {/* Top Header Pill */}
      <View style={styles.topRow}>
        <View style={styles.badgePill}>
          <View style={styles.badgeDot} />
          <Text style={styles.badgeText}>{t.myScienceProgress}</Text>
        </View>
        <Text style={styles.percentageBig}>{clampedProgress}%</Text>
      </View>

      <Text style={styles.labelSub}>{t.overallActivityProgress}</Text>

      {/* Progress Track */}
      <View style={styles.track}>
        <View style={[styles.fill, { width: `${clampedProgress}%` }]} />
      </View>

      {/* Metric Stat Pills */}
      <View style={styles.statsRow}>
        <TouchableOpacity
          style={styles.pill}
          onPress={onStreakPress}
          disabled={!onStreakPress}
          activeOpacity={0.7}
          accessibilityRole={onStreakPress ? 'button' : 'text'}
          accessibilityLabel={interpolate(t.streakDays, { count: streakDays })}
        >
          <Text style={styles.pillIcon}>🔥</Text>
          <Text style={styles.pillText}>
            {interpolate(t.streakDays, { count: streakDays })}
          </Text>
        </TouchableOpacity>
        <View style={styles.pill}>
          <Text style={styles.pillIcon}>⚡</Text>
          <Text style={styles.pillText}>
            {interpolate(t.totalXp, { count: totalXp })}
          </Text>
        </View>
        <View style={styles.pill}>
          <Text style={styles.pillIcon}>🏆</Text>
          <Text style={styles.pillText}>
            {interpolate(t.achievements, { count: achievementsCount })}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.xl,
    padding: theme.spacing.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    shadowColor: theme.colors.navy900,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
    marginBottom: theme.spacing.md,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.xs,
  },
  badgePill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFF6FF',
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 4,
    borderRadius: theme.borderRadius.full,
    gap: 6,
  },
  badgeDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: theme.colors.blue600,
  },
  badgeText: {
    ...theme.typography.caption,
    fontWeight: '800',
    color: theme.colors.blue600,
    letterSpacing: 0.6,
  },
  percentageBig: {
    fontSize: 28,
    fontWeight: '900',
    color: theme.colors.navy900,
  },
  labelSub: {
    ...theme.typography.body,
    fontSize: 13,
    color: theme.colors.slate600,
    marginBottom: theme.spacing.sm,
    fontWeight: '500',
  },
  track: {
    height: 10,
    backgroundColor: theme.colors.gray100,
    borderRadius: theme.borderRadius.full,
    overflow: 'hidden',
    marginBottom: theme.spacing.md,
  },
  fill: {
    height: '100%',
    backgroundColor: theme.colors.green600,
    borderRadius: theme.borderRadius.full,
  },
  statsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.xs,
  },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.gray50,
    borderWidth: 1,
    borderColor: theme.colors.border,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 6,
    borderRadius: theme.borderRadius.full,
    gap: 4,
  },
  pillIcon: {
    fontSize: 13,
  },
  pillText: {
    ...theme.typography.caption,
    fontWeight: '700',
    color: theme.colors.navy900,
  },
});
