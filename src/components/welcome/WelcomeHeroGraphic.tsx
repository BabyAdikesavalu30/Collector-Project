/**
 * WelcomeHeroGraphic Component
 * Dedicated "Science Discovery" hero visual for Screen 02.
 * Pure React Native vector illustration featuring an illuminated cosmic discovery core,
 * atom tracks, energy nodes, and orbital particles.
 * Fully responsive and reduced-motion compliant.
 */

import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Easing, AccessibilityProps } from 'react-native';
import { theme } from '../../theme';

interface WelcomeHeroGraphicProps extends AccessibilityProps {
  size?: number;
  isReduceMotion?: boolean;
}

export const WelcomeHeroGraphic: React.FC<WelcomeHeroGraphicProps> = ({
  size = 180,
  isReduceMotion = false,
  accessibilityLabel = 'Science discovery illustration featuring atomic orbits and cosmic discovery lens',
}) => {
  const floatAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(0.92)).current;
  const orbitAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isReduceMotion) return;

    // Gentle vertical floating motion
    const floatLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: -8,
          duration: 2600,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim, {
          toValue: 0,
          duration: 2600,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    );

    // Glowing core pulse
    const pulseLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.06,
          duration: 2200,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 0.92,
          duration: 2200,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    );

    // Slow orbital rotation
    const orbitLoop = Animated.loop(
      Animated.timing(orbitAnim, {
        toValue: 1,
        duration: 24000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );

    floatLoop.start();
    pulseLoop.start();
    orbitLoop.start();

    return () => {
      floatLoop.stop();
      pulseLoop.stop();
      orbitLoop.stop();
    };
  }, [isReduceMotion, floatAnim, pulseAnim, orbitAnim]);

  const rotate = orbitAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const reverseRotate = orbitAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['360deg', '0deg'],
  });

  return (
    <Animated.View
      style={[
        styles.container,
        {
          width: size,
          height: size,
          transform: [{ translateY: isReduceMotion ? 0 : floatAnim }],
        },
      ]}
      accessible={true}
      accessibilityRole="image"
      accessibilityLabel={accessibilityLabel}
    >
      {/* Outer Cyan Halo Glow */}
      <Animated.View
        style={[
          styles.glowBackdrop,
          {
            width: size * 0.9,
            height: size * 0.9,
            borderRadius: (size * 0.9) / 2,
            transform: [{ scale: isReduceMotion ? 1 : pulseAnim }],
          },
        ]}
      />

      {/* Outer Orbital Orbit Ring */}
      <Animated.View
        style={[
          styles.outerRing,
          {
            width: size * 0.94,
            height: size * 0.94,
            borderRadius: (size * 0.94) / 2,
            transform: [{ rotate: isReduceMotion ? '0deg' : rotate }],
          },
        ]}
      >
        <View style={styles.electronTop} />
        <View style={styles.electronBottom} />
      </Animated.View>

      {/* Middle Quantum Elliptical Track */}
      <Animated.View
        style={[
          styles.middleRing,
          {
            width: size * 0.78,
            height: size * 0.78,
            borderRadius: (size * 0.78) / 2,
            transform: [{ rotate: isReduceMotion ? '0deg' : reverseRotate }],
          },
        ]}
      >
        <View style={styles.electronRight} />
      </Animated.View>

      {/* Central Science Discovery Core Capsule */}
      <View
        style={[
          styles.coreCapsule,
          {
            width: size * 0.52,
            height: size * 0.52,
            borderRadius: (size * 0.52) / 2,
          },
        ]}
      >
        {/* Prismatic Bevel Border */}
        <View
          style={[
            styles.coreInner,
            {
              borderRadius: (size * 0.52) / 2,
            },
          ]}
        >
          {/* Science Atom Nucleus Icon */}
          <Text style={[styles.scienceGlyph, { fontSize: Math.round(size * 0.22) }]}>⚛</Text>

          {/* Golden Discovery Sparkle */}
          <View style={styles.sparkleBadge}>
            <Text style={styles.sparkleGlyph}>✦</Text>
          </View>
        </View>
      </View>

      {/* Constellation Star Accents */}
      <View style={[styles.starAccent, styles.starTopRight]}>
        <Text style={styles.starText}>✧</Text>
      </View>
      <View style={[styles.starAccent, styles.starBottomLeft]}>
        <Text style={styles.starTextSmall}>✦</Text>
      </View>
    </Animated.View>
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
  outerRing: {
    position: 'absolute',
    borderWidth: 1.5,
    borderColor: 'rgba(37, 99, 235, 0.20)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  middleRing: {
    position: 'absolute',
    borderWidth: 1,
    borderColor: 'rgba(126, 34, 206, 0.20)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  electronTop: {
    position: 'absolute',
    top: -4,
    width: 9,
    height: 9,
    borderRadius: 4.5,
    backgroundColor: theme.colors.brandPrimary,
    shadowColor: theme.colors.brandPrimary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 4,
    elevation: 2,
  },
  electronBottom: {
    position: 'absolute',
    bottom: -4,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: theme.colors.accentGold,
    shadowColor: theme.colors.accentGold,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 4,
  },
  electronRight: {
    position: 'absolute',
    right: -4,
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: theme.colors.actionPrimary,
  },
  coreCapsule: {
    backgroundColor: theme.colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: theme.colors.blue200,
    shadowColor: theme.colors.navy900,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 5,
    padding: 3,
  },
  coreInner: {
    flex: 1,
    width: '100%',
    backgroundColor: theme.colors.blue50,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.blue100,
  },
  scienceGlyph: {
    color: theme.colors.actionPrimary,
    textShadowColor: 'rgba(37, 99, 235, 0.25)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 6,
  },
  sparkleBadge: {
    position: 'absolute',
    top: 4,
    right: 6,
  },
  sparkleGlyph: {
    color: theme.colors.accentGold,
    fontSize: 10,
  },
  starAccent: {
    position: 'absolute',
  },
  starTopRight: {
    top: 6,
    right: 12,
  },
  starBottomLeft: {
    bottom: 12,
    left: 10,
  },
  starText: {
    color: theme.colors.brandPrimary,
    fontSize: 16,
    opacity: 0.7,
  },
  starTextSmall: {
    color: theme.colors.accentGold,
    fontSize: 12,
    opacity: 0.7,
  },
});
