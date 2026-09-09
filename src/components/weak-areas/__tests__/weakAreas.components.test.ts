/**
 * Component and UI Integrity Tests for Weak Areas
 * Validates component exports, theme consistency, and accessibility standards.
 */

import {
  getWeakAreasI18n,
  interpolate,
} from '../weakAreas.i18n';
import { theme } from '../../../theme';

describe('Weak Areas UI Components Integrity', () => {
  describe('Localization & Token Contracts (Sections 46 & 47)', () => {
    it('provides all UI label keys required by weak-areas components', () => {
      const en = getWeakAreasI18n('en');
      expect(en.title).toBe('Focus Areas');
      expect(en.subtitle).toBe('Topics worth a little more practice');
      expect(en.topicsNeedingPractice).toBe('Topics to strengthen');
      expect(en.focusOn).toBe('FOCUS ON');
      expect(en.focusOnCta).toBe('Practice');
      expect(en.gettingStronger).toBe('GETTING STRONGER');
    });
  });

  describe('Theme and Design Tokens (Sections 46 & 47)', () => {
    it('provides semantic colors aligned with positive learning guidance', () => {
      // Blue for recommendations/actions
      expect(theme.colors.actionPrimary).toBe('#2563EB');
      // Purple for focus/insight
      expect(theme.colors.brandPrimary).toBe('#7E22CE');
      // Green for improving
      expect(theme.colors.green700).toBe('#15803D');
      // Pearl white background
      expect(theme.colors.pearlWhite).toBe('#F8FAFC');
      // Navy for readable high-contrast text
      expect(theme.colors.navy900).toBe('#0F172A');
    });
  });

  describe('Accessibility & Screen Reader Contracts (Sections 48 & 49)', () => {
    it('generates rich accessible labels without relying solely on color', () => {
      const en = getWeakAreasI18n('en');
      const ta = getWeakAreasI18n('ta');

      const cardA11yEn = interpolate(en.accessibility.focusAreaCard, {
        topic: 'Reflection',
        subject: 'Physics',
        confidence: '52',
        status: 'Needs More Practice',
      });
      expect(cardA11yEn).toContain('Reflection');
      expect(cardA11yEn).toContain('52 percent');
      expect(cardA11yEn).toContain('Needs More Practice');

      const cardA11yTa = interpolate(ta.accessibility.focusAreaCard, {
        topic: 'ஒளி பிரதிபலிப்பு',
        subject: 'இயற்பியல்',
        confidence: '52',
        status: 'கூடுதல் பயிற்சி தேவை',
      });
      expect(cardA11yTa).toContain('ஒளி பிரதிபலிப்பு');
      expect(cardA11yTa).toContain('52 சதவீதம்');
    });

    it('formats improvement summaries with before and after percentages', () => {
      const en = getWeakAreasI18n('en');
      const summary = interpolate(en.accessibility.improvement, {
        topic: 'Acids and Bases',
        before: '52',
        after: '71',
      });
      expect(summary).toBe('Acids and Bases improved from 52 to 71 percent.');
    });
  });
});
