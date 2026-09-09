/**
 * DailyGoalReward Component
 * Shows the reward for completing the daily goal.
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../../theme';
import { SupportedLanguage } from '../../config/i18n';
import { DailyGoalReward as DailyGoalRewardType } from '../../features/daily-goal';

interface DailyGoalRewardProps {
  reward: DailyGoalRewardType;
  claimed: boolean;
  language: SupportedLanguage;
}

export const DailyGoalReward: React.FC<DailyGoalRewardProps> = ({ reward, claimed, language }) => {
  const isTamil = language === 'ta';

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{isTamil ? 'வெகுமதி' : 'REWARD'}</Text>
      <View style={styles.rewardsRow}>
        <View style={styles.rewardItem}>
          <Text style={styles.rewardIcon}>⭐</Text>
          <View style={styles.rewardContent}>
            <Text style={styles.rewardAmount}>+{reward.points}</Text>
            <Text style={styles.rewardType}>{isTamil ? 'புள்ளிகள்' : 'Points'}</Text>
          </View>
        </View>
        <View style={styles.divider} />
        <View style={styles.rewardItem}>
          <Text style={styles.rewardIcon}>⚡</Text>
          <View style={styles.rewardContent}>
            <Text style={styles.rewardAmount}>+{reward.xp}</Text>
            <Text style={styles.rewardType}>{isTamil ? 'XP' : 'XP'}</Text>
          </View>
        </View>
      </View>
      {claimed && (
        <View style={styles.claimedBadge}>
          <Text style={styles.claimedText}>
            {isTamil ? '✓ வெகுமதி பெறப்பட்டது' : '✓ Reward Claimed'}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.brandBadge,
    borderWidth: 1,
    borderColor: theme.colors.brandBadgeBorder,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.base,
  },
  label: {
    ...theme.typography.overline,
    fontSize: 10,
    fontWeight: '800',
    color: theme.colors.brandPrimary,
    letterSpacing: 1,
    marginBottom: theme.spacing.xs,
    textAlign: 'center',
  },
  rewardsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing.md,
  },
  rewardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  rewardIcon: {
    fontSize: 20,
  },
  rewardContent: {},
  rewardAmount: {
    ...theme.typography.h3,
    fontSize: 20,
    fontWeight: '800',
    color: theme.colors.navy900,
    lineHeight: 24,
  },
  rewardType: {
    ...theme.typography.caption,
    fontSize: 11,
    color: theme.colors.slate500,
  },
  divider: {
    width: 1,
    height: 32,
    backgroundColor: theme.colors.brandBadgeBorder,
  },
  claimedBadge: {
    marginTop: theme.spacing.md,
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: theme.colors.successSurface,
    borderRadius: theme.borderRadius.md,
    alignSelf: 'center',
  },
  claimedText: {
    ...theme.typography.caption,
    fontSize: 11,
    fontWeight: '700',
    color: theme.colors.success,
  },
});