/**
 * SettingsLogoutButton Component
 * High-visibility Logout button triggering confirmation dialog.
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { theme } from '../../theme';
import { SupportedLanguage, getTranslation } from '../../config/i18n';

interface SettingsLogoutButtonProps {
  language?: SupportedLanguage;
  onPress: () => void;
}

export const SettingsLogoutButton: React.FC<SettingsLogoutButtonProps> = ({
  language = 'en',
  onPress,
}) => {
  const t = getTranslation(language).settingsScreen;

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={onPress}
        activeOpacity={0.8}
        accessible={true}
        accessibilityRole="button"
        accessibilityLabel={t.logoutTitle}
      >
        <Text style={styles.icon}>🚪</Text>
        <Text style={styles.text}>{t.logoutTitle}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingVertical: theme.spacing.md,
    alignItems: 'center',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 50,
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1.5,
    borderColor: '#FECACA',
    shadowColor: theme.colors.navy900,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 1,
  },
  icon: {
    fontSize: 18,
    marginRight: 8,
  },
  text: {
    ...theme.typography.button,
    fontSize: 15,
    fontWeight: '800',
    color: theme.colors.error,
  },
});
