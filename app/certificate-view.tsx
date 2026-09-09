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
import { useLanguage } from '../src/context';

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

  const { language } = useLanguage();
  const [certificate, setCertificate] = useState<Certificate | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    (async () => {
      setIsLoading(true);

      const id = params.id;
      let resolved: Certificate | null = null;
      if (id) {
        // Resolve only canonical certificates by id from local storage.
        // Fabricating certificates from arbitrary route parameters is strictly prohibited.
        resolved = await getCertificateById(id);
      }
      if (isMounted) {
        setCertificate(resolved);
        setIsLoading(false);
      }
    })();
    return () => {
      isMounted = false;
    };
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

      {isLoading ? (
        <Text style={styles.loadingText}>{language === 'ta' ? 'ஏற்றுகிறது...' : 'Loading...'}</Text>
      ) : certificate ? (
        <CertificateView certificate={certificate} language={language} showExportNote />
      ) : (
        <View style={styles.missing}>
          <Text style={styles.missingIcon}>📜</Text>
          <Text style={styles.missingTitle}>
            {language === 'ta' ? 'சான்றிதழ் கிடைக்கவில்லை' : 'Certificate not found'}
          </Text>
          <Text style={styles.missingSubtitle}>
            {language === 'ta'
              ? 'இந்தச் சான்றிதழ் இனி இல்லை அல்லது இதுவரை சம்பாதிக்கப்படவில்லை.'
              : 'This certificate no longer exists or has not been earned yet.'}
          </Text>
        </View>
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
  missing: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing.xl,
  },
  missingIcon: {
    fontSize: 36,
    marginBottom: theme.spacing.sm,
  },
  missingTitle: {
    ...theme.typography.h3,
    fontSize: 17,
    fontWeight: '800',
    color: theme.colors.navy900,
    textAlign: 'center',
  },
  missingSubtitle: {
    ...theme.typography.body,
    color: theme.colors.slate500,
    textAlign: 'center',
    marginTop: theme.spacing.sm,
    lineHeight: 20,
  },
});