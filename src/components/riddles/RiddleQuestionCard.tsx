/**
 * RiddleQuestionCard Component
 * Prominent card displaying lightbulb decoration, riddle number tag, and large riddle text.
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../../theme';
import { SupportedLanguage } from '../../config/i18n';
import { RiddleQuestion } from '../../features/riddles';

interface RiddleQuestionCardProps {
  riddle: RiddleQuestion;
  language: SupportedLanguage;
  riddleTag: string;
}

export const RiddleQuestionCard: React.FC<RiddleQuestionCardProps> = ({
  riddle,
  language,
  riddleTag,
}) => {
  const isTamil = language === 'ta';
  const questionText = isTamil ? riddle.question.ta : riddle.question.en;

  return (
    <View style={styles.card}>
      {/* Header Tag with Lightbulb Icon */}
      <View style={styles.tagRow}>
        <View style={styles.iconBadge}>
          <Text style={styles.icon}>💡</Text>
        </View>
        <Text style={styles.tagText}>{riddleTag}</Text>
      </View>

      {/* Riddle Question Body */}
      <Text style={styles.questionText}>{questionText}</Text>
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
    marginBottom: theme.spacing.md,
    shadowColor: theme.colors.navy900,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  tagRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  iconBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: theme.colors.purple50,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.xs,
  },
  icon: {
    fontSize: 16,
  },
  tagText: {
    ...theme.typography.caption,
    fontSize: 12.5,
    fontWeight: '800',
    color: theme.colors.brandPrimary,
    textTransform: 'uppercase',
  },
  questionText: {
    ...theme.typography.h2,
    fontSize: 18,
    fontWeight: '700',
    color: theme.colors.navy900,
    lineHeight: 26,
  },
});
