/**
 * QuizContextCard Component
 * Displays compact summary card of the selected learning path (Subject, Pathway, and Level).
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../../theme';
import { QuizContextResolved } from '../../features/quiz';

interface QuizContextCardProps {
  context: QuizContextResolved;
}

export const QuizContextCard: React.FC<QuizContextCardProps> = ({ context }) => {
  return (
    <View style={styles.card} accessible={true} accessibilityRole="summary">
      <View style={styles.topRow}>
        <View style={styles.subjectBadge}>
          <Text style={styles.subjectIcon}>{context.subjectIcon}</Text>
          <Text style={styles.subjectText}>{context.subjectTitle}</Text>
        </View>

        <View style={styles.levelBadge}>
          <Text style={styles.levelText}>{context.levelBadge || context.levelTitle}</Text>
        </View>
      </View>

      <Text style={styles.pathwayTitle} numberOfLines={2}>
        {context.pathwayTitle}
      </Text>

      {Boolean(context.pathwayDescription) && (
        <Text style={styles.pathwayDescription} numberOfLines={2}>
          {context.pathwayDescription}
        </Text>
      )}

      {context.topicCount > 0 && (
        <View style={styles.metaRow}>
          <View style={styles.metaDot} />
          <Text style={styles.metaText}>
            {context.topicCount} {context.topicCount === 1 ? 'Topic' : 'Topics'}
          </Text>
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
    padding: theme.spacing.base,
    marginBottom: theme.spacing.lg,
    shadowColor: theme.colors.navy900,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.sm,
  },
  subjectBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.blue50,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: theme.borderRadius.full,
    borderWidth: 1,
    borderColor: theme.colors.blue200,
  },
  subjectIcon: {
    fontSize: 14,
    marginRight: 6,
  },
  subjectText: {
    ...theme.typography.caption,
    fontWeight: '700',
    color: theme.colors.actionPrimary,
    fontSize: 12,
  },
  levelBadge: {
    backgroundColor: theme.colors.purple100,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: theme.borderRadius.full,
    borderWidth: 1,
    borderColor: theme.colors.purple200,
  },
  levelText: {
    ...theme.typography.caption,
    fontWeight: '700',
    color: theme.colors.brandPrimary,
    fontSize: 11,
  },
  pathwayTitle: {
    ...theme.typography.h3,
    fontSize: 18,
    lineHeight: 24,
    color: theme.colors.navy900,
    marginBottom: 4,
    fontFamily: theme.fontFamilies.bold,
  },
  pathwayDescription: {
    ...theme.typography.body,
    fontSize: 13,
    lineHeight: 18,
    color: theme.colors.slate600,
    marginBottom: theme.spacing.xs,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  metaDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: theme.colors.success,
    marginRight: 6,
  },
  metaText: {
    ...theme.typography.caption,
    fontSize: 12,
    color: theme.colors.slate600,
    fontWeight: '600',
  },
});
