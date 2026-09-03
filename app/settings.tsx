/**
 * Production Settings Route (/settings)
 * Canonical student preferences and control center.
 * Handles navigation, language synchronization, and secure logout.
 */

import React, { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'expo-router';
import { SettingsScreen } from '../src/components/settings';
import { storage, STORAGE_KEYS } from '../src/storage/asyncStorage';
import { authService } from '../src/features/auth';
import { SupportedLanguage } from '../src/config/i18n';

export default function SettingsPage() {
  const router = useRouter();
  const [language, setLanguage] = useState<SupportedLanguage>('en');

  // Sync active language
  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        const storedLang = await storage.getItem<SupportedLanguage>(STORAGE_KEYS.USER_LANGUAGE);
        if (isMounted && (storedLang === 'en' || storedLang === 'ta')) {
          setLanguage(storedLang);
        }
      } catch {
        // Fallback to default
      }
    })();
    return () => {
      isMounted = false;
    };
  }, []);

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
