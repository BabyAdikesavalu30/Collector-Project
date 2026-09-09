/**
 * Points History Route (/points-history)
 * XP ledger with balance summary, filters, and grouped transaction list.
 */

import React, { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'expo-router';
import { PointsHistoryScreen } from '../src/components/points';
import { getXpSummary, RewardSummary } from '../src/features/xp';
import { SessionRepository } from '../src/features/auth';
import { useLanguage } from '../src/context';

export default function PointsHistoryPage() {
  const router = useRouter();
  const { language } = useLanguage();
  const [summary, setSummary] = useState<RewardSummary | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    (async () => {
      const session = await SessionRepository.getSession();
      if (!session || !session.isAuthenticated) {
        router.replace('/auth-welcome');
        return;
      }

      const xpSummary = await getXpSummary();
      if (isMounted) {
        setSummary(xpSummary);
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

  return (
    <PointsHistoryScreen
      language={language}
      summary={
        summary || {
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
      isLoading={isLoading}
      onBack={handleBack}
    />
  );
}