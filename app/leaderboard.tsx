/**
 * Leaderboard Route (/leaderboard)
 * Frontend presentation layer backed by the LeaderboardRepository boundary.
 * Demo rankings are deterministic and clearly labeled; a backend repository
 * can replace the demo implementation later without UI changes.
 */

import React, { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'expo-router';
import { LeaderboardScreen } from '../src/components/leaderboard';
import { useLanguage } from '../src/context';
import {
  LeaderboardData,
  LeaderboardPeriod,
  LeaderboardScope,
  leaderboardRepository,
} from '../src/features/leaderboard';
import { getTotalXpBalance } from '../src/features/activity';
import { SessionRepository } from '../src/features/auth';
import { storage, STORAGE_KEYS } from '../src/storage/asyncStorage';

export default function LeaderboardPage() {
  const router = useRouter();
  const { language } = useLanguage();
  const [data, setData] = useState<LeaderboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [scope, setScope] = useState<LeaderboardScope>('class');
  const [period, setPeriod] = useState<LeaderboardPeriod>('weekly');

  const load = useCallback(
    async (nextScope: LeaderboardScope, nextPeriod: LeaderboardPeriod) => {
      setIsLoading(true);
      try {
        const [balance, session, profile] = await Promise.all([
          getTotalXpBalance(),
          SessionRepository.getSession(),
          storage.getItem<{ fullName?: string }>(STORAGE_KEYS.STUDENT_PROFILE),
        ]);

        const studentId = session?.userId || 'usr_demo_001';
        const displayName = profile?.fullName || session?.fullName || 'You';

        // Use a local demo repository configured with the current student so
        // the board is personalized and deterministic per (scope, period).
        const { DemoLeaderboardRepository } = await import('../src/features/leaderboard');
        const repo = new DemoLeaderboardRepository({
          studentId,
          displayName,
          totalXp: typeof balance === 'number' ? balance : 0,
        });
        const result = await repo.getLeaderboard(nextScope, nextPeriod);
        setData(result);
      } catch {
        const result = await leaderboardRepository.getLeaderboard(nextScope, nextPeriod);
        setData(result);
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    let isMounted = true;
    (async () => {
      const session = await SessionRepository.getSession();
      if (!session || !session.isAuthenticated) {
        router.replace('/auth-welcome');
        return;
      }
      if (isMounted) await load(scope, period);
    })();
    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  const handleScopeChange = useCallback(
    (nextScope: LeaderboardScope) => {
      setScope(nextScope);
      load(nextScope, period);
    },
    [load, period]
  );

  const handlePeriodChange = useCallback(
    (nextPeriod: LeaderboardPeriod) => {
      setPeriod(nextPeriod);
      load(scope, nextPeriod);
    },
    [load, scope]
  );

  const handleBack = useCallback(() => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/home');
    }
  }, [router]);

  return (
    <LeaderboardScreen
      language={language}
      data={data}
      isLoading={isLoading}
      onBack={handleBack}
      onScopeChange={handleScopeChange}
      onPeriodChange={handlePeriodChange}
    />
  );
}