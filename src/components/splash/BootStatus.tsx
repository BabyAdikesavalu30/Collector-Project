/**
 * BootStatus Component
 * Handles the bottom loading treatment, slow-boot feedback, and recoverable error state.
 * Fully accessible with screen reader updates and high-contrast touch targets.
 */

import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Easing,
  AccessibilityProps,
} from 'react-native';
import { theme } from '../../theme';
import { BootstrapStatus } from '../../services/bootstrap/types';
import { getTranslation } from '../../config/i18n';

interface BootStatusProps extends AccessibilityProps {
  status: BootstrapStatus;
  onRetry: () => void;
  isReduceMotion?: boolean;
}

export const BootStatus: React.FC<BootStatusProps> = ({
  status,
  onRetry,
  isReduceMotion = false,
}) => {
  const t = getTranslation('en').splash;
  const progressAnim = useRef(new Animated.Value(0.15)).current;
  const pulseAnim = useRef(new Animated.Value(0.6)).current;

  useEffect(() => {
    if (status === 'error') return;

    if (isReduceMotion) {
      progressAnim.setValue(status === 'ready' ? 1 : 0.6);
      return;
    }

    if (status === 'initializing' || status === 'restoring') {
      Animated.timing(progressAnim, {
        toValue: 0.75,
        duration: 1800,
        easing: Easing.out(Easing.quad),
        useNativeDriver: false,
      }).start();

      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 0.5,
            duration: 800,
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else if (status === 'slow') {
      Animated.timing(progressAnim, {
        toValue: 0.9,
        duration: 1200,
        easing: Easing.out(Easing.quad),
        useNativeDriver: false,
      }).start();
    } else if (status === 'ready') {
      Animated.timing(progressAnim, {
        toValue: 1,
        duration: 300,
        easing: Easing.linear,
        useNativeDriver: false,
      }).start();
    }
  }, [status, isReduceMotion, progressAnim, pulseAnim]);

  if (status === 'error') {
    return (
      <View
        style={styles.errorContainer}
        accessible={true}
        accessibilityRole="alert"
        accessibilityLabel={t.errorMessage}
      >
        <Text style={styles.errorText}>{t.errorMessage}</Text>
        <TouchableOpacity
          style={styles.retryButton}
          onPress={onRetry}
          activeOpacity={0.8}
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel={t.retryButton}
          accessibilityHint="Retries preparing the application"
        >
          <Text style={styles.retryButtonText}>{t.retryButton}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const progressWidth = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <View
      style={styles.container}
      accessible={true}
      accessibilityRole="progressbar"
      accessibilityLabel={status === 'slow' ? t.slowBootMessage : t.preparingApp}
    >
      {/* Loading Progress Track */}
      <View style={styles.progressBarTrack}>
        <Animated.View
          style={[
            styles.progressBarFill,
            {
              width: progressWidth,
            },
          ]}
        />
      </View>

      {/* Status Caption */}
      <Animated.View style={{ opacity: isReduceMotion ? 1 : pulseAnim }}>
        <Text style={styles.statusText}>
          {status === 'slow' ? t.slowBootMessage : t.preparingApp}
        </Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingHorizontal: theme.spacing.xl,
  },
  progressBarTrack: {
    width: 140,
    height: 3.5,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: theme.borderRadius.full,
    overflow: 'hidden',
    marginBottom: theme.spacing.sm,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: theme.colors.brandPrimary,
    borderRadius: theme.borderRadius.full,
    shadowColor: theme.colors.brandPrimary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius: 6,
  },
  statusText: {
    ...theme.typography.caption,
    color: theme.colors.textMuted,
    letterSpacing: 0.4,
    textAlign: 'center',
  },
  errorContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.errorSurface,
    borderWidth: 1,
    borderColor: theme.colors.errorBorder,
    borderRadius: theme.borderRadius.md,
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.base,
    maxWidth: 320,
    alignSelf: 'center',
  },
  errorText: {
    ...theme.typography.body,
    color: theme.colors.textPrimary,
    textAlign: 'center',
    marginBottom: theme.spacing.md,
    fontWeight: '500',
  },
  retryButton: {
    backgroundColor: theme.colors.brandPrimary,
    paddingHorizontal: theme.spacing.xl,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.full,
    minHeight: 44,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: theme.colors.brandPrimary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 3,
  },
  retryButtonText: {
    ...theme.typography.body,
    color: theme.colors.textOnBrand,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
});
