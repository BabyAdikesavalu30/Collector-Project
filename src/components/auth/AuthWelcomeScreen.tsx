/**
 * AuthWelcomeScreen (Screen 07 - Production Authentication Welcome)
 * Unified account entry experience for students.
 * Color Hierarchy: Pearl White base, Navy typography, Royal Blue primary Sign In,
 * White secondary Create Account with Blue border, Purple brand accents.
 */

import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Animated,
  Easing,
  TouchableOpacity,
  useWindowDimensions,
  AccessibilityInfo,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { theme } from '../../theme';
import { SupportedLanguage, getTranslation } from '../../config/i18n';
import { InstitutionIdentity } from '../splash/InstitutionIdentity';

interface AuthWelcomeScreenProps {
  onSignIn: () => void;
  onCreateAccount: () => void;
  onExploreDemo?: () => void;
  onResetDevelopmentState?: () => void;
  onTerms?: () => void;
  onPrivacy?: () => void;
  language?: SupportedLanguage;
  onAnalyticsEvent?: (eventName: string, params?: Record<string, unknown>) => void;
}

export const AuthWelcomeScreen: React.FC<AuthWelcomeScreenProps> = ({
  onSignIn,
  onCreateAccount,
  onExploreDemo,
  onResetDevelopmentState,
  onTerms,
  onPrivacy,
  language = 'en',
  onAnalyticsEvent,
}) => {
  const insets = useSafeAreaInsets();
  const { height: windowHeight } = useWindowDimensions();
  const isSmallScreen = windowHeight < 720;
  const t = getTranslation(language).authWelcome;

  const [isReduceMotion, setIsReduceMotion] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);

  // Animation values
  const brandFade = useRef(new Animated.Value(0)).current;
  const contentFade = useRef(new Animated.Value(0)).current;
  const contentSlide = useRef(new Animated.Value(14)).current;
  const signInFade = useRef(new Animated.Value(0)).current;
  const registerFade = useRef(new Animated.Value(0)).current;

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
    onAnalyticsEvent?.('auth_welcome_viewed', { screen: 'Screen07_AuthWelcome', language });
  }, [language, onAnalyticsEvent]);

  // Entrance Sequence
  useEffect(() => {
    if (isReduceMotion) {
      brandFade.setValue(1);
      contentFade.setValue(1);
      contentSlide.setValue(0);
      signInFade.setValue(1);
      registerFade.setValue(1);
      return;
    }

    Animated.sequence([
      Animated.timing(brandFade, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.parallel([
        Animated.timing(contentFade, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(contentSlide, {
          toValue: 0,
          duration: 300,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      ]),
      Animated.timing(signInFade, {
        toValue: 1,
        duration: 250,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
      Animated.timing(registerFade, {
        toValue: 1,
        duration: 250,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
    ]).start();
  }, [isReduceMotion, brandFade, contentFade, contentSlide, signInFade, registerFade]);

  const handleSignIn = () => {
    if (isNavigating) return;
    setIsNavigating(true);
    onAnalyticsEvent?.('auth_sign_in_tapped', { language });
    onSignIn();
  };

  const handleCreateAccount = () => {
    if (isNavigating) return;
    setIsNavigating(true);
    onAnalyticsEvent?.('auth_register_tapped', { language });
    onCreateAccount();
  };

  const isTamil = language === 'ta';

  return (
    <View style={styles.container}>
      <StatusBar style="dark" translucent backgroundColor="transparent" />

      <View
        style={[
          styles.mainLayout,
          {
            paddingTop: Math.max(insets.top + (isSmallScreen ? 4 : 8), Platform.OS === 'android' ? 20 : 12),
            paddingBottom: Math.max(insets.bottom, 12),
          },
        ]}
      >
        {/* Scrollable Center Body */}
        <ScrollView
          style={styles.scrollBody}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          {/* Institutional Credibility */}
          <Animated.View style={[styles.institutionWrapper, { opacity: brandFade }]}>
            <InstitutionIdentity compact={true} />
          </Animated.View>

          {/* Central Science Atom Discovery Graphic */}
          <Animated.View style={[styles.emblemContainer, { opacity: brandFade }]}>
            <View style={styles.haloGlow} />
            <View style={[styles.atomOrbit, styles.orbitLeft]} />
            <View style={[styles.atomOrbit, styles.orbitRight]} />
            <View style={styles.nucleusCore}>
              <Text style={styles.atomGlyph}>⚛</Text>
            </View>
          </Animated.View>

          {/* Core Typography & Value messaging */}
          <Animated.View
            style={[
              styles.contentWrapper,
              {
                opacity: contentFade,
                transform: [{ translateY: contentSlide }],
              },
            ]}
          >
            {/* Context Badge */}
            <View style={styles.badgePill}>
              <View style={styles.badgeDot} />
              <Text style={styles.badgeText}>{t.badge}</Text>
            </View>

            {/* Primary Heading */}
            <Text style={[styles.title, isSmallScreen && styles.titleCompact]}>
              {t.title}
            </Text>

            {/* Tamil Subtitle if viewing in English, or English title preview */}
            <Text style={styles.tamilSubtitle}>
              {language === 'en' ? t.tamilTitle : 'Welcome to Vigyaan'}
            </Text>

            {/* Short Explanation Subtitle */}
            <Text style={styles.subtitle}>
              {t.subtitle}
            </Text>
          </Animated.View>
        </ScrollView>

        {/* BOTTOM ACTIONS: Blue Primary Button & White Secondary */}
        <View style={styles.footerWrapper}>
          {/* 1. Primary Action: Blue Sign In */}
          <Animated.View style={{ opacity: signInFade, width: '100%' }}>
            <TouchableOpacity
              style={styles.primaryButton}
              onPress={handleSignIn}
              activeOpacity={0.85}
              disabled={isNavigating}
              accessible={true}
              accessibilityRole="button"
              accessibilityLabel={t.signIn}
              accessibilityHint={t.accessibility.signInHint}
            >
              <Text style={styles.primaryButtonText}>{t.signIn}</Text>
              <Text style={styles.primaryButtonArrow}>→</Text>
            </TouchableOpacity>
          </Animated.View>

          {/* 2. Secondary Action: White Create Account with Blue Border */}
          <Animated.View style={{ opacity: registerFade, width: '100%', marginTop: theme.spacing.xs }}>
            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={handleCreateAccount}
              activeOpacity={0.75}
              disabled={isNavigating}
              accessible={true}
              accessibilityRole="button"
              accessibilityLabel={t.createAccount}
              accessibilityHint={t.accessibility.createAccountHint}
            >
              <Text style={styles.secondaryButtonText}>{t.createAccount}</Text>
            </TouchableOpacity>
          </Animated.View>

          {/* 3. Explore Demo Discovery Option */}
          {onExploreDemo && (
            <TouchableOpacity
              style={styles.demoButton}
              onPress={onExploreDemo}
              activeOpacity={0.8}
              disabled={isNavigating}
              accessible={true}
              accessibilityRole="button"
              accessibilityLabel={isTamil ? 'டெமோவை ஆராய்க' : 'Explore Demo'}
            >
              <Text style={styles.demoButtonText}>
                ✨ {isTamil ? 'டெமோவை ஆராய்க' : 'Explore Demo'}
              </Text>
            </TouchableOpacity>
          )}

          {/* Footer Legal Links */}
          <View style={styles.footerLegalRow}>
            {onTerms && (
              <TouchableOpacity onPress={onTerms} activeOpacity={0.7} style={styles.legalLink}>
                <Text style={styles.legalText}>{isTamil ? 'விதிமுறைகள்' : 'Terms'}</Text>
              </TouchableOpacity>
            )}
            <Text style={styles.bulletDot}>•</Text>
            {onPrivacy && (
              <TouchableOpacity onPress={onPrivacy} activeOpacity={0.7} style={styles.legalLink}>
                <Text style={styles.legalText}>{isTamil ? 'தனியுரிமை' : 'Privacy'}</Text>
              </TouchableOpacity>
            )}
          </View>

          {/* Reassurance Progress Message */}
          <Text style={styles.reassuranceText}>
            🔒 {t.progressMessage}
          </Text>

          {/* Development-Only Fresh Install Reset */}
          {__DEV__ && onResetDevelopmentState && (
            <TouchableOpacity
              style={styles.devResetButton}
              onPress={onResetDevelopmentState}
              activeOpacity={0.7}
              accessible={true}
              accessibilityRole="button"
              accessibilityLabel="Reset Development State"
            >
              <Text style={styles.devResetText}>🛠️ Reset Development State</Text>
            </TouchableOpacity>
          )}
        </View>
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
  scrollBody: {
    flex: 1,
  },
  scrollContent: {
    alignItems: 'center',
    paddingHorizontal: theme.spacing.base,
    paddingBottom: theme.spacing.sm,
  },
  institutionWrapper: {
    width: '100%',
    alignItems: 'center',
    marginBottom: theme.spacing.xs,
  },
  emblemContainer: {
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: theme.spacing.xs,
    position: 'relative',
  },
  haloGlow: {
    position: 'absolute',
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: theme.colors.accentGlow,
  },
  atomOrbit: {
    position: 'absolute',
    width: 90,
    height: 42,
    borderRadius: 21,
    borderWidth: 1.5,
    borderColor: theme.colors.brandPrimary,
  },
  orbitLeft: {
    transform: [{ rotate: '45deg' }],
  },
  orbitRight: {
    transform: [{ rotate: '-45deg' }],
    borderColor: theme.colors.actionPrimary,
  },
  nucleusCore: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: theme.colors.brandPrimary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: theme.colors.brandPrimary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 3,
  },
  atomGlyph: {
    fontSize: 22,
    color: '#FFFFFF',
  },
  contentWrapper: {
    width: '100%',
    alignItems: 'center',
  },
  badgePill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.purple100,
    borderWidth: 1,
    borderColor: theme.colors.purple200,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: theme.borderRadius.full,
    marginBottom: theme.spacing.xs,
  },
  badgeDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: theme.colors.brandPrimary,
    marginRight: 6,
  },
  badgeText: {
    ...theme.typography.overline,
    fontSize: 10,
    color: theme.colors.brandPrimary,
    letterSpacing: 1.5,
    fontWeight: '700',
  },
  title: {
    ...theme.typography.h1,
    fontSize: 26,
    lineHeight: 34,
    color: theme.colors.navy900,
    textAlign: 'center',
    marginBottom: 4,
  },
  titleCompact: {
    fontSize: 22,
    lineHeight: 30,
  },
  tamilSubtitle: {
    ...theme.typography.bodyLarge,
    fontSize: 15,
    color: theme.colors.brandPrimary,
    textAlign: 'center',
    marginBottom: 4,
    fontWeight: '700',
  },
  subtitle: {
    ...theme.typography.body,
    fontSize: 13.5,
    color: theme.colors.slate600,
    textAlign: 'center',
    maxWidth: 290,
  },
  footerWrapper: {
    width: '100%',
    paddingHorizontal: theme.spacing.base,
    paddingTop: theme.spacing.xs,
    paddingBottom: theme.spacing.xs,
    backgroundColor: theme.colors.pearlWhite,
    alignItems: 'center',
  },
  primaryButton: {
    width: '100%',
    height: 50,
    backgroundColor: theme.colors.actionPrimary,
    borderRadius: theme.borderRadius.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: theme.colors.actionPrimary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 3,
  },
  primaryButtonText: {
    ...theme.typography.button,
    fontSize: 16,
    fontWeight: '800',
    color: theme.colors.textOnAction,
    letterSpacing: 0.5,
  },
  primaryButtonArrow: {
    fontSize: 18,
    fontWeight: '800',
    color: '#FFFFFF',
    marginLeft: 8,
  },
  secondaryButton: {
    width: '100%',
    height: 48,
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1.5,
    borderColor: theme.colors.actionPrimary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryButtonText: {
    ...theme.typography.button,
    fontSize: 15,
    fontWeight: '700',
    color: theme.colors.actionPrimary,
  },
  demoButton: {
    backgroundColor: theme.colors.purple50,
    borderWidth: 1,
    borderColor: theme.colors.purple200,
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: theme.borderRadius.full,
    marginTop: 8,
  },
  demoButtonText: {
    ...theme.typography.caption,
    fontSize: 12,
    fontWeight: '700',
    color: theme.colors.brandPrimary,
  },
  footerLegalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 6,
  },
  legalLink: {
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  legalText: {
    ...theme.typography.caption,
    fontSize: 11,
    color: theme.colors.textMuted,
  },
  bulletDot: {
    color: theme.colors.textMuted,
    fontSize: 10,
  },
  reassuranceText: {
    ...theme.typography.caption,
    fontSize: 11.5,
    color: theme.colors.textMuted,
    textAlign: 'center',
    marginTop: 6,
  },
  devResetButton: {
    marginTop: 8,
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: theme.borderRadius.sm,
    backgroundColor: '#FEE2E2',
    borderWidth: 1,
    borderColor: '#FCA5A5',
    alignItems: 'center',
  },
  devResetText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#DC2626',
    letterSpacing: 0.3,
  },
});
