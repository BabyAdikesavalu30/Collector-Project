/**
 * Daily Goal Route (/daily-goal)
 * Premium, kid-friendly daily goal experience.
 */

import React, { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'expo-router';
import { DailyGoalScreen } from '../src/components/daily-goal';
import { useLanguage } from '../src/context';
import {
  DailyGoalWithProgress,
  loadOrInitializeDailyGoal,
} from '../src/features/daily-goal';
import { getActivityHistory } from '../src/features/activity';
import { SessionRepository } from '../src/features/auth';

export default function DailyGoalPage() {
  const router = useRouter();
  const { language } = useLanguage();
  const [goal, setGoal] = useState<DailyGoalWithProgress | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const loadGoal = useCallback(async () => {
    try {
      const history = await getActivityHistory();
      const todayGoal = await loadOrInitializeDailyGoal(history);
      setGoal(todayGoal);
    } catch (error) {
      console.warn('[DailyGoalPage] Failed to load goal:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    let isMounted = true;
    (async () => {
      const session = await SessionRepository.getSession();
      if (!session || !session.isAuthenticated) {
        router.replace('/auth-welcome');
        return;
      }
      if (isMounted) await loadGoal();
    })();
    return () => {
      isMounted = false;
    };
  }, [router, loadGoal]);

  const handleNavigate = useCallback(
    (route: string) => {
      try {
        router.push(route);
      } catch {
        console.warn(`[NAVIGATION] Could not navigate to ${route}`);
      }
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
    <DailyGoalScreen
      language={language}
      goal={goal}
      isLoading={isLoading}
      onNavigate={handleNavigate}
    />
  );
}