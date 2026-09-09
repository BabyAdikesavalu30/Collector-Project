/**
 * Terms & Conditions Screen (/terms)
 * Comprehensive terms and institutional student policy.
 * Clean Pearl White & White card styling.
 */

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { theme } from '../src/theme';
import { useLanguage } from '../src/context';
import { LanguageToggle } from '../src/components/language';
import { AppBackButton } from '../src/components/navigation';

export default function TermsScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { language } = useLanguage();

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
          {isTamil ? 'விதிமுறைகள் & நிபந்தனைகள்' : 'Terms & Conditions'}
        </Text>
        <LanguageToggle />
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
        {/* Notice Banner */}
        <View style={styles.noticeBanner}>
          <Text style={styles.noticeIcon}>ℹ️</Text>
          <Text style={styles.noticeText}>
            {isTamil
              ? 'விஞ்ஞான் கல்வித் தள பயன்பாட்டு விதிமுறைகள் மற்றும் வழிகாட்டுதல்கள்.'
              : 'Educational platform usage policies and student learning guidelines.'}
          </Text>
        </View>

        {/* Section 1 */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionHeading}>
            {isTamil ? '1. கல்வி நோக்கம் & பயன்பாடு' : '1. Educational Purpose & Use'}
          </Text>
          <Text style={styles.bodyText}>
            {isTamil
              ? 'விஞ்ஞான் செயலியானது 6 முதல் 12-ஆம் வகுப்பு மாணவர்களின் அறிவியல் கற்றல், வினாடி வினா மற்றும் அறிவியல் ஆர்வத்தை மேம்படுத்த உருவாக்கப்பட்டுள்ளது.'
              : 'Vigyaan is developed solely for students in Grades 6–12 to explore science concepts, practice interactive quizzes, and cultivate critical thinking.'}
          </Text>
        </View>

        {/* Section 2 */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionHeading}>
            {isTamil ? '2. மாணவர் பொறுப்புகள்' : '2. Student Conduct & Responsibility'}
          </Text>
          <Text style={styles.bodyText}>
            {isTamil
              ? 'மாணவர்கள் தங்கள் கணக்கு விவரங்களைப் பாதுகாப்பாக வைத்திருக்க வேண்டும் மற்றும் பிற மாணவர்களின் கற்றல் சூழலை மதிக்க வேண்டும்.'
              : 'Students must maintain safe credentials and use the application in a respectful manner aligned with academic ethics.'}
          </Text>
        </View>

        {/* Section 3 */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionHeading}>
            {isTamil ? '3. சான்றிதழ்கள் & அங்கீகாரம்' : '3. Recognition & Certification'}
          </Text>
          <Text style={styles.bodyText}>
            {isTamil
              ? 'விஞ்ஞான் தளத்தில் வழங்கப்படும் சாதனைகள் மற்றும் கல்விச் சான்றிதழ்கள் மாணவர்களின் கற்றல் முன்னேற்றத்தைக் குறிக்கின்றன.'
              : 'Milestone badges, achievement XP, and certificates awarded within Vigyaan celebrate learning progress and science discovery achievements.'}
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
  noticeBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.blue50,
    borderWidth: 1,
    borderColor: theme.colors.blue200,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.sm,
    marginBottom: theme.spacing.base,
  },
  noticeIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  noticeText: {
    ...theme.typography.caption,
    fontSize: 12,
    color: theme.colors.actionPrimary,
    flex: 1,
    fontWeight: '600',
  },
  sectionCard: {
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
  sectionHeading: {
    ...theme.typography.h3,
    fontSize: 15,
    fontWeight: '700',
    color: theme.colors.navy900,
    marginBottom: 6,
  },
  bodyText: {
    ...theme.typography.body,
    fontSize: 13.5,
    lineHeight: 20,
    color: theme.colors.slate600,
  },
});
