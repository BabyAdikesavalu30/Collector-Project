/**
 * AcademicSetupScreen Component (Screen 14 — Academic Details & Preferences)
 * Second step of 3-step profile onboarding.
 * Clean Pearl White & White card layout with Navy typography and Royal Blue CTAs.
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { theme } from '../../theme';
import { SupportedLanguage, getTranslation } from '../../config/i18n';
import { AppBackButton } from '../navigation';
import { SectionPicker } from '../auth/SectionPicker';

export interface AcademicSetupFormData {
  district: string;
  section: string;
  preferredLanguage: SupportedLanguage;
}

interface AcademicSetupScreenProps {
  language?: SupportedLanguage;
  initialData?: Partial<AcademicSetupFormData>;
  onNext: (data: AcademicSetupFormData) => void;
  onBack: () => void;
}

export const AcademicSetupScreen: React.FC<AcademicSetupScreenProps> = ({
  language = 'en',
  initialData,
  onNext,
  onBack,
}) => {
  const insets = useSafeAreaInsets();
  const t = getTranslation(language).profileAcademic;
  const isTamil = language === 'ta';

  const [formData, setFormData] = useState<AcademicSetupFormData>({
    district: initialData?.district || 'Chennai',
    section: initialData?.section || 'A',
    preferredLanguage: initialData?.preferredLanguage || language,
  });

  const [errors, setErrors] = useState<Partial<Record<keyof AcademicSetupFormData, string>>>({});

  const validate = (): boolean => {
    const nextErrors: Partial<Record<keyof AcademicSetupFormData, string>> = {};
    if (!formData.district.trim()) {
      nextErrors.district = t.requiredDistrict;
    }
    if (!formData.section) {
      nextErrors.section = t.requiredSection;
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleNext = () => {
    if (validate()) {
      onNext(formData);
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
              paddingBottom: Math.max(insets.bottom + 24, 32),
            },
          ]}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Top Bar: Step indicator + Back */}
          <View style={styles.topBar}>
            <AppBackButton
              onPress={onBack}
              language={language}
              style={styles.backButton}
            />

            <View style={styles.stepBadge}>
              <Text style={styles.stepText}>{t.step}</Text>
            </View>
            <View style={{ width: 44 }} />
          </View>

          {/* Header Title & Subtitle */}
          <View style={styles.headerContainer}>
            <View style={styles.badgePill}>
              <View style={styles.badgeDot} />
              <Text style={styles.badgeText}>{t.badge}</Text>
            </View>
            <Text style={styles.title}>{t.title}</Text>
            {isTamil && <Text style={styles.tamilTitle}>{t.tamilTitle}</Text>}
            <Text style={styles.subtitle}>{t.subtitle}</Text>
          </View>

          {/* Academic Details Form Card */}
          <View style={styles.card}>
            {/* District / City */}
            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>{t.district}</Text>
              <View
                style={[
                  styles.inputSurface,
                  Boolean(errors.district) && styles.inputSurfaceError,
                ]}
              >
                <Text style={styles.inputIcon}>📍</Text>
                <TextInput
                  style={styles.textInput}
                  value={formData.district}
                  onChangeText={(val) => {
                    setFormData((p) => ({ ...p, district: val }));
                    if (errors.district) setErrors((p) => ({ ...p, district: undefined }));
                  }}
                  placeholder={t.districtPlaceholder}
                  placeholderTextColor={theme.colors.slate400}
                  autoCapitalize="words"
                  autoCorrect={false}
                  accessible={true}
                  accessibilityLabel={t.district}
                />
              </View>
              {Boolean(errors.district) && (
                <Text style={styles.errorText}>{errors.district}</Text>
              )}
            </View>

            {/* Section Picker */}
            <SectionPicker
              value={formData.section}
              onSelect={(val) => {
                setFormData((p) => ({ ...p, section: val }));
                if (errors.section) setErrors((p) => ({ ...p, section: undefined }));
              }}
              error={errors.section}
              language={language}
            />
          </View>

          {/* Preferred Language Selection Card */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>{t.preferredLanguage}</Text>

            <View style={styles.langToggleRow}>
              {/* English Option */}
              <TouchableOpacity
                style={[
                  styles.langOptionCard,
                  formData.preferredLanguage === 'en' && styles.langOptionCardSelected,
                ]}
                onPress={() => setFormData((p) => ({ ...p, preferredLanguage: 'en' }))}
                activeOpacity={0.8}
                accessible={true}
                accessibilityRole="radio"
                accessibilityState={{ selected: formData.preferredLanguage === 'en' }}
              >
                <Text style={styles.langEmoji}>🇬🇧</Text>
                <Text
                  style={[
                    styles.langOptionText,
                    formData.preferredLanguage === 'en' && styles.langOptionTextSelected,
                  ]}
                >
                  {t.englishOption}
                </Text>
                {formData.preferredLanguage === 'en' && (
                  <View style={styles.checkCircle}>
                    <Text style={styles.checkText}>✓</Text>
                  </View>
                )}
              </TouchableOpacity>

              {/* Tamil Option */}
              <TouchableOpacity
                style={[
                  styles.langOptionCard,
                  formData.preferredLanguage === 'ta' && styles.langOptionCardSelected,
                ]}
                onPress={() => setFormData((p) => ({ ...p, preferredLanguage: 'ta' }))}
                activeOpacity={0.8}
                accessible={true}
                accessibilityRole="radio"
                accessibilityState={{ selected: formData.preferredLanguage === 'ta' }}
              >
                <Text style={styles.langEmoji}>🇮🇳</Text>
                <Text
                  style={[
                    styles.langOptionText,
                    formData.preferredLanguage === 'ta' && styles.langOptionTextSelected,
                  ]}
                >
                  {t.tamilOption}
                </Text>
                {formData.preferredLanguage === 'ta' && (
                  <View style={styles.checkCircle}>
                    <Text style={styles.checkText}>✓</Text>
                  </View>
                )}
              </TouchableOpacity>
            </View>
          </View>

          {/* Next Action Button */}
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={handleNext}
            activeOpacity={0.85}
            accessible={true}
            accessibilityRole="button"
            accessibilityLabel={t.next}
            accessibilityHint={t.accessibility.nextHint}
          >
            <Text style={styles.primaryButtonText}>{t.next}</Text>
          </TouchableOpacity>
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
    paddingHorizontal: theme.spacing.base,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.xs,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
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
    fontSize: 18,
    fontWeight: '700',
  },
  stepBadge: {
    backgroundColor: theme.colors.blue50,
    borderWidth: 1,
    borderColor: theme.colors.blue200,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: theme.borderRadius.full,
  },
  stepText: {
    ...theme.typography.caption,
    fontSize: 12,
    fontWeight: '800',
    color: theme.colors.actionPrimary,
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
    marginBottom: 2,
  },
  tamilTitle: {
    ...theme.typography.tamilSubtitle,
    color: theme.colors.brandPrimary,
    textAlign: 'center',
    marginBottom: 4,
    fontSize: 14,
  },
  subtitle: {
    ...theme.typography.body,
    fontSize: 13.5,
    color: theme.colors.slate600,
    textAlign: 'center',
    maxWidth: 300,
  },
  card: {
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
  cardTitle: {
    ...theme.typography.caption,
    fontSize: 12,
    fontWeight: '800',
    color: theme.colors.navy900,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 10,
  },
  fieldGroup: {
    marginBottom: theme.spacing.md,
  },
  fieldLabel: {
    ...theme.typography.caption,
    fontSize: 13,
    fontWeight: '700',
    color: theme.colors.navy800,
    marginBottom: 6,
  },
  inputSurface: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderColor: theme.colors.gray300,
    paddingHorizontal: 12,
    height: 50,
  },
  inputSurfaceError: {
    borderColor: theme.colors.error,
    backgroundColor: theme.colors.errorSurface,
  },
  inputIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  textInput: {
    flex: 1,
    fontSize: 14.5,
    color: theme.colors.navy900,
    paddingVertical: 0,
  },
  errorText: {
    ...theme.typography.caption,
    fontSize: 11.5,
    color: theme.colors.error,
    marginTop: 4,
  },
  langToggleRow: {
    flexDirection: 'row',
    gap: 10,
  },
  langOptionCard: {
    flex: 1,
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1.5,
    borderColor: theme.colors.border,
    paddingVertical: 14,
    paddingHorizontal: 10,
    alignItems: 'center',
    position: 'relative',
  },
  langOptionCardSelected: {
    borderColor: theme.colors.actionPrimary,
    backgroundColor: theme.colors.blue50,
  },
  langEmoji: {
    fontSize: 24,
    marginBottom: 6,
  },
  langOptionText: {
    ...theme.typography.caption,
    fontSize: 12.5,
    fontWeight: '700',
    color: theme.colors.navy900,
  },
  langOptionTextSelected: {
    color: theme.colors.actionPrimary,
    fontWeight: '800',
  },
  checkCircle: {
    position: 'absolute',
    top: 6,
    right: 6,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: theme.colors.actionPrimary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkText: {
    fontSize: 10,
    fontWeight: '900',
    color: theme.colors.textOnAction,
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
    marginTop: theme.spacing.xs,
  },
  primaryButtonText: {
    ...theme.typography.button,
    color: theme.colors.textOnAction,
    fontSize: 15.5,
    fontWeight: '800',
    letterSpacing: 0.4,
  },
});
