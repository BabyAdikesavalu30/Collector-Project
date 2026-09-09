/**
 * DailyGoalCompletion Component
 * Celebration view when the daily goal is completed.
 */

import React from 'react';
import { View, Text, StyleSheet, Animated, Easing, TouchableOpacity } from 'react-native';
import { theme } from '../../theme';
import { SupportedLanguage } from '../../config/i18n';
import { DailyGoalReward } from '../../features/daily-goal';

interface DailyGoalCompletionProps {
  reward: DailyGoalReward;
  language: SupportedLanguage;
  onExploreMore: () => void;
  onBackHome: () => void;
  reducedMotion?: boolean;
}

export const DailyGoalCompletion: React.FC<DailyGoalCompletionProps> = ({
  reward,
  language,
  onExploreMore,
  onBackHome,
  reducedMotion = false,
}) => {
  const isTamil = language === 'ta';
  const scaleAnim = React.useRef(new Animated.Value(0)).current;
  const opacityAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    if (reducedMotion) {
      scaleAnim.setValue(1);
      opacityAnim.setValue(1);
      return;
    }
    Animated.parallel([
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 500,
        easing: Easing.out(Easing.back(1.5)),
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  }, [reducedMotion, scaleAnim, opacityAnim]);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.celebrationIcon,
          {
            transform: [{ scale: scaleAnim }],
            opacity: opacityAnim,
          },
        ]}
      >
        <Text style={styles.icon}>🎉</Text>
      </Animated.View>

      <Animated.View style={{ opacity: opacityAnim }}>
        <Text style={styles.title}>{isTamil ? 'தின இலக்கு நிறைவேற்றப்பட்டது!' : 'DAILY GOAL COMPLETE!'}</Text>
        <Text style={styles.subtitle}>{isTamil ? 'சிறந்த வேலை!' : 'Amazing work!'}</Text>

        <View style={styles.rewardCard}>
          <Text style={styles.rewardLabel}>{isTamil ? 'வெகுமதி' : 'REWARD'}</Text>
          <View style={styles.rewardsRow}>
            <View style={styles.rewardItem}>
              <Text style={styles.rewardIcon}>⭐</Text>
              <View style={styles.rewardContent}>
                <Text style={styles.rewardAmount}>+{reward.points}</Text>
                <Text style={styles.rewardType}>{isTamil ? 'புள்ளிகள்' : 'Points'}</Text>
              </View>
            </View>
            <View style={styles.divider} />
            <View style={styles.rewardItem}>
              <Text style={styles.rewardIcon}>⚡</Text>
              <View style={styles.rewardContent}>
                <Text style={styles.rewardAmount}>+{reward.xp}</Text>
                <Text style={styles.rewardType}>{isTamil ? 'XP' : 'XP'}</Text>
              </View>
            </View>
          </View>
        </View>

        <Text style={styles.completedNote}>{isTamil ? 'இன்று நிறைவேற்றப்பட்டது' : 'Completed today'}</Text>

        <View style={styles.ctaRow}>
          <TouchableOpacity style={styles.secondaryCta} onPress={onBackHome} accessible accessibilityRole="button" activeOpacity={0.85}>
            <Text style={styles.secondaryCtaText}>{isTamil ? 'முகப்புக்குத் திரும்பு' : 'Back to Home'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.primaryCta} onPress={onExploreMore} accessible accessibilityRole="button" activeOpacity={0.85}>
            <Text style={styles.primaryCtaText}>{isTamil ? 'தொடர ஆராய்க' : 'Explore More'}</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: theme.spacing.xl,
    gap: theme.spacing.md,
  },
  celebrationIcon: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: theme.colors.successSurface,
    borderWidth: 2,
    borderColor: theme.colors.success,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontSize: 48,
  },
  title: {
    ...theme.typography.h2,
    fontSize: 24,
    fontWeight: '800',
    color: theme.colors.navy900,
    textAlign: 'center',
  },
  subtitle: {
    ...theme.typography.body,
    fontSize: 16,
    color: theme.colors.success,
    fontWeight: '700',
    textAlign: 'center',
    marginTop: 4,
  },
  rewardCard: {
    width: '100%',
    maxWidth: 320,
    backgroundColor: theme.colors.brandBadge,
    borderWidth: 1,
    borderColor: theme.colors.brandBadgeBorder,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.base,
    marginTop: theme.spacing.sm,
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
  },
  rewardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  rewardIcon: {
    fontSize: 22,
  },
  rewardContent: {},
  rewardAmount: {
    ...theme.typography.h3,
    fontSize: 22,
    fontWeight: '800',
    color: theme.colors.navy900,
    lineHeight: 26,
  },
  rewardType: {
    ...theme.typography.caption,
    fontSize: 11,
    color: theme.colors.slate500,
  },
  divider: {
    width: 1,
    height: 36,
    backgroundColor: theme.colors.brandBadgeBorder,
  },
  completedNote: {
    ...theme.typography.caption,
    fontSize: 12,
    color: theme.colors.slate500,
    textAlign: 'center',
    marginTop: theme.spacing.md,
  },
  ctaRow: {
    flexDirection: 'row',
    gap: theme.spacing.md,
    marginTop: theme.spacing.lg,
    width: '100%',
    maxWidth: 320,
  },
  secondaryCta: {
    flex: 1,
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
    flex: 1,
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
  primaryCtaText: {
    ...theme.typography.button,
    fontSize: 14,
    fontWeight: '800',
    color: theme.colors.textOnAction,
  },
});