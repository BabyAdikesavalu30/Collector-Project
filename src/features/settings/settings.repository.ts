/**
 * Settings Repository
 * Local persistence and lifecycle management for all application preferences.
 */

import { storage, STORAGE_KEYS } from '../../storage/asyncStorage';
import { AppSettings } from './settings.types';
import { DEFAULT_APP_SETTINGS } from './settings.defaults';
import { SupportedLanguage } from '../../config/i18n';

class SettingsRepository {
  private cachedSettings: AppSettings | null = null;

  /**
   * Retrieve active settings with fallback to defaults.
   */
  public async getSettings(): Promise<AppSettings> {
    try {
      if (this.cachedSettings) {
        return { ...this.cachedSettings };
      }

      const stored = await storage.getItem<Partial<AppSettings>>(STORAGE_KEYS.APP_SETTINGS);
      const storedLanguage = await storage.getItem<SupportedLanguage>(STORAGE_KEYS.USER_LANGUAGE);

      const merged: AppSettings = {
        ...DEFAULT_APP_SETTINGS,
        ...(stored || {}),
        language: (storedLanguage === 'ta' || storedLanguage === 'en') ? storedLanguage : (stored?.language || 'en'),
      };

      this.cachedSettings = merged;
      return { ...merged };
    } catch {
      return { ...DEFAULT_APP_SETTINGS };
    }
  }

  /**
   * Save all or partial settings to local storage.
   */
  public async saveSettings(updated: Partial<AppSettings>): Promise<AppSettings> {
    try {
      const current = await this.getSettings();
      const nextSettings: AppSettings = {
        ...current,
        ...updated,
      };

      this.cachedSettings = nextSettings;
      await storage.setItem(STORAGE_KEYS.APP_SETTINGS, nextSettings);

      // Keep language key synchronized if language changed
      if (updated.language && (updated.language === 'en' || updated.language === 'ta')) {
        await storage.setItem(STORAGE_KEYS.USER_LANGUAGE, updated.language);
      }

      return { ...nextSettings };
    } catch {
      return this.cachedSettings || { ...DEFAULT_APP_SETTINGS };
    }
  }

  /**
   * Update an individual setting property.
   */
  public async updateSetting<K extends keyof AppSettings>(
    key: K,
    value: AppSettings[K]
  ): Promise<AppSettings> {
    return this.saveSettings({ [key]: value } as Partial<AppSettings>);
  }

  /**
   * Reset user preferences to defaults (retaining authentication, profile & onboarding).
   */
  public async resetPreferences(): Promise<AppSettings> {
    try {
      const current = await this.getSettings();
      const resetState: AppSettings = {
        ...DEFAULT_APP_SETTINGS,
        language: current.language, // Keep language selection
      };

      this.cachedSettings = resetState;
      await storage.setItem(STORAGE_KEYS.APP_SETTINGS, resetState);
      return { ...resetState };
    } catch {
      return { ...DEFAULT_APP_SETTINGS };
    }
  }

  /**
   * Clear locally cached dashboard and learning progress data.
   */
  public async clearCachedData(): Promise<boolean> {
    try {
      await storage.removeItem(STORAGE_KEYS.DASHBOARD_CACHE);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Invalidate the in-memory settings cache.
   * Call after external storage resets (e.g., clearAllDevelopmentState).
   */
  public clearCache(): void {
    this.cachedSettings = null;
  }
}

export const settingsRepository = new SettingsRepository();
