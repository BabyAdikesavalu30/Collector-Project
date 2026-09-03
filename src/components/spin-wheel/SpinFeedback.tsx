/**
 * SpinFeedback Component
 * Correct/incorrect feedback banner with correct answer revelation, explanation, and Done action.
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { theme } from '../../theme';
import { SupportedLanguage } from '../../config/i18n';
import { SpinWheelQuestion } from '../../features/spin-wheel';

interface SpinFeedbackProps {
  isCorrect: boolean;
  question: SpinWheelQuestion;
  pointsEarned: number;
  language: SupportedLanguage;
  onDone: () => void;
  t: {
    correctTitle: string;
    correctSubtitle: string;
    incorrectTitle: string;
    incorrectSubtitle: string;
    correctAnswerLabel: string;
    done: string;
  };
}

export const SpinFeedback: React.FC<SpinFeedbackProps> = ({
  isCorrect,
  question,
  pointsEarned,
  language,
  onDone,
  t,
}) => {
  const isTamil = language === 'ta';

  const correctOption = question.options.find(
    (opt) => opt.id === question.correctOptionId
  );
  const correctOptionText = correctOption
    ? isTamil
      ? correctOption.text.ta
      : correctOption.text.en
    : '';

  const explanationText = isTamil
    ? question.explanation.ta
    : question.explanation.en;

  return (
    <View
      style={[
        styles.card,
        isCorrect ? styles.cardCorrect : styles.cardIncorrect,
      ]}
    >
      {/* Icon Badge */}
      <View
        style={[
          styles.iconCircle,
          isCorrect ? styles.iconCircleCorrect : styles.iconCircleIncorrect,
        ]}
      >
        <Text style={styles.iconText}>{isCorrect ? '✓' : '✗'}</Text>
      </View>

      {/* Feedback Title */}
      <Text
        style={[
          styles.title,
          isCorrect ? styles.titleCorrect : styles.titleIncorrect,
        ]}
      >
        {isCorrect ? t.correctTitle : t.incorrectTitle}
      </Text>

      {/* Subtitle */}
      <Text style={styles.subtitle}>
        {isCorrect ? t.correctSubtitle : t.incorrectSubtitle}
      </Text>

      {/* Points Reward Badge (If correct) */}
      {isCorrect && (
        <View style={styles.pointsBadge}>
          <Text style={styles.pointsText}>+{pointsEarned} points</Text>
        </View>
      )}

      {/* Correct Answer Revelation (If incorrect) */}
      {!isCorrect && (
        <View style={styles.answerBox}>
          <Text style={styles.answerLabel}>{t.correctAnswerLabel}</Text>
          <Text style={styles.answerValue}>{correctOptionText}</Text>
        </View>
      )}

      {/* Educational Explanation */}
      {Boolean(explanationText) && (
        <Text style={styles.explanationText}>{explanationText}</Text>
      )}

      {/* Done Button */}
      <TouchableOpacity
        style={styles.doneButton}
        onPress={onDone}
        activeOpacity={0.8}
        accessible={true}
        accessibilityRole="button"
        accessibilityLabel={t.done}
      >
        <Text style={styles.doneButtonText}>{t.done}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '100%',
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1.5,
    padding: theme.spacing.lg,
    marginTop: theme.spacing.md,
    alignItems: 'center',
    shadowColor: theme.colors.navy900,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  cardCorrect: {
    backgroundColor: '#F0FDF4', // Light Green
    borderColor: theme.colors.green200,
  },
  cardIncorrect: {
    backgroundColor: '#FEF2F2', // Light Red
    borderColor: '#FECACA',
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.xs,
  },
  iconCircleCorrect: {
    backgroundColor: theme.colors.green600,
  },
  iconCircleIncorrect: {
    backgroundColor: theme.colors.error,
  },
  iconText: {
    fontSize: 24,
    fontWeight: '900',
    color: theme.colors.white,
  },
  title: {
    ...theme.typography.h2,
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 2,
  },
  titleCorrect: {
    color: theme.colors.green700,
  },
  titleIncorrect: {
    color: theme.colors.error,
  },
  subtitle: {
    ...theme.typography.body,
    fontSize: 14,
    color: theme.colors.slate600,
    textAlign: 'center',
    marginBottom: theme.spacing.sm,
  },
  pointsBadge: {
    backgroundColor: theme.colors.white,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: theme.borderRadius.full,
    borderWidth: 1,
    borderColor: theme.colors.green200,
    marginBottom: theme.spacing.md,
  },
  pointsText: {
    ...theme.typography.caption,
    fontSize: 13,
    fontWeight: '800',
    color: theme.colors.green600,
  },
  answerBox: {
    width: '100%',
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderColor: '#FECACA',
    padding: theme.spacing.sm,
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  answerLabel: {
    ...theme.typography.caption,
    fontSize: 11,
    fontWeight: '700',
    color: theme.colors.slate500,
    textTransform: 'uppercase',
    marginBottom: 2,
  },
  answerValue: {
    ...theme.typography.h3,
    fontSize: 15,
    fontWeight: '800',
    color: theme.colors.navy900,
  },
  explanationText: {
    ...theme.typography.caption,
    fontSize: 12.5,
    color: theme.colors.slate600,
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: theme.spacing.md,
  },
  doneButton: {
    width: '100%',
    height: 48,
    backgroundColor: theme.colors.actionPrimary,
    borderRadius: theme.borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  doneButtonText: {
    ...theme.typography.button,
    color: theme.colors.textOnAction,
    fontSize: 14,
    fontWeight: '800',
  },
});
