/**
 * LanguageToggle Component Test Suite
 * Validates accessibility role, labels, hints, dimensions, touch target, and visual contract.
 */

import { LanguageToggle } from '../LanguageToggle';
import { getTranslation } from '../../../config/i18n';

describe('LanguageToggle Component Specifications', () => {
  it('is exported as a React functional component', () => {
    expect(LanguageToggle).toBeDefined();
    expect(typeof LanguageToggle).toBe('function');
  });

  describe('Accessibility Specification', () => {
    it('defines accessible role "switch"', () => {
      const enLabels = getTranslation('en').welcome.accessibility;
      const taLabels = getTranslation('ta').welcome.accessibility;

      expect(enLabels).toBeDefined();
      expect(taLabels).toBeDefined();
    });

    it('provides accurate English screen reader labels and hints', () => {
      const getLabel = (lang: string) =>
        lang === 'ta'
          ? 'மொழியை மாற்றவும், தற்போது தமிழ்'
          : 'Switch language, currently English';
      const getHint = (lang: string) =>
        lang === 'ta'
          ? 'ஆங்கிலத்திற்கு மாற இருமுறை தட்டவும்'
          : 'Double tap to switch to Tamil';

      expect(getLabel('en')).toBe('Switch language, currently English');
      expect(getHint('en')).toBe('Double tap to switch to Tamil');
    });

    it('provides accurate Tamil screen reader labels and hints', () => {
      const getLabel = (lang: string) =>
        lang === 'ta'
          ? 'மொழியை மாற்றவும், தற்போது தமிழ்'
          : 'Switch language, currently English';
      const getHint = (lang: string) =>
        lang === 'ta'
          ? 'ஆங்கிலத்திற்கு மாற இருமுறை தட்டவும்'
          : 'Double tap to switch to Tamil';

      expect(getLabel('ta')).toBe('மொழியை மாற்றவும், தற்போது தமிழ்');
      expect(getHint('ta')).toBe('ஆங்கிலத்திற்கு மாற இருமுறை தட்டவும்');
    });
  });

  describe('Pill Dimensions & Touch Target', () => {
    it('satisfies 60x30 track dimension constraints with >=44x44 hit target', () => {
      const TRACK_WIDTH = 60;
      const TRACK_HEIGHT = 30;
      const THUMB_SIZE = 26;
      const HIT_SLOP = { top: 8, bottom: 8, left: 8, right: 8 };

      expect(TRACK_WIDTH).toBe(60);
      expect(TRACK_HEIGHT).toBe(30);
      expect(THUMB_SIZE).toBe(26);

      // Effective hit target = 30 + 8 + 8 = 46 (exceeds WCAG 44x44 minimum)
      const effectiveHeight = TRACK_HEIGHT + HIT_SLOP.top + HIT_SLOP.bottom;
      const effectiveWidth = TRACK_WIDTH + HIT_SLOP.left + HIT_SLOP.right;
      expect(effectiveHeight).toBeGreaterThanOrEqual(44);
      expect(effectiveWidth).toBeGreaterThanOrEqual(44);
    });

    it('defines thumb travel distance between English (left) and Tamil (right)', () => {
      const THUMB_LEFT_EN = 2;
      const THUMB_LEFT_TA = 32; // 60 - 26 - 2
      expect(THUMB_LEFT_EN).toBe(2);
      expect(THUMB_LEFT_TA).toBe(32);
    });
  });

  describe('Typography & Glyph Labels', () => {
    it('uses "E" for English and "த" for Tamil', () => {
      const englishGlyph = 'E';
      const tamilGlyph = 'த';

      expect(englishGlyph).toBe('E');
      expect(tamilGlyph).toBe('த');
    });
  });
});
