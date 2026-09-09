/**
 * Micro Lesson Detail Route (/micro-lesson/[id])
 * Focused 1-3 minute bite-sized interactive lesson reader.
 */

import React, { useCallback } from 'react';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { MicroLessonDetailScreen } from '../../src/components/micro-lessons';
import { useMicroLessonDetail } from '../../src/features/micro-lessons';
import { useLanguage } from '../../src/context';
import { navigate, navigateDynamic } from '../../src/components/navigation/navigation.config';

export default function MicroLessonDetailPage() {
  const router = useRouter();
  const params = useLocalSearchParams<{ id?: string }>();
  const lessonId = params.id || '';

  const { language } = useLanguage();

  const {
    lesson,
    progress,
    isBookmarked,
    isLoading,
    toggleBookmark,
    updateProgress,
    completeLesson,
  } = useMicroLessonDetail(lessonId);

  const handleBack = useCallback(() => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/micro-lessons');
    }
  }, [router]);

  const handleNavigateToQuiz = useCallback(
    (route?: string) => {
      const target = route || '/quiz-setup';
      if (target === '/quiz-setup') {
        navigate(router, '/quiz-setup');
      } else {
        navigateDynamic(router, target);
      }
    },
    [router]
  );

  const handleNavigateToLearn = useCallback(
    (route?: string) => {
      const target = route || '/learn';
      if (target === '/learn') {
        navigate(router, '/learn');
      } else {
        navigateDynamic(router, target);
      }
    },
    [router]
  );

  return (
    <MicroLessonDetailScreen
      lesson={lesson}
      progress={progress}
      isBookmarked={isBookmarked}
      isLoading={isLoading}
      language={language}
      onBookmarkToggle={toggleBookmark}
      onUpdateProgress={updateProgress}
      onCompleteLesson={completeLesson}
      onBack={handleBack}
      onNavigateToQuiz={handleNavigateToQuiz}
      onNavigateToLearn={handleNavigateToLearn}
    />
  );
}
