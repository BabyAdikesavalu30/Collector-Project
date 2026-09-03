/**
 * Unit Verification Test Suite for Screen 02 (Welcome Screen)
 */

import { getTranslation } from '../../../config/i18n';
import { institutionConfig } from '../../../config/institution';
import { theme } from '../../../theme';

describe('Screen 02 — Production Welcome Screen Verification', () => {
  describe('Localization Completeness', () => {
    it('provides complete English welcome translations', () => {
      const en = getTranslation('en').welcome;
      expect(en.appName).toBe('VIGYAAN');
      expect(en.title).toBe('Welcome to Vigyaan');
      expect(en.subtitle).toBe('Explore science through questions, challenges and discovery.');
      expect(en.getStarted).toBe('Get Started');
      expect(en.alreadyAccount).toBe('Already have an account?');
      expect(en.signIn).toBe('Sign In');
      expect(en.valueProps.curiosity).toBe('Interactive Science Quizzes');
      expect(en.valueProps.learning).toBe('Bilingual Tamil & English');
      expect(en.valueProps.achievement).toBe('Gamified Young Achiever Badges');
    });

    it('provides complete Tamil welcome translations without English fallbacks', () => {
      const ta = getTranslation('ta').welcome;
      expect(ta.appName).toBe('விஞ்ஞான்');
      expect(ta.title).toBe('விஞ்ஞான் உங்களை வரவேற்கிறது');
      expect(ta.subtitle).toBe('வினாக்கள், சவால்கள் மற்றும் ஆய்வுகள் மூலம் அறிவியலை அறிவோம்.');
      expect(ta.getStarted).toBe('தொடங்குவோம்');
      expect(ta.alreadyAccount).toBe('ஏற்கனவே கணக்கு உள்ளதா?');
      expect(ta.signIn).toBe('உள்நுழைக');
      expect(ta.valueProps.curiosity).toBe('ஊடாடும் அறிவியல் வினாடி வினா');
      expect(ta.valueProps.learning).toBe('தமிழ் மற்றும் ஆங்கில வழி கற்றல்');
      expect(ta.valueProps.achievement).toBe('வெற்றியாளர் விருதுகள் & பதக்கங்கள்');
    });

    it('provides accessible screen reader labels in both languages', () => {
      const en = getTranslation('en').welcome.accessibility;
      const ta = getTranslation('ta').welcome.accessibility;

      expect(en.screenLabel).toBeDefined();
      expect(en.getStartedHint).toBeDefined();
      expect(en.signInHint).toBeDefined();

      expect(ta.screenLabel).toBeDefined();
      expect(ta.getStartedHint).toBeDefined();
      expect(ta.signInHint).toBeDefined();
    });
  });

  describe('Institutional Identity Integrity', () => {
    it('integrates R.M.K. Engineering College and IT Department metadata', () => {
      expect(institutionConfig.name.en).toBe('R.M.K. ENGINEERING COLLEGE');
      expect(institutionConfig.department.en).toBe('Department of Information Technology');
      expect(institutionConfig.branding.crestInitials).toBe('RMK');
    });
  });

  describe('Theme Semantic Tokens Integrity', () => {
    it('provides high-contrast CTA and deep background tokens', () => {
      expect(theme.colors.brandPrimary).toBe('#7E22CE');
      expect(theme.colors.backgroundPrimary).toBe('#F8FAFC');
      expect(theme.colors.textPrimary).toBe('#0F172A');
      expect(theme.borderRadius.full).toBe(9999);
    });
  });
});
