/**
 * Science Riddles Category Selection Route (/riddles)
 * Screen 21: Riddle Category Selection.
 * Allows students to choose a riddle difficulty (Easy, Medium, Hard, Genius) and start the riddle quiz.
 */

import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { useRouter } from 'expo-router';
import { useLanguage } from '../src/context';
import { RiddleDifficulty, getRiddleCategories } from '../src/features/riddles';
import { getXpSummary } from '../src/features/xp';
import { RiddleCategoryScreen } from '../src/components/riddles';

export default function RiddlesCategoryRoute() {
  const router = useRouter();
  const { language } = useLanguage();

  const categories = useMemo(() => {
    return getRiddleCategories();
  }, []);

  const [points, setPoints] = useState(0);

  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        const summary = await getXpSummary();
        if (isMounted) setPoints(summary.totalXp);
      } catch {
        // Keep default 0 on storage failure
      }
    })();
    return () => {
      isMounted = false;
    };
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
      points={points}
      onBack={handleBack}
      onStartRiddle={handleStartRiddle}
    />
  );
}
