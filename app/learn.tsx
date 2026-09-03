/**
 * Production Learn Screen Route (Screen 17 — /learn)
 * Level, Subject, and Learning Pathway Selection.
 * Coordinates bilingual context, profile defaults, and navigation to Quiz Setup.
 */

import React, { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'expo-router';
import { LearnScreen } from '../src/components/learn';
import { storage, STORAGE_KEYS } from '../src/storage/asyncStorage';
import { SupportedLanguage } from '../src/config/i18n';

export default function LearnPage() {
  const router = useRouter();
  const [language, setLanguage] = useState<SupportedLanguage>('en');

  useEffect(() => {
    (async () => {
      const stored = await storage.getItem<SupportedLanguage>(STORAGE_KEYS.USER_LANGUAGE);
      if (stored === 'en' || stored === 'ta') setLanguage(stored);
    })();
  }, []);

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
