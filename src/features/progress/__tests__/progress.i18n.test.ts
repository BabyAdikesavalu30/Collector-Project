/**
 * Unit Tests for Progress UI i18n
 * Verifies key parity between English and Tamil, absence of shaming language,
 * and string interpolation.
 */

import { getProgressI18n, interpolate } from '../../../components/progress/progress.i18n';

describe('Progress i18n — Parity & Completeness', () => {
  const en = getProgressI18n('en');
  const ta = getProgressI18n('ta');

  it('provides matching top-level keys for English and Tamil', () => {
    const enKeys = Object.keys(en).sort();
    const taKeys = Object.keys(ta).sort();
    expect(enKeys).toEqual(taKeys);
  });

  it('provides complete translations for all nested sub-objects', () => {
    expect(Object.keys(en.summary).sort()).toEqual(Object.keys(ta.summary).sort());
    expect(Object.keys(en.strengths).sort()).toEqual(Object.keys(ta.strengths).sort());
    expect(Object.keys(en.focusAreas).sort()).toEqual(Object.keys(ta.focusAreas).sort());
    expect(Object.keys(en.subjects).sort()).toEqual(Object.keys(ta.subjects).sort());
    expect(Object.keys(en.subjectDetail).sort()).toEqual(Object.keys(ta.subjectDetail).sort());
    expect(Object.keys(en.topicStatus).sort()).toEqual(Object.keys(ta.topicStatus).sort());
    expect(Object.keys(en.trends).sort()).toEqual(Object.keys(ta.trends).sort());
    expect(Object.keys(en.actions).sort()).toEqual(Object.keys(ta.actions).sort());
    expect(Object.keys(en.emptyState).sort()).toEqual(Object.keys(ta.emptyState).sort());
    expect(Object.keys(en.accessibility).sort()).toEqual(Object.keys(ta.accessibility).sort());
  });

  it('contains non-empty strings for all values in both languages', () => {
    function assertNonEmpty(obj: Record<string, any>, lang: string) {
      for (const [k, v] of Object.entries(obj)) {
        if (typeof v === 'string') {
          expect(v.trim().length).toBeGreaterThan(0);
        } else if (typeof v === 'object' && v !== null) {
          assertNonEmpty(v, lang);
        }
      }
    }

    assertNonEmpty(en as any, 'en');
    assertNonEmpty(ta as any, 'ta');
  });

  it('contains NO shaming or deficit language (Section 48)', () => {
    const forbidden = [
      'academic deficit',
      'poor performance',
      'below standard',
      'failure',
      'failed',
      'bad at science',
      'weak student',
      'deficit',
    ];

    const allEnglishStrings = JSON.stringify(en).toLowerCase();
    for (const phrase of forbidden) {
      expect(allEnglishStrings).not.toContain(phrase);
    }
  });

  it('interpolates template placeholders correctly', () => {
    const template = 'You explored {explored} of {total} topics with {accuracy}% accuracy.';
    const result = interpolate(template, {
      explored: 8,
      total: 12,
      accuracy: 75,
    });
    expect(result).toBe('You explored 8 of 12 topics with 75% accuracy.');
    expect(result).not.toContain('{');
    expect(result).not.toContain('}');
  });
});
