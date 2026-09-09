/**
 * Missions Feature Engine
 * Pure mission progress evaluation. Progress is always derived from the
 * unified activity history within the current period (today / this week),
 * so day changes and duplicate-prevention fall out naturally.
 */

import { ActivityHistoryItem } from '../activity';
import { calculateStreak, getStreakDateKey } from '../streaks';
import { MissionDefinition, MissionKind, MissionProgress, MissionRequirement } from './missions.types';

/** Local YYYY-MM-DD for today (injectable for tests). */
export function getPeriodDayKey(now: Date = new Date()): string {
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const d = String(now.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

/** Monday-based week start as a Date. */
export function getWeekStart(now: Date = new Date()): Date {
  const day = (now.getDay() + 6) % 7; // Monday = 0
  return new Date(now.getFullYear(), now.getMonth(), now.getDate() - day);
}

/** Week key: Monday YYYY-MM-DD (injectable for tests). */
export function getPeriodWeekKey(now: Date = new Date()): string {
  return getPeriodDayKey(getWeekStart(now));
}

/** Stable claim key for a mission in its current period. */
export function getMissionClaimKey(kind: MissionKind, missionId: string, now: Date = new Date()): string {
  const periodKey = kind === 'daily' ? getPeriodDayKey(now) : getPeriodWeekKey(now);
  return `${kind}:${missionId}:${periodKey}`;
}

function inPeriod(item: ActivityHistoryItem, kind: MissionKind, now: Date): boolean {
  if (kind === 'daily') {
    return getStreakDateKey(item.timestamp) === getPeriodDayKey(now);
  }
  const weekStart = getWeekStart(now).getTime();
  const nextWeek = weekStart + 7 * 24 * 60 * 60 * 1000;
  return item.timestamp >= weekStart && item.timestamp < nextWeek;
}

function uniqueGameIds(history: ActivityHistoryItem[]): Set<string> {
  const ids = new Set<string>();
  for (const item of history) {
    const gameId = item.metadata?.gameId;
    if (typeof gameId === 'string' && gameId.length > 0) {
      ids.add(gameId);
    }
  }
  return ids;
}

/**
 * Pure progress computation for a single mission within the current period.
 */
export function computeMissionProgress(
  mission: MissionDefinition,
  history: ActivityHistoryItem[],
  now: Date = new Date()
): MissionProgress {
  const periodItems = history.filter((h) => inPeriod(h, mission.kind, now));
  const requirement = mission.requirement;
  let current = 0;

  switch (requirement.kind) {
    case 'playGame':
      current = periodItems.filter((h) => h.type === 'game_completed').length;
      break;
    case 'solveRiddle':
      current = periodItems.filter((h) => h.type === 'riddle_completed').length;
      break;
    case 'discoverFact':
      current = periodItems.filter((h) => h.type === 'fact_discovered').length;
      break;
    case 'solveMystery':
      current = periodItems.filter((h) => h.type === 'mystery_completed').length;
      break;
    case 'completeQuiz':
      current = periodItems.filter((h) => h.type === 'quiz_completed').length;
      break;
    case 'completeChallenge':
      current = periodItems.filter((h) => h.type === 'challenge_completed').length;
      break;
    case 'completeActivity':
      current = periodItems.length;
      break;
    case 'playDifferentGames':
      current = uniqueGameIds(periodItems).size;
      break;
    case 'maintainStreak': {
      const streak = calculateStreak(history.map((h) => h.timestamp), now);
      current = streak.currentStreak;
      break;
    }
    default:
      current = 0;
  }

  return {
    current: Math.min(current, requirement.target),
    target: requirement.target,
    completed: current >= requirement.target,
  };
}

/** Internal helper exposed for tests: requirement kind matcher. */
export function matchesRequirement(requirement: MissionRequirement, item: ActivityHistoryItem): boolean {
  switch (requirement.kind) {
    case 'playGame':
      return item.type === 'game_completed';
    case 'solveRiddle':
      return item.type === 'riddle_completed';
    case 'discoverFact':
      return item.type === 'fact_discovered';
    case 'solveMystery':
      return item.type === 'mystery_completed';
    case 'completeQuiz':
      return item.type === 'quiz_completed';
    case 'completeChallenge':
      return item.type === 'challenge_completed';
    case 'completeActivity':
      return true;
    case 'playDifferentGames':
      return item.type === 'game_completed';
    case 'maintainStreak':
      return true;
    default:
      return false;
  }
}