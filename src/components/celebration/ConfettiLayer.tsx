/**
 * ConfettiLayer
 * Lightweight confetti/particle effect for major celebration events.
 * Uses React Native Animated API for performant 60fps rendering.
 * Respects reduced-motion (no particles rendered).
 * Auto-cleans up on unmount.
 */

import React, { useEffect, useRef, useMemo } from 'react';
import { View, StyleSheet, Animated, Easing, Dimensions } from 'react-native';
import { CONFETTI_COLORS, CONFETTI_CONFIG } from '../../features/celebration/celebration.config';

interface ConfettiLayerProps {
  /** Whether to show confetti. */
  visible: boolean;
  /** Whether reduced motion is enabled. */
  isReducedMotion: boolean;
  /** Duration in ms before auto-hide. */
  durationMs?: number;
}

interface Particle {
  id: number;
  color: string;
  size: number;
  initialX: number;
  initialY: number;
  rotation: Animated.Value;
  translateX: Animated.Value;
  translateY: Animated.Value;
  opacity: Animated.Value;
}

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export const ConfettiLayer: React.FC<ConfettiLayerProps> = ({
  visible,
  isReducedMotion,
  durationMs = CONFETTI_CONFIG.burstDurationMs,
}) => {
  const particlesRef = useRef<Particle[]>([]);
  const animationRefs = useRef<Animated.CompositeAnimation[]>([]);

  // Generate particles once
  const particles = useMemo(() => {
    const count = Math.min(CONFETTI_CONFIG.maxParticles, 20);
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
      size: CONFETTI_CONFIG.particleSize.min +
        Math.random() * (CONFETTI_CONFIG.particleSize.max - CONFETTI_CONFIG.particleSize.min),
      initialX: SCREEN_WIDTH * 0.3 + Math.random() * SCREEN_WIDTH * 0.4,
      initialY: -20,
      rotation: new Animated.Value(0),
      translateX: new Animated.Value(0),
      translateY: new Animated.Value(0),
      opacity: new Animated.Value(0),
    }));
  }, []);

  particlesRef.current = particles;

  useEffect(() => {
    if (!visible || isReducedMotion) {
      // Instant cleanup for reduced motion
      particles.forEach((p) => {
        p.opacity.setValue(0);
      });
      return;
    }

    // Animate each particle
    const animations: Animated.CompositeAnimation[] = [];

    particles.forEach((particle, index) => {
      const delay = index * 30; // Stagger
      const angle = (Math.random() - 0.5) * CONFETTI_CONFIG.spread * (Math.PI / 180);
      const velocity = 80 + Math.random() * 120;
      const drift = Math.sin(angle) * velocity;
      const fallDistance = 150 + Math.random() * 200;

      const anim = Animated.sequence([
        // Appear
        Animated.delay(delay),
        Animated.timing(particle.opacity, {
          toValue: 1,
          duration: 80,
          useNativeDriver: true,
        }),
        // Fall + drift + rotate
        Animated.parallel([
          Animated.timing(particle.translateX, {
            toValue: drift,
            duration: durationMs - delay,
            easing: Easing.out(Easing.quad),
            useNativeDriver: true,
          }),
          Animated.timing(particle.translateY, {
            toValue: fallDistance,
            duration: durationMs - delay,
            easing: Easing.in(Easing.quad),
            useNativeDriver: true,
          }),
          Animated.timing(particle.rotation, {
            toValue: 360 + Math.random() * 360,
            duration: durationMs - delay,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
          // Fade out
          Animated.timing(particle.opacity, {
            toValue: 0,
            duration: 300,
            delay: durationMs - delay - 300,
            useNativeDriver: true,
          }),
        ]),
      ]);

      animations.push(anim);
    });

    // Run all particle animations in parallel
    const composite = Animated.parallel(animations, { stopTogether: false });
    composite.start();
    animationRefs.current.push(composite);

    return () => {
      // Cleanup: stop all animations
      animations.forEach((anim) => {
        try { anim.stop(); } catch { /* already stopped */ }
      });
      particles.forEach((p) => {
        p.opacity.setValue(0);
        p.translateX.setValue(0);
        p.translateY.setValue(0);
        p.rotation.setValue(0);
      });
    };
  }, [visible, isReducedMotion, durationMs, particles]);

  if (!visible || isReducedMotion) return null;

  return (
    <View style={styles.container} pointerEvents="none" accessibilityElementsHidden>
      {particles.map((particle) => (
        <Animated.View
          key={particle.id}
          style={[
            styles.particle,
            {
              width: particle.size,
              height: particle.size,
              backgroundColor: particle.color,
              borderRadius: particle.size / 2,
              left: particle.initialX,
              top: particle.initialY,
              opacity: particle.opacity,
              transform: [
                { translateX: particle.translateX },
                { translateY: particle.translateY },
                {
                  rotate: particle.rotation.interpolate({
                    inputRange: [0, 360],
                    outputRange: ['0deg', '360deg'],
                  }),
                },
              ],
            },
          ]}
        />
      ))}
    </View>
  );
};

// ============================================================================
// Styles
// ============================================================================

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 999,
    elevation: 999,
  },
  particle: {
    position: 'absolute',
  },
});
