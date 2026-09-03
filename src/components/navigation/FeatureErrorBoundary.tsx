/**
 * FeatureErrorBoundary Component
 * Catches render-time errors thrown inside any feature screen rendered within
 * the AppShell and shows a graceful, localized fallback instead of crashing the
 * whole app. The global 4-tab bottom navigation stays alive so the user can
 * always navigate away and recover.
 */

import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { theme } from '../../theme';
import { SupportedLanguage } from '../../config/i18n';

interface FeatureErrorBoundaryProps {
  children: React.ReactNode;
  language?: SupportedLanguage;
}

interface FeatureErrorBoundaryState {
  hasError: boolean;
}

const FALLBACK_COPY: Record<SupportedLanguage, { title: string; message: string; retry: string }> = {
  en: {
    title: 'Something went wrong',
    message: 'This screen hit an unexpected problem. Your progress is safe — try again or use the navigation below.',
    retry: 'Try Again',
  },
  ta: {
    title: 'ஏதோ தவறு ஏற்பட்டது',
    message: 'இந்தத் திரையில் எதிர்பாராத சிக்கல் ஏற்பட்டது. உங்கள் முன்னேற்றம் பாதுகாப்பாக உள்ளது — மீண்டும் முயற்சிக்கவும் அல்லது கீழே உள்ள வழிசெலுத்தலைப் பயன்படுத்தவும்.',
    retry: 'மீண்டும் முயற்சிக்கவும்',
  },
};

export class FeatureErrorBoundary extends React.Component<
  FeatureErrorBoundaryProps,
  FeatureErrorBoundaryState
> {
  state: FeatureErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): FeatureErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: unknown): void {
    // Deliberately surface the failure for developers only; never include
    // credentials, tokens or other sensitive data in this report.
    console.warn('[FeatureErrorBoundary] Screen crashed:', error instanceof Error ? error.message : error);
  }

  private handleRetry = (): void => {
    this.setState({ hasError: false });
  };

  render(): React.ReactNode {
    if (this.state.hasError) {
      const copy = FALLBACK_COPY[this.props.language ?? 'en'];
      return (
        <View style={styles.container} accessibilityRole="alert">
          <Text style={styles.title}>{copy.title}</Text>
          <Text style={styles.message}>{copy.message}</Text>
          <TouchableOpacity
            style={styles.retryButton}
            onPress={this.handleRetry}
            accessibilityRole="button"
            accessibilityLabel={copy.retry}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Text style={styles.retryText}>{copy.retry}</Text>
          </TouchableOpacity>
        </View>
      );
    }
    return this.props.children;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: theme.spacing.xl,
    backgroundColor: theme.colors.backgroundPrimary,
  },
  title: {
    ...theme.typography.h2,
    color: theme.colors.textPrimary,
    textAlign: 'center',
    marginBottom: theme.spacing.sm,
  },
  message: {
    ...theme.typography.body,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    marginBottom: theme.spacing.lg,
  },
  retryButton: {
    minHeight: 44,
    minWidth: 44,
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.md,
    backgroundColor: theme.colors.actionPrimary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  retryText: {
    color: theme.colors.textOnAction,
    fontSize: 16,
    fontWeight: '600',
  },
});
