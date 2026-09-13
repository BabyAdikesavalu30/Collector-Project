/**
 * Authentication Form Validation
 * Centralized, pure validation logic with localized error messages.
 */

import { SupportedLanguage, getTranslation } from '../../config/i18n';
import { AuthMode, FormValidationErrors } from './auth.types';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MOBILE_REGEX = /^(\+91[\-\s]?)?[6789]\d{9}$/;

export function isValidEmail(value: string): boolean {
  return EMAIL_REGEX.test(value.trim());
}

export function isValidMobile(value: string): boolean {
  const sanitized = value.replace(/[\s\-]/g, '');
  return MOBILE_REGEX.test(sanitized);
}

export function validateIdentifier(identifier: string, lang: SupportedLanguage = 'en'): string | null {
  const t = getTranslation(lang).auth.login;
  const trimmed = identifier.trim();

  if (!trimmed || trimmed.length > 100) {
    return t.requiredIdentifier;
  }

  if (!isValidEmail(trimmed) && !isValidMobile(trimmed)) {
    return t.invalidIdentifier;
  }

  return null;
}

export function validatePassword(password: string, lang: SupportedLanguage = 'en'): string | null {
  const t = getTranslation(lang).auth.login;

  if (!password || password.length > 128) {
    return t.requiredPassword;
  }

  if (password.length < 6) {
    return t.passwordMinLength;
  }

  return null;
}

export function validateLoginForm(
  mode: AuthMode,
  values: { identifier: string; password?: string },
  lang: SupportedLanguage = 'en'
): { isValid: boolean; errors: FormValidationErrors } {
  const errors: FormValidationErrors = {};

  const identifierError = validateIdentifier(values.identifier, lang);
  if (identifierError) {
    errors.identifier = identifierError;
  }

  if (mode === 'password') {
    const passwordError = validatePassword(values.password || '', lang);
    if (passwordError) {
      errors.password = passwordError;
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
