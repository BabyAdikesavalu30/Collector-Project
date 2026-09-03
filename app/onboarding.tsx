/**
 * Onboarding Route (Screen 03 - /onboarding)
 * Renders Production Onboarding: Discover / Learn Interactively (Step 1 of 3).
 * Next -> /onboarding-achieve (Screen 04, does NOT complete onboarding)
 * Skip -> Marks onboarding completed in AsyncStorage and routes to /language (Phase 3 Boundary)
 */

import React, { useCallback } from 'react';
import { useRouter } from 'expo-router';
import { OnboardingScreen } from '../src/components/onboarding';
import { storage, STORAGE_KEYS } from '../src/storage/asyncStorage';

export default function OnboardingPage() {
  const router = useRouter();

  // Next: Does NOT mark onboarding completed, navigates to Screen 04
  const handleNext = useCallback(() => {
    try {
      router.push('/onboarding-achieve');
    } catch {
      console.warn('[NAVIGATION] Could not navigate to /onboarding-achieve');
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
      step={1}
      onNext={handleNext}
      onSkip={handleSkip}
    />
  );
}
