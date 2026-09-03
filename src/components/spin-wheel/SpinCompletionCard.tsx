/**
 * SpinCompletionCard Component
 * Daily completion summary card showing earned points and navigation actions.
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { theme } from '../../theme';

interface SpinCompletionCardProps {
  pointsEarned: number;
  onBackToGames: () => void;
  onBackToHome: () => void;
  t: {
    todaysSpinCompleteTitle: string;
    comeBackTomorrow: string;
    pointsWord: string;
    backToGames: string;
    backToHome: string;
  };
}

export const SpinCompletionCard: React.FC<SpinCompletionCardProps> = ({
  pointsEarned,
  onBackToGames,
  onBackToHome,
  t,
}) => {
  return (
    <View style={styles.card}>
      {/* Trophy / Star Icon */}
      <View style={styles.iconCircle}>
        <Text style={styles.icon}>🏆</Text>
      </View>

      {/* Completion Title */}
      <Text style={styles.title}>{t.todaysSpinCompleteTitle}</Text>
      <Text style={styles.subtitle}>{t.comeBackTomorrow}</Text>

      {/* Points Summary Badge */}
      <View style={styles.pointsContainer}>
        <Text style={styles.pointsValue}>+{pointsEarned}</Text>
        <Text style={styles.pointsLabel}>{t.pointsWord}</Text>
      </View>

      {/* Primary Action: Back to Games */}
      <TouchableOpacity
        style={styles.primaryButton}
        onPress={onBackToGames}
        activeOpacity={0.8}
        accessible={true}
        accessibilityRole="button"
        accessibilityLabel={t.backToGames}
      >
        <Text style={styles.primaryButtonText}>{t.backToGames}</Text>
      </TouchableOpacity>

      {/* Secondary Action: Back to Home */}
      <TouchableOpacity
        style={styles.secondaryButton}
        onPress={onBackToHome}
        activeOpacity={0.7}
        accessible={true}
        accessibilityRole="button"
        accessibilityLabel={t.backToHome}
      >
        <Text style={styles.secondaryButtonText}>{t.backToHome}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '100%',
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: theme.spacing.lg,
    marginTop: theme.spacing.md,
    alignItems: 'center',
    shadowColor: theme.colors.navy900,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  iconCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: theme.colors.warningBackground,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  icon: {
    fontSize: 30,
  },
  title: {
    ...theme.typography.h2,
    fontSize: 20,
    fontWeight: '800',
    color: theme.colors.navy900,
    textAlign: 'center',
    marginBottom: 4,
  },
  subtitle: {
    ...theme.typography.body,
    fontSize: 13.5,
    color: theme.colors.slate600,
    textAlign: 'center',
    marginBottom: theme.spacing.md,
  },
  pointsContainer: {
    alignItems: 'center',
    backgroundColor: theme.colors.green50,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderColor: theme.colors.green200,
    marginBottom: theme.spacing.lg,
  },
  pointsValue: {
    ...theme.typography.h1,
    fontSize: 28,
    fontWeight: '900',
    color: theme.colors.green600,
  },
  pointsLabel: {
    ...theme.typography.caption,
    fontSize: 11,
    fontWeight: '800',
    color: theme.colors.green700,
    letterSpacing: 0.8,
  },
  primaryButton: {
    width: '100%',
    height: 48,
    backgroundColor: theme.colors.actionPrimary,
    borderRadius: theme.borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.xs,
  },
  primaryButtonText: {
    ...theme.typography.button,
    color: theme.colors.textOnAction,
    fontSize: 14,
    fontWeight: '800',
  },
  secondaryButton: {
    paddingVertical: 8,
    alignItems: 'center',
  },
  secondaryButtonText: {
    ...theme.typography.caption,
    fontSize: 13,
    fontWeight: '700',
    color: theme.colors.slate600,
  },
});
