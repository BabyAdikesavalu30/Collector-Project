/**
 * HintPanel Component Family
 * HintButton (trigger), HintCard (single revealed hint), HintPanel
 * (progressive disclosure container). One tap reveals exactly one level;
 * revealed hints stay visible; no repeated consumption.
 * All touch targets are >= 44x44 and every action is accessible.
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { theme } from '../../theme';
import { SupportedLanguage } from '../../config/i18n';
import { FeedbackHint } from '../../features/feedback/feedback.types';
import { getFeedbackI18n, getHintLevelLabel, interpolate } from './feedback.i18n';

// ─────────────────────────── HintButton ───────────────────────────

interface HintButtonProps {
  label?: string;
  onPress: () => void;
  disabled?: boolean;
  remaining?: number;
  language: SupportedLanguage;
}

export const HintButton: React.FC<HintButtonProps> = ({
  label,
  onPress,
  disabled = false,
  remaining = 0,
  language,
}) => {
  const t = getFeedbackI18n(language);
  const text = label || (remaining > 0 ? t.needHint : t.noHintsAvailable);

  return (
    <TouchableOpacity
      style={[styles.button, disabled && styles.buttonDisabled]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
      accessible={true}
      accessibilityRole="button"
      accessibilityLabel={t.hint}
      accessibilityHint={t.hintTooltip}
      hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
    >
      <Text style={styles.buttonIcon}>💡</Text>
      <Text style={[styles.buttonText, disabled && styles.buttonTextDisabled]}>{text}</Text>
      {remaining > 0 && !disabled && (
        <View style={styles.countBadge}>
          <Text style={styles.countText}>{remaining}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

// ─────────────────────────── HintCard ───────────────────────────

interface HintCardProps {
  hint: FeedbackHint;
  language: SupportedLanguage;
}

export const HintCard: React.FC<HintCardProps> = ({ hint, language }) => {
  const t = getFeedbackI18n(language);
  const text = language === 'ta' ? hint.localizedText.ta : hint.localizedText.en;

  return (
    <View
      style={styles.card}
      accessible={true}
      accessibilityRole="text"
      accessibilityLabel={`${getHintLevelLabel(hint.level, t)}: ${text}`}
    >
      <View style={styles.cardHeader}>
        <Text style={styles.cardIcon}>💡</Text>
        <Text style={styles.cardLabel}>{getHintLevelLabel(hint.level, t)}</Text>
      </View>
      <Text style={styles.cardText}>{text}</Text>
    </View>
  );
};

// ─────────────────────────── HintPanel ───────────────────────────

interface HintPanelProps {
  hints: FeedbackHint[];
  language: SupportedLanguage;
  onRevealNext: () => void;
  maxHints?: number;
}

/**
 * Progressive hint disclosure: shows all revealed hints in level order and
 * a single "next hint" trigger. When exhausted, shows a calm completed note.
 */
export const HintPanel: React.FC<HintPanelProps> = ({
  hints,
  language,
  onRevealNext,
  maxHints = 3,
}) => {
  const t = getFeedbackI18n(language);

  if (hints.length === 0 && maxHints === 0) return null;

  const hasAuthoredHints = hints.length >= 0 && maxHints > 0;
  if (!hasAuthoredHints) return null;

  const revealed = hints;
  const canRevealMore = revealed.length < maxHints;

  return (
    <View style={styles.panel}>
      {revealed.map((hint) => (
        <HintCard key={hint.id} hint={hint} language={language} />
      ))}

      {canRevealMore ? (
        <HintButton
          onPress={onRevealNext}
          disabled={false}
          remaining={maxHints - revealed.length}
          language={language}
        />
      ) : (
        revealed.length > 0 && (
          <Text style={styles.exhaustedNote}>{t.allHintsUsed}</Text>
        )
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 44,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    backgroundColor: theme.colors.purple50,
    borderWidth: 1,
    borderColor: theme.colors.purple200,
    borderRadius: theme.borderRadius.md,
    gap: 6,
  },
  buttonDisabled: {
    backgroundColor: theme.colors.gray100,
    borderColor: theme.colors.gray200,
  },
  buttonIcon: {
    fontSize: 14,
  },
  buttonText: {
    ...theme.typography.caption,
    fontSize: 12.5,
    fontWeight: '700',
    color: theme.colors.purple700,
  },
  buttonTextDisabled: {
    color: theme.colors.slate400,
  },
  countBadge: {
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: theme.colors.purple600,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  countText: {
    fontSize: 11,
    fontWeight: '800',
    color: theme.colors.textOnBrand,
  },
  card: {
    backgroundColor: theme.colors.purple50,
    borderWidth: 1,
    borderColor: theme.colors.purple200,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.sm,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 3,
  },
  cardIcon: {
    fontSize: 13,
  },
  cardLabel: {
    ...theme.typography.caption,
    fontSize: 11,
    fontWeight: '800',
    color: theme.colors.purple700,
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },
  cardText: {
    fontSize: 13,
    color: theme.colors.navy900,
    lineHeight: 19,
  },
  panel: {
    marginBottom: theme.spacing.sm,
  },
  exhaustedNote: {
    ...theme.typography.caption,
    fontSize: 11.5,
    fontWeight: '600',
    color: theme.colors.slate500,
    textAlign: 'center',
    paddingVertical: 8,
  },
});
