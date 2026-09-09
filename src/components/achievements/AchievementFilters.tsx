/**
 * AchievementFilters Component
 * Dual-tier filter controls: Status tabs + Category scroll pills.
 */

import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { theme } from '../../theme';
import { SupportedLanguage } from '../../config/i18n';
import { AchievementCategory, AchievementStatus } from '../../features/achievements';
import { getAchievementsI18n } from './achievements.i18n';

interface AchievementFiltersProps {
  selectedStatus: AchievementStatus | 'all';
  selectedCategory: AchievementCategory | 'all';
  onSelectStatus: (status: AchievementStatus | 'all') => void;
  onSelectCategory: (category: AchievementCategory | 'all') => void;
  language?: SupportedLanguage;
}

const STATUSES: (AchievementStatus | 'all')[] = ['all', 'in_progress', 'unlocked', 'locked'];

const CATEGORIES: (AchievementCategory | 'all')[] = [
  'all',
  'learning',
  'streak',
  'games',
  'riddles',
  'mystery',
  'experiments',
  'micro-lessons',
  'concept-maps',
  'discovery',
  'special',
];

export const AchievementFilters: React.FC<AchievementFiltersProps> = ({
  selectedStatus,
  selectedCategory,
  onSelectStatus,
  onSelectCategory,
  language = 'en',
}) => {
  const i18n = getAchievementsI18n(language);

  return (
    <View style={styles.container}>
      {/* Status Segmented Row */}
      <View style={styles.statusRow} accessibilityRole="tablist">
        {STATUSES.map((status) => {
          const isActive = selectedStatus === status;
          const label = i18n.statusFilters[status];

          return (
            <TouchableOpacity
              key={status}
              style={[styles.statusTab, isActive && styles.statusTabActive]}
              onPress={() => onSelectStatus(status)}
              activeOpacity={0.8}
              accessible={true}
              accessibilityRole="tab"
              accessibilityState={{ selected: isActive }}
              accessibilityLabel={`${label} filter`}
              hitSlop={{ top: 8, bottom: 8, left: 6, right: 6 }}
            >
              <Text style={[styles.statusTabText, isActive && styles.statusTabTextActive]}>
                {label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Category Horizontal Scroll */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoryScroll}
      >
        {CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat;
          const label = i18n.categoryFilters[cat] ?? cat;

          return (
            <TouchableOpacity
              key={cat}
              style={[styles.catPill, isActive && styles.catPillActive]}
              onPress={() => onSelectCategory(cat)}
              activeOpacity={0.8}
              accessible={true}
              accessibilityRole="button"
              accessibilityState={{ selected: isActive }}
              accessibilityLabel={`${label} category`}
              hitSlop={{ top: 8, bottom: 8, left: 4, right: 4 }}
            >
              <Text style={[styles.catPillText, isActive && styles.catPillTextActive]}>
                {label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: theme.spacing.xs,
    gap: theme.spacing.xs,
  },
  statusRow: {
    flexDirection: 'row',
    backgroundColor: theme.colors.gray100,
    borderRadius: theme.borderRadius.md,
    padding: 3,
  },
  statusTab: {
    flex: 1,
    minHeight: 36,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: theme.borderRadius.sm,
  },
  statusTabActive: {
    backgroundColor: theme.colors.white,
    shadowColor: theme.colors.navy900,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  statusTabText: {
    ...theme.typography.caption,
    fontSize: 12,
    fontWeight: '600',
    color: theme.colors.slate600,
  },
  statusTabTextActive: {
    color: theme.colors.navy900,
    fontWeight: '800',
  },
  categoryScroll: {
    gap: 6,
    paddingVertical: 4,
    paddingRight: theme.spacing.base,
  },
  catPill: {
    minHeight: 34,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 17,
    backgroundColor: theme.colors.white,
    borderWidth: 1,
    borderColor: theme.colors.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  catPillActive: {
    backgroundColor: theme.colors.navy900,
    borderColor: theme.colors.navy900,
  },
  catPillText: {
    ...theme.typography.caption,
    fontSize: 12,
    fontWeight: '600',
    color: theme.colors.slate600,
  },
  catPillTextActive: {
    color: theme.colors.white,
    fontWeight: '700',
  },
});
