/**
 * Root Layout (Expo Router)
 * Sets up SafeAreaProvider, AppShell global navigation wrapper,
 * dark theme background content styles, and manages Native Splash transition.
 */

import React, { useEffect } from 'react';
import { Stack } from 'expo-router';
import * as NativeSplashScreen from 'expo-splash-screen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { theme } from '../src/theme';
import { AppShell } from '../src/components/navigation';

// Prevent native splash screen from auto-hiding before React layout is ready
try {
  NativeSplashScreen.preventAutoHideAsync().catch(() => {
    /* ignore on web/hot reload */
  });
} catch {
  /* ignore */
}

export default function RootLayout() {
  useEffect(() => {
    // Hide native splash once the initial React layout has mounted
    NativeSplashScreen.hideAsync()
      .then(() => {
      })
      .catch(() => {
      });
  }, []);

  return (
    <SafeAreaProvider>
      <AppShell>
        <Stack
          screenOptions={{
            headerShown: false,
            animation: 'fade',
            contentStyle: {
              backgroundColor: theme.colors.backgroundPrimary,
            },
          }}
        >
          <Stack.Screen name="index" />
        </Stack>
      </AppShell>
    </SafeAreaProvider>
  );
}
