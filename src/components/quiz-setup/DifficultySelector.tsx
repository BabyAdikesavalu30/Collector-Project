/**
 * DifficultySelector Component
 * Selectable cards for Beginner, Intermediate, and Advanced quiz difficulty.
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { theme } from '../../theme';
import { QuizDifficulty, QUIZ_DIFFICULTIES } from '../../features/quiz';
import { SupportedLanguage, getTranslation } from '../../config/i18n';

interface DifficultySelectorProps {
  selectedDifficulty: QuizDifficulty;
  onSelectDifficulty: (difficulty: QuizDifficulty) => void;
  language?: SupportedLanguage;
}

export const DifficultySelector: React.FC<DifficultySelectorProps> = ({
  selectedDifficulty,
  onSelectDifficulty,
  language = 'en',
}) => {
  const t = getTranslation(language).quizSetup;

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>{t.difficultySection}</Text>

      <View style={styles.cardsRow}>
        {QUIZ_DIFFICULTIES.map((item) => {
          const isSelected = selectedDifficulty === item.id;
          const title = t[item.titleKey] || item.defaultTitle;
          const subtitle = t[item.subtitleKey] || item.defaultSubtitle;

          return (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.card,
                isSelected && styles.cardSelected,
              ]}
              onPress={() => onSelectDifficulty(item.id)}
              activeOpacity={0.7}
              accessible={true}
              accessibilityRole="button"
              accessibilityLabel={`${title}. ${subtitle}.`}
              accessibilityState={{ selected: isSelected }}
              accessibilityHint={t.accessibility.difficultyHint}
            >
              <View style={styles.cardHeader}>
                <Text style={[styles.cardTitle, isSelected && styles.cardTitleSelected]}>
                  {title}
                </Text>

                <View style={[styles.checkCircle, isSelected && styles.checkCircleSelected]}>
                  {isSelected && <Text style={styles.checkGlyph}>✓</Text>}
                </View>
              </View>

              <Text style={[styles.cardSubtitle, isSelected && styles.cardSubtitleSelected]}>
                {subtitle}
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
  cardsRow: {
    gap: theme.spacing.sm,
  },
  card: {
    minHeight: 58,
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1.5,
    borderColor: theme.colors.border,
    paddingHorizontal: theme.spacing.base,
    paddingVertical: theme.spacing.sm,
    justifyContent: 'center',
    shadowColor: theme.colors.navy900,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 3,
    elevation: 1,
  },
  cardSelected: {
    borderColor: theme.colors.actionPrimary,
    backgroundColor: theme.colors.blue50,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  cardTitle: {
    ...theme.typography.bodyLarge,
    fontSize: 15,
    fontWeight: '700',
    color: theme.colors.navy900,
  },
  cardTitleSelected: {
    color: theme.colors.actionPrimary,
  },
  checkCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: theme.colors.gray300,
    backgroundColor: theme.colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkCircleSelected: {
    borderColor: theme.colors.actionPrimary,
    backgroundColor: theme.colors.actionPrimary,
  },
  checkGlyph: {
    color: theme.colors.white,
    fontSize: 11,
    fontWeight: '800',
    marginTop: -1,
  },
  cardSubtitle: {
    ...theme.typography.caption,
    fontSize: 12,
    color: theme.colors.slate600,
    lineHeight: 16,
  },
  cardSubtitleSelected: {
    color: theme.colors.slate600,
  },
});
