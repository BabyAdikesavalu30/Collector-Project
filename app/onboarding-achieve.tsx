/**
 * Onboarding Route (Screen 04 - /onboarding-achieve)
 * Renders Production Onboarding: Earn & Achieve (Step 2 of 3).
 * Next -> /onboarding-grow (Screen 05 Boundary, does NOT complete onboarding)
 * Skip -> Marks onboarding completed in AsyncStorage and routes to /language (Phase 3 Boundary)
 * Back -> Returns to /onboarding (Screen 03)
 */

import React, { useCallback } from 'react';
import { useRouter } from 'expo-router';
import { OnboardingScreen } from '../src/components/onboarding';
import { storage, STORAGE_KEYS } from '../src/storage/asyncStorage';

export default function OnboardingAchievePage() {
  const router = useRouter();

  // Next: Does NOT mark onboarding completed, navigates to Screen 05 boundary
  const handleNext = useCallback(() => {
    try {
      router.push('/onboarding-grow');
    } catch {
      console.warn('[NAVIGATION] Could not navigate to /onboarding-grow');
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
      step={2}
      onNext={handleNext}
      onSkip={handleSkip}
    />
  );
}
