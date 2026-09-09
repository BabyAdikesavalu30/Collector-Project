/**
 * MicroLessonDetailScreen Component
 * Detail route (/micro-lesson/[id]): Hero with AppBackButton & bookmark,
 * modular visual sections, interactive think-about-it reveal, quick check,
 * checkpoint progress saving, and celebratory completion card.
 */

import React, { useState, useCallback, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { theme } from '../../theme';
import { AppBackButton } from '../navigation';
import {
  MicroLesson,
  MicroLessonProgress,
} from '../../features/micro-lessons/microLessons.types';
import { MicroLessonHero } from './MicroLessonHero';
import { MicroLessonSection } from './MicroLessonSection';
import { LessonQuickCheckCoach } from '../feedback/LessonQuickCheckCoach';
import { MicroLessonCompletion } from './MicroLessonCompletion';
import { SupportedLanguage } from '../../config/i18n';

export interface MicroLessonDetailScreenProps {
  lesson: MicroLesson | null;
  progress: MicroLessonProgress | null;
  isBookmarked: boolean;
  isLoading: boolean;
  language?: SupportedLanguage;
  onBookmarkToggle: () => void;
  onUpdateProgress: (sectionIndex: number, totalSections: number) => void;
  onCompleteLesson: () => Promise<{ ok: boolean; xpAwarded: number; alreadyCompleted: boolean }>;
  onBack: () => void;
  onNavigateToQuiz: (route?: string) => void;
  onNavigateToLearn: (route?: string) => void;
}

export const MicroLessonDetailScreen: React.FC<MicroLessonDetailScreenProps> = ({
  lesson,
  progress,
  isBookmarked,
  isLoading,
  language = 'en',
  onBookmarkToggle,
  onUpdateProgress,
  onCompleteLesson,
  onBack,
  onNavigateToQuiz,
  onNavigateToLearn,
}) => {
  const insets = useSafeAreaInsets();
  const isTamil = language === 'ta';

  const [hasCompletedLesson, setHasCompletedLesson] = useState(false);
  const [xpAwarded, setXpAwarded] = useState(0);

  // Sync completion state from existing progress
  useEffect(() => {
    if (progress?.status === 'completed') {
      setHasCompletedLesson(true);
    }
  }, [progress]);

  // Handle quick check completion
  const handleQuickCheckFinished = useCallback(
    async (isCorrect: boolean) => {
      void isCorrect;
      // Mark lesson complete and award XP
      const res = await onCompleteLesson();
      if (res.ok) {
        setHasCompletedLesson(true);
        setXpAwarded(res.xpAwarded);
      }
    },
    [onCompleteLesson]
  );

  // Loading state
  if (isLoading && !lesson) {
    return (
      <View style={[styles.centerContainer, { paddingTop: insets.top }]}>
        <ActivityIndicator size="large" color={theme.colors.actionPrimary} />
      </View>
    );
  }

  // Not found error state (Section 53)
  if (!lesson) {
    return (
      <View style={[styles.centerContainer, { paddingTop: insets.top }]}>
        <Text style={styles.errorEmoji}>🔍</Text>
        <Text style={styles.errorTitle}>
          {isTamil ? 'பாடம் கிடைக்கவில்லை' : 'Lesson Not Found'}
        </Text>
        <Text style={styles.errorDesc}>
          {isTamil
            ? 'கோரப்பட்ட நுண்ணிய பாடம் கிடைக்கவில்லை அல்லது அகற்றப்பட்டிருக்கலாம்.'
            : 'The requested micro lesson could not be loaded.'}
        </Text>
        <TouchableOpacity
          style={styles.backCtaButton}
          onPress={onBack}
          activeOpacity={0.8}
          accessible={true}
          accessibilityRole="button"
        >
          <Text style={styles.backCtaText}>
            ← {isTamil ? 'நுண்ணிய பாடங்களுக்குத் திரும்பு' : 'Back to Micro Lessons'}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  const progressPercent = hasCompletedLesson
    ? 100
    : progress?.progressPercent || 15;

  return (
    <View style={styles.container}>
      <StatusBar style="dark" translucent backgroundColor="transparent" />

      {/* Top Hero with Sticky Header */}
      <View style={{ paddingTop: Math.max(insets.top, Platform.OS === 'android' ? 24 : 12) }}>
        <MicroLessonHero
          lesson={lesson}
          progressPercent={progressPercent}
          isBookmarked={isBookmarked}
          language={language}
          onBack={onBack}
          onBookmarkPress={onBookmarkToggle}
        />
      </View>

      {/* Scrollable Lesson Content */}
      <ScrollView
        style={styles.scrollBody}
        contentContainerStyle={[
          styles.scrollContent,
          {
            paddingBottom: Math.max(insets.bottom + 60, 80),
          },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Render Modular Sections */}
        {lesson.sections.map((section, idx) => (
          <MicroLessonSection
            key={`sec-${idx}`}
            section={section}
            index={idx}
            language={language}
          />
        ))}

        {/* Quick Check Knowledge Reinforcement — with shared Hint + Coach layer.
            Completion contract unchanged: onComplete fires exactly once on the
            first answer; hints and coaching never re-trigger it. */}
        <LessonQuickCheckCoach
          lessonId={lesson.id}
          question={lesson.quickCheck}
          onComplete={handleQuickCheckFinished}
          language={language}
        />

        {/* Celebratory Completion Card */}
        {hasCompletedLesson && (
          <MicroLessonCompletion
            lesson={lesson}
            xpAwarded={xpAwarded}
            language={language}
            onPracticePress={() => onNavigateToQuiz(lesson.quizRoute)}
            onLearnPress={lesson.learnRoute ? () => onNavigateToLearn(lesson.learnRoute) : undefined}
            onExploreMorePress={onBack}
          />
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.backgroundPrimary,
  },
  scrollBody: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: theme.spacing.md,
    paddingTop: theme.spacing.sm,
  },
  centerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    backgroundColor: theme.colors.backgroundPrimary,
  },
  errorEmoji: {
    fontSize: 44,
    marginBottom: 12,
  },
  errorTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: theme.colors.navy900,
    marginBottom: 6,
  },
  errorDesc: {
    fontSize: 13,
    color: theme.colors.slate600,
    textAlign: 'center',
    lineHeight: 19,
    marginBottom: 20,
  },
  backCtaButton: {
    backgroundColor: theme.colors.actionPrimary,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: theme.borderRadius.md,
    minHeight: 44,
    justifyContent: 'center',
  },
  backCtaText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
});
