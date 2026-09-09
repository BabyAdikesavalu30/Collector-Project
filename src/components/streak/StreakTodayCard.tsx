/**
 * StreakTodayCard Component
 * Displays today's activity status, gentle keep-streak encouragement,
 * and optional Daily Goal progress snapshot.
 */

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { theme } from '../../theme';
import { SupportedLanguage } from '../../config/i18n';
import { getStreakI18n } from './streak.i18n';
import { DailyGoalWithProgress } from '../../features/daily-goal/dailyGoal.types';

interface StreakTodayCardProps {
  isTodayActive: boolean;
  dailyGoalSnapshot: DailyGoalWithProgress | null;
  onStartActivity: () => void;
  onViewDailyGoal: () => void;
  language?: SupportedLanguage;
}

export const StreakTodayCard: React.FC<StreakTodayCardProps> = ({
  isTodayActive,
  dailyGoalSnapshot,
  onStartActivity,
  onViewDailyGoal,
  language = 'en',
}) => {
  const t = getStreakI18n(language);

  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <View style={styles.badgePill}>
          <Text style={styles.badgeIcon}>📅</Text>
          <Text style={styles.badgeText}>{t.today.toUpperCase()}</Text>
        </View>

        {isTodayActive ? (
          <View style={styles.activePill}>
            <Text style={styles.activePillIcon}>✓</Text>
            <Text style={styles.activePillText}>{t.activeDay}</Text>
          </View>
        ) : (
          <View style={styles.pendingPill}>
            <Text style={styles.pendingPillIcon}>⏳</Text>
            <Text style={styles.pendingPillText}>{t.inactiveDay}</Text>
          </View>
        )}
      </View>

      <Text style={styles.statusDescription}>
        {isTodayActive ? t.activeToday : t.notStartedToday}
      </Text>

      {/* Daily Goal Integration Snapshot */}
      {dailyGoalSnapshot && (
        <View style={styles.dailyGoalBox}>
          <View style={styles.dailyGoalHeader}>
            <Text style={styles.dailyGoalTitle}>{t.dailyGoalProgress}</Text>
            <Text style={styles.dailyGoalCount}>
              {dailyGoalSnapshot.progress.current} / {dailyGoalSnapshot.progress.target}{' '}
              {t.activities.toLowerCase()}
            </Text>
          </View>

          {/* Goal Progress Bar */}
          <View style={styles.goalTrack}>
            <View
              style={[
                styles.goalFill,
                {
                  width: `${Math.min(
                    100,
                    Math.round(
                      (dailyGoalSnapshot.progress.current /
                        Math.max(1, dailyGoalSnapshot.progress.target)) *
                        100
                    )
                  )}%`,
                },
              ]}
            />
          </View>

          <TouchableOpacity
            style={styles.dailyGoalLink}
            onPress={onViewDailyGoal}
            accessibilityRole="button"
            accessibilityLabel={t.viewDailyGoal}
          >
            <Text style={styles.dailyGoalLinkText}>{t.viewDailyGoal} →</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* CTA Button when today is not active yet */}
      {!isTodayActive && (
        <TouchableOpacity
          style={styles.ctaButton}
          onPress={onStartActivity}
          activeOpacity={0.8}
          accessibilityRole="button"
          accessibilityLabel={t.startActivity}
        >
          <Text style={styles.ctaButtonIcon}>🚀</Text>
          <Text style={styles.ctaButtonText}>{t.startActivity}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.surfaceCardLight,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: theme.colors.gray200,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    shadowColor: theme.colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  badgePill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.blue50,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeIcon: {
    fontSize: 12,
    marginRight: 4,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: theme.colors.actionPrimary,
    letterSpacing: 0.5,
  },
  activePill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.green50,
    borderColor: theme.colors.green200,
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 12,
  },
  activePillIcon: {
    fontSize: 12,
    color: theme.colors.green700,
    fontWeight: '800',
    marginRight: 4,
  },
  activePillText: {
    fontSize: 12,
    fontWeight: '700',
    color: theme.colors.green700,
  },
  pendingPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.gray100,
    borderColor: theme.colors.gray200,
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 12,
  },
  pendingPillIcon: {
    fontSize: 11,
    marginRight: 4,
  },
  pendingPillText: {
    fontSize: 12,
    fontWeight: '600',
    color: theme.colors.slate600,
  },
  statusDescription: {
    fontSize: 14,
    color: theme.colors.navy800,
    lineHeight: 20,
    marginVertical: 4,
  },
  dailyGoalBox: {
    backgroundColor: theme.colors.gray50,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: theme.colors.gray200,
    padding: 12,
    marginTop: 10,
  },
  dailyGoalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  dailyGoalTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: theme.colors.navy900,
  },
  dailyGoalCount: {
    fontSize: 12,
    fontWeight: '600',
    color: theme.colors.actionPrimary,
  },
  goalTrack: {
    height: 6,
    backgroundColor: theme.colors.gray200,
    borderRadius: 3,
    overflow: 'hidden',
    marginVertical: 6,
  },
  goalFill: {
    height: '100%',
    backgroundColor: theme.colors.green600,
    borderRadius: 3,
  },
  dailyGoalLink: {
    alignSelf: 'flex-end',
    marginTop: 4,
    paddingVertical: 2,
  },
  dailyGoalLinkText: {
    fontSize: 12,
    fontWeight: '700',
    color: theme.colors.actionPrimary,
  },
  ctaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.actionPrimary,
    borderRadius: 12,
    paddingVertical: 12,
    marginTop: 12,
    minHeight: 44,
  },
  ctaButtonIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  ctaButtonText: {
    fontSize: 15,
    fontWeight: '700',
    color: theme.colors.white,
  },
});
