/**
 * HomeScreen 2.0 — Upgraded personalized science command center.
 * Preserves ALL existing functionality while adding:
 * - Today Overview (daily goal, streak, XP)
 * - Smart Continue Learning (from in-progress activities)
 * - Focus Area (from weak areas engine)
 * - Progress Snapshot
 * - Discovery / Collection preview
 * - Certificate preview
 * - Science Passport preview
 * - Explore Science section
 * - Recent Activity
 * - Improved Quick Actions
 *
 * All data is DERIVED from canonical sources — never duplicated.
 */

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { theme } from '../../theme';
import { SupportedLanguage, getTranslation } from '../../config/i18n';
import { DashboardData } from '../../features/home/home.types';
import {
  HomeViewModel,
  getHomeViewModel,
} from '../../features/home/home2.service';
import { HomeHeader } from './HomeHeader';
import { ProgressHeroCard } from './ProgressHeroCard';
import { ContinueLearningCard } from './ContinueLearningCard';
import { QuickActionGrid } from './QuickActionGrid';
import { DailyChallengeCard } from './DailyChallengeCard';
import { AchievementPreview } from './AchievementPreview';
import { DashboardSkeleton } from './DashboardSkeleton';
import { TodayOverviewCard } from './TodayOverviewCard';
import { FocusAreaCard } from './FocusAreaCard';
import { ProgressSnapshotCard } from './ProgressSnapshotCard';
import { DiscoveryCard } from './DiscoveryCard';
import { RecentActivityCard } from './RecentActivityCard';
import { ExploreSection } from './ExploreSection';
import { HomeEmptyState } from './HomeEmptyState';
import { microLessonRepository } from '../../features/micro-lessons/microLessons.repository';
import { MicroLesson } from '../../features/micro-lessons/microLessons.types';
import { conceptMapRepository } from '../../features/concept-maps/conceptMaps.repository';
import { ConceptMap } from '../../features/concept-maps/conceptMaps.types';
import { experimentRepository } from '../../features/experiment-lab/experiment.repository';
import { Experiment } from '../../features/experiment-lab/experiment.types';
import { useTopFocusArea } from '../../features/weak-areas';
import { FocusSpotlightCard } from '../weak-areas';

interface HomeScreenProps {
  language?: SupportedLanguage;
  /** Legacy dashboard data (preserved for backward compatibility). */
  data: DashboardData | null;
  isLoading: boolean;
  isOffline?: boolean;
  error?: string | null;
  onRefresh: () => Promise<void>;
  onNavigate: (route: string) => void;
  onAnalyticsEvent?: (eventName: string, params?: Record<string, unknown>) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  language = 'en',
  data,
  isLoading,
  isOffline = false,
  error = null,
  onRefresh,
  onNavigate,
  onAnalyticsEvent,
}) => {
  const insets = useSafeAreaInsets();
  const t = getTranslation(language).home;
  const [refreshing, setRefreshing] = useState(false);
  const [todayLesson, setTodayLesson] = useState<MicroLesson | null>(null);
  const [todayConceptMap, setTodayConceptMap] = useState<ConceptMap | null>(null);
  const [todayExperiment, setTodayExperiment] = useState<Experiment | null>(null);
  const { topArea } = useTopFocusArea();
  const [homeViewModel, setHomeViewModel] = useState<HomeViewModel | null>(null);
  const [viewModelLoading, setViewModelLoading] = useState(true);

  // Load Home 2.0 view model
  useEffect(() => {
    let isMounted = true;
    const loadViewModel = async () => {
      try {
        setViewModelLoading(true);
        const vm = await getHomeViewModel();
        if (isMounted) {
          setHomeViewModel(vm);
        }
      } catch {
        // View model failed; fall back to legacy data
      } finally {
        if (isMounted) setViewModelLoading(false);
      }
    };
    loadViewModel();
    return () => { isMounted = false; };
  }, []);

  useEffect(() => {
    microLessonRepository.getTodayLesson().then(setTodayLesson).catch(() => {});
    conceptMapRepository.getTodayMap().then(setTodayConceptMap).catch(() => {});
    experimentRepository.getFeaturedExperiment().then(setTodayExperiment).catch(() => {});
  }, []);

  // Telemetry on mount
  useEffect(() => {
    onAnalyticsEvent?.('home_viewed', { language });
  }, [language, onAnalyticsEvent]);

  // Pull-to-refresh handler
  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    onAnalyticsEvent?.('home_refresh');
    await onRefresh();
    // Reload view model
    try {
      const vm = await getHomeViewModel();
      setHomeViewModel(vm);
    } catch { /* ignore */ }
    setRefreshing(false);
  }, [onRefresh, onAnalyticsEvent]);

  // Determine if we should show Home 2.0 sections
  const show2_0 = useMemo(() => {
    return homeViewModel !== null && !viewModelLoading;
  }, [homeViewModel, viewModelLoading]);

  return (
    <View style={styles.container}>
      <StatusBar style="dark" translucent backgroundColor="transparent" />

      <ScrollView
        style={styles.scrollBody}
        contentContainerStyle={[
          styles.scrollContent,
          {
            paddingTop: Math.max(insets.top + 8, Platform.OS === 'android' ? 28 : 16),
            paddingBottom: Math.max(insets.bottom + 80, 96),
          },
        ]}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            tintColor={theme.colors.actionPrimary}
            colors={[theme.colors.actionPrimary]}
          />
        }
      >
        {/* OFFLINE INDICATOR BANNER */}
        {isOffline && (
          <View style={styles.offlineBanner} accessible accessibilityRole="alert">
            <Text style={styles.offlineText}>📡 {t.offline}</Text>
          </View>
        )}

        {/* SKELETON LOADING STATE */}
        {isLoading && !data && <DashboardSkeleton />}

        {/* ERROR STATE */}
        {Boolean(error) && !isLoading && !data && (
          <View style={styles.errorContainer} accessible accessibilityRole="alert">
            <Text style={styles.errorIcon}>⚠️</Text>
            <Text style={styles.errorTitle}>{t.errorTitle}</Text>
            <Text style={styles.errorMessage}>{error}</Text>
            <TouchableOpacity
              style={styles.retryButton}
              onPress={handleRefresh}
              activeOpacity={0.85}
              accessible
              accessibilityRole="button"
            >
              <Text style={styles.retryButtonText}>{t.tryAgain}</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* MAIN LOADED DASHBOARD */}
        {data && (
          <>
            {/* ─── HEADER ─── */}
            <HomeHeader
              student={data.student}
              language={language}
              onNotificationPress={() => onNavigate('/notifications')}
              onAvatarPress={() => onNavigate('/profile')}
            />

            {/* ─── HOME 2.0: TODAY OVERVIEW ─── */}
            {show2_0 && homeViewModel && (
              <TodayOverviewCard
                today={homeViewModel.today}
                dailyGoal={homeViewModel.dailyGoal}
                language={language}
                onStreakPress={() => onNavigate('/streak')}
                onDailyGoalPress={() => onNavigate('/daily-goal')}
              />
            )}

            {/* ─── PRIMARY RECOMMENDATION ─── */}
            {show2_0 && homeViewModel?.primaryRecommendation && (
              <TouchableOpacity
                style={styles.recommendationCard}
                onPress={() => onNavigate(homeViewModel.primaryRecommendation!.route)}
                activeOpacity={0.85}
                accessibilityRole="button"
                accessibilityLabel={
                  language === 'ta'
                    ? homeViewModel.primaryRecommendation.titleTa
                    : homeViewModel.primaryRecommendation.title
                }
              >
                <View style={styles.recHeader}>
                  <Text style={styles.recIcon}>{homeViewModel.primaryRecommendation.icon}</Text>
                  <View style={styles.recContent}>
                    <Text style={styles.recLabel}>
                      {language === 'ta' ? 'அடுத்த செயல்' : 'NEXT ACTION'}
                    </Text>
                    <Text style={styles.recTitle} numberOfLines={1}>
                      {language === 'ta'
                        ? homeViewModel.primaryRecommendation.titleTa
                        : homeViewModel.primaryRecommendation.title}
                    </Text>
                    <Text style={styles.recSubtitle} numberOfLines={1}>
                      {language === 'ta'
                        ? homeViewModel.primaryRecommendation.subtitleTa
                        : homeViewModel.primaryRecommendation.subtitle}
                    </Text>
                  </View>
                  <Text style={styles.recArrow}>→</Text>
                </View>
              </TouchableOpacity>
            )}

            {/* ─── CONTINUE LEARNING (Canonical Component) ─── */}
            <ContinueLearningCard
              topic={
                show2_0 && homeViewModel?.continueLearning
                  ? homeViewModel.continueLearning
                  : data.continueTopic || null
              }
              language={language}
              onPress={() => {
                const targetRoute =
                  show2_0 && homeViewModel?.continueLearning?.route
                    ? homeViewModel.continueLearning.route
                    : '/learn';
                onNavigate(targetRoute);
              }}
            />

            {/* ─── FOCUS AREA (Home 2.0 or Legacy) ─── */}
            {show2_0 && homeViewModel?.focusArea ? (
              <FocusAreaCard
                focusArea={homeViewModel.focusArea}
                language={language}
                onPractice={() => onNavigate(homeViewModel.focusArea!.action.route)}
              />
            ) : topArea && (
              <FocusSpotlightCard
                area={topArea}
                language={language}
                onPractice={(area) => onNavigate(area.action.route)}
              />
            )}

            {/* ─── PROGRESS SNAPSHOT (Home 2.0) ─── */}
            {show2_0 && homeViewModel && (
              <ProgressSnapshotCard
                progress={homeViewModel.progress}
                language={language}
                onViewProgress={() => onNavigate('/progress')}
              />
            )}

            {/* ─── HERO PROGRESS CARD (Legacy — kept for familiarity) ─── */}
            {!show2_0 && (
              <ProgressHeroCard
                progressPercentage={data.overallProgressPercentage}
                streakDays={data.streakDays}
                points={data.points}
                rank={data.rank ? `#${data.rank}` : undefined}
                language={language}
                onStreakPress={() => onNavigate('/streak')}
              />
            )}

            {/* ─── UNIFIED CARD (Legacy — kept when 2.0 not available) ─── */}
            {!show2_0 && (data.scienceLevel || data.dailyMissionPreview || data.recommendedActivity || data.dailyGoalPreview) && (
              <View style={styles.unifiedCard}>
                {data.scienceLevel && (
                  <TouchableOpacity
                    style={styles.unifiedRow}
                    onPress={() => onNavigate('/rewards')}
                    activeOpacity={0.85}
                    accessibilityRole="button"
                    accessibilityLabel={`${data.scienceLevel.title} Level ${data.scienceLevel.level}`}
                  >
                    <Text style={styles.unifiedIcon}>{data.scienceLevel.icon}</Text>
                    <View style={styles.unifiedContent}>
                      <View style={styles.unifiedLabelRow}>
                        <Text style={styles.unifiedTitle} numberOfLines={1}>
                          {t.progressTitle} · {data.scienceLevel.level} ·{' '}
                          {language === 'ta' ? data.scienceLevel.titleTa : data.scienceLevel.title}
                        </Text>
                        <Text style={styles.unifiedXp}>{data.scienceLevel.totalXp} XP</Text>
                      </View>
                      <View style={styles.unifiedTrack}>
                        <View
                          style={[
                            styles.unifiedFill,
                            { width: `${Math.min(100, data.scienceLevel.progressPercent)}%` },
                          ]}
                        />
                      </View>
                    </View>
                    <Text style={styles.unifiedChevron}>›</Text>
                  </TouchableOpacity>
                )}
                {data.dailyGoalPreview && (
                  <TouchableOpacity
                    style={styles.unifiedRow}
                    onPress={() => onNavigate('/daily-goal')}
                    activeOpacity={0.85}
                    accessibilityRole="button"
                    accessibilityLabel="Daily goal"
                  >
                    <Text style={styles.unifiedIcon}>🎯</Text>
                    <View style={styles.unifiedContent}>
                      <Text style={styles.unifiedTitle} numberOfLines={1}>
                        {language === 'ta' ? data.dailyGoalPreview.titleTa : data.dailyGoalPreview.title}
                      </Text>
                      <Text style={styles.unifiedSub}>
                        {data.dailyGoalPreview.current} / {data.dailyGoalPreview.target} ·{' '}
                        {data.dailyGoalPreview.status === 'claimed' ? '✓' : '—'}
                      </Text>
                    </View>
                    <Text style={styles.unifiedChevron}>›</Text>
                  </TouchableOpacity>
                )}
                {data.dailyMissionPreview && (
                  <TouchableOpacity
                    style={styles.unifiedRow}
                    onPress={() => onNavigate('/daily-missions')}
                    activeOpacity={0.85}
                    accessibilityRole="button"
                    accessibilityLabel="Daily mission"
                  >
                    <Text style={styles.unifiedIcon}>📅</Text>
                    <View style={styles.unifiedContent}>
                      <Text style={styles.unifiedTitle} numberOfLines={1}>
                        {language === 'ta' ? data.dailyMissionPreview.titleTa : data.dailyMissionPreview.title}
                      </Text>
                      <Text style={styles.unifiedSub}>
                        {data.dailyMissionPreview.current} / {data.dailyMissionPreview.target}
                      </Text>
                    </View>
                    <Text style={styles.unifiedChevron}>›</Text>
                  </TouchableOpacity>
                )}
                {data.recommendedActivity && (
                  <TouchableOpacity
                    style={styles.unifiedRow}
                    onPress={() => onNavigate(data.recommendedActivity!.route)}
                    activeOpacity={0.85}
                    accessibilityRole="button"
                  >
                    <Text style={styles.unifiedIcon}>{data.recommendedActivity.icon}</Text>
                    <View style={styles.unifiedContent}>
                      <Text style={styles.unifiedTitle} numberOfLines={1}>
                        {language === 'ta' ? data.recommendedActivity.titleTa : data.recommendedActivity.title}
                      </Text>
                      <Text style={styles.unifiedSub} numberOfLines={1}>
                        {language === 'ta' ? data.recommendedActivity.subtitleTa : data.recommendedActivity.subtitle}
                      </Text>
                    </View>
                    <Text style={styles.unifiedChevron}>›</Text>
                  </TouchableOpacity>
                )}
              </View>
            )}

            {/* ─── 2-MINUTE SCIENCE DAILY LESSON ─── */}
            {todayLesson && (
              <TouchableOpacity
                style={styles.quickScienceCard}
                onPress={() => onNavigate(`/micro-lesson/${todayLesson.id}`)}
                activeOpacity={0.88}
                accessible
                accessibilityRole="button"
                accessibilityLabel={`2-minute science: ${language === 'ta' ? todayLesson.title.ta : todayLesson.title.en}`}
              >
                <View style={styles.quickScienceLeft}>
                  <View style={styles.quickScienceIconCircle}>
                    <Text style={styles.quickScienceIcon}>{todayLesson.icon}</Text>
                  </View>
                  <View style={styles.quickScienceTextCol}>
                    <View style={styles.quickScienceBadgeRow}>
                      <Text style={styles.quickScienceBadgeText}>
                        ⚡ {language === 'ta' ? '2-நிமிட அறிவியல்' : '2-MINUTE SCIENCE'}
                      </Text>
                      <View style={styles.quickScienceXpBadge}>
                        <Text style={styles.quickScienceXpText}>+20 XP</Text>
                      </View>
                    </View>
                    <Text style={styles.quickScienceTitle} numberOfLines={1}>
                      {language === 'ta' ? todayLesson.title.ta : todayLesson.title.en}
                    </Text>
                    <Text style={styles.quickScienceSubtitle} numberOfLines={1}>
                      {language === 'ta' ? todayLesson.subtitle.ta : todayLesson.subtitle.en}
                    </Text>
                  </View>
                </View>
                <Text style={styles.quickScienceArrow}>→</Text>
              </TouchableOpacity>
            )}

            {/* ─── TODAY'S CONCEPT MAP ─── */}
            {todayConceptMap && (
              <TouchableOpacity
                style={[styles.quickScienceCard, { borderColor: '#E9D5FF' }]}
                onPress={() => onNavigate(`/concept-map/${todayConceptMap.id}`)}
                activeOpacity={0.88}
                accessible
                accessibilityRole="button"
                accessibilityLabel={`Concept map: ${language === 'ta' ? todayConceptMap.title.ta : todayConceptMap.title.en}`}
              >
                <View style={styles.quickScienceLeft}>
                  <View style={[styles.quickScienceIconCircle, { backgroundColor: '#F3E8FF' }]}>
                    <Text style={styles.quickScienceIcon}>{todayConceptMap.icon || '🗺️'}</Text>
                  </View>
                  <View style={styles.quickScienceTextCol}>
                    <View style={styles.quickScienceBadgeRow}>
                      <Text style={[styles.quickScienceBadgeText, { color: '#7E22CE' }]}>
                        🗺️ {language === 'ta' ? 'கருத்து வரைபடம்' : 'CONCEPT MAP'}
                      </Text>
                      <View style={[styles.quickScienceXpBadge, { backgroundColor: '#F3E8FF', borderColor: '#E9D5FF' }]}>
                        <Text style={[styles.quickScienceXpText, { color: '#7E22CE' }]}>+10 XP</Text>
                      </View>
                    </View>
                    <Text style={styles.quickScienceTitle} numberOfLines={1}>
                      {language === 'ta' ? todayConceptMap.title.ta : todayConceptMap.title.en}
                    </Text>
                    <Text style={styles.quickScienceSubtitle} numberOfLines={1}>
                      {language === 'ta' ? todayConceptMap.subtitle.ta : todayConceptMap.subtitle.en}
                    </Text>
                  </View>
                </View>
                <Text style={[styles.quickScienceArrow, { color: '#7E22CE' }]}>→</Text>
              </TouchableOpacity>
            )}

            {/* ─── TODAY'S EXPERIMENT ─── */}
            {todayExperiment && (
              <TouchableOpacity
                style={[styles.quickScienceCard, { borderColor: '#BBF7D0' }]}
                onPress={() => onNavigate(`/experiment/${todayExperiment.id}`)}
                activeOpacity={0.88}
                accessible
                accessibilityRole="button"
                accessibilityLabel={`Experiment: ${language === 'ta' ? todayExperiment.title.ta : todayExperiment.title.en}`}
              >
                <View style={styles.quickScienceLeft}>
                  <View style={[styles.quickScienceIconCircle, { backgroundColor: '#DCFCE7' }]}>
                    <Text style={styles.quickScienceIcon}>{todayExperiment.heroAsset || '🧪'}</Text>
                  </View>
                  <View style={styles.quickScienceTextCol}>
                    <View style={styles.quickScienceBadgeRow}>
                      <Text style={[styles.quickScienceBadgeText, { color: '#16A34A' }]}>
                        🧪 {language === 'ta' ? 'அறிவியல் பரிசோதனை' : 'EXPERIMENT LAB'}
                      </Text>
                      <View style={[styles.quickScienceXpBadge, { backgroundColor: '#DCFCE7', borderColor: '#BBF7D0' }]}>
                        <Text style={[styles.quickScienceXpText, { color: '#16A34A' }]}>
                          +{todayExperiment.xpReward || 25} XP
                        </Text>
                      </View>
                    </View>
                    <Text style={styles.quickScienceTitle} numberOfLines={1}>
                      {language === 'ta' ? todayExperiment.title.ta : todayExperiment.title.en}
                    </Text>
                    <Text style={styles.quickScienceSubtitle} numberOfLines={1}>
                      {language === 'ta' ? todayExperiment.subtitle.ta : todayExperiment.subtitle.en}
                    </Text>
                  </View>
                </View>
                <Text style={[styles.quickScienceArrow, { color: '#16A34A' }]}>→</Text>
              </TouchableOpacity>
            )}

            {/* ─── DISCOVERY / COLLECTION PREVIEW (Home 2.0) ─── */}
            {show2_0 && homeViewModel?.discovery && (
              <DiscoveryCard
                discovery={homeViewModel.discovery}
                language={language}
                onPress={() => onNavigate(homeViewModel.discovery!.route)}
              />
            )}

            {/* ─── DAILY CHALLENGE ─── */}
            {data.dailyChallenge && (
              <DailyChallengeCard
                challenge={data.dailyChallenge}
                language={language}
                onStart={() => onNavigate('/challenges')}
              />
            )}

            {/* ─── RECENT ACHIEVEMENT ─── */}
            {data.recentAchievement && (
              <AchievementPreview
                achievement={data.recentAchievement}
                language={language}
                onPress={() => onNavigate('/achievements')}
              />
            )}

            {/* ─── QUICK ACTIONS ─── */}
            <QuickActionGrid
              language={language}
              onQuizPress={() => onNavigate('/learn')}
              onRiddlePress={() => onNavigate('/riddles')}
              onProgressPress={() => onNavigate('/progress')}
              onCertificatesPress={() => onNavigate('/certificates')}
            />

            {/* ─── EXPLORE SCIENCE (Home 2.0) ─── */}
            {show2_0 && homeViewModel && (
              <ExploreSection
                items={homeViewModel.exploreItems}
                language={language}
                onItemPress={onNavigate}
              />
            )}

            {/* ─── RECENT ACTIVITY (Home 2.0) ─── */}
            {show2_0 && homeViewModel && homeViewModel.recentActivity.length > 0 && (
              <RecentActivityCard
                activities={homeViewModel.recentActivity}
                language={language}
              />
            )}
          </>
        )}
      </ScrollView>
    </View>
  );
};

// ============================================================================
// Styles
// ============================================================================

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.pearlWhite,
  },
  scrollBody: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: theme.spacing.base,
    maxWidth: 600,
    width: '100%',
    alignSelf: 'center',
  },
  offlineBanner: {
    width: '100%',
    backgroundColor: theme.colors.warningSurface,
    borderWidth: 1,
    borderColor: theme.colors.warningBorder,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.xs,
    marginBottom: theme.spacing.xs,
    alignItems: 'center',
  },
  offlineText: {
    ...theme.typography.caption,
    fontSize: 12,
    fontWeight: '700',
    color: theme.colors.warning,
  },
  errorContainer: {
    width: '100%',
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1,
    borderColor: theme.colors.errorBorder,
    padding: theme.spacing.xl,
    alignItems: 'center',
    marginVertical: theme.spacing.xl,
  },
  errorIcon: {
    fontSize: 36,
    marginBottom: 8,
  },
  errorTitle: {
    ...theme.typography.h3,
    fontSize: 17,
    fontWeight: '700',
    color: theme.colors.navy900,
    marginBottom: 4,
  },
  errorMessage: {
    ...theme.typography.body,
    fontSize: 13,
    color: theme.colors.slate600,
    textAlign: 'center',
    marginBottom: theme.spacing.md,
  },
  retryButton: {
    backgroundColor: theme.colors.actionPrimary,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: theme.borderRadius.md,
  },
  retryButtonText: {
    ...theme.typography.button,
    fontSize: 14,
    fontWeight: '800',
    color: theme.colors.textOnAction,
  },

  // ─── Home 2.0 New Styles ──────────────────────────────────────────
  recommendationCard: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1,
    borderColor: theme.colors.blue200,
    padding: theme.spacing.base,
    marginBottom: theme.spacing.sm,
    borderLeftWidth: 3,
    borderLeftColor: theme.colors.actionPrimary,
  },
  recHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  recIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  recContent: {
    flex: 1,
  },
  recLabel: {
    ...theme.typography.overline,
    fontSize: 9.5,
    color: theme.colors.actionPrimary,
    fontWeight: '700',
    letterSpacing: 0.8,
    marginBottom: 2,
  },
  recTitle: {
    ...theme.typography.body,
    fontSize: 14,
    fontWeight: '700',
    color: theme.colors.navy900,
  },
  recSubtitle: {
    ...theme.typography.caption,
    fontSize: 12,
    color: theme.colors.slate600,
    marginTop: 1,
  },
  recArrow: {
    fontSize: 18,
    color: theme.colors.actionPrimary,
    fontWeight: '700',
    marginLeft: 8,
  },
  continueCard: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: theme.spacing.base,
    marginBottom: theme.spacing.sm,
  },
  continueHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  continueLabel: {
    ...theme.typography.caption,
    fontSize: 12,
    fontWeight: '800',
    color: theme.colors.navy900,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  continueBadge: {
    backgroundColor: theme.colors.purple100,
    borderWidth: 1,
    borderColor: theme.colors.purple200,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: theme.borderRadius.full,
  },
  continueBadgeText: {
    ...theme.typography.caption,
    fontSize: 10.5,
    fontWeight: '700',
    color: theme.colors.brandPrimary,
  },
  continueTitle: {
    ...theme.typography.h3,
    fontSize: 16,
    fontWeight: '700',
    color: theme.colors.navy900,
    marginBottom: 6,
  },
  continueTrack: {
    height: 5,
    backgroundColor: theme.colors.gray200,
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 6,
  },
  continueFill: {
    height: '100%',
    backgroundColor: theme.colors.actionPrimary,
    borderRadius: 3,
  },
  continueFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  continueProgress: {
    ...theme.typography.caption,
    fontSize: 11.5,
    color: theme.colors.slate600,
  },
  continueAction: {
    ...theme.typography.caption,
    fontSize: 13,
    fontWeight: '800',
    color: theme.colors.actionPrimary,
  },

  // ─── Legacy Unified Card Styles (preserved) ───────────────────────
  unifiedCard: {
    width: '100%',
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    paddingHorizontal: theme.spacing.base,
    marginVertical: theme.spacing.xs,
  },
  unifiedRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: theme.spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.divider,
  },
  unifiedIcon: {
    fontSize: 20,
    marginRight: theme.spacing.md,
  },
  unifiedContent: {
    flex: 1,
  },
  unifiedLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  unifiedTitle: {
    ...theme.typography.body,
    fontSize: 13,
    fontWeight: '700',
    color: theme.colors.navy900,
    flex: 1,
    marginRight: theme.spacing.sm,
  },
  unifiedSub: {
    ...theme.typography.caption,
    fontSize: 11,
    color: theme.colors.slate500,
    marginTop: 2,
  },
  unifiedXp: {
    ...theme.typography.caption,
    fontSize: 11.5,
    fontWeight: '800',
    color: theme.colors.brandPrimary,
  },
  unifiedTrack: {
    height: 6,
    borderRadius: 3,
    backgroundColor: theme.colors.gray200,
    marginTop: 6,
    overflow: 'hidden',
  },
  unifiedFill: {
    height: '100%',
    borderRadius: 3,
    backgroundColor: theme.colors.brandPrimary,
  },
  unifiedChevron: {
    fontSize: 18,
    color: theme.colors.slate400,
    marginLeft: theme.spacing.sm,
  },

  // ─── Quick Science Card Styles (preserved) ────────────────────────
  quickScienceCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    padding: 14,
    marginVertical: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    ...Platform.select({
      ios: {
        shadowColor: '#0F172A',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
      },
      android: { elevation: 2 },
    }),
  },
  quickScienceLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 10,
  },
  quickScienceIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#EEF2FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  quickScienceIcon: { fontSize: 22 },
  quickScienceTextCol: { flex: 1 },
  quickScienceBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
    gap: 6,
  },
  quickScienceBadgeText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#4F46E5',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  quickScienceXpBadge: {
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#A7F3D0',
  },
  quickScienceXpText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#059669',
  },
  quickScienceTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 1,
  },
  quickScienceSubtitle: {
    fontSize: 12,
    fontWeight: '500',
    color: '#64748B',
  },
  quickScienceArrow: {
    fontSize: 18,
    fontWeight: '700',
    color: '#4F46E5',
  },
});
