/**
 * XP Feature Tests
 * Totals, per-day grouping, summary windows, and duplicate prevention.
 */

import { storage, STORAGE_KEYS } from '../../../storage/asyncStorage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  getTotalXp,
  getXpSince,
  groupXpByDate,
  computeRewardSummary,
  getXpDateKey,
  getWeekKey,
} from '../xp.engine';
import { recordXp, getXpTransactions, getXpSummary, awardStarterBonusIfNeeded } from '../xp.storage';
import { XP_AMOUNTS } from '../xp.constants';
import { XPTransaction } from '../xp.types';

const DAY = 24 * 60 * 60 * 1000;

function tx(id: string, amount: number, timestamp: number, source: XPTransaction['source'] = 'game_completion'): XPTransaction {
  return { id, source, amount, description: id, descriptionTa: id, icon: '🎮', timestamp };
}

describe('XP engine', () => {
  it('sums totals', () => {
    expect(getTotalXp([])).toBe(0);
    expect(getTotalXp([tx('a', 10, 1), tx('b', 20, 2), tx('c', -5, 3)])).toBe(25);
  });

  it('sums within a time window', () => {
    const base = Date.now();
    const list = [tx('a', 10, base), tx('b', 20, base - 2 * DAY), tx('c', 5, base + DAY)];
    expect(getXpSince(list, base)).toBe(15);
  });

  it('groups transactions by local date, newest first', () => {
    const groups = groupXpByDate([
      tx('a', 10, new Date(2026, 8, 1).getTime()),
      tx('b', 20, new Date(2026, 8, 2).getTime()),
      tx('c', 30, new Date(2026, 8, 1, 12).getTime()),
    ]);
    expect(groups.length).toBe(2);
    expect(groups[0].dateKey).toBe('2026-09-02');
    expect(groups[0].totalXp).toBe(20);
    expect(groups[1].dateKey).toBe('2026-09-01');
    expect(groups[1].totalXp).toBe(40);
  });

  it('computes the weekly key on Monday', () => {
    // 2026-09-03 is a Thursday; week should start Monday 2026-08-31.
    const thursday = new Date(2026, 8, 3, 12).getTime();
    expect(getWeekKey(thursday)).toBe('2026-08-31');
  });

  it('computeRewardSummary fills today/week/month windows', () => {
    const now = new Date(2026, 8, 10, 12).getTime(); // Thursday Sep 10
    const today = new Date(2026, 8, 10, 9).getTime();
    const yesterday = now - DAY; // Wed Sep 9 — same week
    const lastWeek = now - 8 * DAY; // Wed Sep 2 — same month, previous week
    const summary = computeRewardSummary(
      [tx('t', 10, today), tx('y', 20, yesterday), tx('w', 30, lastWeek)],
      now
    );
    expect(summary.todayXp).toBe(10);
    expect(summary.weekXp).toBe(30); // today + yesterday (both within the week)
    expect(summary.monthXp).toBe(60);
    expect(summary.totalXp).toBe(60);
    expect(summary.totalEarned).toBe(60);
    expect(summary.transactions.length).toBe(3);
  });
});

describe('XP storage', () => {
  beforeEach(async () => {
    await storage.removeItem(STORAGE_KEYS.XP_TRANSACTIONS);
    await storage.removeItem(STORAGE_KEYS.STUDENT_PROFILE_SETUP_COMPLETE);
  });

  it('persists transactions and dedupes by dedupeKey', async () => {
    const first = await recordXp({
      source: 'game_completion',
      description: 'Game',
      descriptionTa: 'விளையாட்டு',
      dedupeKey: 'game-zip-01',
    });
    const duplicate = await recordXp({
      source: 'game_completion',
      description: 'Game',
      descriptionTa: 'விளையாட்டு',
      dedupeKey: 'game-zip-01',
    });
    expect(first).not.toBeNull();
    expect(duplicate).toBeNull();

    const list = await getXpTransactions();
    expect(list.length).toBe(1);
    expect(list[0].amount).toBe(XP_AMOUNTS.game_completion);
  });

  it('applies the deterministic default amount per source', async () => {
    await recordXp({ source: 'mystery_completion', description: 'M', descriptionTa: 'M' });
    await recordXp({ source: 'fact_discovery', description: 'F', descriptionTa: 'F' });
    const list = await getXpTransactions();
    expect(list.find((t) => t.source === 'mystery_completion')?.amount).toBe(XP_AMOUNTS.mystery_completion);
    expect(list.find((t) => t.source === 'fact_discovery')?.amount).toBe(XP_AMOUNTS.fact_discovery);
  });

  it('summary reads persisted transactions', async () => {
    await recordXp({ source: 'riddle_completion', description: 'R', descriptionTa: 'R' });
    const summary = await getXpSummary();
    expect(summary.totalXp).toBe(XP_AMOUNTS.riddle_completion);
  });

  it('awards the starter bonus once, never twice', async () => {
    await storage.setItem(STORAGE_KEYS.STUDENT_PROFILE_SETUP_COMPLETE, true);
    const first = await awardStarterBonusIfNeeded();
    const second = await awardStarterBonusIfNeeded();
    expect(first).not.toBeNull();
    expect(second).toBeNull();
    const list = await getXpTransactions();
    expect(list.length).toBe(1);
    expect(list[0].source).toBe('profile_setup_bonus');
    expect(list[0].amount).toBe(XP_AMOUNTS.profile_setup_bonus);
  });

  it('does not award the starter bonus when setup is incomplete', async () => {
    await storage.setItem(STORAGE_KEYS.STUDENT_PROFILE_SETUP_COMPLETE, false);
    const bonus = await awardStarterBonusIfNeeded();
    expect(bonus).toBeNull();
  });

  it('recovers from corrupted transaction storage', async () => {
    // Simulate disk corruption: raw unparseable payload under the ledger key.
    await storage.removeItem(STORAGE_KEYS.XP_TRANSACTIONS);
    await AsyncStorage.setItem(STORAGE_KEYS.XP_TRANSACTIONS, '[[[[not json');

    expect(await getXpTransactions()).toEqual([]);
    // New awards still work after recovery.
    const award = await recordXp({ source: 'game_completion', description: 'G', descriptionTa: 'G' });
    expect(award).not.toBeNull();
    expect((await getXpTransactions()).length).toBe(1);
  });

  it('drops malformed entries while keeping valid transactions', async () => {
    await storage.removeItem(STORAGE_KEYS.XP_TRANSACTIONS);
    const valid = tx('valid-1', 20, 1234);
    await AsyncStorage.setItem(
      STORAGE_KEYS.XP_TRANSACTIONS,
      JSON.stringify([valid, { id: 5, amount: 'x' }, null, 'garbage', { amount: 1 }])
    );
    const list = await getXpTransactions();
    expect(list.length).toBe(1);
    expect(list[0].id).toBe('valid-1');
  });

  it('persists a dedupe across a simulated restart', async () => {
    await storage.removeItem(STORAGE_KEYS.XP_TRANSACTIONS);
    await recordXp({ source: 'fact_discovery', description: 'F', descriptionTa: 'F', dedupeKey: 'fact-42' });

    // "Restart": reading again from persisted storage sees the existing entry,
    // so replaying the same logical event is still a no-op.
    const seen = await getXpTransactions();
    expect(seen.length).toBe(1);
    const replay = await recordXp({ source: 'fact_discovery', description: 'F', descriptionTa: 'F', dedupeKey: 'fact-42' });
    expect(replay).toBeNull();
    expect((await getXpTransactions()).length).toBe(1);
  });
});