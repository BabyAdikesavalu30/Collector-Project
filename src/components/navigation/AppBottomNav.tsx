import React from 'react';
import { usePathname, useRouter } from 'expo-router';
import { AppTabBar } from './AppTabBar';
import { getActiveTab, APP_TAB_ROUTES } from './navigation.config';
import { SupportedLanguage } from '../../config/i18n';
import { AppTab } from './navigation.types';

export interface AppBottomNavProps {
  language?: SupportedLanguage;
  isVisible?: boolean;
}

export const AppBottomNav: React.FC<AppBottomNavProps> = ({ language = 'en', isVisible = true }) => {
  const pathname = usePathname();
  const router = useRouter();
  
  const activeTab = getActiveTab(pathname);

  const handleTabPress = (tabId: AppTab) => {
    // Explicitly casting tabId as any to avoid type mismatch with APP_TAB_ROUTES
    const route = (APP_TAB_ROUTES as any)[tabId];
    if (route) {
      router.push(route as any);
    }
  };

  if (!isVisible) return null;

  return (
    <AppTabBar
      activeTab={activeTab}
      language={language}
      onTabPress={handleTabPress}
      isVisible={isVisible}
    />
  );
};
