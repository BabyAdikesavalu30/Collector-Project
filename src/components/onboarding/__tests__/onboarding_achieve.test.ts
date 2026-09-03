/**
 * Unit Verification Test Suite for Screen 04 (Onboarding: Earn & Achieve)
 */

import { getTranslation } from '../../../config/i18n';
import { theme } from '../../../theme';

describe('Screen 04 — Onboarding Earn & Achieve Verification', () => {
  describe('Localization Completeness', () => {
    it('provides complete English onboarding step 2 translations', () => {
      const en = getTranslation('en').onboarding;
      expect(en.next).toBe('Next');
      expect(en.skip).toBe('Skip');
      expect(en.step2.tag).toBe('ACHIEVE');
      expect(en.step2.title).toBe('Earn & Achieve');
      expect(en.step2.description).toBe(
        'Collect points, unlock achievements and climb the leaderboard.'
      );
      expect(en.step2.featureHint).toBe('Earn XP • Unlock Badges • Top Leaderboard');
    });

    it('provides complete Tamil onboarding step 2 translations', () => {
      const ta = getTranslation('ta').onboarding;
      expect(ta.next).toBe('அடுத்து');
      expect(ta.skip).toBe('தவிர்');
      expect(ta.step2.tag).toBe('வெற்றி பெறுவோம்');
      expect(ta.step2.title).toBe('புள்ளிகளும் சாதனைகளும்');
      expect(ta.step2.description).toBe(
        'புள்ளிகளைச் சேகரியுங்கள், சாதனைகளைத் திறந்து கல்வித் தரவரிசையில் முன்னிலை பெறுங்கள்.'
      );
      expect(ta.step2.featureHint).toBe('புள்ளிகள் • பதக்கங்கள் • முதன்மைத் தரவரிசை');
    });

    it('provides accessible screen reader labels and hints for step 2', () => {
      const en = getTranslation('en').onboarding.accessibility;
      const ta = getTranslation('ta').onboarding.accessibility;

      expect(en.step2Indicator).toBe('Onboarding step 2 of 3');
      expect(en.illustrationStep2).toBeDefined();

      expect(ta.step2Indicator).toBe('அறிமுகப் படி 2 / 3');
      expect(ta.illustrationStep2).toBeDefined();
    });
  });

  describe('Theme and Design System Tokens', () => {
    it('provides vibrant golden achievement and brand primary tokens', () => {
      expect(theme.colors.brandPrimary).toBe('#7E22CE');
      expect(theme.colors.actionPrimary).toBe('#2563EB');
      expect(theme.colors.pearlWhite).toBe('#F8FAFC');
    });
  });
});
