/**
 * Production Login Route (Screen 08 - /login)
 * Implements dual-mode Password and OTP login screens.
 * Integrates authService contracts, validation, language awareness,
 * and navigation boundaries to /register, /otp, /forgot-password, and /home.
 */

import React, { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { LoginScreen } from '../src/components/auth';
import { authService } from '../src/features/auth';
import { storage, STORAGE_KEYS } from '../src/storage/asyncStorage';
import { SupportedLanguage } from '../src/config/i18n';

export default function LoginPage() {
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

  // Password Login Handler
  const handleSignInWithPassword = useCallback(
    async (credentials: { identifier: string; password: string }) => {
      try {
        const result = await authService.loginWithPassword(credentials);
        if (result.success) {
          router.replace('/home');
        }
        return result;
      } catch {
        return {
          success: false,
          error: "We couldn't sign you in right now. Please try again.",
        };
      }
    },
    [router]
  );

  // OTP Request Handler
  const handleRequestOtp = useCallback(
    async (identifier: string) => {
      try {
        const result = await authService.requestLoginOtp({ identifier });
        if (result.success) {
          router.push({
            pathname: '/otp',
            params: {
              context: 'login',
              identifier,
            },
          });
        }
        return result;
      } catch {
        return {
          success: false,
          error: "We couldn't send the code. Please try again.",
        };
      }
    },
    [router]
  );

  // Forgot Password Handler
  const handleForgotPassword = useCallback(() => {
    try {
      router.push('/forgot-password');
    } catch {
      console.warn('[NAVIGATION] Could not navigate to /forgot-password');
    }
  }, [router]);

  // Create Account Handler
  const handleCreateAccount = useCallback(() => {
    try {
      router.push('/register');
    } catch {
      console.warn('[NAVIGATION] Could not navigate to /register');
    }
  }, [router]);

  // Back Handler
  const handleBack = useCallback(() => {
    try {
      router.back();
    } catch {
      router.replace('/auth-welcome');
    }
  }, [router]);

  return (
    <LoginScreen
      language={language}
      onSignInWithPassword={handleSignInWithPassword}
      onRequestOtp={handleRequestOtp}
      onForgotPassword={handleForgotPassword}
      onCreateAccount={handleCreateAccount}
      onBack={handleBack}
    />
  );
}
