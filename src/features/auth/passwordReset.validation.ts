/**
 * Password Reset Validation
 * Pure validation logic for new password and confirm password matching with localized errors.
 */

import { SupportedLanguage, getTranslation } from '../../config/i18n';
import { PasswordResetValidationErrors } from './passwordReset.types';

export function validatePasswordResetForm(
  newPassword: string,
  confirmPassword: string,
  lang: SupportedLanguage = 'en'
): { isValid: boolean; errors: PasswordResetValidationErrors } {
  const t = getTranslation(lang).auth.resetPassword;
  const errors: PasswordResetValidationErrors = {};

  if (!newPassword) {
    errors.newPassword = t.requiredNewPassword;
  } else if (newPassword.length < 6) {
    errors.newPassword = t.passwordMinLength;
  }

  if (!confirmPassword) {
    errors.confirmPassword = t.requiredConfirmPassword;
  } else if (confirmPassword !== newPassword) {
    errors.confirmPassword = t.passwordMismatch;
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
