/**
 * ResetPasswordScreen Component (Screen 12 - Production Reset Password)
 * Clean, accessible password update screen with real-time match validation,
 * password visibility controls, success state, and session-expired recovery handling.
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
import {
  PasswordResetValidationErrors,
  validatePasswordResetForm,
} from '../../features/auth';
import { PasswordInput } from './PasswordInput';

interface ResetPasswordScreenProps {
  language?: SupportedLanguage;
  onResetPassword: (passwords: { newPassword: string; confirmPassword: string }) => Promise<{
    success: boolean;
    sessionExpired?: boolean;
    error?: string;
  }>;
  onContinueToLogin: () => void;
  onStartAgain: () => void;
  onBack: () => void;
  onAnalyticsEvent?: (eventName: string, params?: Record<string, unknown>) => void;
}

export const ResetPasswordScreen: React.FC<ResetPasswordScreenProps> = ({
  language = 'en',
  onResetPassword,
  onContinueToLogin,
  onStartAgain,
  onBack,
  onAnalyticsEvent,
}) => {
  const insets = useSafeAreaInsets();
  const t = getTranslation(language).auth.resetPassword;

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<PasswordResetValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSessionExpired, setIsSessionExpired] = useState(false);
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
    onAnalyticsEvent?.('reset_password_viewed', { language });
  }, [language, onAnalyticsEvent]);

  // Real-time helper flags
  const isMinLengthMet = newPassword.length >= 6;
  const isConfirmFilled = confirmPassword.length > 0;
  const doPasswordsMatch = isConfirmFilled && newPassword === confirmPassword;
  const isMismatch = isConfirmFilled && newPassword !== confirmPassword;
  const isFormSubmittable = isMinLengthMet && doPasswordsMatch && !isSubmitting;

  const handleSubmit = async () => {
    if (!isFormSubmittable) return;
    setServerError(null);

    const validation = validatePasswordResetForm(newPassword, confirmPassword, language);
    if (!validation.isValid) {
      setErrors(validation.errors);
      onAnalyticsEvent?.('reset_password_validation_failed');
      return;
    }

    setErrors({});
    setIsSubmitting(true);
    onAnalyticsEvent?.('reset_password_submitted');

    const result = await onResetPassword({ newPassword, confirmPassword });
    setIsSubmitting(false);

    if (result.success) {
      setIsSuccess(true);
      onAnalyticsEvent?.('reset_password_success');
    } else if (result.sessionExpired) {
      setIsSessionExpired(true);
      onAnalyticsEvent?.('reset_password_session_expired');
    } else if (result.error) {
      setServerError(result.error);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" translucent backgroundColor="transparent" />

      <ScienceBackdrop isReduceMotion={isReduceMotion} />

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
          <View style={styles.topBar}>
            <AppBackButton
              onPress={onBack}
              language={language}
              accessibilityLabel={t.accessibility.backHint}
              style={styles.backButton}
            />
          </View>

          <View style={styles.headerContainer}>
            <View style={styles.lockIconContainer}>
              <Text style={styles.lockGlyph}>🔐</Text>
            </View>
            <View style={styles.badgePill}>
              <View style={styles.badgeDot} />
              <Text style={styles.badgeText}>{t.badge}</Text>
            </View>
            <Text style={styles.title}>{t.title}</Text>
            <Text style={styles.subtitle}>{t.subtitle}</Text>
          </View>

          {Boolean(serverError) && (
            <View style={styles.errorBanner} accessible={true} accessibilityRole="alert">
              <Text style={styles.errorBannerText}>⚠️ {serverError}</Text>
            </View>
          )}

          {isSessionExpired ? (
            <View style={styles.expiredCard} accessible={true} accessibilityRole="alert">
              <View style={styles.expiredIconBadge}>
                <Text style={styles.expiredClockGlyph}>⏱️</Text>
              </View>
              <Text style={styles.expiredTitle}>{t.sessionExpiredTitle}</Text>
              <Text style={styles.expiredMessage}>{t.sessionExpiredMessage}</Text>

              <TouchableOpacity
                style={styles.primaryButton}
                onPress={onStartAgain}
                activeOpacity={0.85}
                accessible={true}
                accessibilityRole="button"
                accessibilityLabel={t.startAgain}
              >
                <Text style={styles.primaryButtonText}>{t.startAgain}</Text>
              </TouchableOpacity>
            </View>
          ) : isSuccess ? (
            <View style={styles.successCard} accessible={true} accessibilityRole="summary">
              <View style={styles.successIconBadge}>
                <Text style={styles.successCheckGlyph}>✓</Text>
              </View>
              <Text style={styles.successTitle}>{t.successTitle}</Text>
              <Text style={styles.successMessage}>{t.successMessage}</Text>

              <TouchableOpacity
                style={styles.primaryButton}
                onPress={onContinueToLogin}
                activeOpacity={0.85}
                accessible={true}
                accessibilityRole="button"
                accessibilityLabel={t.continueToLogin}
              >
                <Text style={styles.primaryButtonText}>{t.continueToLogin}</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.formCard}>
              <PasswordInput
                value={newPassword}
                onChangeText={(val) => {
                  setNewPassword(val);
                  if (errors.newPassword) setErrors((prev) => ({ ...prev, newPassword: undefined }));
                }}
                error={errors.newPassword}
                language={language}
                disabled={isSubmitting}
              />

              <View style={styles.guidanceBox}>
                <View style={styles.guidanceRow}>
                  <Text style={[styles.guidanceBullet, isMinLengthMet && styles.guidanceBulletMet]}>
                    {isMinLengthMet ? '✓' : '•'}
                  </Text>
                  <Text style={[styles.guidanceText, isMinLengthMet && styles.guidanceTextMet]}>
                    {t.passwordMinLength}
                  </Text>
                </View>
              </View>

              <PasswordInput
                value={confirmPassword}
                onChangeText={(val) => {
                  setConfirmPassword(val);
                  if (errors.confirmPassword) setErrors((prev) => ({ ...prev, confirmPassword: undefined }));
                }}
                error={errors.confirmPassword}
                language={language}
                disabled={isSubmitting}
              />

              {isConfirmFilled && (
                <View style={styles.guidanceBox}>
                  <View style={styles.guidanceRow}>
                    <Text
                      style={[
                        styles.guidanceBullet,
                        doPasswordsMatch ? styles.guidanceBulletMet : styles.guidanceBulletMismatch,
                      ]}
                    >
                      {doPasswordsMatch ? '✓' : '✕'}
                    </Text>
                    <Text
                      style={[
                        styles.guidanceText,
                        doPasswordsMatch ? styles.guidanceTextMet : styles.guidanceTextMismatch,
                      ]}
                    >
                      {doPasswordsMatch ? t.passwordMatch : t.passwordMismatch}
                    </Text>
                  </View>
                </View>
              )}

              <TouchableOpacity
                style={[styles.primaryButton, isSubmitting && styles.primaryButtonDisabled]}
                onPress={handleSubmit}
                activeOpacity={0.85}
                disabled={isSubmitting}
                accessible={true}
                accessibilityRole="button"
                accessibilityLabel={isSubmitting ? t.updating : t.update}
                accessibilityHint={t.accessibility.submitHint}
              >
                {isSubmitting ? (
                  <ActivityIndicator color={theme.colors.textOnAction} size="small" />
                ) : (
                  <Text style={styles.primaryButtonText}>{t.update}</Text>
                )}
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
  lockIconContainer: {
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
  lockGlyph: {
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
  guidanceBox: {
    backgroundColor: theme.colors.gray100,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.sm,
    marginVertical: theme.spacing.sm,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  guidanceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 2,
  },
  guidanceBullet: {
    fontSize: 13,
    color: theme.colors.slate500,
    width: 18,
    fontWeight: '800',
  },
  guidanceBulletMet: {
    color: theme.colors.success,
  },
  guidanceBulletMismatch: {
    color: theme.colors.error,
  },
  guidanceText: {
    ...theme.typography.caption,
    fontSize: 12,
    color: theme.colors.slate600,
  },
  guidanceTextMet: {
    color: theme.colors.success,
    fontWeight: '600',
  },
  guidanceTextMismatch: {
    color: theme.colors.error,
    fontWeight: '600',
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
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: theme.colors.successSurface,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  successCheckGlyph: {
    fontSize: 24,
    color: theme.colors.success,
    fontWeight: '900',
  },
  successTitle: {
    ...theme.typography.h3,
    fontSize: 18,
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
  expiredCard: {
    width: '100%',
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1.5,
    borderColor: theme.colors.errorBorder,
    padding: theme.spacing.lg,
    alignItems: 'center',
    marginTop: theme.spacing.xs,
    shadowColor: theme.colors.navy900,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  expiredIconBadge: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: theme.colors.errorSurface,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  expiredClockGlyph: {
    fontSize: 24,
  },
  expiredTitle: {
    ...theme.typography.h3,
    fontSize: 18,
    fontWeight: '700',
    color: theme.colors.error,
    textAlign: 'center',
    marginBottom: 6,
  },
  expiredMessage: {
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
    opacity: 0.5,
  },
  primaryButtonText: {
    ...theme.typography.button,
    color: theme.colors.textOnAction,
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
});
