/**
 * Streaks Feature Engine
 * Single, consolidated streak calculation used by profile, rewards, missions,
 * activity calendar, and home. Duplicate activities on one calendar day count
 * as one day. Current streak stays alive when the most recent activity was
 * today OR yesterday (the student simply hasn't logged in yet today).
 */

import { ActivityHistoryItem } from '../activity/activity.types';
import {
  StreakInfo,
  CalendarDay,
  WeeklyDayInfo,
  MonthlySummary,
  StreakMilestone,
  MilestoneStatus,
  STREAK_MILESTONES,
  DayActivityDetail,
  ConsistencyInsight,
} from './streaks.types';

export { StreakInfo };

/** Local YYYY-MM-DD key for a timestamp or Date. */
export function getStreakDateKey(timestampOrDate: number | Date): string {
  const d = typeof timestampOrDate === 'number' ? new Date(timestampOrDate) : timestampOrDate;
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

/** Alias for getStreakDateKey to satisfy pure utility conventions. */
export const toLocalDateKey = getStreakDateKey;

/** Local YYYY-MM-DD key for "now". */
export function getTodayKey(now: Date = new Date()): string {
  return getStreakDateKey(now);
}

/** Parses a canonical YYYY-MM-DD key into year, month (1-indexed), and day numbers. */
export function parseDateKey(dateKey: string): { year: number; month: number; day: number } {
  const parts = dateKey.split('-');
  const year = parseInt(parts[0], 10) || 1970;
  const month = parseInt(parts[1], 10) || 1;
  const day = parseInt(parts[2], 10) || 1;
  return { year, month, day };
}

/** Difference in whole days between two YYYY-MM-DD keys (dateB - dateA). */
export function dayDifference(dateA: string, dateB: string): number {
  const msPerDay = 1000 * 60 * 60 * 24;
  const utcA = Date.UTC(
    parseInt(dateA.substring(0, 4), 10),
    parseInt(dateA.substring(5, 7), 10) - 1,
    parseInt(dateA.substring(8, 10), 10)
  );
  const utcB = Date.UTC(
    parseInt(dateB.substring(0, 4), 10),
    parseInt(dateB.substring(5, 7), 10) - 1,
    parseInt(dateB.substring(8, 10), 10)
  );
  return Math.round((utcB - utcA) / msPerDay);
}

/**
 * Pure streak calculation over activity timestamps.
 * `now` is injectable for deterministic tests.
 */
export function calculateStreak(
  activityTimestamps: number[],
  now: Date = new Date()
): StreakInfo {
  const todayKey = getTodayKey(now);
  const uniqueDates = Array.from(
    new Set(activityTimestamps.map((ts) => getStreakDateKey(ts)))
  ).sort();

  if (uniqueDates.length === 0) {
    return { currentStreak: 0, longestStreak: 0, lastActiveDate: null, activeDates: [] };
  }

  // Longest run of consecutive calendar days anywhere in history.
  let longest = 0;
  let run = 0;
  let prev: string | null = null;
  for (const date of uniqueDates) {
    if (prev !== null && dayDifference(prev, date) === 1) {
      run += 1;
    } else {
      run = 1;
    }
    if (run > longest) longest = run;
    prev = date;
  }

  // Current streak: consecutive days ending at the most recent activity day,
  // still alive when the last activity was today or yesterday.
  const lastActiveDate = uniqueDates[uniqueDates.length - 1];
  const sinceLast = dayDifference(lastActiveDate, todayKey);

  let current = 0;
  if (sinceLast <= 1) {
    current = 1;
    let idx = uniqueDates.length - 1;
    while (idx > 0 && dayDifference(uniqueDates[idx - 1], uniqueDates[idx]) === 1) {
      current += 1;
      idx -= 1;
    }
  }

  return { currentStreak: current, longestStreak: longest, lastActiveDate, activeDates: uniqueDates };
}

/**
 * Convenience wrapper accepting timestamp strings (ISO) or numbers.
 */
export function calculateStreakFromDates(
  dates: Array<string | number>,
  now: Date = new Date()
): StreakInfo {
  const timestamps = dates
    .map((d) => (typeof d === 'number' ? d : new Date(d).getTime()))
    .filter((ts) => Number.isFinite(ts));
  return calculateStreak(timestamps, now);
}

/** Number of days in a given year and month (1-indexed). */
export function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month, 0).getDate();
}

const MONTH_NAMES_EN = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

const MONTH_NAMES_TA = [
  'ஜனவரி', 'பிப்ரவரி', 'மார்ச்', 'ஏப்ரல்', 'மே', 'ஜூன்',
  'ஜூலை', 'ஆகஸ்ட்', 'செப்டம்பர்', 'அக்டோபர்', 'நவம்பர்', 'டிசம்பர்',
];

export function getMonthName(month: number, language: 'en' | 'ta' = 'en'): string {
  const idx = Math.max(0, Math.min(11, month - 1));
  return language === 'ta' ? MONTH_NAMES_TA[idx] : MONTH_NAMES_EN[idx];
}

const DAY_NAMES = [
  { en: 'Monday', ta: 'திங்கள்', shortEn: 'Mon', shortTa: 'திங்' },
  { en: 'Tuesday', ta: 'செவ்வாய்', shortEn: 'Tue', shortTa: 'செவ்' },
  { en: 'Wednesday', ta: 'புதன்', shortEn: 'Wed', shortTa: 'புத' },
  { en: 'Thursday', ta: 'வியாழன்', shortEn: 'Thu', shortTa: 'வியா' },
  { en: 'Friday', ta: 'வெள்ளி', shortEn: 'Fri', shortTa: 'வெள்' },
  { en: 'Saturday', ta: 'சனி', shortEn: 'Sat', shortTa: 'சனி' },
  { en: 'Sunday', ta: 'ஞாயிறு', shortEn: 'Sun', shortTa: 'ஞாயி' },
];

/**
 * Builds the complete grid of CalendarDays for a month (Monday-first).
 * Padding days from previous and next months complete the leading and trailing rows.
 */
export function getMonthDays(
  year: number,
  month: number,
  activeDateSet: Set<string>,
  activityMap: Map<string, ActivityHistoryItem[]>,
  now: Date = new Date()
): CalendarDay[] {
  const todayKey = getTodayKey(now);
  const daysInMonth = getDaysInMonth(year, month);

  // Day of week for day 1 (0 = Mon, 6 = Sun)
  const firstDate = new Date(year, month - 1, 1);
  const firstDayOfWeek = (firstDate.getDay() + 6) % 7; // Convert Sun=0 to Mon=0

  const days: CalendarDay[] = [];

  // Previous month padding
  if (firstDayOfWeek > 0) {
    const prevYear = month === 1 ? year - 1 : year;
    const prevMonth = month === 1 ? 12 : month - 1;
    const prevDaysCount = getDaysInMonth(prevYear, prevMonth);

    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      const dNum = prevDaysCount - i;
      const mStr = String(prevMonth).padStart(2, '0');
      const dStr = String(dNum).padStart(2, '0');
      const dateKey = `${prevYear}-${mStr}-${dStr}`;
      const isFuture = dayDifference(todayKey, dateKey) > 0;
      const isActive = !isFuture && activeDateSet.has(dateKey);
      const acts = activityMap.get(dateKey) || [];

      days.push({
        dateKey,
        dayNumber: dNum,
        month: prevMonth,
        year: prevYear,
        dayOfWeek: (firstDayOfWeek - 1 - i) % 7,
        isCurrentMonth: false,
        isToday: dateKey === todayKey,
        isFuture,
        isActive,
        activityCount: acts.length,
        activities: acts,
      });
    }
  }

  // Current month days
  for (let d = 1; d <= daysInMonth; d++) {
    const mStr = String(month).padStart(2, '0');
    const dStr = String(d).padStart(2, '0');
    const dateKey = `${year}-${mStr}-${dStr}`;
    const dayDate = new Date(year, month - 1, d);
    const dayOfWeek = (dayDate.getDay() + 6) % 7;
    const isFuture = dayDifference(todayKey, dateKey) > 0;
    const isActive = !isFuture && activeDateSet.has(dateKey);
    const acts = activityMap.get(dateKey) || [];

    days.push({
      dateKey,
      dayNumber: d,
      month,
      year,
      dayOfWeek,
      isCurrentMonth: true,
      isToday: dateKey === todayKey,
      isFuture,
      isActive,
      activityCount: acts.length,
      activities: acts,
    });
  }

  // Next month padding to fill out the last week
  const remainder = days.length % 7;
  if (remainder > 0) {
    const nextYear = month === 12 ? year + 1 : year;
    const nextMonth = month === 12 ? 1 : month + 1;
    const trailingCount = 7 - remainder;

    for (let d = 1; d <= trailingCount; d++) {
      const mStr = String(nextMonth).padStart(2, '0');
      const dStr = String(d).padStart(2, '0');
      const dateKey = `${nextYear}-${mStr}-${dStr}`;
      const dayOfWeek = (days.length) % 7;
      const isFuture = dayDifference(todayKey, dateKey) > 0;
      const isActive = !isFuture && activeDateSet.has(dateKey);
      const acts = activityMap.get(dateKey) || [];

      days.push({
        dateKey,
        dayNumber: d,
        month: nextMonth,
        year: nextYear,
        dayOfWeek,
        isCurrentMonth: false,
        isToday: dateKey === todayKey,
        isFuture,
        isActive,
        activityCount: acts.length,
        activities: acts,
      });
    }
  }

  return days;
}

/**
 * Returns the 7 days of the current week (Monday through Sunday) around `now`.
 */
export function getWeeklyDays(
  now: Date = new Date(),
  activeDateSet: Set<string> = new Set(),
  activityMap: Map<string, ActivityHistoryItem[]> = new Map()
): WeeklyDayInfo[] {
  const todayKey = getTodayKey(now);
  const currentDayOfWeek = (now.getDay() + 6) % 7; // Mon = 0, Sun = 6

  const result: WeeklyDayInfo[] = [];

  for (let i = 0; i < 7; i++) {
    const offset = i - currentDayOfWeek;
    const d = new Date(now.getFullYear(), now.getMonth(), now.getDate() + offset);
    const dateKey = getStreakDateKey(d);
    const isFuture = dayDifference(todayKey, dateKey) > 0;
    const isActive = !isFuture && activeDateSet.has(dateKey);
    const dayMeta = DAY_NAMES[i];
    const acts = activityMap.get(dateKey) || [];

    result.push({
      dateKey,
      dayNameEn: dayMeta.en,
      dayNameTa: dayMeta.ta,
      dayShortEn: dayMeta.shortEn,
      dayShortTa: dayMeta.shortTa,
      dayNumber: d.getDate(),
      isToday: dateKey === todayKey,
      isFuture,
      isActive,
      activityCount: acts.length,
    });
  }

  return result;
}

/**
 * Calculates monthly summary statistics for a given year and month.
 */
export function calculateMonthlySummary(
  year: number,
  month: number,
  activeDates: string[],
  activities: ActivityHistoryItem[]
): MonthlySummary {
  const monthPrefix = `${year}-${String(month).padStart(2, '0')}`;
  const monthActiveDates = activeDates.filter((d) => d.startsWith(monthPrefix)).sort();

  // Longest streak within this specific month
  let bestStreak = 0;
  let run = 0;
  let prev: string | null = null;
  for (const date of monthActiveDates) {
    if (prev !== null && dayDifference(prev, date) === 1) {
      run += 1;
    } else {
      run = 1;
    }
    if (run > bestStreak) bestStreak = run;
    prev = date;
  }

  // Count total activities that occurred in this month
  const monthActivities = activities.filter((a) => {
    const key = getStreakDateKey(a.timestamp);
    return key.startsWith(monthPrefix);
  });

  return {
    year,
    month,
    monthNameEn: getMonthName(month, 'en'),
    monthNameTa: getMonthName(month, 'ta'),
    activeDaysCount: monthActiveDates.length,
    totalActivitiesCount: monthActivities.length,
    bestStreakInMonth: bestStreak,
  };
}

/**
 * Evaluates milestone progress for the student.
 */
export function getMilestoneStatuses(currentStreak: number): MilestoneStatus[] {
  let nextFound = false;

  return STREAK_MILESTONES.map((m) => {
    const isReached = currentStreak >= m.days;
    let isNext = false;
    if (!isReached && !nextFound) {
      isNext = true;
      nextFound = true;
    }

    const progressPct = isReached
      ? 100
      : Math.min(100, Math.round((currentStreak / m.days) * 100));

    const daysRemaining = Math.max(0, m.days - currentStreak);

    return {
      milestone: m,
      isReached,
      isNext,
      progressPct,
      daysRemaining,
    };
  });
}

/**
 * Computes consistency insight over the last 28 days (4 weeks).
 */
export function getConsistencyInsight(
  activeDates: string[],
  now: Date = new Date()
): ConsistencyInsight {
  const todayKey = getTodayKey(now);
  const lookbackDays = 28;

  // Filter active dates within the last 28 days
  const recentActive = activeDates.filter((d) => {
    const diff = dayDifference(d, todayKey);
    return diff >= 0 && diff < lookbackDays;
  });

  if (activeDates.length < 3) {
    return {
      averageDaysPerWeek: 0,
      hasEnoughData: false,
      messageEn: 'Keep exploring to see your learning pattern.',
      messageTa: 'உங்கள் கற்றல் முறையைக் காண தொடர்ந்து கற்றுக்கொள்ளுங்கள்.',
    };
  }

  const avgDaysPerWeek = Math.round((recentActive.length / 4) * 10) / 10;

  return {
    averageDaysPerWeek: avgDaysPerWeek,
    hasEnoughData: true,
    messageEn: `You're active on ${avgDaysPerWeek} days each week on average.`,
    messageTa: `நீங்கள் வாரத்திற்கு சராசரியாக ${avgDaysPerWeek} நாட்கள் தீவிரமாக கற்கிறீர்கள்.`,
  };
}

/** Formats a date label (e.g. "September 5" / "செப்டம்பர் 5"). */
export function formatDateLabel(dateKey: string, language: 'en' | 'ta' = 'en'): string {
  const { month, day } = parseDateKey(dateKey);
  const mName = getMonthName(month, language);
  return language === 'ta' ? `${mName} ${day}` : `${mName} ${day}`;
}

/**
 * Builds the DayActivityDetail for a given selected date.
 */
export function getDayActivityDetail(
  dateKey: string,
  activities: ActivityHistoryItem[],
  now: Date = new Date()
): DayActivityDetail {
  const todayKey = getTodayKey(now);
  const dayActivities = activities.filter((a) => getStreakDateKey(a.timestamp) === dateKey);
  const totalXp = dayActivities.reduce((sum, a) => sum + (a.xpEarned || 0), 0);

  return {
    dateKey,
    formattedDateEn: formatDateLabel(dateKey, 'en'),
    formattedDateTa: formatDateLabel(dateKey, 'ta'),
    isToday: dateKey === todayKey,
    isActive: dayActivities.length > 0,
    totalActivities: dayActivities.length,
    totalXp,
    activities: dayActivities,
  };
}