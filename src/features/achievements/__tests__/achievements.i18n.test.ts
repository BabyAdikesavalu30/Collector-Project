/**
 * Unit Tests for Achievements Bilingual i18n & Tone Check
 * Validates:
 * - 100% key parity between EN and TA
 * - Fallback to English on unknown locale
 * - Strict adherence to non-deficit, encouraging student tone
 */

import { ACHIEVEMENTS_I18N, getAchievementsI18n } from '../../../components/achievements/achievements.i18n';
import { ACHIEVEMENT_DEFINITIONS } from '../achievements.engine';

describe('Achievements i18n & Student Tone', () => {
  it('has identical top-level keys for EN and TA', () => {
    const enKeys = Object.keys(ACHIEVEMENTS_I18N.en).sort();
    const taKeys = Object.keys(ACHIEVEMENTS_I18N.ta).sort();
    expect(enKeys).toEqual(taKeys);
  });

  it('has identical status and category filter keys for EN and TA', () => {
    const enStatus = Object.keys(ACHIEVEMENTS_I18N.en.statusFilters).sort();
    const taStatus = Object.keys(ACHIEVEMENTS_I18N.ta.statusFilters).sort();
    expect(enStatus).toEqual(taStatus);

    const enCat = Object.keys(ACHIEVEMENTS_I18N.en.categoryFilters).sort();
    const taCat = Object.keys(ACHIEVEMENTS_I18N.ta.categoryFilters).sort();
    expect(enCat).toEqual(taCat);
  });

  it('has non-empty encouragement strings for all tiers', () => {
    for (const lang of ['en', 'ta'] as const) {
      const dict = ACHIEVEMENTS_I18N[lang];
      expect(dict.encouragement.none.trim().length).toBeGreaterThan(0);
      expect(dict.encouragement.starter.trim().length).toBeGreaterThan(0);
      expect(dict.encouragement.intermediate.trim().length).toBeGreaterThan(0);
      expect(dict.encouragement.advanced.trim().length).toBeGreaterThan(0);
      expect(dict.encouragement.master.trim().length).toBeGreaterThan(0);
    }
  });

  it('falls back to English when language is undefined or unrecognized', () => {
    const fallback = getAchievementsI18n('fr' as unknown as Parameters<typeof getAchievementsI18n>[0]);
    expect(fallback.screenTitle).toBe('Science Badge Gallery');

    const undefFallback = getAchievementsI18n(undefined as unknown as Parameters<typeof getAchievementsI18n>[0]);
    expect(undefFallback.screenTitle).toBe('Science Badge Gallery');
  });

  it('contains zero deficit or shaming words across all definitions and copy', () => {
    const forbiddenTokens = ['failed', 'failure', 'bad', 'poor', 'terrible', 'shame', 'deficit'];

    // Check UI strings
    const enUiText = JSON.stringify(ACHIEVEMENTS_I18N.en).toLowerCase();
    for (const token of forbiddenTokens) {
      const regex = new RegExp(`\\b${token}\\b`, 'i');
      expect(enUiText).not.toMatch(regex);
    }

    // Check all 43 badge descriptions & hints
    for (const badge of ACHIEVEMENT_DEFINITIONS) {
      const enText = `${badge.title.en} ${badge.description.en} ${badge.hint.en}`.toLowerCase();
      for (const token of forbiddenTokens) {
        const regex = new RegExp(`\\b${token}\\b`, 'i');
        expect(enText).not.toMatch(regex);
      }
    }
  });
});
