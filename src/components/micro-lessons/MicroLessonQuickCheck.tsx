/**
 * MicroLessonQuickCheck Component
 * Single question lightweight knowledge reinforcement check at the end of every lesson.
 * Instant feedback with concise explanation, debounced interaction, and accessibility announcements.
 */

import React, { useState, useCallback, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { theme } from '../../theme';
import { QuickCheckQuestion, QuickCheckOption } from '../../features/micro-lessons/microLessons.types';
import { SupportedLanguage } from '../../config/i18n';

export interface MicroLessonQuickCheckProps {
  question: QuickCheckQuestion;
  onComplete: (isCorrect: boolean) => void;
  language?: SupportedLanguage;
}

export const MicroLessonQuickCheck: React.FC<MicroLessonQuickCheckProps> = ({
  question,
  onComplete,
  language = 'en',
}) => {
  const isTamil = language === 'ta';
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const hasTriggeredComplete = useRef(false);

  const questionText = isTamil ? question.question.ta : question.question.en;

  const handleSelectOption = useCallback(
    (option: QuickCheckOption) => {
      // Ignore subsequent taps once answered
      if (hasSubmitted || hasTriggeredComplete.current) return;

      setSelectedOptionId(option.id);
      setHasSubmitted(true);
      hasTriggeredComplete.current = true;

      onComplete(option.isCorrect);
    },
    [hasSubmitted, onComplete]
  );

  const selectedOption = question.options.find((o) => o.id === selectedOptionId);
  const isCorrect = selectedOption?.isCorrect ?? false;

  const OPTION_LETTERS = ['A', 'B', 'C', 'D'];

  return (
    <View
      style={styles.container}
      accessible={true}
      accessibilityRole="none"
      accessibilityLabel={isTamil ? 'விரைவு சோதனை வினா' : 'Quick check question'}
    >
      {/* Header */}
      <View style={styles.headerRow}>
        <Text style={styles.headerIcon}>🎯</Text>
        <Text style={styles.headerTitle}>
          {isTamil ? 'விரைவு சோதனை' : 'QUICK CHECK'}
        </Text>
      </View>

      {/* Question */}
      <Text style={styles.questionText}>{questionText}</Text>

      {/* Options */}
      <View style={styles.optionsList}>
        {question.options.map((option, idx) => {
          const isSelected = selectedOptionId === option.id;
          const showAsCorrect = hasSubmitted && option.isCorrect;
          const showAsIncorrect = hasSubmitted && isSelected && !option.isCorrect;

          const optionText = isTamil ? option.text.ta : option.text.en;
          const letter = OPTION_LETTERS[idx] || `${idx + 1}`;

          return (
            <TouchableOpacity
              key={option.id}
              style={[
                styles.optionRow,
                isSelected && styles.optionRowSelected,
                showAsCorrect && styles.optionRowCorrect,
                showAsIncorrect && styles.optionRowIncorrect,
              ]}
              onPress={() => handleSelectOption(option)}
              disabled={hasSubmitted}
              activeOpacity={0.8}
              accessible={true}
              accessibilityRole="button"
              accessibilityLabel={`${letter}. ${optionText}. ${showAsCorrect ? (isTamil ? 'சரியான விடை' : 'Correct answer') : ''}`}
            >
              <View
                style={[
                  styles.letterBadge,
                  isSelected && styles.letterBadgeSelected,
                  showAsCorrect && styles.letterBadgeCorrect,
                  showAsIncorrect && styles.letterBadgeIncorrect,
                ]}
              >
                <Text
                  style={[
                    styles.letterText,
                    (isSelected || showAsCorrect || showAsIncorrect) && styles.letterTextWhite,
                  ]}
                >
                  {letter}
                </Text>
              </View>

              <Text style={[styles.optionText, isSelected && styles.optionTextSelected]}>
                {optionText}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Feedback Banner */}
      {hasSubmitted && (
        <View
          style={[styles.feedbackCard, isCorrect ? styles.feedbackCorrect : styles.feedbackIncorrect]}
          accessible={true}
          accessibilityRole="alert"
        >
          <View style={styles.feedbackHeader}>
            <Text style={styles.feedbackEmoji}>{isCorrect ? '✓' : 'ℹ️'}</Text>
            <Text style={[styles.feedbackTitle, isCorrect ? styles.feedbackTitleCorrect : styles.feedbackTitleIncorrect]}>
              {isCorrect
                ? (isTamil ? 'அருமை! சரியாகப் புரிந்து கொண்டீர்கள்.' : 'Nice! You understood it.')
                : (isTamil ? 'கருத்தை மீண்டும் ஒருமுறை பார்ப்போம்.' : "Let's review the idea.")}
            </Text>
          </View>

          {selectedOption && (
            <Text style={styles.explanationText}>
              {isTamil ? selectedOption.explanation.ta : selectedOption.explanation.en}
            </Text>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    padding: theme.spacing.md,
    marginVertical: theme.spacing.md,
    shadowColor: theme.colors.navy900,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: theme.spacing.sm,
  },
  headerIcon: {
    fontSize: 16,
  },
  headerTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: theme.colors.actionPrimary,
    letterSpacing: 1,
  },
  questionText: {
    fontSize: 15,
    fontWeight: '700',
    color: theme.colors.navy900,
    lineHeight: 22,
    marginBottom: theme.spacing.md,
  },
  optionsList: {
    gap: 10,
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: 10,
    minHeight: 48,
  },
  optionRowSelected: {
    borderColor: theme.colors.actionPrimary,
    backgroundColor: '#EFF6FF',
  },
  optionRowCorrect: {
    borderColor: '#16A34A',
    backgroundColor: '#F0FDF4',
  },
  optionRowIncorrect: {
    borderColor: '#DC2626',
    backgroundColor: '#FEF2F2',
  },
  letterBadge: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  letterBadgeSelected: {
    backgroundColor: theme.colors.actionPrimary,
  },
  letterBadgeCorrect: {
    backgroundColor: '#16A34A',
  },
  letterBadgeIncorrect: {
    backgroundColor: '#DC2626',
  },
  letterText: {
    fontSize: 12,
    fontWeight: '800',
    color: theme.colors.navy800,
  },
  letterTextWhite: {
    color: '#FFFFFF',
  },
  optionText: {
    fontSize: 13,
    color: theme.colors.navy800,
    lineHeight: 18,
    flex: 1,
    fontWeight: '500',
  },
  optionTextSelected: {
    fontWeight: '700',
    color: theme.colors.navy900,
  },
  feedbackCard: {
    marginTop: theme.spacing.md,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
  },
  feedbackCorrect: {
    backgroundColor: '#F0FDF4',
    borderColor: '#BBF7D0',
  },
  feedbackIncorrect: {
    backgroundColor: '#FFFBEB',
    borderColor: '#FDE68A',
  },
  feedbackHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
  },
  feedbackEmoji: {
    fontSize: 16,
    fontWeight: '800',
  },
  feedbackTitle: {
    fontSize: 13,
    fontWeight: '700',
  },
  feedbackTitleCorrect: {
    color: '#15803D',
  },
  feedbackTitleIncorrect: {
    color: '#B45309',
  },
  explanationText: {
    fontSize: 12,
    color: theme.colors.slate600,
    lineHeight: 18,
    marginTop: 2,
  },
});
