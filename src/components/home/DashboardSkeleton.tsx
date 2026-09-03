/**
 * DashboardSkeleton Component
 * Placeholder skeleton loader for dashboard initial fetch state.
 * Clean Pearl White & White card placeholders with subtle gray pulses.
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { theme } from '../../theme';

export const DashboardSkeleton: React.FC = () => {
  return (
    <View style={styles.container}>
      {/* Header Skeleton */}
      <View style={styles.headerRow}>
        <View style={styles.avatarSkeleton} />
        <View style={styles.nameBlock}>
          <View style={styles.greetingSkeleton} />
          <View style={styles.metaSkeleton} />
        </View>
        <View style={styles.bellSkeleton} />
      </View>

      {/* Progress Hero Skeleton */}
      <View style={styles.heroSkeleton}>
        <View style={styles.pillSkeleton} />
        <View style={styles.barSkeleton} />
        <View style={styles.statsSkeletonRow}>
          <View style={styles.statPillSkeleton} />
          <View style={styles.statPillSkeleton} />
        </View>
      </View>

      {/* Continue Learning Skeleton */}
      <View style={styles.continueSkeleton} />

      {/* Quick Action Grid Skeleton */}
      <View style={styles.gridSkeleton}>
        <View style={styles.gridCardSkeleton} />
        <View style={styles.gridCardSkeleton} />
        <View style={styles.gridCardSkeleton} />
        <View style={styles.gridCardSkeleton} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingVertical: theme.spacing.sm,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  avatarSkeleton: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: theme.colors.gray200,
    marginRight: 12,
  },
  nameBlock: {
    flex: 1,
  },
  greetingSkeleton: {
    width: 140,
    height: 18,
    borderRadius: 4,
    backgroundColor: theme.colors.gray200,
    marginBottom: 6,
  },
  metaSkeleton: {
    width: 100,
    height: 12,
    borderRadius: 3,
    backgroundColor: theme.colors.gray100,
  },
  bellSkeleton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: theme.colors.white,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  heroSkeleton: {
    width: '100%',
    height: 140,
    borderRadius: theme.borderRadius.lg,
    backgroundColor: theme.colors.white,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: theme.spacing.base,
    marginBottom: theme.spacing.md,
    justifyContent: 'space-between',
    shadowColor: theme.colors.navy900,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 1,
  },
  pillSkeleton: {
    width: 110,
    height: 16,
    borderRadius: 8,
    backgroundColor: theme.colors.gray200,
  },
  barSkeleton: {
    width: '100%',
    height: 10,
    borderRadius: 5,
    backgroundColor: theme.colors.gray200,
  },
  statsSkeletonRow: {
    flexDirection: 'row',
    gap: 8,
  },
  statPillSkeleton: {
    width: 90,
    height: 24,
    borderRadius: 12,
    backgroundColor: theme.colors.gray100,
  },
  continueSkeleton: {
    width: '100%',
    height: 95,
    borderRadius: theme.borderRadius.lg,
    backgroundColor: theme.colors.white,
    borderWidth: 1,
    borderColor: theme.colors.border,
    marginBottom: theme.spacing.md,
    shadowColor: theme.colors.navy900,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 1,
  },
  gridSkeleton: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 8,
  },
  gridCardSkeleton: {
    width: '48.5%',
    height: 56,
    borderRadius: theme.borderRadius.md,
    backgroundColor: theme.colors.white,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
});
