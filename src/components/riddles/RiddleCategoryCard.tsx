/**
 * RiddleCategoryCard Component
 * Full-width selectable card for a Riddle category (Easy, Medium, Hard, Genius).
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { theme } from '../../theme';
import { SupportedLanguage } from '../../config/i18n';
import { RiddleCategory, RiddleDifficulty } from '../../features/riddles';

interface RiddleCategoryCardProps {
  category: RiddleCategory;
  isSelected: boolean;
  onSelect: (id: RiddleDifficulty) => void;
  language: SupportedLanguage;
  scoreText: string;
  accessibilityLabel: string;
}

export const RiddleCategoryCard: React.FC<RiddleCategoryCardProps> = ({
  category,
  isSelected,
  onSelect,
  language,
  scoreText,
  accessibilityLabel,
}) => {
  const isTamil = language === 'ta';
  const title = isTamil ? category.title.ta : category.title.en;
  const description = isTamil ? category.description.ta : category.description.en;

  return (
    <TouchableOpacity
      style={[
        styles.card,
        {
          borderColor: isSelected ? theme.colors.actionPrimary : theme.colors.border,
          backgroundColor: isSelected ? theme.colors.blue50 : theme.colors.white,
        },
      ]}
      onPress={() => onSelect(category.id)}
      activeOpacity={0.8}
      accessible={true}
      accessibilityRole="button"
      accessibilityState={{ selected: isSelected }}
      accessibilityLabel={accessibilityLabel}
    >
      {/* Category Icon Badge */}
      <View
        style={[
          styles.iconCircle,
          {
            backgroundColor: isSelected ? theme.colors.white : category.accentBg,
            borderColor: isSelected ? theme.colors.actionPrimary : category.accentBorder,
          },
        ]}
      >
        <Text style={styles.icon}>{category.icon}</Text>
      </View>

      {/* Title, Description & Score */}
      <View style={styles.content}>
        <Text
          style={[
            styles.title,
            isSelected && { color: theme.colors.actionPrimary, fontWeight: '800' },
          ]}
        >
          {title}
        </Text>
        <Text style={styles.description}>{description}</Text>
        <Text style={styles.score}>{scoreText}</Text>
      </View>

      {/* Right Indicator (Checkmark when selected, Arrow when unselected) */}
      <View
        style={[
          styles.indicatorCircle,
          isSelected && styles.indicatorCircleSelected,
        ]}
      >
        <Text
          style={[
            styles.indicatorText,
            isSelected && styles.indicatorTextSelected,
          ]}
        >
          {isSelected ? '✓' : '›'}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1.5,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.sm,
    minHeight: 80,
    shadowColor: theme.colors.navy900,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.md,
  },
  icon: {
    fontSize: 24,
  },
  content: {
    flex: 1,
  },
  title: {
    ...theme.typography.h3,
    fontSize: 16,
    fontWeight: '700',
    color: theme.colors.navy900,
    marginBottom: 2,
  },
  description: {
    ...theme.typography.caption,
    fontSize: 12.5,
    color: theme.colors.slate600,
    marginBottom: 4,
  },
  score: {
    ...theme.typography.caption,
    fontSize: 11,
    fontWeight: '700',
    color: theme.colors.slate500,
  },
  indicatorCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: theme.colors.gray100,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: theme.spacing.sm,
  },
  indicatorCircleSelected: {
    backgroundColor: theme.colors.actionPrimary,
  },
  indicatorText: {
    fontSize: 16,
    fontWeight: '700',
    color: theme.colors.slate400,
  },
  indicatorTextSelected: {
    color: theme.colors.textOnAction,
    fontSize: 14,
    fontWeight: '900',
  },
});
