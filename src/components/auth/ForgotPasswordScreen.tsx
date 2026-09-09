/**
 * ForgotPasswordScreen Component (Screen 11 - Production Forgot Password)
 * Minimal-friction, privacy-preserving account recovery screen.
 * Validates email/mobile identifier, provides loading & error states,
 * presents non-enumerating generic confirmation, and connects to /reset-password boundary.
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  AccessibilityInfo,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { theme } from '../../theme';
import { SupportedLanguage, getTranslation } from '../../config/i18n';
import { AppBackButton } from '../navigation';
import { LanguageToggle } from '../language/LanguageToggle';
import { ScienceBackdrop } from '../splash/ScienceBackdrop';
import { validateIdentifier } from '../../features/auth';
import { AuthIdentifierInput } from './AuthIdentifierInput';

interface ForgotPasswordScreenProps {
  language?: SupportedLanguage;
  onRequestRecovery: (identifier: string) => Promise<{ success: boolean; error?: string }>;
  onProceedToReset: () => void;
  onSignInPress: () => void;
  onBack: () => void;
  onAnalyticsEvent?: (eventName: string, params?: Record<string, unknown>) => void;
}

export const ForgotPasswordScreen: React.FC<ForgotPasswordScreenProps> = ({
  language = 'en',
  onRequestRecovery,
  onProceedToReset,
  onSignInPress,
  onBack,
  onAnalyticsEvent,
}) => {
  const insets = useSafeAreaInsets();
  const t = getTranslation(language).auth.forgotPassword;

  const [identifier, setIdentifier] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isReduceMotion, setIsReduceMotion] = useState(false);

  // Reduced motion detection
  useEffect(() => {
    AccessibilityInfo.isReduceMotionEnabled()
      .then((enabled) => setIsReduceMotion(Boolean(enabled)))
      .catch(() => setIsReduceMotion(false));

    const subscription = AccessibilityInfo.addEventListener(
      'reduceMotionChanged',
      (enabled) => setIsReduceMotion(Boolean(enabled))
    );

    return () => {
      subscription?.remove();
    };
  }, []);

  // Telemetry on mount
  useEffect(() => {
    onAnalyticsEvent?.('forgot_password_viewed', { language });
  }, [language, onAnalyticsEvent]);

  const handleSubmit = async () => {
    if (isSubmitting) return;
    setServerError(null);

    const validationError = validateIdentifier(identifier, language);
    if (validationError) {
      setError(validationError);
      onAnalyticsEvent?.('forgot_password_validation_failed');
      return;
    }

    setError(null);
    setIsSubmitting(true);
    onAnalyticsEvent?.('forgot_password_submitted');

    const result = await onRequestRecovery(identifier);
    setIsSubmitting(false);

    if (result.success) {
      setIsSuccess(true);
      onAnalyticsEvent?.('forgot_password_success_state');
    } else if (result.error) {
      setServerError(result.error);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" translucent backgroundColor="transparent" />

      <KeyboardAvoidingView
        style={styles.keyboardContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          style={styles.scrollBody}
          contentContainerStyle={[
            styles.scrollContent,
            {
              paddingTop: Math.max(insets.top + 8, Platform.OS === 'android' ? 28 : 16),
              paddingBottom: Math.max(insets.bottom + 16, 28),
            },
          ]}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          {/* Top Bar: Back Action & Language Toggle */}
          <View style={styles.topBar}>
            <AppBackButton
              onPress={onBack}
              language={language}
              accessibilityLabel={t.accessibility.backHint}
              style={styles.backButton}
            />
            <LanguageToggle />
          </View>

          {/* Header Branding & Key Visual */}
          <View style={styles.headerContainer}>
            <View style={styles.keyIconContainer}>
              <Text style={styles.keyGlyph}>🔑</Text>
            </View>
            <View style={styles.badgePill}>
              <View style={styles.badgeDot} />
              <Text style={styles.badgeText}>{t.badge}</Text>
            </View>
            <Text style={styles.title}>{t.title}</Text>
            <Text style={styles.subtitle}>{t.subtitle}</Text>
          </View>

          {/* Server / Network Error Alert */}
          {Boolean(serverError) && (
            <View style={styles.errorBanner} accessible={true} accessibilityRole="alert">
              <Text style={styles.errorBannerText}>⚠️ {serverError}</Text>
            </View>
          )}

          {/* SUCCESS STATE CARD */}
          {isSuccess ? (
            <View style={styles.successCard} accessible={true} accessibilityRole="alert">
              <View style={styles.successIconBadge}>
                <Text style={styles.successCheckGlyph}>✓</Text>
              </View>
              <Text style={styles.successTitle}>{t.successTitle}</Text>
              <Text style={styles.successMessage}>
                {t.successMessage.replace('{destination}', identifier)}
              </Text>

              {/* Action: Proceed to Reset / Verify */}
              <TouchableOpacity
                style={styles.primaryButton}
                onPress={onProceedToReset}
                activeOpacity={0.85}
                accessible={true}
                accessibilityRole="button"
                accessibilityLabel={t.proceedToReset}
              >
                <Text style={styles.primaryButtonText}>{t.proceedToReset}</Text>
              </TouchableOpacity>
            </View>
          ) : (
            /* FORM INPUT CARD */
            <View style={styles.formCard}>
              {/* Identifier Input */}
              <AuthIdentifierInput
                value={identifier}
                onChangeText={(text) => {
                  setIdentifier(text);
                  if (error) setError(null);
                }}
                error={error}
                language={language}
                disabled={isSubmitting}
              />

              {/* Submit CTA: Send Recovery Code */}
              <TouchableOpacity
                style={[styles.primaryButton, isSubmitting && styles.primaryButtonDisabled]}
                onPress={handleSubmit}
                activeOpacity={0.85}
                disabled={isSubmitting}
                accessible={true}
                accessibilityRole="button"
                accessibilityLabel={isSubmitting ? t.sending : t.sendCode}
                accessibilityHint={t.accessibility.submitHint}
              >
                {isSubmitting ? (
                  <ActivityIndicator color={theme.colors.textOnAction} size="small" />
                ) : (
                  <Text style={styles.primaryButtonText}>{t.sendCode}</Text>
                )}
              </TouchableOpacity>
            </View>
          )}

          {/* Footer: Remember Password? Sign In */}
          {!isSuccess && (
            <View style={styles.footerContainer}>
              <Text style={styles.rememberText}>{t.rememberPassword}</Text>
              <TouchableOpacity
                style={styles.signInButton}
                onPress={onSignInPress}
                activeOpacity={0.7}
                disabled={isSubmitting}
                accessible={true}
                accessibilityRole="button"
                accessibilityLabel={t.signIn}
                accessibilityHint={t.accessibility.signInHint}
              >
                <Text style={styles.signInText}>{t.signIn}</Text>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.pearlWhite,
  },
  keyboardContainer: {
    flex: 1,
  },
  scrollBody: {
    flex: 1,
  },
  scrollContent: {
    alignItems: 'center',
    paddingHorizontal: theme.spacing.base,
  },
  topBar: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.xs,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: theme.colors.white,
    borderWidth: 1,
    borderColor: theme.colors.border,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: theme.colors.navy900,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  backArrow: {
    color: theme.colors.navy900,
    fontSize: 20,
    fontWeight: '700',
  },
  headerContainer: {
    alignItems: 'center',
    marginVertical: theme.spacing.sm,
  },
  keyIconContainer: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: theme.colors.purple100,
    borderWidth: 1.5,
    borderColor: theme.colors.purple200,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.xs,
  },
  keyGlyph: {
    fontSize: 24,
  },
  badgePill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.purple100,
    borderWidth: 1,
    borderColor: theme.colors.purple200,
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: theme.borderRadius.full,
    marginBottom: theme.spacing.xs,
  },
  badgeDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: theme.colors.brandPrimary,
    marginRight: 6,
  },
  badgeText: {
    ...theme.typography.overline,
    fontSize: 9.5,
    color: theme.colors.brandPrimary,
    letterSpacing: 1.2,
    fontWeight: '700',
  },
  title: {
    ...theme.typography.h1,
    fontSize: 24,
    lineHeight: 32,
    color: theme.colors.navy900,
    textAlign: 'center',
    marginBottom: 4,
  },
  subtitle: {
    ...theme.typography.body,
    fontSize: 13.5,
    color: theme.colors.slate600,
    textAlign: 'center',
    maxWidth: 290,
  },
  errorBanner: {
    width: '100%',
    backgroundColor: theme.colors.errorSurface,
    borderWidth: 1,
    borderColor: theme.colors.errorBorder,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.sm,
    marginBottom: theme.spacing.md,
    alignItems: 'center',
  },
  errorBannerText: {
    ...theme.typography.caption,
    color: theme.colors.error,
    fontWeight: '600',
    textAlign: 'center',
  },
  formCard: {
    width: '100%',
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: theme.spacing.base,
    marginTop: theme.spacing.xs,
    shadowColor: theme.colors.navy900,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  successCard: {
    width: '100%',
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1.5,
    borderColor: theme.colors.successBorder,
    padding: theme.spacing.lg,
    alignItems: 'center',
    marginTop: theme.spacing.xs,
    shadowColor: theme.colors.navy900,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  successIconBadge: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: theme.colors.successSurface,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  successCheckGlyph: {
    fontSize: 22,
    color: theme.colors.success,
    fontWeight: '900',
  },
  successTitle: {
    ...theme.typography.h3,
    fontSize: 17,
    fontWeight: '700',
    color: theme.colors.navy900,
    textAlign: 'center',
    marginBottom: 6,
  },
  successMessage: {
    ...theme.typography.body,
    fontSize: 13,
    color: theme.colors.slate600,
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: theme.spacing.md,
  },
  primaryButton: {
    width: '100%',
    height: 52,
    backgroundColor: theme.colors.actionPrimary,
    borderRadius: theme.borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: theme.colors.actionPrimary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 3,
    marginTop: theme.spacing.sm,
  },
  primaryButtonDisabled: {
    opacity: 0.65,
  },
  primaryButtonText: {
    ...theme.typography.button,
    color: theme.colors.textOnAction,
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  footerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: theme.spacing.lg,
    paddingBottom: theme.spacing.md,
  },
  rememberText: {
    ...theme.typography.body,
    fontSize: 14,
    color: theme.colors.slate600,
    marginRight: 6,
  },
  signInButton: {
    paddingVertical: 4,
    paddingHorizontal: 4,
  },
  signInText: {
    ...theme.typography.body,
    fontSize: 14,
    fontWeight: '700',
    color: theme.colors.actionPrimary,
    textDecorationLine: 'underline',
  },
});
