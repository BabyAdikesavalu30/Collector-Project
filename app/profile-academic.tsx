/**
 * Academic Setup Route (Screen 14 - /profile-academic)
 * Step 2 of 3: Academic details, district location, and quiz language.
 */

import React, { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { AcademicSetupScreen, AcademicSetupFormData } from '../src/components/profile-setup';
import { storage, STORAGE_KEYS } from '../src/storage/asyncStorage';
import { SupportedLanguage } from '../src/config/i18n';
import { StoredProfile } from '../src/features/auth';

export default function ProfileAcademicRoute() {
  const router = useRouter();
  const [language, setLanguage] = useState<SupportedLanguage>('en');
  const [initialData, setInitialData] = useState<Partial<AcademicSetupFormData>>({});

  useEffect(() => {
    (async () => {
      try {
        const [storedLang, storedProfile] = await Promise.all([
          storage.getItem<SupportedLanguage>(STORAGE_KEYS.USER_LANGUAGE),
          storage.getItem<StoredProfile>(STORAGE_KEYS.STUDENT_PROFILE),
        ]);

        if (storedLang === 'en' || storedLang === 'ta') {
          setLanguage(storedLang);
        }

        if (storedProfile) {
          setInitialData({
            district: storedProfile.city || 'Chennai',
            section: storedProfile.section || 'A',
            preferredLanguage: (storedLang as SupportedLanguage) || 'en',
          });
        }
      } catch {
        // Fallback
      }
    })();
  }, []);

  const handleNext = async (data: AcademicSetupFormData) => {
    try {
      // Persist preferred language choice
      await storage.setItem(STORAGE_KEYS.USER_LANGUAGE, data.preferredLanguage);

      // Persist academic details
      const existing = (await storage.getItem<StoredProfile>(STORAGE_KEYS.STUDENT_PROFILE)) || ({} as StoredProfile);
      await storage.setItem(STORAGE_KEYS.STUDENT_PROFILE, {
        ...existing,
        city: data.district,
        section: data.section,
      });

      router.push('/profile-complete');
    } catch (err) {
      console.error('[PROFILE_ACADEMIC] Failed to save academic details:', err);
    }
  };

  return (
    <AcademicSetupScreen
      language={language}
      initialData={initialData}
      onNext={handleNext}
      onBack={() => router.back()}
    />
  );
}
