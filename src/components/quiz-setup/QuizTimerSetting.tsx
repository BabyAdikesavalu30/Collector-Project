/**
 * QuizTimerSetting Component
 * Displays 60 seconds per question preference toggle.
 */

import React from 'react';
import { View, Text, StyleSheet, Switch, Platform } from 'react-native';
import { theme } from '../../theme';
import { SupportedLanguage, getTranslation } from '../../config/i18n';

interface QuizTimerSettingProps {
  timerEnabled: boolean;
  onToggleTimer: (enabled: boolean) => void;
  language?: SupportedLanguage;
}

export const QuizTimerSetting: React.FC<QuizTimerSettingProps> = ({
  timerEnabled,
  onToggleTimer,
  language = 'en',
}) => {
  const t = getTranslation(language).quizSetup;

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>{t.timerSection}</Text>

      <View style={styles.card}>
        <View style={styles.textContainer}>
          <View style={styles.titleRow}>
            <Text style={styles.timerIcon}>⏱️</Text>
            <Text style={styles.cardTitle}>{t.timerPerQuestion}</Text>
          </View>
          <Text style={styles.cardSubtitle}>{t.timerSub}</Text>
        </View>

        <Switch
          value={timerEnabled}
          onValueChange={onToggleTimer}
          trackColor={{
            false: theme.colors.gray300,
            true: theme.colors.blue300,
          }}
          thumbColor={timerEnabled ? theme.colors.actionPrimary : theme.colors.white}
          ios_backgroundColor={theme.colors.gray300}
          accessible={true}
          accessibilityRole="switch"
          accessibilityLabel={t.accessibility.timerSwitchLabel}
          accessibilityState={{ checked: timerEnabled }}
          accessibilityHint={t.accessibility.timerHint}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: theme.spacing.lg,
  },
  sectionTitle: {
    ...theme.typography.h3,
    fontSize: 16,
    lineHeight: 22,
    color: theme.colors.navy900,
    marginBottom: theme.spacing.sm,
    fontWeight: '700',
  },
  card: {
    minHeight: 60,
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    paddingHorizontal: theme.spacing.base,
    paddingVertical: theme.spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: theme.colors.navy900,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 3,
    elevation: 1,
  },
  textContainer: {
    flex: 1,
    marginRight: theme.spacing.md,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  timerIcon: {
    fontSize: 16,
    marginRight: 6,
  },
  cardTitle: {
    ...theme.typography.bodyLarge,
    fontSize: 14.5,
    fontWeight: '700',
    color: theme.colors.navy900,
  },
  cardSubtitle: {
    ...theme.typography.caption,
    fontSize: 12,
    color: theme.colors.slate600,
    lineHeight: 16,
  },
});
