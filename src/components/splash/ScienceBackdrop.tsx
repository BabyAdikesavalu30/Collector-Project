/**
 * ScienceBackdrop Component
 * Mathematical, ambient science background featuring orbital tracks,
 * subtle cyan glows, and constellation nodes.
 * Optimized for 60fps performance and reduced-motion compliant.
 */

import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Easing, Dimensions } from 'react-native';
import { theme } from '../../theme';

interface ScienceBackdropProps {
  isReduceMotion?: boolean;
}

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export const ScienceBackdrop: React.FC<ScienceBackdropProps> = ({ isReduceMotion = false }) => {
  const spinAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(0.85)).current;

  useEffect(() => {
    if (isReduceMotion) return;

    // Gentle continuous rotation of cosmic science ring
    const spinLoop = Animated.loop(
      Animated.timing(spinAnim, {
        toValue: 1,
        duration: 32000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );

    // Subtle breathing pulse for cyan energy core
    const pulseLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.08,
          duration: 3500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 0.85,
          duration: 3500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    );

    spinLoop.start();
    pulseLoop.start();

    return () => {
      spinLoop.stop();
      pulseLoop.stop();
    };
  }, [isReduceMotion, spinAnim, pulseAnim]);

  const spin = spinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const reverseSpin = spinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['360deg', '0deg'],
  });

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      {/* Deep Space Base */}
      <View style={[StyleSheet.absoluteFill, styles.cosmicBase]} />

      {/* Top Ambient Glow Orb */}
      <Animated.View
        style={[
          styles.glowOrbTop,
          {
            transform: [{ scale: pulseAnim }],
          },
        ]}
      />

      {/* Center Science Core Glow */}
      <Animated.View
        style={[
          styles.glowOrbCenter,
          {
            transform: [{ scale: pulseAnim }],
          },
        ]}
      />

      {/* Orbital Tracks Container */}
      <View style={styles.orbitContainer}>
        {/* Outer Orbit Ring */}
        <Animated.View
          style={[
            styles.orbitRingOuter,
            {
              transform: [{ rotate: spin }],
            },
          ]}
        >
          <View style={styles.orbitalNode} />
          <View style={[styles.orbitalNode, styles.orbitalNodeOpposite]} />
        </Animated.View>

        {/* Middle Elliptical Orbit Ring */}
        <Animated.View
          style={[
            styles.orbitRingMiddle,
            {
              transform: [{ rotate: reverseSpin }],
            },
          ]}
        >
          <View style={styles.orbitalNodeSecondary} />
        </Animated.View>

        {/* Inner Atomic Orbit Ring */}
        <View style={styles.orbitRingInner} />
      </View>

      {/* Subtle Bottom Ambient Gradient Orb */}
      <View style={styles.glowOrbBottom} />
    </View>
  );
};

const styles = StyleSheet.create({
  cosmicBase: {
    backgroundColor: theme.colors.backgroundPrimary,
  },
  glowOrbTop: {
    position: 'absolute',
    top: -120,
    alignSelf: 'center',
    width: SCREEN_WIDTH * 0.95,
    height: SCREEN_WIDTH * 0.95,
    borderRadius: SCREEN_WIDTH,
    backgroundColor: 'rgba(56, 189, 248, 0.04)',
  },
  glowOrbCenter: {
    position: 'absolute',
    top: SCREEN_HEIGHT * 0.32,
    alignSelf: 'center',
    width: SCREEN_WIDTH * 0.85,
    height: SCREEN_WIDTH * 0.85,
    borderRadius: SCREEN_WIDTH,
    backgroundColor: 'rgba(129, 140, 248, 0.06)',
  },
  glowOrbBottom: {
    position: 'absolute',
    bottom: -100,
    alignSelf: 'center',
    width: SCREEN_WIDTH * 0.8,
    height: SCREEN_WIDTH * 0.8,
    borderRadius: SCREEN_WIDTH,
    backgroundColor: 'rgba(56, 189, 248, 0.03)',
  },
  orbitContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  orbitRingOuter: {
    width: SCREEN_WIDTH * 0.9,
    height: SCREEN_WIDTH * 0.9,
    borderRadius: (SCREEN_WIDTH * 0.9) / 2,
    borderWidth: 1,
    borderColor: 'rgba(56, 189, 248, 0.12)',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  orbitRingMiddle: {
    width: SCREEN_WIDTH * 0.72,
    height: SCREEN_WIDTH * 0.72,
    borderRadius: (SCREEN_WIDTH * 0.72) / 2,
    borderWidth: 1,
    borderColor: 'rgba(129, 140, 248, 0.16)',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  orbitRingInner: {
    width: SCREEN_WIDTH * 0.54,
    height: SCREEN_WIDTH * 0.54,
    borderRadius: (SCREEN_WIDTH * 0.54) / 2,
    borderWidth: 1,
    borderColor: 'rgba(56, 189, 248, 0.08)',
    position: 'absolute',
  },
  orbitalNode: {
    position: 'absolute',
    top: -4,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: theme.colors.brandPrimary,
    shadowColor: theme.colors.brandPrimary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 6,
    elevation: 3,
  },
  orbitalNodeOpposite: {
    top: undefined,
    bottom: -4,
    backgroundColor: theme.colors.accentGold,
    shadowColor: theme.colors.accentGold,
  },
  orbitalNodeSecondary: {
    position: 'absolute',
    right: -3,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: theme.colors.brandSecondary,
    shadowColor: theme.colors.brandSecondary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 2,
  },
});
