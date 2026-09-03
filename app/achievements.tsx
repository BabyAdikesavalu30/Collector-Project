/**
 * Achievements Route (/achievements)
 * Real badge system computed from local quiz and games progress.
 */

import React, { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'expo-router';
import { AchievementsScreen } from '../src/components/achievements';
import { storage, STORAGE_KEYS } from '../src/storage/asyncStorage';
import { SupportedLanguage } from '../src/config/i18n';

export default function AchievementsPage() {
  const router = useRouter();
  const [language, setLanguage] = useState<SupportedLanguage>('en');

  useEffect(() => {
    (async () => {
      const stored = await storage.getItem<SupportedLanguage>(STORAGE_KEYS.USER_LANGUAGE);
      if (stored === 'en' || stored === 'ta') setLanguage(stored);
    })();
  }, []);

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