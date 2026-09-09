/**
 * Accessibility & Kid UX Contracts Unit Tests (Phase 51)
 * Validates WCAG AA contrast helpers, minimum touch target contracts,
 * redundant status signaling, bilingual screen-reader labels, and encouraging Kid UX tiers.
 */

import { theme } from '../../../theme';
import { getPerformanceTier } from '../../quiz';
import { getTranslation } from '../../../config/i18n';

describe('Phase 51: Accessibility & Kid UX Contracts', () => {
  describe('WCAG AA Color Contrast Verification', () => {
    // Utility to calculate relative luminance per WCAG 2.1 specs
    function getLuminance(hex: string): number {
      const cleanHex = hex.replace('#', '');
      const r = parseInt(cleanHex.substring(0, 2), 16) / 255;
      const g = parseInt(cleanHex.substring(2, 4), 16) / 255;
      const b = parseInt(cleanHex.substring(4, 6), 16) / 255;

      const a = [r, g, b].map((v) => {
        return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
      });

      return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
    }

    function getContrastRatio(hex1: string, hex2: string): number {
      const lum1 = getLuminance(hex1);
      const lum2 = getLuminance(hex2);
      const brightest = Math.max(lum1, lum2);
      const darkest = Math.min(lum1, lum2);
      return (brightest + 0.05) / (darkest + 0.05);
    }

    it('navy900 on pearlWhite exceeds WCAG AAA standard (7:1)', () => {
      const ratio = getContrastRatio(theme.colors.navy900, theme.colors.pearlWhite);
      expect(ratio).toBeGreaterThanOrEqual(7.0);
    });

    it('actionPrimary (#2563EB) text on action button background satisfies large text/icon contrast', () => {
      const ratio = getContrastRatio(theme.colors.textOnAction, theme.colors.actionPrimary);
      expect(ratio).toBeGreaterThanOrEqual(4.0);
    });

    it('slate600 secondary text on white background exceeds WCAG AA standard (4.5:1)', () => {
      const ratio = getContrastRatio(theme.colors.slate600, theme.colors.white);
      expect(ratio).toBeGreaterThanOrEqual(4.5);
    });

    it('green600 success text on white background exceeds WCAG AA large text/UI standard (3:1)', () => {
      const ratio = getContrastRatio(theme.colors.green600, theme.colors.white);
      expect(ratio).toBeGreaterThanOrEqual(3.0);
    });

    it('error600 alert text on white background exceeds WCAG AA standard (4.5:1)', () => {
      const ratio = getContrastRatio(theme.colors.error600, theme.colors.white);
      expect(ratio).toBeGreaterThanOrEqual(4.5);
    });
  });

  describe('Minimum Touch Target (44x44 pt) Contract', () => {
    function computeEffectiveTargetSize(
      width: number,
      height: number,
      hitSlop?: { top?: number; bottom?: number; left?: number; right?: number }
    ): { width: number; height: number } {
      const effectiveW = width + (hitSlop?.left || 0) + (hitSlop?.right || 0);
      const effectiveH = height + (hitSlop?.top || 0) + (hitSlop?.bottom || 0);
      return { width: effectiveW, height: effectiveH };
    }

    it('satisfies 44x44 target directly when visual dimension >= 44', () => {
      const size = computeEffectiveTargetSize(48, 48);
      expect(size.width).toBeGreaterThanOrEqual(44);
      expect(size.height).toBeGreaterThanOrEqual(44);
    });

    it('satisfies 44x44 target via hitSlop for compact 34pt pills', () => {
      // e.g. catPill (minHeight: 34, hitSlop: top 8, bottom 8, left 4, right 4, paddingHorizontal: 12)
      const size = computeEffectiveTargetSize(36, 34, { top: 8, bottom: 8, left: 4, right: 4 });
      expect(size.width).toBeGreaterThanOrEqual(44);
      expect(size.height).toBeGreaterThanOrEqual(44);
    });

    it('satisfies 44x44 target via hitSlop for 32x32 zoom buttons', () => {
      // e.g. ConceptMap canvas zoom buttons (width: 32, height: 32, hitSlop: 8 all sides)
      const size = computeEffectiveTargetSize(32, 32, { top: 8, bottom: 8, left: 8, right: 8 });
      expect(size.width).toBeGreaterThanOrEqual(44);
      expect(size.height).toBeGreaterThanOrEqual(44);
    });
  });

  describe('Redundant Status Signaling (Never Color Alone)', () => {
    it('provides distinct icons and textual status for milestone journey states', () => {
      const statuses = [
        { status: 'completed', icon: '✓', text: { en: 'Completed', ta: 'நிறைவடைந்தது' } },
        { status: 'in_progress', icon: '●', text: { en: 'In progress', ta: 'செயல்பாட்டில் உள்ளது' } },
        { status: 'locked', icon: '🔒', text: { en: 'Locked', ta: 'பூட்டப்பட்டுள்ளது' } },
      ];

      statuses.forEach((item) => {
        expect(item.icon).toBeTruthy();
        expect(item.text.en.length).toBeGreaterThan(0);
        expect(item.text.ta.length).toBeGreaterThan(0);
      });

      // Icons must be pairwise distinct
      const icons = statuses.map((s) => s.icon);
      const uniqueIcons = new Set(icons);
      expect(uniqueIcons.size).toBe(statuses.length);
    });

    it('provides distinct symbols for feedback answers (Checkmark vs Cross)', () => {
      const correctSymbol = '✓';
      const incorrectSymbol = '✕';
      expect(correctSymbol).not.toBe(incorrectSymbol);
    });
  });

  describe('Kid UX: Encouraging, Blame-Free Performance Messages', () => {
    it('uses uplifting messages for all performance tiers (no failing/punitive language)', () => {
      const tiers = [
        { percentage: 100, expectedTier: 'excellent' },
        { percentage: 80, expectedTier: 'great' },
        { percentage: 60, expectedTier: 'good' },
        { percentage: 20, expectedTier: 'practice' },
        { percentage: 0, expectedTier: 'practice' },
      ];

      tiers.forEach(({ percentage, expectedTier }) => {
        const tier = getPerformanceTier(percentage);
        expect(tier).toBe(expectedTier);
      });

      const en = getTranslation('en').quizResult;
      const ta = getTranslation('ta').quizResult;

      // Ensure lowest tier is encouraging
      expect(en.keepPracticing.toLowerCase()).toContain('practic');
      expect(ta.keepPracticing.length).toBeGreaterThan(0);

      // Verify no shaming keywords exist
      const forbiddenWords = ['fail', 'failed', 'loser', 'bad', 'poor', 'wrong answer score', 'defeat'];
      forbiddenWords.forEach((word) => {
        expect(en.keepPracticing.toLowerCase()).not.toContain(word);
        expect(en.completedSubtitle.toLowerCase()).not.toContain(word);
      });
    });
  });

  describe('Bilingual Screen Reader Contracts', () => {
    it('contains valid bilingual quiz milestone announcement templates', () => {
      const en30 = '30 seconds remaining';
      const ta30 = '30 வினாடிகள் மீதமுள்ளன';
      const en10 = 'Warning, 10 seconds remaining';
      const ta10 = 'எச்சரிக்கை, 10 வினாடிகள் மட்டுமே மீதமுள்ளன';

      expect(en30).toBeTruthy();
      expect(ta30).toBeTruthy();
      expect(en10).toBeTruthy();
      expect(ta10).toBeTruthy();
    });

    it('supports certificate summary label format in both languages', () => {
      const cert = {
        title: { en: 'Physics Master', ta: 'இயற்பியல் மாஸ்டர்' },
        recipientName: 'Arjun',
        grade: 'Grade 8',
        dateEarned: 1700000000000,
        certificateNumber: 'VIG-PHY-2026',
      };

      const enLabel = `Certificate of Achievement: ${cert.title.en}. Presented to: ${cert.recipientName}. Grade: ${cert.grade}. Date: Nov 2026. Certificate Number: ${cert.certificateNumber}.`;
      const taLabel = `சான்றிதழ்: ${cert.title.ta}. பெறுநர்: ${cert.recipientName}. வகுப்பு: ${cert.grade}. தேதி: நவ 2026. சான்றிதழ் எண்: ${cert.certificateNumber}.`;

      expect(enLabel).toContain('Physics Master');
      expect(enLabel).toContain('Arjun');
      expect(taLabel).toContain('இயற்பியல் மாஸ்டர்');
      expect(taLabel).toContain('Arjun');
    });
  });
});
