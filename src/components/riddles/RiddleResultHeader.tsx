/**
 * RiddleResultHeader Component
 * Safe-area top bar with canonical AppBackButton and Riddle Results title.
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { theme } from '../../theme';
import { AppBackButton } from '../navigation';
import { LanguageToggle } from '../language';

interface RiddleResultHeaderProps {
  title: string;
  onBack: () => void;
  backLabel: string;
}

export const RiddleResultHeader: React.FC<RiddleResultHeaderProps> = ({
  title,
  onBack,
  backLabel,
}) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top + theme.spacing.sm }]}>
      {/* Canonical Back Button */}
      <AppBackButton
        onPress={onBack}
        accessibilityLabel={backLabel}
        style={styles.backButton}
      />

      {/* Screen Title */}
      <Text style={styles.title} numberOfLines={1}>
        {title}
      </Text>

      {/* Right slot with LanguageToggle */}
      <LanguageToggle />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.lg,
    paddingBottom: theme.spacing.sm,
    backgroundColor: theme.colors.white,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  backButton: {},
  title: {
    ...theme.typography.h3,
    fontSize: 18,
    fontWeight: '800',
    color: theme.colors.navy900,
    flex: 1,
    textAlign: 'center',
  },
  spacer: {
    width: 44,
  },
});
