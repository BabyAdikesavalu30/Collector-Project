/**
 * Student Profile 2.0 Route (/profile)
 * Student science identity center. Aggregates the unified activity/XP data,
 * achievements, certificates, and account management into one screen.
 */

import React, { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'expo-router';
import { ProfileScreen } from '../src/components/profile';
import { ProfileViewData, loadProfileView } from '../src/features/profile';
import { authService, SessionRepository } from '../src/features/auth';
import { useLanguage } from '../src/context';
import { getGeneratedNotifications } from '../src/features/notifications/notifications.factory';
import { getAllNotifications } from '../src/features/notifications/notifications.mock';

export default function ProfilePage() {
  const router = useRouter();
  const { language } = useLanguage();
  const [data, setData] = useState<ProfileViewData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [unreadCount, setUnreadCount] = useState(0);

  const loadData = useCallback(async () => {
    try {
      const [view, generated] = await Promise.all([
        loadProfileView(),
        getGeneratedNotifications(),
      ]);

      // Unread badge = generated inbox unread + mock inbox unread.
      const all = getAllNotifications();
      const unreadGenerated = generated.filter((n) => !n.isRead).length;
      const unreadMock = all.filter((n) => !n.isRead).length;
      setUnreadCount(unreadGenerated + unreadMock);

      setData(view);
    } catch {
      // Keep defaults; the screen renders a safe empty state.
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

  const handleLogout = useCallback(async () => {
    await authService.logout();
    router.replace('/auth-welcome');
  }, [router]);

  return (
    <ProfileScreen
      language={language}
      data={data}
      isLoading={isLoading}
      unreadNotifications={unreadCount}
      onBack={handleBack}
      onNavigate={handleNavigate}
      onLogout={handleLogout}
    />
  );
}