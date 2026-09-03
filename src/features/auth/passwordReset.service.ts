/**
 * Password Reset Service Contract
 * Clean frontend service boundary for password reset execution.
 * Isolated from raw backend clients; ready for Supabase / API integration.
 */

import { PasswordResetPayload, PasswordResetResult } from './passwordReset.types';

export interface IPasswordResetService {
  resetPassword(payload: PasswordResetPayload): Promise<PasswordResetResult>;
}

class PasswordResetService implements IPasswordResetService {
  /**
   * Submit new password for account credential update.
   * NOTE: Never logs passwords or tokens in compliance with mobile security rules.
   */
  async resetPassword(payload: PasswordResetPayload): Promise<PasswordResetResult> {

    // Simulated short delay for UI state transition
    await new Promise((resolve) => setTimeout(resolve, 700));

    // Production-ready contract boundary (Awaiting Phase 4 backend integration)
    return {
      success: true,
      message: 'Password update request dispatched',
    };
  }
}

export const passwordResetService = new PasswordResetService();
