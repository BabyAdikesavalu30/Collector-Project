/**
 * TodayOverviewCard — Strong "Today" section for Home 2.0.
 * Shows daily goal, streak, XP today, and activities count.
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { theme } from '../../theme';
import { SupportedLanguage, getTranslation } from '../../config/i18n';
import { TodayOverview, HomeDailyGoal } from '../../features/home/home2.types';

interface TodayOverviewCardProps {
  today: TodayOverview;
  dailyGoal: HomeDailyGoal | null;
  language: SupportedLanguage;
  onStreakPress?: () => void;
  onDailyGoalPress?: () => void;
}

export const TodayOverviewCard: React.FC<TodayOverviewCardProps> = ({
  today,
  dailyGoal,
  language,
  onStreakPress,
  onDailyGoalPress,
}) => {
  const isTamil = language === 'ta';
  const t = getTranslation(language).home;

  const goalProgress = dailyGoal
    ? Math.min(100, Math.round((dailyGoal.current / dailyGoal.target) * 100))
    : 0;
  const goalComplete = dailyGoal?.status === 'completed' || dailyGoal?.status === 'claimed';

  return (
    <View style={styles.container} accessible accessibilityRole="summary">
      <Text style={styles.sectionTitle}>
        {isTamil ? 'இன்று' : 'TODAY'}
      </Text>

      <View style={styles.content}>
        {/* Daily Goal */}
        {dailyGoal && (
          <TouchableOpacity
            style={styles.goalSection}
            onPress={onDailyGoalPress}
            activeOpacity={0.8}
            accessibilityRole="button"
            accessibilityLabel={`${dailyGoal.title}: ${dailyGoal.current} of ${dailyGoal.target}`}
          >
            <View style={styles.goalHeader}>
              <Text style={styles.goalIcon}>🎯</Text>
              <View style={styles.goalText}>
                <Text style={styles.goalTitle} numberOfLines={1}>
                  {isTamil ? dailyGoal.titleTa : dailyGoal.title}
                </Text>
                <Text style={styles.goalCount}>
                  {dailyGoal.current} / {dailyGoal.target}
                  {goalComplete ? ' ✓' : ''}
                </Text>
              </View>
            </View>
            <View style={styles.goalTrack}>
              <View
                style={[
                  styles.goalFill,
                  { width: `${goalProgress}%` },
                  goalComplete && styles.goalFillComplete,
                ]}
              />
            </View>
            {!goalComplete && dailyGoal.current < dailyGoal.target && (
              <Text style={styles.goalHint}>
                {isTamil
                  ? `${dailyGoal.target - dailyGoal.current} செயல்பாடு மீதம்`
                  : `${dailyGoal.target - dailyGoal.current} more activit${dailyGoal.target - dailyGoal.current === 1 ? 'y' : 'ies'} remaining`}
              </Text>
            )}
          </TouchableOpacity>
        )}

        {/* Stats Row */}
        <View style={styles.statsRow}>
          {/* Streak */}
          <TouchableOpacity
            style={styles.statPill}
            onPress={onStreakPress}
            disabled={!onStreakPress}
            activeOpacity={0.7}
            accessibilityRole={onStreakPress ? 'button' : 'text'}
            accessibilityLabel={`${today.streakDays} day streak`}
          >
            <Text style={styles.statIcon}>🔥</Text>
            <Text style={styles.statValue}>{today.streakDays}</Text>
            <Text style={styles.statLabel}>
              {isTamil ? 'நாள் தொடர்ச்சி' : 'day streak'}
            </Text>
          </TouchableOpacity>

          {/* XP Today */}
          <View style={styles.statPill}>
            <Text style={styles.statIcon}>⚡</Text>
            <Text style={styles.statValue}>+{today.xpToday}</Text>
            <Text style={styles.statLabel}>XP</Text>
          </View>

          {/* Activities Today */}
          <View style={styles.statPill}>
            <Text style={styles.statIcon}>📋</Text>
            <Text style={styles.statValue}>{today.activitiesToday}</Text>
            <Text style={styles.statLabel}>
              {isTamil ? 'செயல்பாடுகள்' : 'done'}
            </Text>
          </View>
        </View>
      </View>
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
  content: {
    gap: theme.spacing.sm,
  },
  goalSection: {
    backgroundColor: theme.colors.gray50,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderColor: theme.colors.gray200,
    padding: theme.spacing.md,
  },
  goalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  goalIcon: {
    fontSize: 18,
    marginRight: 8,
  },
  goalText: {
    flex: 1,
  },
  goalTitle: {
    ...theme.typography.body,
    fontSize: 13,
    fontWeight: '700',
    color: theme.colors.navy900,
  },
  goalCount: {
    ...theme.typography.caption,
    fontSize: 12,
    fontWeight: '700',
    color: theme.colors.slate600,
  },
  goalTrack: {
    height: 6,
    backgroundColor: theme.colors.gray200,
    borderRadius: 3,
    overflow: 'hidden',
  },
  goalFill: {
    height: '100%',
    backgroundColor: theme.colors.actionPrimary,
    borderRadius: 3,
  },
  goalFillComplete: {
    backgroundColor: theme.colors.success,
  },
  goalHint: {
    ...theme.typography.caption,
    fontSize: 11,
    color: theme.colors.slate500,
    marginTop: 4,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 6,
  },
  statPill: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.gray50,
    borderWidth: 1,
    borderColor: theme.colors.gray200,
    paddingVertical: 8,
    paddingHorizontal: 4,
    borderRadius: theme.borderRadius.full,
    gap: 4,
  },
  statIcon: {
    fontSize: 12,
  },
  statValue: {
    ...theme.typography.caption,
    fontSize: 12,
    fontWeight: '800',
    color: theme.colors.navy900,
  },
  statLabel: {
    ...theme.typography.caption,
    fontSize: 10,
    color: theme.colors.slate500,
  },
});
