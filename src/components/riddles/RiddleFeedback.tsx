/**
 * RiddleFeedback Component
 * Correct / Incorrect feedback banner, revealed answer, explanation, and action button.
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { theme } from '../../theme';
import { SupportedLanguage } from '../../config/i18n';
import { RiddleQuestion, RiddleStatus } from '../../features/riddles';

interface RiddleFeedbackProps {
  status: RiddleStatus;
  isExhausted: boolean;
  pointsAwarded: number;
  attemptsUsed: number;
  maxAttempts: number;
  riddle: RiddleQuestion;
  isLastRiddle: boolean;
  language: SupportedLanguage;
  onRetry: () => void;
  onNext: () => void;
  t: {
    correctTitle: string;
    correctSubtitle: string;
    incorrectTitle: string;
    incorrectSubtitle: string;
    exhaustedSubtitle: string;
    correctAnswerLabel: string;
    whyExplanation: string;
    tryAgain: string;
    nextRiddle: string;
    viewResults: string;
    pointsEarned: string;
    attemptsRemaining: string;
  };
}

export const RiddleFeedback: React.FC<RiddleFeedbackProps> = ({
  status,
  isExhausted,
  pointsAwarded,
  attemptsUsed,
  maxAttempts,
  riddle,
  isLastRiddle,
  language,
  onRetry,
  onNext,
  t,
}) => {
  if (status === 'unanswered') return null;

  const isTamil = language === 'ta';
  const isCorrect = status === 'correct';
  const correctAnswerText = isTamil ? riddle.answer.ta : riddle.answer.en;
  const explanationText = riddle.explanation
    ? isTamil
      ? riddle.explanation.ta
      : riddle.explanation.en
    : null;

  const actionLabel = isCorrect || isExhausted
    ? isLastRiddle
      ? t.viewResults
      : t.nextRiddle
    : t.tryAgain;

  const handleAction = isCorrect || isExhausted ? onNext : onRetry;

  const attemptsLeft = Math.max(0, maxAttempts - attemptsUsed);

  return (
    <View
      style={[
        styles.container,
        isCorrect ? styles.containerCorrect : styles.containerIncorrect,
      ]}
    >
      {/* Header Row */}
      <View style={styles.headerRow}>
        <View style={styles.titleGroup}>
          <Text
            style={[
              styles.feedbackTitle,
              isCorrect ? styles.titleCorrect : styles.titleIncorrect,
            ]}
          >
            {isCorrect ? `✓ ${t.correctTitle}` : `✕ ${t.incorrectTitle}`}
          </Text>
          <Text style={styles.subtitle}>
            {isCorrect
              ? t.correctSubtitle
              : isExhausted
              ? t.exhaustedSubtitle
              : t.incorrectSubtitle}
          </Text>
        </View>

        {/* Points Badge (when correct) */}
        {isCorrect && pointsAwarded > 0 && (
          <View style={styles.pointsBadge}>
            <Text style={styles.pointsBadgeText}>
              {t.pointsEarned.replace('{points}', String(pointsAwarded))}
            </Text>
          </View>
        )}
      </View>

      {/* Attempts remaining (when first wrong attempt) */}
      {!isCorrect && !isExhausted && (
        <Text style={styles.attemptsText}>
          {t.attemptsRemaining.replace('{count}', String(attemptsLeft))}
        </Text>
      )}

      {/* Revealed Solution (when exhausted) */}
      {!isCorrect && isExhausted && (
        <View style={styles.solutionBox}>
          <Text style={styles.solutionLabel}>{t.correctAnswerLabel}</Text>
          <Text style={styles.solutionValue}>{correctAnswerText}</Text>
        </View>
      )}

      {/* Educational Explanation */}
      {(isCorrect || isExhausted) && explanationText && (
        <View style={styles.explanationBox}>
          <Text style={styles.explanationLabel}>{t.whyExplanation}</Text>
          <Text style={styles.explanationText}>{explanationText}</Text>
        </View>
      )}

      {/* Primary Action Button */}
      <TouchableOpacity
        style={styles.actionButton}
        onPress={handleAction}
        activeOpacity={0.8}
        accessible={true}
        accessibilityRole="button"
        accessibilityLabel={actionLabel}
      >
        <Text style={styles.actionButtonText}>{actionLabel}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1.5,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.md,
  },
  containerCorrect: {
    backgroundColor: theme.colors.green50,
    borderColor: theme.colors.green100,
  },
  containerIncorrect: {
    backgroundColor: theme.colors.error50,
    borderColor: theme.colors.error100,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: theme.spacing.sm,
  },
  titleGroup: {
    flex: 1,
    marginRight: theme.spacing.sm,
  },
  feedbackTitle: {
    ...theme.typography.h3,
    fontSize: 17,
    fontWeight: '800',
    marginBottom: 2,
  },
  titleCorrect: {
    color: theme.colors.green600,
  },
  titleIncorrect: {
    color: theme.colors.error600,
  },
  subtitle: {
    ...theme.typography.caption,
    fontSize: 13,
    color: theme.colors.slate600,
    lineHeight: 18,
  },
  pointsBadge: {
    backgroundColor: theme.colors.green100,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: theme.borderRadius.sm,
  },
  pointsBadgeText: {
    ...theme.typography.caption,
    fontSize: 12,
    fontWeight: '800',
    color: theme.colors.green600,
  },
  attemptsText: {
    ...theme.typography.caption,
    fontSize: 12.5,
    fontWeight: '700',
    color: theme.colors.error600,
    marginBottom: theme.spacing.md,
  },
  solutionBox: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderColor: theme.colors.error100,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
  },
  solutionLabel: {
    ...theme.typography.caption,
    fontSize: 11,
    fontWeight: '800',
    color: theme.colors.error600,
    textTransform: 'uppercase',
    marginBottom: 2,
  },
  solutionValue: {
    ...theme.typography.h3,
    fontSize: 15,
    fontWeight: '700',
    color: theme.colors.navy900,
  },
  explanationBox: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
  },
  explanationLabel: {
    ...theme.typography.caption,
    fontSize: 11,
    fontWeight: '800',
    color: theme.colors.brandPrimary,
    textTransform: 'uppercase',
    marginBottom: 2,
  },
  explanationText: {
    ...theme.typography.caption,
    fontSize: 13,
    color: theme.colors.slate600,
    lineHeight: 18,
  },
  actionButton: {
    width: '100%',
    height: 48,
    backgroundColor: theme.colors.actionPrimary,
    borderRadius: theme.borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: theme.colors.brandPrimary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 3,
  },
  actionButtonText: {
    ...theme.typography.button,
    color: theme.colors.textOnAction,
    fontSize: 14.5,
    fontWeight: '800',
  },
});
