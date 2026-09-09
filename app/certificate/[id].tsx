/**
 * Certificate Detail Route (/certificate/[id])
 * Certificate 2.0 preview: academic double-border presentation, metadata,
 * verification information, and share/save-ready action bar (UI only —
 * actual sharing/PDF generation is future work).
 */

import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { theme } from '../../src/theme';
import { SupportedLanguage, getTranslation } from '../../src/config/i18n';
import { ScreenHeader } from '../../src/components/shared';
import { CertificatePreview } from '../../src/components/certificates';
import { Certificate, getCertificateById } from '../../src/features/certificates';
import { useLanguage } from '../../src/context';

export default function CertificateDetailPage() {
  const router = useRouter();
  const params = useLocalSearchParams<{ id?: string }>();
  const insets = useSafeAreaInsets();
  const { language } = useLanguage();
  const [certificate, setCertificate] = useState<Certificate | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    (async () => {
      if (params.id) {
        const cert = await getCertificateById(params.id);
        if (isMounted) setCertificate(cert);
      }
      if (isMounted) setIsLoading(false);
    })();
    return () => {
      isMounted = false;
    };
  }, [params.id]);

  const handleBack = useCallback(() => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/certificates');
    }
  }, [router]);

  const t = getTranslation(language).progress.certificates;
  const isTamil = language === 'ta';

  const showFutureNotice = (label: string) => {
    Alert.alert(
      label,
      isTamil ? 'இந்தச் செயல்பாடு எதிர்கால புதுப்பிப்பில் கிடைக்கும்.' : 'This action is coming in a future update.'
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" translucent backgroundColor="transparent" />
      <ScreenHeader title={t.preview} language={language} onBack={handleBack} />

      {isLoading ? (
        <Text style={styles.loadingText}>{getTranslation(language).progress.loading}</Text>
      ) : !certificate ? (
        <View style={styles.missing}>
          <Text style={styles.missingTitle}>{t.lockedTitle}</Text>
          <Text style={styles.missingSubtitle}>{t.lockedSubtitle}</Text>
        </View>
      ) : (
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={[styles.content, { paddingBottom: Math.max(insets.bottom + 24, 32) }]}
          showsVerticalScrollIndicator={false}
        >
          <CertificatePreview certificate={certificate} language={language} />

          {/* Metadata */}
          <View style={styles.metadataCard} accessible accessibilityRole="summary">
            <Text style={styles.metadataTitle}>{t.verification.toUpperCase()}</Text>
            <View style={styles.metaRow}>
              <Text style={styles.metaLabel}>{t.certificateId}</Text>
              <Text style={styles.metaValue}>{certificate.certificateNumber}</Text>
            </View>
            <View style={styles.metaRow}>
              <Text style={styles.metaLabel}>{t.dateEarned}</Text>
              <Text style={styles.metaValue}>
                {new Date(certificate.dateEarned).toLocaleDateString()}
              </Text>
            </View>
            <View style={styles.metaRow}>
              <Text style={styles.metaLabel}>{t.achievement}</Text>
              <Text style={styles.metaValue}>{isTamil ? certificate.title.ta : certificate.title.en}</Text>
            </View>
            <Text style={styles.demoNote}>ℹ️ {t.demoVerification}</Text>
          </View>

          {/* Action bar (share/save-ready UI) */}
          <View style={styles.actionRow}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => showFutureNotice(t.share)}
              accessibilityRole="button"
              accessibilityLabel={t.share}
            >
              <Text style={styles.actionIcon}>📤</Text>
              <Text style={styles.actionLabel}>{t.share}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => showFutureNotice(t.save)}
              accessibilityRole="button"
              accessibilityLabel={t.save}
            >
              <Text style={styles.actionIcon}>💾</Text>
              <Text style={styles.actionLabel}>{t.save}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.actionButton, styles.actionButtonPrimary]}
              onPress={() => showFutureNotice(t.verification)}
              accessibilityRole="button"
              accessibilityLabel={t.verification}
            >
              <Text style={styles.actionIcon}>🔍</Text>
              <Text style={[styles.actionLabel, styles.actionLabelPrimary]}>{t.verification}</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.backLink}
            onPress={() => router.replace('/certificates')}
            accessibilityRole="button"
            accessibilityLabel={t.back}
          >
            <Text style={styles.backLinkText}>← {t.back}</Text>
          </TouchableOpacity>
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.pearlWhite,
  },
  loadingText: {
    ...theme.typography.body,
    color: theme.colors.slate500,
    textAlign: 'center',
    marginTop: theme.spacing.xxl,
  },
  missing: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing.xl,
  },
  missingTitle: {
    ...theme.typography.h2,
    fontSize: 18,
    fontWeight: '800',
    color: theme.colors.navy900,
  },
  missingSubtitle: {
    ...theme.typography.body,
    color: theme.colors.slate500,
    textAlign: 'center',
    marginTop: theme.spacing.sm,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: theme.spacing.base,
  },
  metadataCard: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: theme.spacing.base,
    marginTop: theme.spacing.lg,
  },
  metadataTitle: {
    ...theme.typography.overline,
    fontSize: 10.5,
    color: theme.colors.navy900,
    letterSpacing: 1,
    fontWeight: '800',
    marginBottom: theme.spacing.sm,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: theme.spacing.xs,
  },
  metaLabel: {
    ...theme.typography.caption,
    fontSize: 11.5,
    color: theme.colors.slate500,
    fontWeight: '600',
  },
  metaValue: {
    ...theme.typography.caption,
    fontSize: 11.5,
    color: theme.colors.navy900,
    fontWeight: '800',
    maxWidth: '60%',
    textAlign: 'right',
  },
  demoNote: {
    ...theme.typography.caption,
    fontSize: 10.5,
    color: theme.colors.slate400,
    marginTop: theme.spacing.sm,
  },
  actionRow: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
    marginTop: theme.spacing.lg,
  },
  actionButton: {
    flex: 1,
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    paddingVertical: theme.spacing.md,
    alignItems: 'center',
  },
  actionButtonPrimary: {
    backgroundColor: theme.colors.actionPrimary,
    borderColor: theme.colors.actionPrimary,
  },
  actionIcon: {
    fontSize: 18,
    marginBottom: 4,
  },
  actionLabel: {
    ...theme.typography.caption,
    fontSize: 10.5,
    fontWeight: '800',
    color: theme.colors.navy800,
  },
  actionLabelPrimary: {
    color: theme.colors.textOnAction,
  },
  backLink: {
    marginTop: theme.spacing.lg,
    alignSelf: 'center',
    padding: theme.spacing.sm,
  },
  backLinkText: {
    ...theme.typography.body,
    fontSize: 13,
    fontWeight: '700',
    color: theme.colors.actionPrimary,
  },
});