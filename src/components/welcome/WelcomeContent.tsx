/**
 * WelcomeContent Component
 * Communicates the Vigyaan value proposition, bilingual identity,
 * and key science learning capabilities in clean Pearl White & Royal Blue styling.
 */

import React from 'react';
import { View, Text, StyleSheet, AccessibilityProps } from 'react-native';
import { theme } from '../../theme';
import { getTranslation, SupportedLanguage } from '../../config/i18n';

interface WelcomeContentProps extends AccessibilityProps {
  language?: SupportedLanguage;
  compact?: boolean;
}

export const WelcomeContent: React.FC<WelcomeContentProps> = ({
  language = 'en',
  compact = false,
}) => {
  const t = getTranslation(language).welcome;

  return (
    <View style={styles.container} accessible={true}>
      {/* Tamil Header Brand Accent */}
      <Text style={styles.tamilName}>{t.tamilAppName}</Text>

      {/* Main Brand Hero Title */}
      <Text style={[styles.brandTitle, compact && styles.brandTitleCompact]}>
        {t.appName}
      </Text>

      {/* Grades 6-12 Initiative Badge */}
      <View style={styles.gradeBadge}>
        <View style={styles.gradeDot} />
        <Text style={styles.gradeText}>{t.badge}</Text>
      </View>

      {/* Main Value Proposition Statement */}
      <Text style={[styles.valueStatement, compact && styles.valueStatementCompact]}>
        {t.subtitle}
      </Text>

      {/* 3 Pillar Feature Cards */}
      <View style={styles.pillarsContainer}>
        {/* Pillar 1: Quizzes (Blue Action) */}
        <View style={styles.pillarCard}>
          <View style={styles.pillarIconContainer}>
            <Text style={styles.pillarIcon}>🔬</Text>
          </View>
          <Text style={styles.pillarText} numberOfLines={2}>
            {t.valueProps.curiosity}
          </Text>
        </View>

        {/* Pillar 2: Bilingual (Purple Brand) */}
        <View style={styles.pillarCard}>
          <View style={[styles.pillarIconContainer, styles.pillarIconBilingual]}>
            <Text style={styles.pillarIcon}>🌐</Text>
          </View>
          <Text style={styles.pillarText} numberOfLines={2}>
            {t.valueProps.learning}
          </Text>
        </View>

        {/* Pillar 3: Young Achiever (Green Success) */}
        <View style={styles.pillarCard}>
          <View style={[styles.pillarIconContainer, styles.pillarIconAchiever]}>
            <Text style={styles.pillarIcon}>🏆</Text>
          </View>
          <Text style={styles.pillarText} numberOfLines={2}>
            {t.valueProps.achievement}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: theme.spacing.base,
  },
  tamilName: {
    ...theme.typography.tamilSubtitle,
    color: theme.colors.brandPrimary,
    textAlign: 'center',
    letterSpacing: 1.2,
    marginBottom: 2,
    fontWeight: '700',
  },
  brandTitle: {
    ...theme.typography.hero,
    fontSize: 32,
    lineHeight: 38,
    color: theme.colors.navy900,
    textAlign: 'center',
    fontFamily: theme.fontFamilies.bold,
    letterSpacing: 3,
  },
  brandTitleCompact: {
    fontSize: 28,
    lineHeight: 34,
  },
  gradeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.purple100,
    borderWidth: 1,
    borderColor: theme.colors.purple200,
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: theme.borderRadius.full,
    marginTop: theme.spacing.xs,
    marginBottom: theme.spacing.md,
  },
  gradeDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: theme.colors.brandPrimary,
    marginRight: 6,
  },
  gradeText: {
    ...theme.typography.caption,
    fontSize: 10.5,
    color: theme.colors.brandPrimary,
    fontWeight: '700',
    letterSpacing: 0.6,
  },
  valueStatement: {
    ...theme.typography.bodyLarge,
    fontSize: 14.5,
    lineHeight: 21,
    color: theme.colors.slate600,
    textAlign: 'center',
    fontWeight: '500',
    maxWidth: 320,
    marginBottom: theme.spacing.lg,
  },
  valueStatementCompact: {
    fontSize: 13.5,
    lineHeight: 19,
    marginBottom: theme.spacing.md,
  },
  pillarsContainer: {
    width: '100%',
    gap: 8,
  },
  pillarCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.white,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.borderRadius.lg,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: 10,
    shadowColor: theme.colors.navy900,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 1,
  },
  pillarIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: theme.colors.blue50,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.md,
  },
  pillarIconBilingual: {
    backgroundColor: theme.colors.purple50,
  },
  pillarIconAchiever: {
    backgroundColor: theme.colors.green50,
  },
  pillarIcon: {
    fontSize: 15,
  },
  pillarText: {
    ...theme.typography.body,
    fontSize: 13,
    fontWeight: '600',
    color: theme.colors.navy800,
    flex: 1,
  },
});
