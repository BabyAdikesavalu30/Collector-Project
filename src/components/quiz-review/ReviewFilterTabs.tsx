/**
 * ReviewFilterTabs Component
 * Interactive filter tabs for Review Answers (All, Correct, Wrong).
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { theme } from '../../theme';
import { ReviewFilterType } from '../../features/quiz';

interface ReviewFilterTabsProps {
  activeFilter: ReviewFilterType;
  counts: {
    all: number;
    correct: number;
    wrong: number;
  };
  onSelectFilter: (filter: ReviewFilterType) => void;
  t: {
    filterAll: string;
    filterCorrect: string;
    filterWrong: string;
    accessibility: {
      filterHint: string;
    };
  };
}

export const ReviewFilterTabs: React.FC<ReviewFilterTabsProps> = ({
  activeFilter,
  counts,
  onSelectFilter,
  t,
}) => {
  const tabs: { key: ReviewFilterType; label: string; count: number }[] = [
    { key: 'all', label: t.filterAll, count: counts.all },
    { key: 'correct', label: t.filterCorrect, count: counts.correct },
    { key: 'wrong', label: t.filterWrong, count: counts.wrong },
  ];

  return (
    <View style={styles.container} accessibilityRole="tablist">
      {tabs.map((tab) => {
        const isSelected = activeFilter === tab.key;
        return (
          <TouchableOpacity
            key={tab.key}
            style={[styles.tab, isSelected && styles.tabActive]}
            onPress={() => onSelectFilter(tab.key)}
            activeOpacity={0.7}
            accessible={true}
            accessibilityRole="tab"
            accessibilityState={{ selected: isSelected }}
            accessibilityLabel={`${tab.label} (${tab.count})`}
            accessibilityHint={t.accessibility.filterHint.replace('{filter}', tab.label)}
          >
            <Text style={[styles.tabText, isSelected && styles.tabTextActive]}>
              {tab.label} ({tab.count})
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: theme.colors.gray100,
    borderRadius: theme.borderRadius.md,
    padding: 3,
    marginHorizontal: theme.spacing.lg,
    marginVertical: theme.spacing.sm,
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: theme.borderRadius.sm,
    minHeight: 44,
  },
  tabActive: {
    backgroundColor: theme.colors.actionPrimary,
    shadowColor: theme.colors.navy900,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  tabText: {
    ...theme.typography.caption,
    fontSize: 13,
    fontWeight: '700',
    color: theme.colors.slate600,
  },
  tabTextActive: {
    color: theme.colors.textOnAction,
  },
});
