/**
 * Leaderboard Feature Repository
 * Clean service boundary. Screens depend only on the interface; the demo
 * implementation ships today and a backend implementation can replace it
 * later without UI changes.
 */

import { LeaderboardData, LeaderboardPeriod, LeaderboardScope } from './leaderboard.types';

export interface LeaderboardRepository {
  getLeaderboard(scope: LeaderboardScope, period: LeaderboardPeriod): Promise<LeaderboardData>;
}

/**
 * Deterministic pseudo-random generator (mulberry32) so demo rankings are
 * stable across reloads for a given (scope, period, studentId) tuple.
 */
function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function hashString(input: string): number {
  let hash = 2166136261;
  for (let i = 0; i < input.length; i++) {
    hash ^= input.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

const DEMO_STUDENT_POOL: Array<{ name: string; level: number; xp: number }> = [
  { name: 'Arjun V', level: 8, xp: 3100 },
  { name: 'Meera K', level: 7, xp: 2650 },
  { name: 'Kavya R', level: 6, xp: 2240 },
  { name: 'Siddharth M', level: 6, xp: 2010 },
  { name: 'Priya S', level: 5, xp: 1740 },
  { name: 'Adithya N', level: 5, xp: 1520 },
  { name: 'Lakshmi P', level: 4, xp: 1210 },
  { name: 'Rahul T', level: 4, xp: 980 },
  { name: 'Divya G', level: 3, xp: 760 },
  { name: 'Karthik B', level: 3, xp: 610 },
  { name: 'Nithya A', level: 2, xp: 420 },
  { name: 'Vignesh D', level: 2, xp: 300 },
  { name: 'Harini J', level: 1, xp: 180 },
  { name: 'Sanjay L', level: 1, xp: 90 },
  { name: 'Swathi E', level: 1, xp: 45 },
];

const SCOPE_SIZE: Record<LeaderboardScope, number> = {
  class: 26,
  school: 48,
  state: 120,
  overall: 200,
};

/** Fictional but clearly demo names for filled ranks. */
const GENERIC_NAMES = [
  'Rohan', 'Sneha', 'Akash', 'Janani', 'Varun', 'Deepika', 'Manoj', 'Sangeetha',
  'Naveen', 'Kavitha', 'Praveen', 'Shalini', 'Dinesh', 'Amritha', 'Ganesh', 'Revathi',
  'Harish', 'Madhumita', 'Suresh', 'Anitha', 'Bharath', 'Charulatha', 'Ezhil', 'Fathima',
];

function initials(name: string): string {
  return name
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

export class DemoLeaderboardRepository implements LeaderboardRepository {
  private currentUser: { studentId: string; displayName: string; totalXp: number };

  constructor(options?: { studentId?: string; displayName?: string; totalXp?: number }) {
    this.currentUser = {
      studentId: options?.studentId || 'usr_demo_001',
      displayName: options?.displayName || 'You',
      totalXp: options?.totalXp ?? 0,
    };
  }

  async getLeaderboard(
    scope: LeaderboardScope,
    period: LeaderboardPeriod
  ): Promise<LeaderboardData> {
    const size = SCOPE_SIZE[scope];
    const seed = hashString(`${scope}:${period}:${this.currentUser.studentId}`);
    const rand = mulberry32(seed);

    // Current user's deterministic rank: #12–#24 depending on seed.
    const userRank = 12 + (seed % 13);

    // Fill the board with deterministic fictional students.
    const entries: LeaderboardData['entries'] = [];
    const usedNames = new Set<string>();

    const takeName = (): string => {
      const names = rand() < 0.6 ? DEMO_STUDENT_POOL.map((s) => s.name) : GENERIC_NAMES;
      let name = names[Math.floor(rand() * names.length)];
      let guard = 0;
      while (usedNames.has(name) && guard < 40) {
        name = names[Math.floor(rand() * names.length)];
        guard += 1;
      }
      usedNames.add(name);
      return name;
    };

    for (let rank = 1; rank <= size; rank += 1) {
      if (rank === userRank) {
        const periodXp = 45 + (seed % 60);
        const movement = rank % 3 === 0 ? -2 : rank % 2 === 0 ? 3 : 4;
        entries.push({
          rank,
          studentId: this.currentUser.studentId,
          displayName: this.currentUser.displayName,
          level: 5 + (seed % 3),
          totalXp: this.currentUser.totalXp,
          periodXp,
          movement,
          isCurrentUser: true,
          avatarInitials: initials(this.currentUser.displayName),
        });
        continue;
      }

      const base = DEMO_STUDENT_POOL[Math.floor(rand() * DEMO_STUDENT_POOL.length)];
      const jitter = Math.floor(rand() * 160);
      const xp = Math.max(0, base.xp + (rand() < 0.5 ? -jitter : jitter));
      const name = takeName();
      entries.push({
        rank,
        studentId: `demo-${scope}-${period}-${rank}`,
        displayName: name,
        level: Math.max(1, base.level + (rank > 20 ? 0 : 0)),
        totalXp: xp,
        periodXp: 20 + Math.floor(rand() * 140),
        movement: Math.floor(rand() * 5) - 2,
        isCurrentUser: false,
        avatarInitials: initials(name),
      });
    }

    // Sort by totalXp descending and re-assign ranks so the list is coherent.
    const sorted = entries.sort((a, b) => b.totalXp - a.totalXp);
    sorted.forEach((entry, index) => {
      entry.rank = index + 1;
    });

    const current = sorted.find((e) => e.isCurrentUser) || {
      rank: userRank,
      studentId: this.currentUser.studentId,
      displayName: this.currentUser.displayName,
      level: 5,
      totalXp: this.currentUser.totalXp,
      periodXp: 45,
      movement: 4,
      isCurrentUser: true,
      avatarInitials: initials(this.currentUser.displayName),
    };

    return {
      scope,
      period,
      isDemo: true,
      entries: sorted,
      currentUser: {
        rank: current.rank,
        totalEntries: size,
        periodXp: current.periodXp,
        movement: current.movement,
        isDemo: true,
      },
    };
  }
}

export const leaderboardRepository: LeaderboardRepository = new DemoLeaderboardRepository();