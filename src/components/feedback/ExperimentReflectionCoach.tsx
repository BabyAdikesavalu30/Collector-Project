/**
 * ExperimentReflectionCoach Component
 * Additive educational feedback wrapper for the Experiment Lab reflection.
 * BEFORE answering: progressive authored hints keyed by the experiment id.
 * AFTER a wrong answer: IncorrectAnswerCoach (Observation → Why → Remember)
 * with a guided retry handled by the parent reflection flow.
 * The Experiment Lab keeps full ownership of completion, XP, and the
 * simulation — this wrapper only enriches feedback.
 */

import React, { useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { theme } from '../../theme';
import { SupportedLanguage } from '../../config/i18n';
import { ExperimentReflectionQuestion } from '../../features/experiment-lab/experiment.types';
import {
  useHintEngine,
  useAnswerCoach,
  useFeedbackReference,
} from '../../features/feedback/feedback.hooks';
import { getFeedbackI18n } from './feedback.i18n';
import { HintPanel } from './HintPanel';
import { FeedbackPanel } from './AnswerFeedbackCard';

interface ExperimentReflectionCoachProps {
  experimentId: string;
  question: ExperimentReflectionQuestion;
  selectedOptionId: string | null;
  feedback: { isCorrect: boolean; show: boolean };
  language?: SupportedLanguage;
  onSelectOption: (optionId: string) => void;
  disabled?: boolean;
}

export const ExperimentReflectionCoach: React.FC<ExperimentReflectionCoachProps> = ({
  experimentId,
  question,
  selectedOptionId,
  feedback,
  language = 'en',
  onSelectOption,
  disabled = false,
}) => {
  const isTamil = language === 'ta';
  const t = getFeedbackI18n(language);

  const feedbackId = useFeedbackReference(experimentId, 'experiment');

  const hintEngine = useHintEngine({
    questionKey: experimentId,
    language,
    resetKey: experimentId,
  });

  const selectedOption = question.options.find((o) => o.id === selectedOptionId) || null;
  const hasAnswered = feedback.show;
  const isCorrect = feedback.isCorrect;

  const coachState = useAnswerCoach({
    feedbackId,
    questionKey: experimentId,
    activityType: 'experiment',
    isCorrect,
    studentAnswer: selectedOption
      ? isTamil
        ? selectedOption.text.ta
        : selectedOption.text.en
      : null,
    correctAnswer: question.options.find((o) => o.id === question.correctOptionId)
      ? isTamil
        ? question.options.find((o) => o.id === question.correctOptionId)!.text.ta
        : question.options.find((o) => o.id === question.correctOptionId)!.text.en
      : null,
    attemptNumber: hasAnswered ? 1 : 0,
    language,
    enabled: hasAnswered,
    resetKey: experimentId,
  });

  const attemptsUsed = useMemo(() => (hasAnswered ? 1 : 0), [hasAnswered]);

  return (
    <View style={styles.card}>
      {/* Header */}
      <View style={styles.headerRow}>
        <Text style={styles.headerIcon}>🤔</Text>
        <Text style={styles.headerTitle}>
          {isTamil ? 'சிந்தனை வினா: இது ஏன் நிகழ்ந்தது?' : 'Reflection: Why Did This Happen?'}
        </Text>
      </View>

      {/* Question */}
      <Text style={styles.questionText}>
        {isTamil ? question.question.ta : question.question.en}
      </Text>

      {/* Progressive hints before answering */}
      {!hasAnswered && hintEngine.availableHints.length > 0 && (
        <HintPanel
          hints={hintEngine.revealedHints}
          language={language}
          onRevealNext={hintEngine.revealNextHint}
          maxHints={3}
        />
      )}

      {/* Options */}
      <View style={styles.optionsList}>
        {question.options.map((opt) => {
          const isSelected = selectedOptionId === opt.id;
          const isCorrectOption = opt.id === question.correctOptionId;
          const optText = isTamil ? opt.text.ta : opt.text.en;

          return (
            <TouchableOpacity
              key={opt.id}
              style={[
                styles.optionItem,
                isSelected && styles.optionSelected,
                hasAnswered &&
                  isSelected &&
                  (isCorrectOption ? styles.optionCorrect : styles.optionIncorrect),
              ]}
              onPress={() => !disabled && onSelectOption(opt.id)}
              disabled={disabled}
              activeOpacity={0.8}
              accessibilityRole="button"
              accessibilityState={{ selected: isSelected }}
              accessibilityLabel={optText}
            >
              <Text
                style={[
                  styles.optionText,
                  isSelected && styles.optionTextSelected,
                  hasAnswered &&
                    isSelected &&
                    (isCorrectOption ? styles.optionTextCorrect : styles.optionTextIncorrect),
                ]}
              >
                {optText}
              </Text>
              {hasAnswered && isSelected && (
                <Text style={isCorrectOption ? styles.iconCorrect : styles.iconIncorrectCalm}>
                  {isCorrectOption ? '✓' : '✕'}
                </Text>
              )}
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Coached feedback */}
      {hasAnswered && coachState.coach && (
        <FeedbackPanel
          coach={coachState.coach}
          language={language}
          xpEarned={undefined}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.base,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  headerIcon: {
    fontSize: 20,
  },
  headerTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: theme.colors.navy900,
    flex: 1,
  },
  questionText: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.navy800,
    lineHeight: 20,
    marginBottom: 12,
  },
  optionsList: {
    gap: 8,
    marginTop: 4,
  },
  optionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    backgroundColor: theme.colors.gray50,
    borderWidth: 1,
    borderColor: theme.colors.gray300,
    minHeight: 44,
  },
  optionSelected: {
    backgroundColor: theme.colors.blue50,
    borderColor: theme.colors.blue600,
  },
  optionCorrect: {
    backgroundColor: theme.colors.green50,
    borderColor: theme.colors.green500,
  },
  optionIncorrect: {
    backgroundColor: theme.colors.purple50,
    borderColor: theme.colors.purple400,
  },
  optionText: {
    flex: 1,
    fontSize: 13,
    color: theme.colors.navy900,
    fontWeight: '500',
    lineHeight: 18,
  },
  optionTextSelected: {
    color: theme.colors.blue600,
    fontWeight: '700',
  },
  optionTextCorrect: {
    color: theme.colors.green800,
    fontWeight: '700',
  },
  optionTextIncorrect: {
    color: theme.colors.purple700,
    fontWeight: '700',
  },
  iconCorrect: {
    fontSize: 16,
    fontWeight: '800',
    color: theme.colors.green600,
    marginLeft: 8,
  },
  iconIncorrectCalm: {
    fontSize: 14,
    fontWeight: '700',
    color: theme.colors.purple600,
    marginLeft: 8,
  },
});
