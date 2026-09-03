/**
 * LanguageOptionCard Component
 * Interactive selectable card representing a supported language option.
 * Clean Pearl White & Royal Blue styling with accessible contrast.
 */

import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  AccessibilityProps,
} from 'react-native';
import { theme } from '../../theme';
import { SupportedLanguage } from '../../config/i18n';

interface LanguageOptionCardProps extends AccessibilityProps {
  languageCode: SupportedLanguage;
  badge: string;
  title: string;
  description: string;
  isSelected: boolean;
  onSelect: (languageCode: SupportedLanguage) => void;
  disabled?: boolean;
  isReduceMotion?: boolean;
}

export const LanguageOptionCard: React.FC<LanguageOptionCardProps> = ({
  languageCode,
  badge,
  title,
  description,
  isSelected,
  onSelect,
  disabled = false,
  isReduceMotion = false,
  accessibilityLabel,
  accessibilityHint,
}) => {
  const scaleValue = useRef(new Animated.Value(1)).current;

  // Selection bounce animation
  useEffect(() => {
    if (isReduceMotion) return;
    if (isSelected) {
      Animated.sequence([
        Animated.timing(scaleValue, {
          toValue: 1.015,
          duration: 120,
          useNativeDriver: true,
        }),
        Animated.spring(scaleValue, {
          toValue: 1,
          friction: 4,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [isSelected, isReduceMotion, scaleValue]);

  const handlePressIn = () => {
    if (isReduceMotion) return;
    Animated.timing(scaleValue, {
      toValue: 0.985,
      duration: 80,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    if (isReduceMotion) return;
    Animated.spring(scaleValue, {
      toValue: 1,
      friction: 4,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View style={{ transform: [{ scale: scaleValue }], width: '100%' }}>
      <TouchableOpacity
        style={[
          styles.card,
          isSelected ? styles.cardSelected : styles.cardUnselected,
        ]}
        onPress={() => onSelect(languageCode)}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={0.9}
        disabled={disabled}
        accessible={true}
        accessibilityRole="radio"
        accessibilityState={{ selected: isSelected }}
        accessibilityLabel={accessibilityLabel || `${title}, ${description}`}
        accessibilityHint={accessibilityHint}
      >
        {/* Left: Language Script Symbol Badge */}
        <View
          style={[
            styles.badgeContainer,
            isSelected ? styles.badgeSelected : styles.badgeUnselected,
          ]}
        >
          <Text
            style={[
              styles.badgeText,
              languageCode === 'ta' && styles.badgeTextTamil,
              isSelected ? styles.badgeTextSelected : styles.badgeTextUnselected,
            ]}
          >
            {badge}
          </Text>
        </View>

        {/* Center: Language Name & Native Script Description */}
        <View style={styles.textContainer}>
          <Text
            style={[
              styles.title,
              isSelected ? styles.titleSelected : styles.titleUnselected,
            ]}
          >
            {title}
          </Text>
          <Text
            style={[
              styles.description,
              isSelected ? styles.descriptionSelected : styles.descriptionUnselected,
            ]}
          >
            {description}
          </Text>
        </View>

        {/* Right: Radio Selection Checkmark */}
        <View
          style={[
            styles.radioIndicator,
            isSelected ? styles.radioSelected : styles.radioUnselected,
          ]}
        >
          {isSelected && <Text style={styles.checkGlyph}>✓</Text>}
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '100%',
    minHeight: 84,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.base,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1.5,
    marginBottom: theme.spacing.md,
    shadowColor: theme.colors.navy900,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 1,
  },
  cardSelected: {
    backgroundColor: theme.colors.blue50,
    borderColor: theme.colors.actionPrimary,
    shadowColor: theme.colors.actionPrimary,
    shadowOpacity: 0.12,
    shadowRadius: 8,
  },
  cardUnselected: {
    backgroundColor: theme.colors.white,
    borderColor: theme.colors.border,
  },
  badgeContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.base,
    borderWidth: 1,
  },
  badgeSelected: {
    backgroundColor: theme.colors.blue100,
    borderColor: theme.colors.actionPrimary,
  },
  badgeUnselected: {
    backgroundColor: theme.colors.gray100,
    borderColor: theme.colors.border,
  },
  badgeText: {
    ...theme.typography.overline,
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  badgeTextTamil: {
    fontSize: 12,
    fontWeight: '700',
  },
  badgeTextSelected: {
    color: theme.colors.actionPrimary,
  },
  badgeTextUnselected: {
    color: theme.colors.textSecondary,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    ...theme.typography.h3,
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 2,
  },
  titleSelected: {
    color: theme.colors.navy900,
  },
  titleUnselected: {
    color: theme.colors.navy800,
  },
  description: {
    ...theme.typography.body,
    fontSize: 13.5,
    lineHeight: 18,
  },
  descriptionSelected: {
    color: theme.colors.actionPrimary,
    fontWeight: '600',
  },
  descriptionUnselected: {
    color: theme.colors.slate600,
  },
  radioIndicator: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    marginLeft: theme.spacing.sm,
  },
  radioSelected: {
    backgroundColor: theme.colors.actionPrimary,
    borderColor: theme.colors.actionPrimary,
  },
  radioUnselected: {
    backgroundColor: 'transparent',
    borderColor: theme.colors.gray300,
  },
  checkGlyph: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '900',
    marginTop: -1,
  },
});
