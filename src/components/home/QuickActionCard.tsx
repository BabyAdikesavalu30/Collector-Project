/**
 * QuickActionCard Component
 * Shared, canonical card component for Home Quick Actions.
 * Guarantees identical dimensions (width, height, padding, icon housing, title alignment)
 * across all cards in the grid regardless of language (English / Tamil) or screen size.
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { theme } from '../../theme';

export interface QuickActionCardProps {
  id?: string;
  title: string;
  subtitle?: string;
  icon: string;
  accentColor?: string;
  bgGlow?: string;
  onPress: () => void;
  accessibilityLabel?: string;
  accessibilityHint?: string;
}

export const QuickActionCard: React.FC<QuickActionCardProps> = ({
  title,
  subtitle,
  icon,
  accentColor = theme.colors.actionPrimary,
  bgGlow = theme.colors.blue50,
  onPress,
  accessibilityLabel,
  accessibilityHint,
}) => {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.78}
      accessible={true}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel || title}
      accessibilityHint={accessibilityHint}
    >
      {/* 1. Standardized Circular Icon Container */}
      <View style={[styles.iconHousing, { backgroundColor: bgGlow }]}>
        <Text style={styles.iconGlyph}>{icon}</Text>
      </View>

      {/* 2. Standardized Title Area with Controlled 2-Line Wrapping */}
      <View style={styles.titleContainer}>
        <Text
          style={styles.titleText}
          numberOfLines={2}
          ellipsizeMode="tail"
        >
          {title}
        </Text>
      </View>

      {/* 3. Optional Subtitle Area */}
      {subtitle ? (
        <Text style={styles.subtitleText} numberOfLines={1}>
          {subtitle}
        </Text>
      ) : null}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    minHeight: 112,
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    paddingVertical: 12,
    paddingHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: theme.colors.navy900,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 2,
  },
  iconHousing: {
    width: 42,
    height: 42,
    borderRadius: 21,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    overflow: 'hidden',
  },
  iconGlyph: {
    fontSize: 22,
    textAlign: 'center',
    includeFontPadding: false,
    lineHeight: Platform.OS === 'ios' ? 24 : 22,
  },
  titleContainer: {
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 4,
  },
  titleText: {
    ...theme.typography.caption,
    fontSize: 13,
    lineHeight: 17,
    fontWeight: '700',
    color: theme.colors.navy900,
    textAlign: 'center',
  },
  subtitleText: {
    ...theme.typography.caption,
    fontSize: 10.5,
    color: theme.colors.slate500,
    marginTop: 2,
    textAlign: 'center',
  },
});
