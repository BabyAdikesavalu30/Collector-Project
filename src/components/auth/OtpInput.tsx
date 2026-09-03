/**
 * OtpInput Component
 * Accessible 6-digit numeric input with auto-advance and focus styling.
 * Clean White cells, Royal Blue focus, and Navy typography.
 */

import React, { useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Platform,
  NativeSyntheticEvent,
  TextInputKeyPressEventData,
} from 'react-native';
import { theme } from '../../theme';

interface OtpInputProps {
  value: string;
  onChangeText: (code: string) => void;
  length?: number;
  hasError?: boolean;
  disabled?: boolean;
}

export const OtpInput: React.FC<OtpInputProps> = ({
  value,
  onChangeText,
  length = 6,
  hasError = false,
  disabled = false,
}) => {
  const inputRefs = useRef<(TextInput | null)[]>([]);

  const digits = value.padEnd(length, ' ').slice(0, length).split('');
  const focusedIndex = Math.min(value.length, length - 1);

  const handleCellPress = (index: number) => {
    if (disabled) return;
    const target = Math.min(value.length, length - 1);
    inputRefs.current[target]?.focus();
  };

  const handleTextChange = (text: string, index: number) => {
    const cleaned = text.replace(/[^0-9]/g, '');

    if (cleaned.length > 1) {
      // Pasted full OTP code
      const truncated = cleaned.slice(0, length);
      onChangeText(truncated);
      const nextIdx = Math.min(truncated.length, length - 1);
      inputRefs.current[nextIdx]?.focus();
      return;
    }

    const currentDigits = value.split('');
    if (cleaned.length === 1) {
      currentDigits[index] = cleaned;
      const newCode = currentDigits.join('').slice(0, length);
      onChangeText(newCode);

      if (index < length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    } else if (cleaned.length === 0) {
      currentDigits[index] = '';
      onChangeText(currentDigits.join(''));
    }
  };

  const handleKeyPress = (
    e: NativeSyntheticEvent<TextInputKeyPressEventData>,
    index: number
  ) => {
    if (e.nativeEvent.key === 'Backspace') {
      if (!value[index] && index > 0) {
        const currentDigits = value.split('');
        currentDigits[index - 1] = '';
        onChangeText(currentDigits.join(''));
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  return (
    <View
      style={styles.container}
      accessible={true}
      accessibilityRole="none"
      accessibilityLabel={`Six-digit verification code input. Current value: ${value || 'empty'}`}
    >
      {Array.from({ length }).map((_, index) => {
        const isFilled = index < value.length;
        const isFocused = index === focusedIndex && !disabled;
        const char = value[index] || '';

        return (
          <TouchableOpacity
            key={index}
            style={[
              styles.cell,
              isFilled && styles.cellFilled,
              isFocused && styles.cellFocused,
              hasError && styles.cellError,
            ]}
            onPress={() => handleCellPress(index)}
            activeOpacity={1}
            accessible={true}
            accessibilityRole="text"
            accessibilityLabel={`Digit ${index + 1}`}
            accessibilityValue={{ text: char ? char : 'empty' }}
          >
            <TextInput
              ref={(ref) => {
                inputRefs.current[index] = ref;
              }}
              style={styles.hiddenInput}
              value={char}
              onChangeText={(txt) => handleTextChange(txt, index)}
              onKeyPress={(e) => handleKeyPress(e, index)}
              keyboardType="number-pad"
              maxLength={Platform.OS === 'ios' ? 1 : 6}
              editable={!disabled}
              selectTextOnFocus={true}
              caretHidden={true}
              autoFocus={index === 0}
            />
            <Text style={[styles.cellText, hasError && styles.cellTextError]}>
              {char}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: theme.spacing.md,
  },
  cell: {
    width: 48,
    height: 56,
    borderRadius: theme.borderRadius.md,
    backgroundColor: theme.colors.white,
    borderWidth: 1.5,
    borderColor: theme.colors.gray300,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: theme.colors.navy900,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.02,
    shadowRadius: 3,
    elevation: 1,
  },
  cellFilled: {
    borderColor: theme.colors.actionPrimary,
    backgroundColor: theme.colors.blue50,
  },
  cellFocused: {
    borderColor: theme.colors.actionPrimary,
    backgroundColor: theme.colors.white,
    shadowColor: theme.colors.actionPrimary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 3,
  },
  cellError: {
    borderColor: theme.colors.error,
    backgroundColor: theme.colors.errorSurface,
  },
  cellText: {
    ...theme.typography.h2,
    fontSize: 22,
    fontWeight: '800',
    color: theme.colors.navy900,
    textAlign: 'center',
  },
  cellTextError: {
    color: theme.colors.error,
  },
  hiddenInput: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    opacity: 0.01,
  },
});
