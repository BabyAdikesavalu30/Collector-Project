/**
 * Production Reset Password Route (Screen 12 - /reset-password)
 * Implements password reset execution, real-time match feedback,
 * success confirmation, and session-expired recovery handoffs.
 */

import React, { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { ResetPasswordScreen } from '../src/components/auth';
import { passwordResetService } from '../src/features/auth';
import { storage, STORAGE_KEYS } from '../src/storage/asyncStorage';
import { SupportedLanguage } from '../src/config/i18n';

export default function ResetPasswordPage() {
  const router = useRouter();
  const [language, setLanguage] = useState<SupportedLanguage>('en');

  // Retrieve stored user language
  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        const stored = await storage.getItem<SupportedLanguage>(STORAGE_KEYS.USER_LANGUAGE);
        if (isMounted && stored && (stored === 'en' || stored === 'ta')) {
          setLanguage(stored);
        }
      } catch {
        // Fallback to 'en'
      }
    })();

    return () => {
      isMounted = false;
    };
  }, []);

  // Reset Password Handler
  const handleResetPassword = useCallback(
    async (passwords: { newPassword: string; confirmPassword: string }) => {
      try {
        const result = await passwordResetService.resetPassword(passwords);
        return result;
      } catch {
        return {
          success: false,
          error: "We couldn't update your password right now. Please try again.",
        };
      }
    },
    []
  );

  // Continue to Login Handler (Screen 08)
  const handleContinueToLogin = useCallback(() => {
    try {
      router.replace('/login');
    } catch {
      console.warn('[NAVIGATION] Could not navigate to /login');
    }
  }, [router]);

  // Start Again Handler (Session Expired -> Screen 11)
  const handleStartAgain = useCallback(() => {
    try {
      router.replace('/forgot-password');
    } catch {
      console.warn('[NAVIGATION] Could not navigate to /forgot-password');
    }
  }, [router]);

  // Back Handler
  const handleBack = useCallback(() => {
    try {
      router.back();
    } catch {
      router.replace('/forgot-password');
    }
  }, [router]);

  return (
    <ResetPasswordScreen
      language={language}
      onResetPassword={handleResetPassword}
      onContinueToLogin={handleContinueToLogin}
      onStartAgain={handleStartAgain}
      onBack={handleBack}
    />
  );
}
