/**
 * Weak Areas & Improvement Center Route (/weak-areas)
 * Answers: "What should I improve next?" — actionable, positive, data-driven.
 */

import React, { useCallback } from 'react';
import { useRouter } from 'expo-router';
import { FocusAreasScreen } from '../src/components/weak-areas';
import { useLanguage } from '../src/context';
import { navigate, navigateDynamic } from '../src/components/navigation/navigation.config';

export default function WeakAreasRoute() {
  const router = useRouter();
  const { language } = useLanguage();

  const handleBack = useCallback(() => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/learn');
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
    <FocusAreasScreen
      language={language}
      onBack={handleBack}
      onNavigate={handleNavigate}
    />
  );
}
