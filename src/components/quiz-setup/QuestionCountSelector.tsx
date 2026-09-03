/**
 * QuestionCountSelector Component
 * Selectable count chips for quiz questions (5, 10, 15, 20, 30).
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { theme } from '../../theme';
import { QuizQuestionCount, QUIZ_QUESTION_COUNTS } from '../../features/quiz';
import { SupportedLanguage, getTranslation } from '../../config/i18n';

interface QuestionCountSelectorProps {
  selectedCount: QuizQuestionCount;
  onSelectCount: (count: QuizQuestionCount) => void;
  language?: SupportedLanguage;
}

export const QuestionCountSelector: React.FC<QuestionCountSelectorProps> = ({
  selectedCount,
  onSelectCount,
  language = 'en',
}) => {
  const t = getTranslation(language).quizSetup;

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>{t.questionsSection}</Text>

      <View style={styles.chipsContainer}>
        {QUIZ_QUESTION_COUNTS.map((count) => {
          const isSelected = selectedCount === count;

          return (
            <TouchableOpacity
              key={`count-${count}`}
              style={[
                styles.chip,
                isSelected && styles.chipSelected,
              ]}
              onPress={() => onSelectCount(count)}
              activeOpacity={0.7}
              accessible={true}
              accessibilityRole="button"
              accessibilityLabel={`${count} ${t.summaryQuestions}`}
              accessibilityState={{ selected: isSelected }}
              accessibilityHint={t.accessibility.questionCountHint}
            >
              <Text style={[styles.chipText, isSelected && styles.chipTextSelected]}>
                {count}
              </Text>
              <Text style={[styles.chipSubtext, isSelected && styles.chipSubtextSelected]}>
                {t.summaryQuestions}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: theme.spacing.lg,
  },
  sectionTitle: {
    ...theme.typography.h3,
    fontSize: 16,
    lineHeight: 22,
    color: theme.colors.navy900,
    marginBottom: theme.spacing.sm,
    fontWeight: '700',
  },
  chipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.sm,
  },
  chip: {
    flex: 1,
    minWidth: 54,
    minHeight: 52,
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1.5,
    borderColor: theme.colors.border,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
    paddingVertical: 6,
    shadowColor: theme.colors.navy900,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 3,
    elevation: 1,
  },
  chipSelected: {
    borderColor: theme.colors.actionPrimary,
    backgroundColor: theme.colors.blue50,
  },
  chipText: {
    ...theme.typography.h3,
    fontSize: 18,
    fontWeight: '800',
    color: theme.colors.navy900,
    lineHeight: 22,
  },
  chipTextSelected: {
    color: theme.colors.actionPrimary,
  },
  chipSubtext: {
    ...theme.typography.caption,
    fontSize: 10,
    color: theme.colors.slate600,
    fontWeight: '600',
    marginTop: -1,
  },
  chipSubtextSelected: {
    color: theme.colors.actionPrimary,
    fontWeight: '700',
  },
});
