/**
 * Onboarding Route (Screen 05 - /onboarding-grow)
 * Renders Production Onboarding: Think. Explore. Grow. (Step 3 of 3).
 * Next -> Final action that MARKS ONBOARDING COMPLETED and routes to /language (Phase 3 Boundary)
 * Skip -> Marks onboarding completed in AsyncStorage and routes to /language (Phase 3 Boundary)
 * Back -> Returns to /onboarding-achieve (Screen 04)
 */

import React, { useCallback } from 'react';
import { useRouter } from 'expo-router';
import { OnboardingScreen } from '../src/components/onboarding';
import { storage, STORAGE_KEYS } from '../src/storage/asyncStorage';

export default function OnboardingGrowPage() {
  const router = useRouter();

  // Next: Final onboarding step -> Marks onboarding completed & navigates to Phase 3
  const handleNext = useCallback(async () => {
    try {
      await storage.setItem(STORAGE_KEYS.ONBOARDING_COMPLETED, true);
      router.replace('/language');
    } catch {
      console.warn('[NAVIGATION] Could not navigate to /language');
    }
  }, [router]);

  // Skip: Marks onboarding completed and proceeds to language selection boundary
  const handleSkip = useCallback(async () => {
    try {
      await storage.setItem(STORAGE_KEYS.ONBOARDING_COMPLETED, true);
      router.replace('/language');
    } catch {
      console.warn('[NAVIGATION] Could not navigate to /language');
    }
  }, [router]);

  return (
    <OnboardingScreen
      step={3}
      onNext={handleNext}
      onSkip={handleSkip}
    />
  );
}
