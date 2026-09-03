/**
 * Unit Verification Test Suite for Screen 12 (Reset Password)
 */

import { validatePasswordResetForm } from '../passwordReset.validation';
import { getTranslation } from '../../../config/i18n';

describe('Screen 12 — Reset Password Validation & Localization', () => {
  describe('Password Reset Form Validation', () => {
    it('accepts matching passwords >= 6 characters', () => {
      const result = validatePasswordResetForm('newSecret123', 'newSecret123', 'en');
      expect(result.isValid).toBe(true);
      expect(result.errors).toEqual({});
    });

    it('rejects short password (< 6 chars)', () => {
      const result = validatePasswordResetForm('12345', '12345', 'en');
      expect(result.isValid).toBe(false);
      expect(result.errors.newPassword).toBe('Password must be at least 6 characters.');
    });

    it('rejects password mismatch', () => {
      const result = validatePasswordResetForm('secretPassword1', 'secretPassword2', 'en');
      expect(result.isValid).toBe(false);
      expect(result.errors.confirmPassword).toBe('Passwords do not match.');
    });

    it('returns Tamil validation errors when language is ta', () => {
      const result = validatePasswordResetForm('12', '12', 'ta');
      expect(result.isValid).toBe(false);
      expect(result.errors.newPassword).toBe('கடவுச்சொல் குறைந்தது 6 எழுத்துகள் இருக்க வேண்டும்.');
    });
  });

  describe('Localization Completeness', () => {
    it('provides complete reset password tokens in English and Tamil', () => {
      const en = getTranslation('en').auth.resetPassword;
      const ta = getTranslation('ta').auth.resetPassword;

      expect(en.title).toBe('Create New Password');
      expect(en.update).toBe('Update Password');
      expect(en.successTitle).toBe('Password Updated');
      expect(en.sessionExpiredTitle).toBe('Session Expired');

      expect(ta.title).toBe('புதிய கடவுச்சொல்லை உருவாக்குக');
      expect(ta.update).toBe('கடவுச்சொல்லைப் புதுப்பிக்கவும்');
      expect(ta.successTitle).toBe('கடவுச்சொல் புதுப்பிக்கப்பட்டது');
      expect(ta.sessionExpiredTitle).toBe('அமர்வு காலாவதியானது');
    });
  });
});
