/**
 * SettingsSearch Component
 * Fast local search input with clear button and accessible role.
 */

import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { theme } from '../../theme';
import { SupportedLanguage, getTranslation } from '../../config/i18n';

interface SettingsSearchProps {
  value: string;
  language?: SupportedLanguage;
  onChangeText: (text: string) => void;
  onClear: () => void;
}

export const SettingsSearch: React.FC<SettingsSearchProps> = ({
  value,
  language = 'en',
  onChangeText,
  onClear,
}) => {
  const t = getTranslation(language).settingsScreen;

  return (
    <View style={styles.container}>
      <Text style={styles.searchIcon}>🔍</Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={t.searchPlaceholder}
        placeholderTextColor={theme.colors.slate400}
        autoCapitalize="none"
        autoCorrect={false}
        accessible={true}
        accessibilityLabel={t.searchPlaceholder}
        accessibilityRole="search"
      />
      {value.length > 0 && (
        <TouchableOpacity
          style={styles.clearButton}
          onPress={onClear}
          activeOpacity={0.7}
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel="Clear search text"
        >
          <Text style={styles.clearText}>✕</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    paddingHorizontal: 12,
    height: 46,
    marginBottom: theme.spacing.md,
    shadowColor: theme.colors.navy900,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 1,
  },
  searchIcon: {
    fontSize: 15,
    marginRight: 8,
  },
  input: {
    flex: 1,
    height: '100%',
    ...theme.typography.body,
    fontSize: 14,
    color: theme.colors.navy900,
  },
  clearButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: theme.colors.gray100,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 4,
  },
  clearText: {
    fontSize: 12,
    color: theme.colors.slate600,
    fontWeight: '700',
  },
});
