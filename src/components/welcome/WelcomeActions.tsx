/**
 * WelcomeActions Component
 * Action deck for Screen 02 featuring Primary CTA (Blue Button "Get Started ->"),
 * Secondary Action ("Already have an account? Sign In"),
 * Explore Demo button, and Legal footer links.
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

interface WelcomeActionsProps extends AccessibilityProps {
  onGetStarted: () => void;
  onSignIn: () => void;
  onExploreDemo?: () => void;
  onTerms?: () => void;
  onPrivacy?: () => void;
  language?: SupportedLanguage;
  disabled?: boolean;
}

export const WelcomeActions: React.FC<WelcomeActionsProps> = ({
  onGetStarted,
  onSignIn,
  onExploreDemo,
  onTerms,
  onPrivacy,
  language = 'en',
  disabled = false,
}) => {
  const t = getTranslation(language).welcome;
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

  const isTamil = language === 'ta';

  return (
    <View style={styles.container}>
      {/* Primary CTA: Blue Action Button */}
      <Animated.View style={{ transform: [{ scale: buttonScale }], width: '100%' }}>
        <TouchableOpacity
          style={[styles.primaryButton, disabled && styles.primaryButtonDisabled]}
          onPress={onGetStarted}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          activeOpacity={0.9}
          disabled={disabled}
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel={t.getStarted}
          accessibilityHint={t.accessibility.getStartedHint}
        >
          <Text style={styles.primaryButtonText}>{t.getStarted}</Text>
          <View style={styles.arrowBadge}>
            <Text style={styles.arrowGlyph}>→</Text>
          </View>
        </TouchableOpacity>
      </Animated.View>

      {/* Secondary CTA: Sign In */}
      <TouchableOpacity
        style={styles.secondaryButton}
        onPress={onSignIn}
        activeOpacity={0.75}
        disabled={disabled}
        accessible={true}
        accessibilityRole="button"
        accessibilityLabel={`${t.alreadyAccount} ${t.signIn}`}
        accessibilityHint={t.accessibility.signInHint}
      >
        <Text style={styles.secondaryText}>
          {t.alreadyAccount}{' '}
          <Text style={styles.signInHighlight}>{t.signIn}</Text>
        </Text>
      </TouchableOpacity>

      {/* Explore Demo Discovery Button */}
      {onExploreDemo && (
        <TouchableOpacity
          style={styles.demoButton}
          onPress={onExploreDemo}
          activeOpacity={0.8}
          disabled={disabled}
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel={isTamil ? 'டெமோவை ஆராய்க' : 'Explore Demo'}
        >
          <Text style={styles.demoButtonText}>
            ✨ {isTamil ? 'டெமோவை ஆராய்க' : 'Explore Demo'}
          </Text>
        </TouchableOpacity>
      )}

      {/* Footer Legal Links */}
      <View style={styles.footerRow}>
        {onTerms && (
          <TouchableOpacity onPress={onTerms} activeOpacity={0.7} style={styles.legalLink}>
            <Text style={styles.legalText}>{isTamil ? 'விதிமுறைகள்' : 'Terms'}</Text>
          </TouchableOpacity>
        )}
        <Text style={styles.bulletDot}>•</Text>
        {onPrivacy && (
          <TouchableOpacity onPress={onPrivacy} activeOpacity={0.7} style={styles.legalLink}>
            <Text style={styles.legalText}>{isTamil ? 'தனியுரிமை' : 'Privacy'}</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.base,
    paddingTop: theme.spacing.xs,
  },
  primaryButton: {
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
  },
  primaryButtonDisabled: {
    opacity: 0.6,
  },
  primaryButtonText: {
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
  secondaryButton: {
    minHeight: 40,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: theme.spacing.base,
    marginTop: 2,
  },
  secondaryText: {
    ...theme.typography.body,
    fontSize: 13,
    color: theme.colors.textSecondary,
    fontWeight: '500',
  },
  signInHighlight: {
    color: theme.colors.actionPrimary,
    fontWeight: '700',
    textDecorationLine: 'underline',
  },
  demoButton: {
    backgroundColor: 'rgba(147, 51, 234, 0.12)',
    borderWidth: 1,
    borderColor: 'rgba(147, 51, 234, 0.35)',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: theme.borderRadius.full,
    marginVertical: 4,
  },
  demoButtonText: {
    ...theme.typography.caption,
    fontSize: 12,
    fontWeight: '700',
    color: theme.colors.purple400,
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
  },
  legalLink: {
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  legalText: {
    ...theme.typography.caption,
    fontSize: 11,
    color: theme.colors.textMuted,
  },
  bulletDot: {
    color: theme.colors.textMuted,
    fontSize: 10,
  },
});
