/**
 * OtpVerificationScreen Component (Screen 10 - Production OTP Verification)
 * Reusable verification screen supporting both Registration and Login OTP flows.
 * Handles 6-digit numeric input, 5-minute countdown expiry, 30s resend cooldown,
 * error state recovery, and accessible announcements.
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
  OtpContext,
  maskIdentifier,
  isValidOtp,
} from '../../features/auth';
import { OtpInput } from './OtpInput';
import { OtpTimer } from './OtpTimer';
import { ResendCodeButton } from './ResendCodeButton';

interface OtpVerificationScreenProps {
  context?: OtpContext;
  identifier?: string;
  language?: SupportedLanguage;
  initialExpiresAt?: number;
  onVerify: (code: string) => Promise<{ success: boolean; error?: string }>;
  onResend: () => Promise<{ success: boolean; error?: string; expiresAt?: number }>;
  onChangeIdentifier: () => void;
  onBack: () => void;
  onAnalyticsEvent?: (eventName: string, params?: Record<string, unknown>) => void;
}

export const OtpVerificationScreen: React.FC<OtpVerificationScreenProps> = ({
  context = 'register',
  identifier = '+91 9876543210',
  language = 'en',
  initialExpiresAt,
  onVerify,
  onResend,
  onChangeIdentifier,
  onBack,
  onAnalyticsEvent,
}) => {
  const insets = useSafeAreaInsets();
  const t = getTranslation(language).auth.otp;

  const [otpCode, setOtpCode] = useState('');
  const [expiresAt, setExpiresAt] = useState<number>(
    () => initialExpiresAt || Date.now() + 5 * 60 * 1000 // 5 minutes default
  );
  const [isExpired, setIsExpired] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successToast, setSuccessToast] = useState<string | null>(null);
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
    onAnalyticsEvent?.('otp_screen_viewed', { context, language });
  }, [context, language, onAnalyticsEvent]);

  const handleExpire = () => {
    setIsExpired(true);
    setErrorMessage(t.expiredOtp);
  };

  const handleResend = async () => {
    setIsResending(true);
    setErrorMessage(null);
    setSuccessToast(null);

    onAnalyticsEvent?.('otp_resend_tapped', { context });

    const result = await onResend();
    setIsResending(false);

    if (result.success) {
      setOtpCode('');
      setIsExpired(false);
      if (result.expiresAt) {
        setExpiresAt(result.expiresAt);
      } else {
        setExpiresAt(Date.now() + 5 * 60 * 1000);
      }
      setSuccessToast(t.newCodeSent);
      // Dismiss success toast after 3.5s
      setTimeout(() => setSuccessToast(null), 3500);
    } else if (result.error) {
      setErrorMessage(result.error);
    }
  };

  const handleVerify = async () => {
    if (!isValidOtp(otpCode) || isExpired || isVerifying) return;

    setErrorMessage(null);
    setSuccessToast(null);
    setIsVerifying(true);

    onAnalyticsEvent?.('otp_verify_tapped', { context });

    const result = await onVerify(otpCode);
    setIsVerifying(false);

    if (!result.success && result.error) {
      setErrorMessage(result.error);
    }
  };

  const titleText = context === 'register' ? t.titleRegister : t.titleLogin;
  const maskedDest = maskIdentifier(identifier);
  const isVerifyEnabled = otpCode.length === 6 && !isExpired && !isVerifying;

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
          {/* Top Bar: Back Action */}
          <View style={styles.topBar}>
            <AppBackButton
              onPress={onBack}
              language={language}
              accessibilityLabel={t.accessibility.backHint}
              style={styles.backButton}
            />
          </View>

          {/* Header Branding & Target Notice */}
          <View style={styles.headerContainer}>
            <View style={styles.lockIconContainer}>
              <Text style={styles.lockGlyph}>🔐</Text>
            </View>
            <Text style={styles.title}>{titleText}</Text>
            <Text style={styles.subtitle}>{t.subtitle}</Text>
            <View style={styles.destinationBadge}>
              <Text style={styles.destinationLabel}>{t.codeSentTo}: </Text>
              <Text style={styles.destinationValue}>{maskedDest}</Text>
            </View>
          </View>

          {/* Feedback Banners */}
          {Boolean(successToast) && (
            <View style={styles.successToast} accessible={true} accessibilityRole="alert">
              <Text style={styles.successToastText}>✓ {successToast}</Text>
            </View>
          )}

          {Boolean(errorMessage) && (
            <View style={styles.errorBanner} accessible={true} accessibilityRole="alert">
              <Text style={styles.errorBannerText}>⚠️ {errorMessage}</Text>
            </View>
          )}

          {/* Main Verification Card */}
          <View style={styles.verificationCard}>
            {/* 6-Digit Numeric Cell Input */}
            <OtpInput
              value={otpCode}
              onChangeText={(val: string) => {
                setOtpCode(val);
                if (errorMessage) setErrorMessage(null);
              }}
              hasError={Boolean(errorMessage)}
              disabled={isVerifying || isExpired}
            />

            {/* Countdown Expiry Timer */}
            <OtpTimer
              expiresAt={expiresAt}
              onExpire={handleExpire}
              language={language}
            />

            {/* Resend Action with Cooldown */}
            <ResendCodeButton
              onResend={handleResend}
              isResending={isResending}
              language={language}
              disabled={isVerifying}
            />

            {/* Verify CTA */}
            <TouchableOpacity
              style={[
                styles.primaryButton,
                !isVerifyEnabled && styles.primaryButtonDisabled,
              ]}
              onPress={handleVerify}
              activeOpacity={0.85}
              disabled={!isVerifyEnabled}
              accessible={true}
              accessibilityRole="button"
              accessibilityLabel={isVerifying ? t.verifying : t.verify}
              accessibilityHint={t.accessibility.verifyHint}
            >
              {isVerifying ? (
                <ActivityIndicator color={theme.colors.textOnAction} size="small" />
              ) : (
                <Text style={styles.primaryButtonText}>{t.verify}</Text>
              )}
            </TouchableOpacity>
          </View>

          {/* Footer: Change Identifier */}
          <View style={styles.footerContainer}>
            <TouchableOpacity
              style={styles.changeButton}
              onPress={onChangeIdentifier}
              activeOpacity={0.7}
              disabled={isVerifying}
              accessible={true}
              accessibilityRole="button"
              accessibilityLabel={t.changeIdentifier}
              accessibilityHint={t.accessibility.changeIdentifierHint}
            >
              <Text style={styles.changeButtonText}>{t.changeIdentifier}</Text>
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
    marginBottom: theme.spacing.xs,
  },
  destinationBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.blue50,
    borderWidth: 1,
    borderColor: theme.colors.blue200,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: theme.borderRadius.full,
    marginTop: 4,
  },
  destinationLabel: {
    ...theme.typography.caption,
    fontSize: 12,
    color: theme.colors.slate600,
  },
  destinationValue: {
    ...theme.typography.caption,
    fontSize: 12,
    fontWeight: '700',
    color: theme.colors.actionPrimary,
  },
  successToast: {
    width: '100%',
    backgroundColor: theme.colors.successSurface,
    borderWidth: 1,
    borderColor: theme.colors.successBorder,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.sm,
    marginBottom: theme.spacing.sm,
    alignItems: 'center',
  },
  successToastText: {
    ...theme.typography.caption,
    color: theme.colors.success,
    fontWeight: '700',
    textAlign: 'center',
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
  verificationCard: {
    width: '100%',
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: theme.spacing.base,
    alignItems: 'center',
    marginTop: theme.spacing.xs,
    shadowColor: theme.colors.navy900,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
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
    marginTop: theme.spacing.md,
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
  footerContainer: {
    alignItems: 'center',
    marginTop: theme.spacing.lg,
    paddingBottom: theme.spacing.md,
  },
  changeButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  changeButtonText: {
    ...theme.typography.body,
    fontSize: 13.5,
    fontWeight: '600',
    color: theme.colors.actionPrimary,
    textDecorationLine: 'underline',
  },
});
