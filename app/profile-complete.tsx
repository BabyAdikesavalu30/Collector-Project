/**
 * Profile Complete Route (Screen 15 - /profile-complete)
 * Step 3 of 3: Celebration summary passport and entry into Home Dashboard.
 */

import React, { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { ProfileCompletionScreen, CompleteStudentProfile } from '../src/components/profile-setup';
import { storage, STORAGE_KEYS } from '../src/storage/asyncStorage';
import { SupportedLanguage } from '../src/config/i18n';
import { StoredProfile, SessionRepository } from '../src/features/auth';

export default function ProfileCompleteRoute() {
  const router = useRouter();
  const [language, setLanguage] = useState<SupportedLanguage>('en');
  const [profile, setProfile] = useState<CompleteStudentProfile>({
    avatarId: 'rocket',
    fullName: 'Ananya Sharma',
    school: 'R.M.K. Science Academy',
    grade: 'Grade 9',
    district: 'Chennai',
    section: 'A',
    preferredLanguage: 'en',
  });

  useEffect(() => {
    (async () => {
      try {
        const [storedLang, storedProfile] = await Promise.all([
          storage.getItem<SupportedLanguage>(STORAGE_KEYS.USER_LANGUAGE),
          storage.getItem<StoredProfile & { avatarId?: string }>(STORAGE_KEYS.STUDENT_PROFILE),
        ]);

        const resolvedLang = storedLang === 'ta' ? 'ta' : 'en';
        setLanguage(resolvedLang);

        if (storedProfile) {
          setProfile({
            avatarId: storedProfile.avatarId || 'rocket',
            fullName: storedProfile.fullName || 'Ananya Sharma',
            school: storedProfile.school || 'R.M.K. Science Academy',
            grade: storedProfile.grade || 'Grade 9',
            district: storedProfile.city || 'Chennai',
            section: storedProfile.section || 'A',
            preferredLanguage: resolvedLang,
          });
        }
      } catch {
        // Keep defaults
      }
    })();
  }, []);

  const handleGetStarted = async () => {
    try {
      // Ensure authenticated session is active and marked as profile setup complete
      await storage.setItem(STORAGE_KEYS.STUDENT_PROFILE_SETUP_COMPLETE, true);

      // If no active session exists, initialize active demo session
      const activeSession = await SessionRepository.getSession();
      if (!activeSession) {
        await SessionRepository.saveSession({
          userId: 'usr_student_01',
          fullName: profile.fullName,
          email: 'student@vigyaan.app',
          isAuthenticated: true,
          authMode: 'demo',
          createdAt: Date.now(),
        });
      }

      // Navigate into Screen 16 Home Dashboard
      router.replace('/home');
    } catch (err) {
      console.error('[PROFILE_COMPLETE] Error finishing onboarding:', err);
      router.replace('/home');
    }
  };

  return (
    <ProfileCompletionScreen
      language={language}
      profile={profile}
      onGetStarted={handleGetStarted}
    />
  );
}
