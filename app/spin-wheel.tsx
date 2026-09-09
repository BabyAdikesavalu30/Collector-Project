/**
 * Daily Spin Wheel Route (/spin-wheel)
 * Screen 24: Interactive Daily Spin Wheel Experience.
 * Features rotating wheel, 6 outcomes (Scientists, Inventions, Science Facts, Think Fast, Bonus, Challenge),
 * answer evaluation, points reward, and daily completion state.
 */

import React, { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'expo-router';
import { useLanguage } from '../src/context';
import { getXpSummary } from '../src/features/xp';
import { SpinWheelScreen } from '../src/components/spin-wheel';

export default function SpinWheelRoute() {
  const router = useRouter();
  const { language } = useLanguage();
  const [userPoints, setUserPoints] = useState(0);

  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        const summary = await getXpSummary();
        if (isMounted) setUserPoints(summary.totalXp);
      } catch {
        // Keep default 0 on storage failure
      }
    })();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleBackToGames = useCallback(() => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/home');
    }
  }, [router]);

  const handleBackToHome = useCallback(() => {
    router.replace('/home');
  }, [router]);

  return (
    <SpinWheelScreen
      language={language}
      userPoints={userPoints}
      onBackToGames={handleBackToGames}
      onBackToHome={handleBackToHome}
    />
  );
}
