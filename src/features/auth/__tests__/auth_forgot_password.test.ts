/**
 * Unit Verification Test Suite for Screen 11 (Forgot Password)
 */

import { validateIdentifier } from '../auth.validation';
import { getTranslation } from '../../../config/i18n';

describe('Screen 11 — Forgot Password Validation & Localization', () => {
  describe('Identifier Validation', () => {
    it('accepts valid email for recovery', () => {
      expect(validateIdentifier('student@rmkec.ac.in', 'en')).toBeNull();
    });

    it('accepts valid 10-digit mobile number for recovery', () => {
      expect(validateIdentifier('9876543210', 'en')).toBeNull();
    });

    it('rejects empty or invalid identifier formats', () => {
      expect(validateIdentifier('', 'en')).toBe('Email or mobile number is required.');
      expect(validateIdentifier('invalid', 'en')).toBe('Enter a valid email or 10-digit mobile number.');
    });

    it('returns Tamil validation errors when language is ta', () => {
      expect(validateIdentifier('', 'ta')).toBe('மின்னஞ்சல் அல்லது தொலைபேசி எண் தேவை.');
      expect(validateIdentifier('invalid', 'ta')).toBe('சரியான மின்னஞ்சல் அல்லது 10 இலக்க தொலைபேசி எண்ணை உள்ளிடவும்.');
    });
  });

  describe('Localization & Privacy Messaging', () => {
    it('provides complete forgot password tokens in English', () => {
      const en = getTranslation('en').auth.forgotPassword;
      expect(en.title).toBe('Forgot Password?');
      expect(en.sendCode).toBe('Send Recovery Code');
      expect(en.successTitle).toBe('Recovery Instructions Dispatched');
      expect(en.successMessage).toContain("If an account matches these details, we'll send recovery instructions");
    });

    it('provides complete forgot password tokens in Tamil', () => {
      const ta = getTranslation('ta').auth.forgotPassword;
      expect(ta.title).toBe('கடவுச்சொல் மறந்துவிட்டதா?');
      expect(ta.sendCode).toBe('மீட்புக் குறியீடு அனுப்புக');
      expect(ta.successTitle).toBe('மீட்பு வழிமுறைகள் அனுப்பப்பட்டது');
      expect(ta.successMessage).toContain('இந்த விவரங்களுடன் கணக்கு பொருந்தினால்');
    });
  });
});
