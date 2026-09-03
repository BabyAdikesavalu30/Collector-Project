/**
 * SpinButton Component
 * Center hub button that triggers the wheel spin.
 */

import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import { theme } from '../../theme';

interface SpinButtonProps {
  label: string;
  isSpinning: boolean;
  disabled: boolean;
  onPress: () => void;
  accessibilityHint: string;
}

export const SpinButton: React.FC<SpinButtonProps> = ({
  label,
  isSpinning,
  disabled,
  onPress,
  accessibilityHint,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        (isSpinning || disabled) && styles.buttonDisabled,
      ]}
      onPress={onPress}
      disabled={isSpinning || disabled}
      activeOpacity={0.8}
      accessible={true}
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityHint={accessibilityHint}
    >
      <Text style={styles.buttonText}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: theme.colors.actionPrimary,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: theme.colors.white,
    shadowColor: theme.colors.navy900,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 8,
    zIndex: 5,
  },
  buttonDisabled: {
    backgroundColor: theme.colors.slate400,
    opacity: 0.75,
  },
  buttonText: {
    ...theme.typography.button,
    color: theme.colors.textOnAction,
    fontSize: 14,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
});
