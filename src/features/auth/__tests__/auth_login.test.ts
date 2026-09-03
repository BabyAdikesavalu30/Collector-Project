/**
 * Unit Verification Test Suite for Screen 08 (Production Login)
 */

import { validateIdentifier, validatePassword, validateLoginForm } from '../auth.validation';
import { getTranslation } from '../../../config/i18n';

describe('Screen 08 — Login Validation & Localization', () => {
  describe('Identifier Validation', () => {
    it('accepts valid email addresses', () => {
      expect(validateIdentifier('student@rmkec.ac.in', 'en')).toBeNull();
      expect(validateIdentifier('user.name+tag@example.com', 'en')).toBeNull();
    });

    it('accepts valid 10-digit mobile numbers', () => {
      expect(validateIdentifier('9876543210', 'en')).toBeNull();
      expect(validateIdentifier('+919876543210', 'en')).toBeNull();
      expect(validateIdentifier('7890123456', 'en')).toBeNull();
    });

    it('rejects empty and invalid identifiers', () => {
      expect(validateIdentifier('', 'en')).toBe('Email or mobile number is required.');
      expect(validateIdentifier('invalid-id', 'en')).toBe('Enter a valid email or 10-digit mobile number.');
      expect(validateIdentifier('12345', 'en')).toBe('Enter a valid email or 10-digit mobile number.');
    });

    it('returns Tamil validation errors when language is ta', () => {
      expect(validateIdentifier('', 'ta')).toBe('மின்னஞ்சல் அல்லது தொலைபேசி எண் தேவை.');
      expect(validateIdentifier('invalid', 'ta')).toBe('சரியான மின்னஞ்சல் அல்லது 10 இலக்க தொலைபேசி எண்ணை உள்ளிடவும்.');
    });
  });

  describe('Password Validation', () => {
    it('accepts passwords with >= 6 characters', () => {
      expect(validatePassword('secret123', 'en')).toBeNull();
      expect(validatePassword('123456', 'en')).toBeNull();
    });

    it('rejects empty or short passwords', () => {
      expect(validatePassword('', 'en')).toBe('Password is required.');
      expect(validatePassword('123', 'en')).toBe('Password must be at least 6 characters.');
    });

    it('returns Tamil password errors when language is ta', () => {
      expect(validatePassword('', 'ta')).toBe('கடவுச்சொல் தேவை.');
      expect(validatePassword('12', 'ta')).toBe('கடவுச்சொல் குறைந்தது 6 எழுத்துகள் இருக்க வேண்டும்.');
    });
  });

  describe('Form Validation in Modes', () => {
    it('validates password mode comprehensively', () => {
      const result = validateLoginForm('password', { identifier: 'student@example.com', password: 'password123' }, 'en');
      expect(result.isValid).toBe(true);
      expect(result.errors).toEqual({});
    });

    it('validates OTP mode requiring only valid identifier', () => {
      const result = validateLoginForm('otp', { identifier: '9876543210' }, 'en');
      expect(result.isValid).toBe(true);
      expect(result.errors).toEqual({});
    });
  });

  describe('Localization Completeness', () => {
    it('provides complete login tokens in English and Tamil', () => {
      const en = getTranslation('en').auth.login;
      const ta = getTranslation('ta').auth.login;

      expect(en.title).toBe('Welcome back!');
      expect(en.passwordMode).toBe('Password');
      expect(en.otpMode).toBe('OTP');
      expect(en.signIn).toBe('Sign In');
      expect(en.sendOtp).toBe('Send OTP');

      expect(ta.title).toBe('மீண்டும் வருக!');
      expect(ta.passwordMode).toBe('கடவுச்சொல்');
      expect(ta.otpMode).toBe('OTP');
      expect(ta.signIn).toBe('உள்நுழைக');
      expect(ta.sendOtp).toBe('OTP அனுப்புக');
    });
  });
});
