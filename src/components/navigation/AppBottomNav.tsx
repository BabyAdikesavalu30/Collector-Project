/**
 * AppBottomNav Component
 * Connects AppTabBar to Expo Router, handling route transitions,
 * tab re-selections, and analytics telemetry.
 */

import React, { useCallback } from 'react';
import { useRouter, usePathname } from 'expo-router';
import { SupportedLanguage } from '../../config/i18n';
import { AppTab } from './navigation.types';
import { APP_TAB_ROUTES, getActiveTab } from './navigation.config';
import { AppTabBar } from './AppTabBar';

interface AppBottomNavProps {
  language?: SupportedLanguage;
  isVisible?: boolean;
}

export const AppBottomNav: React.FC<AppBottomNavProps> = ({
  language = 'en',
  isVisible = true,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const activeTab = getActiveTab(pathname);

  const handleTabPress = useCallback(
    (tab: AppTab) => {
      const targetRoute = APP_TAB_ROUTES[tab];

      if (pathname === targetRoute) {
        // Tab Reselection: Already at the exact root of this tab
        if (tab === 'home') {
        }
        return;
      }

      // If switching tabs or returning to parent tab from a child route
      try {
        router.replace(targetRoute);
      } catch {
        router.push(targetRoute);
      }
    },
    [pathname, router]
  );

  return (
    <AppTabBar
      activeTab={activeTab}
      language={language}
      onTabPress={handleTabPress}
      isVisible={isVisible}
    />
  );
};
