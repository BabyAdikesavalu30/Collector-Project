/**
 * StartQuizButton Component
 * Primary action button to launch the configured quiz.
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { theme } from '../../theme';
import { SupportedLanguage, getTranslation } from '../../config/i18n';

interface StartQuizButtonProps {
  onPress: () => void;
  disabled?: boolean;
  language?: SupportedLanguage;
}

export const StartQuizButton: React.FC<StartQuizButtonProps> = ({
  onPress,
  disabled = false,
  language = 'en',
}) => {
  const t = getTranslation(language).quizSetup;

  return (
    <TouchableOpacity
      style={[styles.button, disabled && styles.buttonDisabled]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.85}
      accessible={true}
      accessibilityRole="button"
      accessibilityLabel={t.startQuiz}
      accessibilityState={{ disabled }}
      accessibilityHint={t.accessibility.startHint}
    >
      <Text style={styles.buttonText}>{t.startQuiz}</Text>
      <View style={styles.arrowBadge}>
        <Text style={styles.arrowGlyph}>→</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: '100%',
    height: 52,
    backgroundColor: theme.colors.actionPrimary,
    borderRadius: theme.borderRadius.full,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: theme.colors.actionPrimary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 3,
  },
  buttonDisabled: {
    backgroundColor: theme.colors.gray400,
    shadowOpacity: 0,
    elevation: 0,
  },
  buttonText: {
    ...theme.typography.button,
    fontSize: 16,
    fontWeight: '800',
    color: theme.colors.textOnAction,
    letterSpacing: 0.5,
  },
  arrowBadge: {
    marginLeft: 8,
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrowGlyph: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '800',
    marginTop: -1,
  },
});
