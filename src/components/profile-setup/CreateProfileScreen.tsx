/**
 * CreateProfileScreen Component (Screen 13 — Personal Identity & Avatar)
 * First step of 3-step profile onboarding.
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
import { useLanguage } from '../../context';
import { LanguageToggle } from '../language';
import { AppBackButton } from '../navigation';
import { AvatarPicker, SCIENCE_AVATARS } from './AvatarPicker';
import { GradePicker } from '../auth/GradePicker';

export interface CreateProfileFormData {
  avatarId: string;
  fullName: string;
  school: string;
  grade: string;
}

interface CreateProfileScreenProps {
  language?: SupportedLanguage;
  initialData?: Partial<CreateProfileFormData>;
  onNext: (data: CreateProfileFormData) => void;
  onBack?: () => void;
}

export const CreateProfileScreen: React.FC<CreateProfileScreenProps> = ({
  language: propLanguage,
  initialData,
  onNext,
  onBack,
}) => {
  const insets = useSafeAreaInsets();
  const { language: contextLanguage } = useLanguage();
  const language = propLanguage || contextLanguage;
  const t = getTranslation(language).profileCreate;
  const isTamil = language === 'ta';

  const [formData, setFormData] = useState<CreateProfileFormData>({
    avatarId: initialData?.avatarId || SCIENCE_AVATARS[0].id,
    fullName: initialData?.fullName || '',
    school: initialData?.school || '',
    grade: initialData?.grade || 'Grade 9',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof CreateProfileFormData, string>>>({});

  const validate = (): boolean => {
    const nextErrors: Partial<Record<keyof CreateProfileFormData, string>> = {};
    if (!formData.fullName.trim()) {
      nextErrors.fullName = t.requiredFullName;
    }
    if (!formData.school.trim()) {
      nextErrors.school = t.requiredSchool;
    }
    if (!formData.grade) {
      nextErrors.grade = t.requiredGrade;
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
            {Boolean(onBack) ? (
              <AppBackButton
                onPress={onBack!}
                language={language}
                style={styles.backButton}
              />
            ) : (
              <View style={{ width: 44 }} />
            )}

            <View style={styles.stepBadge}>
              <Text style={styles.stepText}>{t.step}</Text>
            </View>
            <LanguageToggle />
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

          {/* Avatar Selector Card */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>{t.avatarSectionTitle}</Text>
            <AvatarPicker
              selectedAvatarId={formData.avatarId}
              onSelectAvatar={(avatar) => setFormData((p) => ({ ...p, avatarId: avatar.id }))}
              isTamil={isTamil}
            />
          </View>

          {/* Personal Details Form Card */}
          <View style={styles.card}>
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
                  onChangeText={(val) => {
                    setFormData((p) => ({ ...p, fullName: val }));
                    if (errors.fullName) setErrors((p) => ({ ...p, fullName: undefined }));
                  }}
                  placeholder={t.fullNamePlaceholder}
                  placeholderTextColor={theme.colors.slate400}
                  autoCapitalize="words"
                  autoCorrect={false}
                  accessible={true}
                  accessibilityLabel={t.fullName}
                />
              </View>
              {Boolean(errors.fullName) && (
                <Text style={styles.errorText}>{errors.fullName}</Text>
              )}
            </View>

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
                  onChangeText={(val) => {
                    setFormData((p) => ({ ...p, school: val }));
                    if (errors.school) setErrors((p) => ({ ...p, school: undefined }));
                  }}
                  placeholder={t.schoolPlaceholder}
                  placeholderTextColor={theme.colors.slate400}
                  autoCapitalize="words"
                  autoCorrect={false}
                  accessible={true}
                  accessibilityLabel={t.school}
                />
              </View>
              {Boolean(errors.school) && (
                <Text style={styles.errorText}>{errors.school}</Text>
              )}
            </View>

            {/* Grade Picker */}
            <GradePicker
              value={formData.grade}
              onSelect={(val) => {
                setFormData((p) => ({ ...p, grade: val }));
                if (errors.grade) setErrors((p) => ({ ...p, grade: undefined }));
              }}
              error={errors.grade}
              language={language}
            />
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
    marginBottom: 6,
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
