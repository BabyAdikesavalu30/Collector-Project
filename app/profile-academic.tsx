/**
 * Academic Setup Route (Screen 14 - /profile-academic)
 * Step 2 of 3: Academic details, district location, and quiz language.
 */

import React, { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { AcademicSetupScreen, AcademicSetupFormData } from '../src/components/profile-setup';
import { storage, STORAGE_KEYS } from '../src/storage/asyncStorage';
import { StoredProfile } from '../src/features/auth';
import { useLanguage } from '../src/context';

export default function ProfileAcademicRoute() {
  const router = useRouter();
  const { language } = useLanguage();
  const [initialData, setInitialData] = useState<Partial<AcademicSetupFormData>>({});

  useEffect(() => {
    (async () => {
      try {
        const storedProfile = await storage.getItem<StoredProfile>(STORAGE_KEYS.STUDENT_PROFILE);

        if (storedProfile) {
          setInitialData({
            district: storedProfile.city || '',
            section: storedProfile.section || 'A',
            preferredLanguage: language,
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
