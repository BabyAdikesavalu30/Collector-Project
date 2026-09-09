/**
 * Experiment Detail Route (/experiment/[id])
 * Focused interactive virtual science simulation runner screen.
 */

import React, { useCallback } from 'react';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { ExperimentDetailScreen } from '../../src/components/experiment-lab';
import { useLanguage } from '../../src/context';
import { navigate, navigateDynamic } from '../../src/components/navigation/navigation.config';

export default function ExperimentDetailPage() {
  const router = useRouter();
  const params = useLocalSearchParams<{ id?: string }>();
  const experimentId = params.id || '';

  const { language } = useLanguage();

  const handleBack = useCallback(() => {
    if (router.canGoBack()) {
      router.back();
    } else {
      navigate(router, '/experiment-lab');
    }
  }, [router]);

  const handleNavigate = useCallback(
    (route: string) => {
      navigateDynamic(router, route);
    },
    [router]
  );

  return (
    <ExperimentDetailScreen
      experimentId={experimentId}
      language={language}
      onBack={handleBack}
      onNavigate={handleNavigate}
    />
  );
}
