/**
 * SafetyNotice Component
 * Reusable safety/trust label for educational content.
 * Variants: simulation, caution, information, security-tip
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../../theme';

type NoticeVariant = 'simulation' | 'caution' | 'information' | 'security-tip';

interface SafetyNoticeProps {
  variant?: NoticeVariant;
  message: string;
  icon?: string;
  compact?: boolean;
}

const VARIANT_CONFIG: Record<NoticeVariant, { bg: string; border: string; text: string; icon: string }> = {
  simulation: {
    bg: theme.colors.blue50,
    border: theme.colors.blue200,
    text: theme.colors.actionPrimary,
    icon: '🔬',
  },
  caution: {
    bg: theme.colors.warningSurface,
    border: theme.colors.warningBorder,
    text: theme.colors.warning,
    icon: '⚠️',
  },
  information: {
    bg: theme.colors.green50,
    border: theme.colors.green200,
    text: theme.colors.success,
    icon: 'ℹ️',
  },
  'security-tip': {
    bg: theme.colors.purple50,
    border: theme.colors.purple200,
    text: theme.colors.brandPrimary,
    icon: '🛡️',
  },
};

export const SafetyNotice: React.FC<SafetyNoticeProps> = ({
  variant = 'information',
  message,
  icon,
  compact = false,
}) => {
  const config = VARIANT_CONFIG[variant];

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: config.bg, borderColor: config.border },
        compact && styles.compact,
      ]}
      accessibilityRole="text"
    >
      <Text style={styles.icon}>{icon || config.icon}</Text>
      <Text style={[styles.message, { color: config.text }]} numberOfLines={compact ? 1 : 3}>
        {message}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    padding: 12,
    gap: 8,
  },
  compact: {
    paddingVertical: 6,
    paddingHorizontal: 10,
  },
  icon: {
    fontSize: 14,
  },
  message: {
    flex: 1,
    ...theme.typography.caption,
    fontSize: 12,
    fontWeight: '600',
    lineHeight: 17,
  },
});
