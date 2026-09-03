/**
 * AuthIdentifierInput Component
 * Dedicated text field for Email or Mobile Number with clean White surface,
 * Royal Blue focus styling, Navy typography, and localized errors.
 */

import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { theme } from '../../theme';
import { SupportedLanguage, getTranslation } from '../../config/i18n';

interface AuthIdentifierInputProps {
  value: string;
  onChangeText: (text: string) => void;
  error?: string | null;
  language?: SupportedLanguage;
  disabled?: boolean;
}

export const AuthIdentifierInput: React.FC<AuthIdentifierInputProps> = ({
  value,
  onChangeText,
  error,
  language = 'en',
  disabled = false,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const t = getTranslation(language).auth.login;

  return (
    <View style={styles.container}>
      {/* Label */}
      <Text style={styles.label}>{t.identifier}</Text>

      {/* Input Surface */}
      <View
        style={[
          styles.inputContainer,
          isFocused && styles.inputContainerFocused,
          Boolean(error) && styles.inputContainerError,
        ]}
      >
        {/* Leading Icon / Prefix */}
        <Text style={styles.leadingIcon}>✉️</Text>

        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          placeholder={t.identifierPlaceholder}
          placeholderTextColor={theme.colors.slate400}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          editable={!disabled}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          accessible={true}
          accessibilityLabel={t.identifier}
          accessibilityHint={t.identifierPlaceholder}
        />
      </View>

      {/* Error Message */}
      {Boolean(error) && (
        <Text style={styles.errorText} accessible={true} accessibilityRole="alert">
          {error}
        </Text>
      )}
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
    marginBottom: 6,
    letterSpacing: 0.2,
  },
  inputContainer: {
    width: '100%',
    height: 52,
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1.5,
    borderColor: theme.colors.gray300,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.base,
    shadowColor: theme.colors.navy900,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.02,
    shadowRadius: 3,
    elevation: 1,
  },
  inputContainerFocused: {
    borderColor: theme.colors.actionPrimary,
    backgroundColor: theme.colors.white,
    shadowColor: theme.colors.actionPrimary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 2,
  },
  inputContainerError: {
    borderColor: theme.colors.error,
    backgroundColor: theme.colors.errorSurface,
  },
  leadingIcon: {
    fontSize: 16,
    marginRight: 10,
    opacity: 0.7,
  },
  input: {
    flex: 1,
    height: '100%',
    color: theme.colors.navy900,
    fontSize: 14.5,
    fontWeight: '500',
  },
  errorText: {
    ...theme.typography.caption,
    color: theme.colors.error,
    fontSize: 12,
    marginTop: 4,
    fontWeight: '600',
  },
});
