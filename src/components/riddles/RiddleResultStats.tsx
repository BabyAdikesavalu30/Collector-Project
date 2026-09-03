/**
 * RiddleResultStats Component
 * 2x2 grid displaying Solved, Best Streak, Points, and Hints Used metrics.
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../../theme';

interface RiddleResultStatsProps {
  solvedRiddles: number;
  totalRiddles: number;
  score: number;
  bestStreak: number;
  hintsUsed: number;
  t: {
    riddlesSolved: string;
    bestStreakLabel: string;
    yourScore: string;
    hintsUsedLabel: string;
  };
}

export const RiddleResultStats: React.FC<RiddleResultStatsProps> = ({
  solvedRiddles,
  totalRiddles,
  score,
  bestStreak,
  hintsUsed,
  t,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.grid}>
        {/* Card 1: Solved */}
        <View style={styles.card}>
          <Text style={styles.label}>{t.riddlesSolved}</Text>
          <Text style={[styles.value, { color: theme.colors.green600 }]}>
            {solvedRiddles} / {totalRiddles}
          </Text>
        </View>

        {/* Card 2: Best Streak */}
        <View style={styles.card}>
          <Text style={styles.label}>{t.bestStreakLabel}</Text>
          <Text style={[styles.value, { color: theme.colors.navy900 }]}>
            {bestStreak}
          </Text>
        </View>

        {/* Card 3: Points */}
        <View style={styles.card}>
          <Text style={styles.label}>{t.yourScore}</Text>
          <Text style={[styles.value, { color: theme.colors.brandPrimary }]}>
            +{score}
          </Text>
        </View>

        {/* Card 4: Hints Used */}
        <View style={styles.card}>
          <Text style={styles.label}>{t.hintsUsedLabel}</Text>
          <Text style={[styles.value, { color: theme.colors.warning }]}>
            {hintsUsed}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: theme.spacing.md,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.sm,
  },
  card: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: theme.spacing.md,
    alignItems: 'center',
    shadowColor: theme.colors.navy900,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 2,
  },
  label: {
    ...theme.typography.caption,
    fontSize: 11.5,
    fontWeight: '700',
    color: theme.colors.slate500,
    marginBottom: 4,
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  value: {
    ...theme.typography.h2,
    fontSize: 18,
    fontWeight: '800',
  },
});
