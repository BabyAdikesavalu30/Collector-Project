/**
 * MicroLessonHero Component
 * Top header & hero element for the Micro Lesson detail screen.
 * Embeds canonical AppBackButton, bookmark button, subject pill, title, and reading progress bar.
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { theme } from '../../theme';
import { AppBackButton } from '../navigation';
import { MicroLesson } from '../../features/micro-lessons/microLessons.types';
import { MICRO_LESSON_SUBJECTS } from '../../features/micro-lessons/microLessons.data';
import { SupportedLanguage } from '../../config/i18n';

export interface MicroLessonHeroProps {
  lesson: MicroLesson;
  progressPercent: number;
  isBookmarked: boolean;
  language?: SupportedLanguage;
  onBack: () => void;
  onBookmarkPress: () => void;
}

export const MicroLessonHero: React.FC<MicroLessonHeroProps> = ({
  lesson,
  progressPercent,
  isBookmarked,
  language = 'en',
  onBack,
  onBookmarkPress,
}) => {
  const isTamil = language === 'ta';
  const subjectMeta = MICRO_LESSON_SUBJECTS.find((s) => s.id === lesson.subject);
  const subjectTitle = subjectMeta
    ? isTamil ? subjectMeta.title.ta : subjectMeta.title.en
    : lesson.subject;

  const titleText = isTamil ? lesson.title.ta : lesson.title.en;
  const subtitleText = isTamil ? lesson.subtitle.ta : lesson.subtitle.en;

  const durationLabel = isTamil
    ? `${lesson.durationMinutes} நிமிட வாசிப்பு`
    : `${lesson.durationMinutes} min read`;

  return (
    <View style={styles.container}>
      {/* Top Action Bar */}
      <View style={styles.navBar}>
        <AppBackButton
          onPress={onBack}
          language={language}
          variant="card"
          accessibilityLabel={isTamil ? 'நுண்ணிய பாடங்களுக்குத் திரும்பு' : 'Back to micro lessons'}
        />

        <TouchableOpacity
          style={[styles.bookmarkButton, isBookmarked && styles.bookmarkButtonActive]}
          onPress={onBookmarkPress}
          activeOpacity={0.7}
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel={
            isBookmarked
              ? (isTamil ? 'சேமிக்கப்பட்டவை நீக்குக' : 'Remove from bookmarks')
              : (isTamil ? 'பாடத்தைச் சேமிக்கவும்' : 'Bookmark this lesson')
          }
        >
          <Text style={styles.bookmarkIcon}>{isBookmarked ? '🔖' : '🏷️'}</Text>
        </TouchableOpacity>
      </View>

      {/* Subject & Duration Badges */}
      <View style={styles.metaRow}>
        <View style={[styles.subjectPill, { backgroundColor: subjectMeta?.badgeBg || '#EFF6FF' }]}>
          <Text style={styles.subjectEmoji}>{lesson.icon}</Text>
          <Text style={[styles.subjectText, { color: subjectMeta?.accentColor || '#2563EB' }]}>
            {subjectTitle.toUpperCase()}
          </Text>
        </View>

        <View style={styles.durationBadge}>
          <Text style={styles.durationText}>⏱️ {durationLabel}</Text>
        </View>

        <View style={styles.gradeBadge}>
          <Text style={styles.gradeText}>{lesson.gradeRange}</Text>
        </View>
      </View>

      {/* Lesson Title */}
      <Text style={styles.title}>{titleText}</Text>
      <Text style={styles.subtitle}>{subtitleText}</Text>

      {/* Reading Progress Indicator */}
      <View style={styles.progressSection}>
        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, { width: `${Math.min(100, progressPercent)}%` }]} />
        </View>
        <Text style={styles.progressLabel}>
          {isTamil ? `முன்னேற்றம்: ${progressPercent}%` : `Progress: ${progressPercent}%`}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
    paddingHorizontal: theme.spacing.md,
    paddingTop: theme.spacing.sm,
    paddingBottom: theme.spacing.md,
  },
  navBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.sm,
  },
  bookmarkButton: {
    width: 44,
    height: 44,
    minWidth: 44,
    minHeight: 44,
    borderRadius: theme.borderRadius.md,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: theme.colors.navy900,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 3,
    elevation: 2,
  },
  bookmarkButtonActive: {
    backgroundColor: '#FAF5FF',
    borderColor: '#D8B4FE',
  },
  bookmarkIcon: {
    fontSize: 18,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 4,
  },
  subjectPill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: theme.borderRadius.full,
    gap: 5,
  },
  subjectEmoji: {
    fontSize: 13,
  },
  subjectText: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  durationBadge: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: theme.borderRadius.full,
  },
  durationText: {
    fontSize: 11,
    fontWeight: '600',
    color: theme.colors.slate600,
  },
  gradeBadge: {
    backgroundColor: '#F8FAFC',
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: theme.borderRadius.sm,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  gradeText: {
    fontSize: 11,
    color: theme.colors.slate500,
    fontWeight: '500',
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: theme.colors.navy900,
    marginTop: theme.spacing.sm,
    lineHeight: 28,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.actionPrimary,
    marginTop: 4,
    lineHeight: 20,
  },
  progressSection: {
    marginTop: theme.spacing.md,
    gap: 6,
  },
  progressTrack: {
    height: 6,
    backgroundColor: '#E2E8F0',
    borderRadius: theme.borderRadius.full,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#16A34A',
    borderRadius: theme.borderRadius.full,
  },
  progressLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: theme.colors.slate500,
    textAlign: 'right',
  },
});
