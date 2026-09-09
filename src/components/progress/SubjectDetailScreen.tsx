/**
 * SubjectDetailScreen Component (/progress/[subject])
 * Dedicated drilldown showing subject progress, practice accuracy, scannable
 * topics, focus areas, recent activity, and recommended next steps.
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
import { SubjectProgress, TopicProgress, RecentProgressActivity } from '../../features/progress/progress.types';
import { SUBJECT_METAS } from '../../features/progress/progress.catalog';
import { FocusArea } from '../../features/weak-areas/weakAreas.types';
import { TopicProgressCard } from './TopicProgressCard';
import { getProgressI18n, interpolate } from './progress.i18n';

export interface SubjectDetailScreenProps {
  subjectId: string;
  subjectProgress: SubjectProgress | null;
  topics: TopicProgress[];
  focusAreas: FocusArea[];
  recentActivities: RecentProgressActivity[];
  isLoading: boolean;
  language?: SupportedLanguage;
  onBack: () => void;
  onNavigateAction: (route: string, params?: Record<string, string>) => void;
  onViewFocusAreas: () => void;
}

export const SubjectDetailScreen: React.FC<SubjectDetailScreenProps> = ({
  subjectId,
  subjectProgress,
  topics,
  focusAreas,
  recentActivities,
  isLoading,
  language = 'en',
  onBack,
  onNavigateAction,
  onViewFocusAreas,
}) => {
  const insets = useSafeAreaInsets();
  const t = getProgressI18n(language);
  const isTamil = language === 'ta';

  const meta = SUBJECT_METAS[subjectId as keyof typeof SUBJECT_METAS];
  const title = meta ? (isTamil ? meta.title.ta : meta.title.en) : subjectId;
  const icon = meta ? meta.icon : '🔬';
  const color = meta ? meta.color : theme.colors.blue600;

  const clampedProgress = subjectProgress
    ? Math.min(100, Math.max(0, Math.round(subjectProgress.overallProgress)))
    : 0;

  // Determine top recommendation: focus area first, then first uncompleted/in_progress topic
  const topFocus = focusAreas[0];
  const nextTopic =
    topics.find((tp) => tp.status === 'in_progress' || tp.status === 'exploring') ||
    topics.find((tp) => tp.status === 'not_started') ||
    topics[0];

  return (
    <View style={styles.container}>
      <StatusBar style="dark" translucent backgroundColor="transparent" />

      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + 8 }]}>
        <AppBackButton onPress={onBack} language={language} style={styles.backBtn} />
        <View style={styles.headerTitleWrap}>
          <Text style={styles.headerIcon}>{icon}</Text>
          <Text style={styles.headerTitle} numberOfLines={1}>
            {title}
          </Text>
        </View>
        <View style={styles.headerSpacer} />
      </View>

      {isLoading ? (
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color={color} />
        </View>
      ) : (
        <ScrollView
          style={styles.scrollBody}
          contentContainerStyle={[
            styles.scrollContent,
            { paddingBottom: Math.max(insets.bottom + 32, 40) },
          ]}
          showsVerticalScrollIndicator={false}
        >
          {/* Summary Hero Card */}
          <View style={styles.summaryCard}>
            <View style={styles.summaryTop}>
              <View>
                <Text style={styles.summarySub}>{t.subjectDetail.progress}</Text>
                <Text style={[styles.summaryBig, { color }]}>{clampedProgress}%</Text>
              </View>
              <View style={styles.summaryMetrics}>
                <View style={styles.metricItem}>
                  <Text style={styles.metricVal}>{subjectProgress?.completedActivities ?? 0}</Text>
                  <Text style={styles.metricLabel}>{t.subjectDetail.activity}</Text>
                </View>
                <View style={styles.metricDivider} />
                <View style={styles.metricItem}>
                  <Text style={styles.metricVal}>
                    {subjectProgress && subjectProgress.activityCount > 0
                      ? `${subjectProgress.averageAccuracy}%`
                      : '—'}
                  </Text>
                  <Text style={styles.metricLabel}>{t.subjectDetail.accuracy}</Text>
                </View>
              </View>
            </View>

            {/* Progress Bar */}
            <View style={styles.track}>
              <View
                style={[
                  styles.fill,
                  { width: `${clampedProgress}%`, backgroundColor: color },
                ]}
              />
            </View>

            {/* Coverage text */}
            <Text style={styles.coverageText}>
              {interpolate(t.subjects.exploredRatio, {
                explored: subjectProgress?.topicsStarted ?? 0,
                total: subjectProgress?.topicCount ?? topics.length,
              })}
            </Text>
          </View>

          {/* Recommended Next Step */}
          {(topFocus || nextTopic) && (
            <View style={styles.nextStepCard}>
              <Text style={styles.sectionHeader}>{t.subjectDetail.nextStepTitle}</Text>
              <Text style={styles.nextStepTitle}>
                {topFocus ? topFocus.title[isTamil ? 'ta' : 'en'] : nextTopic?.title}
              </Text>
              <Text style={styles.nextStepDesc}>
                {topFocus
                  ? t.focusAreas.suggestedPractice
                  : isTamil
                    ? 'இந்த தலைப்பில் உங்கள் அடுத்த பயிற்சியைத் தொடங்குங்கள்.'
                    : 'Jump into this topic to continue building your science mastery.'}
              </Text>
              <TouchableOpacity
                style={[styles.nextStepBtn, { backgroundColor: color }]}
                onPress={() => {
                  if (topFocus?.recommendedAction) {
                    onNavigateAction(
                      topFocus.recommendedAction.route,
                      topFocus.recommendedAction.params
                    );
                  } else if (nextTopic?.quizReference) {
                    onNavigateAction('/quiz-setup', {
                      levelId: nextTopic.quizReference.levelId,
                      subjectId: nextTopic.quizReference.subjectId,
                      pathwayId: nextTopic.quizReference.pathwayId,
                    });
                  } else if (nextTopic?.microLessonId) {
                    onNavigateAction(`/micro-lesson/${nextTopic.microLessonId}`);
                  } else {
                    onNavigateAction('/learn');
                  }
                }}
                activeOpacity={0.85}
                accessibilityRole="button"
              >
                <Text style={styles.nextStepBtnText}>🚀 {t.actions.continueLearning} →</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Focus Areas Section */}
          {focusAreas.length > 0 && (
            <View style={styles.focusSection}>
              <View style={styles.sectionRow}>
                <Text style={styles.sectionHeader}>{t.subjectDetail.focusAreasTitle}</Text>
                <TouchableOpacity
                  onPress={onViewFocusAreas}
                  hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                  accessibilityRole="button"
                >
                  <Text style={styles.viewAllText}>{t.focusAreas.viewAll}</Text>
                </TouchableOpacity>
              </View>
              {focusAreas.map((f) => (
                <View key={f.topicId} style={styles.focusAreaRow}>
                  <Text style={styles.focusDot}>🎯</Text>
                  <View style={styles.focusInfo}>
                    <Text style={styles.focusTitle}>{f.title[isTamil ? 'ta' : 'en']}</Text>
                    <Text style={styles.focusSub}>
                      {f.accuracy}% {t.practiceAccuracy}
                    </Text>
                  </View>
                  {f.recommendedAction && (
                    <TouchableOpacity
                      style={styles.focusPracticeBtn}
                      onPress={() =>
                        onNavigateAction(f.recommendedAction!.route, f.recommendedAction!.params)
                      }
                      activeOpacity={0.8}
                      accessibilityRole="button"
                    >
                      <Text style={styles.focusPracticeBtnText}>{t.actions.practice}</Text>
                    </TouchableOpacity>
                  )}
                </View>
              ))}
            </View>
          )}

          {/* Topics List */}
          <View style={styles.topicsSection}>
            <Text style={styles.sectionHeader}>{t.subjectDetail.topicsTitle}</Text>
            {topics.map((topic) => (
              <TopicProgressCard
                key={topic.topicId}
                topic={topic}
                language={language}
                onNavigateAction={onNavigateAction}
              />
            ))}
          </View>

          {/* Recent Activity */}
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
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: theme.spacing.xs,
  },
  headerIcon: {
    fontSize: 22,
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
  summaryCard: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.xl,
    padding: theme.spacing.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    shadowColor: theme.colors.navy900,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
    marginBottom: theme.spacing.md,
  },
  summaryTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.sm,
  },
  summarySub: {
    ...theme.typography.caption,
    color: theme.colors.slate600,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  summaryBig: {
    fontSize: 32,
    fontWeight: '900',
  },
  summaryMetrics: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  metricItem: {
    alignItems: 'center',
  },
  metricVal: {
    ...theme.typography.h3,
    fontSize: 18,
    fontWeight: '800',
    color: theme.colors.navy900,
  },
  metricLabel: {
    ...theme.typography.caption,
    color: theme.colors.slate600,
  },
  metricDivider: {
    width: 1,
    height: 24,
    backgroundColor: theme.colors.border,
  },
  track: {
    height: 8,
    backgroundColor: theme.colors.gray100,
    borderRadius: theme.borderRadius.full,
    overflow: 'hidden',
    marginBottom: theme.spacing.xs,
  },
  fill: {
    height: '100%',
    borderRadius: theme.borderRadius.full,
  },
  coverageText: {
    ...theme.typography.caption,
    color: theme.colors.slate600,
    fontWeight: '600',
  },
  nextStepCard: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.xl,
    padding: theme.spacing.base,
    borderWidth: 1,
    borderColor: theme.colors.border,
    marginBottom: theme.spacing.md,
  },
  sectionHeader: {
    ...theme.typography.caption,
    fontWeight: '800',
    color: theme.colors.navy900,
    letterSpacing: 0.6,
    marginBottom: theme.spacing.xs,
  },
  nextStepTitle: {
    ...theme.typography.body,
    fontWeight: '800',
    color: theme.colors.navy900,
    marginBottom: 4,
  },
  nextStepDesc: {
    ...theme.typography.caption,
    color: theme.colors.slate600,
    marginBottom: theme.spacing.sm,
  },
  nextStepBtn: {
    paddingVertical: 10,
    paddingHorizontal: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
    minHeight: 44,
    justifyContent: 'center',
  },
  nextStepBtnText: {
    ...theme.typography.body,
    fontWeight: '800',
    color: theme.colors.white,
  },
  focusSection: {
    backgroundColor: '#FFFBEB',
    borderRadius: theme.borderRadius.xl,
    padding: theme.spacing.base,
    borderWidth: 1,
    borderColor: '#FDE68A',
    marginBottom: theme.spacing.md,
  },
  sectionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.sm,
  },
  viewAllText: {
    ...theme.typography.caption,
    color: theme.colors.blue600,
    fontWeight: '700',
  },
  focusAreaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.white,
    padding: theme.spacing.sm,
    borderRadius: theme.borderRadius.md,
    gap: theme.spacing.sm,
    marginBottom: 6,
  },
  focusDot: {
    fontSize: 16,
  },
  focusInfo: {
    flex: 1,
  },
  focusTitle: {
    ...theme.typography.caption,
    fontWeight: '800',
    color: theme.colors.navy900,
  },
  focusSub: {
    ...theme.typography.caption,
    color: theme.colors.slate600,
  },
  focusPracticeBtn: {
    backgroundColor: theme.colors.blue600,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 6,
    borderRadius: theme.borderRadius.full,
    minHeight: 36,
    justifyContent: 'center',
  },
  focusPracticeBtnText: {
    ...theme.typography.caption,
    fontWeight: '800',
    color: theme.colors.white,
  },
  topicsSection: {
    marginBottom: theme.spacing.md,
  },
  recentSection: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.xl,
    padding: theme.spacing.base,
    borderWidth: 1,
    borderColor: theme.colors.border,
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
