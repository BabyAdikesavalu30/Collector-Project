/**
 * QuizContextSummary Component
 * Compact educational context badge showing Subject, Pathway, Level, and Difficulty.
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../../theme';
import { QuizContextResolved, QuizDifficulty } from '../../features/quiz';

interface QuizContextSummaryProps {
  context: QuizContextResolved;
  difficulty: QuizDifficulty;
  totalQuestions: number;
}

export const QuizContextSummary: React.FC<QuizContextSummaryProps> = ({
  context,
  difficulty,
  totalQuestions,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.subjectIcon}>{context.subjectIcon || '📚'}</Text>
        <Text style={styles.subjectTitle}>{context.subjectTitle}</Text>
      </View>

      <Text style={styles.pathwayTitle} numberOfLines={1}>
        {context.pathwayTitle}
      </Text>

      <View style={styles.badgeRow}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{context.levelBadge}</Text>
        </View>

        <View style={[styles.badge, styles.difficultyBadge]}>
          <Text style={styles.difficultyText}>{difficulty.toUpperCase()}</Text>
        </View>

        <View style={styles.badge}>
          <Text style={styles.badgeText}>{totalQuestions} Qs</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: theme.spacing.sm,
    marginBottom: theme.spacing.lg,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  subjectIcon: {
    fontSize: 16,
    marginRight: 6,
  },
  subjectTitle: {
    ...theme.typography.caption,
    fontSize: 12,
    fontWeight: '700',
    color: theme.colors.brandPrimary,
    textTransform: 'uppercase',
  },
  pathwayTitle: {
    ...theme.typography.body,
    fontSize: 14,
    fontWeight: '700',
    color: theme.colors.navy900,
    marginBottom: theme.spacing.xs,
  },
  badgeRow: {
    flexDirection: 'row',
    gap: theme.spacing.xs,
    flexWrap: 'wrap',
  },
  badge: {
    backgroundColor: theme.colors.gray100,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: theme.borderRadius.sm,
  },
  badgeText: {
    ...theme.typography.caption,
    fontSize: 10.5,
    fontWeight: '600',
    color: theme.colors.slate600,
  },
  difficultyBadge: {
    backgroundColor: theme.colors.blue50,
  },
  difficultyText: {
    ...theme.typography.caption,
    fontSize: 10.5,
    fontWeight: '700',
    color: theme.colors.brandPrimary,
  },
});
