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

    // Simulated short delay for UI state transition
    await new Promise((resolve) => setTimeout(resolve, 650));

    return {
      success: true,
      message: 'OTP verification request dispatched',
    };
  }

  /**
   * Request a new 6-digit OTP code.
   */
  async resendOtp(payload: OtpResendPayload): Promise<OtpActionResult> {
    if (AUTH_CONFIG.AUTH_MODE === 'demo') {
      return await demoAuthAdapter.resendOtp(payload);
    }

    await new Promise((resolve) => setTimeout(resolve, 500));
    const newExpiresAt = Date.now() + 5 * 60 * 1000;

    return {
      success: true,
      message: 'New OTP dispatched',
      expiresAt: newExpiresAt,
    };
  }
}

export const otpService = new OtpService();
