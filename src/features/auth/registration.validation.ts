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

  // 1. Full Name
  if (!data.fullName || !data.fullName.trim()) {
    errors.fullName = t.requiredFullName;
  }

  // 2. Mobile Number (10 digits)
  if (!data.mobile || !data.mobile.trim()) {
    errors.mobile = t.invalidMobile;
  } else if (!isValidMobile(data.mobile)) {
    errors.mobile = t.invalidMobile;
  }

  // 3. Email Address
  if (!data.email || !data.email.trim()) {
    errors.email = t.invalidEmail;
  } else if (!isValidEmail(data.email)) {
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

  // 6. School / College Name
  if (!data.school || !data.school.trim()) {
    errors.school = t.requiredSchool;
  }

  // 7. Password
  if (!data.password) {
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
