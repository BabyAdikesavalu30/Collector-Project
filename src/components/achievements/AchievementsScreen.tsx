/**
 * AchievementsScreen Component (/achievements)
 * Honest badge system computed from real local learning data.
 * Unlocked badges show their unlock date; locked badges are dimmed with a
 * one-line hint. Recomputes unlocks on every load so badges unlock
 * retroactively from existing quiz/game history.
 */

import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { theme } from '../../theme';
import { SupportedLanguage } from '../../config/i18n';
import { AppBackButton } from '../navigation';
import { getQuizHistory, getQuizStats } from '../../features/quiz';
import { getAllGamesProgress } from '../../features/games';
import {
  ACHIEVEMENT_BADGES,
  recomputeAndPersistAchievements,
  UnlockedAchievement,
} from '../../features/achievements';

interface AchievementsScreenProps {
  language?: SupportedLanguage;
  onBack: () => void;
  onStartLearning: () => void;
}

function formatUnlockDate(timestamp: number, isTamil: boolean): string {
  const d = new Date(timestamp);
  const day = d.getDate();
  const months = isTamil
    ? ['ஜன', 'பிப்', 'மார்', 'ஏப்', 'மே', 'ஜூன்', 'ஜூலை', 'ஆக', 'செப்', 'அக்', 'நவ', 'டிச']
    : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${day} ${months[d.getMonth()]} ${d.getFullYear()}`;
}

export const AchievementsScreen: React.FC<AchievementsScreenProps> = ({
  language = 'en',
  onBack,
  onStartLearning,
}) => {
  const insets = useSafeAreaInsets();
  const isTamil = language === 'ta';

  const [unlocked, setUnlocked] = useState<UnlockedAchievement[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadAndRecompute = useCallback(async () => {
    try {
      const [history, stats, games] = await Promise.all([
        getQuizHistory(),
        getQuizStats(),
        getAllGamesProgress(),
      ]);

      let played = 0;
      let cleared = 0;
      Object.values(games).forEach((g) => {
        let gameHasCompletion = false;
        Object.entries(g.levels).forEach(([lvlKey, lvl]) => {
          if (!lvlKey.startsWith('level-') && lvl.completed) {
            cleared++;
            gameHasCompletion = true;
          }
        });
        if (gameHasCompletion) played++;
      });

      const result = await recomputeAndPersistAchievements({
        quizHistory: history,
        quizStats: stats,
        gamesPlayedCount: played,
        totalLevelsCleared: cleared,
      });
      setUnlocked(result);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadAndRecompute();
  }, [loadAndRecompute]);

  const unlockedMap = new Map(unlocked.map((u) => [u.badgeId, u.unlockedAt]));
  const unlockedCount = unlocked.length;

  return (
    <View style={styles.container}>
      <StatusBar style="dark" translucent backgroundColor="transparent" />

      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + 8 }]}>
        <AppBackButton onPress={onBack} language={language} style={styles.headerBackBtn} />
        <Text style={styles.headerTitle}>{isTamil ? 'எனது சாதனைகள்' : 'My Achievements'}</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        style={styles.scrollBody}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: Math.max(insets.bottom + 24, 32) },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Summary header */}
        <View style={styles.summaryCard}>
          <Text style={styles.summaryIcon}>{unlockedCount > 0 ? '🏅' : '🎯'}</Text>
          <Text style={styles.summaryTitle}>
            {unlockedCount} / {ACHIEVEMENT_BADGES.length}{' '}
            {isTamil ? 'சாதனைகள் திறக்கப்பட்டுள்ளன' : 'achievements unlocked'}
          </Text>
          <Text style={styles.summarySubtitle}>
            {isLoading
              ? isTamil
                ? 'சரிபார்க்கிறது...'
                : 'Checking...'
              : unlockedCount === 0
                ? isTamil
                  ? 'வினாடி வினாக்கள் மற்றும் ஆட்டங்களில் பங்கேற்கும்போது பேட்ஜ்கள் தானாகத் திறக்கப்படும்.'
                  : 'Badges unlock automatically as you take quizzes and play games.'
                : isTamil
                  ? 'தொடர்ந்து கற்று மேலும் பேட்ஜ்களைத் திறக்கவும்!'
                  : 'Keep learning to unlock even more!'}
          </Text>
        </View>

        {/* Badge grid */}
        <View style={styles.badgeGrid}>
          {ACHIEVEMENT_BADGES.map((badge) => {
            const unlockTime = unlockedMap.get(badge.id);
            const isUnlocked = unlockTime !== undefined;
            return (
              <View
                key={badge.id}
                style={[
                  styles.badgeCard,
                  isUnlocked ? styles.badgeCardUnlocked : styles.badgeCardLocked,
                ]}
              >
                <View
                  style={[
                    styles.badgeIconCircle,
                    isUnlocked ? styles.badgeIconUnlocked : styles.badgeIconLocked,
                  ]}
                >
                  <Text style={styles.badgeIcon}>{isUnlocked ? badge.icon : '🔒'}</Text>
                </View>
                <Text
                  style={[
                    styles.badgeTitle,
                    !isUnlocked && styles.badgeTitleLocked,
                  ]}
                >
                  {isTamil ? badge.title.ta : badge.title.en}
                </Text>
                {isUnlocked ? (
                  <Text style={styles.badgeUnlockDate}>
                    {isTamil ? 'திறக்கப்பட்டது:' : 'Unlocked:'}{' '}
                    {formatUnlockDate(unlockTime, isTamil)}
                  </Text>
                ) : (
                  <Text style={styles.badgeHint}>
                    {isTamil ? badge.hint.ta : badge.hint.en}
                  </Text>
                )}
              </View>
            );
          })}
        </View>

        {/* Empty CTA when nothing unlocked yet */}
        {unlockedCount === 0 && !isLoading && (
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={onStartLearning}
            activeOpacity={0.85}
            accessible={true}
            accessibilityRole="button"
          >
            <Text style={styles.primaryButtonText}>
              {isTamil ? 'முதல் சாதனையைத் திறக்கவும் →' : 'Unlock Your First Badge →'}
            </Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.pearlWhite,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.base,
    paddingBottom: theme.spacing.sm,
  },
  headerBackBtn: {},
  headerTitle: {
    ...theme.typography.h2,
    fontSize: 18,
    fontWeight: '800',
    color: theme.colors.navy900,
    flex: 1,
    textAlign: 'center',
  },
  headerSpacer: {
    width: 44,
  },
  scrollBody: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: theme.spacing.base,
    gap: theme.spacing.sm,
  },
  summaryCard: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: theme.spacing.lg,
    alignItems: 'center',
    shadowColor: theme.colors.navy900,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  summaryIcon: {
    fontSize: 36,
    marginBottom: 4,
  },
  summaryTitle: {
    ...theme.typography.h2,
    fontSize: 17,
    fontWeight: '800',
    color: theme.colors.navy900,
    textAlign: 'center',
    marginBottom: 2,
  },
  summarySubtitle: {
    ...theme.typography.body,
    fontSize: 13,
    color: theme.colors.slate600,
    textAlign: 'center',
    lineHeight: 19,
  },
  badgeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: theme.spacing.sm,
  },
  badgeCard: {
    width: '48.5%',
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1,
    padding: theme.spacing.md,
    alignItems: 'center',
    shadowColor: theme.colors.navy900,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 1,
  },
  badgeCardUnlocked: {
    borderColor: theme.colors.green200,
  },
  badgeCardLocked: {
    borderColor: theme.colors.border,
    opacity: 0.72,
  },
  badgeIconCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
  },
  badgeIconUnlocked: {
    backgroundColor: theme.colors.green50,
  },
  badgeIconLocked: {
    backgroundColor: theme.colors.gray100,
  },
  badgeIcon: {
    fontSize: 26,
  },
  badgeTitle: {
    ...theme.typography.caption,
    fontSize: 13,
    fontWeight: '800',
    color: theme.colors.navy900,
    textAlign: 'center',
  },
  badgeTitleLocked: {
    color: theme.colors.slate500,
  },
  badgeUnlockDate: {
    ...theme.typography.caption,
    fontSize: 10.5,
    color: theme.colors.success,
    fontWeight: '700',
    marginTop: 3,
    textAlign: 'center',
  },
  badgeHint: {
    ...theme.typography.caption,
    fontSize: 10.5,
    color: theme.colors.slate500,
    marginTop: 3,
    textAlign: 'center',
    lineHeight: 15,
  },
  primaryButton: {
    backgroundColor: theme.colors.actionPrimary,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
    marginTop: theme.spacing.xs,
    shadowColor: theme.colors.actionPrimary,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 3,
  },
  primaryButtonText: {
    ...theme.typography.button,
    fontSize: 14,
    fontWeight: '800',
    color: theme.colors.textOnAction,
  },
});