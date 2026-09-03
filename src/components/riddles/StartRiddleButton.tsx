/**
 * StartRiddleButton Component
 * Primary action button for Screen 21, enabled after selecting a category.
 */

import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import { theme } from '../../theme';

interface StartRiddleButtonProps {
  onPress: () => void;
  disabled: boolean;
  label: string;
  accessibilityHint: string;
}

export const StartRiddleButton: React.FC<StartRiddleButtonProps> = ({
  onPress,
  disabled,
  label,
  accessibilityHint,
}) => {
  return (
    <TouchableOpacity
      style={[styles.button, disabled && styles.buttonDisabled]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
      accessible={true}
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      accessibilityLabel={label}
      accessibilityHint={accessibilityHint}
    >
      <Text style={[styles.buttonText, disabled && styles.buttonTextDisabled]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: '100%',
    height: 50,
    backgroundColor: theme.colors.actionPrimary,
    borderRadius: theme.borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: theme.colors.brandPrimary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 3,
  },
  buttonDisabled: {
    backgroundColor: theme.colors.gray200,
    shadowOpacity: 0,
    elevation: 0,
  },
  buttonText: {
    ...theme.typography.button,
    color: theme.colors.textOnAction,
    fontSize: 15,
    fontWeight: '800',
  },
  buttonTextDisabled: {
    color: theme.colors.slate400,
  },
});
