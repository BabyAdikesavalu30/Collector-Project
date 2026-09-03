/**
 * Authentication Types & Contracts
 * Defines authentication modes, payload interfaces, session models, and profile contracts.
 */

export type AuthMode = 'password' | 'otp';

export interface PasswordLoginPayload {
  identifier: string;
  password: string;
}

export interface OtpLoginPayload {
  identifier: string;
}

export interface AuthActionResult {
  success: boolean;
  message?: string;
  error?: string;
}

export interface FormValidationErrors {
  identifier?: string;
  password?: string;
}

export interface StoredProfile {
  avatarId?: string;
  fullName?: string;
  grade?: string;
  section?: string;
  school?: string;
  city?: string;
  points?: number;
  streak?: number;
}
