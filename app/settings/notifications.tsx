/**
 * Settings → Notification Preferences Route (/settings/notifications)
 * Local in-app notification toggles. Persisted per device.
 */

import React, { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'expo-router';
import { NotificationPreferencesScreen } from '../../src/components/settings-notifications';
import { useLanguage } from '../../src/context';
import {
  getNotificationPreferences,
  updateNotificationPreference,
  NotificationPreferences,
  NotificationPreferenceKey,
} from '../../src/features/notifications/notifications.preferences';

export default function NotificationPreferencesPage() {
  const router = useRouter();
  const { language } = useLanguage();
  const [preferences, setPreferences] = useState<NotificationPreferences | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    (async () => {
      const prefs = await getNotificationPreferences();
      if (isMounted) {
        setPreferences(prefs);
        setIsLoading(false);
      }
    })();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleToggle = useCallback(async (key: NotificationPreferenceKey, value: boolean) => {
    const next = await updateNotificationPreference(key, value);
    setPreferences(next);
  }, []);

  const handleBack = useCallback(() => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/settings');
    }
  }, [router]);

  return (
    <NotificationPreferencesScreen
      language={language}
      preferences={
        preferences || {
          dailyMissions: true,
          achievementAlerts: true,
          gameUpdates: true,
          mysteryUpdates: true,
          rewardAlerts: true,
          reminderNotifications: true,
        }
      }
      isLoading={isLoading}
      onBack={handleBack}
      onToggle={handleToggle}
    />
  );
}