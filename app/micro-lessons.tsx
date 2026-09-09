/**
 * Micro Lessons Hub Route (/micro-lessons)
 * Fast, bite-sized science learning hub.
 */

import React, { useCallback } from 'react';
import { useRouter } from 'expo-router';
import { MicroLessonsHubScreen } from '../src/components/micro-lessons';
import { useMicroLessonsHub } from '../src/features/micro-lessons';
import { useLanguage } from '../src/context';
import { navigateDynamic } from '../src/components/navigation/navigation.config';

export default function MicroLessonsHubRoute() {
  const router = useRouter();
  const { language } = useLanguage();

  const {
    filteredLessons,
    todayLesson,
    recentLesson,
    collections,
    progressMap,
    bookmarks,
    filterState,
    summary,
    isLoading,
    setFilterState,
    toggleBookmark,
  } = useMicroLessonsHub();

  const handleLessonPress = useCallback(
    (lessonId: string) => {
      navigateDynamic(router, `/micro-lesson/${lessonId}`);
    },
    [router]
  );

  const handleBack = useCallback(() => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/home');
    }
  }, [router]);

  return (
    <MicroLessonsHubScreen
      lessons={filteredLessons}
      todayLesson={todayLesson}
      recentLesson={recentLesson}
      collections={collections}
      progressMap={progressMap}
      bookmarks={bookmarks}
      filterState={filterState}
      summary={summary}
      isLoading={isLoading}
      language={language}
      onFilterChange={(newFilters) => setFilterState((prev) => ({ ...prev, ...newFilters }))}
      onLessonPress={handleLessonPress}
      onBookmarkToggle={toggleBookmark}
      onBack={handleBack}
    />
  );
}
