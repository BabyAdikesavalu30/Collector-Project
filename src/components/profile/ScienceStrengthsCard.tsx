/**
 * ScienceStrengthsCard — visual per-domain strength summary calculated from
 * actual local activity (quiz accuracy, game mastery, mysteries, facts).
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../../theme';
import { SupportedLanguage, getTranslation } from '../../config/i18n';
import { ScienceStrength } from '../../features/profile';
import { ProgressBar } from '../shared';

interface ScienceStrengthsCardProps {
  strengths: ScienceStrength[];
  language: SupportedLanguage;
}

export const ScienceStrengthsCard: React.FC<ScienceStrengthsCardProps> = ({ strengths, language }) => {
  const t = getTranslation(language).progress.profile;

  return (
    <View style={styles.card}>
      <Text style={styles.sectionTitle}>{t.scienceStrengths.toUpperCase()}</Text>
      {strengths.map((strength) => (
        <View key={strength.domain} style={styles.strengthRow}>
          <Text style={styles.strengthIcon}>{strength.icon}</Text>
          <View style={styles.strengthContent}>
            <Text style={styles.strengthLabel}>{language === 'ta' ? strength.labelTa : strength.label}</Text>
            <ProgressBar
              progress={strength.percent}
              label={`${language === 'ta' ? strength.labelTa : strength.label}: ${strength.percent}%`}
              color={
                strength.domain === 'physics'
                  ? theme.colors.actionPrimary
                  : strength.domain === 'chemistry'
                  ? theme.colors.brandPrimary
                  : strength.domain === 'biology'
                  ? theme.colors.success
                  : theme.colors.info
              }
              trackColor={theme.colors.gray200}
            />
          </View>
        </View>
      ))}
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
  strengthRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  strengthIcon: {
    fontSize: 16,
    width: 28,
    textAlign: 'center',
  },
  strengthContent: {
    flex: 1,
  },
  strengthLabel: {
    ...theme.typography.body,
    fontSize: 13,
    fontWeight: '600',
    color: theme.colors.navy800,
    marginBottom: 4,
  },
});