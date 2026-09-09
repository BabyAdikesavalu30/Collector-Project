/**
 * RegistrationScreen Component (Screen 09 - Production Student Registration)
 * Features progressive section organization:
 * 1. Personal & Contact (Full Name, Mobile, Email)
 * 2. Academic Details (GradePicker, SectionPicker, School, City)
 * 3. Security (Password, Confirm Password)
 * 4. Legal (Terms & Conditions Checkbox)
 * Includes form validation, responsive keyboard handling, and handoff to Screen 10 /otp boundary.
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
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
import {
  RegistrationFormData,
  RegistrationValidationErrors,
  validateRegistrationForm,
} from '../../features/auth';
import { GradePicker } from './GradePicker';
import { SectionPicker } from './SectionPicker';
import { TermsCheckbox } from './TermsCheckbox';

interface RegistrationScreenProps {
  language?: SupportedLanguage;
  onSubmitRegistration: (data: RegistrationFormData) => Promise<{ success: boolean; error?: string }>;
  onSignInPress: () => void;
  onBack: () => void;
  onAnalyticsEvent?: (eventName: string, params?: Record<string, unknown>) => void;
}

export const RegistrationScreen: React.FC<RegistrationScreenProps> = ({
  language = 'en',
  onSubmitRegistration,
  onSignInPress,
  onBack,
  onAnalyticsEvent,
}) => {
  const insets = useSafeAreaInsets();
  const t = getTranslation(language).auth.register;

  // Form State
  const [formData, setFormData] = useState<RegistrationFormData>({
    fullName: '',
    mobile: '',
    email: '',
    grade: '',
    section: '',
    school: '',
    city: '',
    password: '',
    confirmPassword: '',
    acceptedTerms: false,
  });

  const [errors, setErrors] = useState<RegistrationValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);
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
    onAnalyticsEvent?.('register_screen_viewed', { language });
  }, [language, onAnalyticsEvent]);

  const updateField = (field: keyof RegistrationFormData, value: unknown) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field as keyof RegistrationValidationErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async () => {
    if (isSubmitting) return;
    setServerError(null);

    const validation = validateRegistrationForm(formData, language);
    if (!validation.isValid) {
      setErrors(validation.errors);
      onAnalyticsEvent?.('register_form_validation_failed');
      return;
    }

    setErrors({});
    setIsSubmitting(true);
    onAnalyticsEvent?.('register_create_account_tapped');

    const result = await onSubmitRegistration(formData);
    setIsSubmitting(false);

    if (!result.success && result.error) {
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
          {/* TOP BAR: BACK ACTION & LANGUAGE TOGGLE */}
          <View style={styles.topBar}>
            <AppBackButton
              onPress={onBack}
              language={language}
              accessibilityLabel={t.accessibility.backHint}
              style={styles.backButton}
            />
            <LanguageToggle />
          </View>

          {/* HEADER BRANDING & INITIATIVE */}
          <View style={styles.headerContainer}>
            <View style={styles.badgePill}>
              <View style={styles.badgeDot} />
              <Text style={styles.badgeText}>{t.badge}</Text>
            </View>
            <Text style={styles.title}>{t.title}</Text>
            <Text style={styles.subtitle}>{t.subtitle}</Text>
          </View>

          {/* SERVER / NETWORK ERROR ALERT */}
          {Boolean(serverError) && (
            <View style={styles.errorBanner} accessible={true} accessibilityRole="alert">
              <Text style={styles.errorBannerText}>⚠️ {serverError}</Text>
            </View>
          )}

          {/* SECTION 1: PERSONAL INFORMATION */}
          <View style={styles.sectionCard}>
            <Text style={styles.sectionTitle}>{t.personalSection}</Text>

            {/* Full Name */}
            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>{t.fullName}</Text>
              <View
                style={[
                  styles.inputSurface,
                  Boolean(errors.fullName) && styles.inputSurfaceError,
                ]}
              >
                <Text style={styles.inputIcon}>👤</Text>
                <TextInput
                  style={styles.textInput}
                  value={formData.fullName}
                  onChangeText={(val) => updateField('fullName', val)}
                  placeholder={t.fullNamePlaceholder}
                  placeholderTextColor={theme.colors.slate400}
                  autoCapitalize="words"
                  autoCorrect={false}
                  editable={!isSubmitting}
                  accessible={true}
                  accessibilityLabel={t.fullName}
                />
              </View>
              {Boolean(errors.fullName) && (
                <Text style={styles.errorText}>{errors.fullName}</Text>
              )}
            </View>

            {/* Email Address */}
            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>{t.email}</Text>
              <View
                style={[
                  styles.inputSurface,
                  Boolean(errors.email) && styles.inputSurfaceError,
                ]}
              >
                <Text style={styles.inputIcon}>✉️</Text>
                <TextInput
                  style={styles.textInput}
                  value={formData.email}
                  onChangeText={(val) => updateField('email', val)}
                  placeholder={t.emailPlaceholder}
                  placeholderTextColor={theme.colors.slate400}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  editable={!isSubmitting}
                  accessible={true}
                  accessibilityLabel={t.email}
                />
              </View>
              {Boolean(errors.email) && (
                <Text style={styles.errorText}>{errors.email}</Text>
              )}
            </View>

            {/* Mobile Number */}
            <View style={styles.fieldGroup}>
              <View style={styles.optionalLabelRow}>
                <Text style={styles.fieldLabel}>{t.mobile}</Text>
                <Text style={styles.optionalBadge}>{t.cityOptional}</Text>
              </View>
              <View
                style={[
                  styles.inputSurface,
                  Boolean(errors.mobile) && styles.inputSurfaceError,
                ]}
              >
                <Text style={styles.inputIcon}>📱</Text>
                <TextInput
                  style={styles.textInput}
                  value={formData.mobile}
                  onChangeText={(val) => updateField('mobile', val)}
                  placeholder={t.mobilePlaceholder}
                  placeholderTextColor={theme.colors.slate400}
                  keyboardType="phone-pad"
                  maxLength={10}
                  editable={!isSubmitting}
                  accessible={true}
                  accessibilityLabel={t.mobile}
                />
              </View>
              {Boolean(errors.mobile) && (
                <Text style={styles.errorText}>{errors.mobile}</Text>
              )}
            </View>
          </View>

          {/* SECTION 2: ACADEMIC DETAILS */}
          <View style={styles.sectionCard}>
            <Text style={styles.sectionTitle}>{t.academicSection}</Text>

            {/* Grade / Class Picker */}
            <GradePicker
              value={formData.grade}
              onSelect={(val) => updateField('grade', val)}
              error={errors.grade}
              language={language}
              disabled={isSubmitting}
            />

            {/* School Name */}
            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>{t.school}</Text>
              <View
                style={[
                  styles.inputSurface,
                  Boolean(errors.school) && styles.inputSurfaceError,
                ]}
              >
                <Text style={styles.inputIcon}>🏫</Text>
                <TextInput
                  style={styles.textInput}
                  value={formData.school}
                  onChangeText={(val) => updateField('school', val)}
                  placeholder={t.schoolPlaceholder}
                  placeholderTextColor={theme.colors.slate400}
                  autoCapitalize="words"
                  autoCorrect={false}
                  editable={!isSubmitting}
                  accessible={true}
                  accessibilityLabel={t.school}
                />
              </View>
              {Boolean(errors.school) && (
                <Text style={styles.errorText}>{errors.school}</Text>
              )}
            </View>

            {/* Section Picker */}
            <SectionPicker
              value={formData.section}
              onSelect={(val) => updateField('section', val)}
              error={errors.section}
              language={language}
              disabled={isSubmitting}
            />
          </View>

          {/* SECTION 3: SECURITY */}
          <View style={styles.sectionCard}>
            <Text style={styles.sectionTitle}>{t.securitySection}</Text>

            {/* Password */}
            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>{t.password}</Text>
              <View
                style={[
                  styles.inputSurface,
                  Boolean(errors.password) && styles.inputSurfaceError,
                ]}
              >
                <Text style={styles.inputIcon}>🔒</Text>
                <TextInput
                  style={styles.textInput}
                  value={formData.password}
                  onChangeText={(val) => updateField('password', val)}
                  placeholder={t.passwordPlaceholder}
                  placeholderTextColor={theme.colors.slate400}
                  secureTextEntry={!isPasswordVisible}
                  autoCapitalize="none"
                  autoCorrect={false}
                  editable={!isSubmitting}
                  accessible={true}
                  accessibilityLabel={t.password}
                />
                <TouchableOpacity
                  style={styles.eyeButton}
                  onPress={() => setIsPasswordVisible((p) => !p)}
                  activeOpacity={0.7}
                  accessible={true}
                  accessibilityRole="button"
                  accessibilityLabel={isPasswordVisible ? t.hidePassword : t.showPassword}
                >
                  <Text style={styles.eyeIcon}>{isPasswordVisible ? '🙈' : '👁️'}</Text>
                </TouchableOpacity>
              </View>
              {Boolean(errors.password) && (
                <Text style={styles.errorText}>{errors.password}</Text>
              )}
            </View>

            {/* Confirm Password */}
            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>{t.confirmPassword}</Text>
              <View
                style={[
                  styles.inputSurface,
                  Boolean(errors.confirmPassword) && styles.inputSurfaceError,
                ]}
              >
                <Text style={styles.inputIcon}>🔐</Text>
                <TextInput
                  style={styles.textInput}
                  value={formData.confirmPassword}
                  onChangeText={(val) => updateField('confirmPassword', val)}
                  placeholder={t.confirmPasswordPlaceholder}
                  placeholderTextColor={theme.colors.slate400}
                  secureTextEntry={!isConfirmVisible}
                  autoCapitalize="none"
                  autoCorrect={false}
                  editable={!isSubmitting}
                  accessible={true}
                  accessibilityLabel={t.confirmPassword}
                />
                <TouchableOpacity
                  style={styles.eyeButton}
                  onPress={() => setIsConfirmVisible((p) => !p)}
                  activeOpacity={0.7}
                  accessible={true}
                  accessibilityRole="button"
                  accessibilityLabel={isConfirmVisible ? t.hidePassword : t.showPassword}
                >
                  <Text style={styles.eyeIcon}>{isConfirmVisible ? '🙈' : '👁️'}</Text>
                </TouchableOpacity>
              </View>
              {Boolean(errors.confirmPassword) && (
                <Text style={styles.errorText}>{errors.confirmPassword}</Text>
              )}
            </View>
          </View>

          {/* SECTION 4: TERMS & LEGAL */}
          <View style={styles.sectionCard}>
            <Text style={styles.sectionTitle}>{t.legalSection}</Text>
            <TermsCheckbox
              checked={formData.acceptedTerms}
              onToggle={() => updateField('acceptedTerms', !formData.acceptedTerms)}
              error={errors.terms}
              language={language}
              disabled={isSubmitting}
            />
          </View>

          {/* PRIMARY SUBMIT CTA */}
          <TouchableOpacity
            style={[styles.primaryButton, isSubmitting && styles.primaryButtonDisabled]}
            onPress={handleSubmit}
            activeOpacity={0.85}
            disabled={isSubmitting}
            accessible={true}
            accessibilityRole="button"
            accessibilityLabel={isSubmitting ? t.creatingAccount : t.createAccount}
            accessibilityHint={t.accessibility.submitHint}
          >
            {isSubmitting ? (
              <ActivityIndicator color={theme.colors.textOnAction} size="small" />
            ) : (
              <Text style={styles.primaryButtonText}>{t.createAccount}</Text>
            )}
          </TouchableOpacity>

          {/* FOOTER: Already have an account? Sign In */}
          <View style={styles.footerContainer}>
            <Text style={styles.alreadyAccountText}>{t.alreadyAccount}</Text>
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
    width: '100%',
    maxWidth: 540,
    alignSelf: 'center',
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
  sectionCard: {
    width: '100%',
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: theme.spacing.base,
    marginBottom: theme.spacing.md,
    shadowColor: theme.colors.navy900,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  sectionTitle: {
    ...theme.typography.caption,
    fontSize: 12.5,
    fontWeight: '800',
    color: theme.colors.navy900,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    marginBottom: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.divider,
    paddingBottom: 6,
  },
  fieldGroup: {
    width: '100%',
    marginBottom: theme.spacing.md,
  },
  fieldLabel: {
    ...theme.typography.caption,
    fontSize: 13,
    fontWeight: '700',
    color: theme.colors.navy900,
    marginBottom: 6,
    letterSpacing: 0.2,
  },
  optionalLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  optionalBadge: {
    ...theme.typography.caption,
    fontSize: 11,
    color: theme.colors.slate500,
    marginLeft: 6,
  },
  inputSurface: {
    width: '100%',
    height: 52,
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1.5,
    borderColor: theme.colors.gray300,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.base,
    shadowColor: theme.colors.navy900,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.02,
    shadowRadius: 3,
    elevation: 1,
  },
  inputSurfaceError: {
    borderColor: theme.colors.error,
    backgroundColor: theme.colors.errorSurface,
  },
  inputIcon: {
    fontSize: 15,
    marginRight: 10,
    opacity: 0.7,
  },
  textInput: {
    flex: 1,
    height: '100%',
    color: theme.colors.navy900,
    fontSize: 14.5,
    fontWeight: '500',
  },
  eyeButton: {
    padding: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  eyeIcon: {
    fontSize: 16,
    opacity: 0.7,
  },
  errorText: {
    ...theme.typography.caption,
    color: theme.colors.error,
    fontSize: 12,
    marginTop: 4,
    fontWeight: '600',
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
  alreadyAccountText: {
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
