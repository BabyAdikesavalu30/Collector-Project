/**
 * Progress Route (/progress)
 * Real analytics screen: quiz stats, subject breakdown, recent attempts,
 * and games progress computed from local storage.
 */

import React, { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'expo-router';
import { ProgressScreen } from '../src/components/progress';
import { storage, STORAGE_KEYS } from '../src/storage/asyncStorage';
import { SupportedLanguage } from '../src/config/i18n';

export default function ProgressPage() {
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
    <ProgressScreen
      language={language}
      onBack={handleBack}
      onStartLearning={handleStartLearning}
    />
  );
}