/**
 * DailyChallengeCard Component
 * Engaging daily scientific question card with points reward and instant challenge CTA.
 * Clean White card on Pearl White base.
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { theme } from '../../theme';
import { DailyChallenge } from '../../features/home/home.types';
import { SupportedLanguage, getTranslation } from '../../config/i18n';

interface DailyChallengeCardProps {
  challenge: DailyChallenge;
  language?: SupportedLanguage;
  onStart: () => void;
}

export const DailyChallengeCard: React.FC<DailyChallengeCardProps> = ({
  challenge,
  language = 'en',
  onStart,
}) => {
  const t = getTranslation(language).home;

  return (
    <View
      style={styles.container}
      accessible={true}
      accessibilityRole="summary"
      accessibilityLabel={`${t.dailyChallenge}: ${
        language === 'ta' && challenge.titleTa ? challenge.titleTa : challenge.title
      }. ${challenge.xpReward} ${t.points}.`}
    >
      {/* Header: Trophy Icon + Badge + Points */}
      <View style={styles.headerRow}>
        <View style={styles.badgePill}>
          <Text style={styles.badgeIcon}>⚡</Text>
          <Text style={styles.badgeText}>{t.dailyChallenge}</Text>
        </View>

        <View style={styles.metaBadge}>
          <Text style={styles.metaText}>+{challenge.xpReward} PTS</Text>
        </View>
      </View>

      {/* Challenge Title & Question Preview */}
      <Text style={styles.challengeTitle} numberOfLines={1}>
        {language === 'ta' && challenge.titleTa ? challenge.titleTa : challenge.title}
      </Text>
      <Text style={styles.questionText} numberOfLines={2}>
        {language === 'ta' && challenge.questionPreviewTa
          ? challenge.questionPreviewTa
          : challenge.questionPreview}
      </Text>

      {/* Action CTA Button */}
      <TouchableOpacity
        style={styles.startButton}
        onPress={onStart}
        activeOpacity={0.85}
        accessible={true}
        accessibilityRole="button"
        accessibilityLabel={t.startChallenge}
        accessibilityHint={t.accessibility.dailyChallengeHint}
      >
        <Text style={styles.startButtonText}>{t.startChallenge} →</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: theme.spacing.base,
    marginVertical: theme.spacing.xs,
    shadowColor: theme.colors.navy900,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  badgePill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.purple100,
    borderWidth: 1,
    borderColor: theme.colors.purple200,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: theme.borderRadius.full,
  },
  badgeIcon: {
    fontSize: 12,
    marginRight: 4,
  },
  badgeText: {
    ...theme.typography.overline,
    fontSize: 9.5,
    color: theme.colors.brandPrimary,
    letterSpacing: 1.1,
    fontWeight: '700',
  },
  metaBadge: {
    backgroundColor: theme.colors.blue50,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: theme.borderRadius.full,
  },
  metaText: {
    ...theme.typography.caption,
    fontSize: 11,
    color: theme.colors.actionPrimary,
    fontWeight: '700',
  },
  challengeTitle: {
    ...theme.typography.h3,
    fontSize: 15,
    fontWeight: '700',
    color: theme.colors.navy900,
    marginBottom: 2,
  },
  questionText: {
    ...theme.typography.body,
    fontSize: 13,
    color: theme.colors.slate600,
    lineHeight: 18,
    marginBottom: theme.spacing.sm,
  },
  startButton: {
    alignSelf: 'flex-start',
    backgroundColor: theme.colors.actionPrimary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: theme.borderRadius.md,
    shadowColor: theme.colors.actionPrimary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 2,
  },
  startButtonText: {
    ...theme.typography.caption,
    fontSize: 12.5,
    fontWeight: '800',
    color: theme.colors.textOnAction,
  },
});
