/**
 * ResultStatsGrid Component
 * Displays 4 key performance metrics: Total, Correct, Wrong, Unanswered.
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../../theme';

interface ResultStatsGridProps {
  total: number;
  correct: number;
  wrong: number;
  unanswered: number;
  t: {
    total: string;
    correct: string;
    wrong: string;
    unanswered: string;
  };
}

export const ResultStatsGrid: React.FC<ResultStatsGridProps> = ({
  total,
  correct,
  wrong,
  unanswered,
  t,
}) => {
  return (
    <View style={styles.container}>
      {/* 1. Total */}
      <View style={[styles.statCard, styles.totalCard]}>
        <Text style={[styles.statValue, { color: theme.colors.navy900 }]}>{total}</Text>
        <Text style={styles.statLabel}>{t.total}</Text>
      </View>

      {/* 2. Correct */}
      <View style={[styles.statCard, styles.correctCard]}>
        <Text style={[styles.statValue, { color: theme.colors.green600 }]}>{correct}</Text>
        <Text style={styles.statLabel}>{t.correct}</Text>
      </View>

      {/* 3. Wrong */}
      <View style={[styles.statCard, styles.wrongCard]}>
        <Text style={[styles.statValue, { color: theme.colors.error600 }]}>{wrong}</Text>
        <Text style={styles.statLabel}>{t.wrong}</Text>
      </View>

      {/* 4. Unanswered */}
      <View style={[styles.statCard, styles.unansweredCard]}>
        <Text style={[styles.statValue, { color: theme.colors.slate600 }]}>{unanswered}</Text>
        <Text style={styles.statLabel}>{t.unanswered}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: theme.spacing.md,
    gap: theme.spacing.xs,
  },
  statCard: {
    flex: 1,
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  totalCard: {
    backgroundColor: theme.colors.gray100,
  },
  correctCard: {
    backgroundColor: theme.colors.green50,
    borderColor: theme.colors.green100,
  },
  wrongCard: {
    backgroundColor: theme.colors.error50,
    borderColor: theme.colors.error100,
  },
  unansweredCard: {
    backgroundColor: theme.colors.gray50,
  },
  statValue: {
    ...theme.typography.h2,
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 2,
  },
  statLabel: {
    ...theme.typography.caption,
    fontSize: 11,
    fontWeight: '600',
    color: theme.colors.slate600,
    textAlign: 'center',
  },
});
