/**
 * Riddle Quiz Route (/riddle-quiz)
 * Screen 22: Riddle Question / Solving Experience.
 * Coordinates interactive riddle solving, attempts, hints, scoring, streaks, and result transition.
 */

import React, { useEffect, useState, useCallback } from 'react';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useLanguage } from '../src/context';
import { recordActivity } from '../src/features/activity';
import { RiddleResult, riddleResultStore } from '../src/features/riddles';
import { RiddleQuizScreen } from '../src/components/riddles';

export default function RiddleQuizRoute() {
  const router = useRouter();
  const rawParams = useLocalSearchParams<{
    difficulty?: string;
  }>();

  const { language } = useLanguage();

  const handleExit = useCallback(() => {
    router.replace('/riddles');
  }, [router]);

  const hasFinishedRef = React.useRef(false);

  const handleFinishQuiz = useCallback(
    (result: RiddleResult) => {
      if (hasFinishedRef.current) return;
      hasFinishedRef.current = true;

      riddleResultStore.setResult(result);
      // Safe, additive shared integration: record riddle completion once.
      recordActivity({
        type: 'riddle_completed',
        dedupeKey: `riddle-${result.difficulty}-${result.completedAt}`,
        title: 'Riddle Solved',
        titleTa: 'புதிர் தீர்க்கப்பட்டது',
        subtitle: `${result.solvedRiddles} of ${result.totalRiddles} solved`,
        subtitleTa: `${result.totalRiddles} இல் ${result.solvedRiddles} தீர்க்கப்பட்டது`,
        xpEarned: 15,
        timestamp: result.completedAt,
        metadata: {
          difficulty: result.difficulty,
          solved: result.solvedRiddles,
          icon: '💡',
        },
      });
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
