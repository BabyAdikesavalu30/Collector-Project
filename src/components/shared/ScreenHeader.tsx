/**
 * ScreenHeader — canonical app header using AppBackButton, safe-area aware,
 * with an optional right-side action slot.
 */

import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { theme } from '../../theme';
import { SupportedLanguage } from '../../config/i18n';
import { AppBackButton } from '../navigation';
import { LanguageToggle } from '../language/LanguageToggle';

interface ScreenHeaderProps {
  title: string;
  language: SupportedLanguage;
  onBack: () => void;
  rightSlot?: React.ReactNode;
  subtitle?: string;
  showLanguageToggle?: boolean;
}

export const ScreenHeader: React.FC<ScreenHeaderProps> = ({
  title,
  language,
  onBack,
  rightSlot,
  subtitle,
  showLanguageToggle = true,
}) => {
  const insets = useSafeAreaInsets();
  const defaultRightSlot = showLanguageToggle ? <LanguageToggle /> : <View style={{ width: 44 }} />;

  return (
    <View
      style={[
        styles.topBar,
        { paddingTop: Math.max(insets.top + 8, Platform.OS === 'android' ? 28 : 16) },
      ]}
    >
      <AppBackButton onPress={onBack} language={language} />
      <View style={styles.center}>
        <Text style={styles.headerTitle} numberOfLines={1}>
          {title}
        </Text>
        {subtitle ? (
          <Text style={styles.headerSubtitle} numberOfLines={1}>
            {subtitle}
          </Text>
        ) : null}
      </View>
      <View style={styles.right}>{rightSlot ?? defaultRightSlot}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.base,
    paddingBottom: theme.spacing.sm,
    backgroundColor: theme.colors.white,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: theme.spacing.xs,
  },
  headerTitle: {
    ...theme.typography.h3,
    fontSize: 17,
    fontWeight: '800',
    color: theme.colors.navy900,
  },
  headerSubtitle: {
    ...theme.typography.caption,
    fontSize: 11,
    color: theme.colors.slate500,
    marginTop: 1,
  },
  right: {
    minWidth: 44,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
});