/**
 * Unit Verification Test Suite for Screen 09 (Student Registration)
 */

import { validateRegistrationForm } from '../registration.validation';
import { RegistrationFormData } from '../registration.types';
import { getTranslation } from '../../../config/i18n';

describe('Screen 09 — Student Registration Validation & Localization', () => {
  const validMockData: RegistrationFormData = {
    fullName: 'Adhavan Raman',
    mobile: '9876543210',
    email: 'adhavan@rmkec.ac.in',
    grade: 'Grade 10',
    section: 'A',
    school: 'R.M.K. Matriculation Higher Secondary School',
    city: 'Chennai',
    password: 'securePassword123',
    confirmPassword: 'securePassword123',
    acceptedTerms: true,
  };

  describe('Form Validation Rules', () => {
    it('accepts completely valid registration data', () => {
      const result = validateRegistrationForm(validMockData, 'en');
      expect(result.isValid).toBe(true);
      expect(result.errors).toEqual({});
    });

    it('rejects empty required fields', () => {
      const invalidData: RegistrationFormData = {
        fullName: '',
        mobile: '',
        email: '',
        grade: '',
        section: '',
        school: '',
        password: '',
        confirmPassword: '',
        acceptedTerms: false,
      };

      const result = validateRegistrationForm(invalidData, 'en');
      expect(result.isValid).toBe(false);
      expect(result.errors.fullName).toBeDefined();
      expect(result.errors.mobile).toBeDefined();
      expect(result.errors.email).toBeDefined();
      expect(result.errors.grade).toBeDefined();
      expect(result.errors.section).toBeDefined();
      expect(result.errors.school).toBeDefined();
      expect(result.errors.password).toBeDefined();
      expect(result.errors.terms).toBeDefined();
    });

    it('flags password mismatch', () => {
      const mismatchData = {
        ...validMockData,
        confirmPassword: 'differentPassword456',
      };

      const result = validateRegistrationForm(mismatchData, 'en');
      expect(result.isValid).toBe(false);
      expect(result.errors.confirmPassword).toBe('Passwords do not match.');
    });

    it('returns Tamil validation errors when language is ta', () => {
      const invalidData: RegistrationFormData = {
        ...validMockData,
        fullName: '',
        acceptedTerms: false,
      };

      const result = validateRegistrationForm(invalidData, 'ta');
      expect(result.isValid).toBe(false);
      expect(result.errors.fullName).toBe('உங்கள் முழு பெயரை உள்ளிடவும்.');
      expect(result.errors.terms).toBe('தயவுசெய்து விதிமுறைகள் மற்றும் நிபந்தனைகளை ஏற்கவும்.');
    });
  });

  describe('Localization Completeness', () => {
    it('provides complete register tokens in English and Tamil', () => {
      const en = getTranslation('en').auth.register;
      const ta = getTranslation('ta').auth.register;

      expect(en.title).toBe('Create Your Account');
      expect(en.personalSection).toBe('1. Personal & Contact');
      expect(en.academicSection).toBe('2. Academic Details');
      expect(en.createAccount).toBe('Create Account');

      expect(ta.title).toBe('உங்கள் கணக்கை உருவாக்குக');
      expect(ta.personalSection).toBe('1. தனிப்பட்ட & தொடர்பு விவரங்கள்');
      expect(ta.academicSection).toBe('2. கல்வி விவரங்கள்');
      expect(ta.createAccount).toBe('கணக்கை உருவாக்குக');
    });
  });
});
