/**
 * NotificationPreferencesScreen — Settings → Notifications (/settings/notifications).
 * Local in-app notification toggles persisted via the notifications domain.
 */

import React from 'react';
import { View, Text, StyleSheet, ScrollView, Switch, Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { theme } from '../../theme';
import { SupportedLanguage, getTranslation } from '../../config/i18n';
import { NotificationPreferences, NotificationPreferenceKey } from '../../features/notifications/notifications.preferences';
import { ScreenHeader } from '../shared';

interface NotificationPreferencesScreenProps {
  language: SupportedLanguage;
  preferences: NotificationPreferences;
  isLoading: boolean;
  onBack: () => void;
  onToggle: (key: NotificationPreferenceKey, value: boolean) => void;
}

const PREF_KEYS: NotificationPreferenceKey[] = [
  'dailyMissions',
  'achievementAlerts',
  'gameUpdates',
  'mysteryUpdates',
  'rewardAlerts',
  'reminderNotifications',
];

export const NotificationPreferencesScreen: React.FC<NotificationPreferencesScreenProps> = ({
  language,
  preferences,
  isLoading,
  onBack,
  onToggle,
}) => {
  const insets = useSafeAreaInsets();
  const t = getTranslation(language).progress.notifPrefs;
  const isTamil = language === 'ta';

  const titleKeys: Record<NotificationPreferenceKey, keyof typeof t> = {
    dailyMissions: 'dailyMissions',
    achievementAlerts: 'achievementAlerts',
    gameUpdates: 'gameUpdates',
    mysteryUpdates: 'mysteryUpdates',
    rewardAlerts: 'rewardAlerts',
    reminderNotifications: 'reminderNotifications',
  };
  const subKeys: Record<NotificationPreferenceKey, keyof typeof t> = {
    dailyMissions: 'dailyMissionsSub',
    achievementAlerts: 'achievementAlertsSub',
    gameUpdates: 'gameUpdatesSub',
    mysteryUpdates: 'mysteryUpdatesSub',
    rewardAlerts: 'rewardAlertsSub',
    reminderNotifications: 'reminderNotificationsSub',
  };

  const rows = PREF_KEYS.map((key) => ({
    key,
    title: t[titleKeys[key]],
    subtitle: t[subKeys[key]],
    value: preferences[key],
  }));

  return (
    <View style={styles.container}>
      <StatusBar style="dark" translucent backgroundColor="transparent" />
      <ScreenHeader title={t.title} language={language} onBack={onBack} subtitle={t.subtitle} />

      {isLoading ? (
        <Text style={styles.loadingText}>{getTranslation(language).progress.loading}</Text>
      ) : (
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={[styles.content, { paddingBottom: Math.max(insets.bottom + 24, 32) }]}
          showsVerticalScrollIndicator={false}
        >
          {rows.map((row) => (
            <View key={row.key} style={styles.row} accessible accessibilityLabel={`${row.title}. ${row.subtitle}`}>
              <View style={styles.rowContent}>
                <Text style={styles.rowTitle}>{row.title}</Text>
                <Text style={styles.rowSubtitle}>{row.subtitle}</Text>
              </View>
              <Switch
                value={row.value}
                onValueChange={(value) => {
                  onToggle(row.key, value);
                  if (value) {
                    Alert.alert(t.saved, `${row.title} ✓`);
                  }
                }}
                trackColor={{ false: theme.colors.gray300, true: theme.colors.actionPrimary }}
                thumbColor={theme.colors.white}
                accessibilityLabel={row.title}
                accessibilityRole="switch"
                accessibilityState={{ checked: row.value }}
              />
            </View>
          ))}

          <View style={styles.note} accessible accessibilityRole="summary">
            <Text style={styles.noteText}>ℹ️ {t.note}</Text>
          </View>
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.pearlWhite,
  },
  loadingText: {
    ...theme.typography.body,
    color: theme.colors.slate500,
    textAlign: 'center',
    marginTop: theme.spacing.xxl,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: theme.spacing.base,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: theme.spacing.base,
    marginBottom: theme.spacing.sm,
  },
  rowContent: {
    flex: 1,
    marginRight: theme.spacing.md,
  },
  rowTitle: {
    ...theme.typography.body,
    fontSize: 14,
    fontWeight: '700',
    color: theme.colors.navy900,
  },
  rowSubtitle: {
    ...theme.typography.caption,
    fontSize: 11.5,
    color: theme.colors.slate500,
    marginTop: 2,
    lineHeight: 16,
  },
  note: {
    backgroundColor: theme.colors.blue50,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderColor: theme.colors.blue100,
    padding: theme.spacing.md,
    marginTop: theme.spacing.sm,
  },
  noteText: {
    ...theme.typography.caption,
    fontSize: 11.5,
    color: theme.colors.navy700,
    lineHeight: 17,
  },
});