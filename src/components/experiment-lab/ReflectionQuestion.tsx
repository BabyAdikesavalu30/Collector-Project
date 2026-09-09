/**
 * ReflectionQuestion Component
 * Interactive single reflection question testing "Why did this happen?".
 * Provides immediate constructive feedback and unlocks experiment completion.
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { colors } from '../../theme/colors';
import { ExperimentReflectionQuestion } from '../../features/experiment-lab/experiment.types';
import { SupportedLanguage } from '../../config/i18n';

interface ReflectionQuestionProps {
  question: ExperimentReflectionQuestion;
  selectedOptionId: string | null;
  feedback: { isCorrect: boolean; show: boolean };
  language?: SupportedLanguage;
  onSelectOption: (optionId: string) => void;
  disabled?: boolean;
}

export const ReflectionQuestion: React.FC<ReflectionQuestionProps> = ({
  question,
  selectedOptionId,
  feedback,
  language = 'en',
  onSelectOption,
  disabled = false,
}) => {
  const isTamil = language === 'ta';
  const qText = isTamil ? question.question.ta : question.question.en;
  const explanation = isTamil ? question.explanation.ta : question.explanation.en;

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
      <Text style={styles.questionText}>{qText}</Text>

      {/* Options List */}
      <View style={styles.optionsList}>
        {question.options.map((opt) => {
          const isSelected = selectedOptionId === opt.id;
          const isCorrect = opt.id === question.correctOptionId;
          const optText = isTamil ? opt.text.ta : opt.text.en;

          return (
            <TouchableOpacity
              key={opt.id}
              style={[
                styles.optionItem,
                isSelected && styles.optionSelected,
                feedback.show &&
                  isSelected &&
                  (isCorrect ? styles.optionCorrect : styles.optionIncorrect),
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
                  feedback.show &&
                    isSelected &&
                    (isCorrect ? styles.optionTextCorrect : styles.optionTextIncorrect),
                ]}
              >
                {optText}
              </Text>
              {feedback.show && isSelected && (
                <Text style={isCorrect ? styles.iconCorrect : styles.iconIncorrect}>
                  {isCorrect ? '✓' : '✕'}
                </Text>
              )}
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Feedback & Explanation */}
      {feedback.show && (
        <View
          style={[
            styles.feedbackBox,
            feedback.isCorrect ? styles.feedbackBoxCorrect : styles.feedbackBoxIncorrect,
          ]}
        >
          <Text
            style={[
              styles.feedbackTitle,
              feedback.isCorrect ? styles.feedbackTitleCorrect : styles.feedbackTitleIncorrect,
            ]}
          >
            {feedback.isCorrect
              ? isTamil
                ? '🎉 மிகச் சரி!'
                : '🎉 Correct Insight!'
              : isTamil
              ? '💡 நல்ல முயற்சி! சரியான விளக்கம்:'
              : '💡 Good try! Here is why:'}
          </Text>
          <Text style={styles.feedbackExplanation}>{explanation}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 16,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    ...Platform.select({
      ios: {
        shadowColor: '#0F172A',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 6,
      },
      android: {
        elevation: 2,
      },
    }),
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
    color: colors.navy900,
  },
  questionText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.navy800,
    lineHeight: 20,
    marginBottom: 12,
  },
  optionsList: {
    gap: 8,
  },
  optionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    minHeight: 44,
  },
  optionSelected: {
    backgroundColor: '#EFF6FF',
    borderColor: colors.blue600,
  },
  optionCorrect: {
    backgroundColor: '#F0FDF4',
    borderColor: '#22C55E',
  },
  optionIncorrect: {
    backgroundColor: '#FEF2F2',
    borderColor: '#EF4444',
  },
  optionText: {
    flex: 1,
    fontSize: 13,
    color: colors.navy900,
    fontWeight: '500',
    lineHeight: 18,
  },
  optionTextSelected: {
    color: colors.blue600,
    fontWeight: '700',
  },
  optionTextCorrect: {
    color: colors.green800,
    fontWeight: '700',
  },
  optionTextIncorrect: {
    color: '#991B1B',
    fontWeight: '700',
  },
  iconCorrect: {
    fontSize: 16,
    fontWeight: '800',
    color: '#16A34A',
    marginLeft: 8,
  },
  iconIncorrect: {
    fontSize: 16,
    fontWeight: '800',
    color: '#DC2626',
    marginLeft: 8,
  },
  feedbackBox: {
    marginTop: 12,
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
  },
  feedbackBoxCorrect: {
    backgroundColor: '#F0FDF4',
    borderColor: '#BBF7D0',
  },
  feedbackBoxIncorrect: {
    backgroundColor: '#FEF2F2',
    borderColor: '#FECACA',
  },
  feedbackTitle: {
    fontSize: 13,
    fontWeight: '800',
    marginBottom: 4,
  },
  feedbackTitleCorrect: {
    color: '#166534',
  },
  feedbackTitleIncorrect: {
    color: '#991B1B',
  },
  feedbackExplanation: {
    fontSize: 12,
    color: colors.navy800,
    lineHeight: 18,
  },
});
