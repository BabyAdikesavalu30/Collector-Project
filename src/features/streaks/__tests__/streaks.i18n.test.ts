/**
 * Streak i18n Unit Tests
 * Verifies key parity between English and Tamil, zero deficit language,
 * and text interpolation.
 */

import { STREAK_I18N, getStreakI18n, interpolateText } from '../../../components/streak/streak.i18n';
import { STREAK_ELIGIBLE_ACTIVITY_TYPES } from '../streaks.types';

describe('Streak i18n', () => {
  it('has identical keys for English and Tamil dictionaries', () => {
    const enKeys = Object.keys(STREAK_I18N.en).sort();
    const taKeys = Object.keys(STREAK_I18N.ta).sort();

    expect(taKeys).toEqual(enKeys);

    // Deep check accessibility sub-object
    const enA11yKeys = Object.keys(STREAK_I18N.en.accessibility).sort();
    const taA11yKeys = Object.keys(STREAK_I18N.ta.accessibility).sort();
    expect(taA11yKeys).toEqual(enA11yKeys);

    // Deep check weekdays
    const enWeekdays = Object.keys(STREAK_I18N.en.weekdaysShort).sort();
    const taWeekdays = Object.keys(STREAK_I18N.ta.weekdaysShort).sort();
    expect(taWeekdays).toEqual(enWeekdays);
  });

  it('maps all streak eligible activity types to human-readable names in both languages', () => {
    for (const type of STREAK_ELIGIBLE_ACTIVITY_TYPES) {
      expect(STREAK_I18N.en.activityTypeNames[type]).toBeDefined();
      expect(STREAK_I18N.en.activityTypeNames[type].length).toBeGreaterThan(0);
      expect(STREAK_I18N.ta.activityTypeNames[type]).toBeDefined();
      expect(STREAK_I18N.ta.activityTypeNames[type].length).toBeGreaterThan(0);
    }
  });

  it('contains zero deficit or shame-based copy', () => {
    const allEnStrings = JSON.stringify(STREAK_I18N.en).toLowerCase();
    expect(allEnStrings).not.toContain('failed');
    expect(allEnStrings).not.toContain('lost your streak');
    expect(allEnStrings).not.toContain('you missed');
    expect(allEnStrings).not.toContain('punish');
    expect(allEnStrings).not.toContain('bad');
  });

  it('interpolates template placeholders accurately', () => {
    const template = 'Current streak {current} days. Longest streak {longest} days.';
    const result = interpolateText(template, { current: 14, longest: 21 });
    expect(result).toBe('Current streak 14 days. Longest streak 21 days.');
  });

  it('returns valid dictionary for supported languages with English fallback', () => {
    expect(getStreakI18n('en').currentStreak).toBe('Current Streak');
    expect(getStreakI18n('ta').currentStreak).toBe('தற்போதைய தொடர்ச்சி');
    expect(getStreakI18n('unknown' as any).currentStreak).toBe('Current Streak');
  });
});
