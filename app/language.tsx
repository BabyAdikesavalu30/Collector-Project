/**
 * Language Selection Route (Screen 06 - /language)
 * Renders Language Selection UI allowing students to pick English or Tamil.
 * Persists selected language into AsyncStorage via storage service.
 * Navigates to /auth-welcome (Screen 07 Authentication Welcome).
 */

import React, { useCallback } from 'react';
import { useRouter } from 'expo-router';
import { LanguageScreen } from '../src/components/language';
import { SupportedLanguage } from '../src/config/i18n';
import { useLanguage } from '../src/context';

export default function LanguagePage() {
  const router = useRouter();
  const { language, setLanguage } = useLanguage();

  // Continue: Persists selected language and navigates to Screen 07 Auth Welcome
  const handleContinue = useCallback(
    async (selectedLanguage: SupportedLanguage): Promise<boolean> => {
      try {
        await setLanguage(selectedLanguage);

        // Navigate to Screen 07 Authentication Welcome
        router.push('/auth-welcome');
        return true;
      } catch (err) {
        console.error('[NAVIGATION] Language continuation error:', err);
        return false;
      }
    },
    [router, setLanguage]
  );

  return (
    <LanguageScreen
      initialLanguage={language}
      onLanguageSelected={async (lang) => {
        await handleContinue(lang);
      }}
    />
  );
}
