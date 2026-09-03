/**
 * Password Reset Feature Types & Contracts
 * Strongly typed payload and result models for reset password workflows.
 */

export interface PasswordResetPayload {
  newPassword: string;
  confirmPassword: string;
  recoveryToken?: string;
}

export interface PasswordResetResult {
  success: boolean;
  sessionExpired?: boolean;
  message?: string;
  error?: string;
}

export interface PasswordResetValidationErrors {
  newPassword?: string;
  confirmPassword?: string;
}
