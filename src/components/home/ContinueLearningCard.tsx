/**
 * ContinueLearningCard Component
 * Canonical component displaying either:
 * 1. Active in-progress science topic with subject, title, honest local progress %, and Continue -> action.
 * 2. Meaningful first-learning empty state (START LEARNING -> Explore your first science topic -> Start Learning ->)
 * strictly using the student's actual local progress (zero fake data).
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { theme } from '../../theme';
import { ContinueTopic } from '../../features/home/home.types';
import { SupportedLanguage, getTranslation } from '../../config/i18n';

export type AnyContinueTopic =
  | ContinueTopic
  | {
      title: string;
      titleTa?: string;
      subject: string;
      progressPercentage?: number;
      progressPercent?: number;
      route?: string;
    };

interface ContinueLearningCardProps {
  topic?: AnyContinueTopic | null;
  language?: SupportedLanguage;
  onPress: () => void;
}

export const ContinueLearningCard: React.FC<ContinueLearningCardProps> = ({
  topic,
  language = 'en',
  onPress,
}) => {
  const t = getTranslation(language).home;
  const isTamil = language === 'ta';

  // State 1: No previous learning activity -> Meaningful First-Learning State
  if (!topic) {
    return (
      <TouchableOpacity
        style={styles.container}
        onPress={onPress}
        activeOpacity={0.85}
        accessible={true}
        accessibilityRole="button"
        accessibilityLabel={
          isTamil
            ? 'கற்றலைத் தொடங்குங்கள்: உங்கள் முதல் அறிவியல் பாடத்தை ஆராயுங்கள்'
            : 'Start Learning: Explore your first science topic'
        }
        accessibilityHint={
          isTamil
            ? 'அறிவியல் பாடப் பட்டியலுக்குச் செல்கிறது'
            : 'Navigates to science topics catalog'
        }
      >
        <View style={styles.topRow}>
          <Text style={styles.sectionHeaderStart}>
            {isTamil ? 'கற்றலைத் தொடங்குங்கள்' : 'START LEARNING'}
          </Text>
          <View style={styles.subjectBadgeStart}>
            <Text style={styles.subjectBadgeStartText}>
              {isTamil ? 'புதிய தொடக்கம்' : 'FIRST TOPIC'}
            </Text>
          </View>
        </View>

        <Text style={styles.emptyTitle}>
          {isTamil
            ? 'உங்கள் முதல் அறிவியல் பாடத்தை ஆராயுங்கள்.'
            : 'Explore your first science topic.'}
        </Text>

        <View style={styles.emptyFooter}>
          <View style={styles.actionPill}>
            <Text style={styles.actionText}>
              {isTamil ? 'கற்றலைத் தொடங்குங்கள்' : 'Start Learning'}
            </Text>
            <Text style={styles.actionArrow}>→</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  // Extract properties safely from both legacy and Home 2.0 view models
  const subject = topic.subject || (isTamil ? 'அறிவியல்' : 'Science');
  const title =
    'topicTitle' in topic
      ? topic.topicTitle
      : isTamil && topic.titleTa
      ? topic.titleTa
      : topic.title;

  const rawPercentage =
    'progressPercentage' in topic && typeof topic.progressPercentage === 'number'
      ? topic.progressPercentage
      : 'progressPercent' in topic && typeof topic.progressPercent === 'number'
      ? topic.progressPercent
      : 0;

  const clampedProgress = Math.min(100, Math.max(0, Math.round(rawPercentage)));

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.85}
      accessible={true}
      accessibilityRole="button"
      accessibilityLabel={`${t.continueLearning}: ${title}. ${subject}. ${clampedProgress} percent complete.`}
      accessibilityHint={t.accessibility.continueLearningHint}
    >
      {/* 1. Header: CONTINUE LEARNING */}
      <View style={styles.topRow}>
        <Text style={styles.sectionHeader}>{t.continueLearning}</Text>
        <View style={styles.subjectBadge}>
          <Text style={styles.subjectBadgeText}>{subject}</Text>
        </View>
      </View>

      {/* 2. Topic Title */}
      <Text style={styles.topicTitle} numberOfLines={2}>
        {title}
      </Text>

      {/* 3. Progress Row: Progress ───────── 65% */}
      <View style={styles.progressSection}>
        <View style={styles.progressTrackRow}>
          <Text style={styles.progressLabel}>{isTamil ? 'முன்னேற்றம்' : 'Progress'}</Text>
          <View style={styles.track}>
            <View style={[styles.fill, { width: `${clampedProgress}%` }]} />
          </View>
          <Text style={styles.progressPercentageText}>{clampedProgress}%</Text>
        </View>
      </View>

      {/* 4. Continuation Action: Continue -> */}
      <View style={styles.bottomRow}>
        <View />
        <View style={styles.actionPill}>
          <Text style={styles.actionText}>{t.continueAction}</Text>
          <Text style={styles.actionArrow}>→</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: theme.spacing.base,
    marginVertical: theme.spacing.xs,
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
    marginBottom: 4,
  },
  sectionHeader: {
    ...theme.typography.caption,
    fontSize: 11.5,
    fontWeight: '800',
    color: theme.colors.actionPrimary,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  sectionHeaderStart: {
    ...theme.typography.caption,
    fontSize: 11.5,
    fontWeight: '800',
    color: theme.colors.brandPrimary,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  subjectBadge: {
    backgroundColor: theme.colors.blue50,
    borderWidth: 1,
    borderColor: theme.colors.blue200,
    paddingHorizontal: 8,
    paddingVertical: 2.5,
    borderRadius: theme.borderRadius.full,
  },
  subjectBadgeText: {
    ...theme.typography.caption,
    fontSize: 10.5,
    fontWeight: '700',
    color: theme.colors.actionPrimary,
  },
  subjectBadgeStart: {
    backgroundColor: theme.colors.purple100,
    borderWidth: 1,
    borderColor: theme.colors.purple200,
    paddingHorizontal: 8,
    paddingVertical: 2.5,
    borderRadius: theme.borderRadius.full,
  },
  subjectBadgeStartText: {
    ...theme.typography.caption,
    fontSize: 10.5,
    fontWeight: '700',
    color: theme.colors.brandPrimary,
  },
  topicTitle: {
    ...theme.typography.h3,
    fontSize: 16.5,
    lineHeight: 23,
    fontWeight: '700',
    color: theme.colors.navy900,
    marginTop: 4,
    marginBottom: 8,
  },
  emptyTitle: {
    ...theme.typography.bodyLarge,
    fontSize: 15,
    lineHeight: 22,
    color: theme.colors.slate600,
    fontWeight: '500',
    marginTop: 4,
    marginBottom: 8,
  },
  progressSection: {
    width: '100%',
    marginBottom: 8,
  },
  progressTrackRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    gap: 10,
  },
  progressLabel: {
    ...theme.typography.caption,
    fontSize: 12,
    fontWeight: '700',
    color: theme.colors.slate600,
  },
  track: {
    flex: 1,
    height: 7,
    backgroundColor: theme.colors.gray100,
    borderRadius: 3.5,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  fill: {
    height: '100%',
    backgroundColor: theme.colors.actionPrimary,
    borderRadius: 3.5,
  },
  progressPercentageText: {
    ...theme.typography.caption,
    fontSize: 12.5,
    fontWeight: '800',
    color: theme.colors.navy900,
    minWidth: 36,
    textAlign: 'right',
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 2,
  },
  emptyFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingTop: 2,
  },
  actionPill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 2,
  },
  actionText: {
    ...theme.typography.caption,
    fontSize: 13.5,
    fontWeight: '800',
    color: theme.colors.actionPrimary,
    marginRight: 4,
  },
  actionArrow: {
    fontSize: 15,
    color: theme.colors.actionPrimary,
    fontWeight: '800',
  },
});
