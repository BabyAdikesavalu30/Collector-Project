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

  // SCREEN 03: "DISCOVER" / LEARN INTERACTIVELY HERO ILLUSTRATION
  const defaultDiscoverLabel =
    accessibilityLabel ||
    'Science learning illustration featuring central atomic orbital nucleus, laboratory experiment motifs, and interactive learning clues';

  return (
    <View
      style={[styles.container, { width: size, height: size * 0.95 }]}
      accessible={true}
      accessibilityRole="image"
      accessibilityLabel={defaultDiscoverLabel}
    >
      {/* Royal Blue & Purple Science Aura Glow Backdrop */}
      <Animated.View
        style={[
          styles.glowBackdrop,
          {
            width: size * 0.88,
            height: size * 0.88,
            borderRadius: (size * 0.88) / 2,
            transform: [{ scale: isReduceMotion ? 1 : pulseAnim }],
          },
        ]}
      />

      {/* Outer Quantum Orbit Ring */}
      <View
        style={[
          styles.orbitRing,
          {
            width: size * 0.94,
            height: size * 0.58,
            borderRadius: (size * 0.94) / 2,
            transform: [{ rotate: '-20deg' }],
          },
        ]}
      >
        <View style={styles.orbitNodeTop} />
        <View style={styles.orbitNodeBottomDiscover} />
      </View>

      {/* Central Interactive Science Hero Cluster */}
      <Animated.View
        style={[
          styles.scienceHeroCluster,
          {
            width: size * 0.76,
            height: size * 0.72,
            transform: [{ translateY: isReduceMotion ? 0 : floatAnim }],
          },
        ]}
      >
        {/* Top Orbit Atom Insignia */}
        <View style={styles.atomHeroHead}>
          <View style={styles.atomRingDiagonalLeft} />
          <View style={styles.atomRingDiagonalRight} />
          <View style={styles.atomHeroCore}>
            <Text style={styles.atomHeroGlyph}>⚛</Text>
          </View>
        </View>

        {/* Center Science Experiment & Discovery Pod */}
        <View style={styles.sciencePodCard}>
          {/* Left Lab Motif: Microscope & Beaker */}
          <View style={styles.podItem}>
            <View style={styles.podIconCircle}>
              <Text style={styles.podIconGlyph}>🔬</Text>
            </View>
            <Text style={styles.podItemLabel}>DISCOVER</Text>
          </View>

          {/* Center Connection Bridge */}
          <View style={styles.podBridge}>
            <View style={styles.bridgeLine} />
            <Text style={styles.bridgeSparkle}>✦</Text>
            <View style={styles.bridgeLine} />
          </View>

          {/* Right Lab Motif: Molecule & Formula */}
          <View style={styles.podItem}>
            <View style={[styles.podIconCircle, styles.podIconCirclePurple]}>
              <Text style={styles.podIconGlyph}>🧪</Text>
            </View>
            <Text style={[styles.podItemLabel, styles.podItemLabelPurple]}>INTERACT</Text>
          </View>
        </View>

        {/* Hero Pedestal Badge */}
        <View style={styles.heroPedestalPill}>
          <View style={styles.heroPedestalDot} />
          <Text style={styles.heroPedestalText}>SCIENCE LEARNING</Text>
        </View>
      </Animated.View>

      {/* Floating Smart Clues Badge (Left) */}
      <Animated.View
        style={[
          styles.floatingHintBadge,
          {
            transform: [{ translateY: isReduceMotion ? 0 : floatSecondaryAnim }],
          },
        ]}
      >
        <Text style={styles.hintIcon}>💡</Text>
        <Text style={styles.hintText}>Instant Clues</Text>
      </Animated.View>

      {/* Floating Active Practice Badge (Right) */}
      <Animated.View
        style={[
          styles.floatingScienceBadge,
          {
            transform: [{ translateY: isReduceMotion ? 0 : floatSecondaryAnim }],
          },
        ]}
      >
        <Text style={styles.scienceBadgeGlyph}>⚡</Text>
        <Text style={styles.scienceBadgeTextRight}>Interactive</Text>
      </Animated.View>

      {/* Celebration Sparkles */}
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
  orbitNodeBottomDiscover: {
    position: 'absolute',
    bottom: -4,
    left: 28,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: theme.colors.brandPrimary,
    shadowColor: theme.colors.brandPrimary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 4,
  },
  scienceHeroCluster: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  atomHeroHead: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: -12,
    zIndex: 2,
  },
  atomRingDiagonalLeft: {
    position: 'absolute',
    width: 56,
    height: 24,
    borderRadius: 28,
    borderWidth: 1.5,
    borderColor: 'rgba(37, 99, 235, 0.4)',
    transform: [{ rotate: '35deg' }],
  },
  atomRingDiagonalRight: {
    position: 'absolute',
    width: 56,
    height: 24,
    borderRadius: 28,
    borderWidth: 1.5,
    borderColor: 'rgba(126, 34, 206, 0.4)',
    transform: [{ rotate: '-35deg' }],
  },
  atomHeroCore: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: theme.colors.blue50,
    borderWidth: 1.5,
    borderColor: theme.colors.actionPrimary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: theme.colors.actionPrimary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 3,
  },
  atomHeroGlyph: {
    color: theme.colors.actionPrimary,
    fontSize: 16,
    fontWeight: '800',
  },
  sciencePodCard: {
    width: '92%',
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.xl,
    borderWidth: 1.5,
    borderColor: theme.colors.blue200,
    paddingVertical: 14,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    shadowColor: theme.colors.navy900,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 14,
    elevation: 4,
  },
  podItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  podIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: theme.colors.blue50,
    borderWidth: 1,
    borderColor: theme.colors.blue200,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  podIconCirclePurple: {
    backgroundColor: theme.colors.purple50,
    borderColor: theme.colors.purple200,
  },
  podIconGlyph: {
    fontSize: 22,
  },
  podItemLabel: {
    ...theme.typography.overline,
    fontSize: 9,
    color: theme.colors.actionPrimary,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
  podItemLabelPurple: {
    color: theme.colors.brandPrimary,
  },
  podBridge: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  bridgeLine: {
    width: 20,
    height: 1.5,
    backgroundColor: theme.colors.gray300,
  },
  bridgeSparkle: {
    color: theme.colors.accentGold,
    fontSize: 12,
    marginVertical: 2,
  },
  heroPedestalPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.white,
    borderWidth: 1,
    borderColor: theme.colors.border,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: theme.borderRadius.full,
    marginTop: -8,
    shadowColor: theme.colors.navy900,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
    zIndex: 2,
  },
  heroPedestalDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: theme.colors.actionPrimary,
    marginRight: 6,
  },
  heroPedestalText: {
    ...theme.typography.overline,
    fontSize: 9,
    color: theme.colors.navy900,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
  floatingHintBadge: {
    position: 'absolute',
    top: 10,
    left: 4,
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
  floatingScienceBadge: {
    position: 'absolute',
    top: 10,
    right: 4,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.white,
    borderWidth: 1.5,
    borderColor: theme.colors.blue200,
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: theme.borderRadius.full,
    shadowColor: theme.colors.navy900,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  scienceBadgeGlyph: {
    fontSize: 12,
    marginRight: 4,
  },
  scienceBadgeTextRight: {
    ...theme.typography.caption,
    fontSize: 10,
    fontWeight: '800',
    color: theme.colors.actionPrimary,
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
