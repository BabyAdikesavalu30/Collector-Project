/**
 * LearningTakeawayCard Component
 * Reusable "REMEMBER" card: white surface, subtle green/blue accent,
 * small icon, clear typography. No decorative overload. Used by the coach
 * and available standalone to Mystery Lab / Games where appropriate.
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../../theme';
import { SupportedLanguage } from '../../config/i18n';
import { getFeedbackI18n } from './feedback.i18n';

interface LearningTakeawayCardProps {
  takeaway: string | null;
  language: SupportedLanguage;
  /** 'green' (default) or 'blue' accent. */
  accent?: 'green' | 'blue';
}

export const LearningTakeawayCard: React.FC<LearningTakeawayCardProps> = ({
  takeaway,
  language,
  accent = 'green',
}) => {
  const t = getFeedbackI18n(language);
  if (!takeaway || takeaway.trim().length === 0) return null;

  const accentColor = accent === 'green' ? theme.colors.green600 : theme.colors.blue600;
  const accentBg = accent === 'green' ? theme.colors.green50 : theme.colors.blue50;
  const accentBorder = accent === 'green' ? theme.colors.green100 : theme.colors.blue100;

  return (
    <View
      style={[styles.container, { backgroundColor: accentBg, borderColor: accentBorder }]}
      accessible={true}
      accessibilityRole="text"
      accessibilityLabel={`${t.accessibility.takeawayCard}: ${takeaway}`}
    >
      <View style={styles.headerRow}>
        <Text style={styles.icon}>🌟</Text>
        <Text style={[styles.label, { color: accentColor }]}>{t.remember}</Text>
      </View>
      <Text style={styles.text}>"{takeaway}"</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    padding: theme.spacing.md,
    marginTop: theme.spacing.sm,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
  },
  icon: {
    fontSize: 14,
  },
  label: {
    ...theme.typography.caption,
    fontSize: 11,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  text: {
    fontSize: 13.5,
    fontWeight: '600',
    color: theme.colors.navy900,
    lineHeight: 20,
  },
});
