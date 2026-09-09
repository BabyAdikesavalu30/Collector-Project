/**
 * CelebrationToast
 * Lightweight toast notification for subtle celebration events.
 * Slides in from top, auto-dismisses, respects reduced-motion.
 */

import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Easing, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { theme } from '../../theme';
import { CelebrationEvent } from '../../features/celebration';
import { SupportedLanguage, getTranslation } from '../../config/i18n';

interface CelebrationToastProps {
  event: CelebrationEvent;
  language: SupportedLanguage;
  isReducedMotion: boolean;
  onDismiss: () => void;
}

export const CelebrationToast: React.FC<CelebrationToastProps> = ({
  event,
  language,
  isReducedMotion,
  onDismiss,
}) => {
  const insets = useSafeAreaInsets();
  const isTamil = language === 'ta';
  const t = getTranslation(language);
  const slideAnim = useRef(new Animated.Value(-80)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  // Get translated text
  const titleText = getTranslatedText(event.titleKey, t, isTamil);
  const descriptionText = event.descriptionKey
    ? getTranslatedText(event.descriptionKey, t, isTamil)
    : undefined;

  useEffect(() => {
    if (isReducedMotion) {
      slideAnim.setValue(0);
      opacityAnim.setValue(1);
      return;
    }

    // Enter
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 250,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();

    // Auto-dismiss after a brief hold
    const timer = setTimeout(() => {
      // Exit
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: -80,
          duration: 200,
          easing: Easing.in(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true,
        }),
      ]).start(() => {
        onDismiss();
      });
    }, 2500);

    return () => clearTimeout(timer);
  }, [isReducedMotion, slideAnim, opacityAnim, onDismiss]);

  return (
    <Animated.View
      style={[
        styles.container,
        {
          top: Math.max(insets.top + 8, Platform.OS === 'android' ? 36 : 16),
          transform: [{ translateY: slideAnim }],
          opacity: opacityAnim,
        },
      ]}
      accessibilityRole="alert"
      accessibilityLabel={`${titleText}${descriptionText ? `. ${descriptionText}` : ''}`}
    >
      <View style={styles.content}>
        <Text style={styles.icon}>{event.icon || '✅'}</Text>
        <View style={styles.textContainer}>
          <Text style={styles.title} numberOfLines={1}>{titleText}</Text>
          {descriptionText && (
            <Text style={styles.description} numberOfLines={1}>{descriptionText}</Text>
          )}
          {event.reward?.xp && (
            <Text style={styles.reward}>+{event.reward.xp} XP</Text>
          )}
        </View>
      </View>
    </Animated.View>
  );
};

// ============================================================================
// Translation Helper
// ============================================================================

function getTranslatedText(key: string, t: Record<string, unknown>, isTamil: boolean): string {
  // Navigate nested translation keys. The translation dictionary is a nested
  // object with string leaves, so we traverse it with runtime guards rather
  // than treating it as `any`.
  const parts = key.split('.');
  let current: unknown = t;
  for (const part of parts) {
    if (current && typeof current === 'object' && part in current) {
      current = (current as Record<string, unknown>)[part];
    } else {
      return key; // Fallback to key itself
    }
  }
  return typeof current === 'string' ? current : key;
}

// ============================================================================
// Styles
// ============================================================================

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: theme.spacing.base,
    right: theme.spacing.base,
    zIndex: 1000,
    elevation: 1000,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1,
    borderColor: theme.colors.successBorder,
    paddingHorizontal: theme.spacing.base,
    paddingVertical: theme.spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 8,
    gap: theme.spacing.md,
  },
  icon: {
    fontSize: 24,
    width: 32,
    height: 32,
    textAlign: 'center',
    lineHeight: 32,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    ...theme.typography.body,
    fontSize: 14,
    fontWeight: '700',
    color: theme.colors.navy900,
  },
  description: {
    ...theme.typography.caption,
    fontSize: 12,
    color: theme.colors.slate600,
    marginTop: 2,
  },
  reward: {
    ...theme.typography.caption,
    fontSize: 12,
    fontWeight: '700',
    color: theme.colors.textSuccess,
    marginTop: 2,
  },
});
