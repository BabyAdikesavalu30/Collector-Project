/**
 * ReviewQuestionCard Component
 * Displays question text, student's answer with visual feedback, correct answer, and explanation.
 */

import React from 'react';
import { View, Text, StyleSheet, StyleProp, ViewStyle, TextStyle } from 'react-native';
import { theme } from '../../theme';
import { SupportedLanguage } from '../../config/i18n';
import { ReviewedQuestion } from '../../features/quiz';

interface ReviewQuestionCardProps {
  question: ReviewedQuestion;
  showExplanation: boolean;
  language: SupportedLanguage;
  t: {
    questionPrefix: string;
    yourAnswer: string;
    correctAnswer: string;
    statusCorrect: string;
    statusIncorrect: string;
    statusUnanswered: string;
    explanation: string;
  };
}

export const ReviewQuestionCard: React.FC<ReviewQuestionCardProps> = ({
  question,
  showExplanation,
  language,
  t,
}) => {
  const isTamil = language === 'ta';
  const questionText = isTamil ? question.question.ta : question.question.en;
  const correctOptionText = isTamil
    ? question.correctOptionText.ta
    : question.correctOptionText.en;
  const selectedOptionText = question.selectedOptionText
    ? isTamil
      ? question.selectedOptionText.ta
      : question.selectedOptionText.en
    : null;

  const explanationText = question.explanation
    ? isTamil
      ? question.explanation.ta
      : question.explanation.en
    : null;

  // Status styling
  let statusBadgeStyle: StyleProp<ViewStyle> = styles.statusCorrectBadge;
  let statusTextStyle: StyleProp<TextStyle> = styles.statusCorrectText;
  let statusLabel = t.statusCorrect;

  if (question.isUnanswered) {
    statusBadgeStyle = styles.statusUnansweredBadge;
    statusTextStyle = styles.statusUnansweredText;
    statusLabel = t.statusUnanswered;
  } else if (!question.isCorrect) {
    statusBadgeStyle = styles.statusIncorrectBadge;
    statusTextStyle = styles.statusIncorrectText;
    statusLabel = t.statusIncorrect;
  }

  return (
    <View style={styles.card}>
      {/* Header: Question Number & Status Badge */}
      <View style={styles.cardHeader}>
        <View style={styles.numberBadge}>
          <Text style={styles.numberText}>
            {t.questionPrefix}
            {question.questionNumber}
          </Text>
        </View>

        <View style={[styles.statusBadge, statusBadgeStyle]}>
          <Text style={[styles.statusText, statusTextStyle]}>{statusLabel}</Text>
        </View>
      </View>

      {/* Question Text */}
      <Text style={styles.questionText}>{questionText}</Text>

      {/* Student's Answer */}
      <View
        style={[
          styles.answerRow,
          question.isCorrect
            ? styles.answerRowCorrect
            : question.isUnanswered
            ? styles.answerRowUnanswered
            : styles.answerRowIncorrect,
        ]}
      >
        <Text style={styles.answerLabel}>{t.yourAnswer}:</Text>
        <Text
          style={[
            styles.answerValue,
            question.isCorrect
              ? styles.answerValueCorrect
              : question.isUnanswered
              ? styles.answerValueUnanswered
              : styles.answerValueIncorrect,
          ]}
        >
          {question.isUnanswered
            ? t.statusUnanswered
            : `${selectedOptionText} ${question.isCorrect ? '✓' : '✕'}`}
        </Text>
      </View>

      {/* Correct Answer (Shown if student was incorrect or unanswered) */}
      {!question.isCorrect && (
        <View style={[styles.answerRow, styles.correctAnswerRow]}>
          <Text style={styles.answerLabel}>{t.correctAnswer}:</Text>
          <Text style={[styles.answerValue, styles.answerValueCorrect]}>
            {correctOptionText} ✓
          </Text>
        </View>
      )}

      {/* Optional Explanation (if enabled in settings) */}
      {showExplanation && Boolean(explanationText) && (
        <View style={styles.explanationBox}>
          <Text style={styles.explanationTitle}>💡 {t.explanation}</Text>
          <Text style={styles.explanationContent}>{explanationText}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
    shadowColor: theme.colors.navy900,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 1,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  numberBadge: {
    backgroundColor: theme.colors.blue50,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: theme.borderRadius.sm,
  },
  numberText: {
    ...theme.typography.caption,
    fontSize: 12,
    fontWeight: '800',
    color: theme.colors.brandPrimary,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: theme.borderRadius.sm,
  },
  statusCorrectBadge: {
    backgroundColor: theme.colors.green50,
  },
  statusCorrectText: {
    color: theme.colors.green600,
  },
  statusIncorrectBadge: {
    backgroundColor: theme.colors.error50,
  },
  statusIncorrectText: {
    color: theme.colors.error600,
  },
  statusUnansweredBadge: {
    backgroundColor: theme.colors.gray100,
  },
  statusUnansweredText: {
    color: theme.colors.slate600,
  },
  statusText: {
    ...theme.typography.caption,
    fontSize: 11,
    fontWeight: '700',
  },
  questionText: {
    ...theme.typography.body,
    fontSize: 15,
    fontWeight: '700',
    color: theme.colors.navy900,
    lineHeight: 22,
    marginBottom: theme.spacing.sm,
  },
  answerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing.sm,
    borderRadius: theme.borderRadius.md,
    marginBottom: theme.spacing.xs,
  },
  answerRowCorrect: {
    backgroundColor: theme.colors.green50,
    borderWidth: 1,
    borderColor: theme.colors.green100,
  },
  answerRowIncorrect: {
    backgroundColor: theme.colors.error50,
    borderWidth: 1,
    borderColor: theme.colors.error100,
  },
  answerRowUnanswered: {
    backgroundColor: theme.colors.gray50,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  correctAnswerRow: {
    backgroundColor: theme.colors.green50,
    borderWidth: 1,
    borderColor: theme.colors.green100,
  },
  answerLabel: {
    ...theme.typography.caption,
    fontSize: 12,
    fontWeight: '600',
    color: theme.colors.slate600,
    marginRight: 6,
  },
  answerValue: {
    ...theme.typography.body,
    fontSize: 13.5,
    fontWeight: '700',
    flex: 1,
  },
  answerValueCorrect: {
    color: theme.colors.green600,
  },
  answerValueIncorrect: {
    color: theme.colors.error600,
  },
  answerValueUnanswered: {
    color: theme.colors.slate600,
  },
  explanationBox: {
    backgroundColor: theme.colors.blue50,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderColor: theme.colors.blue100,
    padding: theme.spacing.sm,
    marginTop: theme.spacing.xs,
  },
  explanationTitle: {
    ...theme.typography.caption,
    fontSize: 11,
    fontWeight: '800',
    color: theme.colors.brandPrimary,
    marginBottom: 2,
    textTransform: 'uppercase',
  },
  explanationContent: {
    ...theme.typography.caption,
    fontSize: 12.5,
    color: theme.colors.slate600,
    lineHeight: 18,
  },
});
