/**
 * Production Forgot Password Route (Screen 11 - /forgot-password)
 * Implements privacy-preserving account recovery flow.
 * Connects passwordRecoveryService, language context, and navigation handoffs
 * to /reset-password (Screen 12 boundary) and /login (Screen 08).
 */

import React, { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { ForgotPasswordScreen } from '../src/components/auth';
import { passwordRecoveryService } from '../src/features/auth';
import { useLanguage } from '../src/context';

export default function ForgotPasswordPage() {
  const router = useRouter();
  const { language } = useLanguage();

  // Request Recovery Handler
  const handleRequestRecovery = useCallback(
    async (identifier: string) => {
      try {
        const result = await passwordRecoveryService.requestRecovery({ identifier });
        return result;
      } catch {
        return {
          success: false,
          error: "We couldn't send the recovery instructions right now. Please try again.",
        };
      }
    },
    []
  );

  // Proceed to Reset Password (Screen 12 Boundary)
  const handleProceedToReset = useCallback(() => {
    try {
      router.push('/reset-password');
    } catch {
      console.warn('[NAVIGATION] Could not navigate to /reset-password');
    }
  }, [router]);

  // Sign In Press -> Back to Login
  const handleSignInPress = useCallback(() => {
    try {
      router.push('/login');
    } catch {
      console.warn('[NAVIGATION] Could not navigate to /login');
    }
  }, [router]);

  // Back Handler -> Return to Login
  const handleBack = useCallback(() => {
    try {
      router.back();
    } catch {
      router.replace('/login');
    }
  }, [router]);

  return (
    <ForgotPasswordScreen
      language={language}
      onRequestRecovery={handleRequestRecovery}
      onProceedToReset={handleProceedToReset}
      onSignInPress={handleSignInPress}
      onBack={handleBack}
    />
  );
}
