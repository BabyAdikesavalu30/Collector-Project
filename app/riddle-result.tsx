/**
 * Riddle Results Route (/riddle-result)
 * Screen 23: Riddle Results Experience.
 * Displays final score, solved ratio, streak, hints used, performance message,
 * and navigation actions (Play Again, Back to Riddles, Back to Home).
 */

import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useLanguage } from '../src/context';
import {
  RiddleResult,
  riddleResultStore,
  createRiddleFallbackResult,
} from '../src/features/riddles';
import { RiddleResultScreen } from '../src/components/riddles';

export default function RiddleResultRoute() {
  const router = useRouter();
  const rawParams = useLocalSearchParams<{
    difficulty?: string;
    totalRiddles?: string;
    solvedRiddles?: string;
    skippedRiddles?: string;
    score?: string;
    hintsUsed?: string;
    bestStreak?: string;
    completedAt?: string;
  }>();

  const { language } = useLanguage();

  // Resolve result from in-memory store or fallback search params
  const result: RiddleResult | null = useMemo(() => {
    const stored = riddleResultStore.getResult();
    if (stored) return stored;
    return createRiddleFallbackResult(rawParams);
  }, [rawParams]);

  const handlePlayAgain = useCallback(() => {
    if (!result) return;
    router.replace({
      pathname: '/riddle-quiz',
      params: {
        difficulty: result.difficulty,
      },
    });
  }, [router, result]);

  const handleBackToRiddles = useCallback(() => {
    router.replace('/riddles');
  }, [router]);

  const handleBackToHome = useCallback(() => {
    router.replace('/home');
  }, [router]);

  return (
    <RiddleResultScreen
      result={result}
      language={language}
      onPlayAgain={handlePlayAgain}
      onBackToRiddles={handleBackToRiddles}
      onBackToHome={handleBackToHome}
    />
  );
}
