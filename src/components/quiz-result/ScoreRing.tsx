/**
 * ScoreRing Component
 * Premium circular score indicator displaying quiz accuracy percentage.
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../../theme';

interface ScoreRingProps {
  percentage: number;
  accessibilityLabel: string;
}

export const ScoreRing: React.FC<ScoreRingProps> = ({
  percentage,
  accessibilityLabel,
}) => {
  // Tier color mapping using valid theme tokens
  const ringBorderColor =
    percentage >= 75
      ? theme.colors.green600
      : percentage >= 50
      ? theme.colors.actionPrimary
      : theme.colors.warning;

  const ringBgColor =
    percentage >= 75
      ? theme.colors.green50
      : percentage >= 50
      ? theme.colors.blue50
      : theme.colors.warningBackground;

  return (
    <View
      style={[
        styles.ringOuter,
        {
          borderColor: ringBorderColor,
          backgroundColor: ringBgColor,
        },
      ]}
      accessible={true}
      accessibilityRole="text"
      accessibilityLabel={accessibilityLabel}
    >
      <View style={styles.ringInner}>
        <Text style={[styles.percentageText, { color: theme.colors.navy900 }]}>
          {percentage}%
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  ringOuter: {
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 7,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: theme.spacing.md,
    shadowColor: theme.colors.navy900,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 3,
  },
  ringInner: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: theme.colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  percentageText: {
    ...theme.typography.h1,
    fontSize: 34,
    fontWeight: '900',
    letterSpacing: -0.5,
  },
});
