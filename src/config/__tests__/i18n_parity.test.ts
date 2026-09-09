/**
 * i18n Parity Test
 * Ensures English and Tamil translation trees contain identical key paths so no
 * production screen silently falls back to missing Tamil strings.
 */

import { getTranslation } from '../i18n';

type TranslationTree = Record<string, unknown>;

function flattenKeys(obj: TranslationTree, prefix = ''): string[] {
  const keys: string[] = [];
  Object.keys(obj).forEach((key) => {
    const path = prefix ? `${prefix}.${key}` : key;
    const value = obj[key];
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      keys.push(...flattenKeys(value as TranslationTree, path));
    } else {
      keys.push(path);
    }
  });
  return keys;
}

describe('i18n English / Tamil parity', () => {
  const en = getTranslation('en') as unknown as TranslationTree;
  const ta = getTranslation('ta') as unknown as TranslationTree;

  const enKeys = flattenKeys(en);
  const taKeys = flattenKeys(ta);

  it('has the same number of leaf keys in both languages', () => {
    expect(taKeys.length).toBe(enKeys.length);
  });

  it('contains every English key path in Tamil (no missing translations)', () => {
    const taSet = new Set(taKeys);
    const missing = enKeys.filter((key) => !taSet.has(key));
    expect(missing).toEqual([]);
  });

  it('contains every Tamil key path in English (no orphan keys)', () => {
    const enSet = new Set(enKeys);
    const orphaned = taKeys.filter((key) => !enSet.has(key));
    expect(orphaned).toEqual([]);
  });

  it('does not leave translatable English phrases inside Tamil leaves', () => {
    const taValues: string[] = [];
    const collect = (obj: TranslationTree): void => {
      Object.values(obj).forEach((value) => {
        if (typeof value === 'string') taValues.push(value);
        else if (value && typeof value === 'object' && !Array.isArray(value)) {
          collect(value as TranslationTree);
        }
      });
    };
    collect(ta);

    const suspicious = taValues.filter(
      (value) => !/[\u0B80-\u0BFF]/.test(value) && /[A-Za-z]{3,}/.test(value)
    );
    // Numeric/format strings ("50", "+10 PTS", "1.0.0") are acceptable. The
    // English option inside the Language picker is intentionally shown in
    // English so learners can identify the option; it is an option label
    // rather than an untranslated UI sentence.
    const intentionalEnglishOptionLabels = new Set([
      'English',
      'Continue in English',
      'English. Continue in English',
    ]);
    const flagged = suspicious.filter(
      (value) =>
        value.length > 6 &&
        !value.includes('http') &&
        !intentionalEnglishOptionLabels.has(value)
    );
    expect(flagged).toEqual([]);
  });

  it('does not contain blank Tamil translations for user-facing leaf keys', () => {
    const blankKeys: string[] = [];
    const walk = (obj: TranslationTree, path: string): void => {
      if (obj && typeof obj === 'object' && !Array.isArray(obj)) {
        Object.entries(obj).forEach(([key, value]) => {
          const childPath = path ? `${path}.${key}` : key;
          if (value && typeof value === 'object' && !Array.isArray(value)) {
            walk(value as TranslationTree, childPath);
          } else if (typeof value === 'string' && value.trim() === '') {
            blankKeys.push(childPath);
          }
        });
      }
    };
    walk(ta, '');
    // The translation tree is fully bilingual by construction (parity test
    // enforces exact key-tree parity), so a blank Tamil leaf would be a real
    // gap rather than a benign omission.
    expect(blankKeys).toEqual([]);
  });
});
