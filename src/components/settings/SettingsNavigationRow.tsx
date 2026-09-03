/**
 * SettingsNavigationRow Component
 * Action row with Icon, Title, Subtitle, optional value badge, and Chevron indicator.
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { theme } from '../../theme';

interface SettingsNavigationRowProps {
  icon: string;
  title: string;
  subtitle?: string;
  value?: string;
  showBorder?: boolean;
  onPress: () => void;
}

export const SettingsNavigationRow: React.FC<SettingsNavigationRowProps> = ({
  icon,
  title,
  subtitle,
  value,
  showBorder = true,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={[styles.container, showBorder && styles.borderBottom]}
      onPress={onPress}
      activeOpacity={0.7}
      accessible={true}
      accessibilityRole="button"
      accessibilityLabel={`${title}. ${subtitle || ''} ${value ? `Current: ${value}` : ''}`}
    >
      <View style={styles.iconCircle}>
        <Text style={styles.iconText}>{icon}</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
        {Boolean(subtitle) && (
          <Text style={styles.subtitle} numberOfLines={1}>
            {subtitle}
          </Text>
        )}
      </View>

      {Boolean(value) && (
        <View style={styles.valueBadge}>
          <Text style={styles.valueText} numberOfLines={1}>
            {value}
          </Text>
        </View>
      )}

      <Text style={styles.chevron}>›</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 14,
    minHeight: 56,
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.gray100,
  },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: theme.colors.gray50,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  iconText: {
    fontSize: 17,
  },
  content: {
    flex: 1,
    marginRight: 8,
  },
  title: {
    ...theme.typography.body,
    fontSize: 14.5,
    fontWeight: '700',
    color: theme.colors.navy900,
  },
  subtitle: {
    ...theme.typography.caption,
    fontSize: 11.5,
    color: theme.colors.slate500,
    marginTop: 1,
  },
  valueBadge: {
    backgroundColor: theme.colors.gray100,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: theme.borderRadius.sm,
    marginRight: 6,
  },
  valueText: {
    ...theme.typography.caption,
    fontSize: 11.5,
    color: theme.colors.navy900,
    fontWeight: '600',
  },
  chevron: {
    fontSize: 22,
    color: theme.colors.slate400,
    fontWeight: '500',
  },
});
