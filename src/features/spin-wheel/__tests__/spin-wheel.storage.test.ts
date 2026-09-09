/**
 * Spin Wheel Daily State Storage Unit Tests
 * Guards the once-per-day rule: a completed daily spin stays completed for
 * the whole local day (across re-entry and restarts) and unlocks the next day.
 */

import { storage } from '../../../storage/asyncStorage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  getSpinWheelDailyState,
  isSpinCompletedToday,
  markSpinCompletedToday,
} from '../spin-wheel.storage';
import { getXpDateKey } from '../../xp';

// Fixed, timezone-safe day boundaries (noon avoids local midnight flakiness).
const DAY_ONE = new Date(2026, 0, 5, 12, 0, 0).getTime(); // Mon Jan 5 2026 12:00 local
const DAY_TWO = new Date(2026, 0, 6, 12, 0, 0).getTime(); // Tue Jan 6 2026 12:00 local

describe('Spin Wheel Daily State Storage', () => {
  beforeEach(async () => {
    storage.invalidateCache();
    await AsyncStorage.clear();
  });

  test('defaults to never spun (lastSpinDate null)', async () => {
    const state = await getSpinWheelDailyState();
    expect(state.lastSpinDate).toBeNull();
    expect(isSpinCompletedToday(state, DAY_ONE)).toBe(false);
  });

  test('markSpinCompletedToday persists the local date key', async () => {
    await markSpinCompletedToday(DAY_ONE);
    const state = await getSpinWheelDailyState();
    expect(state.lastSpinDate).toBe(getXpDateKey(DAY_ONE));
  });

  test('a completed spin stays locked for the rest of the same day', async () => {
    await markSpinCompletedToday(DAY_ONE);
    const state = await getSpinWheelDailyState();
    expect(isSpinCompletedToday(state, DAY_ONE)).toBe(true);
  });

  test('a completed spin unlocks on the next local day', async () => {
    await markSpinCompletedToday(DAY_ONE);
    const state = await getSpinWheelDailyState();
    expect(isSpinCompletedToday(state, DAY_TWO)).toBe(false);
  });

  test('malformed persisted state recovers safely to never spun', async () => {
    // Unparseable JSON stored directly on the device
    await AsyncStorage.setItem('@vigyaan/spin_wheel_state', 'NOT_JSON{{');
    storage.invalidateCache();
    const state = await getSpinWheelDailyState();
    expect(state.lastSpinDate).toBeNull();
  });

  test('wrongly-typed persisted state recovers safely to never spun', async () => {
    // Parsable JSON with an invalid shape (number instead of date string)
    await AsyncStorage.setItem('@vigyaan/spin_wheel_state', '{"lastSpinDate": 123}');
    storage.invalidateCache();
    const state = await getSpinWheelDailyState();
    expect(state.lastSpinDate).toBeNull();
  });

  test('re-marking the same day is idempotent (no duplicate day keys)', async () => {
    await markSpinCompletedToday(DAY_ONE);
    await markSpinCompletedToday(DAY_ONE);
    const state = await getSpinWheelDailyState();
    expect(state.lastSpinDate).toBe(getXpDateKey(DAY_ONE));
  });
});
