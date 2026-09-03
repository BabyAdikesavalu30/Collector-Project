/**
 * Unit Verification Test Suite for Screen 06 (Language Selection)
 */

import { getTranslation } from '../../../config/i18n';
import { theme } from '../../../theme';

describe('Screen 06 — Language Selection Verification', () => {
  describe('Localization Completeness', () => {
    it('provides complete English language selection translations', () => {
      const en = getTranslation('en').language;
      expect(en.title).toBe('Choose Your Language');
      expect(en.subtitle).toBe('You can change this later in settings.');
      expect(en.english).toBe('English');
      expect(en.englishDescription).toBe('Continue in English');
      expect(en.tamil).toBe('தமிழ்');
      expect(en.tamilDescription).toBe('தமிழில் தொடரவும்');
      expect(en.continue).toBe('Continue');
      expect(en.errorMessage).toBeDefined();
    });

    it('provides complete Tamil language selection translations', () => {
      const ta = getTranslation('ta').language;
      expect(ta.title).toBe('உங்கள் மொழியைத் தேர்வுசெய்யுங்கள்');
      expect(ta.subtitle).toBe('இதை பின்னர் அமைப்புகளில் மாற்றலாம்.');
      expect(ta.english).toBe('English');
      expect(ta.englishDescription).toBe('Continue in English');
      expect(ta.tamil).toBe('தமிழ்');
      expect(ta.tamilDescription).toBe('தமிழில் தொடரவும்');
      expect(ta.continue).toBe('தொடரவும்');
      expect(ta.errorMessage).toBeDefined();
    });

    it('provides accessible screen reader labels and hints for language cards', () => {
      const en = getTranslation('en').language.accessibility;
      const ta = getTranslation('ta').language.accessibility;

      expect(en.screenLabel).toBeDefined();
      expect(en.selected).toBe('Selected');
      expect(en.continueHint).toBeDefined();

      expect(ta.screenLabel).toBeDefined();
      expect(ta.selected).toBe('தேர்ந்தெடுக்கப்பட்டது');
      expect(ta.continueHint).toBeDefined();
    });
  });

  describe('Theme Tokens', () => {
    it('provides high contrast CTA and surface tokens', () => {
      expect(theme.colors.brandPrimary).toBe('#7E22CE');
      expect(theme.colors.backgroundPrimary).toBe('#F8FAFC');
      expect(theme.borderRadius.md).toBe(12);
    });
  });
});
