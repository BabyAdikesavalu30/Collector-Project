/**
 * Achievement Detail Deep Link Route (/achievement/[id])
 * Opens the Science Badge Gallery with the target badge pre-selected in the detail modal.
 */

import React, { useCallback } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { AchievementsScreen } from '../../src/components/achievements';
import { useLanguage } from '../../src/context';

export default function AchievementDetailPage() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { language } = useLanguage();

  const handleBack = useCallback(() => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/achievements');
    }
  }, [router]);

  const handleStartLearning = useCallback(() => {
    router.replace('/learn');
  }, [router]);

  return (
    <AchievementsScreen
      initialBadgeId={id}
      language={language}
      onBack={handleBack}
      onStartLearning={handleStartLearning}
    />
  );
}
