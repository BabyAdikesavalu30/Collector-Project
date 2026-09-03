/**
 * AuthModeSwitcher Component
 * Segmented control enabling smooth switching between Password and OTP login modes.
 * Clean Pearl White & Royal Blue active indicator.
 */

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { theme } from '../../theme';
import { SupportedLanguage, getTranslation } from '../../config/i18n';
import { AuthMode } from '../../features/auth';

interface AuthModeSwitcherProps {
  mode: AuthMode;
  onModeChange: (mode: AuthMode) => void;
  language?: SupportedLanguage;
  disabled?: boolean;
}

export const AuthModeSwitcher: React.FC<AuthModeSwitcherProps> = ({
  mode,
  onModeChange,
  language = 'en',
  disabled = false,
}) => {
  const t = getTranslation(language).auth.login;

  return (
    <View
      style={styles.container}
      accessible={true}
      accessibilityRole="tablist"
      accessibilityLabel={t.accessibility.screenLabel}
    >
      {/* Password Mode Tab */}
      <TouchableOpacity
        style={[styles.segment, mode === 'password' && styles.segmentActive]}
        onPress={() => onModeChange('password')}
        activeOpacity={0.8}
        disabled={disabled}
        accessible={true}
        accessibilityRole="tab"
        accessibilityState={{ selected: mode === 'password' }}
        accessibilityLabel={t.passwordMode}
        accessibilityHint={t.accessibility.passwordTab}
      >
        <Text
          style={[
            styles.segmentText,
            mode === 'password' && styles.segmentTextActive,
          ]}
        >
          {t.passwordMode}
        </Text>
      </TouchableOpacity>

      {/* OTP Mode Tab */}
      <TouchableOpacity
        style={[styles.segment, mode === 'otp' && styles.segmentActive]}
        onPress={() => onModeChange('otp')}
        activeOpacity={0.8}
        disabled={disabled}
        accessible={true}
        accessibilityRole="tab"
        accessibilityState={{ selected: mode === 'otp' }}
        accessibilityLabel={t.otpMode}
        accessibilityHint={t.accessibility.otpTab}
      >
        <Text
          style={[
            styles.segmentText,
            mode === 'otp' && styles.segmentTextActive,
          ]}
        >
          {t.otpMode}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 48,
    backgroundColor: theme.colors.gray100,
    borderRadius: theme.borderRadius.md,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 4,
    borderWidth: 1,
    borderColor: theme.colors.border,
    marginBottom: theme.spacing.lg,
  },
  segment: {
    flex: 1,
    height: '100%',
    borderRadius: theme.borderRadius.sm,
    justifyContent: 'center',
    alignItems: 'center',
  },
  segmentActive: {
    backgroundColor: theme.colors.actionPrimary,
    shadowColor: theme.colors.actionPrimary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 2,
  },
  segmentText: {
    ...theme.typography.caption,
    fontSize: 13.5,
    fontWeight: '600',
    color: theme.colors.slate600,
    letterSpacing: 0.3,
  },
  segmentTextActive: {
    color: theme.colors.textOnAction,
    fontWeight: '800',
  },
});
