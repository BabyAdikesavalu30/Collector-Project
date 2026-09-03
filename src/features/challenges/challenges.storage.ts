/**
 * Daily Challenge Feature Storage
 * Tracks whether today's challenge has been completed (and its result) so
 * the student sees a completed state instead of replaying for extra points.
 */

import { storage, STORAGE_KEYS } from '../../storage/asyncStorage';
import { DailyChallengeResult, DailyChallengeState } from './challenges.types';
import { getChallengeDateString } from './challenges.engine';

export const DAILY_CHALLENGE_KEY = STORAGE_KEYS.QUIZ_DAILY_CHALLENGE;

async function getAllStates(): Promise<Record<string, DailyChallengeState>> {
  try {
    const data = await storage.getItem<Record<string, DailyChallengeState>>(DAILY_CHALLENGE_KEY);
    return data && typeof data === 'object' ? data : {};
  } catch {
    return {};
  }
}

/**
 * Returns the completion state for a given date (defaults to today).
 */
export async function getDailyChallengeState(
  dateStr: string = getChallengeDateString()
): Promise<DailyChallengeState | null> {
  const all = await getAllStates();
  return all[dateStr] || null;
}

/**
 * Returns whether today's challenge has already been completed.
 */
export async function isDailyChallengeCompleted(
  dateStr: string = getChallengeDateString()
): Promise<boolean> {
  const state = await getDailyChallengeState(dateStr);
  return Boolean(state?.completed);
}

/**
 * Marks today's challenge as completed with its result, awarding points
 * through the same quiz persistence path (caller saves the quiz result).
 */
export async function markDailyChallengeCompleted(
  questionId: string,
  result: DailyChallengeResult,
  dateStr: string = getChallengeDateString()
): Promise<DailyChallengeState> {
  const all = await getAllStates();
  const state: DailyChallengeState = {
    date: dateStr,
    questionId,
    completed: true,
    result,
  };
  all[dateStr] = state;
  await storage.setItem(DAILY_CHALLENGE_KEY, all);
  return state;
}