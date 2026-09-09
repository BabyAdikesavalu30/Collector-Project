/**
 * LanguageContext — Canonical runtime language state & provider
 * Manages reactive bilingual state ('en' | 'ta') across the entire Vigyaan application.
 * Persists changes immediately to STORAGE_KEYS.USER_LANGUAGE without blocking UI rendering.
 */

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
  ReactNode,
} from 'react';
import { storage, STORAGE_KEYS } from '../storage/asyncStorage';
import {
  SupportedLanguage,
  getTranslation,
  TranslationShape,
} from '../config/i18n';
import { settingsRepository } from '../features/settings/settings.repository';

export interface LanguageContextValue {
  language: SupportedLanguage;
  setLanguage: (language: SupportedLanguage) => Promise<void>;
  toggleLanguage: () => Promise<void>;
  isTamil: boolean;
  t: TranslationShape;
}

const DEFAULT_CONTEXT_VALUE: LanguageContextValue = {
  language: 'en',
  setLanguage: async () => {},
  toggleLanguage: async () => {},
  isTamil: false,
  t: getTranslation('en'),
};

export const LanguageContext = createContext<LanguageContextValue>(DEFAULT_CONTEXT_VALUE);

interface LanguageProviderProps {
  children: ReactNode;
  initialLanguage?: SupportedLanguage;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({
  children,
  initialLanguage,
}) => {
  const [language, setLanguageState] = useState<SupportedLanguage>(initialLanguage || 'en');

  // 1. Initialize language from canonical storage on mount
  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        const stored = await storage.getItem<SupportedLanguage>(STORAGE_KEYS.USER_LANGUAGE);
        if (isMounted && stored && (stored === 'en' || stored === 'ta')) {
          setLanguageState(stored);
        }
      } catch {
        // Fallback safely to 'en' without crashing
      }
    })();

    return () => {
      isMounted = false;
    };
  }, []);

  // 2. Set language handler with optimistic update and resilient persistence
  const setLanguage = useCallback(async (newLang: SupportedLanguage): Promise<void> => {
    if (newLang !== 'en' && newLang !== 'ta') {
      return;
    }

    // Immediate in-memory state update for zero-latency UI re-render
    setLanguageState(newLang);

    // Asynchronously persist to canonical storage
    try {
      await storage.setItem(STORAGE_KEYS.USER_LANGUAGE, newLang);
      // Keep settings repository cache aligned
      settingsRepository.updateSetting('language', newLang).catch(() => {});
    } catch (err) {
      console.warn('[LanguageProvider] Failed to persist user language preference:', err);
    }
  }, []);

  // 3. Toggle language between 'en' and 'ta'
  const toggleLanguage = useCallback(async (): Promise<void> => {
    const nextLang: SupportedLanguage = language === 'en' ? 'ta' : 'en';
    await setLanguage(nextLang);
  }, [language, setLanguage]);

  const value = useMemo<LanguageContextValue>(() => {
    return {
      language,
      setLanguage,
      toggleLanguage,
      isTamil: language === 'ta',
      t: getTranslation(language),
    };
  }, [language, setLanguage, toggleLanguage]);

  return React.createElement(
    LanguageContext.Provider,
    { value },
    children
  );
};

/**
 * useLanguage hook
 * Accesses the global canonical language state and controls.
 */
export function useLanguage(): LanguageContextValue {
  const context = useContext(LanguageContext);
  return context || DEFAULT_CONTEXT_VALUE;
}

