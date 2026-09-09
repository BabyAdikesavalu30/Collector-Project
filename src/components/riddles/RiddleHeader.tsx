/**
 * RiddleHeader Component
 * Safe-area top row with canonical AppBackButton, screen title, and coin/points badge.
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { theme } from '../../theme';
import { AppBackButton } from '../navigation';
import { LanguageToggle } from '../language';

interface RiddleHeaderProps {
  title: string;
  points: number;
  onBack: () => void;
  backLabel: string;
  coinLabel: string;
}

export const RiddleHeader: React.FC<RiddleHeaderProps> = ({
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

      {/* Right Cluster: Language Toggle + Points Badge */}
      <View style={styles.rightCluster}>
        <LanguageToggle />
        <View
          style={styles.pointsBadge}
          accessible={true}
          accessibilityRole="text"
          accessibilityLabel={coinLabel}
        >
          <Text style={styles.pointsText}>🪙 {points}</Text>
        </View>
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
  rightCluster: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  pointsBadge: {
    backgroundColor: theme.colors.warningBackground,
    borderWidth: 1,
    borderColor: theme.colors.warningBorder,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: theme.borderRadius.full,
  },
  pointsText: {
    ...theme.typography.caption,
    fontWeight: '800',
    color: theme.colors.navy900,
  },
});
