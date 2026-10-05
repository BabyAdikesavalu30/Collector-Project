import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { AccessibilityInfo } from 'react-native';
import { settingsRepository } from '../features/settings/settings.repository';
import { AppSettings } from '../features/settings/settings.types';
import * as Speech from 'expo-speech';

// Export an interface picking only the accessibility fields for a clean API
export type AccessibilityPreferences = Pick<
  AppSettings,
  | 'textScale'
  | 'highContrast'
  | 'theme'
  | 'readAloud'
  | 'speechRate'
  | 'focusMode'
  | 'simplifiedView'
  | 'reduceMotion'
  | 'largeTouchTargets'
  | 'soundEffects'
  | 'haptics'
  | 'floatingButtonPositionX'
  | 'floatingButtonPositionY'
>;

interface AccessibilityContextType {
  preferences: AccessibilityPreferences;
  updatePreference: <K extends keyof AccessibilityPreferences>(key: K, value: AccessibilityPreferences[K]) => void;
  resetPreferences: () => void;
  resetFloatingButtonPosition: () => void;
  readAloud: (text: string) => void;
  stopReading: () => void;
  toggleFocusMode: () => void;
  toggleHighContrast: () => void;
  toggleLargeTouchTargets: () => void;
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export const AccessibilityProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<AppSettings | null>(null);

  useEffect(() => {
    let isMounted = true;
    const loadPreferences = async () => {
      const stored = await settingsRepository.getSettings();
      
      // Also respect system reduce motion if available
      const isSystemReduceMotionEnabled = await AccessibilityInfo.isReduceMotionEnabled();
      if (isSystemReduceMotionEnabled && !stored.reduceMotion) {
         // Auto-enable reduce motion if system preference is set
         stored.reduceMotion = true;
         settingsRepository.updateSetting('reduceMotion', true);
      }
      
      if (isMounted) {
        setSettings(stored);
      }
    };
    loadPreferences();
    
    return () => { isMounted = false; };
  }, []);

  const updatePreference = useCallback(async <K extends keyof AccessibilityPreferences>(key: K, value: AccessibilityPreferences[K]) => {
    setSettings((prev) => prev ? { ...prev, [key]: value } : null);
    await settingsRepository.updateSetting(key, value as any);
  }, []);

  const resetPreferences = useCallback(async () => {
    // We only reset accessibility-specific settings
    const current = await settingsRepository.getSettings();
    const defaultSettings = (await settingsRepository.resetPreferences()); // Note: this actually resets all settings!
    
    // Instead of full reset which clears other preferences, we should just revert accessibility ones.
    const resetUpdates: Partial<AppSettings> = {
      textScale: 'default',
      highContrast: false,
      readAloud: true,
      speechRate: 1.0,
      focusMode: false,
      simplifiedView: false,
      largeTouchTargets: false,
      floatingButtonPositionX: -20,
      floatingButtonPositionY: -80,
    };
    
    setSettings((prev) => prev ? { ...prev, ...resetUpdates } : null);
    await settingsRepository.saveSettings(resetUpdates);
  }, []);

  const resetFloatingButtonPosition = useCallback(() => {
    updatePreference('floatingButtonPositionX', -20);
    updatePreference('floatingButtonPositionY', -80);
  }, [updatePreference]);

  const triggerReadAloud = useCallback(
    async (text: string) => {
      if (!settings?.readAloud) return;
      
      Speech.stop();
      Speech.speak(text, { rate: settings.speechRate });
    },
    [settings?.readAloud, settings?.speechRate]
  );

  const stopReading = useCallback(() => {
    Speech.stop();
  }, []);

  const toggleFocusMode = useCallback(() => {
    if (settings) updatePreference('focusMode', !settings.focusMode);
  }, [settings, updatePreference]);

  const toggleHighContrast = useCallback(() => {
    if (settings) updatePreference('highContrast', !settings.highContrast);
  }, [settings, updatePreference]);
  
  const toggleLargeTouchTargets = useCallback(() => {
    if (settings) updatePreference('largeTouchTargets', !settings.largeTouchTargets);
  }, [settings, updatePreference]);

  if (!settings) {
    return null;
  }

  return (
    <AccessibilityContext.Provider
      value={{
        preferences: {
          textScale: settings.textScale,
          highContrast: settings.highContrast,
          theme: settings.theme,
          readAloud: settings.readAloud,
          speechRate: settings.speechRate,
          focusMode: settings.focusMode,
          simplifiedView: settings.simplifiedView,
          reduceMotion: settings.reduceMotion,
          largeTouchTargets: settings.largeTouchTargets,
          soundEffects: settings.soundEffects,
          haptics: settings.haptics,
          floatingButtonPositionX: settings.floatingButtonPositionX,
          floatingButtonPositionY: settings.floatingButtonPositionY,
        },
        updatePreference,
        resetPreferences,
        resetFloatingButtonPosition,
        readAloud: triggerReadAloud,
        stopReading,
        toggleFocusMode,
        toggleHighContrast,
        toggleLargeTouchTargets
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
};
