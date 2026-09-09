/**
 * CelebrationModal
 * Modal celebration for standard and major events.
 * Features: icon, title, description, reward summary, CTA buttons.
 * Respects reduced-motion with instant state changes.
 */

import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Easing,
  TouchableOpacity,
  Modal,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { theme } from '../../theme';
import { CelebrationEvent } from '../../features/celebration';
import { SupportedLanguage, getTranslation } from '../../config/i18n';

interface CelebrationModalProps {
  event: CelebrationEvent;
  language: SupportedLanguage;
  isReducedMotion: boolean;
  onDismiss: () => void;
  onNavigate?: (route: string) => void;
}

export const CelebrationModal: React.FC<CelebrationModalProps> = ({
  event,
  language,
  isReducedMotion,
  onDismiss,
  onNavigate,
}) => {
  const insets = useSafeAreaInsets();
  const isTamil = language === 'ta';
  const t = getTranslation(language);

  const scaleAnim = useRef(new Animated.Value(0.85)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const overlayOpacity = useRef(new Animated.Value(0)).current;
  const rewardScale = useRef(new Animated.Value(0.8)).current;
  const rewardOpacity = useRef(new Animated.Value(0)).current;

  const titleText = getTranslatedText(event.titleKey, t, isTamil);
  const descriptionText = event.descriptionKey
    ? getTranslatedText(event.descriptionKey, t, isTamil)
    : undefined;

  const isMajor = event.intensity === 'major';

  useEffect(() => {
    if (isReducedMotion) {
      scaleAnim.setValue(1);
      opacityAnim.setValue(1);
      overlayOpacity.setValue(0.65);
      rewardScale.setValue(1);
      rewardOpacity.setValue(1);
      return;
    }

    // Overlay fade
    Animated.timing(overlayOpacity, {
      toValue: 0.65,
      duration: isMajor ? 350 : 250,
      useNativeDriver: true,
    }).start();

    // Main card entrance
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 8,
        tension: 40,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: isMajor ? 300 : 200,
        useNativeDriver: true,
      }),
    ]).start();

    // Reward card entrance (delayed)
    if (event.reward) {
      setTimeout(() => {
        Animated.parallel([
          Animated.spring(rewardScale, {
            toValue: 1,
            friction: 7,
            tension: 50,
            useNativeDriver: true,
          }),
          Animated.timing(rewardOpacity, {
            toValue: 1,
            duration: 200,
            useNativeDriver: true,
          }),
        ]).start();
      }, isMajor ? 300 : 200);
    }
  }, [isReducedMotion, isMajor, event.reward, scaleAnim, opacityAnim, overlayOpacity, rewardScale, rewardOpacity]);

  const handleContinue = () => {
    if (event.continueRoute && onNavigate) {
      onDismiss();
      onNavigate(event.continueRoute);
    } else {
      onDismiss();
    }
  };

  const handleSecondary = () => {
    if (event.secondaryActionRoute && onNavigate) {
      onDismiss();
      onNavigate(event.secondaryActionRoute);
    }
  };

  const continueLabel = event.continueLabel
    ? getTranslatedText(event.continueLabel, t, isTamil)
    : isTamil ? 'தொடருங்கள்' : 'Continue';

  const secondaryLabel = event.secondaryActionLabel
    ? getTranslatedText(event.secondaryActionLabel, t, isTamil)
    : undefined;

  return (
    <Modal
      visible={true}
      transparent
      animationType="none"
      onRequestClose={onDismiss}
      accessible
    >
      {/* Overlay */}
      <Animated.View
        style={[styles.overlay, { opacity: overlayOpacity }]}
      >
        <TouchableOpacity
          style={styles.overlayTouchable}
          activeOpacity={1}
          onPress={onDismiss}
        />
      </Animated.View>

      {/* Content */}
      <Animated.View
        style={[
          styles.contentContainer,
          {
            paddingBottom: Math.max(insets.bottom + 24, 32),
            transform: [{ scale: scaleAnim }],
            opacity: opacityAnim,
          },
        ]}
      >
        {/* Icon */}
        <View style={[styles.iconContainer, isMajor && styles.iconContainerMajor]}>
          <Text style={styles.icon}>{event.icon || '🎉'}</Text>
        </View>

        {/* Title */}
        <Text style={[styles.title, isMajor && styles.titleMajor]}>{titleText}</Text>

        {/* Description */}
        {descriptionText && (
          <Text style={styles.description}>{descriptionText}</Text>
        )}

        {/* Milestone */}
        {event.milestone && (
          <View style={styles.milestoneBadge}>
            <Text style={styles.milestoneText}>
              {isTamil ? `நிலை ${event.milestone}` : `Level ${event.milestone}`}
            </Text>
          </View>
        )}

        {/* Reward Summary */}
        {event.reward && (
          <Animated.View
            style={[
              styles.rewardCard,
              { transform: [{ scale: rewardScale }], opacity: rewardOpacity },
            ]}
          >
            <Text style={styles.rewardLabel}>
              {isTamil ? 'வெகுமதி' : 'REWARD'}
            </Text>
            <View style={styles.rewardsRow}>
              {event.reward.xp !== undefined && (
                <View style={styles.rewardItem}>
                  <Text style={styles.rewardIcon}>⚡</Text>
                  <View>
                    <Text style={styles.rewardAmount}>+{event.reward.xp}</Text>
                    <Text style={styles.rewardType}>XP</Text>
                  </View>
                </View>
              )}
              {event.reward.xp !== undefined && event.reward.points !== undefined && (
                <View style={styles.rewardDivider} />
              )}
              {event.reward.points !== undefined && (
                <View style={styles.rewardItem}>
                  <Text style={styles.rewardIcon}>⭐</Text>
                  <View>
                    <Text style={styles.rewardAmount}>+{event.reward.points}</Text>
                    <Text style={styles.rewardType}>
                      {isTamil ? 'புள்ளிகள்' : 'Points'}
                    </Text>
                  </View>
                </View>
              )}
              {event.reward.badgeIcon && (
                <View style={styles.rewardItem}>
                  <Text style={styles.rewardIcon}>{event.reward.badgeIcon}</Text>
                </View>
              )}
              {event.reward.certificateTitle && (
                <Text style={styles.certificateTitle}>{event.reward.certificateTitle}</Text>
              )}
              {event.reward.collectionName && (
                <Text style={styles.collectionName}>{event.reward.collectionName}</Text>
              )}
            </View>
          </Animated.View>
        )}

        {/* CTA Buttons */}
        <View style={styles.ctaContainer}>
          {secondaryLabel && event.secondaryActionRoute && (
            <TouchableOpacity
              style={styles.secondaryCta}
              onPress={handleSecondary}
              activeOpacity={0.85}
              accessibilityRole="button"
              accessibilityLabel={secondaryLabel}
            >
              <Text style={styles.secondaryCtaText}>{secondaryLabel}</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={[styles.primaryCta, !secondaryLabel && styles.primaryCtaFull]}
            onPress={handleContinue}
            activeOpacity={0.85}
            accessibilityRole="button"
            accessibilityLabel={continueLabel}
          >
            <Text style={styles.primaryCtaText}>{continueLabel}</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </Modal>
  );
};

// ============================================================================
// Translation Helper
// ============================================================================

function getTranslatedText(key: string, t: Record<string, unknown>, isTamil: boolean): string {
  const parts = key.split('.');
  let current: unknown = t;
  for (const part of parts) {
    if (current && typeof current === 'object' && part in current) {
      current = (current as Record<string, unknown>)[part];
    } else {
      return key;
    }
  }
  return typeof current === 'string' ? current : key;
}

// ============================================================================
// Styles
// ============================================================================

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: theme.colors.black,
  },
  overlayTouchable: {
    ...StyleSheet.absoluteFillObject,
  },
  contentContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.xl,
  },
  iconContainer: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: theme.colors.successSurface,
    borderWidth: 2,
    borderColor: theme.colors.success,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing.lg,
  },
  iconContainerMajor: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: theme.colors.brandBadge,
    borderWidth: 3,
    borderColor: theme.colors.brandPrimary,
  },
  icon: {
    fontSize: 44,
  },
  title: {
    ...theme.typography.h2,
    fontSize: 22,
    fontWeight: '800',
    color: theme.colors.navy900,
    textAlign: 'center',
    marginBottom: 8,
  },
  titleMajor: {
    fontSize: 26,
    fontWeight: '900',
    color: theme.colors.brandPrimary,
  },
  description: {
    ...theme.typography.body,
    fontSize: 15,
    color: theme.colors.slate600,
    textAlign: 'center',
    marginBottom: theme.spacing.md,
    lineHeight: 22,
  },
  milestoneBadge: {
    backgroundColor: theme.colors.blue50,
    borderWidth: 1,
    borderColor: theme.colors.blue200,
    borderRadius: theme.borderRadius.full,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: 6,
    marginBottom: theme.spacing.md,
  },
  milestoneText: {
    ...theme.typography.caption,
    fontSize: 13,
    fontWeight: '700',
    color: theme.colors.blue700,
  },
  rewardCard: {
    width: '100%',
    maxWidth: 300,
    backgroundColor: theme.colors.brandBadge,
    borderWidth: 1,
    borderColor: theme.colors.brandBadgeBorder,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.base,
    marginBottom: theme.spacing.lg,
  },
  rewardLabel: {
    ...theme.typography.overline,
    fontSize: 10,
    fontWeight: '800',
    color: theme.colors.brandPrimary,
    letterSpacing: 1,
    textAlign: 'center',
    marginBottom: theme.spacing.xs,
  },
  rewardsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing.md,
    flexWrap: 'wrap',
  },
  rewardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  rewardIcon: {
    fontSize: 20,
  },
  rewardAmount: {
    ...theme.typography.h3,
    fontSize: 20,
    fontWeight: '800',
    color: theme.colors.navy900,
    lineHeight: 24,
  },
  rewardType: {
    ...theme.typography.caption,
    fontSize: 10,
    color: theme.colors.slate500,
  },
  rewardDivider: {
    width: 1,
    height: 32,
    backgroundColor: theme.colors.brandBadgeBorder,
  },
  certificateTitle: {
    ...theme.typography.body,
    fontSize: 13,
    fontWeight: '600',
    color: theme.colors.brandPrimary,
    textAlign: 'center',
  },
  collectionName: {
    ...theme.typography.body,
    fontSize: 13,
    fontWeight: '600',
    color: theme.colors.brandPrimary,
    textAlign: 'center',
  },
  ctaContainer: {
    width: '100%',
    maxWidth: 300,
    gap: theme.spacing.sm,
  },
  secondaryCta: {
    backgroundColor: theme.colors.gray100,
    borderWidth: 1,
    borderColor: theme.colors.border,
    paddingVertical: 14,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
  },
  secondaryCtaText: {
    ...theme.typography.button,
    fontSize: 14,
    fontWeight: '700',
    color: theme.colors.navy700,
  },
  primaryCta: {
    backgroundColor: theme.colors.actionPrimary,
    paddingVertical: 14,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
    shadowColor: theme.colors.actionPrimary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 2,
  },
  primaryCtaFull: {
    width: '100%',
  },
  primaryCtaText: {
    ...theme.typography.button,
    fontSize: 14,
    fontWeight: '800',
    color: theme.colors.textOnAction,
  },
});
