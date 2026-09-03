/**
 * RiddleAnswerInput Component
 * Text input and Check Answer submission control.
 */

import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { theme } from '../../theme';

interface RiddleAnswerInputProps {
  value: string;
  onChangeText: (text: string) => void;
  onSubmit: () => void;
  disabled: boolean;
  label: string;
  placeholder: string;
  buttonLabel: string;
  inputAccessibilityLabel: string;
  buttonAccessibilityHint: string;
}

export const RiddleAnswerInput: React.FC<RiddleAnswerInputProps> = ({
  value,
  onChangeText,
  onSubmit,
  disabled,
  label,
  placeholder,
  buttonLabel,
  inputAccessibilityLabel,
  buttonAccessibilityHint,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const canSubmit = value.trim().length > 0 && !disabled;

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>

      {/* Input Field */}
      <TextInput
        style={[
          styles.input,
          isFocused && styles.inputFocused,
          disabled && styles.inputDisabled,
        ]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.slate400}
        editable={!disabled}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        returnKeyType="done"
        onSubmitEditing={() => {
          if (canSubmit) onSubmit();
        }}
        autoCapitalize="none"
        autoCorrect={false}
        accessible={true}
        accessibilityLabel={inputAccessibilityLabel}
      />

      {/* Check Answer Button */}
      <TouchableOpacity
        style={[styles.button, !canSubmit && styles.buttonDisabled]}
        onPress={onSubmit}
        disabled={!canSubmit}
        activeOpacity={0.8}
        accessible={true}
        accessibilityRole="button"
        accessibilityState={{ disabled: !canSubmit }}
        accessibilityLabel={buttonLabel}
        accessibilityHint={buttonAccessibilityHint}
      >
        <Text style={[styles.buttonText, !canSubmit && styles.buttonTextDisabled]}>
          {buttonLabel}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: theme.spacing.md,
  },
  label: {
    ...theme.typography.caption,
    fontSize: 13,
    fontWeight: '700',
    color: theme.colors.navy900,
    marginBottom: theme.spacing.xs,
  },
  input: {
    width: '100%',
    height: 52,
    backgroundColor: theme.colors.white,
    borderWidth: 1.5,
    borderColor: theme.colors.border,
    borderRadius: theme.borderRadius.md,
    paddingHorizontal: theme.spacing.md,
    fontSize: 15,
    color: theme.colors.navy900,
    marginBottom: theme.spacing.sm,
  },
  inputFocused: {
    borderColor: theme.colors.actionPrimary,
    backgroundColor: theme.colors.white,
  },
  inputDisabled: {
    backgroundColor: theme.colors.gray50,
    color: theme.colors.slate500,
  },
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
