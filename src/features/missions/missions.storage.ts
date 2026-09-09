/**
 * Missions Feature Storage / Repository
 * Persists claim state only. Progress is derived from activity history each
 * load; a completed mission can be claimed exactly once per period, which
 * prevents duplicate rewards. Claiming awards the configured XP through the
 * shared XP ledger and records a mission_completed activity event.
 */

import { storage, STORAGE_KEYS } from '../../storage/asyncStorage';
import { ActivityHistoryItem, recordActivity } from '../activity';
import { recordXp } from '../xp';
import { MissionClaimState, MissionDefinition, MissionKind, MissionWithProgress, MissionsSnapshot, MissionStatus } from './missions.types';
import { DAILY_MISSIONS, WEEKLY_MISSIONS } from './missions.config';
import { computeMissionProgress, getMissionClaimKey } from './missions.engine';

export const MISSIONS_STATE_KEY = STORAGE_KEYS.MISSIONS_STATE;

const EMPTY_STATE: MissionClaimState = { claims: {} };

export async function getMissionClaimState(): Promise<MissionClaimState> {
  try {
    const data = await storage.getItem<MissionClaimState>(MISSIONS_STATE_KEY);
    if (!data || typeof data !== 'object' || !data.claims || typeof data.claims !== 'object') {
      return { claims: {} };
    }
    return { claims: { ...data.claims } };
  } catch {
    return { claims: {} };
  }
}

export async function isMissionClaimed(
  kind: MissionKind,
  missionId: string,
  now: Date = new Date()
): Promise<boolean> {
  const state = await getMissionClaimState();
  return state.claims[getMissionClaimKey(kind, missionId, now)] !== undefined;
}

/**
 * Claims a completed mission's reward. Refuses when:
 *  - the mission is not actually completed in the current period, or
 *  - it was already claimed for the current period.
 */
export async function claimMissionReward(
  mission: MissionDefinition,
  history: ActivityHistoryItem[],
  now: Date = new Date()
): Promise<{ ok: boolean; reason?: 'not_completed' | 'already_claimed'; claimedAt?: number }> {
  const progress = computeMissionProgress(mission, history, now);
  if (!progress.completed) {
    return { ok: false, reason: 'not_completed' };
  }

  const claimKey = getMissionClaimKey(mission.kind, mission.id, now);
  const state = await getMissionClaimState();
  if (state.claims[claimKey] !== undefined) {
    return { ok: false, reason: 'already_claimed' };
  }

  const claimedAt = Date.now();

  // Award XP through the shared ledger (dedupe keyed to the period claim).
  await recordXp({
    source: mission.kind === 'daily' ? 'daily_mission' : 'weekly_mission',
    amount: mission.reward.xp,
    description: mission.title,
    descriptionTa: mission.titleTa,
    icon: mission.icon,
    dedupeKey: `mission-${claimKey}`,
    timestamp: claimedAt,
  });

  // Record the mission completion in the unified activity history.
  await recordActivity({
    type: 'mission_completed',
    dedupeKey: `mission-${claimKey}`,
    title: mission.title,
    titleTa: mission.titleTa,
    subtitle: 'Mission reward claimed',
    subtitleTa: 'பணி வெகுமதி பெறப்பட்டது',
    pointsEarned: mission.reward.points,
    xpEarned: 0, // XP already awarded above — never double-award.
    timestamp: claimedAt,
    metadata: { missionId: mission.id, kind: mission.kind },
  });

  state.claims[claimKey] = claimedAt;
  await storage.setItem(MISSIONS_STATE_KEY, state);

  return { ok: true, claimedAt };
}

/** Full missions snapshot with progress + status. */
export async function getMissionsSnapshot(
  history: ActivityHistoryItem[],
  now: Date = new Date()
): Promise<MissionsSnapshot> {
  const state = await getMissionClaimState();

  const resolve = (mission: MissionDefinition): MissionWithProgress => {
    const progress = computeMissionProgress(mission, history, now);
    const claimKey = getMissionClaimKey(mission.kind, mission.id, now);
    const claimedAt = state.claims[claimKey];
    let status: MissionStatus = 'not_started';
    if (claimedAt !== undefined) {
      status = 'claimed';
    } else if (progress.completed) {
      status = 'completed';
    } else if (progress.current > 0) {
      status = 'in_progress';
    }
    return { mission, progress, status, claimedAt };
  };

  const daily = DAILY_MISSIONS.map(resolve);
  const weekly = WEEKLY_MISSIONS.map(resolve);

  return {
    daily,
    weekly,
    dailyClaimedCount: daily.filter((m) => m.status === 'claimed').length,
    weeklyClaimedCount: weekly.filter((m) => m.status === 'claimed').length,
  };
}

/** Clears mission claim state (used on logout / demo reset). */
export async function clearMissionData(): Promise<void> {
  await storage.removeItem(MISSIONS_STATE_KEY);
}