/**
 * Certificates Route (/certificates)
 * Lists earned certificates; eligibility recomputed from local data.
 */

import React, { useCallback } from 'react';
import { useRouter } from 'expo-router';
import { CertificatesScreen } from '../src/components/certificates';
import { Certificate } from '../src/features/certificates';
import { useLanguage } from '../src/context';

export default function CertificatesPage() {
  const router = useRouter();
  const { language } = useLanguage();

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
      router.push(`/certificate/${certificate.id}`);
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