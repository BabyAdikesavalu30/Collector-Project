/**
 * Profile Complete Route (Screen 15 - /profile-complete)
 * Step 3 of 3: Celebration summary passport and entry into Home Dashboard.
 */

import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { ProfileCompletionScreen, CompleteStudentProfile } from '../src/components/profile-setup';
import { storage, STORAGE_KEYS } from '../src/storage/asyncStorage';
import { StoredProfile, SessionRepository } from '../src/features/auth';
import { theme } from '../src/theme';
import { useLanguage } from '../src/context';

export default function ProfileCompleteRoute() {
  const router = useRouter();
  const { language } = useLanguage();
  const [profile, setProfile] = useState<CompleteStudentProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const [storedProfile, session] = await Promise.all([
          storage.getItem<StoredProfile & { avatarId?: string; district?: string }>(STORAGE_KEYS.STUDENT_PROFILE),
          SessionRepository.getSession(),
        ]);

        if (storedProfile && (storedProfile.fullName || session?.fullName)) {
          setProfile({
            avatarId: storedProfile.avatarId || 'rocket',
            fullName: storedProfile.fullName || session?.fullName || '',
            school: storedProfile.school || '',
            grade: storedProfile.grade || '',
            district: storedProfile.city || storedProfile.district || '',
            section: storedProfile.section || '',
            preferredLanguage: language,
          });
        } else if (session) {
          setProfile({
            avatarId: 'rocket',
            fullName: session.fullName || 'Young Scientist',
            school: '',
            grade: '',
            district: '',
            section: '',
            preferredLanguage: language,
          });
        } else {
          router.replace('/profile-create');
          return;
        }
      } catch {
        router.replace('/profile-create');
      } finally {
        setIsLoading(false);
      }
    })();
  }, [router, language]);

  const handleGetStarted = async () => {
    try {
      await storage.setItem(STORAGE_KEYS.STUDENT_PROFILE_SETUP_COMPLETE, true);
      router.replace('/home');
    } catch (err) {
      console.error('[PROFILE_COMPLETE] Error finishing onboarding:', err);
      router.replace('/home');
    }
  };

  if (isLoading || !profile) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={theme.colors.actionPrimary} />
      </View>
    );
  }

  return (
    <ProfileCompletionScreen
      language={language}
      profile={profile}
      onGetStarted={handleGetStarted}
    />
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: theme.colors.pearlWhite,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
