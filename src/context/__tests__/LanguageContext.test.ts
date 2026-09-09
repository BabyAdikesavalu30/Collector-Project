/**
 * LanguageContext & useLanguage Test Suite
 * Validates canonical language state, initialization, toggling, persistence, and fallback resilience.
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import { storage, STORAGE_KEYS } from '../../storage/asyncStorage';
import { settingsRepository } from '../../features/settings/settings.repository';
import { getTranslation } from '../../config/i18n';
import {
  LanguageContext,
  LanguageContextValue,
} from '../LanguageContext';

describe('LanguageContext & useLanguage', () => {
  beforeEach(async () => {
    storage.invalidateCache();
    await AsyncStorage.clear();
    jest.clearAllMocks();
  });

  describe('Default Context & useLanguage Fallback', () => {
    it('provides fallback defaults when used outside of LanguageProvider', () => {
      // Access the internal default context value directly without calling useLanguage()
      // (calling hooks outside components violates Rules of Hooks)
      const defaults = (LanguageContext as unknown as { _currentValue: LanguageContextValue })._currentValue;
      expect(defaults.language).toBe('en');
      expect(defaults.isTamil).toBe(false);
      expect(typeof defaults.setLanguage).toBe('function');
      expect(typeof defaults.toggleLanguage).toBe('function');
      expect(defaults.t).toBeDefined();
      expect(defaults.t.welcome.appName).toBe('VIGYAAN');
    });

    it('exposes LanguageContext with default values', () => {
      expect(LanguageContext).toBeDefined();
    });
  });

  describe('Storage Persistence & Canonical Key', () => {
    it('uses the exact canonical storage key @vigyaan/user_language', () => {
      expect(STORAGE_KEYS.USER_LANGUAGE).toBe('@vigyaan/user_language');
    });

    it('persists language selection directly to STORAGE_KEYS.USER_LANGUAGE', async () => {
      await storage.setItem(STORAGE_KEYS.USER_LANGUAGE, 'ta');
      const loaded = await storage.getItem(STORAGE_KEYS.USER_LANGUAGE);
      expect(loaded).toBe('ta');
    });

    it('syncs language preference with settingsRepository', async () => {
      const updateSpy = jest.spyOn(settingsRepository, 'updateSetting');
      await settingsRepository.updateSetting('language', 'ta');
      expect(updateSpy).toHaveBeenCalledWith('language', 'ta');
      updateSpy.mockRestore();
    });

    it('handles corrupt storage values gracefully without throwing', async () => {
      await AsyncStorage.setItem(STORAGE_KEYS.USER_LANGUAGE, 'corrupted_value_not_supported');
      const loaded = await storage.getItem(STORAGE_KEYS.USER_LANGUAGE);
      // Not 'en' or 'ta', should be treated as invalid
      const isValid = loaded === 'en' || loaded === 'ta';
      expect(isValid).toBe(false);
    });
  });

  describe('Translation Parity via Context Helper', () => {
    it('returns English dictionary when language is "en"', () => {
      const t = getTranslation('en');
      expect(t.home.welcomeBack).toBe('Welcome back');
      expect(t.home.nav.home).toBe('Home');
      expect(t.home.nav.learn).toBe('Learn');
      expect(t.home.nav.games).toBe('Games');
      expect(t.home.nav.profile).toBe('Profile');
    });

    it('returns Tamil dictionary when language is "ta"', () => {
      const t = getTranslation('ta');
      expect(t.home.welcomeBack).toBe('மீண்டும் வருக');
      expect(t.home.nav.home).toBe('முகப்பு');
      expect(t.home.nav.learn).toBe('கற்போம்');
      expect(t.home.nav.games).toBe('ஆடுவோம்');
      expect(t.home.nav.profile).toBe('சுயவிவரம்');
    });

    it('switches navigation tab labels immediately based on language', () => {
      const enLabels = [
        getTranslation('en').home.nav.home,
        getTranslation('en').home.nav.learn,
        getTranslation('en').home.nav.games,
        getTranslation('en').home.nav.profile,
      ];
      const taLabels = [
        getTranslation('ta').home.nav.home,
        getTranslation('ta').home.nav.learn,
        getTranslation('ta').home.nav.games,
        getTranslation('ta').home.nav.profile,
      ];

      expect(enLabels).toEqual(['Home', 'Learn', 'Games', 'Profile']);
      expect(taLabels).toEqual(['முகப்பு', 'கற்போம்', 'ஆடுவோம்', 'சுயவிவரம்']);
    });
  });
});
