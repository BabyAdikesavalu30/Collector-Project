/**
 * RewardsScreen — central rewards & progression hub (/rewards).
 * Science level, XP progress, streak, milestones, daily/weekly mission
 * previews, achievements & certificates previews, and the points history
 * entry point. All data is derived from the unified local domains.
 */

import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { theme } from '../../theme';
import { SupportedLanguage, getTranslation } from '../../config/i18n';
import { ScienceLevelInfo } from '../../features/levels';
import { StreakInfo } from '../../features/streaks';
import { RewardSummary } from '../../features/xp';
import { ActivitySummaryData } from '../../features/profile';
import { MissionWithProgress } from '../../features/missions';
import { ScreenHeader, SectionHeader, ProgressBar, LoadingState } from '../shared';

interface RewardsScreenProps {
  language: SupportedLanguage;
  level: ScienceLevelInfo;
  streak: StreakInfo;
  xpSummary: RewardSummary;
  activitySummary: ActivitySummaryData;
  dailyMissions: MissionWithProgress[];
  weeklyMissions: MissionWithProgress[];
  achievementsCount: number;
  certificatesCount: number;
  isLoading: boolean;
  onBack: () => void;
  onNavigate: (route: string) => void;
}

export const RewardsScreen: React.FC<RewardsScreenProps> = ({
  language,
  level,
  streak,
  xpSummary,
  activitySummary,
  dailyMissions,
  weeklyMissions,
  achievementsCount,
  certificatesCount,
  isLoading,
  onBack,
  onNavigate,
}) => {
  const insets = useSafeAreaInsets();
  const t = getTranslation(language).progress;
  const rewards = t.rewards;
  const isTamil = language === 'ta';

  if (isLoading) {
    return (
      <View style={styles.container}>
        <StatusBar style="dark" translucent backgroundColor="transparent" />
        <ScreenHeader title={rewards.title} language={language} onBack={onBack} />
        <LoadingState rows={4} />
      </View>
    );
  }

  const firstDaily = dailyMissions[0];
  const firstWeekly = weeklyMissions[0];
  const dailyClaimed = dailyMissions.filter((m) => m.status === 'claimed').length;
  const weeklyClaimed = weeklyMissions.filter((m) => m.status === 'claimed').length;

  return (
    <View style={styles.container}>
      <StatusBar style="dark" translucent backgroundColor="transparent" />
      <ScreenHeader title={rewards.title} language={language} onBack={onBack} subtitle={rewards.subtitle} />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[styles.content, { paddingBottom: Math.max(insets.bottom + 24, 32) }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Science Level Card */}
        <TouchableOpacity
          style={styles.levelCard}
          onPress={() => onNavigate('/profile')}
          accessibilityRole="button"
          accessibilityLabel={`${rewards.scienceLevelCard} ${level.level}`}
        >
          <View style={styles.levelCardHeader}>
            <View style={styles.levelIconCircle}>
              <Text style={styles.levelIcon}>{level.icon}</Text>
            </View>
            <View style={styles.levelInfo}>
              <Text style={styles.levelLabel}>{rewards.scienceLevelCard.toUpperCase()}</Text>
              <Text style={styles.levelTitle}>
                {t.profile.levelTitle.replace('{level}', String(level.level))}
              </Text>
              <Text style={styles.levelName}>{isTamil ? level.titleTa : level.title}</Text>
            </View>
            <View style={styles.xpBox}>
              <Text style={styles.xpValue}>{xpSummary.totalXp.toLocaleString()}</Text>
              <Text style={styles.xpLabel}>{rewards.xp}</Text>
            </View>
          </View>
          <View style={styles.progressWrap}>
            <ProgressBar
              progress={level.progressPercent}
              label={`${rewards.xpProgress} ${level.progressPercent}%`}
              color={theme.colors.brandPrimary}
              trackColor={theme.colors.purple100}
            />
            <Text style={styles.xpToNext}>
              {level.isMaxLevel
                ? t.profile.maxLevel
                : t.profile.xpToNextLevel
                    .replace('{xp}', String(level.xpToNextLevel))
                    .replace('{level}', String(level.level + 1))}
            </Text>
          </View>
          <View style={styles.streakRow}>
            <Text style={styles.streakValue}>
              {streak.currentStreak} 🔥 {rewards.currentStreak}
            </Text>
            <Text style={styles.pointsValue}>
              {xpSummary.totalEarned.toLocaleString()} {t.profile.totalPoints}
            </Text>
          </View>
        </TouchableOpacity>

        {/* Milestones */}
        <SectionHeader
          title={rewards.milestones}
          icon="🏅"
          actionLabel={rewards.viewAll}
          onAction={() => onNavigate('/points-history')}
        />
        <View style={styles.milestoneRow}>
          {[
            { icon: '🌱', at: 100 },
            { icon: '🔍', at: 500 },
            { icon: '🚀', at: 1000 },
            { icon: '🎓', at: 2500 },
            { icon: '🌟', at: 5000 },
          ].map((milestone) => {
            const reached = xpSummary.totalXp >= milestone.at;
            return (
              <View key={milestone.at} style={[styles.milestone, reached && styles.milestoneReached]} accessible>
                <Text style={styles.milestoneIcon}>{milestone.icon}</Text>
                <Text style={styles.milestoneXp}>{milestone.at.toLocaleString()}</Text>
              </View>
            );
          })}
        </View>

        {/* Daily mission preview */}
        {firstDaily && (
          <TouchableOpacity
            style={styles.missionCard}
            onPress={() => onNavigate('/daily-missions')}
            accessibilityRole="button"
            accessibilityLabel={rewards.dailyMission}
          >
            <View style={styles.missionHeader}>
              <Text style={styles.missionTitle}>
                📅 {rewards.dailyMission} · {dailyClaimed}/{dailyMissions.length} {rewards.claimed}
              </Text>
              <Text style={styles.missionChevron}>›</Text>
            </View>
            <View style={styles.missionBody}>
              <Text style={styles.missionIcon}>{firstDaily.mission.icon}</Text>
              <View style={styles.missionContent}>
                <Text style={styles.missionLabel} numberOfLines={1}>
                  {isTamil ? firstDaily.mission.titleTa : firstDaily.mission.title}
                </Text>
                <ProgressBar
                  progress={(firstDaily.progress.current / firstDaily.progress.target) * 100}
                  label={t.missions.progressLabel
                    .replace('{current}', String(firstDaily.progress.current))
                    .replace('{target}', String(firstDaily.progress.target))}
                />
              </View>
            </View>
          </TouchableOpacity>
        )}

        {/* Weekly mission preview */}
        {firstWeekly && (
          <TouchableOpacity
            style={styles.missionCard}
            onPress={() => onNavigate('/daily-missions')}
            accessibilityRole="button"
            accessibilityLabel={rewards.weeklyMission}
          >
            <View style={styles.missionHeader}>
              <Text style={styles.missionTitle}>
                🗓️ {rewards.weeklyMission} · {weeklyClaimed}/{weeklyMissions.length} {rewards.claimed}
              </Text>
              <Text style={styles.missionChevron}>›</Text>
            </View>
            <View style={styles.missionBody}>
              <Text style={styles.missionIcon}>{firstWeekly.mission.icon}</Text>
              <View style={styles.missionContent}>
                <Text style={styles.missionLabel} numberOfLines={1}>
                  {isTamil ? firstWeekly.mission.titleTa : firstWeekly.mission.title}
                </Text>
                <ProgressBar
                  progress={(firstWeekly.progress.current / firstWeekly.progress.target) * 100}
                  label={t.missions.progressLabel
                    .replace('{current}', String(firstWeekly.progress.current))
                    .replace('{target}', String(firstWeekly.progress.target))}
                />
              </View>
            </View>
          </TouchableOpacity>
        )}

        {/* Achievements & Certificates preview */}
        <View style={styles.twoCol}>
          <TouchableOpacity style={styles.previewCard} onPress={() => onNavigate('/achievements')} accessibilityRole="button">
            <Text style={styles.previewIcon}>🏆</Text>
            <Text style={styles.previewValue}>{achievementsCount}</Text>
            <Text style={styles.previewLabel}>{rewards.achievementsPreview}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.previewCard} onPress={() => onNavigate('/certificates')} accessibilityRole="button">
            <Text style={styles.previewIcon}>📜</Text>
            <Text style={styles.previewValue}>{certificatesCount}</Text>
            <Text style={styles.previewLabel}>{rewards.certificatesPreview}</Text>
          </TouchableOpacity>
        </View>

        {/* Points history entry */}
        <TouchableOpacity
          style={styles.historyCard}
          onPress={() => onNavigate('/points-history')}
          accessibilityRole="button"
          accessibilityLabel={rewards.pointsHistory}
        >
          <Text style={styles.historyIcon}>📈</Text>
          <View style={styles.historyContent}>
            <Text style={styles.historyTitle}>{rewards.pointsHistory}</Text>
            <Text style={styles.historySub}>
              {t.points.today}: +{xpSummary.todayXp} XP · {t.points.thisWeek}: +{xpSummary.weekXp} XP
            </Text>
          </View>
          <Text style={styles.menuChevron}>›</Text>
        </TouchableOpacity>

        {/* Activity summary */}
        <SectionHeader title={rewards.activitySummary} icon="📊" />
        <View style={styles.summaryGrid}>
          {[
            { icon: '🔬', value: activitySummary.quizzesCompleted, label: t.profile.quizzes },
            { icon: '💡', value: activitySummary.riddlesSolved, label: t.profile.riddles },
            { icon: '🎮', value: activitySummary.gamesPlayed, label: t.profile.games },
            { icon: '🕵️', value: activitySummary.mysteriesSolved, label: t.profile.mysteries },
            { icon: '✨', value: activitySummary.factsDiscovered, label: t.profile.facts },
            { icon: '🎯', value: activitySummary.challengesCompleted, label: t.profile.challenges },
          ].map((stat) => (
            <View key={stat.label} style={styles.summaryTile} accessible accessibilityLabel={`${stat.label}: ${stat.value}`}>
              <Text style={styles.summaryIcon}>{stat.icon}</Text>
              <Text style={styles.summaryValue}>{stat.value}</Text>
              <Text style={styles.summaryLabel} numberOfLines={1}>
                {stat.label}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.pearlWhite,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: theme.spacing.base,
  },
  levelCard: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.sm,
    shadowColor: theme.colors.navy900,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  levelCardHeader: {
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
  levelInfo: {
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
    fontSize: 17,
    fontWeight: '900',
    color: theme.colors.navy900,
    marginTop: 1,
  },
  levelName: {
    ...theme.typography.caption,
    fontSize: 12,
    color: theme.colors.slate600,
  },
  xpBox: {
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
  },
  progressWrap: {
    marginBottom: theme.spacing.md,
  },
  xpToNext: {
    ...theme.typography.caption,
    fontSize: 11.5,
    color: theme.colors.slate500,
    marginTop: 6,
  },
  streakRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: theme.colors.surfaceMuted,
    borderRadius: theme.borderRadius.md,
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.base,
  },
  streakValue: {
    ...theme.typography.body,
    fontSize: 13,
    fontWeight: '800',
    color: theme.colors.navy900,
  },
  pointsValue: {
    ...theme.typography.body,
    fontSize: 13,
    fontWeight: '800',
    color: theme.colors.brandPrimary,
  },
  milestoneRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.sm,
  },
  milestone: {
    alignItems: 'center',
    opacity: 0.45,
  },
  milestoneReached: {
    opacity: 1,
  },
  milestoneIcon: {
    fontSize: 20,
  },
  milestoneXp: {
    ...theme.typography.caption,
    fontSize: 10,
    fontWeight: '700',
    color: theme.colors.navy700,
    marginTop: 2,
  },
  missionCard: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: theme.spacing.base,
    marginBottom: theme.spacing.sm,
  },
  missionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.sm,
  },
  missionTitle: {
    ...theme.typography.caption,
    fontSize: 11,
    fontWeight: '800',
    color: theme.colors.navy900,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  missionChevron: {
    fontSize: 18,
    color: theme.colors.slate400,
  },
  missionBody: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  missionIcon: {
    fontSize: 22,
    marginRight: theme.spacing.md,
  },
  missionContent: {
    flex: 1,
  },
  missionLabel: {
    ...theme.typography.body,
    fontSize: 13.5,
    fontWeight: '700',
    color: theme.colors.navy800,
    marginBottom: 4,
  },
  twoCol: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
    marginBottom: theme.spacing.sm,
  },
  previewCard: {
    flex: 1,
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    paddingVertical: theme.spacing.base,
    alignItems: 'center',
  },
  previewIcon: {
    fontSize: 24,
  },
  previewValue: {
    ...theme.typography.h3,
    fontSize: 18,
    fontWeight: '900',
    color: theme.colors.navy900,
    marginTop: 2,
  },
  previewLabel: {
    ...theme.typography.caption,
    fontSize: 11,
    color: theme.colors.slate500,
    marginTop: 2,
  },
  historyCard: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: theme.spacing.base,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  historyIcon: {
    fontSize: 22,
    marginRight: theme.spacing.md,
  },
  historyContent: {
    flex: 1,
  },
  historyTitle: {
    ...theme.typography.body,
    fontSize: 14,
    fontWeight: '700',
    color: theme.colors.navy900,
  },
  historySub: {
    ...theme.typography.caption,
    fontSize: 11.5,
    color: theme.colors.slate500,
    marginTop: 2,
  },
  menuChevron: {
    fontSize: 18,
    color: theme.colors.slate400,
    fontWeight: '700',
  },
  summaryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.sm,
  },
  summaryTile: {
    width: '30%',
    flexGrow: 1,
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    paddingVertical: theme.spacing.md,
    alignItems: 'center',
  },
  summaryIcon: {
    fontSize: 18,
  },
  summaryValue: {
    ...theme.typography.h3,
    fontSize: 17,
    fontWeight: '900',
    color: theme.colors.navy900,
  },
  summaryLabel: {
    ...theme.typography.caption,
    fontSize: 10.5,
    color: theme.colors.slate500,
    marginTop: 2,
  },
});