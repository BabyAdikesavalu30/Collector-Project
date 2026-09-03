/**
 * Certificate View Route (/certificate-view)
 * Full-screen certificate render matching the approved reference design.
 * Reads the certificate from local storage by id, with route-param fallback.
 */

import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { theme } from '../src/theme';
import { AppBackButton } from '../src/components/navigation';
import { CertificateView } from '../src/components/certificates';
import { Certificate, getCertificateById } from '../src/features/certificates';
import { storage, STORAGE_KEYS } from '../src/storage/asyncStorage';
import { SupportedLanguage } from '../src/config/i18n';

export default function CertificateViewPage() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams<{
    id?: string;
    recipientName?: string;
    grade?: string;
    location?: string;
    dateEarned?: string;
    achievementsCount?: string;
    certificateNumber?: string;
    titleEn?: string;
    titleTa?: string;
    subtitleEn?: string;
    subtitleTa?: string;
  }>();

  const [language, setLanguage] = useState<SupportedLanguage>('en');
  const [certificate, setCertificate] = useState<Certificate | null>(null);

  useEffect(() => {
    (async () => {
      const storedLang = await storage.getItem<SupportedLanguage>(STORAGE_KEYS.USER_LANGUAGE);
      if (storedLang === 'en' || storedLang === 'ta') setLanguage(storedLang);

      const id = params.id;
      if (id) {
        const fromStorage = await getCertificateById(id);
        if (fromStorage) {
          setCertificate(fromStorage);
          return;
        }
      }

      // Fallback: reconstruct from route params
      setCertificate({
        id: id || 'cert',
        kind: 'subject',
        title: { en: params.titleEn || 'Science Excellence', ta: params.titleTa || 'அறிவியல் சிறப்பு' },
        subtitle: {
          en: params.subtitleEn || 'For consistent subject mastery in quizzes',
          ta: params.subtitleTa || 'வினாடி வினாக்களில் நிலையான பாடத் தேர்ச்சிக்காக',
        },
        recipientName: params.recipientName || 'Young Scientist',
        grade: params.grade || '—',
        location: params.location || '—',
        dateEarned: parseInt(params.dateEarned || String(Date.now()), 10),
        achievementsCount: parseInt(params.achievementsCount || '0', 10),
        certificateNumber: params.certificateNumber || 'VIG-2026-0000',
      });
    })();
  }, [params]);

  const handleBack = useCallback(() => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/certificates');
    }
  }, [router]);

  return (
    <View style={styles.container}>
      <StatusBar style="dark" translucent backgroundColor="transparent" />

      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + 8 }]}>
        <AppBackButton onPress={handleBack} language={language} style={styles.headerBackBtn} />
        <Text style={styles.headerTitle}>
          {language === 'ta' ? 'சான்றிதழ்' : 'Certificate'}
        </Text>
        <View style={styles.headerSpacer} />
      </View>

      {certificate ? (
        <CertificateView certificate={certificate} language={language} showExportNote />
      ) : (
        <Text style={styles.loadingText}>{language === 'ta' ? 'ஏற்றுகிறது...' : 'Loading...'}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.pearlWhite,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.base,
    paddingBottom: theme.spacing.sm,
  },
  headerBackBtn: {},
  headerTitle: {
    ...theme.typography.h2,
    fontSize: 18,
    fontWeight: '800',
    color: theme.colors.navy900,
    flex: 1,
    textAlign: 'center',
  },
  headerSpacer: {
    width: 44,
  },
  loadingText: {
    ...theme.typography.body,
    color: theme.colors.slate600,
    textAlign: 'center',
    marginTop: 40,
  },
});