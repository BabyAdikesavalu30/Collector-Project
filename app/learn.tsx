/**
 * Production Learn Screen Route (Screen 17 — /learn)
 * Level, Subject, and Learning Pathway Selection.
 * Coordinates bilingual context, profile defaults, and navigation to Quiz Setup.
 */

import React, { useCallback } from 'react';
import { useRouter } from 'expo-router';
import { LearnScreen } from '../src/components/learn';
import { useLanguage } from '../src/context';

export default function LearnPage() {
  const router = useRouter();
  const { language } = useLanguage();

  const handleBack = useCallback(() => {
    router.replace('/home');
  }, [router]);

  const handleContinue = useCallback(
    (selection: { levelId: string; subjectId: string; pathwayId: string }) => {
      router.push({
        pathname: '/quiz-setup',
        params: {
          levelId: selection.levelId,
          subjectId: selection.subjectId,
          pathwayId: selection.pathwayId,
        },
      });
    },
    [router]
  );

  return (
    <LearnScreen
      language={language}
      onBack={handleBack}
      onContinue={handleContinue}
    />
  );
}
