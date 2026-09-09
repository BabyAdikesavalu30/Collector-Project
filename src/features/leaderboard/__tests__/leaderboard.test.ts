/**
 * Leaderboard Feature Tests
 * Determinism, sorting, current-user position, and repository boundary.
 */

import { DemoLeaderboardRepository, leaderboardRepository } from '../leaderboard.repository';

describe('DemoLeaderboardRepository', () => {
  it('is deterministic for the same scope and period', async () => {
    const repo = new DemoLeaderboardRepository({ studentId: 'u1', displayName: 'You', totalXp: 1250 });
    const first = await repo.getLeaderboard('class', 'weekly');
    const second = await repo.getLeaderboard('class', 'weekly');
    expect(first.entries.map((e) => e.studentId)).toEqual(second.entries.map((e) => e.studentId));
    expect(first.currentUser.rank).toBe(second.currentUser.rank);
    expect(first.currentUser.periodXp).toBe(second.currentUser.periodXp);
  });

  it('varies by scope and period', async () => {
    const repo = new DemoLeaderboardRepository({ studentId: 'u1', displayName: 'You', totalXp: 1250 });
    const classBoard = await repo.getLeaderboard('class', 'weekly');
    const overallBoard = await repo.getLeaderboard('overall', 'weekly');
    const monthlyBoard = await repo.getLeaderboard('class', 'monthly');
    expect(classBoard.entries.length).not.toBe(overallBoard.entries.length);
    expect(classBoard.currentUser.rank).not.toBe(monthlyBoard.currentUser.rank);
  });

  it('sorts entries by total XP descending and assigns coherent ranks', async () => {
    const repo = new DemoLeaderboardRepository({ studentId: 'u1', displayName: 'You', totalXp: 1250 });
    const data = await repo.getLeaderboard('school', 'all_time');
    for (let i = 1; i < data.entries.length; i += 1) {
      expect(data.entries[i - 1].totalXp).toBeGreaterThanOrEqual(data.entries[i].totalXp);
      expect(data.entries[i - 1].rank).toBe(i);
    }
    expect(data.entries[0].rank).toBe(1);
  });

  it('always places the current user in the list with a valid rank', async () => {
    const repo = new DemoLeaderboardRepository({ studentId: 'me', displayName: 'Me', totalXp: 900 });
    const data = await repo.getLeaderboard('state', 'weekly');
    const current = data.entries.find((e) => e.isCurrentUser);
    expect(current).toBeDefined();
    expect(current?.rank).toBeGreaterThan(0);
    expect(current?.rank).toBeLessThanOrEqual(data.entries.length);
    expect(data.currentUser.rank).toBe(current?.rank);
    expect(data.currentUser.isDemo).toBe(true);
    expect(data.currentUser.totalEntries).toBe(data.entries.length);
  });

  it('exposes the interface via the exported repository singleton', async () => {
    const data = await leaderboardRepository.getLeaderboard('class', 'weekly');
    expect(data.isDemo).toBe(true);
    expect(data.entries.length).toBeGreaterThan(0);
  });

  it('marks demo data clearly (no fake server claims)', async () => {
    const repo = new DemoLeaderboardRepository();
    const data = await repo.getLeaderboard('class', 'weekly');
    expect(data.isDemo).toBe(true);
  });
});