/**
 * OnboardingIllustration Component
 * Reusable, step-aware vector illustration component for onboarding.
 * - step="discover" (Screen 03): Interactive science discovery card, atom orbits, hints.
 * - step="achieve" (Screen 04): Large achievement trophy, stars, XP milestone badge, leaderboard ranking.
 * - step="grow" / "explore" (Screen 05): Cosmic planet/orbit, chemistry flask, green plant sprout, discovery riddles.
 * Fully responsive and reduced-motion compliant.
 */

import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Easing, AccessibilityProps } from 'react-native';
import { theme } from '../../theme';

export type OnboardingStepType = 'discover' | 'achieve' | 'grow' | 'explore';

interface OnboardingIllustrationProps extends AccessibilityProps {
  step?: OnboardingStepType;
  size?: number;
  isReduceMotion?: boolean;
}

export const OnboardingIllustration: React.FC<OnboardingIllustrationProps> = ({
  step = 'discover',
  size = 220,
  isReduceMotion = false,
  accessibilityLabel,
}) => {
  const floatAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(0.94)).current;
  const floatSecondaryAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isReduceMotion) return;

    // Main float animation
    const floatLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: -6,
          duration: 2800,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim, {
          toValue: 0,
          duration: 2800,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    );

    // Glowing aura pulse
    const pulseLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.05,
          duration: 2400,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 0.94,
          duration: 2400,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    );

    // Micro-badge float
    const secondaryLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(floatSecondaryAnim, {
          toValue: -4,
          duration: 2000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(floatSecondaryAnim, {
          toValue: 2,
          duration: 2000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    );

    floatLoop.start();
    pulseLoop.start();
    secondaryLoop.start();

    return () => {
      floatLoop.stop();
      pulseLoop.stop();
      secondaryLoop.stop();
    };
  }, [isReduceMotion, floatAnim, pulseAnim, floatSecondaryAnim]);

  // SCREEN 05: "GROW" / "EXPLORE" (THINK. EXPLORE. GROW.)
  if (step === 'grow' || step === 'explore') {
    const defaultLabel =
      accessibilityLabel ||
      'Science exploration illustration featuring cosmic planet, chemistry flask, and sprouting plant growth';

    return (
      <View
        style={[styles.container, { width: size, height: size * 0.95 }]}
        accessible={true}
        accessibilityRole="image"
        accessibilityLabel={defaultLabel}
      >
        {/* Emerald & Cyan Discovery Aura Glow Backdrop */}
        <Animated.View
          style={[
            styles.emeraldGlowBackdrop,
            {
              width: size * 0.88,
              height: size * 0.88,
              borderRadius: (size * 0.88) / 2,
              transform: [{ scale: isReduceMotion ? 1 : pulseAnim }],
            },
          ]}
        />

        {/* Outer Planetary Orbit Ring */}
        <View
          style={[
            styles.planetOrbitRing,
            {
              width: size * 0.94,
              height: size * 0.58,
              borderRadius: (size * 0.94) / 2,
              transform: [{ rotate: '-20deg' }],
            },
          ]}
        >
          <View style={styles.orbitPlanetNode} />
          <View style={styles.orbitPlantNode} />
        </View>

        {/* Central Science Exploration Cluster */}
        <Animated.View
          style={[
            styles.explorationCluster,
            {
              width: size * 0.76,
              height: size * 0.72,
              transform: [{ translateY: isReduceMotion ? 0 : floatAnim }],
            },
          ]}
        >
          {/* Top Cosmic Planet Motif */}
          <View style={styles.cosmicPlanetContainer}>
            <View style={styles.cosmicPlanet}>
              <View style={styles.planetCrater} />
              <View style={styles.planetRingStrap} />
            </View>
          </View>

          {/* Center Card: Chemistry Flask & Sprout Lab */}
          <View style={styles.labCardContainer}>
            {/* Left: Chemistry Flask */}
            <View style={styles.flaskContainer}>
              <View style={styles.flaskNeck} />
              <View style={styles.flaskBody}>
                <Text style={styles.flaskGlyph}>🧪</Text>
                <View style={styles.flaskBubble} />
              </View>
            </View>

            {/* Center Science Atom Spark */}
            <View style={styles.centerSparkContainer}>
              <Text style={styles.sparkleIcon}>✦</Text>
              <Text style={styles.quantumMiniText}>EXPLORE</Text>
            </View>

            {/* Right: Sprouting Plant Bio-Growth */}
            <View style={styles.sproutContainer}>
              <View style={styles.sproutSoilPill}>
                <Text style={styles.sproutGlyph}>🌱</Text>
              </View>
              <Text style={styles.growTag}>GROW</Text>
            </View>
          </View>
        </Animated.View>

        {/* Floating Riddle / Escape Room Badge (Left) */}
        <Animated.View
          style={[
            styles.floatingRiddleBadge,
            {
              transform: [{ translateY: isReduceMotion ? 0 : floatSecondaryAnim }],
            },
          ]}
        >
          <Text style={styles.riddleIcon}>🧩</Text>
          <Text style={styles.riddleText}>Riddles & Quests</Text>
        </Animated.View>

        {/* Floating Spin Wheel / Fun Facts Badge (Right) */}
        <Animated.View
          style={[
            styles.floatingSpinBadge,
            {
              transform: [{ translateY: isReduceMotion ? 0 : floatSecondaryAnim }],
            },
          ]}
        >
          <Text style={styles.spinIcon}>🎡</Text>
          <Text style={styles.spinText}>Spin & Escape</Text>
        </Animated.View>

        {/* Celebration Sparkles */}
        <View style={styles.sparkleTopRightGrow}>
          <Text style={styles.sparkleEmerald}>✦</Text>
        </View>
        <View style={styles.sparkleBottomLeftGrow}>
          <Text style={styles.sparkleCyanGrow}>✧</Text>
        </View>
      </View>
    );
  }

  // SCREEN 04: "ACHIEVE" / EARN & ACHIEVE ILLUSTRATION
  if (step === 'achieve') {
    const defaultLabel =
      accessibilityLabel ||
      'Achievement celebration illustration featuring golden trophy, stars, XP milestone badge, and leaderboard ranking';

    return (
      <View
        style={[styles.container, { width: size, height: size * 0.95 }]}
        accessible={true}
        accessibilityRole="image"
        accessibilityLabel={defaultLabel}
      >
        {/* Golden Aura Glow Backdrop */}
        <Animated.View
          style={[
            styles.goldGlowBackdrop,
            {
              width: size * 0.86,
              height: size * 0.86,
              borderRadius: (size * 0.86) / 2,
              transform: [{ scale: isReduceMotion ? 1 : pulseAnim }],
            },
          ]}
        />

        {/* Orbit Track with Golden Stars */}
        <View
          style={[
            styles.trophyOrbitRing,
            {
              width: size * 0.94,
              height: size * 0.58,
              borderRadius: (size * 0.94) / 2,
              transform: [{ rotate: '-15deg' }],
            },
          ]}
        >
          <View style={styles.starOrbitNode} />
          <View style={[styles.starOrbitNode, styles.starOrbitNodeOpposite]} />
        </View>

        {/* Main Golden Trophy Sculpture */}
        <Animated.View
          style={[
            styles.trophyContainer,
            {
              width: size * 0.65,
              height: size * 0.72,
              transform: [{ translateY: isReduceMotion ? 0 : floatAnim }],
            },
          ]}
        >
          {/* Trophy Top Crown / Laurel */}
          <View style={styles.trophyCrown}>
            <Text style={styles.trophyCrownStar}>★</Text>
          </View>

          {/* Trophy Cup Body */}
          <View style={styles.trophyCup}>
            {/* Left & Right Handles */}
            <View style={[styles.trophyHandle, styles.trophyHandleLeft]} />
            <View style={[styles.trophyHandle, styles.trophyHandleRight]} />

            {/* Inner Cup Shimmer */}
            <View style={styles.trophyCupInner}>
              <Text style={styles.trophyEmblemGlyph}>🏆</Text>
              <View style={styles.starCluster}>
                <Text style={styles.smallStar}>★</Text>
                <Text style={[styles.smallStar, styles.smallStarCenter]}>★</Text>
                <Text style={styles.smallStar}>★</Text>
              </View>
            </View>
          </View>

          {/* Trophy Stem & Pedestal Base */}
          <View style={styles.trophyStem} />
          <View style={styles.trophyPedestal}>
            <Text style={styles.pedestalText}>SCIENCE ACHIEVER</Text>
          </View>
        </Animated.View>

        {/* Floating XP Reward Badge (Left) */}
        <Animated.View
          style={[
            styles.floatingXpBadge,
            {
              transform: [{ translateY: isReduceMotion ? 0 : floatSecondaryAnim }],
            },
          ]}
        >
          <Text style={styles.xpBolt}>⚡</Text>
          <Text style={styles.xpText}>+500 XP</Text>
        </Animated.View>

        {/* Floating Rank Badge (Right) */}
        <Animated.View
          style={[
            styles.floatingRankBadge,
            {
              transform: [{ translateY: isReduceMotion ? 0 : floatSecondaryAnim }],
            },
          ]}
        >
          <Text style={styles.rankCrown}>👑</Text>
          <Text style={styles.rankText}>#1 Top Rank</Text>
        </Animated.View>

        {/* Celebration Sparkles */}
        <View style={styles.sparkleTopLeft}>
          <Text style={styles.sparkleGold}>✦</Text>
        </View>
        <View style={styles.sparkleBottomRight}>
          <Text style={styles.sparkleCyan}>✧</Text>
        </View>
      </View>
    );
  }

  // SCREEN 03: "DISCOVER" / LEARN INTERACTIVELY ILLUSTRATION
  const defaultDiscoverLabel =
    accessibilityLabel ||
    'Illustration of a student exploring science through interactive questions and instant hints';

  return (
    <View
      style={[styles.container, { width: size, height: size * 0.95 }]}
      accessible={true}
      accessibilityRole="image"
      accessibilityLabel={defaultDiscoverLabel}
    >
      {/* Background Radial Glow */}
      <Animated.View
        style={[
          styles.glowBackdrop,
          {
            width: size * 0.85,
            height: size * 0.85,
            borderRadius: (size * 0.85) / 2,
            transform: [{ scale: isReduceMotion ? 1 : pulseAnim }],
          },
        ]}
      />

      {/* Orbit Track 1 */}
      <View
        style={[
          styles.orbitRing,
          {
            width: size * 0.9,
            height: size * 0.55,
            borderRadius: (size * 0.9) / 2,
            transform: [{ rotate: '-25deg' }],
          },
        ]}
      >
        <View style={styles.orbitNodeTop} />
      </View>

      {/* Main Interactive Discovery Slate Card */}
      <Animated.View
        style={[
          styles.interactiveCard,
          {
            width: size * 0.76,
            height: size * 0.68,
            transform: [{ translateY: isReduceMotion ? 0 : floatAnim }],
          },
        ]}
      >
        {/* Card Header: Live Science Quiz Tag */}
        <View style={styles.cardHeader}>
          <View style={styles.scienceBadge}>
            <Text style={styles.scienceBadgeText}>🔬 SCIENCE QUIZ</Text>
          </View>
          <View style={styles.liveIndicator}>
            <View style={styles.liveDot} />
            <Text style={styles.liveText}>INTERACTIVE</Text>
          </View>
        </View>

        {/* Center Science Atom / Discovery Icon */}
        <View style={styles.atomContainer}>
          <View style={styles.atomCore}>
            <Text style={styles.atomGlyph}>⚛</Text>
          </View>
          <View style={styles.discoveryBeams}>
            <Text style={styles.questionText}>What powers atomic bonding?</Text>
          </View>
        </View>

        {/* Real-time Feedback Pill */}
        <View style={styles.feedbackPill}>
          <View style={styles.checkIcon}>
            <Text style={styles.checkGlyph}>✓</Text>
          </View>
          <Text style={styles.feedbackText}>Instant Feedback & Clues</Text>
        </View>
      </Animated.View>

      {/* Floating Interactive Hint Tag */}
      <Animated.View
        style={[
          styles.floatingHintBadge,
          {
            transform: [{ translateY: isReduceMotion ? 0 : floatSecondaryAnim }],
          },
        ]}
      >
        <Text style={styles.hintIcon}>💡</Text>
        <Text style={styles.hintText}>Smart Hint Ready</Text>
      </Animated.View>

      {/* Floating Sparkle Stars */}
      <View style={styles.sparkleTopRight}>
        <Text style={styles.sparkleText}>✦</Text>
      </View>
      <View style={styles.sparkleBottomLeft}>
        <Text style={styles.sparkleTextSmall}>✧</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  glowBackdrop: {
    position: 'absolute',
    backgroundColor: 'rgba(37, 99, 235, 0.08)',
    shadowColor: theme.colors.brandPrimary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 28,
  },
  goldGlowBackdrop: {
    position: 'absolute',
    backgroundColor: 'rgba(217, 119, 6, 0.10)',
    shadowColor: theme.colors.accentGold,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 32,
  },
  emeraldGlowBackdrop: {
    position: 'absolute',
    backgroundColor: 'rgba(22, 163, 74, 0.08)',
    shadowColor: theme.colors.success,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 32,
  },
  orbitRing: {
    position: 'absolute',
    borderWidth: 1.5,
    borderColor: 'rgba(37, 99, 235, 0.18)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  trophyOrbitRing: {
    position: 'absolute',
    borderWidth: 1.5,
    borderColor: 'rgba(217, 119, 6, 0.22)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  planetOrbitRing: {
    position: 'absolute',
    borderWidth: 1.5,
    borderColor: 'rgba(22, 163, 74, 0.20)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  orbitNodeTop: {
    position: 'absolute',
    top: -4,
    right: 32,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: theme.colors.accentGold,
    shadowColor: theme.colors.accentGold,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 4,
  },
  starOrbitNode: {
    position: 'absolute',
    top: -4,
    left: 28,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: theme.colors.accentGold,
    shadowColor: theme.colors.accentGold,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 4,
  },
  starOrbitNodeOpposite: {
    left: undefined,
    right: 28,
    bottom: -4,
    top: undefined,
    backgroundColor: theme.colors.brandPrimary,
    shadowColor: theme.colors.brandPrimary,
  },
  orbitPlanetNode: {
    position: 'absolute',
    top: -5,
    left: 24,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: theme.colors.brandPrimary,
    shadowColor: theme.colors.brandPrimary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 4,
  },
  orbitPlantNode: {
    position: 'absolute',
    bottom: -5,
    right: 24,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: theme.colors.success,
    shadowColor: theme.colors.success,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 4,
  },
  interactiveCard: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.xl,
    borderWidth: 1.5,
    borderColor: theme.colors.blue200,
    padding: theme.spacing.md,
    justifyContent: 'space-between',
    shadowColor: theme.colors.navy900,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 18,
    elevation: 5,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  scienceBadge: {
    backgroundColor: theme.colors.purple50,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: theme.borderRadius.sm,
    borderWidth: 1,
    borderColor: theme.colors.purple200,
  },
  scienceBadgeText: {
    ...theme.typography.caption,
    fontSize: 9,
    fontWeight: '800',
    color: theme.colors.brandPrimary,
    letterSpacing: 0.5,
  },
  liveIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.green50,
    borderWidth: 1,
    borderColor: theme.colors.green200,
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: theme.borderRadius.full,
  },
  liveDot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: theme.colors.success,
    marginRight: 4,
  },
  liveText: {
    ...theme.typography.caption,
    fontSize: 8.5,
    fontWeight: '800',
    color: theme.colors.green800,
    letterSpacing: 0.4,
  },
  atomContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 4,
  },
  atomCore: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.colors.blue50,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: theme.colors.blue300,
    marginBottom: 6,
  },
  atomGlyph: {
    color: theme.colors.actionPrimary,
    fontSize: 22,
  },
  discoveryBeams: {
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  questionText: {
    ...theme.typography.caption,
    fontSize: 12,
    fontWeight: '700',
    color: theme.colors.navy900,
    textAlign: 'center',
    lineHeight: 17,
  },
  feedbackPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.green50,
    borderWidth: 1,
    borderColor: theme.colors.green200,
    paddingHorizontal: 10,
    paddingVertical: 4.5,
    borderRadius: theme.borderRadius.full,
    alignSelf: 'center',
    shadowColor: theme.colors.navy900,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 3,
    elevation: 1,
  },
  checkIcon: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: theme.colors.success,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 6,
  },
  checkGlyph: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '900',
  },
  feedbackText: {
    ...theme.typography.caption,
    fontSize: 10,
    fontWeight: '700',
    color: theme.colors.navy800,
  },
  floatingHintBadge: {
    position: 'absolute',
    top: 6,
    right: 4,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.white,
    borderWidth: 1.5,
    borderColor: theme.colors.warningBorder,
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: theme.borderRadius.full,
    shadowColor: theme.colors.navy900,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  hintIcon: {
    fontSize: 12,
    marginRight: 4,
  },
  hintText: {
    ...theme.typography.caption,
    fontSize: 10,
    fontWeight: '800',
    color: theme.colors.textGold,
  },
  sparkleTopRight: {
    position: 'absolute',
    top: 14,
    left: 10,
  },
  sparkleText: {
    color: theme.colors.brandPrimary,
    fontSize: 14,
    opacity: 0.7,
  },
  sparkleBottomLeft: {
    position: 'absolute',
    bottom: 10,
    right: 14,
  },
  sparkleTextSmall: {
    color: theme.colors.actionPrimary,
    fontSize: 12,
    opacity: 0.6,
  },
  /* TROPHY / ACHIEVE STYLES */
  trophyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  trophyCrown: {
    marginBottom: -4,
    zIndex: 2,
  },
  trophyCrownStar: {
    color: theme.colors.accentGold,
    fontSize: 14,
    textShadowColor: 'rgba(245, 158, 11, 0.4)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 6,
  },
  trophyCup: {
    width: '78%',
    height: 82,
    backgroundColor: 'rgba(254, 243, 199, 0.7)',
    borderWidth: 2,
    borderColor: theme.colors.accentGold,
    borderRadius: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: theme.colors.navy900,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
  },
  trophyHandle: {
    position: 'absolute',
    top: 12,
    width: 22,
    height: 42,
    borderRadius: 11,
    borderWidth: 2.5,
    borderColor: theme.colors.accentGold,
    backgroundColor: 'transparent',
  },
  trophyHandleLeft: {
    left: -14,
    borderRightWidth: 0,
  },
  trophyHandleRight: {
    right: -14,
    borderLeftWidth: 0,
  },
  trophyCupInner: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  trophyEmblemGlyph: {
    fontSize: 28,
  },
  starCluster: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    marginTop: 2,
  },
  smallStar: {
    color: theme.colors.accentGold,
    fontSize: 8,
  },
  smallStarCenter: {
    fontSize: 11,
    marginTop: -2,
  },
  trophyStem: {
    width: 14,
    height: 18,
    backgroundColor: theme.colors.accentGold,
    borderRadius: 2,
  },
  trophyPedestal: {
    backgroundColor: theme.colors.navy900,
    borderWidth: 1.5,
    borderColor: theme.colors.accentGold,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: theme.borderRadius.sm,
    shadowColor: theme.colors.navy900,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },
  pedestalText: {
    ...theme.typography.overline,
    fontSize: 8.5,
    fontWeight: '900',
    color: '#FEF3C7',
    letterSpacing: 1,
  },
  floatingXpBadge: {
    position: 'absolute',
    top: 14,
    left: -2,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.white,
    borderWidth: 1.5,
    borderColor: theme.colors.purple200,
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: theme.borderRadius.full,
    shadowColor: theme.colors.navy900,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  xpBolt: {
    fontSize: 11,
    marginRight: 4,
  },
  xpText: {
    ...theme.typography.caption,
    fontSize: 10,
    fontWeight: '800',
    color: theme.colors.brandPrimary,
  },
  floatingRankBadge: {
    position: 'absolute',
    top: 24,
    right: -2,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.white,
    borderWidth: 1.5,
    borderColor: theme.colors.warningBorder,
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: theme.borderRadius.full,
    shadowColor: theme.colors.navy900,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  rankCrown: {
    fontSize: 11,
    marginRight: 4,
  },
  rankText: {
    ...theme.typography.caption,
    fontSize: 10,
    fontWeight: '800',
    color: theme.colors.textGold,
  },
  sparkleTopLeft: {
    position: 'absolute',
    top: 8,
    left: 20,
  },
  sparkleGold: {
    color: theme.colors.accentGold,
    fontSize: 15,
    opacity: 0.75,
  },
  sparkleBottomRight: {
    position: 'absolute',
    bottom: 8,
    right: 18,
  },
  sparkleCyan: {
    color: theme.colors.actionPrimary,
    fontSize: 13,
    opacity: 0.7,
  },
  /* EXPLORE / GROW STYLES (SCREEN 05) */
  explorationCluster: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  cosmicPlanetContainer: {
    alignItems: 'center',
    marginBottom: -10,
    zIndex: 2,
  },
  cosmicPlanet: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: theme.colors.purple100,
    borderWidth: 1.5,
    borderColor: theme.colors.brandPrimary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: theme.colors.brandPrimary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
  },
  planetCrater: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    position: 'absolute',
    top: 10,
    left: 12,
  },
  planetRingStrap: {
    width: 58,
    height: 14,
    borderRadius: 7,
    borderWidth: 1.5,
    borderColor: theme.colors.actionPrimary,
    transform: [{ rotate: '-25deg' }],
  },
  labCardContainer: {
    width: '100%',
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.xl,
    borderWidth: 1.5,
    borderColor: theme.colors.green200,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: theme.colors.navy900,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 18,
    elevation: 5,
  },
  flaskContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  flaskNeck: {
    width: 10,
    height: 6,
    borderWidth: 1,
    borderColor: theme.colors.actionPrimary,
    borderBottomWidth: 0,
    borderTopLeftRadius: 2,
    borderTopRightRadius: 2,
    marginBottom: -1,
  },
  flaskBody: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: theme.colors.blue50,
    borderWidth: 1.5,
    borderColor: theme.colors.blue300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flaskGlyph: {
    fontSize: 18,
  },
  flaskBubble: {
    position: 'absolute',
    top: 4,
    right: 6,
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: theme.colors.actionPrimary,
  },
  centerSparkContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  sparkleIcon: {
    color: theme.colors.accentGold,
    fontSize: 22,
  },
  quantumMiniText: {
    ...theme.typography.overline,
    fontSize: 8.5,
    fontWeight: '900',
    color: theme.colors.brandPrimary,
    letterSpacing: 1.2,
    marginTop: 2,
  },
  sproutContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  sproutSoilPill: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: theme.colors.green50,
    borderWidth: 1.5,
    borderColor: theme.colors.green300,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 2,
  },
  sproutGlyph: {
    fontSize: 18,
  },
  growTag: {
    ...theme.typography.caption,
    fontSize: 8.5,
    fontWeight: '900',
    color: theme.colors.green800,
    letterSpacing: 0.5,
  },
  floatingRiddleBadge: {
    position: 'absolute',
    top: 14,
    left: -4,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.white,
    borderWidth: 1.5,
    borderColor: theme.colors.purple200,
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: theme.borderRadius.full,
    shadowColor: theme.colors.navy900,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  riddleIcon: {
    fontSize: 11,
    marginRight: 4,
  },
  riddleText: {
    ...theme.typography.caption,
    fontSize: 10,
    fontWeight: '800',
    color: theme.colors.brandPrimary,
  },
  floatingSpinBadge: {
    position: 'absolute',
    top: 22,
    right: -4,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.white,
    borderWidth: 1.5,
    borderColor: theme.colors.warningBorder,
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: theme.borderRadius.full,
    shadowColor: theme.colors.navy900,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  spinIcon: {
    fontSize: 11,
    marginRight: 4,
  },
  spinText: {
    ...theme.typography.caption,
    fontSize: 10,
    fontWeight: '800',
    color: theme.colors.textGold,
  },
  sparkleTopRightGrow: {
    position: 'absolute',
    top: 6,
    right: 20,
  },
  sparkleEmerald: {
    color: theme.colors.success,
    fontSize: 15,
    opacity: 0.75,
  },
  sparkleBottomLeftGrow: {
    position: 'absolute',
    bottom: 8,
    left: 18,
  },
  sparkleCyanGrow: {
    color: theme.colors.actionPrimary,
    fontSize: 13,
    opacity: 0.7,
  },
});
