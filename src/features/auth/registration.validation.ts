/**
 * Student Registration Form Validation
 * Centralized, pure validation logic with localized error messages for all 10 fields.
 */

import { SupportedLanguage, getTranslation } from '../../config/i18n';
import { RegistrationFormData, RegistrationValidationErrors } from './registration.types';
import { isValidEmail, isValidMobile } from './auth.validation';

export function validateRegistrationForm(
  data: RegistrationFormData,
  lang: SupportedLanguage = 'en'
): { isValid: boolean; errors: RegistrationValidationErrors } {
  const t = getTranslation(lang).auth.register;
  const errors: RegistrationValidationErrors = {};

  // 1. Full Name (max 100 chars)
  const trimmedName = data.fullName ? data.fullName.trim() : '';
  if (!trimmedName || trimmedName.length > 100) {
    errors.fullName = t.requiredFullName;
  }

  // 2. Mobile Number (10 digits)
  const trimmedMobile = data.mobile ? data.mobile.trim() : '';
  if (!trimmedMobile || !isValidMobile(trimmedMobile)) {
    errors.mobile = t.invalidMobile;
  }

  // 3. Email Address (max 100 chars)
  const trimmedEmail = data.email ? data.email.trim() : '';
  if (!trimmedEmail || trimmedEmail.length > 100 || !isValidEmail(trimmedEmail)) {
    errors.email = t.invalidEmail;
  }

  // 4. Grade / Class
  if (!data.grade || !data.grade.trim()) {
    errors.grade = t.requiredGrade;
  }

  // 5. Section
  if (!data.section || !data.section.trim()) {
    errors.section = t.requiredSection;
  }

  // 6. School / College Name (max 150 chars)
  const trimmedSchool = data.school ? data.school.trim() : '';
  if (!trimmedSchool || trimmedSchool.length > 150) {
    errors.school = t.requiredSchool;
  }

  // 7. Password (min 6, max 128 chars)
  if (!data.password || data.password.length > 128) {
    errors.password = t.requiredPassword;
  } else if (data.password.length < 6) {
    errors.password = t.passwordMinLength;
  }

  // 8. Confirm Password
  if (!data.confirmPassword) {
    errors.confirmPassword = t.requiredPassword;
  } else if (data.confirmPassword !== data.password) {
    errors.confirmPassword = t.passwordMismatch;
  }

  // 9. Terms & Conditions
  if (!data.acceptedTerms) {
    errors.terms = t.requiredTerms;
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
