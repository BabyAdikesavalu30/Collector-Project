/**
 * LanguageToggle Component
 * Canonical, compact two-state sliding switch for English ('E') and Tamil ('த').
 * Polished pill design with royal blue track, sliding white thumb, and dark text on active state.
 * Fully accessible with screen-reader roles, touch target compliance, and reduced-motion awareness.
 */

import React, { useEffect, useRef, useState } from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Animated,
  Easing,
  AccessibilityInfo,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { theme } from '../../theme';
import { SupportedLanguage } from '../../config/i18n';
import { useLanguage } from '../../context/LanguageContext';

export interface LanguageToggleProps {
  language?: SupportedLanguage;
  onToggle?: () => void;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}

export const LanguageToggle: React.FC<LanguageToggleProps> = ({
  language: propLanguage,
  onToggle: propOnToggle,
  style,
  testID = 'language-toggle',
}) => {
  const context = useLanguage();
  const currentLanguage = propLanguage ?? context.language;
  const isTamil = currentLanguage === 'ta';

  const [isReduceMotion, setIsReduceMotion] = useState(false);

  // Animated slide progress (0 for English, 1 for Tamil)
  const slideAnim = useRef(new Animated.Value(isTamil ? 1 : 0)).current;

  // Listen to system reduced motion preference
  useEffect(() => {
    let isMounted = true;
    AccessibilityInfo.isReduceMotionEnabled()
      .then((enabled) => {
        if (isMounted) setIsReduceMotion(Boolean(enabled));
      })
      .catch(() => {});

    const subscription = AccessibilityInfo.addEventListener?.(
      'reduceMotionChanged',
      (enabled) => {
        if (isMounted) setIsReduceMotion(Boolean(enabled));
      }
    );

    return () => {
      isMounted = false;
      subscription?.remove?.();
    };
  }, []);

  // Animate sliding thumb upon language change
  useEffect(() => {
    const toValue = isTamil ? 1 : 0;
    if (isReduceMotion) {
      slideAnim.setValue(toValue);
      return;
    }

    Animated.timing(slideAnim, {
      toValue,
      duration: 180,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
  }, [isTamil, isReduceMotion, slideAnim]);

  const handlePress = () => {
    if (propOnToggle) {
      propOnToggle();
    } else {
      context.toggleLanguage();
    }
  };

  // Interpolate thumb movement: 0px (left: English) to 28px (right: Tamil)
  const translateX = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 28],
  });

  const accessibilityLabel = isTamil
    ? 'மொழியை மாற்றவும். தற்போதைய மொழி: தமிழ்.'
    : 'Switch language. Current language: English.';

  const accessibilityHint = isTamil
    ? 'ஆங்கிலத்திற்கு மாற இருமுறை தட்டவும்'
    : 'Double tap to switch to Tamil';

  return React.createElement(
    TouchableOpacity,
    {
      style: [styles.track, style],
      onPress: handlePress,
      activeOpacity: 0.85,
      accessible: true,
      accessibilityRole: 'switch',
      accessibilityState: { checked: isTamil },
      accessibilityLabel,
      accessibilityHint,
      hitSlop: { top: 8, bottom: 8, left: 8, right: 8 },
      testID,
    },
    React.createElement(Animated.View, {
      style: [
        styles.thumb,
        {
          transform: [{ translateX }],
        },
      ],
    }),
    React.createElement(
      View,
      { style: styles.labelRow, pointerEvents: 'none' },
      React.createElement(
        View,
        { style: styles.halfSlot },
        React.createElement(
          Text,
          {
            style: [
              styles.labelText,
              !isTamil ? styles.activeLabel : styles.inactiveLabel,
            ],
          },
          'E'
        )
      ),
      React.createElement(
        View,
        { style: styles.halfSlot },
        React.createElement(
          Text,
          {
            style: [
              styles.labelText,
              isTamil ? styles.activeLabel : styles.inactiveLabel,
              styles.tamilText,
            ],
          },
          'த'
        )
      )
    )
  );
};

const styles = StyleSheet.create({
  track: {
    width: 60,
    height: 30,
    borderRadius: 15,
    backgroundColor: theme.colors.actionPrimary,
    borderWidth: 1,
    borderColor: '#1D4ED8',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  thumb: {
    position: 'absolute',
    top: 2,
    left: 2,
    width: 26,
    height: 24,
    borderRadius: 12,
    backgroundColor: theme.colors.white,
    shadowColor: theme.colors.navy900,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.16,
    shadowRadius: 2,
    elevation: 2,
  },
  labelRow: {
    flexDirection: 'row',
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
  halfSlot: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  labelText: {
    fontSize: 12.5,
    fontFamily: theme.fontFamilies.bold,
    textAlign: 'center',
  },
  activeLabel: {
    color: theme.colors.navy900,
    fontWeight: '800',
  },
  inactiveLabel: {
    color: '#FFFFFF',
    opacity: 0.85,
    fontWeight: '600',
  },
  tamilText: {
    fontSize: 12,
  },
});
