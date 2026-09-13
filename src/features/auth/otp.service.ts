/**
 * OTP Service Contract
 * Clean frontend service boundary for OTP verification and resend triggers.
 * Connects demoAuthAdapter in development or backend adapter in production.
 */

import { OtpVerifyPayload, OtpResendPayload, OtpActionResult } from './otp.types';
import { AUTH_CONFIG } from './auth.config';
import { demoAuthAdapter } from './auth.demo';

export interface IOtpService {
  verifyOtp(payload: OtpVerifyPayload): Promise<OtpActionResult>;
  resendOtp(payload: OtpResendPayload): Promise<OtpActionResult>;
}

class OtpService implements IOtpService {
  /**
   * Verify entered 6-digit code for the specified context and identifier.
   */
  async verifyOtp(payload: OtpVerifyPayload): Promise<OtpActionResult> {
    if (AUTH_CONFIG.AUTH_MODE === 'demo') {
      return await demoAuthAdapter.verifyOtp(payload);
    }

    return {
      success: false,
      error: 'Backend OTP verification service is not configured',
    };
  }

  /**
   * Request a new 6-digit OTP code.
   */
  async resendOtp(payload: OtpResendPayload): Promise<OtpActionResult> {
    if (AUTH_CONFIG.AUTH_MODE === 'demo') {
      return await demoAuthAdapter.resendOtp(payload);
    }

    return {
      success: false,
      error: 'Backend OTP resend service is not configured',
    };
  }
}

export const otpService = new OtpService();
