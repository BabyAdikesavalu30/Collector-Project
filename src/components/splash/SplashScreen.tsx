/**
 * SplashScreen (Screen 01 - Production Splash Screen)
 * The first visual contact with Vigyaan mobile.
 * Communicates institutional credibility, science & innovation, bilingual Tamil/English identity,
 * and seamlessly transitions to the bootstrap-resolved initial route.
 */

import React, { useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  Animated,
  Easing,
  useWindowDimensions,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { theme } from '../../theme';
import { useBootstrap } from '../../services/bootstrap/useBootstrap';
import { ScienceBackdrop } from './ScienceBackdrop';
import { InstitutionIdentity } from './InstitutionIdentity';
import { AppBrand } from './AppBrand';
import { BootStatus } from './BootStatus';

interface SplashScreenProps {
  onBootstrapComplete?: (initialRoute: string) => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onBootstrapComplete }) => {
  const insets = useSafeAreaInsets();
  const { height: windowHeight } = useWindowDimensions();
  const isSmallScreen = windowHeight < 700;

  const { status, result, isReduceMotion, retry, isReady } = useBootstrap();

  // Animation values
  const bgFade = useRef(new Animated.Value(0)).current;
  const institutionFade = useRef(new Animated.Value(0)).current;
  const institutionSlide = useRef(new Animated.Value(-12)).current;
  const brandFade = useRef(new Animated.Value(0)).current;
  const brandScale = useRef(new Animated.Value(0.94)).current;
  const bottomFade = useRef(new Animated.Value(0)).current;

  // Mount/Unmount lifecycle telemetry
  useEffect(() => {
    return () => {
    };
  }, []);

  // Staggered premium entrance choreography
  useEffect(() => {
    if (isReduceMotion) {
      bgFade.setValue(1);
      institutionFade.setValue(1);
      institutionSlide.setValue(0);
      brandFade.setValue(1);
      brandScale.setValue(1);
      bottomFade.setValue(1);
      return;
    }

    // Smooth choreographed sequence
    Animated.sequence([
      // 1. Background glow
      Animated.timing(bgFade, {
        toValue: 1,
        duration: 350,
        useNativeDriver: true,
      }),
      // 2. Institutional identity
      Animated.parallel([
        Animated.timing(institutionFade, {
          toValue: 1,
          duration: 450,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(institutionSlide, {
          toValue: 0,
          duration: 450,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      ]),
      // 3. Central Vigyaan Brand
      Animated.parallel([
        Animated.timing(brandFade, {
          toValue: 1,
          duration: 500,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(brandScale, {
          toValue: 1,
          duration: 500,
          easing: Easing.out(Easing.back(1.1)),
          useNativeDriver: true,
        }),
      ]),
      // 4. Bottom status
      Animated.timing(bottomFade, {
        toValue: 1,
        duration: 350,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
    ]).start();
  }, [isReduceMotion, bgFade, institutionFade, institutionSlide, brandFade, brandScale, bottomFade]);

  // Handle bootstrap completion transition
  useEffect(() => {
    if (isReady && result?.initialRoute) {
      const timer = setTimeout(() => {
        onBootstrapComplete?.(result.initialRoute);
      }, 250);
      return () => clearTimeout(timer);
    }
  }, [isReady, result, onBootstrapComplete]);

  return (
    <View style={styles.container}>
      <StatusBar style="light" translucent backgroundColor="transparent" />

      {/* Ambient Science Background */}
      <ScienceBackdrop isReduceMotion={isReduceMotion} />

      {/* Main Content Layout */}
      <View
        style={[
          styles.contentWrapper,
          {
            paddingTop: Math.max(insets.top, Platform.OS === 'android' ? 24 : 16),
            paddingBottom: Math.max(insets.bottom, 24),
          },
        ]}
      >
        {/* TOP: Institutional Identity */}
        <Animated.View
          style={[
            styles.topSection,
            {
              opacity: institutionFade,
              transform: [{ translateY: institutionSlide }],
            },
          ]}
        >
          <InstitutionIdentity compact={isSmallScreen} />
        </Animated.View>

        {/* CENTER: Vigyaan Branding & Science Identity */}
        <Animated.View
          style={[
            styles.centerSection,
            {
              opacity: brandFade,
              transform: [{ scale: brandScale }],
            },
          ]}
        >
          <AppBrand compact={isSmallScreen} />
        </Animated.View>

        {/* BOTTOM: Progress / Status Treatment */}
        <Animated.View
          style={[
            styles.bottomSection,
            {
              opacity: bottomFade,
            },
          ]}
        >
          <BootStatus
            status={status}
            onRetry={retry}
            isReduceMotion={isReduceMotion}
          />
        </Animated.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.backgroundPrimary,
  },
  contentWrapper: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  topSection: {
    width: '100%',
    alignItems: 'center',
  },
  centerSection: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: theme.spacing.base,
  },
  bottomSection: {
    width: '100%',
    alignItems: 'center',
    minHeight: 52,
    justifyContent: 'center',
  },
});
