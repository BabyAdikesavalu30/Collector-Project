/**
 * InstitutionIdentity Component
 * Displays institutional hierarchy, accreditation, and department identity.
 * Fully configurable via institutionConfig and localization-ready.
 */

import React from 'react';
import { View, Text, StyleSheet, AccessibilityProps } from 'react-native';
import { theme } from '../../theme';
import { institutionConfig } from '../../config/institution';
import { CollegeLogo } from './CollegeLogo';

interface InstitutionIdentityProps extends AccessibilityProps {
  compact?: boolean;
}

export const InstitutionIdentity: React.FC<InstitutionIdentityProps> = ({
  compact = false,
  accessibilityLabel = `${institutionConfig.name.en}, ${institutionConfig.department.en}`,
}) => {
  if (compact) {
    return (
      <View
        style={styles.compactContainer}
        accessible={true}
        accessibilityRole="header"
        accessibilityLabel={accessibilityLabel}
      >
        <CollegeLogo size={40} />
        <View style={styles.compactTextBlock}>
          <View style={styles.compactTitleRow}>
            <Text style={styles.compactCollegeName} numberOfLines={1}>
              {institutionConfig.name.en}
            </Text>
            <View style={styles.compactAutonomousBadge}>
              <Text style={styles.compactAutonomousText}>AUTONOMOUS</Text>
            </View>
          </View>
          <Text style={styles.compactDeptName} numberOfLines={1}>
            {institutionConfig.department.en}
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View
      style={styles.container}
      accessible={true}
      accessibilityRole="header"
      accessibilityLabel={accessibilityLabel}
    >
      {/* Top Emblem Row */}
      <View style={styles.emblemRow}>
        <CollegeLogo size={58} />
      </View>

      {/* Institutional Typography */}
      <View style={styles.textBlock}>
        <Text style={styles.groupTitle} numberOfLines={1}>
          {institutionConfig.group.en}
        </Text>

        <Text style={styles.collegeName} numberOfLines={2}>
          {institutionConfig.name.en}
        </Text>

        {/* Autonomous & Tamil Subtitle Badge */}
        <View style={styles.badgeRow}>
          <View style={styles.autonomousBadge}>
            <Text style={styles.autonomousText}>AUTONOMOUS</Text>
          </View>
          <Text style={styles.bulletSeparator}>•</Text>
          <Text style={styles.tamilCollege}>{institutionConfig.name.ta}</Text>
        </View>

        {/* Department Banner */}
        <View style={styles.deptContainer}>
          <View style={styles.deptPill}>
            <Text style={styles.deptText}>
              {institutionConfig.department.en}
            </Text>
          </View>
          <Text style={styles.tamilDept}>{institutionConfig.department.ta}</Text>
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
  emblemRow: {
    marginBottom: theme.spacing.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textBlock: {
    alignItems: 'center',
    width: '100%',
  },
  groupTitle: {
    ...theme.typography.overline,
    color: theme.colors.brandPrimary,
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1.2,
    marginBottom: 2,
    textAlign: 'center',
  },
  collegeName: {
    ...theme.typography.h2,
    fontSize: 16,
    lineHeight: 22,
    color: theme.colors.navy900,
    textAlign: 'center',
    fontFamily: theme.fontFamilies.bold,
    marginBottom: 4,
    letterSpacing: 0.5,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 6,
  },
  autonomousBadge: {
    backgroundColor: theme.colors.blue50,
    borderWidth: 1,
    borderColor: theme.colors.blue200,
    paddingHorizontal: 6,
    paddingVertical: 1.5,
    borderRadius: 4,
  },
  autonomousText: {
    ...theme.typography.caption,
    fontSize: 9,
    color: theme.colors.actionPrimary,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  bulletSeparator: {
    color: theme.colors.slate400,
    fontSize: 10,
  },
  tamilCollege: {
    ...theme.typography.caption,
    color: theme.colors.slate600,
    fontSize: 11,
    fontWeight: '500',
  },
  deptContainer: {
    alignItems: 'center',
    marginTop: 2,
  },
  deptPill: {
    backgroundColor: theme.colors.white,
    borderWidth: 1,
    borderColor: theme.colors.border,
    paddingHorizontal: 12,
    paddingVertical: 3,
    borderRadius: theme.borderRadius.full,
    shadowColor: theme.colors.navy900,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 3,
    elevation: 1,
  },
  deptText: {
    ...theme.typography.caption,
    color: theme.colors.navy900,
    fontWeight: '700',
    fontSize: 11,
    letterSpacing: 0.2,
  },
  tamilDept: {
    ...theme.typography.caption,
    color: theme.colors.slate500,
    fontSize: 10,
    marginTop: 2,
  },

  // Compact Floating Card Layout
  compactContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: theme.colors.white,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.borderRadius.lg,
    shadowColor: theme.colors.navy900,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  compactTextBlock: {
    marginLeft: 10,
    flex: 1,
  },
  compactTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  compactCollegeName: {
    ...theme.typography.body,
    fontSize: 12,
    fontWeight: '700',
    color: theme.colors.navy900,
    fontFamily: theme.fontFamilies.bold,
    flexShrink: 1,
  },
  compactAutonomousBadge: {
    backgroundColor: theme.colors.blue50,
    paddingHorizontal: 5,
    paddingVertical: 1,
    borderRadius: 3,
    borderWidth: 0.5,
    borderColor: theme.colors.blue200,
  },
  compactAutonomousText: {
    fontSize: 8,
    color: theme.colors.actionPrimary,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  compactDeptName: {
    ...theme.typography.caption,
    fontSize: 10.5,
    color: theme.colors.slate500,
    fontWeight: '500',
    marginTop: 1,
  },
});
