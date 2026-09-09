/**
 * Streaks Calendar & Pure Engine Unit Tests
 * Tests calendar day generation, weekly preview, monthly summary,
 * milestone detection, consistency insights, day details, and edge cases.
 */

import {
  getMonthDays,
  getWeeklyDays,
  calculateMonthlySummary,
  getMilestoneStatuses,
  getConsistencyInsight,
  getDayActivityDetail,
  getStreakDateKey,
  getTodayKey,
  parseDateKey,
  getDaysInMonth,
  getMonthName,
  dayDifference,
  toLocalDateKey,
} from '../streaks.engine';
import { ActivityHistoryItem } from '../../activity/activity.types';

describe('streaks.engine pure calendar functions', () => {
  const now = new Date(2026, 8, 5, 12, 0, 0); // Saturday, September 5, 2026

  it('parses date keys correctly', () => {
    expect(parseDateKey('2026-09-05')).toEqual({ year: 2026, month: 9, day: 5 });
    expect(parseDateKey('2024-02-29')).toEqual({ year: 2024, month: 2, day: 29 });
  });

  it('calculates days in month including leap years', () => {
    expect(getDaysInMonth(2026, 9)).toBe(30); // Sept 2026
    expect(getDaysInMonth(2024, 2)).toBe(29); // Feb 2024 leap year
    expect(getDaysInMonth(2025, 2)).toBe(28); // Feb 2025 standard year
    expect(getDaysInMonth(2026, 8)).toBe(31); // Aug 2026
  });

  it('provides localized month names in English and Tamil', () => {
    expect(getMonthName(9, 'en')).toBe('September');
    expect(getMonthName(9, 'ta')).toBe('செப்டம்பர்');
    expect(getMonthName(1, 'en')).toBe('January');
    expect(getMonthName(1, 'ta')).toBe('ஜனவரி');
  });

  it('generates a full calendar grid with proper weekday alignment and padding', () => {
    const activeDateSet = new Set(['2026-09-01', '2026-09-02', '2026-09-04', '2026-09-05']);
    const activityMap = new Map<string, ActivityHistoryItem[]>();
    activityMap.set('2026-09-05', [
      {
        id: 'act-1',
        type: 'quiz_completed',
        title: 'Force & Motion',
        titleTa: 'விசையும் இயக்கமும்',
        timestamp: new Date(2026, 8, 5, 10).getTime(),
        xpEarned: 25,
        pointsEarned: 0,
      },
    ]);

    const days = getMonthDays(2026, 9, activeDateSet, activityMap, now);

    // Total days must be a multiple of 7
    expect(days.length % 7).toBe(0);
    expect(days.length).toBeGreaterThanOrEqual(35);

    // Day 1 of September 2026 was a Tuesday (dayOfWeek = 1)
    // So days[0] should be from August 31 (Monday, dayOfWeek = 0)
    expect(days[0].isCurrentMonth).toBe(false);
    expect(days[0].dateKey).toBe('2026-08-31');
    expect(days[0].dayOfWeek).toBe(0);

    // Sept 1 is at index 1
    const day1 = days[1];
    expect(day1.isCurrentMonth).toBe(true);
    expect(day1.dateKey).toBe('2026-09-01');
    expect(day1.dayNumber).toBe(1);
    expect(day1.isActive).toBe(true);

    // Sept 5 is today (Saturday)
    const day5 = days.find((d) => d.dateKey === '2026-09-05');
    expect(day5).toBeDefined();
    expect(day5?.isToday).toBe(true);
    expect(day5?.isActive).toBe(true);
    expect(day5?.activityCount).toBe(1);
    expect(day5?.isFuture).toBe(false);

    // Sept 6 is tomorrow (future)
    const day6 = days.find((d) => d.dateKey === '2026-09-06');
    expect(day6).toBeDefined();
    expect(day6?.isFuture).toBe(true);
    expect(day6?.isActive).toBe(false);
  });

  it('builds a 7-day weekly preview around the current date', () => {
    const activeDateSet = new Set(['2026-09-01', '2026-09-02', '2026-09-05']);
    const week = getWeeklyDays(now, activeDateSet);

    expect(week.length).toBe(7);
    // Week begins with Monday (Aug 31 in this week)
    expect(week[0].dayShortEn).toBe('Mon');
    expect(week[0].dateKey).toBe('2026-08-31');

    // Saturday is today
    const saturday = week.find((w) => w.dateKey === '2026-09-05');
    expect(saturday?.isToday).toBe(true);
    expect(saturday?.isActive).toBe(true);

    // Sunday is future
    const sunday = week.find((w) => w.dateKey === '2026-09-06');
    expect(sunday?.isFuture).toBe(true);
    expect(sunday?.isActive).toBe(false);
  });

  it('calculates monthly summary with best streak within month', () => {
    const activeDates = [
      '2026-09-01',
      '2026-09-02',
      '2026-09-03', // 3-day run
      '2026-09-10',
      '2026-09-11',
      '2026-09-12',
      '2026-09-13', // 4-day run (best in month)
      '2026-09-20',
    ];

    const activities: ActivityHistoryItem[] = activeDates.map((d, i) => {
      const { year, month, day } = parseDateKey(d);
      return {
        id: `act-${i}`,
        type: 'quiz_completed',
        title: 'Quiz',
        titleTa: 'வினாடி வினா',
        timestamp: new Date(year, month - 1, day, 10).getTime(),
        xpEarned: 20,
        pointsEarned: 0,
      };
    });

    const summary = calculateMonthlySummary(2026, 9, activeDates, activities);
    expect(summary.activeDaysCount).toBe(8);
    expect(summary.totalActivitiesCount).toBe(8);
    expect(summary.bestStreakInMonth).toBe(4);
    expect(summary.monthNameEn).toBe('September');
    expect(summary.monthNameTa).toBe('செப்டம்பர்');
  });

  it('evaluates streak milestones correctly with next milestone progress', () => {
    // Current streak = 4 days: 3-day milestone reached, 5-day is next (1 day remaining, 80% progress)
    const milestones = getMilestoneStatuses(4);

    const m3 = milestones.find((m) => m.milestone.days === 3);
    expect(m3?.isReached).toBe(true);
    expect(m3?.isNext).toBe(false);
    expect(m3?.progressPct).toBe(100);
    expect(m3?.daysRemaining).toBe(0);

    const m5 = milestones.find((m) => m.milestone.days === 5);
    expect(m5?.isReached).toBe(false);
    expect(m5?.isNext).toBe(true);
    expect(m5?.daysRemaining).toBe(1);
    expect(m5?.progressPct).toBe(80);

    const m7 = milestones.find((m) => m.milestone.days === 7);
    expect(m7?.isReached).toBe(false);
    expect(m7?.isNext).toBe(false);
  });

  it('computes consistency insight over past 4 weeks without crashing on fresh users', () => {
    // Fresh user: 0 active dates
    const freshInsight = getConsistencyInsight([], now);
    expect(freshInsight.hasEnoughData).toBe(false);
    expect(freshInsight.averageDaysPerWeek).toBe(0);

    // Active student: 12 active dates in last 28 days
    const activeDates: string[] = [];
    for (let i = 0; i < 12; i++) {
      const d = new Date(now.getFullYear(), now.getMonth(), now.getDate() - i * 2);
      activeDates.push(getStreakDateKey(d));
    }
    const insight = getConsistencyInsight(activeDates, now);
    expect(insight.hasEnoughData).toBe(true);
    expect(insight.averageDaysPerWeek).toBeGreaterThan(0);
    expect(insight.messageEn).toContain('days each week on average');
  });

  it('extracts day activity detail cleanly', () => {
    const actItem: ActivityHistoryItem = {
      id: 'act-detail-1',
      type: 'micro_lesson_completed',
      title: 'Newton Laws',
      titleTa: 'நியூட்டன் விதிகள்',
      timestamp: new Date(2026, 8, 5, 14).getTime(),
      xpEarned: 25,
      pointsEarned: 0,
    };

    const detail = getDayActivityDetail('2026-09-05', [actItem], now);
    expect(detail.dateKey).toBe('2026-09-05');
    expect(detail.isToday).toBe(true);
    expect(detail.isActive).toBe(true);
    expect(detail.totalActivities).toBe(1);
    expect(detail.totalXp).toBe(25);
    expect(detail.activities.length).toBe(1);

    const inactiveDetail = getDayActivityDetail('2026-09-03', [actItem], now);
    expect(inactiveDetail.isActive).toBe(false);
    expect(inactiveDetail.totalActivities).toBe(0);
    expect(inactiveDetail.totalXp).toBe(0);
  });
});
