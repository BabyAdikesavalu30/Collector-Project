/**
 * Rewards Center Route (/rewards)
 * Central rewards and progression screen: science level, XP, streak,
 * milestones, mission previews, achievements, certificates, and history.
 */

import React, { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'expo-router';
import { RewardsScreen } from '../src/components/rewards';
import { useLanguage } from '../src/context';
import { calculateScienceLevel } from '../src/features/levels';
import { getXpSummary } from '../src/features/xp';
import { getUnifiedStreak, getActivityHistory, countActivityTypes } from '../src/features/activity';
import { getMissionsSnapshot } from '../src/features/missions';
import { computeActivitySummary } from '../src/features/profile';
import { getUnlockedAchievements } from '../src/features/achievements';
import { getCertificates } from '../src/features/certificates';
import { SessionRepository } from '../src/features/auth';

export default function RewardsPage() {
  const router = useRouter();
  const { language } = useLanguage();
  const [state, setState] = useState<{
    level: ReturnType<typeof calculateScienceLevel> | null;
    streak: { currentStreak: number; longestStreak: number; lastActiveDate: string | null; activeDates: string[] } | null;
    xpSummary: Awaited<ReturnType<typeof getXpSummary>> | null;
    activitySummary: ReturnType<typeof computeActivitySummary> | null;
    daily: Awaited<ReturnType<typeof getMissionsSnapshot>>['daily'] | null;
    weekly: Awaited<ReturnType<typeof getMissionsSnapshot>>['weekly'] | null;
    achievementsCount: number;
    certificatesCount: number;
  }>({
    level: null,
    streak: null,
    xpSummary: null,
    activitySummary: null,
    daily: null,
    weekly: null,
    achievementsCount: 0,
    certificatesCount: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    (async () => {
      const session = await SessionRepository.getSession();
      if (!session || !session.isAuthenticated) {
        router.replace('/auth-welcome');
        return;
      }

      const [xpSummary, streak, history, unlocked, certificates] = await Promise.all([
        getXpSummary(),
        getUnifiedStreak(),
        getActivityHistory(),
        getUnlockedAchievements(),
        getCertificates(),
      ]);

      const level = calculateScienceLevel(xpSummary.totalXp);
      const activitySummary = computeActivitySummary(countActivityTypes(history));
      const fullSnapshot = await getMissionsSnapshot(history);

      if (isMounted) {
        setState({
          level,
          streak,
          xpSummary,
          activitySummary,
          daily: fullSnapshot.daily,
          weekly: fullSnapshot.weekly,
          achievementsCount: Object.keys(unlocked).length,
          certificatesCount: certificates.length,
        });
        setIsLoading(false);
      }
    })();
    return () => {
      isMounted = false;
    };
  }, [router]);

  const handleBack = useCallback(() => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/home');
    }
  }, [router]);

  const handleNavigate = useCallback(
    (route: string) => {
      try {
        router.push(route);
      } catch {
        // Invalid destination — stay on screen
      }
    },
    [router]
  );

  return (
    <RewardsScreen
      language={language}
      level={state.level || calculateScienceLevel(0)}
      streak={state.streak || { currentStreak: 0, longestStreak: 0, lastActiveDate: null, activeDates: [] }}
      xpSummary={
        state.xpSummary || {
          totalXp: 0,
          totalEarned: 0,
          todayXp: 0,
          weekXp: 0,
          monthXp: 0,
          levelProgressPercent: 0,
          transactions: [],
          dailyGroups: [],
        }
      }
      activitySummary={
        state.activitySummary || {
          quizzesCompleted: 0,
          riddlesSolved: 0,
          gamesPlayed: 0,
          mysteriesSolved: 0,
          factsDiscovered: 0,
          challengesCompleted: 0,
          totalActivities: 0,
        }
      }
      dailyMissions={state.daily || []}
      weeklyMissions={state.weekly || []}
      achievementsCount={state.achievementsCount}
      certificatesCount={state.certificatesCount}
      isLoading={isLoading}
      onBack={handleBack}
      onNavigate={handleNavigate}
    />
  );
}