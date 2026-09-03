/**
 * RiddleScoreRing Component
 * Circular score display indicator with points value and points label.
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../../theme';

interface RiddleScoreRingProps {
  score: number;
  pointsLabel: string;
  isPerfect: boolean;
}

export const RiddleScoreRing: React.FC<RiddleScoreRingProps> = ({
  score,
  pointsLabel,
  isPerfect,
}) => {
  return (
    <View style={styles.container}>
      <View
        style={[
          styles.outerRing,
          {
            borderColor: isPerfect ? theme.colors.green600 : theme.colors.actionPrimary,
          },
        ]}
      >
        <View style={styles.innerCircle}>
          <Text style={styles.scoreText}>{score}</Text>
          <Text style={styles.pointsLabel}>{pointsLabel}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: theme.spacing.lg,
  },
  outerRing: {
    width: 156,
    height: 156,
    borderRadius: 78,
    borderWidth: 7,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.white,
    shadowColor: theme.colors.brandPrimary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 4,
  },
  innerCircle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  scoreText: {
    ...theme.typography.h1,
    fontSize: 40,
    fontWeight: '900',
    color: theme.colors.navy900,
    lineHeight: 46,
  },
  pointsLabel: {
    ...theme.typography.caption,
    fontSize: 12,
    fontWeight: '800',
    color: theme.colors.brandPrimary,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
});
