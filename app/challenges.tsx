/**
 * Challenges Route (/challenges)
 * Real daily science challenge — deterministic question, offline-safe
 * completion tracking, points awarded through the quiz history path.
 */

import React, { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'expo-router';
import { ChallengesScreen } from '../src/components/challenges';
import { storage, STORAGE_KEYS } from '../src/storage/asyncStorage';
import { SupportedLanguage } from '../src/config/i18n';

export default function ChallengesPage() {
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
    <ChallengesScreen
      language={language}
      onBack={handleBack}
      onStartLearning={handleStartLearning}
    />
  );
}