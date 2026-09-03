/**
 * GamesHeader Component
 * Top bar for the Games Hub with canonical AppBackButton, title, and points indicator.
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { theme } from '../../theme';
import { AppBackButton } from '../navigation';

interface GamesHeaderProps {
  title: string;
  subtitle: string;
  points?: number;
  onBack: () => void;
  coinLabel?: string;
  backLabel?: string;
}

export const GamesHeader: React.FC<GamesHeaderProps> = ({
  title,
  subtitle,
  points = 1250,
  onBack,
  coinLabel = '{points} points',
  backLabel = 'Back to Home',
}) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top + theme.spacing.sm }]}>
      {/* Top Navigation Row */}
      <View style={styles.topRow}>
        <AppBackButton
          onPress={onBack}
          accessibilityLabel={backLabel}
          style={styles.backBtn}
        />

        <View
          style={styles.coinBadge}
          accessible={true}
          accessibilityRole="text"
          accessibilityLabel={coinLabel.replace('{points}', String(points))}
        >
          <Text style={styles.coinIcon}>🪙</Text>
          <Text style={styles.coinText}>{points}</Text>
        </View>
      </View>

      {/* Main Title & Subtitle */}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.white,
    paddingHorizontal: theme.spacing.base,
    paddingBottom: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.md,
  },
  backBtn: {},
  coinBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.warningBackground,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: theme.borderRadius.full,
    borderWidth: 1,
    borderColor: theme.colors.warningBorder,
  },
  coinIcon: {
    fontSize: 14,
    marginRight: 4,
  },
  coinText: {
    ...theme.typography.caption,
    fontWeight: '800',
    color: theme.colors.navy900,
  },
  titleContainer: {
    marginTop: 2,
  },
  title: {
    ...theme.typography.h1,
    fontSize: 22,
    fontWeight: '900',
    color: theme.colors.navy900,
    letterSpacing: -0.5,
  },
  subtitle: {
    ...theme.typography.caption,
    fontSize: 13,
    color: theme.colors.slate600,
    marginTop: 2,
  },
});
