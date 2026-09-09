/**
 * Spin Wheel Daily State Storage
 * Persists the once-per-day spin completion so a student cannot re-spin
 * (or re-earn the daily reward) by leaving and re-entering the screen or
 * restarting the app on the same local calendar day.
 */

import { storage, STORAGE_KEYS } from '../../storage/asyncStorage';
import { getXpDateKey } from '../xp';

export interface SpinWheelDailyState {
  /** Local YYYY-MM-DD of the most recent completed daily spin (null = never). */
  lastSpinDate: string | null;
}

export async function getSpinWheelDailyState(): Promise<SpinWheelDailyState> {
  try {
    const state = await storage.getItem<SpinWheelDailyState>(STORAGE_KEYS.SPIN_WHEEL_STATE);
    if (
      state &&
      typeof state === 'object' &&
      (typeof state.lastSpinDate === 'string' || state.lastSpinDate === null)
    ) {
      return { lastSpinDate: state.lastSpinDate };
    }
    return { lastSpinDate: null };
  } catch {
    return { lastSpinDate: null };
  }
}

/** True when the stored state already covers the given (default: today) local day. */
export function isSpinCompletedToday(
  state: SpinWheelDailyState,
  now: number = Date.now()
): boolean {
  return state.lastSpinDate === getXpDateKey(now);
}

/** Persists the daily completion for the given (default: today) local day. */
export async function markSpinCompletedToday(now: number = Date.now()): Promise<void> {
  await storage.setItem<SpinWheelDailyState>(STORAGE_KEYS.SPIN_WHEEL_STATE, {
    lastSpinDate: getXpDateKey(now),
  });
}
