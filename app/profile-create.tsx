/**
 * Create Profile Route (Screen 13 - /profile-create)
 * Step 1 of 3: Personal identity & science avatar selection.
 */

import React, { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { CreateProfileScreen, CreateProfileFormData } from '../src/components/profile-setup';
import { storage, STORAGE_KEYS } from '../src/storage/asyncStorage';
import { StoredProfile } from '../src/features/auth';
import { useLanguage } from '../src/context';

export default function ProfileCreateRoute() {
  const router = useRouter();
  const { language } = useLanguage();
  const [initialData, setInitialData] = useState<Partial<CreateProfileFormData>>({});

  useEffect(() => {
    (async () => {
      try {
        const storedProfile = await storage.getItem<StoredProfile>(STORAGE_KEYS.STUDENT_PROFILE);

        if (storedProfile) {
          setInitialData({
            fullName: storedProfile.fullName,
            school: storedProfile.school,
            grade: storedProfile.grade,
          });
        }
      } catch {
        // Fallback
      }
    })();
  }, []);

  const handleNext = async (data: CreateProfileFormData) => {
    try {
      // Save partial profile state
      const existing = (await storage.getItem<StoredProfile>(STORAGE_KEYS.STUDENT_PROFILE)) || ({} as StoredProfile);
      await storage.setItem(STORAGE_KEYS.STUDENT_PROFILE, {
        ...existing,
        avatarId: data.avatarId,
        fullName: data.fullName,
        school: data.school,
        grade: data.grade,
      });

      router.push('/profile-academic');
    } catch (err) {
      console.error('[PROFILE_CREATE] Failed to save partial profile:', err);
    }
  };

  return (
    <CreateProfileScreen
      language={language}
      initialData={initialData}
      onNext={handleNext}
      onBack={() => router.back()}
    />
  );
}
