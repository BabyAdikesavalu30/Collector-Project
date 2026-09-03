/**
 * Help & Support Screen (/help)
 * Frequently asked questions and student support assistance.
 * Clean Pearl White & White card styling.
 */

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { theme } from '../src/theme';
import { storage, STORAGE_KEYS } from '../src/storage/asyncStorage';
import { SupportedLanguage } from '../src/config/i18n';
import { AppBackButton } from '../src/components/navigation';

export default function HelpPage() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [language, setLanguage] = useState<SupportedLanguage>('en');

  useEffect(() => {
    (async () => {
      const stored = await storage.getItem<SupportedLanguage>(STORAGE_KEYS.USER_LANGUAGE);
      if (stored === 'en' || stored === 'ta') setLanguage(stored);
    })();
  }, []);

  const isTamil = language === 'ta';

  return (
    <View style={styles.container}>
      <StatusBar style="dark" translucent backgroundColor="transparent" />

      {/* Top Header */}
      <View
        style={[
          styles.topBar,
          {
            paddingTop: Math.max(insets.top + 8, Platform.OS === 'android' ? 28 : 16),
          },
        ]}
      >
        <AppBackButton
          onPress={() => router.back()}
          language={language}
          style={styles.backButton}
        />

        <Text style={styles.headerTitle}>
          {isTamil ? 'உதவி & வழிகாட்டல்' : 'Help & FAQ'}
        </Text>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.content,
          {
            paddingBottom: Math.max(insets.bottom + 24, 32),
          },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* FAQ Item 1 */}
        <View style={styles.faqCard}>
          <Text style={styles.questionText}>
            {isTamil
              ? '❓ விஞ்ஞான் செயலியை எவ்வாறு பயன்படுத்துவது?'
              : '❓ How do I use the Vigyaan platform?'}
          </Text>
          <Text style={styles.answerText}>
            {isTamil
              ? 'முதன்மைப் பக்கத்தில் இருந்து உங்கள் அறிவியல் பாடங்களைத் தேர்வு செய்து வினாடி வினாக்கள், அறிவியல் விளையாட்டுகள் மற்றும் சவால்களில் பங்கேற்கலாம்.'
              : 'From your Home dashboard, explore science topics, attempt interactive quizzes, play educational games, and conquer daily challenges.'}
          </Text>
        </View>

        {/* FAQ Item 2 */}
        <View style={styles.faqCard}>
          <Text style={styles.questionText}>
            {isTamil
              ? '❓ மொழியை எவ்வாறு மாற்றுவது?'
              : '❓ How do I switch languages?'}
          </Text>
          <Text style={styles.answerText}>
            {isTamil
              ? 'சுயவிவரப் பக்கத்தில் உள்ள "மொழி தேர்வு" மூலம் தமிழ் அல்லது ஆங்கிலத்திற்கு மாற்றிக் கொள்ளலாம்.'
              : 'Yes! Vigyaan supports seamless bilingual learning. You can adjust your language preference anytime in settings.'}
          </Text>
        </View>

        {/* FAQ Item 3 */}
        <View style={styles.faqCard}>
          <Text style={styles.questionText}>
            {isTamil
              ? '❓ கடவுச்சொல் மறந்துவிட்டால் என்ன செய்வது?'
              : '❓ What if I forget my password?'}
          </Text>
          <Text style={styles.answerText}>
            {isTamil
              ? 'உள்நுழைவுப் பக்கத்தில் உள்ள "கடவுச்சொல் மறந்துவிட்டதா?" பொத்தானைத் தட்டி உங்கள் மின்னஞ்சல் அல்லது தொலைபேசி மூலம் கணக்கை மீட்டெடுக்கலாம்.'
              : 'Tap "Forgot Password?" on the login screen to request recovery instructions via your registered email or mobile number.'}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.pearlWhite,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.base,
    paddingBottom: theme.spacing.sm,
    backgroundColor: theme.colors.white,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
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
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  backArrow: {
    fontSize: 20,
    fontWeight: '700',
    color: theme.colors.navy900,
  },
  headerTitle: {
    ...theme.typography.h3,
    fontSize: 17,
    fontWeight: '800',
    color: theme.colors.navy900,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: theme.spacing.base,
  },
  faqCard: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: theme.spacing.base,
    marginBottom: theme.spacing.md,
    shadowColor: theme.colors.navy900,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  questionText: {
    ...theme.typography.h3,
    fontSize: 15,
    fontWeight: '700',
    color: theme.colors.navy900,
    marginBottom: 6,
  },
  answerText: {
    ...theme.typography.body,
    fontSize: 13.5,
    lineHeight: 20,
    color: theme.colors.slate600,
  },
});
