/**
 * SpinWheelStatus Component
 * Displays "Today's Spin" headline, descriptive caption, and availability badge.
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../../theme';

interface SpinWheelStatusProps {
  title: string;
  subtitle: string;
  isCompleted: boolean;
  availableLabel: string;
  completedLabel: string;
}

export const SpinWheelStatus: React.FC<SpinWheelStatusProps> = ({
  title,
  subtitle,
  isCompleted,
  availableLabel,
  completedLabel,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>{title}</Text>
        <View
          style={[
            styles.badge,
            isCompleted ? styles.badgeCompleted : styles.badgeAvailable,
          ]}
        >
          <Text
            style={[
              styles.badgeText,
              isCompleted ? styles.badgeTextCompleted : styles.badgeTextAvailable,
            ]}
          >
            {isCompleted ? completedLabel : availableLabel}
          </Text>
        </View>
      </View>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.md,
    paddingBottom: theme.spacing.sm,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  title: {
    ...theme.typography.h2,
    fontSize: 20,
    fontWeight: '800',
    color: theme.colors.navy900,
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: theme.borderRadius.full,
  },
  badgeAvailable: {
    backgroundColor: theme.colors.green50,
    borderWidth: 1,
    borderColor: theme.colors.green200,
  },
  badgeCompleted: {
    backgroundColor: theme.colors.gray100,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  badgeText: {
    ...theme.typography.caption,
    fontSize: 11,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  badgeTextAvailable: {
    color: theme.colors.green600,
  },
  badgeTextCompleted: {
    color: theme.colors.slate600,
  },
  subtitle: {
    ...theme.typography.body,
    fontSize: 13.5,
    color: theme.colors.slate600,
    lineHeight: 19,
  },
});
