/**
 * AppShell Component
 * Global Authenticated App Shell managing persistent 4-tab bottom navigation,
 * route visibility evaluation, safe-area layout, and language context.
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { usePathname, useRouter } from 'expo-router';
import { theme } from '../../theme';
import { useLanguage } from '../../context/LanguageContext';
import { isNavVisible, navigateDynamic } from './navigation.config';
import { AppBottomNav } from './AppBottomNav';
import { FeatureErrorBoundary } from './FeatureErrorBoundary';
import { CelebrationOverlay } from '../celebration';

interface AppShellProps {
  children: React.ReactNode;
}

export const AppShell: React.FC<AppShellProps> = ({ children }) => {
  const pathname = usePathname();
  const router = useRouter();
  const { language } = useLanguage();


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
      <CelebrationOverlay
        language={language}
        onNavigate={(route) => {
          try {
            navigateDynamic(router, route);
          } catch {
            // Safe fallback
          }
        }}
      />
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
