/**
 * Achievements Route (/achievements)
 * Real badge system computed from local quiz and games progress.
 */

import React, { useCallback } from 'react';
import { useRouter } from 'expo-router';
import { AchievementsScreen } from '../src/components/achievements';
import { useLanguage } from '../src/context';

export default function AchievementsPage() {
  const router = useRouter();
  const { language } = useLanguage();

  const handleBack = useCallback(() => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/home');
    }
  }, [router]);

  const handleStartLearning = useCallback(() => {
    router.replace('/learn');
  }, [router]);

  return (
    <AchievementsScreen
      language={language}
      onBack={handleBack}
      onStartLearning={handleStartLearning}
    />
  );
}