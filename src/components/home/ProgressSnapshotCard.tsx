/**
 * ProgressSnapshotCard — Compact progress summary for Home 2.0.
 * Shows key metrics without overwhelming the student.
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { theme } from '../../theme';
import { SupportedLanguage } from '../../config/i18n';
import { HomeProgressSnapshot } from '../../features/home/home2.types';

interface ProgressSnapshotCardProps {
  progress: HomeProgressSnapshot;
  language: SupportedLanguage;
  onViewProgress: () => void;
}

export const ProgressSnapshotCard: React.FC<ProgressSnapshotCardProps> = ({
  progress,
  language,
  onViewProgress,
}) => {
  const isTamil = language === 'ta';

  return (
    <View style={styles.container} accessible accessibilityRole="summary">
      <View style={styles.header}>
        <Text style={styles.sectionTitle}>
          {isTamil ? 'முன்னேற்றம்' : 'PROGRESS'}
        </Text>
        <TouchableOpacity
          onPress={onViewProgress}
          activeOpacity={0.7}
          accessibilityRole="button"
          accessibilityLabel={isTamil ? 'முன்னேற்றத்தைக் காண்க' : 'View Progress'}
        >
          <Text style={styles.viewAll}>
            {isTamil ? 'காண்க' : 'View All'} →
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.statsGrid}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{progress.totalActivities}</Text>
          <Text style={styles.statLabel}>
            {isTamil ? 'செயல்பாடுகள்' : 'Activities'}
          </Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{progress.topicsExplored}</Text>
          <Text style={styles.statLabel}>
            {isTamil ? 'தலைப்புகள்' : 'Topics'}
          </Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>
            {progress.practiceAccuracy !== null && progress.practiceAccuracy !== undefined
              ? `${progress.practiceAccuracy}%`
              : '—'}
          </Text>
          <Text style={styles.statLabel}>
            {isTamil ? 'துல்லியம்' : 'Accuracy'}
          </Text>
        </View>
      </View>

      {progress.scienceLevel && (
        <View style={styles.levelRow}>
          <Text style={styles.levelIcon}>{progress.scienceLevel.icon}</Text>
          <View style={styles.levelInfo}>
            <Text style={styles.levelTitle} numberOfLines={1}>
              {isTamil ? progress.scienceLevel.titleTa : progress.scienceLevel.title}
            </Text>
            <Text style={styles.levelXp}>
              {progress.scienceLevel.totalXp} XP
            </Text>
          </View>
          <View style={styles.levelTrack}>
            <View
              style={[
                styles.levelFill,
                { width: `${progress.scienceLevel.progressPercent}%` },
              ]}
            />
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: theme.spacing.base,
    marginBottom: theme.spacing.sm,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  sectionTitle: {
    ...theme.typography.caption,
    fontSize: 12,
    fontWeight: '800',
    color: theme.colors.navy900,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  viewAll: {
    ...theme.typography.caption,
    fontSize: 12,
    fontWeight: '700',
    color: theme.colors.actionPrimary,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 6,
  },
  statItem: {
    flex: 1,
    backgroundColor: theme.colors.gray50,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderColor: theme.colors.gray200,
    padding: theme.spacing.sm,
    alignItems: 'center',
  },
  statValue: {
    ...theme.typography.h3,
    fontSize: 18,
    fontWeight: '800',
    color: theme.colors.navy900,
  },
  statLabel: {
    ...theme.typography.caption,
    fontSize: 10,
    color: theme.colors.slate500,
    marginTop: 2,
  },
  levelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: theme.spacing.sm,
    backgroundColor: theme.colors.purple50,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderColor: theme.colors.purple200,
    padding: theme.spacing.sm,
    gap: 8,
  },
  levelIcon: {
    fontSize: 20,
  },
  levelInfo: {
    flex: 1,
  },
  levelTitle: {
    ...theme.typography.caption,
    fontSize: 12,
    fontWeight: '700',
    color: theme.colors.brandPrimary,
  },
  levelXp: {
    ...theme.typography.caption,
    fontSize: 10,
    color: theme.colors.slate500,
  },
  levelTrack: {
    width: 60,
    height: 4,
    backgroundColor: theme.colors.purple200,
    borderRadius: 2,
    overflow: 'hidden',
  },
  levelFill: {
    height: '100%',
    backgroundColor: theme.colors.brandPrimary,
    borderRadius: 2,
  },
});
