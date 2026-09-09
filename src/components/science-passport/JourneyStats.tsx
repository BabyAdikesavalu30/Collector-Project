/**
 * JourneyStats — Compact summary of the student's science journey.
 * Displays activity counts for all features.
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { theme } from '../../theme';
import { SupportedLanguage } from '../../config/i18n';
import { PassportActivityStats, PassportFeatureCounts } from '../../features/science-passport';

interface JourneyStatsProps {
  activityStats: PassportActivityStats;
  featureCounts: PassportFeatureCounts;
  language: SupportedLanguage;
  onNavigate?: (route: string) => void;
}

interface StatItem {
  icon: string;
  label: { en: string; ta: string };
  value: number;
  total?: number;
  route?: string;
}

export const JourneyStats: React.FC<JourneyStatsProps> = ({
  activityStats,
  featureCounts,
  language,
  onNavigate,
}) => {
  const isTamil = language === 'ta';

  const stats: StatItem[] = [
    {
      icon: '📋',
      label: { en: 'Activities', ta: 'செயல்பாடுகள்' },
      value: activityStats.totalActivities,
    },
    {
      icon: '🏅',
      label: { en: 'Badges', ta: 'சாதனைகள்' },
      value: featureCounts.badges.earned,
      total: featureCounts.badges.total,
      route: '/achievements',
    },
    {
      icon: '📦',
      label: { en: 'Collections', ta: 'தொகுப்புகள்' },
      value: featureCounts.collections.completed,
      total: featureCounts.collections.total,
    },
    {
      icon: '🧪',
      label: { en: 'Experiments', ta: 'சோதனைகள்' },
      value: activityStats.experimentsCompleted,
      route: '/experiment-lab',
    },
    {
      icon: '📖',
      label: { en: 'Lessons', ta: 'பாடங்கள்' },
      value: activityStats.microLessonsCompleted,
      route: '/micro-lessons',
    },
    {
      icon: '🗺️',
      label: { en: 'Concept Maps', ta: 'கருத்து வரைபடங்கள்' },
      value: activityStats.conceptMapsCompleted,
      route: '/concept-maps',
    },
    {
      icon: '🕵️',
      label: { en: 'Mysteries', ta: 'மர்மங்கள்' },
      value: activityStats.mysteriesSolved,
      route: '/mystery-lab',
    },
    {
      icon: '🧩',
      label: { en: 'Riddles', ta: 'புதிர்கள்' },
      value: activityStats.riddlesSolved,
      route: '/riddles',
    },
    {
      icon: '🎮',
      label: { en: 'Games', ta: 'ஆட்டங்கள்' },
      value: activityStats.gamesCompleted,
      route: '/games',
    },
    {
      icon: '📜',
      label: { en: 'Certificates', ta: 'சான்றிதழ்கள்' },
      value: featureCounts.certificates.earned,
      route: '/certificates',
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>
        {isTamil ? 'என் பயணம்' : 'MY JOURNEY'}
      </Text>

      <View style={styles.grid}>
        {stats.map((stat) => {
          const hasValue = stat.value > 0;
          const label = isTamil ? stat.label.ta : stat.label.en;

          const content = (
            <View style={styles.statItem} key={label}>
              <Text style={styles.statIcon}>{stat.icon}</Text>
              <Text style={[styles.statValue, !hasValue && styles.statValueEmpty]}>
                {hasValue ? stat.value : '—'}
              </Text>
              <Text style={styles.statLabel} numberOfLines={1}>
                {label}
              </Text>
              {stat.total !== undefined && (
                <Text style={styles.statTotal}>/ {stat.total}</Text>
              )}
            </View>
          );

          if (stat.route && onNavigate) {
            return (
              <TouchableOpacity
                key={label}
                onPress={() => onNavigate(stat.route!)}
                activeOpacity={0.7}
                style={styles.statTouchable}
              >
                {content}
              </TouchableOpacity>
            );
          }

          return (
            <View key={label} style={styles.statTouchable}>
              {content}
            </View>
          );
        })}
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
    marginBottom: theme.spacing.md,
  },
  sectionTitle: {
    ...theme.typography.caption,
    fontSize: 12,
    fontWeight: '800',
    color: theme.colors.navy900,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: theme.spacing.md,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.sm,
  },
  statTouchable: {
    width: '31%',
    minWidth: 90,
  },
  statItem: {
    backgroundColor: theme.colors.gray50,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderColor: theme.colors.gray200,
    padding: theme.spacing.sm,
    alignItems: 'center',
  },
  statIcon: {
    fontSize: 20,
    marginBottom: 4,
  },
  statValue: {
    ...theme.typography.h3,
    fontSize: 18,
    fontWeight: '800',
    color: theme.colors.navy900,
  },
  statValueEmpty: {
    color: theme.colors.slate400,
  },
  statLabel: {
    ...theme.typography.caption,
    fontSize: 10,
    color: theme.colors.slate600,
    marginTop: 2,
    textAlign: 'center',
  },
  statTotal: {
    ...theme.typography.caption,
    fontSize: 10,
    color: theme.colors.slate400,
    marginTop: 1,
  },
});
