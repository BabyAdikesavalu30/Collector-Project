/**
 * Games Hub Route (/games)
 * Screen 25: Dedicated Games Hub.
 */

import React, { useCallback } from 'react';
import { useRouter } from 'expo-router';
import { useLanguage } from '../../src/context';
import { GamesHubScreen } from '../../src/components/games';

export default function GamesHubRoute() {
  const router = useRouter();
  const { language } = useLanguage();

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
      onBackToHome={handleBackToHome}
      onNavigateToGame={handleNavigateToGame}
    />
  );
}
