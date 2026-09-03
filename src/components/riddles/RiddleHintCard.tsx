/**
 * RiddleHintCard Component
 * Optional hint toggle and revealed clue box.
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { theme } from '../../theme';
import { SupportedLanguage } from '../../config/i18n';
import { RiddleQuestion } from '../../features/riddles';

interface RiddleHintCardProps {
  riddle: RiddleQuestion;
  hintRevealed: boolean;
  onRevealHint: () => void;
  language: SupportedLanguage;
  t: {
    needHint: string;
    hintLabel: string;
    accessibility: {
      hintButtonHint: string;
    };
  };
}

export const RiddleHintCard: React.FC<RiddleHintCardProps> = ({
  riddle,
  hintRevealed,
  onRevealHint,
  language,
  t,
}) => {
  if (!riddle.hint) return null;

  const isTamil = language === 'ta';
  const hintText = isTamil ? riddle.hint.ta : riddle.hint.en;

  if (!hintRevealed) {
    return (
      <TouchableOpacity
        style={styles.hintTrigger}
        onPress={onRevealHint}
        activeOpacity={0.7}
        accessible={true}
        accessibilityRole="button"
        accessibilityLabel={t.needHint}
        accessibilityHint={t.accessibility.hintButtonHint}
      >
        <Text style={styles.hintTriggerIcon}>💡</Text>
        <Text style={styles.hintTriggerText}>{t.needHint}</Text>
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.hintBox}>
      <View style={styles.hintHeader}>
        <Text style={styles.hintIcon}>💡</Text>
        <Text style={styles.hintLabel}>{t.hintLabel}</Text>
      </View>
      <Text style={styles.hintText}>{hintText}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  hintTrigger: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    backgroundColor: theme.colors.warningBackground,
    borderWidth: 1,
    borderColor: theme.colors.warningBorder,
    borderRadius: theme.borderRadius.md,
    marginBottom: theme.spacing.md,
  },
  hintTriggerIcon: {
    fontSize: 16,
    marginRight: 6,
  },
  hintTriggerText: {
    ...theme.typography.caption,
    fontSize: 13,
    fontWeight: '700',
    color: theme.colors.warning,
  },
  hintBox: {
    width: '100%',
    backgroundColor: theme.colors.warningBackground,
    borderWidth: 1,
    borderColor: theme.colors.warningBorder,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
  },
  hintHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  hintIcon: {
    fontSize: 14,
    marginRight: 4,
  },
  hintLabel: {
    ...theme.typography.caption,
    fontSize: 11.5,
    fontWeight: '800',
    color: theme.colors.warning,
    textTransform: 'uppercase',
  },
  hintText: {
    ...theme.typography.caption,
    fontSize: 13,
    color: theme.colors.navy900,
    lineHeight: 18,
  },
});
