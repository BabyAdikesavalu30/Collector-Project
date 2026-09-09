/**
 * SafeSimulationBadge Component
 * Consistent badge for marking educational simulations.
 * Used in Experiment Lab, Mystery Lab, and other interactive content.
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../../theme';

interface SafeSimulationBadgeProps {
  label?: string;
}

export const SafeSimulationBadge: React.FC<SafeSimulationBadgeProps> = ({
  label = 'Educational Simulation',
}) => {
  return (
    <View
      style={styles.badge}
      accessibilityRole="text"
      accessibilityLabel={label}
    >
      <Text style={styles.icon}>🔬</Text>
      <Text style={styles.text}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.blue50,
    borderWidth: 1,
    borderColor: theme.colors.blue200,
    borderRadius: theme.borderRadius.full,
    paddingHorizontal: 10,
    paddingVertical: 4,
    gap: 5,
  },
  icon: {
    fontSize: 12,
  },
  text: {
    ...theme.typography.overline,
    fontSize: 9.5,
    fontWeight: '700',
    color: theme.colors.actionPrimary,
    letterSpacing: 0.5,
  },
});
