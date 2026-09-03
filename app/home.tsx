/**
 * Production Home Dashboard Route (Screen 14 - /home)
 * Coordinates dashboard telemetry, local caching, pull-to-refresh,
 * language context, session protection guard, and navigation routing.
 */

import React, { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { HomeScreen } from '../src/components/home';
import { dashboardService, DashboardData } from '../src/features/home';
import { SessionRepository } from '../src/features/auth';
import { storage, STORAGE_KEYS } from '../src/storage/asyncStorage';
import { SupportedLanguage } from '../src/config/i18n';

export default function HomePage() {
  const router = useRouter();
  const [language, setLanguage] = useState<SupportedLanguage>('en');
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isOffline, setIsOffline] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 1. Session Protection Guard & Language Restoration
  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        const [session, storedLang] = await Promise.all([
          SessionRepository.getSession(),
          storage.getItem<SupportedLanguage>(STORAGE_KEYS.USER_LANGUAGE),
        ]);

        if (isMounted) {
          if (!session || !session.isAuthenticated) {
            router.replace('/auth-welcome');
            return;
          }

          if (storedLang && (storedLang === 'en' || storedLang === 'ta')) {
            setLanguage(storedLang);
          }
        }
      } catch {
        router.replace('/auth-welcome');
      }
    })();

    return () => {
      isMounted = false;
    };
  }, [router]);

  // 2. Fetch dashboard data with offline cache fallback
  const loadDashboard = useCallback(async (forceRefresh = false) => {
    try {
      setIsLoading(true);
      setError(null);

      // Check cached dashboard for instant display
      if (!forceRefresh) {
        const cached = await dashboardService.getCachedDashboard();
        if (cached) {
          setDashboardData(cached);
          setIsLoading(false);
        }
      }

      const fresh = await dashboardService.getDashboard({ forceRefresh });
      setDashboardData(fresh);
      setIsOffline(false);
    } catch {
      // Offline or network failure
      const cached = await dashboardService.getCachedDashboard();
      if (cached) {
        setDashboardData(cached);
        setIsOffline(true);
      } else {
        setError('Unable to load dashboard. Please check your connection.');
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadDashboard();
  }, [loadDashboard]);

  // Navigation Handler
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

  return (
    <HomeScreen
      language={language}
      data={dashboardData}
      isLoading={isLoading}
      isOffline={isOffline}
      error={error}
      onRefresh={() => loadDashboard(true)}
      onNavigate={handleNavigate}
    />
  );
}
