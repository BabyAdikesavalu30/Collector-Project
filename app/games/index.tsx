/**
 * Games Hub Route (/games)
 * Screen 25: Dedicated Games Hub.
 */

import React, { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'expo-router';
import { storage, STORAGE_KEYS } from '../../src/storage/asyncStorage';
import { SupportedLanguage } from '../../src/config/i18n';
import { GamesHubScreen } from '../../src/components/games';

export default function GamesHubRoute() {
  const router = useRouter();
  const [language, setLanguage] = useState<SupportedLanguage>('en');

  useEffect(() => {
    (async () => {
      const stored = await storage.getItem<SupportedLanguage>(STORAGE_KEYS.USER_LANGUAGE);
      if (stored === 'en' || stored === 'ta') setLanguage(stored);
    })();
  }, []);

  const handleBackToHome = useCallback(() => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/home');
    }
  }, [router]);

  const handleNavigateToGame = useCallback(
    (route: string) => {
      router.push(route);
    },
    [router]
  );

  return (
    <GamesHubScreen
      language={language}
      points={1250}
      onBackToHome={handleBackToHome}
      onNavigateToGame={handleNavigateToGame}
    />
  );
}
