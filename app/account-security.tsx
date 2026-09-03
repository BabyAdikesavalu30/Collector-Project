/**
 * Account Security Boundary Route (/account-security)
 * Password, PIN, and session security overview.
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

export default function AccountSecurityPage() {
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
            {isTamil ? 'கடவுச்சொல் & பாதுகாப்பு' : 'Password & Security'}
          </Text>
        </View>

        <View style={styles.card}>
          <View style={styles.iconCircle}>
            <Text style={styles.icon}>🔒</Text>
          </View>
          <Text style={styles.cardTitle}>
            {isTamil ? 'பாதுகாப்பான மாணவர் உள்நுழைவு' : 'Secure Student Authentication'}
          </Text>
          <Text style={styles.cardSubtitle}>
            {isTamil
              ? 'உங்கள் கணக்கு உள்ளூர் அமர்வு குறியாக்கத்துடன் பாதுகாக்கப்பட்டுள்ளது. உண்மையான சர்வர் பாதுகாப்பு அமைப்புகள் பின்னால் அறிமுகப்படுத்தப்படும்.'
              : 'Your student account is secured via encrypted local session storage. Live password reset and two-factor authentication will be available in future updates.'}
          </Text>

          <View style={styles.infoPill}>
            <Text style={styles.infoText}>
              🛡️ {isTamil ? 'உள்நுழைவு முறை: டெமோ / கடவுச்சொல்' : 'Active Mode: Demo / Password Auth'}
            </Text>
          </View>

          <TouchableOpacity
            style={styles.actionBtn}
            onPress={() => router.back()}
            activeOpacity={0.8}
          >
            <Text style={styles.actionBtnText}>
              {isTamil ? 'அமைப்புகளுக்குத் திரும்பு' : 'Back to Settings'}
            </Text>
          </TouchableOpacity>
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
  card: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: theme.spacing.xl,
    alignItems: 'center',
    shadowColor: theme.colors.navy900,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: theme.colors.blue50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  icon: {
    fontSize: 28,
  },
  cardTitle: {
    ...theme.typography.h2,
    fontSize: 18,
    fontWeight: '800',
    color: theme.colors.navy900,
    textAlign: 'center',
    marginBottom: 6,
  },
  cardSubtitle: {
    ...theme.typography.body,
    fontSize: 13,
    color: theme.colors.slate600,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 16,
  },
  infoPill: {
    backgroundColor: theme.colors.purple100,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: theme.borderRadius.full,
    marginBottom: 20,
  },
  infoText: {
    ...theme.typography.caption,
    fontSize: 11.5,
    fontWeight: '700',
    color: theme.colors.brandPrimary,
  },
  actionBtn: {
    backgroundColor: theme.colors.actionPrimary,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: theme.borderRadius.md,
  },
  actionBtnText: {
    ...theme.typography.button,
    color: theme.colors.textOnAction,
    fontSize: 14,
    fontWeight: '800',
  },
});
