/**
 * Password Recovery Types & Contracts
 * Strongly typed payload and result models for forgot password requests.
 */

export interface PasswordRecoveryPayload {
  identifier: string;
}

export interface PasswordRecoveryResult {
  success: boolean;
  message?: string;
  error?: string;
}
