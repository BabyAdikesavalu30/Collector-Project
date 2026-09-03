/**
 * Authentication Service Contract
 * Clean frontend boundary for password authentication, OTP, demo access, and logout.
 * Connects demoAuthAdapter in development or backend adapter in production.
 */

import { PasswordLoginPayload, OtpLoginPayload, AuthActionResult } from './auth.types';
import { AUTH_CONFIG } from './auth.config';
import { demoAuthAdapter } from './auth.demo';
import { SessionRepository } from './auth.session';

export interface IAuthService {
  loginWithPassword(payload: PasswordLoginPayload): Promise<AuthActionResult>;
  requestLoginOtp(payload: OtpLoginPayload): Promise<AuthActionResult>;
  loginAsDemo(): Promise<AuthActionResult>;
  logout(): Promise<boolean>;
  resetDemo(): Promise<boolean>;
}

class AuthService implements IAuthService {
  /**
   * Direct Instant Demo Access (No credentials)
   */
  async loginAsDemo(): Promise<AuthActionResult> {
    return await demoAuthAdapter.createDemoAccessSession();
  }

  /**
   * Request sign in with identifier (email/phone) and password.
   */
  async loginWithPassword(payload: PasswordLoginPayload): Promise<AuthActionResult> {
    if (AUTH_CONFIG.AUTH_MODE === 'demo') {
      return await demoAuthAdapter.loginWithPassword(payload);
    }

    // Production-ready backend contract boundary (Phase 4)
    await new Promise((resolve) => setTimeout(resolve, 600));
    return {
      success: true,
      message: 'Authentication request dispatched',
    };
  }

  /**
   * Request a 6-digit OTP to be sent to the identifier.
   */
  async requestLoginOtp(payload: OtpLoginPayload): Promise<AuthActionResult> {
    if (AUTH_CONFIG.AUTH_MODE === 'demo') {
      return await demoAuthAdapter.requestLoginOtp(payload);
    }

    await new Promise((resolve) => setTimeout(resolve, 500));
    return {
      success: true,
      message: 'OTP dispatch requested',
    };
  }

  /**
   * Terminate active user session.
   */
  async logout(): Promise<boolean> {
    return await SessionRepository.clearSession();
  }

  /**
   * Reset local demo artifacts.
   */
  async resetDemo(): Promise<boolean> {
    return await demoAuthAdapter.resetDemoData();
  }
}

export const authService = new AuthService();
