/**
 * TopicProgressCard Component
 * Reusable topic progress card with clear status badge, accuracy, trend,
 * and a strict action hierarchy (Primary, Secondary, and Optional activities).
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { theme } from '../../theme';
import { SupportedLanguage } from '../../config/i18n';
import { TopicProgress } from '../../features/progress/progress.types';
import { getProgressI18n, interpolate } from './progress.i18n';

export interface TopicProgressCardProps {
  topic: TopicProgress;
  language?: SupportedLanguage;
  onNavigateAction: (route: string, params?: Record<string, string>) => void;
}

export const TopicProgressCard: React.FC<TopicProgressCardProps> = ({
  topic,
  language = 'en',
  onNavigateAction,
}) => {
  const t = getProgressI18n(language);
  const clampedProgress = Math.min(100, Math.max(0, Math.round(topic.progressPercent)));

  // Status badge styling
  let statusBg: string = theme.colors.gray100;
  let statusTextColor: string = theme.colors.slate600;
  let statusText = t.topicStatus.not_started;

  switch (topic.status) {
    case 'completed':
      statusBg = '#DCFCE7';
      statusTextColor = theme.colors.green700;
      statusText = t.topicStatus.completed;
      break;
    case 'strong':
      statusBg = '#DCFCE7';
      statusTextColor = theme.colors.green700;
      statusText = t.topicStatus.strong;
      break;
    case 'improving':
      statusBg = '#EFF6FF';
      statusTextColor = theme.colors.blue700;
      statusText = t.topicStatus.improving;
      break;
    case 'focus_area':
      statusBg = '#FEF3C7';
      statusTextColor = '#B45309';
      statusText = t.topicStatus.focus_area;
      break;
    case 'in_progress':
      statusBg = '#F3E8FF';
      statusTextColor = '#7E22CE';
      statusText = t.topicStatus.in_progress;
      break;
    case 'exploring':
      statusBg = '#E0F2FE';
      statusTextColor = '#0369A1';
      statusText = t.topicStatus.exploring;
      break;
    default:
      statusBg = theme.colors.gray100;
      statusTextColor = theme.colors.slate600;
      statusText = t.topicStatus.not_started;
      break;
  }

  // Trend formatting
  let trendIcon = '';
  let trendColor: string = theme.colors.slate500;
  if (topic.trend === 'improving') {
    trendIcon = '↑ ';
    trendColor = theme.colors.green600;
  } else if (topic.trend === 'stable') {
    trendIcon = '→ ';
    trendColor = theme.colors.blue600;
  } else if (topic.trend === 'declining') {
    trendIcon = '↓ ';
    trendColor = '#D97706';
  }

  const a11yLabel = interpolate(t.accessibility.topicCard, {
    topic: topic.title,
    status: statusText,
    progress: clampedProgress,
    accuracy: topic.attempts > 0 ? topic.accuracy : 0,
    trend: topic.trend,
  });

  return (
    <View
      style={styles.card}
      accessible={true}
      accessibilityRole="text"
      accessibilityLabel={a11yLabel}
    >
      {/* Top Header */}
      <View style={styles.topRow}>
        <Text style={styles.topicTitle} numberOfLines={2}>
          {topic.title}
        </Text>
        <View style={[styles.statusBadge, { backgroundColor: statusBg }]}>
          <Text style={[styles.statusBadgeText, { color: statusTextColor }]}>
            {statusText}
          </Text>
        </View>
      </View>

      {/* Progress Track */}
      <View style={styles.track}>
        <View
          style={[
            styles.fill,
            {
              width: `${clampedProgress}%`,
              backgroundColor:
                topic.status === 'completed' || topic.status === 'strong'
                  ? theme.colors.green600
                  : theme.colors.blue600,
            },
          ]}
        />
      </View>

      {/* Stats bar */}
      <View style={styles.statsBar}>
        <Text style={styles.progressPercentText}>{clampedProgress}% {t.activityProgress}</Text>
        {topic.attempts > 0 && (
          <View style={styles.rightStats}>
            <Text style={styles.accuracyText}>
              {topic.accuracy}% {t.practiceAccuracy}
            </Text>
            {topic.trend !== 'insufficientData' && (
              <Text style={[styles.trendText, { color: trendColor }]}>
                {trendIcon}
                {t.trends[topic.trend as keyof typeof t.trends] || topic.trend}
              </Text>
            )}
          </View>
        )}
      </View>

      {/* Action Hierarchy */}
      <View style={styles.actionsContainer}>
        {/* Primary Action */}
        {topic.quizReference ? (
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() =>
              onNavigateAction('/quiz-setup', {
                levelId: topic.quizReference!.levelId,
                subjectId: topic.quizReference!.subjectId,
                pathwayId: topic.quizReference!.pathwayId,
              })
            }
            activeOpacity={0.85}
            accessibilityRole="button"
            accessibilityLabel={t.actions.practice}
          >
            <Text style={styles.primaryButtonText}>📝 {t.actions.practice}</Text>
          </TouchableOpacity>
        ) : topic.learnReference ? (
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => onNavigateAction(topic.learnReference!)}
            activeOpacity={0.85}
            accessibilityRole="button"
            accessibilityLabel={t.actions.continueLearning}
          >
            <Text style={styles.primaryButtonText}>📖 {t.actions.continueLearning}</Text>
          </TouchableOpacity>
        ) : null}

        {/* Supporting / Visual Actions (Micro Lesson, Concept Map, Experiment) */}
        <View style={styles.secondaryRow}>
          {topic.microLessonId && (
            <TouchableOpacity
              style={styles.secondaryPill}
              onPress={() => onNavigateAction(`/micro-lesson/${topic.microLessonId}`)}
              activeOpacity={0.8}
              accessibilityRole="button"
              accessibilityLabel={t.actions.microLesson}
            >
              <Text style={styles.secondaryPillText}>⏱️ {t.actions.microLesson}</Text>
            </TouchableOpacity>
          )}

          {topic.conceptMapId && (
            <TouchableOpacity
              style={styles.secondaryPill}
              onPress={() => onNavigateAction(`/concept-map/${topic.conceptMapId}`)}
              activeOpacity={0.8}
              accessibilityRole="button"
              accessibilityLabel={t.actions.conceptMap}
            >
              <Text style={styles.secondaryPillText}>🗺️ {t.actions.conceptMap}</Text>
            </TouchableOpacity>
          )}

          {topic.experimentId && (
            <TouchableOpacity
              style={styles.secondaryPill}
              onPress={() => onNavigateAction(`/experiment/${topic.experimentId}`)}
              activeOpacity={0.8}
              accessibilityRole="button"
              accessibilityLabel={t.actions.experiment}
            >
              <Text style={styles.secondaryPillText}>🧪 {t.actions.experiment}</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.base,
    borderWidth: 1,
    borderColor: theme.colors.border,
    shadowColor: theme.colors.navy900,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 1,
    marginBottom: theme.spacing.sm,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.xs,
    gap: theme.spacing.sm,
  },
  topicTitle: {
    ...theme.typography.body,
    fontWeight: '700',
    color: theme.colors.navy900,
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: theme.borderRadius.full,
  },
  statusBadgeText: {
    ...theme.typography.caption,
    fontWeight: '800',
    fontSize: 11,
  },
  track: {
    height: 6,
    backgroundColor: theme.colors.gray100,
    borderRadius: theme.borderRadius.full,
    overflow: 'hidden',
    marginTop: 4,
    marginBottom: theme.spacing.xs,
  },
  fill: {
    height: '100%',
    borderRadius: theme.borderRadius.full,
  },
  statsBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.sm,
  },
  progressPercentText: {
    ...theme.typography.caption,
    color: theme.colors.slate600,
    fontWeight: '600',
  },
  rightStats: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  accuracyText: {
    ...theme.typography.caption,
    color: theme.colors.slate600,
    fontWeight: '600',
  },
  trendText: {
    ...theme.typography.caption,
    fontWeight: '700',
  },
  actionsContainer: {
    gap: theme.spacing.xs,
    paddingTop: 4,
  },
  primaryButton: {
    backgroundColor: theme.colors.blue600,
    paddingVertical: 10,
    paddingHorizontal: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
    minHeight: 44,
    justifyContent: 'center',
  },
  primaryButtonText: {
    ...theme.typography.body,
    fontWeight: '800',
    color: theme.colors.white,
  },
  secondaryRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.xs,
  },
  secondaryPill: {
    backgroundColor: theme.colors.gray50,
    borderWidth: 1,
    borderColor: theme.colors.border,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: theme.borderRadius.full,
    minHeight: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  secondaryPillText: {
    ...theme.typography.caption,
    fontWeight: '700',
    color: theme.colors.navy900,
  },
});
