/**
 * LanguageScreen Component (Screen 06 - Language Selection)
 * Clean Pearl White & Royal Blue language picker.
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
  ActivityIndicator,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { theme } from '../../theme';
import { SupportedLanguage, getTranslation } from '../../config/i18n';
import { AppBackButton } from '../navigation';
import { LanguageSelector } from './LanguageSelector';

interface LanguageScreenProps {
  initialLanguage?: SupportedLanguage;
  onLanguageSelected: (language: SupportedLanguage) => Promise<void>;
  onBack?: () => void;
  onAnalyticsEvent?: (eventName: string, params?: Record<string, unknown>) => void;
}

export const LanguageScreen: React.FC<LanguageScreenProps> = ({
  initialLanguage = 'en',
  onLanguageSelected,
  onBack,
  onAnalyticsEvent,
}) => {
  const insets = useSafeAreaInsets();
  const { height: windowHeight } = useWindowDimensions();
  const isSmallScreen = windowHeight < 720;

  const [selectedLanguage, setSelectedLanguage] = useState<SupportedLanguage>(initialLanguage);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isReduceMotion, setIsReduceMotion] = useState(false);

  const t = getTranslation(selectedLanguage).language;

  // Animation values
  const headerFade = useRef(new Animated.Value(0)).current;
  const headerSlide = useRef(new Animated.Value(-10)).current;
  const cardsFade = useRef(new Animated.Value(0)).current;
  const footerFade = useRef(new Animated.Value(0)).current;

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

  // Entrance choreography
  useEffect(() => {
    if (isReduceMotion) {
      headerFade.setValue(1);
      headerSlide.setValue(0);
      cardsFade.setValue(1);
      footerFade.setValue(1);
      return;
    }

    Animated.sequence([
      Animated.parallel([
        Animated.timing(headerFade, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(headerSlide, {
          toValue: 0,
          duration: 300,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      ]),
      Animated.timing(cardsFade, {
        toValue: 1,
        duration: 350,
        useNativeDriver: true,
      }),
      Animated.timing(footerFade, {
        toValue: 1,
        duration: 250,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
    ]).start();
  }, [isReduceMotion, headerFade, headerSlide, cardsFade, footerFade]);

  // Language selection handler
  const handleSelectLanguage = (lang: SupportedLanguage) => {
    if (isSaving) return;
    setSelectedLanguage(lang);
    setErrorMessage(null);
    onAnalyticsEvent?.('language_selected', { language: lang });
  };

  // Continue confirmation handler
  const handleContinuePress = async () => {
    if (isSaving) return;
    setIsSaving(true);
    setErrorMessage(null);

    try {
      onAnalyticsEvent?.('language_confirmed', { language: selectedLanguage });
      await onLanguageSelected(selectedLanguage);
    } catch {
      setErrorMessage(t.errorMessage);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" translucent backgroundColor="transparent" />

      <View
        style={[
          styles.mainLayout,
          {
            paddingTop: Math.max(insets.top + (isSmallScreen ? 8 : 16), Platform.OS === 'android' ? 28 : 16),
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
          {/* Top Bar: Optional Back Button */}
          {Boolean(onBack) && (
            <View style={styles.topBar}>
              <AppBackButton
                onPress={onBack!}
                language={selectedLanguage}
                style={styles.backButton}
              />
            </View>
          )}

          {/* Header Typography */}
          <Animated.View
            style={[
              styles.headerContainer,
              {
                opacity: headerFade,
                transform: [{ translateY: headerSlide }],
              },
            ]}
          >
            {/* Context Badge */}
            <View style={styles.badgePill}>
              <Text style={styles.badgeText}>{t.badge}</Text>
            </View>

            {/* Title */}
            <Text style={[styles.title, isSmallScreen && styles.titleCompact]}>
              {t.title}
            </Text>

            {/* Subtitle */}
            <Text style={styles.subtitle}>
              {t.subtitle}
            </Text>
          </Animated.View>

          {/* Error Banner */}
          {Boolean(errorMessage) && (
            <View style={styles.errorBanner} accessible={true} accessibilityRole="alert">
              <Text style={styles.errorText}>⚠️ {errorMessage}</Text>
            </View>
          )}

          {/* Cards Selection Section */}
          <Animated.View style={[styles.cardsContainer, { opacity: cardsFade }]}>
            <LanguageSelector
              selectedLanguage={selectedLanguage}
              onSelectLanguage={handleSelectLanguage}
              disabled={isSaving}
              isReduceMotion={isReduceMotion}
            />
          </Animated.View>
        </ScrollView>

        {/* BOTTOM CTA: Continue Button */}
        <Animated.View style={[styles.footerWrapper, { opacity: footerFade }]}>
          <TouchableOpacity
            style={[styles.continueButton, isSaving && styles.continueButtonDisabled]}
            onPress={handleContinuePress}
            activeOpacity={0.85}
            disabled={isSaving}
            accessible={true}
            accessibilityRole="button"
            accessibilityLabel={t.continue}
            accessibilityHint={t.accessibility.continueHint}
          >
            {isSaving ? (
              <ActivityIndicator color={theme.colors.textOnAction} size="small" />
            ) : (
              <Text style={styles.continueButtonText}>{t.continue}</Text>
            )}
          </TouchableOpacity>
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
  scrollBody: {
    flex: 1,
  },
  scrollContent: {
    alignItems: 'center',
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.base,
  },
  topBar: {
    width: '100%',
    alignItems: 'flex-start',
    marginBottom: theme.spacing.sm,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: theme.colors.white,
    borderWidth: 1,
    borderColor: theme.colors.border,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: theme.colors.navy900,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  backArrow: {
    fontSize: 20,
    fontWeight: '700',
    color: theme.colors.navy900,
  },
  headerContainer: {
    alignItems: 'center',
    width: '100%',
    marginBottom: theme.spacing.xl,
  },
  badgePill: {
    backgroundColor: theme.colors.purple100,
    borderWidth: 1,
    borderColor: theme.colors.purple200,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: theme.borderRadius.full,
    marginBottom: theme.spacing.xs,
  },
  badgeText: {
    ...theme.typography.overline,
    fontSize: 10.5,
    color: theme.colors.brandPrimary,
    letterSpacing: 1.2,
    fontWeight: '700',
  },
  title: {
    ...theme.typography.h1,
    fontSize: 26,
    lineHeight: 34,
    color: theme.colors.navy900,
    textAlign: 'center',
    marginBottom: 6,
  },
  titleCompact: {
    fontSize: 22,
    lineHeight: 30,
  },
  subtitle: {
    ...theme.typography.body,
    fontSize: 14,
    color: theme.colors.slate600,
    textAlign: 'center',
    maxWidth: 290,
  },
  errorBanner: {
    width: '100%',
    backgroundColor: theme.colors.errorSurface,
    borderWidth: 1,
    borderColor: theme.colors.errorBorder,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.sm,
    marginBottom: theme.spacing.md,
    alignItems: 'center',
  },
  errorText: {
    ...theme.typography.caption,
    color: theme.colors.error,
    fontWeight: '600',
    textAlign: 'center',
  },
  cardsContainer: {
    width: '100%',
    alignItems: 'center',
  },
  footerWrapper: {
    width: '100%',
    paddingHorizontal: theme.spacing.base,
    paddingVertical: theme.spacing.md,
    backgroundColor: theme.colors.white,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
  },
  continueButton: {
    width: '100%',
    height: 52,
    backgroundColor: theme.colors.actionPrimary,
    borderRadius: theme.borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: theme.colors.actionPrimary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 4,
  },
  continueButtonDisabled: {
    opacity: 0.65,
  },
  continueButtonText: {
    ...theme.typography.button,
    color: theme.colors.textOnAction,
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 0.6,
  },
});
