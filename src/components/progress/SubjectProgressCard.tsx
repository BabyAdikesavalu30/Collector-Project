/**
 * SubjectProgressCard Component
 * Student-friendly card displaying subject progress, topic coverage,
 * practice accuracy, performance trend, and a clear action button.
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { theme } from '../../theme';
import { SupportedLanguage } from '../../config/i18n';
import { SubjectProgress } from '../../features/progress/progress.types';
import { SUBJECT_METAS } from '../../features/progress/progress.catalog';
import { getProgressI18n, interpolate } from './progress.i18n';

export interface SubjectProgressCardProps {
  progress: SubjectProgress;
  language?: SupportedLanguage;
  onPress: (subjectId: string) => void;
}

export const SubjectProgressCard: React.FC<SubjectProgressCardProps> = ({
  progress,
  language = 'en',
  onPress,
}) => {
  const t = getProgressI18n(language);
  const isTamil = language === 'ta';
  const meta = SUBJECT_METAS[progress.subjectId as keyof typeof SUBJECT_METAS];

  const hasActivity = progress.topicsStarted > 0 || progress.completedActivities > 0;
  const clampedProgress = Math.min(100, Math.max(0, Math.round(progress.overallProgress)));

  const title = meta ? (isTamil ? meta.title.ta : meta.title.en) : progress.title;
  const icon = meta ? meta.icon : '🔬';
  const color = meta ? meta.color : theme.colors.blue600;

  // Trend formatting
  let trendText = t.trends.insufficientData;
  let trendColor: string = theme.colors.slate600;
  let trendIcon = '•';
  if (progress.trend === 'improving') {
    trendText = t.trends.improving;
    trendColor = theme.colors.green600;
    trendIcon = '↑';
  } else if (progress.trend === 'stable') {
    trendText = t.trends.stable;
    trendColor = theme.colors.blue600;
    trendIcon = '→';
  } else if (progress.trend === 'declining') {
    trendText = t.trends.declining;
    trendColor = '#D97706';
    trendIcon = '↓';
  }

  const a11yLabel = interpolate(t.accessibility.subjectCard, {
    subject: title,
    progress: clampedProgress,
    explored: progress.topicsStarted,
    total: progress.topicCount,
    accuracy: progress.averageAccuracy,
    trend: trendText,
  });

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => onPress(progress.subjectId)}
      activeOpacity={0.88}
      accessible={true}
      accessibilityRole="button"
      accessibilityLabel={a11yLabel}
      accessibilityHint={t.subjects.viewProgress}
    >
      {/* Header Row */}
      <View style={styles.headerRow}>
        <View style={styles.titleWrap}>
          <View style={[styles.iconBox, { backgroundColor: meta ? meta.accentBg : '#EFF6FF' }]}>
            <Text style={styles.icon}>{icon}</Text>
          </View>
          <View style={styles.titleTextWrap}>
            <Text style={styles.subjectTitle}>{title.toUpperCase()}</Text>
            <Text style={styles.topicsCount}>
              {hasActivity
                ? interpolate(t.subjects.exploredRatio, {
                    explored: progress.topicsStarted,
                    total: progress.topicCount,
                  })
                : t.subjects.notExploredYet}
            </Text>
          </View>
        </View>

        {/* Progress Percentage Badge */}
        {hasActivity ? (
          <View style={styles.percentBadge}>
            <Text style={[styles.percentValue, { color }]}>{clampedProgress}%</Text>
          </View>
        ) : (
          <View style={styles.newBadge}>
            <Text style={styles.newBadgeText}>{t.topicStatus.not_started}</Text>
          </View>
        )}
      </View>

      {/* Progress Bar (Only when explored) */}
      {hasActivity && (
        <View style={styles.track}>
          <View
            style={[
              styles.fill,
              { width: `${clampedProgress}%`, backgroundColor: color },
            ]}
          />
        </View>
      )}

      {/* Stats Row */}
      <View style={styles.bottomRow}>
        {hasActivity ? (
          <>
            <View style={styles.statPill}>
              <Text style={styles.statPillLabel}>{t.practiceAccuracy}:</Text>
              <Text style={styles.statPillValue}>
                {progress.activityCount > 0 ? `${progress.averageAccuracy}%` : '—'}
              </Text>
            </View>

            <View style={styles.trendPill}>
              <Text style={[styles.trendIcon, { color: trendColor }]}>{trendIcon}</Text>
              <Text style={[styles.trendText, { color: trendColor }]}>{trendText}</Text>
            </View>
          </>
        ) : (
          <Text style={styles.unstartedHint}>
            {isTamil
              ? 'முதல் செயல்பாட்டை ஆராய தொடங்குங்கள்'
              : 'Tap to explore available topics & activities'}
          </Text>
        )}

        <Text style={styles.chevron}>›</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.xl,
    padding: theme.spacing.base,
    borderWidth: 1,
    borderColor: theme.colors.border,
    shadowColor: theme.colors.navy900,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
    marginBottom: theme.spacing.sm,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.sm,
  },
  titleWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: theme.spacing.sm,
  },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontSize: 22,
  },
  titleTextWrap: {
    flex: 1,
  },
  subjectTitle: {
    ...theme.typography.body,
    fontWeight: '800',
    color: theme.colors.navy900,
    letterSpacing: 0.4,
  },
  topicsCount: {
    ...theme.typography.caption,
    color: theme.colors.slate600,
    marginTop: 2,
  },
  percentBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  percentValue: {
    fontSize: 22,
    fontWeight: '900',
  },
  newBadge: {
    backgroundColor: theme.colors.gray100,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 4,
    borderRadius: theme.borderRadius.full,
  },
  newBadgeText: {
    ...theme.typography.caption,
    fontWeight: '700',
    color: theme.colors.slate600,
  },
  track: {
    height: 8,
    backgroundColor: theme.colors.gray100,
    borderRadius: theme.borderRadius.full,
    overflow: 'hidden',
    marginBottom: theme.spacing.sm,
  },
  fill: {
    height: '100%',
    borderRadius: theme.borderRadius.full,
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 4,
  },
  statPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statPillLabel: {
    ...theme.typography.caption,
    color: theme.colors.slate600,
    fontWeight: '500',
  },
  statPillValue: {
    ...theme.typography.caption,
    fontWeight: '800',
    color: theme.colors.navy900,
  },
  trendPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  trendIcon: {
    fontSize: 14,
    fontWeight: '900',
  },
  trendText: {
    ...theme.typography.caption,
    fontWeight: '700',
  },
  unstartedHint: {
    ...theme.typography.caption,
    color: theme.colors.blue600,
    fontWeight: '600',
  },
  chevron: {
    fontSize: 20,
    color: theme.colors.slate400,
    fontWeight: '600',
    marginLeft: theme.spacing.xs,
  },
});
