/**
 * Safety Hub Route (/safety)
 * Central safety and trust destination for students.
 * Provides clear, understandable access to privacy, account safety,
 * safe science, help, and legal information.
 */

import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { theme } from '../src/theme';
import { useLanguage } from '../src/context';
import { LanguageToggle } from '../src/components/language';
import { AppBackButton } from '../src/components/navigation';
import { SAFETY_SECTIONS } from '../src/features/safety';
import { navigateDynamic } from '../src/components/navigation/navigation.config';

export default function SafetyHubPage() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { language } = useLanguage();

  const isTamil = language === 'ta';

  const handleNavigate = useCallback(
    (route: string) => {
      navigateDynamic(router, route);
    },
    [router]
  );

  return (
    <View style={styles.container}>
      <StatusBar style="dark" translucent backgroundColor="transparent" />

      {/* Header */}
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
          {isTamil ? 'பாதுகாப்பு & நம்பிக்கை' : 'Safety & Privacy'}
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
        {/* Trust Summary Banner */}
        <View style={styles.trustBanner}>
          <Text style={styles.trustIcon}>🛡️</Text>
          <View style={styles.trustTextCol}>
            <Text style={styles.trustTitle}>
              {isTamil ? 'உங்கள் பாதுகாப்பு & தனியுரிமை' : 'Your Safety & Privacy'}
            </Text>
            <Text style={styles.trustSubtitle}>
              {isTamil
                ? 'விஞ்ஞான் மாணவர்களுக்காக வடிவமைக்கப்பட்டுள்ளது. இங்கே உங்கள் கணக்கு, தரவு மற்றும் அறிவியல் பாதுகாப்பு பற்றி அறியுங்கள்.'
                : 'Vigyaan is designed for students. Learn about your account, data, and science safety here.'}
            </Text>
          </View>
        </View>

        {/* Quick Checks */}
        <View style={styles.quickChecks}>
          {[
            { icon: '✓', text: isTamil ? 'கணக்கு பாதுகாப்பு' : 'Account safety' },
            { icon: '✓', text: isTamil ? 'தனியுரிமை தகவல்' : 'Privacy information' },
            { icon: '✓', text: isTamil ? 'பாதுகாப்பான அறிவியல்' : 'Safe science' },
            { icon: '✓', text: isTamil ? 'உதவி & ஆதரவு' : 'Help & support' },
          ].map((item, idx) => (
            <View key={idx} style={styles.checkRow}>
              <Text style={styles.checkIcon}>{item.icon}</Text>
              <Text style={styles.checkText}>{item.text}</Text>
            </View>
          ))}
        </View>

        {/* Safety Sections */}
        {SAFETY_SECTIONS.map((section, idx) => (
          <TouchableOpacity
            key={section.id}
            style={styles.sectionCard}
            onPress={() => handleNavigate(section.route)}
            accessibilityRole="button"
            accessibilityLabel={isTamil ? section.title.ta : section.title.en}
            activeOpacity={0.7}
          >
            <Text style={styles.sectionIcon}>{section.icon}</Text>
            <View style={styles.sectionTextCol}>
              <Text style={styles.sectionTitle}>
                {isTamil ? section.title.ta : section.title.en}
              </Text>
              <Text style={styles.sectionSubtitle}>
                {isTamil ? section.subtitle.ta : section.subtitle.en}
              </Text>
            </View>
            <Text style={styles.sectionArrow}>›</Text>
          </TouchableOpacity>
        ))}
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
  trustBanner: {
    flexDirection: 'row',
    backgroundColor: theme.colors.green50,
    borderWidth: 1,
    borderColor: theme.colors.green200,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.base,
    marginBottom: theme.spacing.base,
    gap: 12,
  },
  trustIcon: {
    fontSize: 28,
  },
  trustTextCol: {
    flex: 1,
  },
  trustTitle: {
    ...theme.typography.h3,
    fontSize: 15,
    fontWeight: '800',
    color: theme.colors.navy900,
    marginBottom: 2,
  },
  trustSubtitle: {
    ...theme.typography.body,
    fontSize: 12.5,
    color: theme.colors.slate600,
    lineHeight: 18,
  },
  quickChecks: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: theme.spacing.base,
    marginBottom: theme.spacing.base,
  },
  checkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 6,
  },
  checkIcon: {
    fontSize: 14,
    color: theme.colors.success,
    fontWeight: '700',
  },
  checkText: {
    ...theme.typography.body,
    fontSize: 13,
    fontWeight: '600',
    color: theme.colors.navy900,
  },
  sectionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: theme.spacing.base,
    marginBottom: 8,
    gap: 12,
  },
  sectionIcon: {
    fontSize: 22,
  },
  sectionTextCol: {
    flex: 1,
  },
  sectionTitle: {
    ...theme.typography.body,
    fontSize: 14,
    fontWeight: '700',
    color: theme.colors.navy900,
  },
  sectionSubtitle: {
    ...theme.typography.caption,
    fontSize: 12,
    color: theme.colors.slate500,
    marginTop: 2,
  },
  sectionArrow: {
    fontSize: 20,
    color: theme.colors.slate400,
    fontWeight: '600',
  },
});
