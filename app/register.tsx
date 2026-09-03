/**
 * Production Student Registration Route (Screen 09 - /register)
 * Renders progressive 4-section student registration form.
 * Connects registrationService, language context, and navigation handoffs
 * to /otp (Screen 10), /login (Screen 08), and /auth-welcome (Screen 07).
 */

import React, { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { RegistrationScreen } from '../src/components/auth';
import { RegistrationFormData, registrationService } from '../src/features/auth';
import { storage, STORAGE_KEYS } from '../src/storage/asyncStorage';
import { SupportedLanguage } from '../src/config/i18n';

export default function RegisterPage() {
  const router = useRouter();
  const [language, setLanguage] = useState<SupportedLanguage>('en');

  // Retrieve stored user language preference
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

  // Registration Submission Handler
  const handleSubmitRegistration = useCallback(
    async (data: RegistrationFormData) => {
      try {
        const result = await registrationService.registerStudent(data);
        if (result.success) {
          router.push({
            pathname: '/otp',
            params: {
              context: 'register',
              identifier: data.email || data.mobile,
            },
          });
        }
        return result;
      } catch {
        return {
          success: false,
          error: "We couldn't create your account right now. Please try again.",
        };
      }
    },
    [router]
  );

  // Sign In Handler -> Navigate to Login
  const handleSignInPress = useCallback(() => {
    try {
      router.push('/login');
    } catch {
      console.warn('[NAVIGATION] Could not navigate to /login');
    }
  }, [router]);

  // Back Handler -> Return to Auth Welcome
  const handleBack = useCallback(() => {
    try {
      router.back();
    } catch {
      router.replace('/auth-welcome');
    }
  }, [router]);

  return (
    <RegistrationScreen
      language={language}
      onSubmitRegistration={handleSubmitRegistration}
      onSignInPress={handleSignInPress}
      onBack={handleBack}
    />
  );
}
