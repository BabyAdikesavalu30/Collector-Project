/**
 * About Vigyaan Screen (/about)
 * Institutional credibility and development attribution (R.M.K. Engineering College).
 * Clean Pearl White & White card styling.
 */

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { theme } from '../src/theme';
import { institutionConfig } from '../src/config/institution';
import { useLanguage } from '../src/context';
import { LanguageToggle } from '../src/components/language';
import { AppBackButton } from '../src/components/navigation';
import { CollegeLogo } from '../src/components/splash/CollegeLogo';

export default function AboutScreen() {
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
          {isTamil ? 'விஞ்ஞான் பற்றி' : 'About Vigyaan'}
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
        {/* Brand Hero Card */}
        <View style={styles.brandCard}>
          <View style={styles.logoBadge}>
            <Text style={styles.logoGlyph}>⚛</Text>
          </View>
          <Text style={styles.brandTitle}>{institutionConfig.app.name}</Text>
          <Text style={styles.brandSubtitle}>
            {isTamil ? institutionConfig.app.tagline.ta : institutionConfig.app.tagline.en}
          </Text>
          <View style={styles.versionPill}>
            <Text style={styles.versionText}>
              {institutionConfig.app.edition} • SDK 54
            </Text>
          </View>
        </View>

        {/* Institutional Attribution */}
        <View style={styles.infoCard}>
          <View style={styles.heritageHeader}>
            <CollegeLogo size={46} />
            <View style={styles.heritageHeaderText}>
              <Text style={styles.infoCardHeading}>
                {isTamil ? 'நிறுவன அடையாளம்' : 'Institutional Heritage'}
              </Text>
              <Text style={styles.institutionGroup}>{institutionConfig.group.en}</Text>
            </View>
          </View>
          <Text style={styles.institutionName}>{institutionConfig.name.en}</Text>
          <Text style={styles.departmentName}>{institutionConfig.department.en}</Text>
          <Text style={styles.affiliationText}>{institutionConfig.accreditation.en}</Text>
        </View>

        {/* Mission Statement */}
        <View style={styles.infoCard}>
          <Text style={styles.infoCardHeading}>
            {isTamil ? 'எங்கள் நோக்கம்' : 'Mission & Vision'}
          </Text>
          <Text style={styles.bodyText}>
            {isTamil
              ? 'பள்ளி மாணவர்களிடையே அறிவியல் சிந்தனை, பரிசோதனை ஆர்வம் மற்றும் சுய கற்றல் திறனை இருமொழி (தமிழ் மற்றும் ஆங்கிலம்) வாயிலாக வளர்த்தல்.'
              : 'Empowering students across Grades 6–12 with engaging scientific inquiry, bilingual learning pathways, and interactive gamified challenges to spark scientific innovation.'}
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
  brandCard: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: theme.spacing.lg,
    alignItems: 'center',
    marginBottom: theme.spacing.md,
    shadowColor: theme.colors.navy900,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  logoBadge: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: theme.colors.purple100,
    borderWidth: 1.5,
    borderColor: theme.colors.purple200,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  logoGlyph: {
    fontSize: 30,
    color: theme.colors.brandPrimary,
  },
  brandTitle: {
    ...theme.typography.h2,
    fontSize: 20,
    fontWeight: '800',
    color: theme.colors.navy900,
    marginBottom: 4,
  },
  brandSubtitle: {
    ...theme.typography.caption,
    fontSize: 13,
    color: theme.colors.slate600,
    textAlign: 'center',
    marginBottom: 12,
  },
  versionPill: {
    backgroundColor: theme.colors.gray100,
    borderWidth: 1,
    borderColor: theme.colors.border,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: theme.borderRadius.full,
  },
  versionText: {
    ...theme.typography.overline,
    fontSize: 10,
    color: theme.colors.brandPrimary,
    fontWeight: '700',
  },
  infoCard: {
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
  heritageHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    gap: 12,
  },
  heritageHeaderText: {
    flex: 1,
  },
  infoCardHeading: {
    ...theme.typography.caption,
    fontSize: 12,
    fontWeight: '800',
    color: theme.colors.navy900,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 4,
  },
  institutionGroup: {
    ...theme.typography.caption,
    fontSize: 11,
    fontWeight: '700',
    color: theme.colors.brandPrimary,
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  institutionName: {
    ...theme.typography.h3,
    fontSize: 16,
    fontWeight: '700',
    color: theme.colors.navy900,
    marginBottom: 2,
  },
  departmentName: {
    ...theme.typography.body,
    fontSize: 13.5,
    fontWeight: '600',
    color: theme.colors.actionPrimary,
    marginBottom: 4,
  },
  affiliationText: {
    ...theme.typography.caption,
    fontSize: 12,
    color: theme.colors.slate600,
    fontStyle: 'italic',
  },
  bodyText: {
    ...theme.typography.body,
    fontSize: 13.5,
    lineHeight: 20,
    color: theme.colors.slate600,
  },
});
