/**
 * PointsSummary Component
 * Shows points earned and best streak cards.
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../../theme';

interface PointsSummaryProps {
  score: number;
  bestStreak: number;
  t: {
    pointsEarned: string;
    bestStreak: string;
  };
}

export const PointsSummary: React.FC<PointsSummaryProps> = ({
  score,
  bestStreak,
  t,
}) => {
  return (
    <View style={styles.container}>
      {/* 1. Points Earned */}
      <View style={styles.card}>
        <View style={styles.iconCircle}>
          <Text style={styles.icon}>⭐</Text>
        </View>
        <View style={styles.textGroup}>
          <Text style={styles.label}>{t.pointsEarned}</Text>
          <Text style={styles.value}>+{score}</Text>
        </View>
      </View>

      {/* 2. Best Streak */}
      <View style={styles.card}>
        <View style={[styles.iconCircle, styles.streakCircle]}>
          <Text style={styles.icon}>🔥</Text>
        </View>
        <View style={styles.textGroup}>
          <Text style={styles.label}>{t.bestStreak}</Text>
          <Text style={styles.value}>{bestStreak}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    gap: theme.spacing.sm,
    marginBottom: theme.spacing.md,
  },
  card: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: theme.spacing.sm,
  },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: theme.colors.warningBackground,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.sm,
  },
  streakCircle: {
    backgroundColor: theme.colors.error50,
  },
  icon: {
    fontSize: 18,
  },
  textGroup: {
    flex: 1,
  },
  label: {
    ...theme.typography.caption,
    fontSize: 11,
    color: theme.colors.slate600,
    fontWeight: '600',
  },
  value: {
    ...theme.typography.h3,
    fontSize: 17,
    fontWeight: '800',
    color: theme.colors.navy900,
  },
});
