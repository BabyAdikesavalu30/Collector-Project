/**
 * LoginScreen Component (Screen 08 - Production Login)
 * Supports dual authentication pathways:
 * 1. Password Login (Identifier + Password)
 * 2. OTP Login (Identifier -> Send OTP)
 * Includes form validation, responsive keyboard handling, error boundaries,
 * and clean navigation handoffs to /register, /otp, and /forgot-password boundaries.
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
import { ScienceBackdrop } from '../splash/ScienceBackdrop';
import { AuthMode, FormValidationErrors, validateLoginForm } from '../../features/auth';
import { AuthModeSwitcher } from './AuthModeSwitcher';
import { AuthIdentifierInput } from './AuthIdentifierInput';
import { PasswordInput } from './PasswordInput';

interface LoginScreenProps {
  language?: SupportedLanguage;
  onSignInWithPassword: (credentials: { identifier: string; password: string }) => Promise<{ success: boolean; error?: string }>;
  onRequestOtp: (identifier: string) => Promise<{ success: boolean; error?: string }>;
  onForgotPassword: () => void;
  onCreateAccount: () => void;
  onBack: () => void;
  onAnalyticsEvent?: (eventName: string, params?: Record<string, unknown>) => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({
  language = 'en',
  onSignInWithPassword,
  onRequestOtp,
  onForgotPassword,
  onCreateAccount,
  onBack,
  onAnalyticsEvent,
}) => {
  const insets = useSafeAreaInsets();
  const t = getTranslation(language).auth.login;

  const [mode, setMode] = useState<AuthMode>('password');
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<FormValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
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
    onAnalyticsEvent?.('login_screen_viewed', { language, mode });
  }, [language, mode, onAnalyticsEvent]);

  const handleModeChange = (newMode: AuthMode) => {
    if (isSubmitting) return;
    setMode(newMode);
    setErrors({});
    setServerError(null);
    onAnalyticsEvent?.('login_mode_selected', { mode: newMode });
  };

  const handlePasswordSubmit = async () => {
    if (isSubmitting) return;
    setServerError(null);

    const validation = validateLoginForm('password', { identifier, password }, language);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);
    onAnalyticsEvent?.('login_signin_tapped');

    const result = await onSignInWithPassword({ identifier, password });
    setIsSubmitting(false);

    if (!result.success && result.error) {
      setServerError(result.error);
    }
  };

  const handleOtpSubmit = async () => {
    if (isSubmitting) return;
    setServerError(null);

    const validation = validateLoginForm('otp', { identifier }, language);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);
    onAnalyticsEvent?.('login_send_otp_tapped');

    const result = await onRequestOtp(identifier);
    setIsSubmitting(false);

    if (!result.success && result.error) {
      setServerError(result.error);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" translucent backgroundColor="transparent" />

      {/* Ambient Science Background */}
      <ScienceBackdrop isReduceMotion={isReduceMotion} />

      <KeyboardAvoidingView
        style={styles.keyboardAvoid}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          style={styles.scrollBody}
          contentContainerStyle={[
            styles.scrollContent,
            {
              paddingTop: Math.max(insets.top + 8, Platform.OS === 'android' ? 28 : 16),
              paddingBottom: Math.max(insets.bottom + 16, 24),
            },
          ]}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          {/* Top Bar: Back Action */}
          <View style={styles.topBar}>
            <AppBackButton
              onPress={onBack}
              language={language}
              accessibilityLabel={t.accessibility.backHint}
              accessibilityHint={t.accessibility.backHint}
              style={styles.backButton}
            />
          </View>

          {/* Header Branding & Welcome */}
          <View style={styles.headerContainer}>
            <View style={styles.atomIconContainer}>
              <Text style={styles.atomGlyph}>⚛</Text>
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

          {/* Form Card */}
          <View style={styles.formCard}>
            {/* Mode Switcher: Password | OTP */}
            <AuthModeSwitcher
              mode={mode}
              onModeChange={handleModeChange}
              language={language}
              disabled={isSubmitting}
            />

            {/* Field 1: Identifier (Email / Mobile) */}
            <AuthIdentifierInput
              value={identifier}
              onChangeText={(text) => {
                setIdentifier(text);
                if (errors.identifier) {
                  setErrors((prev) => ({ ...prev, identifier: undefined }));
                }
              }}
              error={errors.identifier}
              language={language}
              disabled={isSubmitting}
            />

            {/* PASSWORD MODE: Password input + Forgot Password */}
            {mode === 'password' && (
              <>
                <PasswordInput
                  value={password}
                  onChangeText={(text) => {
                    setPassword(text);
                    if (errors.password) {
                      setErrors((prev) => ({ ...prev, password: undefined }));
                    }
                  }}
                  error={errors.password}
                  language={language}
                  disabled={isSubmitting}
                />

                <TouchableOpacity
                  style={styles.forgotPasswordContainer}
                  onPress={onForgotPassword}
                  activeOpacity={0.7}
                  disabled={isSubmitting}
                  accessible={true}
                  accessibilityRole="button"
                  accessibilityLabel={t.forgotPassword}
                  accessibilityHint={t.accessibility.forgotPasswordHint}
                >
                  <Text style={styles.forgotPasswordText}>{t.forgotPassword}</Text>
                </TouchableOpacity>

                {/* Submit CTA: Sign In */}
                <TouchableOpacity
                  style={[styles.primaryButton, isSubmitting && styles.primaryButtonDisabled]}
                  onPress={handlePasswordSubmit}
                  activeOpacity={0.85}
                  disabled={isSubmitting}
                  accessible={true}
                  accessibilityRole="button"
                  accessibilityLabel={t.signIn}
                  accessibilityHint={t.accessibility.signInHint}
                >
                  {isSubmitting ? (
                    <ActivityIndicator color={theme.colors.textOnAction} size="small" />
                  ) : (
                    <Text style={styles.primaryButtonText}>{t.signIn}</Text>
                  )}
                </TouchableOpacity>
              </>
            )}

            {/* OTP MODE: Send OTP Information Banner + CTA */}
            {mode === 'otp' && (
              <>
                <View style={styles.otpNoticeBox}>
                  <Text style={styles.otpNoticeIcon}>ℹ️</Text>
                  <Text style={styles.otpNoticeText}>{t.otpMessage}</Text>
                </View>

                {/* Submit CTA: Send OTP */}
                <TouchableOpacity
                  style={[styles.primaryButton, isSubmitting && styles.primaryButtonDisabled]}
                  onPress={handleOtpSubmit}
                  activeOpacity={0.85}
                  disabled={isSubmitting}
                  accessible={true}
                  accessibilityRole="button"
                  accessibilityLabel={t.sendOtp}
                  accessibilityHint={t.accessibility.sendOtpHint}
                >
                  {isSubmitting ? (
                    <ActivityIndicator color={theme.colors.textOnAction} size="small" />
                  ) : (
                    <Text style={styles.primaryButtonText}>{t.sendOtp}</Text>
                  )}
                </TouchableOpacity>
              </>
            )}
          </View>

          {/* Footer: Create Account Link */}
          <View style={styles.footerContainer}>
            <Text style={styles.newUserText}>{t.newUser}</Text>
            <TouchableOpacity
              style={styles.createAccountButton}
              onPress={onCreateAccount}
              activeOpacity={0.7}
              disabled={isSubmitting}
              accessible={true}
              accessibilityRole="button"
              accessibilityLabel={t.createAccount}
              accessibilityHint={t.accessibility.createAccountHint}
            >
              <Text style={styles.createAccountText}>{t.createAccount}</Text>
            </TouchableOpacity>
          </View>
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
  keyboardAvoid: {
    flex: 1,
  },
  scrollBody: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: theme.spacing.base,
    alignItems: 'center',
  },
  topBar: {
    width: '100%',
    alignItems: 'flex-start',
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
  atomIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: theme.colors.purple100,
    borderWidth: 1,
    borderColor: theme.colors.purple200,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.xs,
  },
  atomGlyph: {
    color: theme.colors.brandPrimary,
    fontSize: 22,
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
    marginBottom: theme.spacing.sm,
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
  forgotPasswordContainer: {
    alignSelf: 'flex-end',
    paddingVertical: 6,
    paddingHorizontal: 4,
    marginBottom: theme.spacing.md,
  },
  forgotPasswordText: {
    ...theme.typography.caption,
    fontSize: 12.5,
    fontWeight: '600',
    color: theme.colors.actionPrimary,
  },
  otpNoticeBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.blue50,
    borderRadius: theme.borderRadius.sm,
    borderWidth: 1,
    borderColor: theme.colors.blue200,
    padding: theme.spacing.sm,
    marginBottom: theme.spacing.md,
  },
  otpNoticeIcon: {
    fontSize: 14,
    marginRight: 8,
  },
  otpNoticeText: {
    ...theme.typography.caption,
    fontSize: 12,
    color: theme.colors.actionPrimary,
    flex: 1,
    lineHeight: 16,
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
  newUserText: {
    ...theme.typography.body,
    fontSize: 14,
    color: theme.colors.slate600,
    marginRight: 6,
  },
  createAccountButton: {
    paddingVertical: 4,
    paddingHorizontal: 4,
  },
  createAccountText: {
    ...theme.typography.body,
    fontSize: 14,
    fontWeight: '700',
    color: theme.colors.actionPrimary,
    textDecorationLine: 'underline',
  },
});
