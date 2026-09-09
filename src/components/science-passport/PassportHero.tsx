/**
 * PassportHero — The premium science identity card at the top of the passport.
 * Displays avatar, name, grade, school, level, XP progress, and streak.
 */

import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { theme } from '../../theme';
import { ScienceLevelInfo } from '../../features/levels';
import { SupportedLanguage } from '../../config/i18n';

interface PassportHeroProps {
  name: string;
  initials: string;
  grade: string;
  school: string;
  level: ScienceLevelInfo;
  streak: number;
  language: SupportedLanguage;
}

export const PassportHero: React.FC<PassportHeroProps> = ({
  name,
  initials,
  grade,
  school,
  level,
  streak,
  language,
}) => {
  const insets = useSafeAreaInsets();
  const isTamil = language === 'ta';

  return (
    <View style={[styles.container, { paddingTop: Math.max(insets.top + 12, 32) }]}>
      {/* Decorative top */}
      <View style={styles.decorLine} />

      <Text style={styles.passportLabel}>
        {isTamil ? 'விஞ்ஞான்' : 'VIGYAAN'}
      </Text>
      <Text style={styles.passportTitle}>
        {isTamil ? 'அறிவியல் கடவுச்சீட்டு' : 'SCIENCE PASSPORT'}
      </Text>

      {/* Avatar */}
      <View style={styles.avatarContainer}>
        <View style={styles.avatarRing}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{initials}</Text>
          </View>
        </View>
      </View>

      {/* Name */}
      <Text style={styles.studentName} numberOfLines={2}>
        {name}
      </Text>

      {/* Grade & School */}
      <Text style={styles.studentInfo} numberOfLines={1}>
        {grade}
        {school ? ` • ${school}` : ''}
      </Text>

      {/* Level Badge */}
      <View style={styles.levelBadge}>
        <Text style={styles.levelLabel}>
          {isTamil ? 'நிலை' : 'LEVEL'} {level.level}
        </Text>
        <Text style={styles.levelTitle}>
          {isTamil ? level.titleTa : level.title}
        </Text>
      </View>

      {/* XP Progress */}
      <View style={styles.xpSection}>
        <Text style={styles.xpText}>
          {level.totalXp.toLocaleString()} / {level.levelEndXp.toLocaleString()} XP
        </Text>
        <View style={styles.progressBar}>
          <View
            style={[
              styles.progressFill,
              { width: `${Math.max(level.progressPercent, 2)}%` },
            ]}
          />
        </View>
      </View>

      {/* Streak */}
      {streak > 0 && (
        <View style={styles.streakBadge}>
          <Text style={styles.streakEmoji}>🔥</Text>
          <Text style={styles.streakText}>
            {streak} {isTamil ? 'நாள் தொடர்ச்சி' : 'Day Streak'}
          </Text>
        </View>
      )}

      <View style={styles.decorLineBottom} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.white,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
    alignItems: 'center',
    paddingHorizontal: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,
  },
  decorLine: {
    width: 40,
    height: 3,
    backgroundColor: theme.colors.purple500,
    borderRadius: 2,
    marginBottom: theme.spacing.md,
  },
  passportLabel: {
    ...theme.typography.overline,
    fontSize: 11,
    letterSpacing: 3,
    color: theme.colors.purple600,
    fontWeight: '800',
  },
  passportTitle: {
    ...theme.typography.h3,
    fontSize: 22,
    fontWeight: '900',
    color: theme.colors.navy900,
    letterSpacing: 1,
    marginTop: 2,
    marginBottom: theme.spacing.lg,
  },
  avatarContainer: {
    marginBottom: theme.spacing.md,
  },
  avatarRing: {
    width: 88,
    height: 88,
    borderRadius: 44,
    borderWidth: 3,
    borderColor: theme.colors.purple300,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    width: 78,
    height: 78,
    borderRadius: 39,
    backgroundColor: theme.colors.purple100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    ...theme.typography.h2,
    fontSize: 28,
    fontWeight: '800',
    color: theme.colors.purple700,
  },
  studentName: {
    ...theme.typography.h2,
    fontSize: 22,
    fontWeight: '800',
    color: theme.colors.navy900,
    textAlign: 'center',
    marginBottom: 4,
  },
  studentInfo: {
    ...theme.typography.caption,
    fontSize: 13,
    color: theme.colors.slate600,
    textAlign: 'center',
    marginBottom: theme.spacing.md,
  },
  levelBadge: {
    backgroundColor: theme.colors.purple50,
    borderWidth: 1,
    borderColor: theme.colors.purple200,
    borderRadius: theme.borderRadius.lg,
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.sm,
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  levelLabel: {
    ...theme.typography.overline,
    fontSize: 10,
    letterSpacing: 1.5,
    color: theme.colors.purple600,
    fontWeight: '700',
  },
  levelTitle: {
    ...theme.typography.body,
    fontSize: 16,
    fontWeight: '800',
    color: theme.colors.purple700,
    marginTop: 2,
  },
  xpSection: {
    width: '100%',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  xpText: {
    ...theme.typography.caption,
    fontSize: 13,
    color: theme.colors.slate600,
    marginBottom: 6,
  },
  progressBar: {
    width: '80%',
    height: 8,
    backgroundColor: theme.colors.gray200,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: theme.colors.purple500,
    borderRadius: 4,
  },
  streakBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.warningBackground,
    borderWidth: 1,
    borderColor: theme.colors.warningBorder,
    borderRadius: theme.borderRadius.full,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: 6,
    marginBottom: theme.spacing.sm,
  },
  streakEmoji: {
    fontSize: 16,
    marginRight: 6,
  },
  streakText: {
    ...theme.typography.body,
    fontSize: 14,
    fontWeight: '700',
    color: theme.colors.textGold,
  },
  decorLineBottom: {
    width: 30,
    height: 2,
    backgroundColor: theme.colors.gray300,
    borderRadius: 1,
    marginTop: theme.spacing.sm,
  },
});
