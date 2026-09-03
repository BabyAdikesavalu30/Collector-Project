/**
 * TermsCheckbox Component
 * Accessible checkbox for accepting Terms & Conditions and Privacy Policy.
 * Clean White surface & Royal Blue checked state.
 */

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { theme } from '../../theme';
import { SupportedLanguage, getTranslation } from '../../config/i18n';

interface TermsCheckboxProps {
  checked: boolean;
  onToggle: () => void;
  error?: string | null;
  language?: SupportedLanguage;
  disabled?: boolean;
}

export const TermsCheckbox: React.FC<TermsCheckboxProps> = ({
  checked,
  onToggle,
  error,
  language = 'en',
  disabled = false,
}) => {
  const t = getTranslation(language).auth.register;

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.row}
        onPress={onToggle}
        activeOpacity={0.7}
        disabled={disabled}
        accessible={true}
        accessibilityRole="checkbox"
        accessibilityState={{ checked }}
        accessibilityLabel={t.terms}
        accessibilityHint={t.accessibility.termsCheckbox}
      >
        {/* Checkbox Box */}
        <View
          style={[
            styles.checkboxBox,
            checked && styles.checkboxBoxChecked,
            Boolean(error) && styles.checkboxBoxError,
          ]}
        >
          {checked && <Text style={styles.checkGlyph}>✓</Text>}
        </View>

        {/* Legal Text */}
        <Text style={styles.termsText}>{t.terms}</Text>
      </TouchableOpacity>

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
    marginVertical: theme.spacing.sm,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
  },
  checkboxBox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: theme.colors.gray300,
    backgroundColor: theme.colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  checkboxBoxChecked: {
    backgroundColor: theme.colors.actionPrimary,
    borderColor: theme.colors.actionPrimary,
  },
  checkboxBoxError: {
    borderColor: theme.colors.error,
    backgroundColor: theme.colors.errorSurface,
  },
  checkGlyph: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '900',
  },
  termsText: {
    ...theme.typography.caption,
    fontSize: 12.5,
    lineHeight: 18,
    color: theme.colors.slate600,
    flex: 1,
  },
  errorText: {
    ...theme.typography.caption,
    color: theme.colors.error,
    fontSize: 12,
    marginTop: 4,
    fontWeight: '600',
  },
});
