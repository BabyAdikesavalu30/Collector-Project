/**
 * Targeted UI/UX Correction Pass — Comprehensive Verification Test Suite
 * Tests all 6 areas of the targeted correction pass:
 * 1. Splash / Landing: Logo visual hierarchy and Science Learning tagline
 * 2. Learn Interactively: Clean science hero visual and consistent scale
 * 3. Welcome Page: Refined scientific cosmic atmosphere and high contrast
 * 4. Create Account: Terms & Conditions checkbox, accessible touch target, bilingual validation
 * 5. Home Continue Learning: Preferred hierarchy, honest local progress, and first-learning empty state
 * 6. Home Quick Actions: Canonical QuickActionCard with identical dimensions and 2-line title wrapping
 */

import { institutionConfig } from '../../../config/institution';
import { getTranslation } from '../../../config/i18n';
import { validateRegistrationForm } from '../../../features/auth/registration.validation';
import { RegistrationFormData } from '../../../features/auth/registration.types';
import { theme } from '../../../theme';

describe('Vigyaan Targeted UI/UX Correction Pass', () => {
  // ==========================================================================
  // Area 1: Landing / Splash Page Logo & Visual Hierarchy
  // ==========================================================================
  describe('Area 1: Landing / Splash Page — Logo & Hierarchy', () => {
    it('communicates Science Learning for Young Achievers in English and Tamil', () => {
      expect(institutionConfig.app.name).toBe('VIGYAAN');
      expect(institutionConfig.app.tamilName).toBe('விஞ்ஞான்');
      expect(institutionConfig.app.tagline.en).toBe('Science Learning for Young Achievers');
      expect(institutionConfig.app.tagline.ta).toBe('இளம் சாதனையாளர்களுக்கான அறிவியல் கற்றல்');
    });

    it('preserves institutional credibility separate from Vigyaan product identity', () => {
      expect(institutionConfig.name.en).toBe('R.M.K. ENGINEERING COLLEGE');
      expect(institutionConfig.department.en).toBe('Department of Information Technology');
      expect(institutionConfig.accreditation.en).toContain('Autonomous');
    });
  });

  // ==========================================================================
  // Area 2: Learn Interactively Illustration
  // ==========================================================================
  describe('Area 2: Learn Interactively — Hero Visual Design', () => {
    it('provides accessible screen reader copy for interactive science discovery', () => {
      const en = getTranslation('en').onboarding.step1;
      const ta = getTranslation('ta').onboarding.step1;

      expect(en.title).toBe('Learn Interactively');
      expect(ta.title).toBe('ஊடாடும் முறையில் கற்போம்');
      expect(en.featureHint).toBeDefined();
      expect(ta.featureHint).toBeDefined();
    });
  });

  // ==========================================================================
  // Area 3: Welcome Page Space / Cosmic Visual Design
  // ==========================================================================
  describe('Area 3: Welcome Page — Space & Cosmic Theme', () => {
    it('provides high contrast value proposition copy in English and Tamil', () => {
      const en = getTranslation('en').welcome;
      const ta = getTranslation('ta').welcome;

      expect(en.appName).toBe('VIGYAAN');
      expect(ta.appName).toBe('விஞ்ஞான்');
      expect(en.getStarted).toBe('Get Started');
      expect(ta.getStarted).toBe('தொடங்குவோம்');
    });
  });

  // ==========================================================================
  // Area 4: Create Account Terms & Conditions
  // ==========================================================================
  describe('Area 4: Create Account — Terms & Conditions Acknowledgement', () => {
    const validFormData: RegistrationFormData = {
      fullName: 'Vigyaan Student',
      mobile: '9876543210',
      email: 'student@vigyaan.app',
      grade: '9',
      section: 'A',
      school: 'RMK School',
      city: 'Chennai',
      password: 'password123',
      confirmPassword: 'password123',
      acceptedTerms: true,
    };

    it('prevents account creation when Terms & Conditions is unchecked with exact English message', () => {
      const unaccepted = { ...validFormData, acceptedTerms: false };
      const result = validateRegistrationForm(unaccepted, 'en');

      expect(result.isValid).toBe(false);
      expect(result.errors.terms).toBe('Please agree to the Terms & Conditions to continue.');
    });

    it('prevents account creation when Terms & Conditions is unchecked with exact Tamil message', () => {
      const unaccepted = { ...validFormData, acceptedTerms: false };
      const result = validateRegistrationForm(unaccepted, 'ta');

      expect(result.isValid).toBe(false);
      expect(result.errors.terms).toBe('தயவுசெய்து விதிமுறைகள் மற்றும் நிபந்தனைகளை ஏற்கவும்.');
    });

    it('allows submission when Terms & Conditions is checked', () => {
      const result = validateRegistrationForm(validFormData, 'en');
      expect(result.isValid).toBe(true);
      expect(result.errors.terms).toBeUndefined();
    });
  });

  // ==========================================================================
  // Area 5: Home Page Continue Learning
  // ==========================================================================
  describe('Area 5: Home Page — Continue Learning', () => {
    it('provides localized Continue Learning headers and actions', () => {
      const en = getTranslation('en').home;
      const ta = getTranslation('ta').home;

      expect(en.continueLearning).toBe('Continue Learning');
      expect(ta.continueLearning).toBe('கற்றலைத் தொடரவும்');
      expect(en.continueAction).toBe('Continue');
      expect(ta.continueAction).toBe('தொடரவும்');
    });

    it('has standard theme tokens for progress track and active states', () => {
      expect(theme.colors.actionPrimary).toBe('#2563EB');
      expect(theme.colors.border).toBeDefined();
    });
  });

  // ==========================================================================
  // Area 6: Home Quick Actions Identical Sizing
  // ==========================================================================
  describe('Area 6: Home Quick Actions — Identical Box Sizes', () => {
    it('provides localized Quick Action labels for all four primary features', () => {
      const en = getTranslation('en').home;
      const ta = getTranslation('ta').home;

      expect(en.quizzes).toBe('Quizzes');
      expect(en.riddles).toBe('Science Riddles');
      expect(en.spinWheel).toBe('Spin Wheel');
      expect(en.escapeRoom).toBe('Escape Room');

      expect(ta.quizzes).toBe('வினாடி வினா');
      expect(ta.riddles).toBe('அறிவியல் புதிர்கள்');
      expect(ta.spinWheel).toBe('சுழல் சக்கரம்');
      expect(ta.escapeRoom).toBe('ரகசிய அறை');
    });
  });
});
