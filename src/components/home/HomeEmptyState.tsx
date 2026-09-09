/**
 * HomeEmptyState — Positive, encouraging empty state for Home 2.0.
 * Used when no data is available for a section.
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../../theme';
import { SupportedLanguage } from '../../config/i18n';

interface HomeEmptyStateProps {
  icon: string;
  title: string;
  titleTa: string;
  subtitle: string;
  subtitleTa: string;
  language: SupportedLanguage;
}

export const HomeEmptyState: React.FC<HomeEmptyStateProps> = ({
  icon,
  title,
  titleTa,
  subtitle,
  subtitleTa,
  language,
}) => {
  const isTamil = language === 'ta';

  return (
    <View style={styles.container} accessible accessibilityRole="text">
      <Text style={styles.icon}>{icon}</Text>
      <Text style={styles.title}>
        {isTamil ? titleTa : title}
      </Text>
      <Text style={styles.subtitle}>
        {isTamil ? subtitleTa : subtitle}
      </Text>
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
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  icon: {
    fontSize: 28,
    marginBottom: 6,
  },
  title: {
    ...theme.typography.body,
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.navy800,
    textAlign: 'center',
    marginBottom: 2,
  },
  subtitle: {
    ...theme.typography.caption,
    fontSize: 12,
    color: theme.colors.slate500,
    textAlign: 'center',
  },
});
