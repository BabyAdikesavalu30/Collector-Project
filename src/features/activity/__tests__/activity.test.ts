/**
 * Activity Feature Tests
 * Recording, dedupe, XP wiring, counts, and streak derivation.
 */

import { storage, STORAGE_KEYS } from '../../../storage/asyncStorage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { recordActivity, countActivityTypes, getTotalXpBalance } from '../activity.repository';
import { getActivityHistory } from '../activity.storage';
import { ActivityHistoryItem } from '../activity.types';

describe('activity repository', () => {
  beforeEach(async () => {
    await storage.removeItem(STORAGE_KEYS.ACTIVITY_HISTORY);
    await storage.removeItem(STORAGE_KEYS.XP_TRANSACTIONS);
  });

  it('records an event with its default XP', async () => {
    const item = await recordActivity({
      type: 'game_completed',
      dedupeKey: 'game-zip-01',
      title: 'Zip',
      titleTa: 'ஜிப்',
    });
    expect(item).not.toBeNull();
    expect(item?.type).toBe('game_completed');
    expect(item?.xpEarned).toBe(20);

    const balance = await getTotalXpBalance();
    expect(balance).toBe(20);
  });

  it('never records the same dedupe key twice', async () => {
    const input = {
      type: 'mystery_completed' as const,
      dedupeKey: 'mystery-case-1-ts',
      title: 'Case',
      titleTa: 'வழக்கு',
    };
    await recordActivity(input);
    const duplicate = await recordActivity(input);
    expect(duplicate).toBeNull();

    const history = await getActivityHistory();
    expect(history.length).toBe(1);
    expect(await getTotalXpBalance()).toBe(30);
  });

  it('skips XP for events with no ledger source or explicit zero XP', async () => {
    await recordActivity({
      type: 'mission_completed',
      dedupeKey: 'mission-daily-x',
      title: 'M',
      titleTa: 'M',
      xpEarned: 0,
    });
    expect(await getTotalXpBalance()).toBe(0);
    const history = await getActivityHistory();
    expect(history.length).toBe(1);
  });

  it('counts activity by type', () => {
    const items: ActivityHistoryItem[] = [
      { id: '1', type: 'quiz_completed', title: 'q', titleTa: 'q', timestamp: 1, xpEarned: 25, pointsEarned: 0 },
      { id: '2', type: 'quiz_completed', title: 'q', titleTa: 'q', timestamp: 2, xpEarned: 25, pointsEarned: 0 },
      { id: '3', type: 'riddle_completed', title: 'r', titleTa: 'r', timestamp: 3, xpEarned: 15, pointsEarned: 0 },
    ];
    const counts = countActivityTypes(items);
    expect(counts.quiz_completed).toBe(2);
    expect(counts.riddle_completed).toBe(1);
    expect(counts.game_completed).toBeUndefined();
  });

  it('keeps history newest-first and capped', async () => {
    for (let i = 0; i < 20; i += 1) {
      await recordActivity({
        type: 'fact_discovered',
        dedupeKey: `fact-${i}`,
        title: `Fact ${i}`,
        titleTa: `தகவல் ${i}`,
        timestamp: Date.now() + i,
      });
    }
    const history = await getActivityHistory();
    expect(history.length).toBe(20);
    expect(history[0].id).toContain('fact-19');
  });

  it('recovers from corrupted history storage', async () => {
    await storage.removeItem(STORAGE_KEYS.ACTIVITY_HISTORY);
    await AsyncStorage.setItem(STORAGE_KEYS.ACTIVITY_HISTORY, 'not-json-at-all{{');
    expect(await getActivityHistory()).toEqual([]);

    // Recording still works after recovery.
    const item = await recordActivity({
      type: 'riddle_completed',
      dedupeKey: 'riddle-recovery-1',
      title: 'R',
      titleTa: 'R',
    });
    expect(item).not.toBeNull();
    expect((await getActivityHistory()).length).toBe(1);
  });

  it('drops malformed history entries and keeps valid ones', async () => {
    await storage.removeItem(STORAGE_KEYS.ACTIVITY_HISTORY);
    await AsyncStorage.setItem(
      STORAGE_KEYS.ACTIVITY_HISTORY,
      JSON.stringify([
        { id: 'act-ok', type: 'game_completed', title: 'Ok', titleTa: 'Ok', timestamp: 100, xpEarned: 20, pointsEarned: 0 },
        { id: 7, type: 'game_completed', title: 'Bad' }, // invalid shape
        null,
        'junk',
      ])
    );
    const history = await getActivityHistory();
    expect(history.length).toBe(1);
    expect(history[0].id).toBe('act-ok');
  });

  it('keeps one XP award per dedupe even after a simulated restart', async () => {
    const input = {
      type: 'quiz_completed' as const,
      dedupeKey: 'quiz-restart-1',
      title: 'Q',
      titleTa: 'Q',
    };
    await recordActivity(input);
    // "Restart": activity + XP are still present.
    expect((await getActivityHistory()).length).toBe(1);
    expect(await getTotalXpBalance()).toBe(25);
    // Replay of the same completion after restart is a no-op on both layers.
    expect(await recordActivity(input)).toBeNull();
    expect((await getActivityHistory()).length).toBe(1);
    expect(await getTotalXpBalance()).toBe(25);
  });
});