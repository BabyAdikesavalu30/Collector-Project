/**
 * XP Feature Storage / Repository
 * Persists XP transactions, computes summaries, and awards the one-time
 * profile setup starter bonus (mirroring the existing "+50 XP STARTER
 * BONUS" copy without touching the profile-complete screen).
 */

import { storage, STORAGE_KEYS } from '../../storage/asyncStorage';
import { XPTransaction, XPSource, RewardSummary } from './xp.types';
import { XP_AMOUNTS, XP_SOURCE_ICONS, PROFILE_SETUP_BONUS_XP, PROFILE_SETUP_BONUS_KEY, PROFILE_SETUP_BONUS_ICON } from './xp.constants';
import { computeRewardSummary } from './xp.engine';
import { calculateScienceLevel } from '../levels';

export const XP_TRANSACTIONS_KEY = STORAGE_KEYS.XP_TRANSACTIONS;

export interface RecordXpInput {
  source: XPSource;
  amount?: number;
  description: string;
  descriptionTa: string;
  icon?: string;
  activityId?: string;
  timestamp?: number;
  /** Stable dedupe key — re-recording the same key is a no-op. */
  dedupeKey?: string;
  metadata?: Record<string, string | number | boolean | undefined>;
}

function isTransaction(value: unknown): value is XPTransaction {
  if (!value || typeof value !== 'object') return false;
  const t = value as Partial<XPTransaction>;
  return (
    typeof t.id === 'string' &&
    typeof t.amount === 'number' &&
    !Number.isNaN(t.amount) &&
    Number.isFinite(t.amount) &&
    t.amount >= 0 &&
    typeof t.timestamp === 'number' &&
    !Number.isNaN(t.timestamp) &&
    typeof t.source === 'string'
  );
}

export async function getXpTransactions(): Promise<XPTransaction[]> {
  try {
    const list = await storage.getItem<XPTransaction[]>(XP_TRANSACTIONS_KEY);
    if (!Array.isArray(list)) return [];
    return list.filter(isTransaction).sort((a, b) => b.timestamp - a.timestamp);
  } catch {
    return [];
  }
}

/**
 * Records one XP transaction. When `dedupeKey` is provided the same key is
 * never awarded twice (prevents duplicate rewards for one logical event).
 */
export async function recordXp(input: RecordXpInput): Promise<XPTransaction | null> {
  const id = input.dedupeKey ? `xp-${input.dedupeKey}` : `xp-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

  const existing = await getXpTransactions();
  if (input.dedupeKey && existing.some((t) => t.id === id)) {
    return null;
  }

  const transaction: XPTransaction = {
    id,
    source: input.source,
    amount: input.amount ?? XP_AMOUNTS[input.source],
    description: input.description,
    descriptionTa: input.descriptionTa,
    icon: input.icon ?? XP_SOURCE_ICONS[input.source],
    timestamp: input.timestamp ?? Date.now(),
    activityId: input.activityId,
    metadata: input.metadata,
  };

  await storage.setItem(XP_TRANSACTIONS_KEY, [transaction, ...existing]);
  return transaction;
}

export async function getXpSummary(now: number = Date.now()): Promise<RewardSummary> {
  const transactions = await getXpTransactions();
  const summary = computeRewardSummary(transactions, now);
  const level = calculateScienceLevel(summary.totalXp);
  return { ...summary, levelProgressPercent: level.progressPercent };
}

/**
 * Awards the one-time starter bonus when the student profile setup is
 * complete and no bonus transaction exists yet.
 */
export async function awardStarterBonusIfNeeded(): Promise<XPTransaction | null> {
  try {
    const setupComplete = await storage.getItem<boolean>(STORAGE_KEYS.STUDENT_PROFILE_SETUP_COMPLETE);
    if (!setupComplete) return null;

    const existing = await getXpTransactions();
    if (existing.some((t) => t.id === `xp-${PROFILE_SETUP_BONUS_KEY}`)) {
      return null;
    }

    return recordXp({
      source: 'profile_setup_bonus',
      amount: PROFILE_SETUP_BONUS_XP,
      description: 'Profile setup bonus',
      descriptionTa: 'சுயவிவர அமைப்பு போனஸ்',
      icon: PROFILE_SETUP_BONUS_ICON,
      dedupeKey: PROFILE_SETUP_BONUS_KEY,
    });
  } catch {
    return null;
  }
}

/** Clears XP history (used on logout / demo reset). */
export async function clearXpData(): Promise<void> {
  await storage.removeItem(XP_TRANSACTIONS_KEY);
}