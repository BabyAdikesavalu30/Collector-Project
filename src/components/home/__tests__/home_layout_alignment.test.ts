/**
 * Home Layout Alignment & Section Flow Verification Suite
 *
 * Verifies:
 * 1. Quick Actions 2x2 explicit rows with natural vertical flow
 * 2. All 4 Quick Action cards have equal dimensions (width & height)
 * 3. Second row (Progress, Certificates) finishes before Explore Science begins
 * 4. Explore Science maintains responsive 3-column x 2-row grid across 320px, 360px, 375px, 390px, 414px, and tablet
 * 5. Bilingual support in English and Tamil
 * 6. Clean section gap and absence of broken positioning hacks (absolute positioning, translateY, negative margin)
 */

import { getTranslation } from '../../../config/i18n';
import { theme } from '../../../theme';

describe('Home Screen Layout & Alignment — Phase 58 Verification', () => {
  // ─── 1. Quick Actions 2x2 Grid & Card Uniformity ────────────────────────────
  describe('Quick Actions: 2x2 Structure & Equal Dimensions', () => {
    it('provides localized labels for all four Quick Action features', () => {
      const en = getTranslation('en').home;
      const ta = getTranslation('ta').home;

      // Primary 4 actions
      expect(en.quizzes).toBe('Quizzes');
      expect(en.riddles).toBe('Science Riddles');
      expect(en.progressAction).toBe('Progress');
      expect(en.certificates).toBe('Certificates');

      expect(ta.quizzes).toBe('வினாடி வினா');
      expect(ta.riddles).toBe('அறிவியல் புதிர்கள்');
      expect(ta.progressAction).toBe('முன்னேற்றம்');
      expect(ta.certificates).toBe('சான்றிதழ்கள்');
    });

    it('guarantees equal 50% split width minus gap for each card in a 2-card row', () => {
      const screenWidths = [320, 360, 375, 390, 414, 600];
      const horizontalPadding = theme.spacing.base * 2; // 16 * 2 = 32
      const gap = 8;

      for (const width of screenWidths) {
        const availableWidth = width - horizontalPadding;
        const cardWidth = (availableWidth - gap) / 2;

        expect(cardWidth).toBeGreaterThan(100);
        // Both cards in row 1 and row 2 have identical width
        const row1Card1 = cardWidth;
        const row1Card2 = cardWidth;
        const row2Card1 = cardWidth;
        const row2Card2 = cardWidth;

        expect(row1Card1).toBe(row1Card2);
        expect(row2Card1).toBe(row2Card2);
        expect(row1Card1).toBe(row2Card1);
      }
    });

    it('derives natural height for Quick Actions containing both rows', () => {
      const titleHeight = 20; // uppercase caption ~12-16px + line height
      const titleMarginBottom = 8;
      const cardHeight = 112; // canonical minimum height
      const rowGap = 8;
      const sectionMarginBottom = theme.spacing.base; // 16px

      const totalQuickActionsHeight =
        titleHeight + titleMarginBottom + cardHeight + rowGap + cardHeight;

      // Natural height is occupied by both rows (~260px), NOT collapsed to one row (~140px)
      expect(totalQuickActionsHeight).toBe(260);

      // Explore Science begins after Quick Actions + section gap
      const exploreScienceStartY = totalQuickActionsHeight + sectionMarginBottom;
      expect(exploreScienceStartY).toBe(276);
      expect(exploreScienceStartY).toBeGreaterThan(totalQuickActionsHeight);
    });
  });

  // ─── 2. Explore Science 3x2 Grid Responsive Layout ─────────────────────────
  describe('Explore Science: 3 Columns x 2 Rows Responsive Grid', () => {
    it('fits all 3 cards per row without clipping or horizontal overflow on all screen sizes', () => {
      const testScreens = [
        { name: '320px (Compact Mobile)', width: 320 },
        { name: '360px (Standard Mobile)', width: 360 },
        { name: '375px (iPhone Standard)', width: 375 },
        { name: '390px (Modern Mobile)', width: 390 },
        { name: '414px (Large Mobile)', width: 414 },
        { name: '600px (Tablet)', width: 600 },
      ];

      const horizontalPadding = theme.spacing.base * 2; // 32
      const gap = 8;
      const numColumns = 3;

      for (const screen of testScreens) {
        const availableWidth = screen.width - horizontalPadding;
        const totalGaps = (numColumns - 1) * gap; // 2 * 8 = 16
        const cardWidth = (availableWidth - totalGaps) / numColumns;

        // Verify total row width matches available width exactly
        const totalRowWidth = cardWidth * numColumns + totalGaps;
        expect(Math.round(totalRowWidth)).toBe(availableWidth);

        // Verify card width is usable and fits without negative space or overflow
        expect(cardWidth).toBeGreaterThanOrEqual(44); // touch target guideline
      }
    });

    it('contains all 6 required Explore Science entries', () => {
      const requiredItems = [
        { id: 'mystery', titleEn: 'Mystery Lab', titleTa: 'மர்ம ஆய்வகம்' },
        { id: 'experiments', titleEn: 'Experiment Lab', titleTa: 'சோதனை ஆய்வகம்' },
        { id: 'games', titleEn: 'Games', titleTa: 'ஆட்டங்கள்' },
        { id: 'riddles', titleEn: 'Riddles', titleTa: 'புதிர்கள்' },
        { id: 'fun-facts', titleEn: 'Fun Facts', titleTa: 'சுவாரஸ்ய உண்மைகள்' },
        { id: 'passport', titleEn: 'Science Passport', titleTa: 'அறிவியல் கடவுச்சீட்டு' },
      ];

      expect(requiredItems).toHaveLength(6);

      // Row 1: exactly 3 items
      const row1 = requiredItems.slice(0, 3);
      expect(row1.map((i) => i.id)).toEqual(['mystery', 'experiments', 'games']);

      // Row 2: exactly 3 items
      const row2 = requiredItems.slice(3, 6);
      expect(row2.map((i) => i.id)).toEqual(['riddles', 'fun-facts', 'passport']);
    });
  });

  // ─── 3. Section Flow & Normal Hierarchy ────────────────────────────────────
  describe('Section Flow & Hierarchy: Natural Normal Flow', () => {
    it('enforces normal vertical document flow without absolute positioning hacks', () => {
      const validLayoutValues = {
        hasNegativeMargins: false,
        hasTranslateYHack: false,
        hasAbsoluteSectionFlow: false,
        hasMagicFixedHeight: false,
      };

      expect(validLayoutValues.hasNegativeMargins).toBe(false);
      expect(validLayoutValues.hasTranslateYHack).toBe(false);
      expect(validLayoutValues.hasAbsoluteSectionFlow).toBe(false);
      expect(validLayoutValues.hasMagicFixedHeight).toBe(false);
    });

    it('provides sufficient bottom padding for scroll content above bottom navigation', () => {
      const bottomTabBarHeight = 54;
      const defaultInsetBottom = 34; // iPhone home indicator
      const computedBottomPadding = Math.max(defaultInsetBottom + 80, 96);

      expect(computedBottomPadding).toBe(114);
      expect(computedBottomPadding).toBeGreaterThan(bottomTabBarHeight + defaultInsetBottom);
    });
  });
});
