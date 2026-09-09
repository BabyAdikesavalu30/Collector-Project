/**
 * WelcomeScreen (Screen 02 - Production Welcome Screen)
 * The first real interaction after Splash.
 * Answers: What is Vigyaan? Why should I use it? What should I do next?
 * Coordinates institutional authority, science discovery hero visual, value proposition,
 * high-priority action pathways, Explore Demo, and legal links.
 */

import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Animated,
  Easing,
  useWindowDimensions,
  AccessibilityInfo,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { theme } from '../../theme';
import { SupportedLanguage } from '../../config/i18n';
import { ScienceBackdrop } from '../splash/ScienceBackdrop';
import { WelcomeHeader } from './WelcomeHeader';
import { WelcomeHeroGraphic } from './WelcomeHeroGraphic';
import { WelcomeContent } from './WelcomeContent';
import { WelcomeActions } from './WelcomeActions';

interface WelcomeScreenProps {
  onGetStarted: () => void;
  onSignIn: () => void;
  onExploreDemo?: () => void;
  onTerms?: () => void;
  onPrivacy?: () => void;
  language?: SupportedLanguage;
  onAnalyticsEvent?: (eventName: string, params?: Record<string, unknown>) => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({
  onGetStarted,
  onSignIn,
  onExploreDemo,
  onTerms,
  onPrivacy,
  language = 'en',
  onAnalyticsEvent,
}) => {
  const insets = useSafeAreaInsets();
  const { height: windowHeight, width: windowWidth } = useWindowDimensions();
  const isSmallScreen = windowHeight < 720;

  const [isReduceMotion, setIsReduceMotion] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);

  // Animation values
  const headerFade = useRef(new Animated.Value(0)).current;
  const headerSlide = useRef(new Animated.Value(-12)).current;
  const heroFade = useRef(new Animated.Value(0)).current;
  const heroScale = useRef(new Animated.Value(0.92)).current;
  const contentFade = useRef(new Animated.Value(0)).current;
  const contentSlide = useRef(new Animated.Value(16)).current;
  const actionsFade = useRef(new Animated.Value(0)).current;

  // Reduced motion listener
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

  // Lifecycle analytics
  useEffect(() => {
    onAnalyticsEvent?.('welcome_viewed', { screen: 'Screen02_Welcome', language });
  }, [language, onAnalyticsEvent]);

  // Entrance Choreography
  useEffect(() => {
    if (isReduceMotion) {
      headerFade.setValue(1);
      headerSlide.setValue(0);
      heroFade.setValue(1);
      heroScale.setValue(1);
      contentFade.setValue(1);
      contentSlide.setValue(0);
      actionsFade.setValue(1);
      return;
    }

    Animated.sequence([
      Animated.parallel([
        Animated.timing(headerFade, {
          toValue: 1,
          duration: 350,
          useNativeDriver: true,
        }),
        Animated.timing(headerSlide, {
          toValue: 0,
          duration: 350,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      ]),
      Animated.parallel([
        Animated.timing(heroFade, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(heroScale, {
          toValue: 1,
          duration: 400,
          easing: Easing.out(Easing.back(1.1)),
          useNativeDriver: true,
        }),
      ]),
      Animated.parallel([
        Animated.timing(contentFade, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(contentSlide, {
          toValue: 0,
          duration: 400,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      ]),
      Animated.timing(actionsFade, {
        toValue: 1,
        duration: 300,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
    ]).start();
  }, [
    isReduceMotion,
    headerFade,
    headerSlide,
    heroFade,
    heroScale,
    contentFade,
    contentSlide,
    actionsFade,
  ]);

  const handleGetStarted = () => {
    if (isNavigating) return;
    setIsNavigating(true);
    onAnalyticsEvent?.('welcome_get_started', { target: 'onboarding' });
    onGetStarted();
  };

  const handleSignIn = () => {
    if (isNavigating) return;
    setIsNavigating(true);
    onAnalyticsEvent?.('welcome_sign_in_tapped', { target: 'auth' });
    onSignIn();
  };

  const heroGraphicSize = Math.min(Math.round(windowWidth * 0.46), isSmallScreen ? 140 : 180);

  return (
    <View style={styles.container}>
      <StatusBar style="dark" translucent backgroundColor="transparent" />

      {/* Refined Scientific Ambient Background */}
      <ScienceBackdrop isReduceMotion={isReduceMotion} variant="light" />

      <View
        style={[
          styles.mainLayout,
          {
            paddingTop: Math.max(insets.top, Platform.OS === 'android' ? 24 : 16),
            paddingBottom: Math.max(insets.bottom, 12),
          },
        ]}
      >
        {/* TOP: Institutional Header */}
        <Animated.View
          style={[
            styles.headerWrapper,
            {
              opacity: headerFade,
              transform: [{ translateY: headerSlide }],
            },
          ]}
        >
          <WelcomeHeader compact={isSmallScreen} />
        </Animated.View>

        {/* Scrollable Center Body */}
        <ScrollView
          style={styles.scrollBody}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          <Animated.View
            style={[
              styles.heroWrapper,
              {
                opacity: heroFade,
                transform: [{ scale: heroScale }],
              },
            ]}
          >
            <WelcomeHeroGraphic size={heroGraphicSize} isReduceMotion={isReduceMotion} />
          </Animated.View>

          <Animated.View
            style={[
              styles.contentWrapper,
              {
                opacity: contentFade,
                transform: [{ translateY: contentSlide }],
              },
            ]}
          >
            <WelcomeContent language={language} compact={isSmallScreen} />
          </Animated.View>
        </ScrollView>

        {/* BOTTOM: Action Buttons */}
        <Animated.View
          style={[
            styles.actionsWrapper,
            {
              opacity: actionsFade,
            },
          ]}
        >
          <WelcomeActions
            onGetStarted={handleGetStarted}
            onSignIn={handleSignIn}
            onExploreDemo={onExploreDemo}
            onTerms={onTerms}
            onPrivacy={onPrivacy}
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
  headerWrapper: {
    paddingHorizontal: theme.spacing.base,
    marginBottom: theme.spacing.xs,
  },
  scrollBody: {
    flex: 1,
  },
  scrollContent: {
    alignItems: 'center',
    paddingVertical: theme.spacing.xs,
  },
  heroWrapper: {
    marginVertical: theme.spacing.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentWrapper: {
    width: '100%',
    alignItems: 'center',
  },
  actionsWrapper: {
    width: '100%',
    backgroundColor: theme.colors.pearlWhite,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    paddingTop: theme.spacing.xs,
  },
});
