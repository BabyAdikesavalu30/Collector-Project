/**
 * AchievementSummaryCard Component
 * High-impact hero summary displaying badges earned, percentage completion,
 * badge collector level, and encouraging feedback.
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../../theme';
import { SupportedLanguage } from '../../config/i18n';
import { AchievementSummary } from '../../features/achievements';
import { getAchievementsI18n } from './achievements.i18n';

interface AchievementSummaryCardProps {
  summary: AchievementSummary | null;
  language?: SupportedLanguage;
}

export const AchievementSummaryCard: React.FC<AchievementSummaryCardProps> = ({
  summary,
  language = 'en',
}) => {
  const i18n = getAchievementsI18n(language);
  const isTamil = language === 'ta';

  const unlockedCount = summary?.unlockedCount ?? 0;
  const totalCount = summary?.totalCount ?? 43;
  const inProgressCount = summary?.inProgressCount ?? 0;
  const lockedCount = summary?.lockedCount ?? totalCount;
  const percentage = summary?.overallPercent ?? 0;
  const badgeLevel = Math.min(5, Math.floor(unlockedCount / 8) + 1);

  // Deterministic encouragement copy
  const getEncouragement = (): string => {
    if (unlockedCount === 0) return i18n.encouragement.none;
    if (unlockedCount < 10) return i18n.encouragement.starter;
    if (unlockedCount < 25) return i18n.encouragement.intermediate;
    if (unlockedCount < totalCount) return i18n.encouragement.advanced;
    return i18n.encouragement.master;
  };

  return (
    <View
      style={styles.card}
      accessible={true}
      accessibilityRole="summary"
      accessibilityLabel={`${i18n.badgesEarned}: ${unlockedCount} of ${totalCount}. ${percentage}% complete.`}
    >
      {/* Header Row */}
      <View style={styles.headerRow}>
        <View style={styles.iconContainer}>
          <Text style={styles.trophyIcon}>🏆</Text>
        </View>
        <View style={styles.headerTextGroup}>
          <Text style={styles.titleText}>
            {unlockedCount} / {totalCount} {i18n.badgesEarned}
          </Text>
          <Text style={styles.levelBadge}>
            {i18n.level} {badgeLevel} • {percentage}%
          </Text>
        </View>
      </View>

      {/* Progress Bar */}
      <View style={styles.progressTrack}>
        <View
          style={[
            styles.progressFill,
            { width: `${Math.min(Math.max(percentage, 0), 100)}%` },
          ]}
        />
      </View>

      {/* Stat Badges Grid */}
      <View style={styles.statsGrid}>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>{unlockedCount}</Text>
          <Text style={styles.statLabel}>{isTamil ? 'பெற்றவை' : 'Earned'}</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>{inProgressCount}</Text>
          <Text style={styles.statLabel}>{isTamil ? 'நடப்பில்' : 'In Progress'}</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>{lockedCount}</Text>
          <Text style={styles.statLabel}>{isTamil ? 'அடுத்து' : 'Locked'}</Text>
        </View>
      </View>

      {/* Encouragement Footer */}
      <View style={styles.encouragementContainer}>
        <Text style={styles.encouragementIcon}>💡</Text>
        <Text style={styles.encouragementText}>{getEncouragement()}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.xl,
    padding: theme.spacing.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    shadowColor: theme.colors.navy900,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FFF7ED',
    borderWidth: 1.5,
    borderColor: '#FDBA74',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing.md,
  },
  trophyIcon: {
    fontSize: 26,
  },
  headerTextGroup: {
    flex: 1,
  },
  titleText: {
    ...theme.typography.h2,
    fontSize: 18,
    fontWeight: '800',
    color: theme.colors.navy900,
    letterSpacing: -0.3,
  },
  levelBadge: {
    ...theme.typography.caption,
    fontSize: 12.5,
    fontWeight: '700',
    color: '#D97706',
    marginTop: 2,
  },
  progressTrack: {
    height: 8,
    backgroundColor: theme.colors.gray100,
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: theme.spacing.md,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#F59E0B',
    borderRadius: 4,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: theme.colors.pearlWhite,
    borderRadius: theme.borderRadius.md,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    marginBottom: theme.spacing.md,
  },
  statBox: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    ...theme.typography.h3,
    fontSize: 16,
    fontWeight: '800',
    color: theme.colors.navy900,
  },
  statLabel: {
    ...theme.typography.caption,
    fontSize: 11,
    fontWeight: '600',
    color: theme.colors.slate600,
    marginTop: 1,
  },
  encouragementContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#F8FAFC',
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.sm,
    borderLeftWidth: 3,
    borderLeftColor: '#3B82F6',
  },
  encouragementIcon: {
    fontSize: 14,
    marginRight: 6,
    marginTop: 1,
  },
  encouragementText: {
    ...theme.typography.body,
    fontSize: 12,
    color: theme.colors.slate600,
    flex: 1,
    lineHeight: 17,
  },
});
