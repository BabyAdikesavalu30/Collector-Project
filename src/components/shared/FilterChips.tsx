/**
 * FilterChips — reusable horizontal category filter chips with accessible
 * selected state. Uses FlatList internally for long chip lists.
 */

import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { theme } from '../../theme';

export interface ChipOption {
  key: string;
  label: string;
}

interface FilterChipsProps {
  options: ChipOption[];
  selected: string;
  onSelect: (key: string) => void;
}

export const FilterChips: React.FC<FilterChipsProps> = ({ options, selected, onSelect }) => (
  <FlatList
    horizontal
    data={options}
    keyExtractor={(item) => item.key}
    showsHorizontalScrollIndicator={false}
    contentContainerStyle={styles.list}
    renderItem={({ item }) => {
      const isActive = item.key === selected;
      return (
        <TouchableOpacity
          style={[styles.chip, isActive && styles.chipActive]}
          onPress={() => onSelect(item.key)}
          accessibilityRole="tab"
          accessibilityState={{ selected: isActive }}
          accessibilityLabel={item.label}
        >
          <Text style={[styles.chipText, isActive && styles.chipTextActive]}>{item.label}</Text>
        </TouchableOpacity>
      );
    }}
  />
);

const styles = StyleSheet.create({
  list: {
    paddingHorizontal: theme.spacing.lg,
    gap: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
  },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: theme.colors.white,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  chipActive: {
    backgroundColor: theme.colors.actionPrimary,
    borderColor: theme.colors.actionPrimary,
  },
  chipText: {
    ...theme.typography.caption,
    color: theme.colors.slate600,
    fontWeight: '600',
  },
  chipTextActive: {
    color: theme.colors.textOnAction,
  },
});