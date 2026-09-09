/**
 * ProgressSummaryGrid Component
 * Displays derived summary statistics across the learner's journey.
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../../theme';
import { SupportedLanguage } from '../../config/i18n';
import { getProgressI18n, interpolate } from './progress.i18n';

export interface ProgressSummaryGridProps {
  subjectsExplored: number;
  totalSubjects: number;
  topicsExplored: number;
  totalTopics: number;
  activitiesCompleted: number;
  badgesEarned: number;
  certificatesEarned: number;
  language?: SupportedLanguage;
}

export const ProgressSummaryGrid: React.FC<ProgressSummaryGridProps> = ({
  subjectsExplored,
  totalSubjects,
  topicsExplored,
  totalTopics,
  activitiesCompleted,
  badgesEarned,
  certificatesEarned,
  language = 'en',
}) => {
  const t = getProgressI18n(language);

  const stats = [
    {
      id: 'subjects',
      label: t.summary.subjectsExplored,
      value: `${subjectsExplored} / ${totalSubjects}`,
      icon: '🔬',
    },
    {
      id: 'topics',
      label: t.summary.topicsExplored,
      value: `${topicsExplored} / ${totalTopics}`,
      icon: '📚',
    },
    {
      id: 'activities',
      label: t.summary.activitiesCompleted,
      value: `${activitiesCompleted}`,
      icon: '⚡',
    },
    {
      id: 'badges',
      label: t.summary.badgesEarned,
      value: `${badgesEarned}`,
      icon: '🏆',
    },
    {
      id: 'certificates',
      label: t.summary.certificatesEarned,
      value: `${certificatesEarned}`,
      icon: '📜',
    },
  ];

  return (
    <View style={styles.container}>
      {stats.map((stat) => (
        <View
          key={stat.id}
          style={styles.box}
          accessible={true}
          accessibilityRole="text"
          accessibilityLabel={interpolate(t.accessibility.statBox, {
            value: stat.value,
            label: stat.label,
          })}
        >
          <Text style={styles.icon}>{stat.icon}</Text>
          <Text style={styles.value}>{stat.value}</Text>
          <Text style={styles.label} numberOfLines={2}>
            {stat.label}
          </Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.xs,
    marginBottom: theme.spacing.md,
  },
  box: {
    flex: 1,
    minWidth: '28%',
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.xs,
    borderWidth: 1,
    borderColor: theme.colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: theme.colors.navy900,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 1,
  },
  icon: {
    fontSize: 18,
    marginBottom: 2,
  },
  value: {
    ...theme.typography.h3,
    fontSize: 16,
    fontWeight: '800',
    color: theme.colors.navy900,
    textAlign: 'center',
  },
  label: {
    ...theme.typography.caption,
    fontSize: 11,
    color: theme.colors.slate600,
    textAlign: 'center',
    marginTop: 2,
  },
});
