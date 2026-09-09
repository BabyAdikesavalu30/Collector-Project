/**
 * Production Reset Password Route (Screen 12 - /reset-password)
 * Implements password reset execution, real-time match feedback,
 * success confirmation, and session-expired recovery handoffs.
 */

import React, { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { ResetPasswordScreen } from '../src/components/auth';
import { passwordResetService } from '../src/features/auth';
import { useLanguage } from '../src/context';

export default function ResetPasswordPage() {
  const router = useRouter();
  const { language } = useLanguage();

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
