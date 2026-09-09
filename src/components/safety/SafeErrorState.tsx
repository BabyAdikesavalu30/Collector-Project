/**
 * SafeErrorState Component
 * Non-technical, non-judgmental error state for students.
 * Never exposes raw errors, stack traces, or internal details.
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { theme } from '../../theme';

interface SafeErrorStateProps {
  title?: string;
  subtitle?: string;
  icon?: string;
  onRetry?: () => void;
  onBack?: () => void;
}

export const SafeErrorState: React.FC<SafeErrorStateProps> = ({
  title = 'Something went wrong',
  subtitle = 'Please try again in a moment.',
  icon = '⚠️',
  onRetry,
  onBack,
}) => {
  return (
    <View style={styles.container} accessible accessibilityRole="alert">
      <Text style={styles.icon}>{icon}</Text>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
      <View style={styles.buttonRow}>
        {onBack && (
          <TouchableOpacity
            style={styles.button}
            onPress={onBack}
            accessibilityRole="button"
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>Go Back</Text>
          </TouchableOpacity>
        )}
        {onRetry && (
          <TouchableOpacity
            style={[styles.button, styles.primaryButton]}
            onPress={onRetry}
            accessibilityRole="button"
            activeOpacity={0.8}
          >
            <Text style={[styles.buttonText, styles.primaryButtonText]}>Try Again</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing.xl,
    backgroundColor: theme.colors.pearlWhite,
  },
  icon: {
    fontSize: 48,
    marginBottom: 16,
  },
  title: {
    ...theme.typography.h2,
    fontSize: 18,
    fontWeight: '800',
    color: theme.colors.navy900,
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    ...theme.typography.body,
    fontSize: 14,
    color: theme.colors.slate600,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 24,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: theme.borderRadius.md,
    backgroundColor: theme.colors.gray100,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  primaryButton: {
    backgroundColor: theme.colors.actionPrimary,
    borderColor: theme.colors.actionPrimary,
  },
  buttonText: {
    ...theme.typography.button,
    fontSize: 14,
    fontWeight: '700',
    color: theme.colors.navy900,
  },
  primaryButtonText: {
    color: theme.colors.textOnAction,
  },
});
