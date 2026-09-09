/**
 * LoadingState — skeleton-style loading placeholder (never a blank screen).
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { theme } from '../../theme';

interface LoadingStateProps {
  rows?: number;
}

export const LoadingState: React.FC<LoadingStateProps> = ({ rows = 3 }) => (
  <View style={styles.container} accessibilityLabel="Loading" accessibilityRole="progressbar">
    <View style={[styles.block, styles.titleBlock]} />
    {Array.from({ length: rows }).map((_, index) => (
      <View key={index} style={styles.card}>
        <View style={styles.row}>
          <View style={styles.avatar} />
          <View style={styles.lines}>
            <View style={styles.lineWide} />
            <View style={styles.lineNarrow} />
          </View>
        </View>
      </View>
    ))}
  </View>
);

const styles = StyleSheet.create({
  container: {
    padding: theme.spacing.base,
  },
  block: {
    backgroundColor: theme.colors.gray200,
    borderRadius: theme.borderRadius.sm,
  },
  titleBlock: {
    width: '45%',
    height: 18,
    marginBottom: theme.spacing.md,
  },
  card: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: theme.spacing.base,
    marginBottom: theme.spacing.sm,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.colors.gray200,
  },
  lines: {
    flex: 1,
    gap: 6,
  },
  lineWide: {
    width: '85%',
    height: 12,
    borderRadius: 6,
    backgroundColor: theme.colors.gray200,
  },
  lineNarrow: {
    width: '55%',
    height: 10,
    borderRadius: 5,
    backgroundColor: theme.colors.gray100,
  },
});