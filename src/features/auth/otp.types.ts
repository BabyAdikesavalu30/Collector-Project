/**
 * OTP Feature Types & Contracts
 * Strongly typed models for registration and login OTP verification.
 */

export type OtpContext = 'register' | 'login';
export type IdentifierType = 'email' | 'phone';

export interface OtpVerifyPayload {
  context: OtpContext;
  identifier: string;
  code: string;
}

export interface OtpResendPayload {
  context: OtpContext;
  identifier: string;
}

export interface OtpActionResult {
  success: boolean;
  message?: string;
  error?: string;
  expiresAt?: number;
}
