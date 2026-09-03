/**
 * RiddleCategoryList Component
 * Renders the 4 Riddle difficulty category cards.
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../../theme';
import { SupportedLanguage } from '../../config/i18n';
import { RiddleCategory, RiddleDifficulty } from '../../features/riddles';
import { RiddleCategoryCard } from './RiddleCategoryCard';

interface RiddleCategoryListProps {
  categories: RiddleCategory[];
  selectedDifficulty: RiddleDifficulty | null;
  onSelectDifficulty: (id: RiddleDifficulty) => void;
  language: SupportedLanguage;
  t: {
    scoreLabel: string;
    noCategories: string;
    accessibility: {
      categoryCard: string;
    };
  };
}

export const RiddleCategoryList: React.FC<RiddleCategoryListProps> = ({
  categories,
  selectedDifficulty,
  onSelectDifficulty,
  language,
  t,
}) => {
  const isTamil = language === 'ta';

  if (categories.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyIcon}>🧩</Text>
        <Text style={styles.emptyText}>{t.noCategories}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {categories.map((category) => {
        const isSelected = selectedDifficulty === category.id;
        const title = isTamil ? category.title.ta : category.title.en;
        const description = isTamil ? category.description.ta : category.description.en;

        const scoreText = t.scoreLabel
          .replace('{current}', String(category.score))
          .replace('{total}', String(category.totalAvailable));

        const accessibilityLabel = t.accessibility.categoryCard
          .replace('{category}', title)
          .replace('{description}', description)
          .replace('{current}', String(category.score))
          .replace('{total}', String(category.totalAvailable));

        return (
          <RiddleCategoryCard
            key={category.id}
            category={category}
            isSelected={isSelected}
            onSelect={onSelectDifficulty}
            language={language}
            scoreText={scoreText}
            accessibilityLabel={accessibilityLabel}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: theme.spacing.md,
  },
  emptyContainer: {
    padding: theme.spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyIcon: {
    fontSize: 36,
    marginBottom: theme.spacing.sm,
  },
  emptyText: {
    ...theme.typography.body,
    fontSize: 14,
    color: theme.colors.slate600,
    textAlign: 'center',
  },
});
