/**
 * AppBackButton Component
 * Canonical, standardized top-left Back Button for Vigyaan Mobile.
 * Provides a pixel-perfect geometric ChevronLeft icon inside a standardized
 * 44x44 touch-friendly container with bilingual accessibility and theme integration.
 */

import React, { useState } from 'react';
import {
  TouchableOpacity,
  View,
  StyleSheet,
  StyleProp,
  ViewStyle,
  Insets,
  Platform,
} from 'react-native';
import { theme } from '../../theme';
import { SupportedLanguage, getTranslation } from '../../config/i18n';

export interface AppBackButtonProps {
  onPress: () => void;
  accessibilityLabel?: string;
  accessibilityHint?: string;
  language?: SupportedLanguage;
  color?: string;
  variant?: 'card' | 'ghost';
  style?: StyleProp<ViewStyle>;
  hitSlop?: Insets;
  testID?: string;
}

/**
 * Geometric Vector ChevronLeft Icon
 * Pure CSS/React Native rotated box with left and bottom borders.
 * Yields crisp vector rendering on all screen densities without text glyph drift.
 */
export const BackChevronIcon: React.FC<{
  color?: string;
  size?: number;
  strokeWidth?: number;
}> = ({
  color = theme.colors.navy900,
  size = 10.5,
  strokeWidth = 2.2,
}) => (
  <View style={iconStyles.container}>
    <View
      style={[
        iconStyles.chevron,
        {
          width: size,
          height: size,
          borderColor: color,
          borderLeftWidth: strokeWidth,
          borderBottomWidth: strokeWidth,
        },
      ]}
    />
  </View>
);

const iconStyles = StyleSheet.create({
  container: {
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 2, // Optical balance for left-pointing angle
  },
  chevron: {
    transform: [{ rotate: '45deg' }],
    borderTopLeftRadius: 0.5,
    borderBottomRightRadius: 0.5,
  },
});

export const AppBackButton: React.FC<AppBackButtonProps> = ({
  onPress,
  accessibilityLabel,
  accessibilityHint,
  language = 'en',
  color = theme.colors.navy900,
  variant = 'card',
  style,
  hitSlop = { top: 6, bottom: 6, left: 6, right: 6 },
  testID = 'app-back-button',
}) => {
  const [isPressed, setIsPressed] = useState(false);
  const isTamil = language === 'ta';

  const defaultLabel = isTamil ? 'பின்னால் செல்லவும்' : 'Go back';
  const defaultHint = isTamil ? 'முந்தைய திரைக்குத் திரும்பும்' : 'Returns to the previous screen';

  const isGhost = variant === 'ghost';

  return (
    <TouchableOpacity
      style={[
        styles.container,
        isGhost ? styles.ghostContainer : styles.cardContainer,
        isPressed && (isGhost ? styles.ghostPressed : styles.cardPressed),
        style,
      ]}
      onPress={onPress}
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      activeOpacity={0.7}
      accessible={true}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel || defaultLabel}
      accessibilityHint={accessibilityHint || defaultHint}
      hitSlop={hitSlop}
      testID={testID}
    >
      <BackChevronIcon color={color} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 44,
    height: 44,
    minWidth: 44,
    minHeight: 44,
    borderRadius: theme.borderRadius.md, // 12px
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardContainer: {
    backgroundColor: theme.colors.white,
    borderWidth: 1,
    borderColor: theme.colors.border, // #E2E8F0
    shadowColor: theme.colors.navy900,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 3,
    elevation: 2,
  },
  cardPressed: {
    backgroundColor: '#F1F5F9',
    borderColor: '#CBD5E1',
    transform: [{ scale: 0.97 }],
  },
  ghostContainer: {
    backgroundColor: 'transparent',
  },
  ghostPressed: {
    backgroundColor: 'rgba(15, 23, 42, 0.06)',
    borderRadius: theme.borderRadius.md,
  },
});
