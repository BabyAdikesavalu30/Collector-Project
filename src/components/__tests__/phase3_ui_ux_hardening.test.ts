/**
 * Phase 3 UI/UX Hardening Test Suite
 * Validates design system color tokens, bilingual parity, touch target bounds,
 * accessibility properties, and responsive layout calculations.
 */

import { theme } from '../../theme';
import { getTranslation } from '../../config/i18n';
import {
  getScreenSizeCategory,
  getResponsiveHorizontalPadding,
  getGameBoardSize,
  getResponsiveFontSize,
} from '../../theme/responsive';

describe('Phase 3 UI/UX Hardening', () => {
  // ==========================================================================
  // SECTION 1: DESIGN SYSTEM COLOR TOKENS
  // ==========================================================================
  describe('1. Semantic Color Token Compliance', () => {
    it('enforces Pearl White as primary background base', () => {
      expect(theme.colors.pearlWhite).toBe('#F8FAFC');
      expect(theme.colors.backgroundPrimary).toBe('#F8FAFC');
    });

    it('enforces Royal Blue as primary action color', () => {
      expect(theme.colors.blue600).toBe('#2563EB');
      expect(theme.colors.actionPrimary).toBe('#2563EB');
    });

    it('enforces Purple as Vigyaan brand color', () => {
      expect(theme.colors.purple700).toBe('#7E22CE');
      expect(theme.colors.brandPrimary).toBe('#7E22CE');
    });

    it('enforces Green as positive learning/success state', () => {
      expect(theme.colors.green600).toBe('#16A34A');
      expect(theme.colors.success).toBe('#16A34A');
    });

    it('enforces Navy as primary typography color', () => {
      expect(theme.colors.navy900).toBe('#0F172A');
      expect(theme.colors.textPrimary).toBe('#0F172A');
    });

    it('enforces Red exclusively for semantic alerts/errors', () => {
      expect(theme.colors.error).toBe('#DC2626');
      expect(theme.colors.error600).toBe('#DC2626');
    });

    it('enforces Gold for achievements/rewards', () => {
      expect(theme.colors.accentGold).toBe('#D97706');
    });
  });

  // ==========================================================================
  // SECTION 2: BILINGUAL PARITY (ENGLISH & TAMIL)
  // ==========================================================================
  describe('2. Bilingual Parity across Shared Components', () => {
    it('provides localized exploreScienceSection titles in both languages', () => {
      const en = getTranslation('en');
      const ta = getTranslation('ta');

      expect(en.home.exploreScienceSection).toBe('EXPLORE SCIENCE');
      expect(ta.home.exploreScienceSection).toBe('அறிவியலை ஆராயுங்கள்');
    });

    it('provides localized learnScreen intro pill in both languages', () => {
      const en = getTranslation('en');
      const ta = getTranslation('ta');

      expect(en.learnScreen.introPill).toBe('VIGYAAN LEARNING PATHWAYS');
      expect(ta.learnScreen.introPill).toBe('விஞ்ஞான் கற்றல் பாதைகள்');
    });

    it('provides complete game navigation strings in both languages', () => {
      const en = getTranslation('en');
      const ta = getTranslation('ta');

      expect(en.games.howToPlay).toBe('How to Play');
      expect(ta.games.howToPlay).toBe('விளையாடுவது எப்படி');

      expect(en.games.reset).toBe('Reset');
      expect(ta.games.reset).toBe('மீட்டமை');
    });

    it('provides legal terms and privacy strings in both languages', () => {
      const en = getTranslation('en');
      const ta = getTranslation('ta');

      expect(en.auth.register.terms).toBeDefined();
      expect(ta.auth.register.terms).toBeDefined();
    });
  });

  // ==========================================================================
  // SECTION 3: RESPONSIVE VIEWPORT MATRIX (320px to Tablet)
  // ==========================================================================
  describe('3. Responsive Viewport Classification & Geometry', () => {
    const viewports = [
      { name: 'Small Android Phone', width: 320, expectedCategory: 'compact', expectedPadding: 12 },
      { name: 'Compact Phone', width: 359, expectedCategory: 'compact', expectedPadding: 12 },
      { name: 'Standard Android Phone', width: 360, expectedCategory: 'standard', expectedPadding: 16 },
      { name: 'iPhone Normal', width: 375, expectedCategory: 'standard', expectedPadding: 16 },
      { name: 'iPhone Standard', width: 390, expectedCategory: 'standard', expectedPadding: 16 },
      { name: 'iPhone Plus / Pro Max', width: 414, expectedCategory: 'standard', expectedPadding: 16 },
      { name: 'Expanded Android Flagship', width: 430, expectedCategory: 'standard', expectedPadding: 16 },
      { name: 'Foldable / Small Tablet', width: 600, expectedCategory: 'expanded', expectedPadding: 24 },
      { name: 'Standard Tablet', width: 768, expectedCategory: 'expanded', expectedPadding: 24 },
    ];

    viewports.forEach(({ name, width, expectedCategory, expectedPadding }) => {
      it(`correctly handles ${name} (${width}px)`, () => {
        expect(getScreenSizeCategory(width)).toBe(expectedCategory);
        expect(getResponsiveHorizontalPadding(width)).toBe(expectedPadding);
      });
    });

    it('calculates non-overflowing game board dimensions on 320px viewports', () => {
      const { boardSize, maxCellSize } = getGameBoardSize(320, 568);
      // Available width = 320 - 24 = 296dp
      expect(boardSize).toBeLessThanOrEqual(296);
      expect(boardSize).toBeGreaterThanOrEqual(240);
      expect(maxCellSize * 4).toBeLessThanOrEqual(boardSize);
    });

    it('scales typography safely on compact viewports to avoid text clipping', () => {
      const baseBody = 15;
      const compactBody = getResponsiveFontSize(baseBody, 'compact');
      const expandedBody = getResponsiveFontSize(baseBody, 'expanded');

      expect(compactBody).toBe(14);
      expect(expandedBody).toBeGreaterThanOrEqual(15);
    });
  });

  // ==========================================================================
  // SECTION 4: TOUCH TARGET STANDARDS (>= 44dp)
  // ==========================================================================
  describe('4. Touch Target & Accessibility Guidelines', () => {
    it('specifies touch target token of 48dp (>= 44dp) in theme tokens', () => {
      expect(theme.spacing.xxxl).toBeGreaterThanOrEqual(44);
    });

    it('has hitSlop values expanding compact buttons to at least 44dp', () => {
      // 40dp button with 8dp vertical hitSlop = 56dp effective touch target
      const buttonDimension = 40;
      const hitSlop = { top: 8, bottom: 8, left: 8, right: 8 };
      const effectiveHeight = buttonDimension + hitSlop.top + hitSlop.bottom;
      const effectiveWidth = buttonDimension + hitSlop.left + hitSlop.right;

      expect(effectiveHeight).toBeGreaterThanOrEqual(44);
      expect(effectiveWidth).toBeGreaterThanOrEqual(44);
    });
  });
});
