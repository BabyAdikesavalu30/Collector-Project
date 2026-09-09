/**
 * ProgressBar — reusable accessible progress indicator.
 * Always pairs the visual bar with a text representation for screen readers.
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../../theme';

interface ProgressBarProps {
  progress: number; // 0 - 100
  color?: string;
  trackColor?: string;
  height?: number;
  /** Accessible label describing what the progress represents. */
  label: string;
  showPercentage?: boolean;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  color = theme.colors.actionPrimary,
  trackColor = theme.colors.blue100,
  height = 8,
  label,
  showPercentage = true,
}) => {
  const clamped = Math.max(0, Math.min(100, Math.round(progress)));

  return (
    <View
      style={styles.wrapper}
      accessible
      accessibilityRole="progressbar"
      accessibilityLabel={label}
      accessibilityValue={{ min: 0, max: 100, now: clamped, text: `${clamped}%` }}
    >
      <View style={[styles.track, { backgroundColor: trackColor, height, borderRadius: height / 2 }]}>
        <View
          style={[
            styles.fill,
            {
              width: `${clamped}%`,
              backgroundColor: color,
              borderRadius: height / 2,
            },
          ]}
        />
      </View>
      {showPercentage && (
        <Text style={styles.percentage} accessibilityElementsHidden>
          {clamped}%
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  track: {
    flex: 1,
    overflow: 'hidden',
    backgroundColor: theme.colors.gray200,
  },
  fill: {
    height: '100%',
  },
  percentage: {
    ...theme.typography.caption,
    fontSize: 11,
    fontWeight: '700',
    color: theme.colors.navy700,
    minWidth: 34,
    textAlign: 'right',
  },
});