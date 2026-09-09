/**
 * Experiment Lab Hub Route (/experiment-lab)
 * Production virtual science simulation laboratory hub for Vigyaan.
 */

import React, { useCallback } from 'react';
import { useRouter } from 'expo-router';
import { ExperimentLabHubScreen } from '../src/components/experiment-lab';
import { useLanguage } from '../src/context';
import { navigateDynamic } from '../src/components/navigation/navigation.config';

export default function ExperimentLabHubRoute() {
  const router = useRouter();
  const { language } = useLanguage();

  const handleNavigateExperiment = useCallback(
    (experimentId: string) => {
      navigateDynamic(router, `/experiment/${experimentId}`);
    },
    [router]
  );

  const handleBack = useCallback(() => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/home');
    }
  }, [router]);

  return (
    <ExperimentLabHubScreen
      language={language}
      onNavigateExperiment={handleNavigateExperiment}
      onBack={handleBack}
    />
  );
}
