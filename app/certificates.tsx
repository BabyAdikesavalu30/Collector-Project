/**
 * Certificates Route (/certificates)
 * Lists earned certificates; eligibility recomputed from local data.
 */

import React, { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'expo-router';
import { CertificatesScreen } from '../src/components/certificates';
import { Certificate } from '../src/features/certificates';
import { storage, STORAGE_KEYS } from '../src/storage/asyncStorage';
import { SupportedLanguage } from '../src/config/i18n';

export default function CertificatesPage() {
  const router = useRouter();
  const [language, setLanguage] = useState<SupportedLanguage>('en');

  useEffect(() => {
    (async () => {
      const stored = await storage.getItem<SupportedLanguage>(STORAGE_KEYS.USER_LANGUAGE);
      if (stored === 'en' || stored === 'ta') setLanguage(stored);
    })();
  }, []);

  const handleBack = useCallback(() => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/home');
    }
  }, [router]);

  const handleStartLearning = useCallback(() => {
    router.replace('/learn');
  }, [router]);

  const handleOpenCertificate = useCallback(
    (certificate: Certificate) => {
      router.push({
        pathname: '/certificate-view',
        params: {
          id: certificate.id,
          recipientName: certificate.recipientName,
          grade: certificate.grade,
          location: certificate.location,
          dateEarned: String(certificate.dateEarned),
          achievementsCount: String(certificate.achievementsCount),
          certificateNumber: certificate.certificateNumber,
          titleEn: certificate.title.en,
          titleTa: certificate.title.ta,
          subtitleEn: certificate.subtitle.en,
          subtitleTa: certificate.subtitle.ta,
        },
      });
    },
    [router]
  );

  return (
    <CertificatesScreen
      language={language}
      onBack={handleBack}
      onOpenCertificate={handleOpenCertificate}
      onStartLearning={handleStartLearning}
    />
  );
}