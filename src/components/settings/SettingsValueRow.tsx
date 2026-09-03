/**
 * SettingsValueRow Component
 * Row with Icon, Title, Subtitle, active value pill, and Chevron for opening selection modals.
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { theme } from '../../theme';

interface SettingsValueRowProps {
  icon: string;
  title: string;
  subtitle?: string;
  value: string;
  showBorder?: boolean;
  onPress: () => void;
}

export const SettingsValueRow: React.FC<SettingsValueRowProps> = ({
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
      accessibilityLabel={`${title}. ${subtitle || ''} Selected: ${value}`}
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

      <View style={styles.valuePill}>
        <Text style={styles.valueText} numberOfLines={1}>
          {value}
        </Text>
      </View>

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
  valuePill: {
    backgroundColor: theme.colors.blue50,
    borderWidth: 1,
    borderColor: theme.colors.blue100,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: theme.borderRadius.full,
    marginRight: 6,
  },
  valueText: {
    ...theme.typography.caption,
    fontSize: 12,
    color: theme.colors.actionPrimary,
    fontWeight: '700',
  },
  chevron: {
    fontSize: 22,
    color: theme.colors.slate400,
    fontWeight: '500',
  },
});
