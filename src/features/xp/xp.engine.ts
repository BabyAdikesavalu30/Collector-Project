/**
 * XP Feature Engine
 * Pure, testable calculations: totals, per-day/week/month sums, grouping.
 */

import { XPTransaction, XPDailyGroup, RewardSummary } from './xp.types';

/** Local YYYY-MM-DD key for a timestamp. */
export function getXpDateKey(timestamp: number): string {
  const d = new Date(timestamp);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function startOfToday(now: Date = new Date()): number {
  return new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
}

function startOfWeek(now: Date = new Date()): number {
  // Week starts on Monday for a consistent weekly mission window.
  const day = (now.getDay() + 6) % 7; // Monday = 0
  const monday = new Date(now.getFullYear(), now.getMonth(), now.getDate() - day);
  return monday.getTime();
}

function startOfMonth(now: Date = new Date()): number {
  return new Date(now.getFullYear(), now.getMonth(), 1).getTime();
}

export function getTotalXp(transactions: XPTransaction[]): number {
  return transactions.reduce((sum, t) => sum + t.amount, 0);
}

export function getXpSince(transactions: XPTransaction[], since: number): number {
  return transactions
    .filter((t) => t.timestamp >= since)
    .reduce((sum, t) => sum + t.amount, 0);
}

/** Groups transactions by local date key, newest dates first. */
export function groupXpByDate(
  transactions: XPTransaction[]
): XPDailyGroup[] {
  const map = new Map<string, XPTransaction[]>();
  for (const t of transactions) {
    const key = getXpDateKey(t.timestamp);
    const list = map.get(key) || [];
    list.push(t);
    map.set(key, list);
  }
  return Array.from(map.entries())
    .map(([dateKey, list]) => {
      const sorted = [...list].sort((a, b) => b.timestamp - a.timestamp);
      return {
        dateKey,
        label: formatDateLabel(dateKey),
        labelTa: formatDateLabelTa(dateKey),
        totalXp: sorted.reduce((s, t) => s + t.amount, 0),
        transactions: sorted,
      };
    })
    .sort((a, b) => (a.dateKey < b.dateKey ? 1 : -1));
}

/** Pure summary used by points history and rewards center. */
export function computeRewardSummary(
  transactions: XPTransaction[],
  now: number = Date.now()
): Omit<RewardSummary, 'levelProgressPercent'> {
  const sorted = [...transactions].sort((a, b) => b.timestamp - a.timestamp);
  const nowDate = new Date(now);
  const today = startOfToday(nowDate);
  const week = startOfWeek(nowDate);
  const month = startOfMonth(nowDate);

  return {
    totalXp: getTotalXp(sorted),
    totalEarned: sorted.reduce((s, t) => s + Math.abs(t.amount), 0),
    todayXp: getXpSince(sorted, today),
    weekXp: getXpSince(sorted, week),
    monthXp: getXpSince(sorted, month),
    transactions: sorted,
    dailyGroups: groupXpByDate(sorted),
  };
}

function formatDateLabel(dateKey: string): string {
  const [y, m, d] = dateKey.split('-').map(Number);
  const date = new Date(y, m - 1, d);
  return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
}

function formatDateLabelTa(dateKey: string): string {
  const [y, m, d] = dateKey.split('-').map(Number);
  const date = new Date(y, m - 1, d);
  const monthsTa = [
    'ஜன', 'பிப்', 'மார்', 'ஏப்', 'மே', 'ஜூன்',
    'ஜூலை', 'ஆக', 'செப்', 'அக்', 'நவ', 'டிச',
  ];
  return `${d} ${monthsTa[m - 1]}`;
}

/** Returns the week key (Monday date) for a timestamp — used by missions. */
export function getWeekKey(timestamp: number): string {
  return getXpDateKey(startOfWeek(new Date(timestamp)));
}