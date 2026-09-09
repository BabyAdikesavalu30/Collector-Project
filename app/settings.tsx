/**
 * Production Settings Route (/settings)
 * Canonical student preferences and control center.
 * Handles navigation, language synchronization, and secure logout.
 */

import React, { useCallback } from 'react';
import { useRouter } from 'expo-router';
import { SettingsScreen } from '../src/components/settings';
import { authService } from '../src/features/auth';
import { useLanguage } from '../src/context';

export default function SettingsPage() {
  const router = useRouter();
  const { language } = useLanguage();

  const handleBack = useCallback(() => {
    router.back();
  }, [router]);

  const handleNavigate = useCallback(
    (route: string) => {
      router.push(route);
    },
    [router]
  );

  const handleLogout = useCallback(async () => {
    await authService.logout();
    router.replace('/auth-welcome');
  }, [router]);

  return (
    <SettingsScreen
      language={language}
      onBack={handleBack}
      onNavigate={handleNavigate}
      onLogout={handleLogout}
    />
  );
}
