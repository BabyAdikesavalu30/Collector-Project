/**
 * Mystery Lab Cases Route (/mystery-lab/cases)
 * Browse all mystery cases with search and filters.
 */

import React, { useEffect, useState } from 'react';
import { storage, STORAGE_KEYS } from '../../src/storage/asyncStorage';
import { SupportedLanguage } from '../../src/config/i18n';
import { MysteryCasesScreen } from '../../src/components/mystery-lab';

export default function MysteryCasesRoute() {
  const [language, setLanguage] = useState<SupportedLanguage>('en');

  useEffect(() => {
    (async () => {
      const stored = await storage.getItem<SupportedLanguage>(STORAGE_KEYS.USER_LANGUAGE);
      if (stored === 'en' || stored === 'ta') setLanguage(stored);
    })();
  }, []);

  return <MysteryCasesScreen language={language} />;
}
