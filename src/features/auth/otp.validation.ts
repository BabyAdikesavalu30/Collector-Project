/**
 * OTP Validation & Utility Helpers
 * Pure functions for 6-digit code validation, identifier masking, and countdown formatting.
 */

const OTP_DIGITS_REGEX = /^\d{6}$/;

export function isValidOtp(code: string): boolean {
  return OTP_DIGITS_REGEX.test(code.trim());
}

export function maskIdentifier(identifier: string): string {
  const trimmed = identifier.trim();
  if (!trimmed) return '••••••';

  // Email Masking
  if (trimmed.includes('@')) {
    const parts = trimmed.split('@');
    const local = parts[0];
    const domain = parts[1] || '';
    if (local.length <= 2) {
      return `${local}•••@${domain}`;
    }
    const visiblePrefix = local.slice(0, 2);
    return `${visiblePrefix}••••••@${domain}`;
  }

  // Mobile / Phone Masking
  const digitsOnly = trimmed.replace(/\D/g, '');
  if (digitsOnly.length >= 10) {
    const last4 = digitsOnly.slice(-4);
    const countryPrefix = trimmed.startsWith('+91') ? '+91 ' : '';
    return `${countryPrefix}••••••${last4}`;
  }

  if (trimmed.length > 4) {
    const last4 = trimmed.slice(-4);
    return `••••••${last4}`;
  }

  return '••••••' + trimmed;
}

export function formatCountdown(seconds: number): string {
  const safeSeconds = Math.max(0, Math.floor(seconds));
  const mins = Math.floor(safeSeconds / 60);
  const secs = safeSeconds % 60;
  const mm = mins < 10 ? `0${mins}` : `${mins}`;
  const ss = secs < 10 ? `0${secs}` : `${secs}`;
  return `${mm}:${ss}`;
}
