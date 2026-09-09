/**
 * Welcome Route (Screen 02 - /welcome)
 * Production welcome landing screen.
 * Coordinates onboarding entry, sign in, direct demo exploration, and legal access.
 */

import React, { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { WelcomeScreen } from '../src/components/welcome';
import { authService } from '../src/features/auth';
import { storage, STORAGE_KEYS } from '../src/storage/asyncStorage';
import { useLanguage } from '../src/context';

export default function WelcomePage() {
  const router = useRouter();
  const { language } = useLanguage();

  const handleGetStarted = useCallback(() => {
    try {
      router.push('/onboarding');
    } catch {
      console.warn('[NAVIGATION] Could not navigate to /onboarding');
    }
  }, [router]);

  const handleSignIn = useCallback(() => {
    try {
      router.push('/login');
    } catch {
      console.warn('[NAVIGATION] Could not navigate to /login');
    }
  }, [router]);

  const handleExploreDemo = useCallback(async () => {
    try {
      await authService.loginAsDemo();
      router.replace('/home');
    } catch {
      router.replace('/home');
    }
  }, [router]);

  const handleTerms = useCallback(() => {
    try {
      router.push('/terms');
    } catch {
      console.warn('[NAVIGATION] Could not navigate to /terms');
    }
  }, [router]);

  const handlePrivacy = useCallback(() => {
    try {
      router.push('/privacy');
    } catch {
      console.warn('[NAVIGATION] Could not navigate to /privacy');
    }
  }, [router]);

  return (
    <WelcomeScreen
      onGetStarted={handleGetStarted}
      onSignIn={handleSignIn}
      onExploreDemo={handleExploreDemo}
      onTerms={handleTerms}
      onPrivacy={handlePrivacy}
      language={language}
    />
  );
}
