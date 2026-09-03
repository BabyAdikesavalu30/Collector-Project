/**
 * SpinOption Component
 * Interactive multiple-choice answer option for science challenge questions.
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { theme } from '../../theme';

interface SpinOptionProps {
  index: number;
  text: string;
  isSelected: boolean;
  onSelect: () => void;
}

const LETTERS = ['A', 'B', 'C', 'D'];

export const SpinOption: React.FC<SpinOptionProps> = ({
  index,
  text,
  isSelected,
  onSelect,
}) => {
  const letter = LETTERS[index] || String(index + 1);

  return (
    <TouchableOpacity
      style={[
        styles.container,
        isSelected && styles.containerSelected,
      ]}
      onPress={onSelect}
      activeOpacity={0.75}
      accessible={true}
      accessibilityRole="button"
      accessibilityState={{ selected: isSelected }}
      accessibilityLabel={`Option ${letter}: ${text}`}
    >
      {/* Option Letter Badge */}
      <View
        style={[
          styles.letterBadge,
          isSelected && styles.letterBadgeSelected,
        ]}
      >
        <Text
          style={[
            styles.letterText,
            isSelected && styles.letterTextSelected,
          ]}
        >
          {letter}
        </Text>
      </View>

      {/* Option Text */}
      <Text
        style={[
          styles.optionText,
          isSelected && styles.optionTextSelected,
        ]}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    minHeight: 48,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.white,
    borderWidth: 1.5,
    borderColor: theme.colors.border,
    borderRadius: theme.borderRadius.md,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginBottom: 8,
  },
  containerSelected: {
    borderColor: theme.colors.actionPrimary,
    backgroundColor: theme.colors.blue50,
  },
  letterBadge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: theme.colors.gray100,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  letterBadgeSelected: {
    backgroundColor: theme.colors.actionPrimary,
  },
  letterText: {
    ...theme.typography.caption,
    fontSize: 12,
    fontWeight: '800',
    color: theme.colors.slate600,
  },
  letterTextSelected: {
    color: theme.colors.textOnAction,
  },
  optionText: {
    ...theme.typography.body,
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.navy900,
    flex: 1,
  },
  optionTextSelected: {
    color: theme.colors.brandPrimary,
    fontWeight: '700',
  },
});
