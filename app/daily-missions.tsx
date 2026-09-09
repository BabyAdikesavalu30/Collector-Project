/**
 * Daily / Weekly Missions Route (/daily-missions)
 * Segmented daily & weekly mission interface with claim actions.
 */

import React, { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'expo-router';
import { MissionsScreen } from '../src/components/missions';
import { useLanguage } from '../src/context';
import {
  getActivityHistory,
  getUnifiedStreak,
} from '../src/features/activity';
import {
  claimMissionReward,
  getMissionsSnapshot,
  MissionWithProgress,
  MissionsSnapshot,
} from '../src/features/missions';
import { SessionRepository } from '../src/features/auth';

export default function MissionsPage() {
  const router = useRouter();
  const { language } = useLanguage();
  const [snapshot, setSnapshot] = useState<MissionsSnapshot | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isClaiming, setIsClaiming] = useState(false);

  const loadSnapshot = useCallback(async () => {
    const history = await getActivityHistory();
    await getUnifiedStreak();
    const next = await getMissionsSnapshot(history);
    setSnapshot(next);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    let isMounted = true;
    (async () => {
      const session = await SessionRepository.getSession();
      if (!session || !session.isAuthenticated) {
        router.replace('/auth-welcome');
        return;
      }
      if (isMounted) await loadSnapshot();
    })();
    return () => {
      isMounted = false;
    };
  }, [router, loadSnapshot]);

  const handleClaim = useCallback(
    async (entry: MissionWithProgress): Promise<boolean> => {
      setIsClaiming(true);
      try {
        const history = await getActivityHistory();
        const result = await claimMissionReward(entry.mission, history);
        if (result.ok) {
          await loadSnapshot();
          return true;
        }
        return false;
      } finally {
        setIsClaiming(false);
      }
    },
    [loadSnapshot]
  );

  const handleBack = useCallback(() => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/home');
    }
  }, [router]);

  return (
    <MissionsScreen
      language={language}
      daily={snapshot?.daily || []}
      weekly={snapshot?.weekly || []}
      isLoading={isLoading}
      isClaiming={isClaiming}
      onBack={handleBack}
      onClaim={handleClaim}
    />
  );
}