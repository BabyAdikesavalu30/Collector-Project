/**
 * Production OTP Verification Route (Screen 10 - /otp)
 * Reusable verification screen handling both Registration and Login OTP validation.
 * Connects otpService contracts, countdown timer, resend cooldown, language context,
 * and navigation handoff to /home upon successful verification.
 */

import React, { useCallback, useEffect, useState } from 'react';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { OtpVerificationScreen } from '../src/components/auth';
import { OtpContext, otpService } from '../src/features/auth';
import { storage, STORAGE_KEYS } from '../src/storage/asyncStorage';
import { SupportedLanguage } from '../src/config/i18n';

export default function OtpPage() {
  const router = useRouter();
  const params = useLocalSearchParams<{ mode?: string; context?: string; identifier?: string }>();

  const context: OtpContext =
    params.context === 'login' || params.mode === 'login' ? 'login' : 'register';
  const identifier = params.identifier || 'demo@vigyaan.app';

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

  // OTP Verification Handler
  const handleVerify = useCallback(
    async (code: string) => {
      try {
        const result = await otpService.verifyOtp({
          context,
          identifier,
          code,
        });

        if (result.success) {
          if (context === 'register') {
            router.replace('/profile-create');
          } else {
            router.replace('/home');
          }
        }

        return result;
      } catch {
        return {
          success: false,
          error: "We couldn't verify the code right now. Please try again.",
        };
      }
    },
    [context, identifier, router]
  );

  // OTP Resend Handler
  const handleResend = useCallback(async () => {
    try {
      const result = await otpService.resendOtp({
        context,
        identifier,
      });
      return result;
    } catch {
      return {
        success: false,
        error: "We couldn't send the code. Please try again.",
      };
    }
  }, [context, identifier]);

  // Change Identifier Handler
  const handleChangeIdentifier = useCallback(() => {
    if (context === 'login') {
      router.push('/login');
    } else {
      router.push('/register');
    }
  }, [context, router]);

  // Back Handler
  const handleBack = useCallback(() => {
    try {
      router.back();
    } catch {
      if (context === 'login') {
        router.replace('/login');
      } else {
        router.replace('/register');
      }
    }
  }, [context, router]);

  return (
    <OtpVerificationScreen
      context={context}
      identifier={identifier}
      language={language}
      onVerify={handleVerify}
      onResend={handleResend}
      onChangeIdentifier={handleChangeIdentifier}
      onBack={handleBack}
    />
  );
}
