/**
 * Privacy Policy Screen (/privacy)
 * Outlines student data protection, academic privacy, and local storage standards.
 * Clean Pearl White & White card styling.
 */

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { theme } from '../src/theme';
import { storage, STORAGE_KEYS } from '../src/storage/asyncStorage';
import { SupportedLanguage } from '../src/config/i18n';
import { AppBackButton } from '../src/components/navigation';

export default function PrivacyScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
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
          {isTamil ? 'தனியுரிமைக் கொள்கை' : 'Privacy Policy'}
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
        {/* Security Notice Banner */}
        <View style={styles.noticeBanner}>
          <Text style={styles.noticeIcon}>🛡️</Text>
          <Text style={styles.noticeText}>
            {isTamil
              ? 'மாணவர் கல்வித் தரவு பாதுகாப்பு மற்றும் தனியுரிமை உறுதிமொழி.'
              : 'Student data privacy and educational data protection commitment.'}
          </Text>
        </View>

        {/* Section 1 */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionHeading}>
            {isTamil ? '1. சேகரிக்கப்படும் தகவல்கள்' : '1. Information We Collect'}
          </Text>
          <Text style={styles.bodyText}>
            {isTamil
              ? 'மாணவரின் பெயர், வகுப்பு, பிரிவு மற்றும் வினாடி வினா கற்றல் முன்னேற்றம் மட்டுமே கல்வி நோக்கத்திற்காக சேமிக்கப்படுகிறது.'
              : 'Only essential academic info (Student Name, Grade, Section, and learning progress) is stored to personalize the science learning experience.'}
          </Text>
        </View>

        {/* Section 2 */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionHeading}>
            {isTamil ? '2. தரவுப் பாதுகாப்பு' : '2. Student Privacy & Security'}
          </Text>
          <Text style={styles.bodyText}>
            {isTamil
              ? 'மாணவர் தகவல்கள் விளம்பரங்களுக்காக பகிரப்படாது. கல்வி மற்றும் பள்ளி வழிகாட்டுதலுக்கு மட்டுமே பயன்படுத்தப்படும்.'
              : 'Student information is never monetized, sold, or shared with third parties for commercial advertising.'}
          </Text>
        </View>

        {/* Section 3 */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionHeading}>
            {isTamil ? '3. உள்ளக சாதனத் தரவு' : '3. On-Device Storage'}
          </Text>
          <Text style={styles.bodyText}>
            {isTamil
              ? 'ஆஃப்லைன் வினாடி வினா முன்னேற்றம் மற்றும் அமைப்புகள் உங்கள் சாதனத்தில் பாதுகாப்பாக சேமிக்கப்படுகின்றன.'
              : 'Offline learning caches and active session preferences are maintained securely on the student device.'}
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
    backgroundColor: theme.colors.green50,
    borderWidth: 1,
    borderColor: theme.colors.green200,
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
    color: theme.colors.success,
    flex: 1,
    fontWeight: '700',
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
