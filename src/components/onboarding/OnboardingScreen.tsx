/**
 * OnboardingScreen Component
 * Reusable multi-step onboarding screen supporting:
 * - step 1: Discover / Learn Interactively (Screen 03)
 * - step 2: Earn & Achieve (Screen 04)
 * - step 3: Think. Explore. Grow. (Screen 05)
 * Coordinates top Skip action, hero illustration, bilingual content,
 * step pagination indicator (● ● ○ for step 2), and primary Next CTA.
 */

import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
  Easing,
  useWindowDimensions,
  AccessibilityInfo,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { theme } from '../../theme';
import { getTranslation, SupportedLanguage } from '../../config/i18n';
import { ScienceBackdrop } from '../splash/ScienceBackdrop';
import { OnboardingIllustration } from './OnboardingIllustration';
import { OnboardingContent } from './OnboardingContent';
import { OnboardingFooter } from './OnboardingFooter';

interface OnboardingScreenProps {
  step?: 1 | 2 | 3;
  onNext: () => void;
  onSkip: () => void;
  language?: SupportedLanguage;
  onAnalyticsEvent?: (eventName: string, params?: Record<string, unknown>) => void;
}

export const OnboardingScreen: React.FC<OnboardingScreenProps> = ({
  step = 1,
  onNext,
  onSkip,
  language = 'en',
  onAnalyticsEvent,
}) => {
  const insets = useSafeAreaInsets();
  const { height: windowHeight, width: windowWidth } = useWindowDimensions();
  const isSmallScreen = windowHeight < 720;
  const t = getTranslation(language).onboarding;

  const [isReduceMotion, setIsReduceMotion] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);

  // Animation values
  const topFade = useRef(new Animated.Value(0)).current;
  const heroFade = useRef(new Animated.Value(0)).current;
  const heroScale = useRef(new Animated.Value(0.92)).current;
  const contentFade = useRef(new Animated.Value(0)).current;
  const contentSlide = useRef(new Animated.Value(14)).current;
  const footerFade = useRef(new Animated.Value(0)).current;

  // Reduced motion detection
  useEffect(() => {
    AccessibilityInfo.isReduceMotionEnabled()
      .then((enabled) => setIsReduceMotion(Boolean(enabled)))
      .catch(() => setIsReduceMotion(false));

    const subscription = AccessibilityInfo.addEventListener(
      'reduceMotionChanged',
      (enabled) => setIsReduceMotion(Boolean(enabled))
    );

    return () => {
      subscription?.remove();
    };
  }, []);

  // Telemetry
  useEffect(() => {
    const screenTag = step === 2 ? 'achieve' : step === 3 ? 'grow' : 'discover';
    onAnalyticsEvent?.('onboarding_step_viewed', { step, screen: screenTag, language });
  }, [step, language, onAnalyticsEvent]);

  // Entrance Sequence
  useEffect(() => {
    if (isReduceMotion) {
      topFade.setValue(1);
      heroFade.setValue(1);
      heroScale.setValue(1);
      contentFade.setValue(1);
      contentSlide.setValue(0);
      footerFade.setValue(1);
      return;
    }

    Animated.sequence([
      // 1. Skip button fades in
      Animated.timing(topFade, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true,
      }),
      // 2. Illustration scales & fades in
      Animated.parallel([
        Animated.timing(heroFade, {
          toValue: 1,
          duration: 350,
          useNativeDriver: true,
        }),
        Animated.timing(heroScale, {
          toValue: 1,
          duration: 350,
          easing: Easing.out(Easing.back(1.1)),
          useNativeDriver: true,
        }),
      ]),
      // 3. Content rises
      Animated.parallel([
        Animated.timing(contentFade, {
          toValue: 1,
          duration: 350,
          useNativeDriver: true,
        }),
        Animated.timing(contentSlide, {
          toValue: 0,
          duration: 350,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      ]),
      // 4. Footer actions appear
      Animated.timing(footerFade, {
        toValue: 1,
        duration: 250,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
    ]).start();
  }, [
    isReduceMotion,
    topFade,
    heroFade,
    heroScale,
    contentFade,
    contentSlide,
    footerFade,
  ]);

  const handleNext = () => {
    if (isNavigating) return;
    setIsNavigating(true);
    onAnalyticsEvent?.('onboarding_next_tapped', { step });
    onNext();
  };

  const handleSkip = () => {
    if (isNavigating) return;
    setIsNavigating(true);
    onAnalyticsEvent?.('onboarding_skip_tapped', { step });
    onSkip();
  };

  // Illustration variant
  const illustrationStep = step === 2 ? 'achieve' : step === 3 ? 'grow' : 'discover';

  // Dynamically size hero graphic based on device dimensions (~10% increase, responsive bounded)
  const heroGraphicSize = Math.min(
    Math.max(Math.round(windowWidth * 0.58), 175),
    isSmallScreen ? 180 : 235
  );

  return (
    <View style={styles.container}>
      <StatusBar style="dark" translucent backgroundColor="transparent" />

      {/* Main Layout Container */}
      <View
        style={[
          styles.mainLayout,
          {
            paddingTop: Math.max(insets.top, Platform.OS === 'android' ? 24 : 16),
            paddingBottom: Math.max(insets.bottom, 16),
          },
        ]}
      >
        {/* TOP BAR: Skip Button */}
        <Animated.View style={[styles.topBar, { opacity: topFade }]}>
          <TouchableOpacity
            style={styles.skipButton}
            onPress={handleSkip}
            activeOpacity={0.7}
            disabled={isNavigating}
            accessible={true}
            accessibilityRole="button"
            accessibilityLabel={t.skip}
            accessibilityHint={t.accessibility.skipHint}
          >
            <Text style={styles.skipText}>{t.skip}</Text>
          </TouchableOpacity>
        </Animated.View>

        {/* Scrollable Center Body */}
        <ScrollView
          style={styles.scrollBody}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          <View style={styles.mainContentGroup}>
            {/* Hero Illustration */}
            <Animated.View
              style={[
                styles.heroWrapper,
                {
                  opacity: heroFade,
                  transform: [{ scale: heroScale }],
                },
              ]}
            >
              <OnboardingIllustration
                step={illustrationStep}
                size={heroGraphicSize}
                isReduceMotion={isReduceMotion}
              />
            </Animated.View>

            {/* Centered Typography & Highlights */}
            <Animated.View
              style={[
                styles.contentWrapper,
                {
                  opacity: contentFade,
                  transform: [{ translateY: contentSlide }],
                },
              ]}
            >
              <OnboardingContent step={step} language={language} compact={isSmallScreen} />
            </Animated.View>
          </View>
        </ScrollView>

        {/* BOTTOM: Footer with PageIndicator (Step 2 of 3) & Next CTA */}
        <Animated.View style={[styles.footerWrapper, { opacity: footerFade }]}>
          <OnboardingFooter
            onNext={handleNext}
            currentStep={step}
            totalSteps={3}
            language={language}
            disabled={isNavigating}
          />
        </Animated.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.pearlWhite,
  },
  mainLayout: {
    flex: 1,
    justifyContent: 'space-between',
  },
  topBar: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: theme.spacing.base,
    minHeight: 44,
    alignItems: 'center',
  },
  skipButton: {
    minHeight: 44,
    minWidth: 54,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.sm,
  },
  skipText: {
    ...theme.typography.body,
    fontSize: 14,
    fontWeight: '700',
    color: theme.colors.slate600,
    letterSpacing: 0.3,
  },
  scrollBody: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: theme.spacing.sm,
  },
  mainContentGroup: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroWrapper: {
    marginVertical: theme.spacing.xs,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentWrapper: {
    width: '100%',
    alignItems: 'center',
    marginTop: theme.spacing.xs,
  },
  footerWrapper: {
    width: '100%',
    backgroundColor: theme.colors.pearlWhite,
    paddingTop: theme.spacing.xs,
  },
});
