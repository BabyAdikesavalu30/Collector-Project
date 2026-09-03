/**
 * SpinQuestionCard Component
 * Challenge prompt and multiple-choice options with submit action.
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { theme } from '../../theme';
import { SupportedLanguage } from '../../config/i18n';
import { SpinWheelQuestion } from '../../features/spin-wheel';
import { SpinOption } from './SpinOption';

interface SpinQuestionCardProps {
  question: SpinWheelQuestion;
  language: SupportedLanguage;
  selectedOptionId?: string;
  onSelectOption: (id: string) => void;
  onSubmit: () => void;
  submitLabel: string;
}

export const SpinQuestionCard: React.FC<SpinQuestionCardProps> = ({
  question,
  language,
  selectedOptionId,
  onSelectOption,
  onSubmit,
  submitLabel,
}) => {
  const isTamil = language === 'ta';
  const badgeText = isTamil ? question.badge.ta : question.badge.en;
  const questionText = isTamil ? question.question.ta : question.question.en;

  return (
    <View style={styles.card}>
      {/* Category Badge */}
      <View style={styles.badgeContainer}>
        <Text style={styles.badgeText}>{badgeText}</Text>
        <Text style={styles.pointsTag}>+{question.points} pts</Text>
      </View>

      {/* Question Prompt */}
      <Text style={styles.questionText}>{questionText}</Text>

      {/* Options List */}
      <View style={styles.optionsList}>
        {question.options.map((opt, index) => {
          const optionText = isTamil ? opt.text.ta : opt.text.en;
          const isSelected = selectedOptionId === opt.id;
          return (
            <SpinOption
              key={opt.id}
              index={index}
              text={optionText}
              isSelected={isSelected}
              onSelect={() => onSelectOption(opt.id)}
            />
          );
        })}
      </View>

      {/* Check Answer CTA */}
      <TouchableOpacity
        style={[
          styles.submitButton,
          !selectedOptionId && styles.submitButtonDisabled,
        ]}
        onPress={onSubmit}
        disabled={!selectedOptionId}
        activeOpacity={0.8}
        accessible={true}
        accessibilityRole="button"
        accessibilityLabel={submitLabel}
      >
        <Text style={styles.submitButtonText}>{submitLabel}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '100%',
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: theme.spacing.lg,
    marginTop: theme.spacing.md,
    shadowColor: theme.colors.navy900,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  badgeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  badgeText: {
    ...theme.typography.caption,
    fontSize: 12,
    fontWeight: '800',
    color: theme.colors.actionPrimary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  pointsTag: {
    ...theme.typography.caption,
    fontSize: 11.5,
    fontWeight: '800',
    color: theme.colors.green600,
    backgroundColor: theme.colors.green50,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: theme.borderRadius.full,
  },
  questionText: {
    ...theme.typography.h2,
    fontSize: 16,
    fontWeight: '800',
    color: theme.colors.navy900,
    lineHeight: 23,
    marginBottom: theme.spacing.md,
  },
  optionsList: {
    width: '100%',
    marginBottom: theme.spacing.xs,
  },
  submitButton: {
    width: '100%',
    height: 48,
    backgroundColor: theme.colors.actionPrimary,
    borderRadius: theme.borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: theme.spacing.xs,
  },
  submitButtonDisabled: {
    backgroundColor: theme.colors.slate400,
  },
  submitButtonText: {
    ...theme.typography.button,
    color: theme.colors.textOnAction,
    fontSize: 14,
    fontWeight: '800',
  },
});
