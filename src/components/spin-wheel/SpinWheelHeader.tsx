/**
 * SpinWheelHeader Component
 * Safe-area top header with canonical AppBackButton, screen title, and coins/points indicator.
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { theme } from '../../theme';
import { AppBackButton } from '../navigation';

interface SpinWheelHeaderProps {
  title: string;
  points: number;
  onBack: () => void;
  backLabel: string;
  coinLabel: string;
}

export const SpinWheelHeader: React.FC<SpinWheelHeaderProps> = ({
  title,
  points,
  onBack,
  backLabel,
  coinLabel,
}) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top + theme.spacing.sm }]}>
      {/* Canonical Back Button */}
      <AppBackButton
        onPress={onBack}
        accessibilityLabel={backLabel}
        style={styles.backButton}
      />

      {/* Screen Title */}
      <Text style={styles.title} numberOfLines={1}>
        {title}
      </Text>

      {/* Points Indicator */}
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
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.base,
    paddingBottom: theme.spacing.sm,
    backgroundColor: theme.colors.white,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  backButton: {},
  title: {
    ...theme.typography.h3,
    fontSize: 18,
    fontWeight: '800',
    color: theme.colors.navy900,
    flex: 1,
    textAlign: 'center',
    marginHorizontal: 8,
  },
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
});
