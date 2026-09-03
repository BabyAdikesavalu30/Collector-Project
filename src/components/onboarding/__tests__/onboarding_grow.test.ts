/**
 * Unit Verification Test Suite for Screen 05 (Onboarding: Think. Explore. Grow.)
 */

import { getTranslation } from '../../../config/i18n';
import { theme } from '../../../theme';

describe('Screen 05 — Onboarding Think. Explore. Grow. Verification', () => {
  describe('Localization Completeness', () => {
    it('provides complete English onboarding step 3 translations', () => {
      const en = getTranslation('en').onboarding;
      expect(en.next).toBe('Next');
      expect(en.skip).toBe('Skip');
      expect(en.step3.tag).toBe('EXPLORE');
      expect(en.step3.title).toBe('Think. Explore. Grow.');
      expect(en.step3.description).toBe(
        'Riddles, Spin Wheel, Fun Facts and Escape Rooms make science exciting.'
      );
      expect(en.step3.featureHint).toBe('Riddles • Spin Wheel • Escape Rooms');
    });

    it('provides complete Tamil onboarding step 3 translations', () => {
      const ta = getTranslation('ta').onboarding;
      expect(ta.next).toBe('அடுத்து');
      expect(ta.skip).toBe('தவிர்');
      expect(ta.step3.tag).toBe('ஆராய்வோம்');
      expect(ta.step3.title).toBe('சிந்திப்போம். ஆராய்வோம். வளர்வோம்.');
      expect(ta.step3.description).toBe(
        'புதிர்கள், சுழல் சக்கரம், சுவாரஸ்ய தகவல்கள் மற்றும் சாகச அறைகள் அறிவியலை உற்சாகமாக்குகின்றன.'
      );
      expect(ta.step3.featureHint).toBe('புதிர்கள் • சுழல் சக்கரம் • சாகச அறைகள்');
    });

    it('provides accessible screen reader labels and hints for step 3', () => {
      const en = getTranslation('en').onboarding.accessibility;
      const ta = getTranslation('ta').onboarding.accessibility;

      expect(en.step3Indicator).toBe('Onboarding step 3 of 3');
      expect(en.illustrationStep3).toBeDefined();

      expect(ta.step3Indicator).toBe('அறிமுகப் படி 3 / 3');
      expect(ta.illustrationStep3).toBeDefined();
    });
  });

  describe('Theme and Design System Tokens', () => {
    it('provides science exploration emerald, cyan, and brand primary tokens', () => {
      expect(theme.colors.success).toBe('#16A34A');
      expect(theme.colors.brandPrimary).toBe('#7E22CE');
      expect(theme.colors.pearlWhite).toBe('#F8FAFC');
      expect(theme.borderRadius.full).toBe(9999);
    });
  });
});
