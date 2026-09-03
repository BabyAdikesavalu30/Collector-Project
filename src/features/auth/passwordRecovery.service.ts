/**
 * Password Recovery Service Contract
 * Clean frontend service boundary for forgot password recovery triggers.
 * Isolated from raw backend clients; ready for Supabase / API integration.
 */

import { PasswordRecoveryPayload, PasswordRecoveryResult } from './passwordRecovery.types';

export interface IPasswordRecoveryService {
  requestRecovery(payload: PasswordRecoveryPayload): Promise<PasswordRecoveryResult>;
}

class PasswordRecoveryService implements IPasswordRecoveryService {
  /**
   * Request password recovery instructions for the given identifier.
   * NOTE: Does NOT log the raw email/phone in compliance with strict privacy standards.
   */
  async requestRecovery(payload: PasswordRecoveryPayload): Promise<PasswordRecoveryResult> {

    // Simulated short delay for UI state transition
    await new Promise((resolve) => setTimeout(resolve, 650));

    // Production-ready contract boundary (Awaiting Phase 4 backend integration)
    return {
      success: true,
      message: 'Recovery instructions request dispatched',
    };
  }
}

export const passwordRecoveryService = new PasswordRecoveryService();
