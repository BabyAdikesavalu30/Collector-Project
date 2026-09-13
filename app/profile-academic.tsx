/**
 * Academic Setup Route (Screen 14 - /profile-academic)
 * Step 2 of 3: Academic details, district location, and quiz language.
 */

import React, { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { AcademicSetupScreen, AcademicSetupFormData } from '../src/components/profile-setup';
import { profileRepository } from '../src/features/profile';
import { useLanguage } from '../src/context';

export default function ProfileAcademicRoute() {
  const router = useRouter();
  const { language, setLanguage } = useLanguage();
  const [initialData, setInitialData] = useState<Partial<AcademicSetupFormData>>({});

  useEffect(() => {
    (async () => {
      try {
        const storedProfile = await profileRepository.getProfile();

        if (storedProfile) {
          setInitialData({
            district: storedProfile.city || '',
            section: storedProfile.section || '',
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
      // Persist preferred language choice via context
      if (data.preferredLanguage) {
        await setLanguage(data.preferredLanguage);
      }

      // Persist academic details via profile repository boundary
      await profileRepository.saveProfile({
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
