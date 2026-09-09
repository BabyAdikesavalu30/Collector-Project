/**
 * Missions Feature Tests
 * Progress derivation, period windows, duplicate prevention, and claims.
 */

import { storage, STORAGE_KEYS } from '../../../storage/asyncStorage';
import { ActivityHistoryItem, clearActivityHistory } from '../../activity';
import {
  DAILY_MISSIONS,
  WEEKLY_MISSIONS,
} from '../missions.config';
import {
  computeMissionProgress,
  getMissionClaimKey,
  getPeriodDayKey,
  getPeriodWeekKey,
} from '../missions.engine';
import { claimMissionReward, clearMissionData, getMissionClaimState, getMissionsSnapshot, isMissionClaimed } from '../missions.storage';
import { clearXpData, getXpTransactions } from '../../xp';
import { getActivityHistory } from '../../activity';

// Fixed "now" for deterministic period windows: 2026-09-03 (Thursday).
const NOW = new Date(2026, 8, 3, 12, 0, 0);

function item(
  type: ActivityHistoryItem['type'],
  day: number,
  id: string,
  metadata?: Record<string, string | number | boolean | undefined>
): ActivityHistoryItem {
  const d = new Date(2026, 8, day, 10, 0, 0);
  return {
    id,
    type,
    title: id,
    titleTa: id,
    timestamp: d.getTime(),
    xpEarned: 10,
    pointsEarned: 0,
    metadata,
  };
}

describe('mission period keys', () => {
  it('produces a stable daily key per local day', () => {
    expect(getPeriodDayKey(new Date(2026, 8, 3, 23, 59))).toBe('2026-09-03');
  });

  it('produces a Monday-based weekly key', () => {
    expect(getPeriodWeekKey(new Date(2026, 8, 3, 12))).toBe('2026-08-31');
  });

  it('claim keys differ per day and per week', () => {
    const monday = getMissionClaimKey('daily', 'daily-play-game', new Date(2026, 8, 1));
    const tuesday = getMissionClaimKey('daily', 'daily-play-game', new Date(2026, 8, 2));
    expect(monday).not.toBe(tuesday);
    expect(getMissionClaimKey('daily', 'daily-play-game', NOW)).toContain('2026-09-03');
  });
});

describe('computeMissionProgress', () => {
  it('counts games played today only for the daily mission', () => {
    const mission = DAILY_MISSIONS.find((m) => m.id === 'daily-play-game')!;
    const history = [
      item('game_completed', 3, 'a'), // today
      item('game_completed', 2, 'b'), // yesterday — not today
      item('riddle_completed', 3, 'c'),
    ];
    const progress = computeMissionProgress(mission, history, NOW);
    expect(progress.current).toBe(1);
    expect(progress.completed).toBe(true);
  });

  it('counts distinct facts toward the discovery mission', () => {
    const mission = DAILY_MISSIONS.find((m) => m.id === 'daily-discover-facts')!;
    const history = [item('fact_discovered', 3, 'f1'), item('fact_discovered', 3, 'f2')];
    const progress = computeMissionProgress(mission, history, NOW);
    expect(progress.current).toBe(2);
    expect(progress.completed).toBe(false);
  });

  it('counts unique games for the weekly different-games mission', () => {
    const mission = WEEKLY_MISSIONS.find((m) => m.id === 'weekly-three-games')!;
    const history = [
      item('game_completed', 1, 'g1', { gameId: 'zip' }),
      item('game_completed', 2, 'g2', { gameId: 'zip' }), // duplicate game
      item('game_completed', 3, 'g3', { gameId: 'tango' }),
      item('game_completed', 2, 'g4', { gameId: 'queens' }),
    ];
    const progress = computeMissionProgress(mission, history, NOW);
    expect(progress.current).toBe(3);
    expect(progress.completed).toBe(true);
  });

  it('counts any activity for the weekly completion mission within the week', () => {
    const mission = WEEKLY_MISSIONS.find((m) => m.id === 'weekly-five-activities')!;
    const history = [
      item('game_completed', 1, 'a'),
      item('riddle_completed', 1, 'b'),
      item('fact_discovered', 2, 'c'),
      item('mystery_completed', 2, 'd'),
      item('quiz_completed', 3, 'e'),
    ];
    const progress = computeMissionProgress(mission, history, NOW);
    expect(progress.current).toBe(5);
    expect(progress.completed).toBe(true);
  });

  it('does not count activities from the previous week', () => {
    const mission = WEEKLY_MISSIONS.find((m) => m.id === 'weekly-five-activities')!;
    // Aug 20 is two weeks before NOW; Aug 30 is the previous week.
    const history = [item('game_completed', 30, 'prev')];
    const progress = computeMissionProgress(mission, history, NOW);
    expect(progress.current).toBe(0);
  });

  it('evaluates the streak mission from the unified streak', () => {
    const mission = WEEKLY_MISSIONS.find((m) => m.id === 'weekly-five-day-streak')!;
    const history = [
      item('game_completed', 1, 's1'),
      item('game_completed', 2, 's2'),
      item('game_completed', 3, 's3'),
      item('game_completed', 4, 's4'),
      item('game_completed', 5, 's5'),
    ];
    const progress = computeMissionProgress(mission, history, NOW);
    expect(progress.current).toBe(5);
    expect(progress.completed).toBe(true);
  });
});

describe('claimMissionReward', () => {
  beforeEach(async () => {
    await storage.removeItem(STORAGE_KEYS.MISSIONS_STATE);
    await storage.removeItem(STORAGE_KEYS.XP_TRANSACTIONS);
    await storage.removeItem(STORAGE_KEYS.ACTIVITY_HISTORY);
  });

  it('refuses to claim an incomplete mission', async () => {
    const mission = DAILY_MISSIONS.find((m) => m.id === 'daily-play-game')!;
    const result = await claimMissionReward(mission, [], NOW);
    expect(result.ok).toBe(false);
    expect(result.reason).toBe('not_completed');
  });

  it('claims once, awards XP once, and blocks duplicates', async () => {
    const mission = DAILY_MISSIONS.find((m) => m.id === 'daily-play-game')!;
    const history = [item('game_completed', 3, 'a')];

    const first = await claimMissionReward(mission, history, NOW);
    expect(first.ok).toBe(true);

    const second = await claimMissionReward(mission, history, NOW);
    expect(second.ok).toBe(false);
    expect(second.reason).toBe('already_claimed');

    const transactions = await getXpTransactions();
    const missionXp = transactions.filter((t) => t.source === 'daily_mission');
    expect(missionXp.length).toBe(1);
    expect(missionXp[0].amount).toBe(100);

    // The mission completion activity is recorded once.
    const historyAfter = await getActivityHistory();
    const completions = historyAfter.filter((h) => h.type === 'mission_completed');
    expect(completions.length).toBe(1);
  });

  it('awards the weekly reward with the weekly XP source', async () => {
    const mission = WEEKLY_MISSIONS.find((m) => m.id === 'weekly-five-activities')!;
    const history = [
      item('game_completed', 1, 'a'),
      item('riddle_completed', 1, 'b'),
      item('fact_discovered', 2, 'c'),
      item('mystery_completed', 2, 'd'),
      item('quiz_completed', 3, 'e'),
    ];
    const result = await claimMissionReward(mission, history, NOW);
    expect(result.ok).toBe(true);
    const transactions = await getXpTransactions();
    expect(transactions.find((t) => t.source === 'weekly_mission')?.amount).toBe(500);
  });

  it('resets daily progress on the next day', async () => {
    const mission = DAILY_MISSIONS.find((m) => m.id === 'daily-play-game')!;
    const today = [item('game_completed', 3, 'a')];
    const tomorrow = new Date(2026, 8, 4, 12);
    const progressToday = computeMissionProgress(mission, today, NOW);
    const progressTomorrow = computeMissionProgress(mission, today, tomorrow);
    expect(progressToday.completed).toBe(true);
    expect(progressTomorrow.completed).toBe(false);
    expect(progressTomorrow.current).toBe(0);
  });

  it('snapshot reflects claimed status', async () => {
    const mission = DAILY_MISSIONS.find((m) => m.id === 'daily-play-game')!;
    const history = [item('game_completed', 3, 'a')];
    await claimMissionReward(mission, history, NOW);
    const snapshot = await getMissionsSnapshot(history, NOW);
    const claimed = snapshot.daily.find((m) => m.mission.id === 'daily-play-game');
    expect(claimed?.status).toBe('claimed');
  });
});

describe('mission storage hardening', () => {
  // Reset through the feature repositories (same code path production uses on
  // logout / demo reset) so tests never depend on raw store internals.
  beforeEach(async () => {
    await clearMissionData();
    await clearXpData();
    await clearActivityHistory();
  });

  it('recovers from a corrupted claim-state payload', async () => {
    const mission = DAILY_MISSIONS.find((m) => m.id === 'daily-play-game')!;
    // Simulate disk corruption: a stored payload that is not a claim object.
    await storage.setItem(STORAGE_KEYS.MISSIONS_STATE, 'not-an-object');

    const state = await getMissionClaimState();
    expect(state.claims).toEqual({});
    expect(await isMissionClaimed(mission.kind, mission.id, NOW)).toBe(false);

    // A real claim still works after recovery and awards XP exactly once.
    const history = [item('game_completed', 3, 'a')];
    const result = await claimMissionReward(mission, history, NOW);
    expect(result.ok).toBe(true);
    const transactions = await getXpTransactions();
    expect(transactions.filter((t) => t.source === 'daily_mission').length).toBe(1);
  });

  it('does not allow yesterday claim to be re-claimed today for free', async () => {
    const mission = DAILY_MISSIONS.find((m) => m.id === 'daily-play-game')!;
    const sep3 = new Date(2026, 8, 3, 12);
    const sep4 = new Date(2026, 8, 4, 12);

    // Claimed on Sep 3 with Sep 3 activity.
    const first = await claimMissionReward(mission, [item('game_completed', 3, 'a')], sep3);
    expect(first.ok).toBe(true);

    // Next day, the old claim must not be claimable again from old activity.
    const stale = await claimMissionReward(mission, [item('game_completed', 3, 'b')], sep4);
    expect(stale.ok).toBe(false);
    expect(stale.reason).toBe('not_completed');

    // With genuine new activity on Sep 4, it is claimable exactly once more.
    const again = await claimMissionReward(mission, [item('game_completed', 4, 'c')], sep4);
    expect(again.ok).toBe(true);
    const transactions = await getXpTransactions();
    expect(transactions.filter((t) => t.source === 'daily_mission').length).toBe(2);
    // Claim keys are period-aware — Sep 3 and Sep 4 are distinct.
    expect(getMissionClaimKey('daily', mission.id, sep3)).not.toBe(
      getMissionClaimKey('daily', mission.id, sep4)
    );
  });

  it('weekly claims are period-aware across week boundaries', async () => {
    const mission = WEEKLY_MISSIONS.find((m) => m.id === 'weekly-five-activities')!;
    const week1 = new Date(2026, 8, 3, 12); // week of Aug 31
    const week2 = new Date(2026, 8, 8, 12); // week of Sep 7
    expect(getMissionClaimKey('weekly', mission.id, week1)).not.toBe(
      getMissionClaimKey('weekly', mission.id, week2)
    );

    // Claimed in week 1.
    const first = await claimMissionReward(
      mission,
      [item('quiz_completed', 1, 'w1a'), item('quiz_completed', 1, 'w1b'), item('game_completed', 1, 'w1c'), item('riddle_completed', 1, 'w1d'), item('fact_discovered', 1, 'w1e')],
      week1
    );
    expect(first.ok).toBe(true);

    // Week 2 with no new activity: old week activity must not count.
    const staleWeek2 = await claimMissionReward(mission, [], week2);
    expect(staleWeek2.ok).toBe(false);
    expect(staleWeek2.reason).toBe('not_completed');

    // Week 2 with real activity earns the weekly reward again (new period).
    const second = await claimMissionReward(
      mission,
      [item('game_completed', 8, 'w2a'), item('game_completed', 8, 'w2b'), item('riddle_completed', 8, 'w2c'), item('fact_discovered', 8, 'w2d'), item('quiz_completed', 8, 'w2e')],
      week2
    );
    expect(second.ok).toBe(true);
    const transactions = await getXpTransactions();
    expect(transactions.filter((t) => t.source === 'weekly_mission').length).toBe(2);
  });
});