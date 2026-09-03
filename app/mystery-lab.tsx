/**
 * Mystery Lab Route (/mystery-lab)
 * Main entry screen for the Mystery Lab feature.
 */

import React, { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { storage, STORAGE_KEYS } from '../src/storage/asyncStorage';
import { SupportedLanguage } from '../src/config/i18n';
import { MysteryLabScreen } from '../src/components/mystery-lab';

export default function MysteryLabRoute() {
  const router = useRouter();
  const [language, setLanguage] = useState<SupportedLanguage>('en');

  useEffect(() => {
    (async () => {
      const stored = await storage.getItem<SupportedLanguage>(STORAGE_KEYS.USER_LANGUAGE);
      if (stored === 'en' || stored === 'ta') setLanguage(stored);
    })();
  }, []);

  return <MysteryLabScreen language={language} />;
}
