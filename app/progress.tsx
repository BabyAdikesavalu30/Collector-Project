/**
 * Progress Hub Route (/progress)
 * Student Progress Center: "My Science Journey".
 * Aggregates educational activity from local storage.
 */

import React, { useCallback } from 'react';
import { useRouter } from 'expo-router';
import { ProgressScreen } from '../src/components/progress';
import { useLanguage } from '../src/context';
import { navigate, navigateDynamic } from '../src/components/navigation/navigation.config';

export default function ProgressPage() {
  const router = useRouter();
  const { language } = useLanguage();

  const handleBack = useCallback(() => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/learn');
    }
  }, [router]);

  const handleStartLearning = useCallback(() => {
    navigate(router, '/explore');
  }, [router]);

  const handleViewSubject = useCallback(
    (subjectId: string) => {
      navigateDynamic(router, `/progress/${subjectId}`);
    },
    [router]
  );

  const handleViewFocusAreas = useCallback(() => {
    navigate(router, '/weak-areas');
  }, [router]);

  const handleViewStreak = useCallback(() => {
    navigate(router, '/streak');
  }, [router]);

  return (
    <ProgressScreen
      language={language}
      onBack={handleBack}
      onStartLearning={handleStartLearning}
      onViewSubject={handleViewSubject}
      onViewFocusAreas={handleViewFocusAreas}
      onViewStreak={handleViewStreak}
    />
  );
}