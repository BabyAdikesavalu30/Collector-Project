/**
 * Subject Progress Detail Route (/progress/[subject])
 * Dedicated drilldown into subject progress, topic status, practice actions,
 * focus areas, and recent activity.
 */

import React, { useCallback } from 'react';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { SubjectDetailScreen } from '../../src/components/progress';
import { useSubjectProgress } from '../../src/features/progress';
import { useLanguage } from '../../src/context';
import { navigate, navigateDynamic } from '../../src/components/navigation/navigation.config';

export default function SubjectDetailPage() {
  const router = useRouter();
  const params = useLocalSearchParams<{ subject?: string }>();
  const subjectId = params.subject || 'physics';

  const { language } = useLanguage();

  const {
    subjectProgress,
    topics,
    recentActivities,
    focusAreas,
    isLoading,
  } = useSubjectProgress(subjectId);

  const handleBack = useCallback(() => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/progress');
    }
  }, [router]);

  const handleNavigateAction = useCallback(
    (route: string, routeParams?: Record<string, string>) => {
      try {
        if (routeParams && Object.keys(routeParams).length > 0) {
          navigateDynamic(router, route);
        } else {
          navigateDynamic(router, route);
        }
      } catch (err) {
        console.warn(`[SubjectDetailPage] Navigation error to ${route}:`, err);
      }
    },
    [router]
  );

  const handleViewFocusAreas = useCallback(() => {
    navigate(router, '/weak-areas');
  }, [router]);

  return (
    <SubjectDetailScreen
      subjectId={subjectId}
      subjectProgress={subjectProgress}
      topics={topics}
      focusAreas={focusAreas}
      recentActivities={recentActivities}
      isLoading={isLoading}
      language={language}
      onBack={handleBack}
      onNavigateAction={handleNavigateAction}
      onViewFocusAreas={handleViewFocusAreas}
    />
  );
}
