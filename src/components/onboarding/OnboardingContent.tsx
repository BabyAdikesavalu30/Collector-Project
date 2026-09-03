/**
 * OnboardingContent Component
 * Step-aware content component for onboarding:
 * - step=1 (Screen 03): "Learn Interactively"
 * - step=2 (Screen 04): "Earn & Achieve"
 * - step=3 (Screen 05): "Think. Explore. Grow."
 * Flexible vertical composition supporting bilingual English and Tamil text flow.
 */

import React from 'react';
import { View, Text, StyleSheet, AccessibilityProps } from 'react-native';
import { theme } from '../../theme';
import { getTranslation, SupportedLanguage } from '../../config/i18n';

interface OnboardingContentProps extends AccessibilityProps {
  step?: 1 | 2 | 3;
  language?: SupportedLanguage;
  compact?: boolean;
}

export const OnboardingContent: React.FC<OnboardingContentProps> = ({
  step = 1,
  language = 'en',
  compact = false,
}) => {
  const dictionary = getTranslation(language).onboarding;
  const t = step === 3 ? dictionary.step3 : step === 2 ? dictionary.step2 : dictionary.step1;

  const isStep2 = step === 2;
  const isStep3 = step === 3;

  return (
    <View style={styles.container} accessible={true}>
      {/* Category Pill Tag */}
      <View
        style={[
          styles.tagPill,
          isStep2 && styles.tagPillGold,
          isStep3 && styles.tagPillTeal,
        ]}
      >
        <View
          style={[
            styles.tagDot,
            isStep2 && styles.tagDotGold,
            isStep3 && styles.tagDotTeal,
          ]}
        />
        <Text
          style={[
            styles.tagText,
            isStep2 && styles.tagTextGold,
            isStep3 && styles.tagTextTeal,
          ]}
        >
          {t.tag}
        </Text>
      </View>

      {/* Main Title */}
      <Text style={[styles.title, compact && styles.titleCompact]}>
        {t.title}
      </Text>

      {/* Tamil Sub-Title */}
      <Text
        style={[
          styles.tamilSubtitle,
          isStep2 && styles.tamilSubtitleGold,
          isStep3 && styles.tamilSubtitleTeal,
        ]}
      >
        {t.tamilTitle}
      </Text>

      {/* Supporting Message Description */}
      <Text style={[styles.description, compact && styles.descriptionCompact]}>
        {t.description}
      </Text>

      {/* Feature Hint Pill */}
      <View style={styles.featurePill}>
        <Text
          style={[
            styles.featureText,
            isStep3 && styles.featureTextTeal,
          ]}
        >
          {t.featureHint}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: theme.spacing.lg,
  },
  tagPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.purple100,
    borderWidth: 1,
    borderColor: theme.colors.purple200,
    paddingHorizontal: 11,
    paddingVertical: 3.5,
    borderRadius: theme.borderRadius.full,
    marginBottom: theme.spacing.sm,
  },
  tagPillGold: {
    backgroundColor: theme.colors.purple100,
    borderColor: theme.colors.purple200,
  },
  tagPillTeal: {
    backgroundColor: theme.colors.green50,
    borderColor: theme.colors.green200,
  },
  tagDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: theme.colors.brandPrimary,
    marginRight: 6,
  },
  tagDotGold: {
    backgroundColor: theme.colors.brandPrimary,
  },
  tagDotTeal: {
    backgroundColor: theme.colors.success,
  },
  tagText: {
    ...theme.typography.overline,
    fontSize: 10,
    color: theme.colors.brandPrimary,
    letterSpacing: 1.2,
    fontWeight: '700',
  },
  tagTextGold: {
    color: theme.colors.brandPrimary,
  },
  tagTextTeal: {
    color: theme.colors.success,
  },
  title: {
    ...theme.typography.h1,
    fontSize: 28,
    lineHeight: 36,
    color: theme.colors.navy900,
    textAlign: 'center',
    fontFamily: theme.fontFamilies.bold,
    letterSpacing: 0.8,
    marginBottom: 2,
  },
  titleCompact: {
    fontSize: 24.5,
    lineHeight: 32,
  },
  tamilSubtitle: {
    ...theme.typography.tamilSubtitle,
    color: theme.colors.brandPrimary,
    textAlign: 'center',
    marginBottom: theme.spacing.sm,
    fontSize: 13.8,
    lineHeight: 19,
    fontWeight: '700',
  },
  tamilSubtitleGold: {
    color: theme.colors.brandPrimary,
  },
  tamilSubtitleTeal: {
    color: theme.colors.success,
  },
  description: {
    ...theme.typography.bodyLarge,
    fontSize: 15.2,
    lineHeight: 23,
    color: theme.colors.slate600,
    textAlign: 'center',
    fontWeight: '400',
    maxWidth: 335,
    marginBottom: theme.spacing.md,
  },
  descriptionCompact: {
    fontSize: 14,
    lineHeight: 21,
    marginBottom: theme.spacing.sm,
  },
  featurePill: {
    backgroundColor: theme.colors.white,
    borderWidth: 1,
    borderColor: theme.colors.border,
    paddingHorizontal: 13,
    paddingVertical: 5.5,
    borderRadius: theme.borderRadius.full,
    shadowColor: theme.colors.navy900,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 3,
    elevation: 1,
  },
  featureText: {
    ...theme.typography.caption,
    fontSize: 11.5,
    color: theme.colors.navy900,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  featureTextTeal: {
    color: theme.colors.success,
  },
});
