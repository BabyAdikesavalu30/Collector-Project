/**
 * QuickSettingsBar Component
 * Compact horizontal grid for quick access to Language, Theme, Notifications, and Text Size.
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { theme } from '../../theme';
import { SupportedLanguage, getTranslation } from '../../config/i18n';
import { AppSettings } from '../../features/settings';

interface QuickSettingsBarProps {
  settings: AppSettings;
  language?: SupportedLanguage;
  onOpenLanguage: () => void;
  onOpenTheme: () => void;
  onOpenTextScale: () => void;
  onToggleQuickNotifications: () => void;
}

export const QuickSettingsBar: React.FC<QuickSettingsBarProps> = ({
  settings,
  language = 'en',
  onOpenLanguage,
  onOpenTheme,
  onOpenTextScale,
  onToggleQuickNotifications,
}) => {
  const t = getTranslation(language).settingsScreen;

  const getLanguageLabel = () => (language === 'ta' ? 'தமிழ்' : 'English');
  const getThemeLabel = () => {
    if (settings.theme === 'system') return 'System';
    if (settings.theme === 'light') return 'Light';
    return 'Dark';
  };
  const getTextScaleLabel = () => {
    if (settings.textScale === 'small') return 'Small';
    if (settings.textScale === 'large') return 'Large';
    if (settings.textScale === 'extraLarge') return 'XL';
    return 'Default';
  };

  const isNotifsOn = settings.generalNotifications;

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>{t.quickTitle}</Text>

      <View style={styles.grid}>
        {/* Language */}
        <TouchableOpacity
          style={styles.pill}
          onPress={onOpenLanguage}
          activeOpacity={0.75}
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel={`${t.languageTitle}: ${getLanguageLabel()}`}
        >
          <Text style={styles.pillIcon}>🌐</Text>
          <Text style={styles.pillTitle} numberOfLines={1}>{t.languageTitle}</Text>
          <Text style={styles.pillValue} numberOfLines={1}>{getLanguageLabel()}</Text>
        </TouchableOpacity>

        {/* Theme */}
        <TouchableOpacity
          style={styles.pill}
          onPress={onOpenTheme}
          activeOpacity={0.75}
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel={`${t.themeTitle}: ${getThemeLabel()}`}
        >
          <Text style={styles.pillIcon}>◐</Text>
          <Text style={styles.pillTitle} numberOfLines={1}>{t.themeTitle}</Text>
          <Text style={styles.pillValue} numberOfLines={1}>{getThemeLabel()}</Text>
        </TouchableOpacity>

        {/* Text Size */}
        <TouchableOpacity
          style={styles.pill}
          onPress={onOpenTextScale}
          activeOpacity={0.75}
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel={`${t.textScaleTitle}: ${getTextScaleLabel()}`}
        >
          <Text style={styles.pillIcon}>🔤</Text>
          <Text style={styles.pillTitle} numberOfLines={1}>{t.textScaleTitle}</Text>
          <Text style={styles.pillValue} numberOfLines={1}>{getTextScaleLabel()}</Text>
        </TouchableOpacity>

        {/* Notifications Toggle */}
        <TouchableOpacity
          style={[styles.pill, isNotifsOn && styles.pillActive]}
          onPress={onToggleQuickNotifications}
          activeOpacity={0.75}
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel={`${t.notificationsSection}: ${isNotifsOn ? 'ON' : 'OFF'}`}
        >
          <Text style={styles.pillIcon}>🔔</Text>
          <Text style={styles.pillTitle} numberOfLines={1}>{t.notificationsSection}</Text>
          <Text style={[styles.pillValue, isNotifsOn && styles.pillValueActive]} numberOfLines={1}>
            {isNotifsOn ? 'ON' : 'OFF'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: theme.spacing.md,
  },
  sectionTitle: {
    ...theme.typography.caption,
    fontSize: 11.5,
    fontWeight: '800',
    color: theme.colors.slate600,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 8,
  },
  grid: {
    flexDirection: 'row',
    gap: 8,
  },
  pill: {
    flex: 1,
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    paddingVertical: 10,
    paddingHorizontal: 8,
    alignItems: 'center',
    shadowColor: theme.colors.navy900,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 3,
    elevation: 1,
  },
  pillActive: {
    backgroundColor: theme.colors.blue50,
    borderColor: theme.colors.blue200,
  },
  pillIcon: {
    fontSize: 18,
    marginBottom: 4,
  },
  pillTitle: {
    ...theme.typography.caption,
    fontSize: 10.5,
    fontWeight: '700',
    color: theme.colors.navy900,
    textAlign: 'center',
  },
  pillValue: {
    ...theme.typography.overline,
    fontSize: 9.5,
    color: theme.colors.slate500,
    marginTop: 2,
    fontWeight: '700',
  },
  pillValueActive: {
    color: theme.colors.actionPrimary,
  },
});
