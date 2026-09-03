/**
 * QuizSummaryCard Component
 * Displays concise summary of the configured quiz parameters before starting.
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../../theme';
import { QuizDifficulty, QuizQuestionCount, calculateQuizTimeMinutes } from '../../features/quiz';
import { SupportedLanguage, getTranslation } from '../../config/i18n';

interface QuizSummaryCardProps {
  subjectTitle: string;
  pathwayTitle: string;
  difficulty: QuizDifficulty;
  questionCount: QuizQuestionCount;
  timerEnabled: boolean;
  language?: SupportedLanguage;
}

export const QuizSummaryCard: React.FC<QuizSummaryCardProps> = ({
  subjectTitle,
  pathwayTitle,
  difficulty,
  questionCount,
  timerEnabled,
  language = 'en',
}) => {
  const t = getTranslation(language).quizSetup;

  const difficultyLabel =
    difficulty === 'beginner'
      ? t.difficultyBeginner
      : difficulty === 'intermediate'
      ? t.difficultyIntermediate
      : t.difficultyAdvanced;

  const timeMinutes = calculateQuizTimeMinutes(questionCount, timerEnabled);
  const timeDisplay = timerEnabled && timeMinutes !== null
    ? `${timeMinutes} ${t.summaryTimeMin}`
    : t.summaryTimerOff;

  return (
    <View style={styles.card} accessible={true} accessibilityRole="summary">
      <View style={styles.cardHeader}>
        <Text style={styles.headerTitle}>{t.summaryTitle}</Text>
        <Text style={styles.contextHeader} numberOfLines={1}>
          {subjectTitle} • {pathwayTitle}
        </Text>
      </View>

      <View style={styles.divider} />

      <View style={styles.metricsRow}>
        {/* Difficulty Metric */}
        <View style={styles.metricItem}>
          <Text style={styles.metricLabel}>{t.summaryDifficulty}</Text>
          <Text style={styles.metricValue}>{difficultyLabel}</Text>
        </View>

        {/* Questions Metric */}
        <View style={styles.metricItem}>
          <Text style={styles.metricLabel}>{t.summaryQuestions}</Text>
          <Text style={styles.metricValue}>{questionCount}</Text>
        </View>

        {/* Time Metric */}
        <View style={styles.metricItem}>
          <Text style={styles.metricLabel}>{t.summaryTime}</Text>
          <Text style={[styles.metricValue, !timerEnabled && styles.metricValueMuted]}>
            {timeDisplay}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.gray100,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: theme.spacing.base,
    marginBottom: theme.spacing.xl,
  },
  cardHeader: {
    marginBottom: theme.spacing.sm,
  },
  headerTitle: {
    ...theme.typography.h3,
    fontSize: 16,
    color: theme.colors.navy900,
    fontWeight: '800',
    marginBottom: 2,
  },
  contextHeader: {
    ...theme.typography.caption,
    fontSize: 12,
    color: theme.colors.slate600,
    fontWeight: '600',
  },
  divider: {
    height: 1,
    backgroundColor: theme.colors.gray300,
    marginBottom: theme.spacing.sm,
  },
  metricsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  metricItem: {
    flex: 1,
    alignItems: 'center',
  },
  metricLabel: {
    ...theme.typography.caption,
    fontSize: 11,
    color: theme.colors.slate600,
    marginBottom: 3,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  metricValue: {
    ...theme.typography.bodyLarge,
    fontSize: 14.5,
    fontWeight: '800',
    color: theme.colors.actionPrimary,
  },
  metricValueMuted: {
    color: theme.colors.slate600,
    fontSize: 13,
    fontWeight: '700',
  },
});
