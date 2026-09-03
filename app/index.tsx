/**
 * Index Route (Screen 01 Entry Screen)
 * Renders Screen 01 (Vigyaan Splash Screen).
 * Transitions seamlessly to Screen 02 (/welcome) or resolved destination upon bootstrap.
 */

import React, { useCallback } from 'react';
import { useRouter } from 'expo-router';
import { SplashScreen } from '../src/components/splash';

export default function IndexPage() {
  const router = useRouter();

  const handleBootstrapComplete = useCallback(
    (initialRoute: string) => {
      try {
        const target = initialRoute && initialRoute !== '/' ? initialRoute : '/welcome';
        router.replace(target);
      } catch (err) {
        console.warn('[NAVIGATION] Transition failed:', err);
      }
    },
    [router]
  );

  return <SplashScreen onBootstrapComplete={handleBootstrapComplete} />;
}
