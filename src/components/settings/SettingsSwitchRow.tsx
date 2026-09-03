/**
 * SettingsSwitchRow Component
 * Toggle row with Icon, Title, Subtitle, and React Native Switch.
 */

import React from 'react';
import { View, Text, StyleSheet, Switch, Platform } from 'react-native';
import { theme } from '../../theme';

interface SettingsSwitchRowProps {
  icon: string;
  title: string;
  subtitle?: string;
  value: boolean;
  showBorder?: boolean;
  onValueChange: (val: boolean) => void;
}

export const SettingsSwitchRow: React.FC<SettingsSwitchRowProps> = ({
  icon,
  title,
  subtitle,
  value,
  showBorder = true,
  onValueChange,
}) => {
  return (
    <View
      style={[styles.container, showBorder && styles.borderBottom]}
      accessible={true}
      accessibilityRole="switch"
      accessibilityState={{ checked: value }}
      accessibilityLabel={`${title}. ${subtitle || ''} ${value ? 'On' : 'Off'}`}
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

      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{
          false: theme.colors.gray300,
          true: theme.colors.actionPrimary,
        }}
        thumbColor={Platform.OS === 'android' ? (value ? '#FFFFFF' : '#F4F3F4') : '#FFFFFF'}
        ios_backgroundColor={theme.colors.gray300}
      />
    </View>
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
    marginRight: 12,
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
});
