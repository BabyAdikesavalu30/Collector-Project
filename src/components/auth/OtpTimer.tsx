/**
 * OtpTimer Component
 * Accurate countdown timer calculating remaining duration from expiresAt timestamp.
 * Avoids timer drift and announces expiry status.
 */

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../../theme';
import { SupportedLanguage, getTranslation } from '../../config/i18n';
import { formatCountdown } from '../../features/auth';

interface OtpTimerProps {
  expiresAt: number;
  onExpire?: () => void;
  language?: SupportedLanguage;
}

export const OtpTimer: React.FC<OtpTimerProps> = ({
  expiresAt,
  onExpire,
  language = 'en',
}) => {
  const t = getTranslation(language).auth.otp;

  const calculateRemaining = () => {
    const diff = Math.max(0, Math.floor((expiresAt - Date.now()) / 1000));
    return diff;
  };

  const [remainingSeconds, setRemainingSeconds] = useState<number>(calculateRemaining);

  useEffect(() => {
    const interval = setInterval(() => {
      const currentRemaining = calculateRemaining();
      setRemainingSeconds(currentRemaining);

      if (currentRemaining <= 0) {
        clearInterval(interval);
        onExpire?.();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [expiresAt, onExpire]);

  const isExpired = remainingSeconds <= 0;

  return (
    <View style={styles.container} accessible={true} accessibilityRole="timer">
      {isExpired ? (
        <Text style={styles.expiredText}>⏱️ {t.expiredNotice}</Text>
      ) : (
        <Text style={styles.timerText}>
          ⏳ {t.expiresIn} <Text style={styles.timeValue}>{formatCountdown(remainingSeconds)}</Text>
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: theme.spacing.sm,
    alignItems: 'center',
  },
  timerText: {
    ...theme.typography.caption,
    fontSize: 13,
    color: theme.colors.textSecondary,
    fontWeight: '500',
  },
  timeValue: {
    color: theme.colors.brandPrimary,
    fontWeight: '700',
  },
  expiredText: {
    ...theme.typography.caption,
    fontSize: 13,
    color: theme.colors.error,
    fontWeight: '600',
  },
});
