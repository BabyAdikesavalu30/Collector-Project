/**
 * Localization dictionary & tokens
 * Supports English and Tamil with fallback logic.
 */

export type SupportedLanguage = 'en' | 'ta';

import { en } from './split/en_index';
import { ta } from './split/ta_index';

export const translations = {
  en,
  ta,
} as const;

export type TranslationShape = typeof en;

export function getTranslation(lang: SupportedLanguage = 'en') {
  return translations[lang] || translations.en;
}

export {
  LanguageProvider,
  useLanguage,
  LanguageContext,
  type LanguageContextValue,
} from '../../context/LanguageContext';

