/**
 * Unit tests for Responsive Engine tokens, breakpoints, sizing calculations,
 * and accessibility font scaling (Phase 52).
 */

import {
  BREAKPOINTS,
  responsiveSpacing,
  getScreenSizeCategory,
  getResponsiveHorizontalPadding,
  getResponsiveGridColumns,
  getResponsiveFontSize,
  getResponsiveSpacing,
  getGameBoardSize,
} from '../../../theme/responsive';

describe('Responsive Engine (Phase 52)', () => {
  describe('Breakpoints & Screen Size Categories', () => {
    it('correctly categorizes compact screens (< 360dp, e.g. 320dp small Androids / iPhone SE)', () => {
      expect(getScreenSizeCategory(320)).toBe('compact');
      expect(getScreenSizeCategory(359)).toBe('compact');
      expect(getScreenSizeCategory(280)).toBe('compact');
    });

    it('correctly categorizes standard screens (360dp - 430dp, e.g. modern phones)', () => {
      expect(getScreenSizeCategory(360)).toBe('standard');
      expect(getScreenSizeCategory(390)).toBe('standard');
      expect(getScreenSizeCategory(412)).toBe('standard');
      expect(getScreenSizeCategory(430)).toBe('standard');
    });

    it('correctly categorizes expanded screens (> 430dp, e.g. large phones, foldables, tablets)', () => {
      expect(getScreenSizeCategory(431)).toBe('expanded');
      expect(getScreenSizeCategory(600)).toBe('expanded');
      expect(getScreenSizeCategory(768)).toBe('expanded');
      expect(getScreenSizeCategory(1024)).toBe('expanded');
    });
  });

  describe('Responsive Horizontal Padding', () => {
    it('returns compact padding (12dp) for compact screens', () => {
      expect(getResponsiveHorizontalPadding(320)).toBe(responsiveSpacing.screenHorizontalPaddingCompact);
      expect(getResponsiveHorizontalPadding(320)).toBe(12);
    });

    it('returns standard padding (16dp) for standard screens', () => {
      expect(getResponsiveHorizontalPadding(375)).toBe(responsiveSpacing.screenHorizontalPaddingStandard);
      expect(getResponsiveHorizontalPadding(375)).toBe(16);
    });

    it('returns expanded padding (24dp) for wide screens / tablets', () => {
      expect(getResponsiveHorizontalPadding(768)).toBe(responsiveSpacing.screenHorizontalPaddingExpanded);
      expect(getResponsiveHorizontalPadding(768)).toBe(24);
    });
  });

  describe('Responsive Grid Columns', () => {
    it('gives minimum columns on compact screens', () => {
      expect(getResponsiveGridColumns(320, 140, 4)).toBe(2);
    });

    it('scales cleanly between min and max columns depending on width', () => {
      expect(getResponsiveGridColumns(390, 140, 4)).toBe(2);
      expect(getResponsiveGridColumns(600, 140, 4)).toBe(3);
      expect(getResponsiveGridColumns(800, 140, 4)).toBe(4);
    });
  });

  describe('Responsive Font Scaling', () => {
    it('preserves base font size on standard screens', () => {
      expect(getResponsiveFontSize(16, 'standard')).toBe(16);
      expect(getResponsiveFontSize(24, 'standard')).toBe(24);
    });

    it('adjusts subtly on compact screens to prevent overflow', () => {
      expect(getResponsiveFontSize(16, 'compact')).toBe(15);
    });

    it('adjusts cleanly on expanded screens without exceeding bounds', () => {
      expect(getResponsiveFontSize(16, 'expanded')).toBe(17);
    });
  });

  describe('Responsive Spacing & Game Board Dimensions', () => {
    it('adjusts spacing down for compact screens', () => {
      expect(getResponsiveSpacing(16, 'compact')).toBe(13);
      expect(getResponsiveSpacing(16, 'standard')).toBe(16);
      expect(getResponsiveSpacing(16, 'expanded')).toBe(19);
    });

    it('calculates game board dimensions that fit within small screen boundaries', () => {
      const { boardSize: board320 } = getGameBoardSize(320, 600, undefined, 360);
      expect(board320).toBeLessThanOrEqual(320 - 24);
      expect(board320).toBe(296);

      const { boardSize: boardTable } = getGameBoardSize(800, 1000, undefined, 360);
      expect(boardTable).toBe(360); // capped at maxSize
    });
  });
});
