/**
 * RiddleDifficultySummary Component
 * Compact card displaying selected challenge level with difficulty icon.
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../../theme';
import { SupportedLanguage } from '../../config/i18n';
import { RiddleDifficulty, resolveCategoryById } from '../../features/riddles';

interface RiddleDifficultySummaryProps {
  difficulty: RiddleDifficulty;
  language: SupportedLanguage;
  label: string;
}

export const RiddleDifficultySummary: React.FC<RiddleDifficultySummaryProps> = ({
  difficulty,
  language,
  label,
}) => {
  const category = resolveCategoryById(difficulty);
  const isTamil = language === 'ta';
  const title = category
    ? isTamil
      ? category.title.ta
      : category.title.en
    : difficulty.toUpperCase();
  const icon = category?.icon || '🧩';

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.label}>{label}</Text>
        <View style={styles.badgeRow}>
          <Text style={styles.icon}>{icon}</Text>
          <Text style={styles.title}>{title}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: theme.colors.gray50,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    paddingVertical: 10,
    paddingHorizontal: theme.spacing.md,
    marginBottom: theme.spacing.lg,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    ...theme.typography.caption,
    fontSize: 12,
    fontWeight: '700',
    color: theme.colors.slate600,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.white,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: theme.borderRadius.full,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  icon: {
    fontSize: 14,
    marginRight: 4,
  },
  title: {
    ...theme.typography.caption,
    fontSize: 12.5,
    fontWeight: '800',
    color: theme.colors.brandPrimary,
  },
});
