/**
 * Community Guidelines Boundary Route (/guidelines)
 * Academic integrity and student conduct guidelines.
 */

import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { theme } from '../src/theme';
import { useLanguage } from '../src/context';
import { AppBackButton } from '../src/components/navigation';

export default function GuidelinesPage() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { language } = useLanguage();

  const isTamil = language === 'ta';

  const rules = [
    {
      title: isTamil ? 'கல்வி ஒருமைப்பாடு' : 'Academic Integrity',
      desc: isTamil
        ? 'வினாடி வினாக்களை சொந்த அறிவைக் கொண்டு நேர்மையுடன் முயற்சிக்கவும்.'
        : 'Attempt quizzes with honesty and curiosity using your own understanding.',
    },
    {
      title: isTamil ? 'மரியாதையான கற்றல் சூழல்' : 'Respectful Learning Community',
      desc: isTamil
        ? 'பிற மாணவர்களுடன் ஆரோக்கியமான அறிவுசார் போட்டியைப் பராமரிக்கவும்.'
        : 'Foster positive peer learning and supportive academic spirit.',
    },
    {
      title: isTamil ? 'பாதுகாப்பு மற்றும் நல்வாழ்வு' : 'Safety and Responsibility',
      desc: isTamil
        ? 'தனிப்பட்ட கடவுச்சொற்கள் அல்லது ரகசியத் தகவல்களைப் பகிர வேண்டாம்.'
        : 'Never share personal passwords, contact information, or sensitive data.',
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
            {isTamil ? 'சமூக வழிகாட்டுதல்கள்' : 'Community Guidelines'}
          </Text>
        </View>

        <View style={styles.cardList}>
          {rules.map((item) => (
            <View key={item.title} style={styles.ruleCard}>
              <Text style={styles.ruleTitle}>🤝 {item.title}</Text>
              <Text style={styles.ruleDesc}>{item.desc}</Text>
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
  ruleCard: {
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
  ruleTitle: {
    ...theme.typography.body,
    fontSize: 15,
    fontWeight: '700',
    color: theme.colors.navy900,
    marginBottom: 6,
  },
  ruleDesc: {
    ...theme.typography.caption,
    fontSize: 13,
    color: theme.colors.slate600,
    lineHeight: 19,
  },
});
