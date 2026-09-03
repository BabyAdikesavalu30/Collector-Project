/**
 * AppShell Component
 * Global Authenticated App Shell managing persistent 4-tab bottom navigation,
 * route visibility evaluation, safe-area layout, and language context.
 */

import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { usePathname } from 'expo-router';
import { theme } from '../../theme';
import { storage, STORAGE_KEYS } from '../../storage/asyncStorage';
import { SupportedLanguage } from '../../config/i18n';
import { isNavVisible } from './navigation.config';
import { AppBottomNav } from './AppBottomNav';
import { FeatureErrorBoundary } from './FeatureErrorBoundary';

interface AppShellProps {
  children: React.ReactNode;
}

export const AppShell: React.FC<AppShellProps> = ({ children }) => {
  const pathname = usePathname();
  const [language, setLanguage] = useState<SupportedLanguage>('en');

  // 1. Sync User Language preference from AsyncStorage
  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        const storedLang = await storage.getItem<SupportedLanguage>(STORAGE_KEYS.USER_LANGUAGE);
        if (isMounted && (storedLang === 'en' || storedLang === 'ta')) {
          setLanguage(storedLang);
        }
      } catch {
        // Fallback to default 'en'
      }
    })();

    return () => {
      isMounted = false;
    };
  }, [pathname]);

  // 2. Evaluate visibility based on current route
  const shouldShowNav = isNavVisible(pathname);

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <FeatureErrorBoundary language={language}>{children}</FeatureErrorBoundary>
      </View>
      {shouldShowNav && (
        <AppBottomNav language={language} isVisible={shouldShowNav} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.backgroundPrimary,
  },
  contentContainer: {
    flex: 1,
  },
});
