/**
 * StreakHeroCard Component
 * Dominant visual hero card presenting the student's current streak,
 * longest historical best, and motivational habit encouragement.
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../../theme';
import { SupportedLanguage } from '../../config/i18n';
import { getStreakI18n, interpolateText } from './streak.i18n';

interface StreakHeroCardProps {
  currentStreak: number;
  longestStreak: number;
  isTodayActive: boolean;
  language?: SupportedLanguage;
}

export const StreakHeroCard: React.FC<StreakHeroCardProps> = ({
  currentStreak,
  longestStreak,
  isTodayActive,
  language = 'en',
}) => {
  const t = getStreakI18n(language);
  const isFresh = currentStreak === 0;
  const isOneDay = currentStreak === 1;

  const a11ySummary = interpolateText(t.accessibility.heroSummary, {
    current: currentStreak,
    longest: longestStreak,
  });

  return (
    <View
      style={styles.card}
      accessible={true}
      accessibilityRole="summary"
      accessibilityLabel={a11ySummary}
    >
      {/* Decorative Warm Ambient Glow */}
      <View style={styles.topAccentBar} />

      <View style={styles.content}>
        {/* Flame Badge with Glow */}
        <View style={styles.flameContainer}>
          <Text style={styles.flameIcon}>🔥</Text>
        </View>

        {isFresh ? (
          <View style={styles.textContainer}>
            <View style={styles.pillBadge}>
              <Text style={styles.pillBadgeText}>{t.startYourStreak.toUpperCase()}</Text>
            </View>
            <Text style={styles.freshHeading}>{t.startYourStreak}</Text>
            <Text style={styles.freshSubtitle}>{t.freshUserPrompt}</Text>
          </View>
        ) : (
          <View style={styles.textContainer}>
            {/* Streak Number Counter */}
            <View style={styles.counterRow}>
              <Text style={styles.streakNumber}>{currentStreak}</Text>
              <View style={styles.streakLabelContainer}>
                <Text style={styles.streakDaysLabel}>
                  {currentStreak === 1 ? t.daySingular.toUpperCase() : t.days.toUpperCase()}
                </Text>
                <Text style={styles.streakSubLabel}>{t.currentStreak.toUpperCase()}</Text>
              </View>
            </View>

            {/* Best Streak Chip */}
            <View style={styles.bestPill}>
              <Text style={styles.bestPillIcon}>⭐</Text>
              <Text style={styles.bestPillText}>
                {t.best}: {longestStreak} {longestStreak === 1 ? t.daySingular : t.days}
              </Text>
            </View>

            {/* Motivational message */}
            <Text style={styles.motivationalText}>
              {isOneDay ? t.greatStart : t.amazingConsistency}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.surfaceCardLight,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: theme.colors.gray200,
    marginHorizontal: 16,
    marginVertical: 10,
    overflow: 'hidden',
    shadowColor: theme.colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 3,
  },
  topAccentBar: {
    height: 4,
    backgroundColor: theme.colors.actionPrimary,
    width: '100%',
  },
  content: {
    padding: 20,
    alignItems: 'center',
  },
  flameContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#FFFBEB', // Warm light amber
    borderWidth: 2,
    borderColor: '#FDE68A',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#D97706',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 2,
  },
  flameIcon: {
    fontSize: 34,
  },
  textContainer: {
    alignItems: 'center',
    width: '100%',
  },
  counterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  streakNumber: {
    fontSize: 48,
    fontWeight: '800',
    color: theme.colors.navy900,
    lineHeight: 52,
    marginRight: 10,
  },
  streakLabelContainer: {
    justifyContent: 'center',
  },
  streakDaysLabel: {
    fontSize: 16,
    fontWeight: '800',
    color: theme.colors.actionPrimary,
    letterSpacing: 0.5,
  },
  streakSubLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: theme.colors.slate500,
    letterSpacing: 0.5,
  },
  bestPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.blue50,
    borderColor: theme.colors.blue200,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 16,
    marginVertical: 8,
  },
  bestPillIcon: {
    fontSize: 13,
    marginRight: 5,
  },
  bestPillText: {
    fontSize: 13,
    fontWeight: '700',
    color: theme.colors.blue700,
  },
  motivationalText: {
    fontSize: 14,
    color: theme.colors.slate600,
    textAlign: 'center',
    marginTop: 6,
    lineHeight: 20,
  },
  pillBadge: {
    backgroundColor: theme.colors.purple100,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 8,
  },
  pillBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: theme.colors.purple700,
  },
  freshHeading: {
    fontSize: 20,
    fontWeight: '800',
    color: theme.colors.navy900,
    marginBottom: 6,
    textAlign: 'center',
  },
  freshSubtitle: {
    fontSize: 14,
    color: theme.colors.slate600,
    textAlign: 'center',
    lineHeight: 20,
    paddingHorizontal: 12,
  },
});
