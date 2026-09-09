/**
 * Safe Science Route (/safe-science)
 * Teaches students that science activities inside the app are educational
 * simulations. Clear, calm, non-fear-based safety information.
 */

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { theme } from '../src/theme';
import { useLanguage } from '../src/context';
import { LanguageToggle } from '../src/components/language';
import { AppBackButton } from '../src/components/navigation';
import { SafetyNotice } from '../src/components/safety';
import { SAFE_SCIENCE_RULES } from '../src/features/safety';

export default function SafeSciencePage() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { language } = useLanguage();

  const isTamil = language === 'ta';

  return (
    <View style={styles.container}>
      <StatusBar style="dark" translucent backgroundColor="transparent" />

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
          {isTamil ? 'பாதுகாப்பான அறிவியல்' : 'Safe Science'}
        </Text>
        <LanguageToggle />
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[
          styles.content,
          { paddingBottom: Math.max(insets.bottom + 24, 32) },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Key Notice */}
        <SafetyNotice
          variant="simulation"
          message={
            isTamil
              ? 'செயலியில் உள்ள அனைத்து சோதனைகளும் கல்வி உருவகப்படுத்துதல்கள். அவை உண்மையான ஆய்வக நடைமுறைகள் அல்ல.'
              : 'All experiments in the app are educational simulations. They are not real laboratory procedures.'
          }
        />

        {/* Intro */}
        <View style={styles.introCard}>
          <Text style={styles.introTitle}>
            {isTamil ? 'அறிவியல் செயல்பாடுகள் பற்றி' : 'About Science Activities'}
          </Text>
          <Text style={styles.introBody}>
            {isTamil
              ? 'விஞ்ஞான் செயலியில் உள்ள அறிவியல் செயல்பாடுகள் கற்றல் பயிற்சிகளாக வடிவமைக்கப்பட்டுள்ளன. இவை டிஜிட்டல் கற்றல் அனுபவங்கள் — வீட்டில் நகலெடுக்க வேண்டிய நிஜ உலக நடைமுறைகள் அல்ல.'
              : 'Science activities in Vigyaan are designed as learning exercises. They are digital learning experiences — not real-world procedures to replicate at home.'}
          </Text>
        </View>

        {/* Safety Rules */}
        {SAFE_SCIENCE_RULES.map((rule) => (
          <View key={rule.id} style={styles.ruleCard}>
            <Text style={styles.ruleIcon}>{rule.icon}</Text>
            <View style={styles.ruleTextCol}>
              <Text style={styles.ruleTitle}>
                {isTamil ? rule.title.ta : rule.title.en}
              </Text>
              <Text style={styles.ruleDesc}>
                {isTamil ? rule.description.ta : rule.description.en}
              </Text>
            </View>
          </View>
        ))}

        {/* Reminder */}
        <View style={styles.reminderCard}>
          <Text style={styles.reminderIcon}>👩‍🏫</Text>
          <Text style={styles.reminderTitle}>
            {isTamil ? 'உங்கள் ஆசிரியரிடம் கேளுங்கள்' : 'Ask Your Teacher'}
          </Text>
          <Text style={styles.reminderBody}>
            {isTamil
              ? 'நிஜ அறிவியல் சோதனைகளை முயற்சிக்க விரும்பினால், எப்போதும் உங்கள் ஆசிரியரிடம் கேளுங்கள். அவர்கள் உங்களைப் பாதுகாப்பாக வழிநடத்துவார்கள்.'
              : 'If you want to try real science experiments, always ask your teacher. They will guide you safely.'}
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
  },
  headerTitle: {
    ...theme.typography.h3,
    fontSize: 17,
    fontWeight: '800',
    color: theme.colors.navy900,
  },
  scroll: {
    flex: 1,
  },
  content: {
    padding: theme.spacing.base,
  },
  introCard: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: theme.spacing.base,
    marginBottom: theme.spacing.base,
  },
  introTitle: {
    ...theme.typography.h3,
    fontSize: 15,
    fontWeight: '700',
    color: theme.colors.navy900,
    marginBottom: 6,
  },
  introBody: {
    ...theme.typography.body,
    fontSize: 13.5,
    lineHeight: 20,
    color: theme.colors.slate600,
  },
  ruleCard: {
    flexDirection: 'row',
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: theme.spacing.base,
    marginBottom: 8,
    gap: 12,
  },
  ruleIcon: {
    fontSize: 22,
  },
  ruleTextCol: {
    flex: 1,
  },
  ruleTitle: {
    ...theme.typography.body,
    fontSize: 14,
    fontWeight: '700',
    color: theme.colors.navy900,
    marginBottom: 4,
  },
  ruleDesc: {
    ...theme.typography.body,
    fontSize: 13,
    lineHeight: 19,
    color: theme.colors.slate600,
  },
  reminderCard: {
    backgroundColor: theme.colors.purple50,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1,
    borderColor: theme.colors.purple200,
    padding: theme.spacing.base,
    marginTop: theme.spacing.sm,
    alignItems: 'center',
  },
  reminderIcon: {
    fontSize: 28,
    marginBottom: 8,
  },
  reminderTitle: {
    ...theme.typography.h3,
    fontSize: 15,
    fontWeight: '700',
    color: theme.colors.brandPrimary,
    marginBottom: 4,
    textAlign: 'center',
  },
  reminderBody: {
    ...theme.typography.body,
    fontSize: 13,
    lineHeight: 19,
    color: theme.colors.slate600,
    textAlign: 'center',
  },
});
