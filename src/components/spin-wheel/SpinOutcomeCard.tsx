/**
 * SpinOutcomeCard Component
 * Displays Science Fact or Bonus Points outcome with information and continue action.
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { theme } from '../../theme';
import { SupportedLanguage } from '../../config/i18n';
import { SpinWheelFact, SpinWheelBonus } from '../../features/spin-wheel';

interface SpinOutcomeCardProps {
  payload:
    | { type: 'fact'; data: SpinWheelFact }
    | { type: 'bonus'; data: SpinWheelBonus };
  language: SupportedLanguage;
  onContinue: () => void;
  continueLabel: string;
}

export const SpinOutcomeCard: React.FC<SpinOutcomeCardProps> = ({
  payload,
  language,
  onContinue,
  continueLabel,
}) => {
  const isTamil = language === 'ta';
  const isBonus = payload.type === 'bonus';
  const data = payload.data;

  const badgeText = isTamil ? data.badge.ta : data.badge.en;
  const titleText = isTamil ? data.title.ta : data.title.en;
  const bodyText =
    isBonus
      ? isTamil
        ? (data as SpinWheelBonus).message.ta
        : (data as SpinWheelBonus).message.en
      : isTamil
      ? (data as SpinWheelFact).fact.ta
      : (data as SpinWheelFact).fact.en;

  const icon = isBonus ? '🎁' : '🌍';

  return (
    <View style={styles.card}>
      {/* Icon & Badge Header */}
      <View style={styles.iconCircle}>
        <Text style={styles.icon}>{icon}</Text>
      </View>

      <Text style={styles.badge}>{badgeText}</Text>
      <Text style={styles.title}>{titleText}</Text>
      <Text style={styles.body}>{bodyText}</Text>

      {/* Points Badge */}
      <View style={styles.pointsBadge}>
        <Text style={styles.pointsText}>+{data.points} points</Text>
      </View>

      {/* Continue Action */}
      <TouchableOpacity
        style={styles.continueButton}
        onPress={onContinue}
        activeOpacity={0.8}
        accessible={true}
        accessibilityRole="button"
        accessibilityLabel={continueLabel}
      >
        <Text style={styles.continueButtonText}>{continueLabel}</Text>
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
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: theme.colors.purple50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  icon: {
    fontSize: 28,
  },
  badge: {
    ...theme.typography.caption,
    fontSize: 12,
    fontWeight: '800',
    color: theme.colors.brandPrimary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  title: {
    ...theme.typography.h2,
    fontSize: 18,
    fontWeight: '800',
    color: theme.colors.navy900,
    textAlign: 'center',
    marginBottom: theme.spacing.xs,
  },
  body: {
    ...theme.typography.body,
    fontSize: 14,
    color: theme.colors.slate600,
    textAlign: 'center',
    lineHeight: 21,
    marginBottom: theme.spacing.md,
  },
  pointsBadge: {
    backgroundColor: theme.colors.green50,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: theme.borderRadius.full,
    borderWidth: 1,
    borderColor: theme.colors.green200,
    marginBottom: theme.spacing.md,
  },
  pointsText: {
    ...theme.typography.caption,
    fontSize: 12.5,
    fontWeight: '800',
    color: theme.colors.green600,
  },
  continueButton: {
    width: '100%',
    height: 48,
    backgroundColor: theme.colors.actionPrimary,
    borderRadius: theme.borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  continueButtonText: {
    ...theme.typography.button,
    color: theme.colors.textOnAction,
    fontSize: 14,
    fontWeight: '800',
  },
});
