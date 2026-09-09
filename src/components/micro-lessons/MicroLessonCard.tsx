/**
 * MicroLessonCard Component
 * Reusable card displaying subject, title, duration pill, progress bar,
 * completed state, bookmark toggle, and primary action.
 * Touch targets >= 44x44, fully accessible.
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  AccessibilityInfo,
} from 'react-native';
import { theme } from '../../theme';
import { MicroLesson, MicroLessonProgress } from '../../features/micro-lessons/microLessons.types';
import { MICRO_LESSON_SUBJECTS } from '../../features/micro-lessons/microLessons.data';
import { SupportedLanguage } from '../../config/i18n';

export interface MicroLessonCardProps {
  lesson: MicroLesson;
  progress?: MicroLessonProgress | null;
  language?: SupportedLanguage;
  isBookmarked?: boolean;
  onBookmarkPress?: () => void;
  onPress: () => void;
  variant?: 'featured' | 'standard' | 'compact';
}

export const MicroLessonCard: React.FC<MicroLessonCardProps> = ({
  lesson,
  progress,
  language = 'en',
  isBookmarked = false,
  onBookmarkPress,
  onPress,
  variant = 'standard',
}) => {
  const isTamil = language === 'ta';
  const isCompleted = progress?.status === 'completed';
  const progressPercent = progress?.progressPercent || 0;
  const isStarted = progress && progress.status === 'in_progress' && progressPercent > 0;

  const subjectMeta = MICRO_LESSON_SUBJECTS.find((s) => s.id === lesson.subject);
  const subjectName = subjectMeta
    ? isTamil ? subjectMeta.title.ta : subjectMeta.title.en
    : lesson.subject;

  const titleText = isTamil ? lesson.title.ta : lesson.title.en;
  const subtitleText = isTamil ? lesson.subtitle.ta : lesson.subtitle.en;
  const descriptionText = isTamil ? lesson.description.ta : lesson.description.en;

  const durationLabel = isTamil
    ? `${lesson.durationMinutes} நிமிட வாசிப்பு`
    : `${lesson.durationMinutes} min read`;

  const actionText = isCompleted
    ? (isTamil ? 'மீள்பார்வை' : 'Review')
    : isStarted
    ? (isTamil ? 'தொடரவும்' : 'Continue')
    : (isTamil ? 'தொடங்கு' : 'Start');

  const isFeatured = variant === 'featured';
  const isCompact = variant === 'compact';

  return (
    <TouchableOpacity
      style={[
        styles.cardContainer,
        isFeatured && styles.featuredContainer,
        isCompact && styles.compactContainer,
      ]}
      onPress={onPress}
      activeOpacity={0.88}
      accessible={true}
      accessibilityRole="button"
      accessibilityLabel={`${titleText}, ${subjectName}, ${durationLabel}. ${isCompleted ? (isTamil ? 'முடிந்தது' : 'Completed') : ''}`}
      accessibilityHint={isTamil ? 'இப்பாடத்தைத் திறக்க தட்டவும்' : 'Tap to open this micro lesson'}
    >
      {/* Top Meta Row */}
      <View style={styles.headerRow}>
        <View style={[styles.subjectBadge, { backgroundColor: subjectMeta?.badgeBg || '#EFF6FF' }]}>
          <Text style={styles.subjectIcon}>{lesson.icon}</Text>
          <Text style={[styles.subjectText, { color: subjectMeta?.accentColor || '#2563EB' }]}>
            {subjectName.toUpperCase()}
          </Text>
        </View>

        <View style={styles.rightActionsRow}>
          <View style={styles.durationPill}>
            <Text style={styles.durationText}>⏱️ {durationLabel}</Text>
          </View>

          {Boolean(onBookmarkPress) && (
            <TouchableOpacity
              style={styles.bookmarkButton}
              onPress={onBookmarkPress}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
              accessible={true}
              accessibilityRole="button"
              accessibilityLabel={
                isBookmarked
                  ? (isTamil ? 'சேமிக்கப்பட்டவை நீக்குக' : 'Remove bookmark')
                  : (isTamil ? 'பாடத்தைச் சேமிக்கவும்' : 'Bookmark lesson')
              }
            >
              <Text style={styles.bookmarkIcon}>{isBookmarked ? '🔖' : '🏷️'}</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Title & Description */}
      <Text style={[styles.title, isFeatured && styles.featuredTitle]} numberOfLines={2}>
        {titleText}
      </Text>

      <Text style={styles.subtitle} numberOfLines={1}>
        {subtitleText}
      </Text>

      {!isCompact && (
        <Text style={styles.description} numberOfLines={isFeatured ? 3 : 2}>
          {descriptionText}
        </Text>
      )}

      {/* Progress Bar (if in progress) */}
      {isStarted && !isCompleted && (
        <View style={styles.progressContainer}>
          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { width: `${progressPercent}%` }]} />
          </View>
          <Text style={styles.progressText}>{progressPercent}%</Text>
        </View>
      )}

      {/* Bottom Footer Row */}
      <View style={styles.footerRow}>
        {isCompleted ? (
          <View style={styles.completedBadge}>
            <Text style={styles.completedText}>✓ {isTamil ? 'முடிந்தது' : 'Completed'}</Text>
          </View>
        ) : (
          <View style={styles.gradeBadge}>
            <Text style={styles.gradeText}>{lesson.gradeRange}</Text>
          </View>
        )}

        <View style={[styles.actionCta, isCompleted && styles.actionCtaReview]}>
          <Text style={[styles.actionCtaText, isCompleted && styles.actionCtaTextReview]}>
            {actionText} →
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: theme.borderRadius.lg, // 16px
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: theme.spacing.md,
    marginBottom: theme.spacing.sm,
    shadowColor: theme.colors.navy900,
    shadowOffset: { width: 0, height: 1.5 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  featuredContainer: {
    borderColor: '#BFDBFE',
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    padding: theme.spacing.lg,
  },
  compactContainer: {
    padding: theme.spacing.sm,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.xs,
  },
  subjectBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: theme.borderRadius.full,
    gap: 4,
  },
  subjectIcon: {
    fontSize: 12,
  },
  subjectText: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  rightActionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  durationPill: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: theme.borderRadius.full,
  },
  durationText: {
    fontSize: 11,
    fontWeight: '600',
    color: theme.colors.slate600,
  },
  bookmarkButton: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bookmarkIcon: {
    fontSize: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: theme.colors.navy900,
    marginTop: 6,
    lineHeight: 22,
  },
  featuredTitle: {
    fontSize: 18,
    lineHeight: 24,
  },
  subtitle: {
    fontSize: 12,
    fontWeight: '600',
    color: theme.colors.actionPrimary,
    marginTop: 2,
  },
  description: {
    fontSize: 13,
    color: theme.colors.slate600,
    marginTop: 6,
    lineHeight: 18,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: theme.spacing.sm,
    gap: 8,
  },
  progressTrack: {
    flex: 1,
    height: 6,
    backgroundColor: '#E2E8F0',
    borderRadius: theme.borderRadius.full,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: theme.colors.actionPrimary,
    borderRadius: theme.borderRadius.full,
  },
  progressText: {
    fontSize: 11,
    fontWeight: '600',
    color: theme.colors.slate500,
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: theme.spacing.md,
    paddingTop: theme.spacing.xs,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  completedBadge: {
    backgroundColor: '#F0FDF4',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: theme.borderRadius.full,
    borderWidth: 1,
    borderColor: '#BBF7D0',
  },
  completedText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#16A34A',
  },
  gradeBadge: {
    backgroundColor: '#F8FAFC',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: theme.borderRadius.sm,
  },
  gradeText: {
    fontSize: 11,
    color: theme.colors.slate500,
    fontWeight: '500',
  },
  actionCta: {
    backgroundColor: theme.colors.actionPrimary,
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: theme.borderRadius.md,
    minHeight: 34,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionCtaReview: {
    backgroundColor: '#EFF6FF',
    borderWidth: 1,
    borderColor: '#BFDBFE',
  },
  actionCtaText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  actionCtaTextReview: {
    color: theme.colors.actionPrimary,
  },
});
