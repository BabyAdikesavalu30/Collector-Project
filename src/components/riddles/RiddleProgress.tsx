/**
 * RiddleProgress Component
 * Progress indicator showing current riddle number and horizontal progress bar.
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../../theme';

interface RiddleProgressProps {
  currentIndex: number;
  totalCount: number;
  progressText: string;
}

export const RiddleProgress: React.FC<RiddleProgressProps> = ({
  currentIndex,
  totalCount,
  progressText,
}) => {
  const percent = totalCount > 0 ? ((currentIndex + 1) / totalCount) * 100 : 0;

  return (
    <View style={styles.container}>
      {/* Progress Label */}
      <View style={styles.textRow}>
        <Text style={styles.label}>{progressText}</Text>
        <Text style={styles.percentageText}>{Math.round(percent)}%</Text>
      </View>

      {/* Progress Track & Fill */}
      <View style={styles.track}>
        <View style={[styles.fill, { width: `${percent}%` }]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.sm,
    backgroundColor: theme.colors.white,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  textRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  label: {
    ...theme.typography.caption,
    fontSize: 13,
    fontWeight: '700',
    color: theme.colors.navy900,
  },
  percentageText: {
    ...theme.typography.caption,
    fontSize: 12,
    fontWeight: '700',
    color: theme.colors.brandPrimary,
  },
  track: {
    height: 6,
    backgroundColor: theme.colors.gray100,
    borderRadius: 3,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    backgroundColor: theme.colors.actionPrimary,
    borderRadius: 3,
  },
});
