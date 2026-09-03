/**
 * SettingsHeader Component
 * Safe-area aware header for Settings Screen.
 * Includes canonical AppBackButton, title, and supporting subtitle.
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../../theme';
import { SupportedLanguage, getTranslation } from '../../config/i18n';
import { AppBackButton } from '../navigation';

interface SettingsHeaderProps {
  language?: SupportedLanguage;
  onBack: () => void;
}

export const SettingsHeader: React.FC<SettingsHeaderProps> = ({
  language = 'en',
  onBack,
}) => {
  const t = getTranslation(language).settingsScreen;

  return (
    <View style={styles.container}>
      <AppBackButton
        onPress={onBack}
        language={language}
        accessibilityLabel={t.close}
        style={styles.backButton}
      />

      <View style={styles.titleContainer}>
        <Text style={styles.headerTitle} numberOfLines={1}>
          {t.title}
        </Text>
        <Text style={styles.headerSubtitle} numberOfLines={1}>
          {t.subtitle}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingVertical: theme.spacing.sm,
    marginBottom: theme.spacing.xs,
  },
  backButton: {
    marginRight: 12,
  },
  titleContainer: {
    flex: 1,
  },
  headerTitle: {
    ...theme.typography.h1,
    fontSize: 20,
    fontWeight: '800',
    color: theme.colors.navy900,
    letterSpacing: -0.3,
  },
  headerSubtitle: {
    ...theme.typography.caption,
    fontSize: 12.5,
    color: theme.colors.slate600,
    marginTop: 1,
  },
});
