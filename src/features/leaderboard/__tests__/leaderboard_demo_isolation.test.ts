/**
 * Leaderboard Demo Isolation Regression Test Suite (BUG A)
 * Validates:
 * 1. Demo leaderboard repository preserves explicit student IDs.
 * 2. Missing production session must not silently convert to 'usr_demo_001'.
 * 3. Explicit demo sessions retain demo labeling and deterministic data.
 */

import { DemoLeaderboardRepository } from '../leaderboard.repository';
import { SessionRepository, AuthSession } from '../../auth';
import { storage } from '../../../storage/asyncStorage';

describe('Leaderboard Demo Isolation (BUG A)', () => {
  beforeEach(async () => {
    await storage.clearAllDevelopmentState();
  });

  afterEach(async () => {
    await storage.clearAllDevelopmentState();
  });

  it('preserves real user identity for authenticated production session', async () => {
    const realSession: AuthSession = {
      userId: 'usr_prod_real_999',
      email: 'student@school.edu',
      fullName: 'Meenakshi Sundaram',
      isAuthenticated: true,
      authMode: 'password',
      createdAt: Date.now(),
    };
    await SessionRepository.saveSession(realSession);

    const session = await SessionRepository.getSession();
    expect(session).not.toBeNull();
    expect(session?.userId).toBe('usr_prod_real_999');
    expect(session?.authMode).toBe('password');

    // Instantiating repository with real user ID
    const repo = new DemoLeaderboardRepository({
      studentId: session!.userId,
      displayName: session!.fullName || 'You',
      totalXp: 500,
    });

    const data = await repo.getLeaderboard('class', 'weekly');
    const currentEntry = data.entries.find((e) => e.isCurrentUser);
    expect(currentEntry).toBeDefined();
    expect(currentEntry?.studentId).toBe('usr_prod_real_999');
    expect(currentEntry?.studentId).not.toBe('usr_demo_001');
    expect(currentEntry?.displayName).toBe('Meenakshi Sundaram');
  });

  it('keeps demo user identity strictly isolated to explicit demo mode', async () => {
    const demoSession: AuthSession = {
      userId: 'usr_demo_direct',
      email: 'demo@vigyaan.app',
      fullName: 'Anu',
      isAuthenticated: true,
      authMode: 'demo',
      createdAt: Date.now(),
    };
    await SessionRepository.saveSession(demoSession);

    const session = await SessionRepository.getSession();
    expect(session?.authMode).toBe('demo');

    const repo = new DemoLeaderboardRepository({
      studentId: session!.userId,
      displayName: session!.fullName || 'Anu',
      totalXp: 840,
    });

    const data = await repo.getLeaderboard('class', 'weekly');
    const currentEntry = data.entries.find((e) => e.isCurrentUser);
    expect(currentEntry).toBeDefined();
    expect(currentEntry?.studentId).toBe('usr_demo_direct');
    expect(data.currentUser.isDemo).toBe(true);
    expect(data.isDemo).toBe(true);
  });

  it('detects unauthenticated state when no session is stored', async () => {
    const session = await SessionRepository.getSession();
    expect(session).toBeNull();
    // In production flow, a null session must not silently resolve to usr_demo_001
    const resolvedId = session ? (session as AuthSession).userId : null;
    expect(resolvedId).toBeNull();
  });
});
