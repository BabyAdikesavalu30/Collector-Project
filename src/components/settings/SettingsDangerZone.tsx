/**
 * SettingsDangerZone Component
 * Danger Zone card for Account Deletion guidance and institutional data removal.
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { theme } from '../../theme';
import { SupportedLanguage, getTranslation } from '../../config/i18n';

interface SettingsDangerZoneProps {
  language?: SupportedLanguage;
  onDeleteAccount: () => void;
}

export const SettingsDangerZone: React.FC<SettingsDangerZoneProps> = ({
  language = 'en',
  onDeleteAccount,
}) => {
  const t = getTranslation(language).settingsScreen;

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>{t.dangerSection}</Text>

      <View style={styles.card}>
        <TouchableOpacity
          style={styles.row}
          onPress={onDeleteAccount}
          activeOpacity={0.7}
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel={`${t.deleteAccountTitle}. ${t.deleteAccountSubtitle}`}
        >
          <View style={styles.iconCircle}>
            <Text style={styles.iconText}>⚠️</Text>
          </View>

          <View style={styles.content}>
            <Text style={styles.title} numberOfLines={1}>
              {t.deleteAccountTitle}
            </Text>
            <Text style={styles.subtitle} numberOfLines={1}>
              {t.deleteAccountSubtitle}
            </Text>
          </View>

          <Text style={styles.chevron}>›</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: theme.spacing.base,
  },
  sectionTitle: {
    ...theme.typography.caption,
    fontSize: 12,
    fontWeight: '800',
    color: theme.colors.error,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 8,
    paddingHorizontal: 2,
  },
  card: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1,
    borderColor: '#FECACA', // subtle light red border
    overflow: 'hidden',
    shadowColor: theme.colors.error,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 14,
    minHeight: 56,
  },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FEF2F2',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#FCA5A5',
  },
  iconText: {
    fontSize: 16,
  },
  content: {
    flex: 1,
    marginRight: 8,
  },
  title: {
    ...theme.typography.body,
    fontSize: 14.5,
    fontWeight: '700',
    color: theme.colors.error,
  },
  subtitle: {
    ...theme.typography.caption,
    fontSize: 11.5,
    color: theme.colors.slate500,
    marginTop: 1,
  },
  chevron: {
    fontSize: 22,
    color: theme.colors.slate400,
    fontWeight: '500',
  },
});
