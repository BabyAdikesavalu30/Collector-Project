/**
 * Science Riddles Category Selection Route (/riddles)
 * Screen 21: Riddle Category Selection.
 * Allows students to choose a riddle difficulty (Easy, Medium, Hard, Genius) and start the riddle quiz.
 */

import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { useRouter } from 'expo-router';
import { storage, STORAGE_KEYS } from '../src/storage/asyncStorage';
import { SupportedLanguage } from '../src/config/i18n';
import {
  RiddleDifficulty,
  getRiddleCategories,
  DEMO_RIDDLE_POINTS,
} from '../src/features/riddles';
import { RiddleCategoryScreen } from '../src/components/riddles';

export default function RiddlesCategoryRoute() {
  const router = useRouter();
  const [language, setLanguage] = useState<SupportedLanguage>('en');

  useEffect(() => {
    (async () => {
      const storedLang = await storage.getItem<SupportedLanguage>(STORAGE_KEYS.USER_LANGUAGE);
      if (storedLang === 'en' || storedLang === 'ta') setLanguage(storedLang);
    })();
  }, []);

  const categories = useMemo(() => {
    return getRiddleCategories();
  }, []);

  const handleBack = useCallback(() => {
    router.back();
  }, [router]);

  const handleStartRiddle = useCallback(
    (difficulty: RiddleDifficulty) => {
      router.push({
        pathname: '/riddle-quiz',
        params: {
          difficulty,
        },
      });
    },
    [router]
  );

  return (
    <RiddleCategoryScreen
      categories={categories}
      language={language}
      points={DEMO_RIDDLE_POINTS}
      onBack={handleBack}
      onStartRiddle={handleStartRiddle}
    />
  );
}
