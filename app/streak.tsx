/**
 * Streak & Activity Calendar Route (/streak)
 * Kid-friendly, positive habit-building center.
 */

import React, { useCallback } from 'react';
import { useRouter } from 'expo-router';
import { StreakScreen } from '../src/components/streak';
import { useLanguage } from '../src/context';
import { navigate, navigateDynamic } from '../src/components/navigation/navigation.config';

export default function StreakRoute() {
  const router = useRouter();
  const { language } = useLanguage();

  const handleBack = useCallback(() => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/home');
    }
  }, [router]);

  const handleNavigate = useCallback(
    (route: string, params?: Record<string, string>) => {
      if (params && Object.keys(params).length > 0) {
        navigateDynamic(router, route);
      } else {
        navigateDynamic(router, route);
      }
    },
    [router]
  );

  return (
    <StreakScreen
      language={language}
      onBack={handleBack}
      onNavigate={handleNavigate}
    />
  );
}
