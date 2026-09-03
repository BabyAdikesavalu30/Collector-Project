/**
 * Unit Verification Test Suite for Screen 07 (Authentication Welcome)
 */

import { getTranslation } from '../../../config/i18n';
import { theme } from '../../../theme';

describe('Screen 07 — Authentication Welcome Verification', () => {
  describe('Localization Completeness', () => {
    it('provides complete English auth welcome translations', () => {
      const en = getTranslation('en').authWelcome;
      expect(en.title).toBe('Welcome to Vigyaan');
      expect(en.subtitle).toBe('Continue your science learning journey.');
      expect(en.signIn).toBe('Sign In');
      expect(en.createAccount).toBe('Create Account');
      expect(en.progressMessage).toBe('Your learning progress stays with your account.');
    });

    it('provides complete Tamil auth welcome translations', () => {
      const ta = getTranslation('ta').authWelcome;
      expect(ta.title).toBe('விஞ்ஞான் உங்களை வரவேற்கிறது');
      expect(ta.subtitle).toBe('உங்கள் அறிவியல் கற்றல் பயணத்தைத் தொடருங்கள்.');
      expect(ta.signIn).toBe('உள்நுழைக');
      expect(ta.createAccount).toBe('புதிய கணக்கு உருவாக்குக');
      expect(ta.progressMessage).toBe('உங்கள் கற்றல் முன்னேற்றம் கணக்கில் பாதுகாப்பாக சேமிக்கப்படும்.');
    });

    it('provides accessible screen reader labels and hints for auth welcome', () => {
      const en = getTranslation('en').authWelcome.accessibility;
      const ta = getTranslation('ta').authWelcome.accessibility;

      expect(en.screenLabel).toBeDefined();
      expect(en.signInHint).toBeDefined();
      expect(en.createAccountHint).toBeDefined();

      expect(ta.screenLabel).toBeDefined();
      expect(ta.signInHint).toBeDefined();
      expect(ta.createAccountHint).toBeDefined();
    });
  });

  describe('Theme and Design System Tokens', () => {
    it('provides brand primary and typography button tokens', () => {
      expect(theme.colors.brandPrimary).toBe('#7E22CE');
      expect(theme.colors.backgroundPrimary).toBe('#F8FAFC');
      expect(theme.typography.button.fontSize).toBe(16);
    });
  });
});
