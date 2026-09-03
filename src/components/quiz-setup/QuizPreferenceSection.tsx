/**
 * QuizPreferenceSection Component
 * Configures optional quiz preferences: Explanations, Sound, Confirm Before Finish.
 */

import React from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';
import { theme } from '../../theme';
import { SupportedLanguage, getTranslation } from '../../config/i18n';

interface QuizPreferenceSectionProps {
  showExplanation: boolean;
  soundEffects: boolean;
  confirmBeforeFinish: boolean;
  onToggleExplanation: (val: boolean) => void;
  onToggleSound: (val: boolean) => void;
  onToggleConfirm: (val: boolean) => void;
  language?: SupportedLanguage;
}

export const QuizPreferenceSection: React.FC<QuizPreferenceSectionProps> = ({
  showExplanation,
  soundEffects,
  confirmBeforeFinish,
  onToggleExplanation,
  onToggleSound,
  onToggleConfirm,
  language = 'en',
}) => {
  const t = getTranslation(language).quizSetup;

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>{t.preferencesSection}</Text>

      <View style={styles.card}>
        {/* 1. Show Explanations */}
        <View style={styles.row}>
          <View style={styles.labelContainer}>
            <Text style={styles.itemTitle}>{t.showExplanation}</Text>
          </View>
          <Switch
            value={showExplanation}
            onValueChange={onToggleExplanation}
            trackColor={{
              false: theme.colors.gray300,
              true: theme.colors.blue300,
            }}
            thumbColor={showExplanation ? theme.colors.actionPrimary : theme.colors.white}
            ios_backgroundColor={theme.colors.gray300}
            accessible={true}
            accessibilityRole="switch"
            accessibilityLabel={t.accessibility.explanationSwitchLabel}
            accessibilityState={{ checked: showExplanation }}
          />
        </View>

        <View style={styles.divider} />

        {/* 2. Sound Effects */}
        <View style={styles.row}>
          <View style={styles.labelContainer}>
            <Text style={styles.itemTitle}>{t.soundEffects}</Text>
          </View>
          <Switch
            value={soundEffects}
            onValueChange={onToggleSound}
            trackColor={{
              false: theme.colors.gray300,
              true: theme.colors.blue300,
            }}
            thumbColor={soundEffects ? theme.colors.actionPrimary : theme.colors.white}
            ios_backgroundColor={theme.colors.gray300}
            accessible={true}
            accessibilityRole="switch"
            accessibilityLabel={t.accessibility.soundSwitchLabel}
            accessibilityState={{ checked: soundEffects }}
          />
        </View>

        <View style={styles.divider} />

        {/* 3. Confirm Before Finish */}
        <View style={styles.row}>
          <View style={styles.labelContainer}>
            <Text style={styles.itemTitle}>{t.confirmBeforeFinish}</Text>
          </View>
          <Switch
            value={confirmBeforeFinish}
            onValueChange={onToggleConfirm}
            trackColor={{
              false: theme.colors.gray300,
              true: theme.colors.blue300,
            }}
            thumbColor={confirmBeforeFinish ? theme.colors.actionPrimary : theme.colors.white}
            ios_backgroundColor={theme.colors.gray300}
            accessible={true}
            accessibilityRole="switch"
            accessibilityLabel={t.accessibility.confirmSwitchLabel}
            accessibilityState={{ checked: confirmBeforeFinish }}
          />
        </View>
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
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    paddingHorizontal: theme.spacing.base,
    shadowColor: theme.colors.navy900,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 3,
    elevation: 1,
  },
  row: {
    minHeight: 52,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: theme.spacing.xs,
  },
  labelContainer: {
    flex: 1,
    marginRight: theme.spacing.md,
  },
  itemTitle: {
    ...theme.typography.bodyLarge,
    fontSize: 14.5,
    fontWeight: '600',
    color: theme.colors.navy900,
  },
  divider: {
    height: 1,
    backgroundColor: theme.colors.gray200,
    width: '100%',
  },
});
