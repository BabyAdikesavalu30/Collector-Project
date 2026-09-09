/**
 * DiscoveryCard — Compact science collection discovery preview for Home 2.0.
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { theme } from '../../theme';
import { SupportedLanguage } from '../../config/i18n';
import { HomeDiscoveryPreview } from '../../features/home/home2.types';

interface DiscoveryCardProps {
  discovery: HomeDiscoveryPreview;
  language: SupportedLanguage;
  onPress: () => void;
}

export const DiscoveryCard: React.FC<DiscoveryCardProps> = ({
  discovery,
  language,
  onPress,
}) => {
  const isTamil = language === 'ta';

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.85}
      accessibilityRole="button"
      accessibilityLabel={`${isTamil ? discovery.titleTa : discovery.title}: ${discovery.completedCount} of ${discovery.totalCount}`}
    >
      <View style={styles.iconCircle}>
        <Text style={styles.icon}>{discovery.icon}</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.label}>
          {isTamil ? 'புதிய கண்டுபிடிப்பு' : 'NEW DISCOVERY'}
        </Text>
        <Text style={styles.title} numberOfLines={1}>
          {isTamil ? discovery.titleTa : discovery.title}
        </Text>
        <Text style={styles.subtitle} numberOfLines={1}>
          {isTamil ? discovery.subtitleTa : discovery.subtitle}
        </Text>
      </View>
      <Text style={styles.chevron}>→</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.sm,
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: theme.colors.green50,
    borderWidth: 1,
    borderColor: theme.colors.green200,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  icon: {
    fontSize: 22,
  },
  content: {
    flex: 1,
  },
  label: {
    ...theme.typography.overline,
    fontSize: 9.5,
    color: theme.colors.success,
    fontWeight: '700',
    marginBottom: 2,
  },
  title: {
    ...theme.typography.body,
    fontSize: 14,
    fontWeight: '700',
    color: theme.colors.navy900,
  },
  subtitle: {
    ...theme.typography.caption,
    fontSize: 11,
    color: theme.colors.slate500,
    marginTop: 1,
  },
  chevron: {
    fontSize: 16,
    color: theme.colors.slate400,
    marginLeft: 8,
    fontWeight: '700',
  },
});
