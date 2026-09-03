/**
 * Daily Spin Wheel Route (/spin-wheel)
 * Screen 24: Interactive Daily Spin Wheel Experience.
 * Features rotating wheel, 6 outcomes (Scientists, Inventions, Science Facts, Think Fast, Bonus, Challenge),
 * answer evaluation, points reward, and daily completion state.
 */

import React, { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'expo-router';
import { storage, STORAGE_KEYS } from '../src/storage/asyncStorage';
import { SupportedLanguage } from '../src/config/i18n';
import { SpinWheelScreen } from '../src/components/spin-wheel';

export default function SpinWheelRoute() {
  const router = useRouter();
  const [language, setLanguage] = useState<SupportedLanguage>('en');

  useEffect(() => {
    (async () => {
      const stored = await storage.getItem<SupportedLanguage>(STORAGE_KEYS.USER_LANGUAGE);
      if (stored === 'en' || stored === 'ta') setLanguage(stored);
    })();
  }, []);

  const handleBackToGames = useCallback(() => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/home');
    }
  }, [router]);

  const handleBackToHome = useCallback(() => {
    router.replace('/home');
  }, [router]);

  return (
    <SpinWheelScreen
      language={language}
      userPoints={1250}
      onBackToGames={handleBackToGames}
      onBackToHome={handleBackToHome}
    />
  );
}
