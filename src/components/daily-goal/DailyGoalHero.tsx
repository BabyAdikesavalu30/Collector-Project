/**
 * DailyGoalHero Component
 * Premium header section showing the daily goal title and description.
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../../theme';
import { SupportedLanguage } from '../../config/i18n';
import { DailyGoalWithProgress } from '../../features/daily-goal';

interface DailyGoalHeroProps {
  goal: DailyGoalWithProgress;
  language: SupportedLanguage;
}

export const DailyGoalHero: React.FC<DailyGoalHeroProps> = ({ goal, language }) => {
  const isTamil = language === 'ta';

  return (
    <View style={styles.container}>
      <View style={styles.iconWrapper}>
        <Text style={styles.icon}>🎯</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>{isTamil ? goal.definition.titleTa : goal.definition.title}</Text>
        <Text style={styles.description} numberOfLines={2}>
          {isTamil ? goal.definition.descriptionTa : goal.definition.description}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 16,
  },
  iconWrapper: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: theme.colors.brandBadge,
    borderWidth: 1,
    borderColor: theme.colors.brandBadgeBorder,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  icon: {
    fontSize: 28,
  },
  content: {
    flex: 1,
  },
  title: {
    ...theme.typography.h3,
    fontSize: 20,
    fontWeight: '800',
    color: theme.colors.navy900,
    marginBottom: 4,
  },
  description: {
    ...theme.typography.body,
    fontSize: 14,
    color: theme.colors.slate600,
    lineHeight: 20,
  },
});