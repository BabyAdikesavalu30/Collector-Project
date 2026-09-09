/**
 * Streaks Engine Tests
 * Consecutive-day logic, duplicate-day collapsing, timezone-safe keys,
 * and no accidental resets.
 */

import { calculateStreak, calculateStreakFromDates, dayDifference, getStreakDateKey } from '../streaks.engine';

const DAY = 24 * 60 * 60 * 1000;
const BASE = new Date(2026, 8, 1, 10, 0, 0).getTime(); // 2026-09-01 10:00 local

function at(day: number, hour = 10): number {
  return new Date(2026, 8, day, hour, 0, 0).getTime();
}

describe('calculateStreak', () => {
  it('returns zeros for no activity', () => {
    const result = calculateStreak([], new Date(2026, 8, 5));
    expect(result.currentStreak).toBe(0);
    expect(result.longestStreak).toBe(0);
    expect(result.lastActiveDate).toBeNull();
  });

  it('counts consecutive days ending yesterday as an alive streak', () => {
    // Activity on Sep 1, 2, 3. Now is Sep 4 (today, no activity yet).
    const result = calculateStreak([at(1), at(2), at(3)], new Date(2026, 8, 4, 8));
    expect(result.currentStreak).toBe(3);
    expect(result.longestStreak).toBe(3);
    expect(result.lastActiveDate).toBe('2026-09-03');
  });

  it('counts today as part of the current streak', () => {
    const result = calculateStreak([at(2), at(3), at(4)], new Date(2026, 8, 4, 20));
    expect(result.currentStreak).toBe(3);
  });

  it('collapses duplicate activities on one day into a single day', () => {
    const result = calculateStreak([at(1, 9), at(1, 14), at(1, 19), at(2), at(3)], new Date(2026, 8, 4));
    expect(result.currentStreak).toBe(3);
    expect(result.longestStreak).toBe(3);
  });

  it('resets the current streak when the last activity is older than yesterday', () => {
    // Activity on Sep 1, Sep 3 — gap on Sep 2.
    const result = calculateStreak([at(1), at(3)], new Date(2026, 8, 5));
    expect(result.currentStreak).toBe(0);
    expect(result.longestStreak).toBe(1);
  });

  it('finds the longest historical streak regardless of the current gap', () => {
    const result = calculateStreak([at(1), at(2), at(3), at(10), at(11)], new Date(2026, 8, 20));
    expect(result.currentStreak).toBe(0);
    expect(result.longestStreak).toBe(3);
  });

  it('accepts ISO date strings', () => {
    const result = calculateStreakFromDates(
      ['2026-09-01T10:00:00', '2026-09-02T10:00:00'],
      new Date(2026, 8, 3)
    );
    expect(result.currentStreak).toBe(2);
  });

  it('uses local date keys (timezone-safe for the device)', () => {
    const lateEvening = new Date(2026, 8, 3, 23, 59).getTime();
    expect(getStreakDateKey(lateEvening)).toBe('2026-09-03');
  });

  it('dayDifference is exact across month boundaries', () => {
    expect(dayDifference('2026-08-31', '2026-09-01')).toBe(1);
    expect(dayDifference('2026-09-01', '2026-09-01')).toBe(0);
    expect(dayDifference('2026-09-03', '2026-09-01')).toBe(-2);
  });

  it('keeps an alive current streak across a month boundary', () => {
    // Activity Aug 30 + Aug 31, "now" is Sep 1 (yesterday = Aug 31).
    const aug30 = new Date(2026, 7, 30, 10).getTime();
    const aug31 = new Date(2026, 7, 31, 10).getTime();
    const result = calculateStreak([aug30, aug31], new Date(2026, 8, 1, 8));
    expect(result.currentStreak).toBe(2);
    expect(result.longestStreak).toBe(2);
    expect(result.lastActiveDate).toBe('2026-08-31');
  });

  it('keeps an alive current streak across a year boundary', () => {
    // Activity Dec 30 + Dec 31, "now" is Jan 1 of the next year.
    const dec30 = new Date(2026, 11, 30, 10).getTime();
    const dec31 = new Date(2026, 11, 31, 10).getTime();
    const result = calculateStreak([dec30, dec31], new Date(2027, 0, 1, 8));
    expect(result.currentStreak).toBe(2);
    expect(result.longestStreak).toBe(2);
    expect(result.lastActiveDate).toBe('2026-12-31');
    expect(dayDifference('2026-12-31', '2027-01-01')).toBe(1);
  });

  it('treats activity just before midnight and just after midnight as two days', () => {
    // Sep 30 23:59 and Oct 1 00:01 are consecutive days, not duplicates.
    const lateNight = new Date(2026, 8, 30, 23, 59).getTime();
    const earlyMorning = new Date(2026, 9, 1, 0, 1).getTime();
    const result = calculateStreak([lateNight, earlyMorning], new Date(2026, 9, 2));
    expect(getStreakDateKey(lateNight)).toBe('2026-09-30');
    expect(getStreakDateKey(earlyMorning)).toBe('2026-10-01');
    expect(result.currentStreak).toBe(2);
    expect(result.longestStreak).toBe(2);
  });

  it('resets across a leap-year February boundary', () => {
    // 2024 is a leap year: Feb 28 -> Feb 29 is one day, Feb 29 -> Mar 1 is one day.
    expect(dayDifference('2024-02-28', '2024-02-29')).toBe(1);
    expect(dayDifference('2024-02-29', '2024-03-01')).toBe(1);
    const feb28 = new Date(2024, 1, 28, 10).getTime();
    const feb29 = new Date(2024, 1, 29, 10).getTime();
    const mar1 = new Date(2024, 2, 1, 10).getTime();
    const result = calculateStreak([feb28, feb29, mar1], new Date(2024, 2, 2));
    expect(result.currentStreak).toBe(3);
  });

  it('does not extend a streak when today already counted and more events arrive', () => {
    const today = new Date(2026, 8, 5, 9).getTime();
    const todayLater = new Date(2026, 8, 5, 21).getTime();
    const yesterday = new Date(2026, 8, 4, 9).getTime();
    // Same-day duplicates must not inflate the streak beyond one day.
    const result = calculateStreak([yesterday, today, todayLater], new Date(2026, 8, 5, 22));
    expect(result.currentStreak).toBe(2);
    expect(result.activeDates.length).toBe(2);
  });

  it('breaks the run on missing days but preserves the longest streak', () => {
    // Activity on Dec 30, Dec 31, then nothing until Jan 3 — Jan 1/2 missed.
    // The 2-day run Dec 30–31 is dead; only the Jan 3 day is alive.
    const dec30 = new Date(2026, 11, 30, 10).getTime();
    const dec31 = new Date(2026, 11, 31, 10).getTime();
    const jan3 = new Date(2027, 0, 3, 10).getTime();
    const result = calculateStreak([dec30, dec31, jan3], new Date(2027, 0, 4));
    expect(result.currentStreak).toBe(1);
    expect(result.longestStreak).toBe(2); // Dec 30–31 preserved

    // Two missed days behind the last activity: current streak fully resets.
    const noRecent = calculateStreak([dec30, dec31, jan3], new Date(2027, 0, 6));
    expect(noRecent.currentStreak).toBe(0);
    expect(noRecent.longestStreak).toBe(2);
  });
});