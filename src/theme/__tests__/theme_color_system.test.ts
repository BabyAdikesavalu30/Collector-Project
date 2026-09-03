/**
 * Unit Test Suite for Vigyaan Global UI Color System
 * Verifies Purple (Brand) + Blue (Action) + White (Surfaces) + Green (Success)
 */

import { colors } from '../colors';

describe('Global UI Color System (Purple + Blue + White + Green)', () => {
  describe('Color Scales Definition', () => {
    it('defines complete Purple brand scale (50-900)', () => {
      expect(colors.purple50).toBe('#FAF5FF');
      expect(colors.purple100).toBe('#F3E8FF');
      expect(colors.purple200).toBe('#E9D5FF');
      expect(colors.purple300).toBe('#D8B4FE');
      expect(colors.purple400).toBe('#C084FC');
      expect(colors.purple500).toBe('#A855F7');
      expect(colors.purple600).toBe('#9333EA');
      expect(colors.purple700).toBe('#7E22CE');
      expect(colors.purple800).toBe('#6B21A8');
      expect(colors.purple900).toBe('#581C87');
    });

    it('defines complete Blue action scale (50-900)', () => {
      expect(colors.blue50).toBe('#EFF6FF');
      expect(colors.blue100).toBe('#DBEAFE');
      expect(colors.blue200).toBe('#BFDBFE');
      expect(colors.blue300).toBe('#93C5FD');
      expect(colors.blue400).toBe('#60A5FA');
      expect(colors.blue500).toBe('#3B82F6');
      expect(colors.blue600).toBe('#2563EB');
      expect(colors.blue700).toBe('#1D4ED8');
      expect(colors.blue800).toBe('#1E40AF');
      expect(colors.blue900).toBe('#1E3A8A');
    });

    it('defines complete Green success scale (50-900)', () => {
      expect(colors.green50).toBe('#F0FDF4');
      expect(colors.green100).toBe('#DCFCE7');
      expect(colors.green200).toBe('#BBF7D0');
      expect(colors.green300).toBe('#86EFAC');
      expect(colors.green400).toBe('#4ADE80');
      expect(colors.green500).toBe('#22C55E');
      expect(colors.green600).toBe('#16A34A');
      expect(colors.green700).toBe('#15803D');
      expect(colors.green800).toBe('#166534');
      expect(colors.green900).toBe('#14532D');
    });
  });

  describe('Semantic Role Mapping', () => {
    it('maps brand identity to Purple', () => {
      expect(colors.brandPrimary).toBe('#7E22CE');
      expect(colors.brandSecondary).toBe('#6B21A8');
      expect(colors.brandBadgeText).toBe('#7E22CE');
    });

    it('maps primary interaction and CTA to Blue', () => {
      expect(colors.actionPrimary).toBe('#2563EB');
      expect(colors.actionPrimaryPressed).toBe('#1D4ED8');
      expect(colors.accentBlue).toBe('#2563EB');
    });

    it('maps positive learning states and completion to Green', () => {
      expect(colors.success).toBe('#16A34A');
      expect(colors.successBackground).toBe('#F0FDF4');
      expect(colors.progressFill).toBe('#16A34A');
    });

    it('provides white and dark surface foundations', () => {
      expect(colors.white).toBe('#FFFFFF');
      expect(colors.surfaceWhite).toBe('#FFFFFF');
      expect(colors.surface).toBeTruthy();
      expect(colors.surfaceElevated).toBeTruthy();
    });

    it('provides accessible text contrast tokens', () => {
      expect(colors.textOnAction).toBe('#FFFFFF');
      expect(colors.textOnBrand).toBe('#FFFFFF');
      expect(colors.textPrimary).toBeTruthy();
      expect(colors.textSecondary).toBeTruthy();
    });
  });
});
