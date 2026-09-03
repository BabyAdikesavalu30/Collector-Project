/**
 * Unit Verification Test Suite for Screen 03 (Onboarding: Discover)
 */

import { getTranslation } from '../../../config/i18n';
import { theme } from '../../../theme';

describe('Screen 03 — Onboarding Discover Verification', () => {
  describe('Localization Completeness', () => {
    it('provides complete English onboarding step 1 translations', () => {
      const en = getTranslation('en').onboarding;
      expect(en.next).toBe('Next');
      expect(en.skip).toBe('Skip');
      expect(en.step1.title).toBe('Learn Interactively');
      expect(en.step1.description).toBe(
        'Explore science through interactive questions, hints and instant feedback.'
      );
      expect(en.step1.tag).toBe('DISCOVER');
    });

    it('provides complete Tamil onboarding step 1 translations', () => {
      const ta = getTranslation('ta').onboarding;
      expect(ta.next).toBe('அடுத்து');
      expect(ta.skip).toBe('தவிர்');
      expect(ta.step1.title).toBe('ஊடாடும் முறையில் கற்போம்');
      expect(ta.step1.description).toBe(
        'வினாக்கள், குறிப்புகள் மற்றும் உடனடி முடிவுகள் மூலம் அறிவியலை சுவாரஸ்யமாகக் கற்போம்.'
      );
      expect(ta.step1.tag).toBe('கண்டறிவோம்');
    });

    it('provides accessible screen reader labels and hints for step 1', () => {
      const en = getTranslation('en').onboarding.accessibility;
      const ta = getTranslation('ta').onboarding.accessibility;

      expect(en.step1Indicator).toBe('Onboarding step 1 of 3');
      expect(en.skipButton).toBe('Skip onboarding');
      expect(en.nextButton).toBe('Next');
      expect(en.illustrationStep1).toBeDefined();

      expect(ta.step1Indicator).toBe('அறிமுகப் படி 1 / 3');
      expect(ta.skipButton).toBe('அறிமுகத்தைத் தவிர்');
      expect(ta.nextButton).toBe('அடுத்து');
      expect(ta.illustrationStep1).toBeDefined();
    });
  });

  describe('Theme and Accessibility Tokens', () => {
    it('provides high-contrast CTA and indicator tokens', () => {
      expect(theme.colors.actionPrimary).toBe('#2563EB');
      expect(theme.colors.brandPrimary).toBe('#7E22CE');
      expect(theme.colors.pearlWhite).toBe('#F8FAFC');
      expect(theme.borderRadius.full).toBe(9999);
    });
  });
});
