/**
 * ResendCodeButton Component
 * Manages resend cooldown timer (30s) and handles dispatch triggers.
 */

import React, { useState, useEffect } from 'react';
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  StyleSheet,
  View,
} from 'react-native';
import { theme } from '../../theme';
import { SupportedLanguage, getTranslation } from '../../config/i18n';
import { formatCountdown } from '../../features/auth';

interface ResendCodeButtonProps {
  onResend: () => Promise<void>;
  isResending: boolean;
  cooldownDuration?: number; // Duration in seconds (default 30)
  language?: SupportedLanguage;
  disabled?: boolean;
}

export const ResendCodeButton: React.FC<ResendCodeButtonProps> = ({
  onResend,
  isResending,
  cooldownDuration = 30,
  language = 'en',
  disabled = false,
}) => {
  const t = getTranslation(language).auth.otp;
  const [cooldown, setCooldown] = useState(cooldownDuration);

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (cooldown > 0) {
      timer = setInterval(() => {
        setCooldown((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [cooldown]);

  const handlePress = async () => {
    if (cooldown > 0 || isResending || disabled) return;
    await onResend();
    setCooldown(cooldownDuration);
  };

  const isAvailable = cooldown === 0 && !isResending && !disabled;

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, !isAvailable && styles.buttonDisabled]}
        onPress={handlePress}
        disabled={!isAvailable}
        activeOpacity={0.7}
        accessible={true}
        accessibilityRole="button"
        accessibilityLabel={isAvailable ? t.resendCode : `${t.resendIn} ${formatCountdown(cooldown)}`}
        accessibilityHint={t.accessibility.resendHint}
      >
        {isResending ? (
          <View style={styles.loadingRow}>
            <ActivityIndicator size="small" color={theme.colors.brandPrimary} />
            <Text style={styles.loadingText}>{t.sendingNewCode}</Text>
          </View>
        ) : cooldown > 0 ? (
          <Text style={styles.cooldownText}>
            {t.resendIn} {formatCountdown(cooldown)}
          </Text>
        ) : (
          <Text style={styles.resendText}>{t.resendCode}</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: theme.spacing.xs,
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    minHeight: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  loadingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  loadingText: {
    ...theme.typography.caption,
    fontSize: 13,
    color: theme.colors.brandPrimary,
    marginLeft: 8,
    fontWeight: '600',
  },
  cooldownText: {
    ...theme.typography.caption,
    fontSize: 13,
    color: theme.colors.textSecondary,
    fontWeight: '500',
  },
  resendText: {
    ...theme.typography.caption,
    fontSize: 13.5,
    fontWeight: '700',
    color: theme.colors.brandPrimary,
    textDecorationLine: 'underline',
  },
});
