/**
 * AchievementCard Component
 * Renders an individual achievement badge in the 2-column gallery grid.
 * Supports unlocked, in_progress, and locked visual states.
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { theme } from '../../theme';
import { SupportedLanguage } from '../../config/i18n';
import { Achievement, AchievementRarity } from '../../features/achievements';
import { getAchievementsI18n } from './achievements.i18n';

interface AchievementCardProps {
  badge: Achievement;
  language?: SupportedLanguage;
  onPress: (badge: Achievement) => void;
}

function getRarityColors(rarity: AchievementRarity): { border: string; bg: string; text: string } {
  switch (rarity) {
    case 'legendary':
      return { border: '#F59E0B', bg: '#FEF3C7', text: '#B45309' };
    case 'epic':
      return { border: '#8B5CF6', bg: '#EDE9FE', text: '#6D28D9' };
    case 'rare':
      return { border: '#3B82F6', bg: '#DBEAFE', text: '#1D4ED8' };
    case 'uncommon':
      return { border: '#10B981', bg: '#D1FAE5', text: '#047857' };
    case 'common':
    default:
      return { border: '#94A3B8', bg: '#F1F5F9', text: '#475569' };
  }
}

function formatUnlockDate(timestamp: number | null | undefined, isTamil: boolean): string {
  if (!timestamp) return '';
  const d = new Date(timestamp);
  const day = d.getDate();
  const months = isTamil
    ? ['ஜன', 'பிப்', 'மார்', 'ஏப்', 'மே', 'ஜூன்', 'ஜூலை', 'ஆக', 'செப்', 'அக்', 'நவ', 'டிச']
    : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${day} ${months[d.getMonth()]}`;
}

const AchievementCardComponent: React.FC<AchievementCardProps> = ({
  badge,
  language = 'en',
  onPress,
}) => {
  const i18n = getAchievementsI18n(language);
  const isTamil = language === 'ta';

  const isUnlocked = badge.status === 'unlocked';
  const isInProgress = badge.status === 'in_progress';
  const isLocked = badge.status === 'locked';

  const title = isTamil ? badge.title.ta : badge.title.en;
  const description = isTamil ? badge.description.ta : badge.description.en;
  const percentage = Math.round(badge.progress.percent);
  const rarityStyle = getRarityColors(badge.rarity);

  return (
    <TouchableOpacity
      style={[
        styles.card,
        isUnlocked && styles.cardUnlocked,
        isInProgress && styles.cardInProgress,
        isLocked && styles.cardLocked,
      ]}
      onPress={() => onPress(badge)}
      activeOpacity={0.8}
      accessible={true}
      accessibilityRole="button"
      accessibilityLabel={`${title}. Status: ${badge.status}. ${percentage}% complete. ${badge.progress.current} of ${badge.progress.target}.`}
    >
      {/* Top Row: Rarity and XP */}
      <View style={styles.topRow}>
        <View style={[styles.rarityBadge, { backgroundColor: rarityStyle.bg }]}>
          <Text style={[styles.rarityText, { color: rarityStyle.text }]}>
            {i18n.rarityLabels[badge.rarity] ?? badge.rarity}
          </Text>
        </View>
        <Text style={styles.xpText}>+{badge.rewardXp} XP</Text>
      </View>

      {/* Icon Circle */}
      <View
        style={[
          styles.iconCircle,
          isUnlocked && styles.iconCircleUnlocked,
          isInProgress && styles.iconCircleInProgress,
          isLocked && styles.iconCircleLocked,
        ]}
      >
        <Text style={[styles.iconText, isLocked && styles.iconTextLocked]}>
          {isLocked ? '🔒' : badge.icon}
        </Text>
      </View>

      {/* Title */}
      <Text style={[styles.title, isLocked && styles.titleLocked]} numberOfLines={2}>
        {title}
      </Text>

      {/* Status Subtitle */}
      {isUnlocked && (
        <Text style={styles.unlockDate} numberOfLines={1}>
          ✓ {i18n.unlockedOn} {formatUnlockDate(badge.unlockedAt, isTamil)}
        </Text>
      )}

      {isInProgress && (
        <View style={styles.progressSection}>
          <View style={styles.progressMeta}>
            <Text style={styles.progressCount}>
              {badge.progress.current}/{badge.progress.target}
            </Text>
            <Text style={styles.progressPct}>{percentage}%</Text>
          </View>
          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { width: `${Math.min(percentage, 100)}%` }]} />
          </View>
        </View>
      )}

      {isLocked && (
        <Text style={styles.lockedHint} numberOfLines={2}>
          {description}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export const AchievementCard = React.memo(AchievementCardComponent);

const styles = StyleSheet.create({
  card: {
    width: '48.5%',
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.sm,
    borderWidth: 1,
    borderColor: theme.colors.border,
    alignItems: 'center',
    shadowColor: theme.colors.navy900,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 1,
    minHeight: 170,
    justifyContent: 'space-between',
  },
  cardUnlocked: {
    borderColor: '#86EFAC',
    backgroundColor: '#FAFCF8',
  },
  cardInProgress: {
    borderColor: '#C4B5FD',
    backgroundColor: '#FCFBFF',
  },
  cardLocked: {
    borderColor: theme.colors.gray200,
    backgroundColor: '#FAFAFA',
    opacity: 0.78,
  },
  topRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rarityBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  rarityText: {
    ...theme.typography.caption,
    fontSize: 9.5,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  xpText: {
    ...theme.typography.caption,
    fontSize: 10,
    fontWeight: '700',
    color: '#B45309',
  },
  iconCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 6,
  },
  iconCircleUnlocked: {
    backgroundColor: '#DCFCE7',
    borderWidth: 1.5,
    borderColor: '#86EFAC',
  },
  iconCircleInProgress: {
    backgroundColor: '#EDE9FE',
    borderWidth: 1.5,
    borderColor: '#C4B5FD',
  },
  iconCircleLocked: {
    backgroundColor: theme.colors.gray100,
    borderWidth: 1,
    borderColor: theme.colors.gray200,
  },
  iconText: {
    fontSize: 24,
  },
  iconTextLocked: {
    fontSize: 20,
    opacity: 0.8,
  },
  title: {
    ...theme.typography.caption,
    fontSize: 13,
    fontWeight: '800',
    color: theme.colors.navy900,
    textAlign: 'center',
    marginBottom: 4,
  },
  titleLocked: {
    color: theme.colors.slate600,
  },
  unlockDate: {
    ...theme.typography.caption,
    fontSize: 10.5,
    color: '#15803D',
    fontWeight: '700',
    textAlign: 'center',
  },
  progressSection: {
    width: '100%',
    marginTop: 2,
  },
  progressMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 3,
  },
  progressCount: {
    ...theme.typography.caption,
    fontSize: 10,
    fontWeight: '600',
    color: theme.colors.slate600,
  },
  progressPct: {
    ...theme.typography.caption,
    fontSize: 10,
    fontWeight: '800',
    color: '#7C3AED',
  },
  progressTrack: {
    height: 5,
    backgroundColor: '#EDE9FE',
    borderRadius: 2.5,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#7C3AED',
    borderRadius: 2.5,
  },
  lockedHint: {
    ...theme.typography.caption,
    fontSize: 10.5,
    color: theme.colors.slate500,
    textAlign: 'center',
    lineHeight: 14,
  },
});
