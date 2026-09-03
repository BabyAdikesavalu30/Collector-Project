/**
 * Unit Verification Test Suite for Screen 10 (OTP Verification)
 */

import { isValidOtp, maskIdentifier, formatCountdown } from '../otp.validation';
import { getTranslation } from '../../../config/i18n';

describe('Screen 10 — OTP Validation, Masking & Localization', () => {
  describe('OTP Code Validation', () => {
    it('accepts strictly 6-digit numeric codes', () => {
      expect(isValidOtp('123456')).toBe(true);
      expect(isValidOtp('000000')).toBe(true);
      expect(isValidOtp('987654')).toBe(true);
    });

    it('rejects non-numeric or invalid length codes', () => {
      expect(isValidOtp('12345')).toBe(false);
      expect(isValidOtp('1234567')).toBe(false);
      expect(isValidOtp('12345a')).toBe(false);
      expect(isValidOtp('')).toBe(false);
    });
  });

  describe('Identifier Masking', () => {
    it('masks 10-digit mobile numbers with country code', () => {
      expect(maskIdentifier('+91 9876543210')).toBe('+91 ••••••3210');
      expect(maskIdentifier('9876543210')).toBe('••••••3210');
    });

    it('masks email addresses preserving prefix and domain', () => {
      expect(maskIdentifier('student@rmkec.ac.in')).toBe('st••••••@rmkec.ac.in');
      expect(maskIdentifier('ab@gmail.com')).toBe('ab•••@gmail.com');
    });
  });

  describe('Countdown Formatter', () => {
    it('formats seconds into MM:SS correctly', () => {
      expect(formatCountdown(300)).toBe('05:00');
      expect(formatCountdown(299)).toBe('04:59');
      expect(formatCountdown(30)).toBe('00:30');
      expect(formatCountdown(0)).toBe('00:00');
    });
  });

  describe('Localization Completeness', () => {
    it('provides complete OTP verification tokens in English and Tamil', () => {
      const en = getTranslation('en').auth.otp;
      const ta = getTranslation('ta').auth.otp;

      expect(en.titleRegister).toBe('Verify Your Account');
      expect(en.titleLogin).toBe('Verify OTP Sign In');
      expect(en.verify).toBe('Verify');
      expect(en.resendCode).toBe('Resend Code');

      expect(ta.titleRegister).toBe('கணக்கைச் சரிபார்க்கவும்');
      expect(ta.titleLogin).toBe('OTP உள்நுழைவைச் சரிபார்க்கவும்');
      expect(ta.verify).toBe('சரிபார்க்கவும்');
      expect(ta.resendCode).toBe('புதிய குறியீடு அனுப்புக');
    });
  });
});
