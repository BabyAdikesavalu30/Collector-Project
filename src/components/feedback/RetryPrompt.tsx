/**
 * RetryPrompt + SimilarQuestionCard Components
 * The coach never owns navigation: both components call parent callbacks
 * (onRetry / onPractice). Rapid taps are guarded so a retry or navigation
 * can never fire twice.
 */

import React, { useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { theme } from '../../theme';
import { SupportedLanguage } from '../../config/i18n';
import { getFeedbackI18n } from './feedback.i18n';

// ─────────────────────────── RetryPrompt ───────────────────────────

interface RetryPromptProps {
  onRetry: () => void;
  language: SupportedLanguage;
  disabled?: boolean;
}

export const RetryPrompt: React.FC<RetryPromptProps> = ({ onRetry, language, disabled = false }) => {
  const t = getFeedbackI18n(language);
  const firedRef = useRef(false);

  const handlePress = () => {
    if (firedRef.current || disabled) return; // rapid-tap guard
    firedRef.current = true;
    onRetry();
  };

  return (
    <TouchableOpacity
      style={styles.retryButton}
      onPress={handlePress}
      disabled={disabled}
      activeOpacity={0.85}
      accessible={true}
      accessibilityRole="button"
      accessibilityLabel={t.tryAgain}
      accessibilityHint={t.retryAvailable}
    >
      <Text style={styles.retryIcon}>🔄</Text>
      <Text style={styles.retryText}>{t.tryAgain}</Text>
    </TouchableOpacity>
  );
};

// ─────────────────────── SimilarQuestionCard ───────────────────────

interface SimilarQuestionCardProps {
  onPractice: () => void;
  language: SupportedLanguage;
  disabled?: boolean;
}

export const SimilarQuestionCard: React.FC<SimilarQuestionCardProps> = ({
  onPractice,
  language,
  disabled = false,
}) => {
  const t = getFeedbackI18n(language);
  const firedRef = useRef(false);

  const handlePress = () => {
    if (firedRef.current || disabled) return; // rapid-tap guard
    firedRef.current = true;
    onPractice();
  };

  return (
    <TouchableOpacity
      style={styles.similarButton}
      onPress={handlePress}
      disabled={disabled}
      activeOpacity={0.85}
      accessible={true}
      accessibilityRole="button"
      accessibilityLabel={t.trySimilarQuestion}
      accessibilityHint={t.nextStep}
    >
      <Text style={styles.similarIcon}>🎯</Text>
      <Text style={styles.similarText}>{t.trySimilarQuestion}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  retryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 44,
    paddingVertical: theme.spacing.sm + 2,
    paddingHorizontal: theme.spacing.md,
    backgroundColor: theme.colors.actionPrimary,
    borderRadius: theme.borderRadius.md,
    gap: 8,
    shadowColor: theme.colors.brandPrimary,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 2,
  },
  retryIcon: {
    fontSize: 14,
  },
  retryText: {
    fontSize: 14,
    fontWeight: '800',
    color: theme.colors.textOnAction,
  },
  similarButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 44,
    paddingVertical: theme.spacing.sm + 2,
    paddingHorizontal: theme.spacing.md,
    backgroundColor: theme.colors.white,
    borderWidth: 1.5,
    borderColor: theme.colors.blue200,
    borderRadius: theme.borderRadius.md,
    gap: 8,
  },
  similarIcon: {
    fontSize: 14,
  },
  similarText: {
    fontSize: 13.5,
    fontWeight: '700',
    color: theme.colors.blue700,
  },
});
