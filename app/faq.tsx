/**
 * FAQ Boundary Route (/faq)
 * Frequently Asked Questions for Vigyaan Student App.
 */

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { theme } from '../src/theme';
import { storage, STORAGE_KEYS } from '../src/storage/asyncStorage';
import { SupportedLanguage } from '../src/config/i18n';
import { AppBackButton } from '../src/components/navigation';

export default function FAQPage() {
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

  const faqs = [
    {
      q: isTamil ? 'விஞ்ஞான் செயலி யாருக்கானது?' : 'Who is Vigyaan designed for?',
      a: isTamil
        ? 'தமிழ்நாடு மாநிலப் பாடத்திட்டம் மற்றும் சிபிஎஸ்இ 6 முதல் 12 ஆம் வகுப்பு மாணவர்களுக்கான ஊடாடும் அறிவியல் கற்றல் தளம்.'
        : 'Vigyaan is designed for Tamil Nadu State Board & CBSE students in Grades 6–12 to master science through inquiry.',
    },
    {
      q: isTamil ? 'தினசரி அறிவியல் சவால் எவ்வாறு செயல்படுகிறது?' : 'How do Daily Challenges work?',
      a: isTamil
        ? 'ஒவ்வொரு நாளும் புதிய அறிவியல் சிந்தனை வினா தோன்றும். சரியான விடையளித்து +50 XP மற்றும் தொடர் புள்ளிகளைப் பெறுங்கள்.'
        : 'A fresh thought-provoking science inquiry problem appears every morning. Answer correctly to earn +50 XP.',
    },
    {
      q: isTamil ? 'செயலியை இணையம் இன்றி பயன்படுத்த முடியுமா?' : 'Can I use Vigyaan offline?',
      a: isTamil
        ? 'ஆம், பதிவிறக்கம் செய்யப்பட்ட மற்றும் தற்காலிகமாக சேமிக்கப்பட்ட வினாடி வினாக்களை ஆஃப்லைனில் பயிற்சி செய்யலாம்.'
        : 'Yes, cached syllabus modules and offline quizzes can be accessed without active internet.',
    },
  ];

  return (
    <View style={styles.container}>
      <StatusBar style="dark" translucent backgroundColor="transparent" />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[
          styles.content,
          {
            paddingTop: insets.top + 16,
            paddingBottom: insets.bottom + 24,
          },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerRow}>
          <AppBackButton
            onPress={() => router.back()}
            language={language}
            style={styles.backButton}
          />
          <Text style={styles.headerTitle}>
            {isTamil ? 'அடிக்கடி கேட்கப்படும் கேள்விகள்' : 'Frequently Asked Questions'}
          </Text>
        </View>

        <View style={styles.cardList}>
          {faqs.map((item, index) => (
            <View key={index} style={styles.faqCard}>
              <Text style={styles.questionText}>💡 {item.q}</Text>
              <Text style={styles.answerText}>{item.a}</Text>
            </View>
          ))}
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
  scroll: {
    flex: 1,
  },
  content: {
    paddingHorizontal: theme.spacing.base,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
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
    marginRight: 12,
  },
  backArrow: {
    fontSize: 26,
    color: theme.colors.navy900,
    fontWeight: '600',
    marginTop: -2,
  },
  headerTitle: {
    ...theme.typography.h2,
    fontSize: 18,
    fontWeight: '800',
    color: theme.colors.navy900,
    flex: 1,
  },
  cardList: {
    gap: 12,
  },
  faqCard: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: theme.spacing.base,
    shadowColor: theme.colors.navy900,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 1,
  },
  questionText: {
    ...theme.typography.body,
    fontSize: 15,
    fontWeight: '700',
    color: theme.colors.navy900,
    marginBottom: 6,
  },
  answerText: {
    ...theme.typography.caption,
    fontSize: 13,
    color: theme.colors.slate600,
    lineHeight: 19,
  },
});
