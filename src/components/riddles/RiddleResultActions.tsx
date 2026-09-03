/**
 * RiddleResultActions Component
 * Action buttons for Riddle Results: Play Again, Back to Riddles, and Back to Home.
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { theme } from '../../theme';

interface RiddleResultActionsProps {
  onPlayAgain: () => void;
  onBackToRiddles: () => void;
  onBackToHome: () => void;
  playAgainLabel: string;
  backToRiddlesLabel: string;
  backToHomeLabel: string;
  playAgainHint: string;
}

export const RiddleResultActions: React.FC<RiddleResultActionsProps> = ({
  onPlayAgain,
  onBackToRiddles,
  onBackToHome,
  playAgainLabel,
  backToRiddlesLabel,
  backToHomeLabel,
  playAgainHint,
}) => {
  return (
    <View style={styles.container}>
      {/* 1. Primary CTA: Play Again */}
      <TouchableOpacity
        style={styles.primaryButton}
        onPress={onPlayAgain}
        activeOpacity={0.8}
        accessible={true}
        accessibilityRole="button"
        accessibilityLabel={playAgainLabel}
        accessibilityHint={playAgainHint}
      >
        <Text style={styles.primaryButtonText}>{playAgainLabel}</Text>
      </TouchableOpacity>

      {/* 2. Secondary CTA: Back to Riddles */}
      <TouchableOpacity
        style={styles.secondaryButton}
        onPress={onBackToRiddles}
        activeOpacity={0.8}
        accessible={true}
        accessibilityRole="button"
        accessibilityLabel={backToRiddlesLabel}
      >
        <Text style={styles.secondaryButtonText}>{backToRiddlesLabel}</Text>
      </TouchableOpacity>

      {/* 3. Tertiary Link: Back to Home */}
      <TouchableOpacity
        style={styles.homeLink}
        onPress={onBackToHome}
        activeOpacity={0.7}
        accessible={true}
        accessibilityRole="button"
        accessibilityLabel={backToHomeLabel}
      >
        <Text style={styles.homeLinkText}>{backToHomeLabel}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: theme.spacing.sm,
    gap: theme.spacing.sm,
  },
  primaryButton: {
    width: '100%',
    height: 50,
    backgroundColor: theme.colors.actionPrimary,
    borderRadius: theme.borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: theme.colors.brandPrimary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 3,
  },
  primaryButtonText: {
    ...theme.typography.button,
    color: theme.colors.textOnAction,
    fontSize: 15,
    fontWeight: '800',
  },
  secondaryButton: {
    width: '100%',
    height: 48,
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  secondaryButtonText: {
    ...theme.typography.button,
    color: theme.colors.navy900,
    fontSize: 14,
    fontWeight: '700',
  },
  homeLink: {
    paddingVertical: theme.spacing.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  homeLinkText: {
    ...theme.typography.caption,
    fontSize: 13,
    fontWeight: '700',
    color: theme.colors.slate600,
  },
});
