/**
 * WelcomeHeader Component
 * Subtle, authoritative top institutional banner for Screen 02.
 * Integrates CollegeLogo with institutional accreditation and department details in clean Pearl White styling.
 */

import React from 'react';
import { View, Text, StyleSheet, AccessibilityProps } from 'react-native';
import { theme } from '../../theme';
import { institutionConfig } from '../../config/institution';
import { CollegeLogo } from '../splash/CollegeLogo';
import { LanguageToggle } from '../language/LanguageToggle';

interface WelcomeHeaderProps extends AccessibilityProps {
  compact?: boolean;
}

export const WelcomeHeader: React.FC<WelcomeHeaderProps> = ({
  compact = false,
  accessibilityLabel = `${institutionConfig.name.en}, ${institutionConfig.department.en}`,
}) => {
  return (
    <View
      style={styles.container}
      accessible={true}
      accessibilityRole="header"
      accessibilityLabel={accessibilityLabel}
    >
      {/* College Crest */}
      <CollegeLogo size={compact ? 34 : 38} />

      {/* Institutional Typography */}
      <View style={styles.textContainer}>
        <View style={styles.titleRow}>
          <Text style={styles.collegeName} numberOfLines={1}>
            {institutionConfig.name.en}
          </Text>
          <View style={styles.autonomousPill}>
            <Text style={styles.autonomousText}>AUTONOMOUS</Text>
          </View>
        </View>

        <Text style={styles.deptName} numberOfLines={1}>
          {institutionConfig.department.en}
        </Text>
      </View>

      {/* Language Toggle */}
      <LanguageToggle style={{ marginLeft: 8 }} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: theme.spacing.base,
    paddingVertical: theme.spacing.sm,
    backgroundColor: theme.colors.white,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.borderRadius.lg,
    shadowColor: theme.colors.navy900,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 1,
  },
  textContainer: {
    marginLeft: theme.spacing.md,
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flexWrap: 'nowrap',
  },
  collegeName: {
    ...theme.typography.body,
    fontSize: 12.5,
    fontWeight: '700',
    color: theme.colors.textPrimary,
    fontFamily: theme.fontFamilies.bold,
    flexShrink: 1,
  },
  autonomousPill: {
    backgroundColor: theme.colors.blue50,
    paddingHorizontal: 6,
    paddingVertical: 1.5,
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: theme.colors.blue200,
  },
  autonomousText: {
    ...theme.typography.caption,
    fontSize: 8.5,
    color: theme.colors.actionPrimary,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  deptName: {
    ...theme.typography.caption,
    fontSize: 10.5,
    color: theme.colors.textSecondary,
    marginTop: 1,
  },
});
