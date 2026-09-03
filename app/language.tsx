/**
 * Language Selection Route (Screen 06 - /language)
 * Renders Language Selection UI allowing students to pick English or Tamil.
 * Persists selected language into AsyncStorage via storage service.
 * Navigates to /auth-welcome (Screen 07 Authentication Welcome).
 */

import React, { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { LanguageScreen } from '../src/components/language';
import { storage, STORAGE_KEYS } from '../src/storage/asyncStorage';
import { SupportedLanguage } from '../src/config/i18n';

export default function LanguagePage() {
  const router = useRouter();
  const [initialLanguage, setInitialLanguage] = useState<SupportedLanguage>('en');

  // Load existing language preference if available
  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        const stored = await storage.getItem<SupportedLanguage>(STORAGE_KEYS.USER_LANGUAGE);
        if (isMounted && stored && (stored === 'en' || stored === 'ta')) {
          setInitialLanguage(stored);
        }
      } catch {
        // Fallback to 'en'
      }
    })();

    return () => {
      isMounted = false;
    };
  }, []);

  // Continue: Persists selected language and navigates to Screen 07 Auth Welcome
  const handleContinue = useCallback(
    async (selectedLanguage: SupportedLanguage): Promise<boolean> => {
      try {
        const saved = await storage.setItem(STORAGE_KEYS.USER_LANGUAGE, selectedLanguage);
        if (!saved) {
          console.warn('[PERSISTENCE] Failed to store user language preference');
          return false;
        }


        // Navigate to Screen 07 Authentication Welcome
        router.push('/auth-welcome');
        return true;
      } catch (err) {
        console.error('[NAVIGATION] Language continuation error:', err);
        return false;
      }
    },
    [router]
  );

  return (
    <LanguageScreen
      initialLanguage={initialLanguage}
      onLanguageSelected={async (lang) => {
        await handleContinue(lang);
      }}
    />
  );
}
