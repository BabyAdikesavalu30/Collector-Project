/**
 * Authentication Welcome Route (Screen 07 - /auth-welcome)
 * Renders Account Entry screen with Sign In, Create Account, Explore Demo, and Legal options.
 */

import React, { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { AuthWelcomeScreen } from '../src/components/auth';
import { authService } from '../src/features/auth';
import { storage, STORAGE_KEYS } from '../src/storage/asyncStorage';
import { useLanguage } from '../src/context';

export default function AuthWelcomePage() {
  const router = useRouter();
  const { language } = useLanguage();

  // Sign In -> Navigate to Screen 08 Login boundary
  const handleSignIn = useCallback(() => {
    try {
      router.push('/login');
    } catch {
      console.warn('[NAVIGATION] Could not navigate to /login');
    }
  }, [router]);

  // Create Account -> Navigate to Screen 09 Register boundary
  const handleCreateAccount = useCallback(() => {
    try {
      router.push('/register');
    } catch {
      console.warn('[NAVIGATION] Could not navigate to /register');
    }
  }, [router]);

  // Explore Demo -> Instant demo session directly to /home
  const handleExploreDemo = useCallback(async () => {
    try {
      await authService.loginAsDemo();
      router.replace('/home');
    } catch {
      router.replace('/home');
    }
  }, [router]);

  // Terms & Conditions
  const handleTerms = useCallback(() => {
    try {
      router.push('/terms');
    } catch {
      console.warn('[NAVIGATION] Could not navigate to /terms');
    }
  }, [router]);

  // Privacy Policy
  const handlePrivacy = useCallback(() => {
    try {
      router.push('/privacy');
    } catch {
      console.warn('[NAVIGATION] Could not navigate to /privacy');
    }
  }, [router]);

  // Development Reset Handler
  const handleResetDevelopmentState = useCallback(async () => {
    try {
      await storage.clearAllDevelopmentState();
      router.replace('/welcome');
    } catch {
      router.replace('/welcome');
    }
  }, [router]);

  return (
    <AuthWelcomeScreen
      language={language}
      onSignIn={handleSignIn}
      onCreateAccount={handleCreateAccount}
      onExploreDemo={handleExploreDemo}
      onResetDevelopmentState={__DEV__ ? handleResetDevelopmentState : undefined}
      onTerms={handleTerms}
      onPrivacy={handlePrivacy}
    />
  );
}
