/**
 * Science Passport Route (/science-passport)
 * The unified "My Science Journey" experience.
 * Aggregates all existing canonical feature data into one identity card.
 */

import React, { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'expo-router';
import { SciencePassportScreen } from '../src/components/science-passport';
import {
  SciencePassportSummary,
  PassportErrorState,
  getPassportSummary,
} from '../src/features/science-passport';
import { SessionRepository } from '../src/features/auth';
import { useLanguage } from '../src/context';

export default function SciencePassportPage() {
  const router = useRouter();
  const { language } = useLanguage();
  const [data, setData] = useState<SciencePassportSummary | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<PassportErrorState | null>(null);

  const loadData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const summary = await getPassportSummary();
      setData(summary);
    } catch {
      setError({
        hasError: true,
        message: 'Failed to load passport data',
        canRetry: true,
      });
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
      if (isMounted) await loadData();
    })();
    return () => {
      isMounted = false;
    };
  }, [router, loadData]);

  const handleBack = useCallback(() => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/profile');
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

  const handleRetry = useCallback(() => {
    loadData();
  }, [loadData]);

  return (
    <SciencePassportScreen
      language={language}
      data={data}
      isLoading={isLoading}
      error={error}
      onBack={handleBack}
      onNavigate={handleNavigate}
      onRetry={handleRetry}
    />
  );
}
