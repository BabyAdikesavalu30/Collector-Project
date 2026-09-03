/**
 * Riddle Quiz Route (/riddle-quiz)
 * Screen 22: Riddle Question / Solving Experience.
 * Coordinates interactive riddle solving, attempts, hints, scoring, streaks, and result transition.
 */

import React, { useEffect, useState, useCallback } from 'react';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { storage, STORAGE_KEYS } from '../src/storage/asyncStorage';
import { SupportedLanguage } from '../src/config/i18n';
import { RiddleResult, riddleResultStore } from '../src/features/riddles';
import { RiddleQuizScreen } from '../src/components/riddles';

export default function RiddleQuizRoute() {
  const router = useRouter();
  const rawParams = useLocalSearchParams<{
    difficulty?: string;
  }>();

  const [language, setLanguage] = useState<SupportedLanguage>('en');

  useEffect(() => {
    (async () => {
      const stored = await storage.getItem<SupportedLanguage>(STORAGE_KEYS.USER_LANGUAGE);
      if (stored === 'en' || stored === 'ta') setLanguage(stored);
    })();
  }, []);

  const handleExit = useCallback(() => {
    router.replace('/riddles');
  }, [router]);

  const handleFinishQuiz = useCallback(
    (result: RiddleResult) => {
      riddleResultStore.setResult(result);
      router.push({
        pathname: '/riddle-result',
        params: {
          difficulty: result.difficulty,
          totalRiddles: String(result.totalRiddles),
          solvedRiddles: String(result.solvedRiddles),
          skippedRiddles: String(result.skippedRiddles),
          score: String(result.score),
          hintsUsed: String(result.hintsUsed),
          bestStreak: String(result.bestStreak),
          completedAt: String(result.completedAt),
        },
      });
    },
    [router]
  );

  return (
    <RiddleQuizScreen
      difficulty={rawParams.difficulty}
      language={language}
      onExitToCategories={handleExit}
      onFinishQuiz={handleFinishQuiz}
    />
  );
}
