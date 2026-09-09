/**
 * FocusAreaCard — one recommended practice topic.
 * Positive framing, data-supported reason, one clear next action. The card
 * never shames: no red, no ranking, no comparison to other students.
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { theme } from '../../theme';
import { SupportedLanguage } from '../../config/i18n';
import { FocusArea, FocusAreaStatus } from '../../features/weak-areas';
import { ProgressBar } from '../shared';
import { getWeakAreasI18n, interpolate } from './weakAreas.i18n';
import { TrendIndicator } from './TrendIndicator';
import { getSubjectTitle } from '../../features/weak-areas';

interface FocusAreaCardProps {
  area: FocusArea;
  language: SupportedLanguage;
  onPractice: (area: FocusArea) => void;
  /** Optional status override (e.g. for the Getting Stronger card). */
  statusOverride?: FocusAreaStatus;
  showTrend?: boolean;
}

function getStatusKey(status: FocusAreaStatus): 'statusNeedsPractice' | 'statusBuildConfidence' | 'statusPracticeSuggested' {
  if (status === 'needsPractice') return 'statusNeedsPractice';
  if (status === 'buildConfidence') return 'statusBuildConfidence';
  return 'statusPracticeSuggested';
}

export const FocusAreaCard: React.FC<FocusAreaCardProps> = ({
  area,
  language,
  onPractice,
  statusOverride,
  showTrend = true,
}) => {
  const t = getWeakAreasI18n(language);
  const status: FocusAreaStatus = statusOverride ?? getFocusStatusKey(area.confidence);
  const statusLabel = t[getStatusKey(status)];
  const subjectTitle = getSubjectTitle(area.subjectId);
  const subjectLabel = language === 'ta' ? subjectTitle.ta : subjectTitle.en;
  const topicLabel = language === 'ta' ? area.title.ta : area.title.en;

  const reasonLabel = interpolate(t[area.reason.labelKey], area.reason.values ?? {});

  const actionLabels: Record<string, string> = {
    learnIn2Min: t.learnIn2Min,
    continueLearning: t.continueLearning,
    seeBigPicture: t.seeBigPicture,
    tryExperiment: t.tryExperiment,
    practiceQuestions: t.practiceQuestions,
  };
  const actionLabel = actionLabels[area.action.labelKey] ?? t.reviewTopic;

  const a11y = interpolate(t.accessibility.focusAreaCard, {
    topic: topicLabel,
    subject: subjectLabel,
    confidence: String(area.confidence),
    status: statusLabel,
  });

  return (
    <View style={styles.card}>
      <View style={styles.topRow}>
        <View style={styles.subjectBadge}>
          <Text style={styles.subjectText}>{subjectLabel.toUpperCase()}</Text>
        </View>
        {showTrend ? <TrendIndicator trend={area.trend} language={language} /> : null}
      </View>

      <Text style={styles.topicTitle}>{topicLabel}</Text>

      <View style={styles.confidenceRow}>
        <Text style={styles.confidenceLabel}>{t.practiceConfidence}</Text>
        <Text style={styles.confidenceValue}>{area.confidence}%</Text>
      </View>
      <ProgressBar
        progress={area.confidence}
        color={theme.colors.actionPrimary}
        label={interpolate(t.accessibility.progressBar, { topic: topicLabel })}
        showPercentage={false}
      />

      <Text style={styles.statusText}>{statusLabel}</Text>
      <Text style={styles.reasonText}>{reasonLabel}</Text>

      <TouchableOpacity
        style={styles.actionButton}
        onPress={() => onPractice(area)}
        accessibilityRole="button"
        accessibilityLabel={`${actionLabel}: ${topicLabel}`}
        activeOpacity={0.85}
      >
        <Text style={styles.actionText}>{actionLabel}</Text>
      </TouchableOpacity>
      {/* a11y summary for the whole card */}
      <Text style={styles.hiddenA11y} accessible accessibilityLabel={a11y} />
    </View>
  );
};

function getFocusStatusKey(confidence: number): FocusAreaStatus {
  if (confidence <= 50) return 'needsPractice';
  if (confidence < 85) return 'buildConfidence';
  return 'practiceSuggested';
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: theme.spacing.base,
    shadowColor: theme.colors.navy900,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.xs,
    gap: theme.spacing.xs,
  },
  subjectBadge: {
    backgroundColor: theme.colors.purple100,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: theme.borderRadius.full,
    flexShrink: 1,
  },
  subjectText: {
    fontSize: 10,
    fontWeight: '800',
    color: theme.colors.brandPrimary,
    letterSpacing: 0.8,
  },
  topicTitle: {
    ...theme.typography.h3,
    fontSize: 16,
    fontWeight: '800',
    color: theme.colors.navy900,
    marginTop: 2,
  },
  confidenceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: theme.spacing.sm,
    marginBottom: 4,
  },
  confidenceLabel: {
    ...theme.typography.caption,
    fontSize: 12,
    fontWeight: '700',
    color: theme.colors.slate600,
  },
  confidenceValue: {
    ...theme.typography.h3,
    fontSize: 17,
    fontWeight: '800',
    color: theme.colors.actionPrimary,
  },
  statusText: {
    ...theme.typography.caption,
    fontSize: 12,
    fontWeight: '800',
    color: theme.colors.blue700,
    marginTop: theme.spacing.sm,
  },
  reasonText: {
    ...theme.typography.caption,
    fontSize: 12.5,
    color: theme.colors.slate600,
    lineHeight: 18,
    marginTop: 2,
  },
  actionButton: {
    marginTop: theme.spacing.md,
    backgroundColor: theme.colors.actionPrimary,
    minHeight: 44,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: theme.spacing.base,
    paddingVertical: 10,
  },
  actionText: {
    ...theme.typography.button,
    fontSize: 13.5,
    fontWeight: '800',
    color: theme.colors.textOnAction,
  },
  hiddenA11y: {
    height: 0,
    opacity: 0,
  },
});
