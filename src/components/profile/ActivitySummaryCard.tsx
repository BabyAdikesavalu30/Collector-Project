/**
 * ActivitySummaryCard — grid of activity counts from the unified history.
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../../theme';
import { SupportedLanguage, getTranslation } from '../../config/i18n';
import { ActivitySummaryData } from '../../features/profile';

interface ActivitySummaryCardProps {
  summary: ActivitySummaryData;
  language: SupportedLanguage;
}

export const ActivitySummaryCard: React.FC<ActivitySummaryCardProps> = ({ summary, language }) => {
  const t = getTranslation(language).progress.profile;

  const stats: Array<{ icon: string; value: number; label: string }> = [
    { icon: '🔬', value: summary.quizzesCompleted, label: t.quizzes },
    { icon: '💡', value: summary.riddlesSolved, label: t.riddles },
    { icon: '🎮', value: summary.gamesPlayed, label: t.games },
    { icon: '🕵️', value: summary.mysteriesSolved, label: t.mysteries },
    { icon: '✨', value: summary.factsDiscovered, label: t.facts },
    { icon: '🎯', value: summary.challengesCompleted, label: t.challenges },
  ];

  return (
    <View style={styles.card}>
      <Text style={styles.sectionTitle}>{t.activitySummary.toUpperCase()}</Text>
      <View style={styles.grid}>
        {stats.map((stat) => (
          <View key={stat.label} style={styles.tile} accessible accessibilityLabel={`${stat.label}: ${stat.value}`}>
            <Text style={styles.tileIcon}>{stat.icon}</Text>
            <Text style={styles.tileValue}>{stat.value}</Text>
            <Text style={styles.tileLabel} numberOfLines={1}>
              {stat.label}
            </Text>
          </View>
        ))}
      </View>
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
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.sm,
  },
  tile: {
    width: '30%',
    flexGrow: 1,
    backgroundColor: theme.colors.surfaceMuted,
    borderRadius: theme.borderRadius.md,
    paddingVertical: theme.spacing.md,
    alignItems: 'center',
  },
  tileIcon: {
    fontSize: 18,
    marginBottom: 2,
  },
  tileValue: {
    ...theme.typography.h3,
    fontSize: 17,
    fontWeight: '900',
    color: theme.colors.navy900,
  },
  tileLabel: {
    ...theme.typography.caption,
    fontSize: 10.5,
    color: theme.colors.slate500,
    marginTop: 2,
  },
});