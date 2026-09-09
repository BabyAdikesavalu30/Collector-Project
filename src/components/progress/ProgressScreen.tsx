/**
 * ProgressScreen Component (/progress)
 * Upgraded Subject Progress 2.0 student journey hub:
 * - My Science Journey header & hero summary
 * - Overall activity progress, streak, XP, badges
 * - Derived summary counters (subjects, topics, activities, certificates)
 * - Evidence-based subject strengths
 * - Focus Areas / Topics to Strengthen link (Phase 41 integration)
 * - Subject progress cards for all 7 standard science subjects
 * - Recent activity list
 * - Welcoming empty state for fresh students
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { theme } from '../../theme';
import { SupportedLanguage } from '../../config/i18n';
import { AppBackButton } from '../navigation';
import { useProgressHub } from '../../features/progress/progress.hooks';
import { ProgressHeroCard } from './ProgressHeroCard';
import { ProgressSummaryGrid } from './ProgressSummaryGrid';
import { SubjectProgressCard } from './SubjectProgressCard';
import { getProgressI18n, interpolate } from './progress.i18n';

export interface ProgressScreenProps {
  language?: SupportedLanguage;
  onBack: () => void;
  onStartLearning: () => void;
  onViewSubject: (subjectId: string) => void;
  onViewFocusAreas?: () => void;
  onViewStreak?: () => void;
}

export const ProgressScreen: React.FC<ProgressScreenProps> = ({
  language = 'en',
  onBack,
  onStartLearning,
  onViewSubject,
  onViewFocusAreas,
  onViewStreak,
}) => {
  const insets = useSafeAreaInsets();
  const t = getProgressI18n(language);
  const isTamil = language === 'ta';

  const {
    overall,
    subjects,
    strengths,
    recentActivities,
    focusAreasCount,
    isLoading,
  } = useProgressHub();

  const isFreshUser =
    !isLoading &&
    overall !== null &&
    overall.overallProgress === 0 &&
    overall.activitiesCompleted === 0 &&
    overall.subjectsExplored === 0;

  return (
    <View style={styles.container}>
      <StatusBar style="dark" translucent backgroundColor="transparent" />

      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + 8 }]}>
        <AppBackButton onPress={onBack} language={language} style={styles.backBtn} />
        <View style={styles.headerTitleWrap}>
          <Text style={styles.headerTitle}>{t.journeyTitle}</Text>
        </View>
        <View style={styles.headerSpacer} />
      </View>

      {isLoading ? (
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color={theme.colors.blue600} />
        </View>
      ) : isFreshUser ? (
        /* Fresh User Discovery State */
        <ScrollView
          style={styles.scrollBody}
          contentContainerStyle={[
            styles.scrollContent,
            { paddingBottom: Math.max(insets.bottom + 32, 40) },
          ]}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.emptyCard}>
            <Text style={styles.emptyIcon}>🚀</Text>
            <Text style={styles.emptyTitle}>{t.emptyState.title}</Text>
            <Text style={styles.emptySubtitle}>{t.emptyState.subtitle}</Text>
            <TouchableOpacity
              style={styles.primaryButton}
              onPress={onStartLearning}
              activeOpacity={0.85}
              accessible={true}
              accessibilityRole="button"
            >
              <Text style={styles.primaryButtonText}>{t.emptyState.cta}</Text>
            </TouchableOpacity>
          </View>

          {/* Subjects Preview in Fresh State */}
          <Text style={styles.sectionHeader}>{t.myScienceProgress}</Text>
          {subjects.map((sub) => (
            <SubjectProgressCard
              key={sub.subjectId}
              progress={sub}
              language={language}
              onPress={onViewSubject}
            />
          ))}
        </ScrollView>
      ) : (
        <ScrollView
          style={styles.scrollBody}
          contentContainerStyle={[
            styles.scrollContent,
            { paddingBottom: Math.max(insets.bottom + 32, 40) },
          ]}
          showsVerticalScrollIndicator={false}
        >
          {/* Top Hero Progress Card */}
          {overall && (
            <ProgressHeroCard
              progressPercentage={overall.overallProgress}
              streakDays={overall.streakDays}
              totalXp={overall.totalXp}
              achievementsCount={overall.achievementsCount}
              language={language}
              onStreakPress={onViewStreak}
            />
          )}

          {/* Overall Summary Counters Grid */}
          {overall && (
            <ProgressSummaryGrid
              subjectsExplored={overall.subjectsExplored}
              totalSubjects={overall.totalSubjects}
              topicsExplored={overall.topicsExplored}
              totalTopics={overall.totalTopics}
              activitiesCompleted={overall.activitiesCompleted}
              badgesEarned={overall.achievementsCount}
              certificatesEarned={overall.certificatesCount}
              language={language}
            />
          )}

          {/* Focus Areas Integration (Phase 41) */}
          {onViewFocusAreas && (
            <TouchableOpacity
              style={styles.focusAreasCard}
              onPress={onViewFocusAreas}
              activeOpacity={0.88}
              accessibilityRole="button"
              accessibilityLabel={interpolate(t.focusAreas.countLabel, { count: focusAreasCount })}
            >
              <View style={styles.focusAreasLeft}>
                <View style={styles.focusAreasIconBox}>
                  <Text style={styles.focusAreasIcon}>🎯</Text>
                </View>
                <View style={styles.focusAreasInfo}>
                  <Text style={styles.focusAreasTitle}>{t.focusAreas.title}</Text>
                  <Text style={styles.focusAreasSub}>
                    {focusAreasCount > 0
                      ? interpolate(t.focusAreas.countLabel, { count: focusAreasCount })
                      : t.focusAreas.suggestedPractice}
                  </Text>
                </View>
              </View>
              <Text style={styles.focusAreasChevron}>→</Text>
            </TouchableOpacity>
          )}

          {/* Evidence-Based Subject Strengths */}
          <View style={styles.strengthsCard}>
            <View style={styles.strengthsTop}>
              <Text style={styles.sectionHeader}>{t.strengths.title}</Text>
              <Text style={styles.strengthsSub}>{t.strengths.subtitle}</Text>
            </View>

            {strengths.length > 0 ? (
              <View style={styles.strengthsList}>
                {strengths.map((str) => (
                  <View key={str.subjectId} style={styles.strengthRow}>
                    <Text style={styles.strengthStar}>⭐</Text>
                    <Text style={styles.strengthSubject}>{str.title}</Text>
                    <View style={styles.strengthBadge}>
                      <Text style={styles.strengthProgress}>{str.progress}%</Text>
                    </View>
                  </View>
                ))}
              </View>
            ) : (
              <Text style={styles.noStrengthsText}>
                {t.strengths.noStrengthsYet}
              </Text>
            )}
          </View>

          {/* Subject Cards Section */}
          <Text style={styles.sectionHeader}>{t.journeyTitle.toUpperCase()}</Text>
          {subjects.map((sub) => (
            <SubjectProgressCard
              key={sub.subjectId}
              progress={sub}
              language={language}
              onPress={onViewSubject}
            />
          ))}

          {/* Recent Activity Section */}
          {recentActivities.length > 0 && (
            <View style={styles.recentSection}>
              <Text style={styles.sectionHeader}>{t.subjectDetail.recentActivityTitle}</Text>
              {recentActivities.map((act) => (
                <View key={act.id} style={styles.recentItem}>
                  <Text style={styles.recentIcon}>⚡</Text>
                  <View style={styles.recentInfo}>
                    <Text style={styles.recentTitle}>
                      {isTamil && act.titleTa ? act.titleTa : act.title}
                    </Text>
                    {act.topicTitle && (
                      <Text style={styles.recentSub}>{act.topicTitle}</Text>
                    )}
                  </View>
                </View>
              ))}
            </View>
          )}
        </ScrollView>
      )}
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
    backgroundColor: theme.colors.white,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  backBtn: {
    marginRight: theme.spacing.sm,
  },
  headerTitleWrap: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    ...theme.typography.h2,
    fontSize: 18,
    fontWeight: '800',
    color: theme.colors.navy900,
  },
  headerSpacer: {
    width: 44,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollBody: {
    flex: 1,
  },
  scrollContent: {
    padding: theme.spacing.base,
  },
  sectionHeader: {
    ...theme.typography.caption,
    fontWeight: '800',
    color: theme.colors.navy900,
    letterSpacing: 0.6,
    marginBottom: theme.spacing.xs,
    marginTop: theme.spacing.xs,
  },
  emptyCard: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.xl,
    padding: theme.spacing.xl,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.border,
    marginBottom: theme.spacing.md,
    shadowColor: theme.colors.navy900,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: theme.spacing.sm,
  },
  emptyTitle: {
    ...theme.typography.h2,
    fontSize: 18,
    fontWeight: '800',
    color: theme.colors.navy900,
    textAlign: 'center',
    marginBottom: theme.spacing.xs,
  },
  emptySubtitle: {
    ...theme.typography.body,
    fontSize: 13,
    color: theme.colors.slate600,
    textAlign: 'center',
    marginBottom: theme.spacing.lg,
  },
  primaryButton: {
    backgroundColor: theme.colors.blue600,
    paddingVertical: 12,
    paddingHorizontal: theme.spacing.lg,
    borderRadius: theme.borderRadius.md,
    minHeight: 44,
    justifyContent: 'center',
  },
  primaryButtonText: {
    ...theme.typography.body,
    fontWeight: '800',
    color: theme.colors.white,
  },
  focusAreasCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFBEB',
    borderRadius: theme.borderRadius.xl,
    padding: theme.spacing.base,
    borderWidth: 1,
    borderColor: '#FDE68A',
    marginBottom: theme.spacing.md,
  },
  focusAreasLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: theme.spacing.sm,
  },
  focusAreasIconBox: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FEF3C7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  focusAreasIcon: {
    fontSize: 20,
  },
  focusAreasInfo: {
    flex: 1,
  },
  focusAreasTitle: {
    ...theme.typography.body,
    fontWeight: '800',
    color: theme.colors.navy900,
  },
  focusAreasSub: {
    ...theme.typography.caption,
    color: theme.colors.slate600,
    marginTop: 2,
  },
  focusAreasChevron: {
    fontSize: 20,
    fontWeight: '700',
    color: '#B45309',
    marginLeft: theme.spacing.xs,
  },
  strengthsCard: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.xl,
    padding: theme.spacing.base,
    borderWidth: 1,
    borderColor: theme.colors.border,
    marginBottom: theme.spacing.md,
  },
  strengthsTop: {
    marginBottom: theme.spacing.xs,
  },
  strengthsSub: {
    ...theme.typography.caption,
    color: theme.colors.slate600,
    marginBottom: theme.spacing.xs,
  },
  strengthsList: {
    gap: 6,
  },
  strengthRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: theme.spacing.sm,
    backgroundColor: '#F0FDF4',
    borderRadius: theme.borderRadius.md,
    gap: theme.spacing.sm,
  },
  strengthStar: {
    fontSize: 16,
  },
  strengthSubject: {
    ...theme.typography.body,
    fontSize: 13,
    fontWeight: '700',
    color: theme.colors.navy900,
    flex: 1,
  },
  strengthBadge: {
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: theme.borderRadius.full,
  },
  strengthProgress: {
    ...theme.typography.caption,
    fontWeight: '800',
    color: theme.colors.green700,
  },
  noStrengthsText: {
    ...theme.typography.caption,
    color: theme.colors.slate500,
    fontStyle: 'italic',
    paddingVertical: 4,
  },
  recentSection: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.xl,
    padding: theme.spacing.base,
    borderWidth: 1,
    borderColor: theme.colors.border,
    marginTop: theme.spacing.xs,
  },
  recentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.gray100,
    gap: theme.spacing.sm,
  },
  recentIcon: {
    fontSize: 14,
  },
  recentInfo: {
    flex: 1,
  },
  recentTitle: {
    ...theme.typography.caption,
    fontWeight: '700',
    color: theme.colors.navy900,
  },
  recentSub: {
    ...theme.typography.caption,
    color: theme.colors.slate500,
    fontSize: 11,
  },
});