/**
 * OnboardingFooter Component
 * Bottom navigation deck containing PageIndicator (Step 1 of 3)
 * and the primary Next CTA button.
 */

import React, { useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  AccessibilityProps,
} from 'react-native';
import { theme } from '../../theme';
import { getTranslation, SupportedLanguage } from '../../config/i18n';
import { PageIndicator } from './PageIndicator';

interface OnboardingFooterProps extends AccessibilityProps {
  onNext: () => void;
  currentStep?: number;
  totalSteps?: number;
  language?: SupportedLanguage;
  disabled?: boolean;
}

export const OnboardingFooter: React.FC<OnboardingFooterProps> = ({
  onNext,
  currentStep = 1,
  totalSteps = 3,
  language = 'en',
  disabled = false,
}) => {
  const t = getTranslation(language).onboarding;
  const buttonScale = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(buttonScale, {
      toValue: 0.97,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(buttonScale, {
      toValue: 1,
      friction: 4,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.container}>
      {/* 3-Dot Page Indicator */}
      <PageIndicator currentStep={currentStep} totalSteps={totalSteps} />

      {/* Primary Next Action */}
      <Animated.View style={{ transform: [{ scale: buttonScale }], width: '100%' }}>
        <TouchableOpacity
          style={[styles.nextButton, disabled && styles.nextButtonDisabled]}
          onPress={onNext}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          activeOpacity={0.9}
          disabled={disabled}
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel={t.next}
          accessibilityHint={t.accessibility.nextHint}
        >
          <Text style={styles.nextButtonText}>{t.next}</Text>
          <View style={styles.arrowBadge}>
            <Text style={styles.arrowGlyph}>→</Text>
          </View>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.base,
    paddingBottom: theme.spacing.sm,
  },
  nextButton: {
    width: '100%',
    height: 52,
    backgroundColor: theme.colors.actionPrimary,
    borderRadius: theme.borderRadius.full,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: theme.colors.actionPrimary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 4,
    marginTop: theme.spacing.xs,
  },
  nextButtonDisabled: {
    opacity: 0.6,
  },
  nextButtonText: {
    ...theme.typography.bodyLarge,
    fontSize: 16,
    fontWeight: '800',
    color: theme.colors.textOnAction,
    letterSpacing: 0.8,
  },
  arrowBadge: {
    marginLeft: 8,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrowGlyph: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '800',
    marginTop: -1,
  },
});
