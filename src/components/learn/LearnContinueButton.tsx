/**
 * LearnContinueButton Component
 * Primary CTA for Screen 17 Learn Science.
 * Enabled only when Level, Subject, and Learning Pathway are selected.
 * Royal Blue (#2563EB) styling with high contrast text.
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { theme } from '../../theme';
import { SupportedLanguage, getTranslation } from '../../config/i18n';

interface LearnContinueButtonProps {
  isEnabled: boolean;
  language?: SupportedLanguage;
  onPress: () => void;
}

export const LearnContinueButton: React.FC<LearnContinueButtonProps> = ({
  isEnabled,
  language = 'en',
  onPress,
}) => {
  const t = getTranslation(language).learnScreen;

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, isEnabled ? styles.buttonEnabled : styles.buttonDisabled]}
        onPress={onPress}
        disabled={!isEnabled}
        activeOpacity={0.85}
        accessible={true}
        accessibilityRole="button"
        accessibilityState={{ disabled: !isEnabled }}
        accessibilityLabel={t.continueCta}
        accessibilityHint={t.accessibility.continueHint}
      >
        <Text style={[styles.buttonText, isEnabled ? styles.buttonTextEnabled : styles.buttonTextDisabled]}>
          {t.continueCta} →
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingTop: theme.spacing.sm,
    paddingBottom: theme.spacing.base,
  },
  button: {
    width: '100%',
    height: 50,
    borderRadius: theme.borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  buttonEnabled: {
    backgroundColor: theme.colors.actionPrimary,
    shadowColor: theme.colors.actionPrimary,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 3,
  },
  buttonDisabled: {
    backgroundColor: theme.colors.gray200,
  },
  buttonText: {
    ...theme.typography.button,
    fontSize: 15,
    fontWeight: '800',
    letterSpacing: 0.3,
  },
  buttonTextEnabled: {
    color: theme.colors.textOnAction,
  },
  buttonTextDisabled: {
    color: theme.colors.slate400,
  },
});
