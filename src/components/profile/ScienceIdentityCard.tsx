/**
 * ScienceIdentityCard — the student's science identity: current level, title,
 * XP progress to the next level, current streak, and total points.
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { theme } from '../../theme';
import { SupportedLanguage, getTranslation } from '../../config/i18n';
import { ScienceLevelInfo } from '../../features/levels';
import { StreakInfo } from '../../features/streaks';
import { ProgressBar } from '../shared';

interface ScienceIdentityCardProps {
  level: ScienceLevelInfo;
  totalXp: number;
  streak: StreakInfo;
  language: SupportedLanguage;
  onOpenRewards: () => void;
  onOpenStreak?: () => void;
}

export const ScienceIdentityCard: React.FC<ScienceIdentityCardProps> = ({
  level,
  totalXp,
  streak,
  language,
  onOpenRewards,
  onOpenStreak,
}) => {
  const t = getTranslation(language).progress.profile;
  const isTamil = language === 'ta';
  const levelTitle = t.levelTitle.replace('{level}', String(level.level));

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onOpenRewards}
      activeOpacity={0.9}
      accessible={true}
      accessibilityRole="button"
      accessibilityLabel={`${t.scienceLevel} ${level.level} — ${isTamil ? level.titleTa : level.title}. ${totalXp} XP. ${t.currentStreak} ${streak.currentStreak}`}
    >
      <View style={styles.topRow}>
        <View style={styles.levelIconCircle}>
          <Text style={styles.levelIcon}>{level.icon}</Text>
        </View>
        <View style={styles.levelBlock}>
          <Text style={styles.levelLabel}>{t.scienceLevel.toUpperCase()}</Text>
          <Text style={styles.levelTitle}>{levelTitle}</Text>
          <Text style={styles.levelName}>{isTamil ? level.titleTa : level.title}</Text>
        </View>
        <View style={styles.xpBlock}>
          <Text style={styles.xpValue}>{totalXp.toLocaleString()}</Text>
          <Text style={styles.xpLabel}>{t.xp}</Text>
        </View>
      </View>

      <View style={styles.progressArea}>
        <ProgressBar
          progress={level.progressPercent}
          label={`${t.scienceLevel} ${level.progressPercent}%`}
          color={theme.colors.brandPrimary}
          trackColor={theme.colors.purple100}
        />
        <Text style={styles.xpToNext}>
          {level.isMaxLevel
            ? t.maxLevel
            : t.xpToNextLevel.replace('{xp}', String(level.xpToNextLevel)).replace('{level}', String(level.level + 1))}
        </Text>
      </View>

      <View style={styles.statsRow}>
        <TouchableOpacity
          style={styles.statItem}
          onPress={onOpenStreak ? () => onOpenStreak() : undefined}
          disabled={!onOpenStreak}
          activeOpacity={0.7}
          accessibilityRole={onOpenStreak ? 'button' : 'text'}
          accessibilityLabel={`${t.currentStreak}: ${streak.currentStreak}`}
        >
          <Text style={styles.statValue}>{streak.currentStreak}🔥</Text>
          <Text style={styles.statLabel}>{t.currentStreak}</Text>
        </TouchableOpacity>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{totalXp.toLocaleString()}</Text>
          <Text style={styles.statLabel}>{t.totalPoints}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.md,
    shadowColor: theme.colors.navy900,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  levelIconCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: theme.colors.purple50,
    borderWidth: 1,
    borderColor: theme.colors.purple200,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing.md,
  },
  levelIcon: {
    fontSize: 24,
  },
  levelBlock: {
    flex: 1,
  },
  levelLabel: {
    ...theme.typography.overline,
    fontSize: 10,
    color: theme.colors.brandPrimary,
    letterSpacing: 1.2,
    fontWeight: '800',
  },
  levelTitle: {
    ...theme.typography.h3,
    fontSize: 18,
    fontWeight: '900',
    color: theme.colors.navy900,
    marginTop: 1,
  },
  levelName: {
    ...theme.typography.caption,
    fontSize: 12,
    color: theme.colors.slate600,
    marginTop: 1,
  },
  xpBlock: {
    alignItems: 'flex-end',
  },
  xpValue: {
    ...theme.typography.h2,
    fontSize: 20,
    fontWeight: '900',
    color: theme.colors.brandPrimary,
  },
  xpLabel: {
    ...theme.typography.overline,
    fontSize: 9,
    color: theme.colors.slate500,
    letterSpacing: 1,
    marginTop: 2,
  },
  progressArea: {
    marginBottom: theme.spacing.md,
  },
  xpToNext: {
    ...theme.typography.caption,
    color: theme.colors.slate500,
    marginTop: 6,
    textAlign: 'right',
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: theme.colors.gray100,
    paddingTop: theme.spacing.md,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    ...theme.typography.h3,
    fontSize: 18,
    fontWeight: '900',
    color: theme.colors.navy900,
  },
  statLabel: {
    ...theme.typography.caption,
    fontSize: 11,
    color: theme.colors.slate500,
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    height: 24,
    backgroundColor: theme.colors.gray200,
  },
});