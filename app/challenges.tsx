/**
 * Challenges Route (/challenges)
 * Real daily science challenge — deterministic question, offline-safe
 * completion tracking, points awarded through the quiz history path.
 */

import React, { useCallback } from 'react';
import { useRouter } from 'expo-router';
import { ChallengesScreen } from '../src/components/challenges';
import { useLanguage } from '../src/context';

export default function ChallengesPage() {
  const router = useRouter();
  const { language } = useLanguage();

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