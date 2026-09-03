/**
 * Unit Verification Test Suite for Demo Authentication & Session Flow
 */

import { demoAuthAdapter, DEMO_CREDENTIALS } from '../auth.demo';
import { SessionRepository, AuthSession } from '../auth.session';
import { BootstrapService } from '../../../services/bootstrap/bootstrapService';
import { BootstrapRestoredState } from '../../../services/bootstrap/types';

describe('Demo Authentication & Session Repository', () => {
  beforeEach(async () => {
    await SessionRepository.clearSession();
  });

  describe('Session Repository', () => {
    it('validates a valid session structure', () => {
      const validSession: AuthSession = {
        userId: 'usr_123',
        email: 'demo@vigyaan.app',
        isAuthenticated: true,
        authMode: 'password',
        createdAt: Date.now(),
      };
      expect(SessionRepository.isValidSession(validSession)).toBe(true);
    });

    it('rejects invalid or corrupted session structures', () => {
      expect(SessionRepository.isValidSession(null)).toBe(false);
      expect(SessionRepository.isValidSession({ userId: '', isAuthenticated: true })).toBe(false);
      expect(SessionRepository.isValidSession({ userId: '123', isAuthenticated: false })).toBe(false);
    });

    it('saves and retrieves a session', async () => {
      const session: AuthSession = {
        userId: 'usr_demo_001',
        email: 'demo@vigyaan.app',
        isAuthenticated: true,
        authMode: 'password',
        createdAt: Date.now(),
      };
      await SessionRepository.saveSession(session);
      const retrieved = await SessionRepository.getSession();
      expect(retrieved).not.toBeNull();
      expect(retrieved?.userId).toBe('usr_demo_001');
      expect(retrieved?.isAuthenticated).toBe(true);
    });

    it('clears an active session', async () => {
      const session: AuthSession = {
        userId: 'usr_demo_001',
        isAuthenticated: true,
        authMode: 'otp',
        createdAt: Date.now(),
      };
      await SessionRepository.saveSession(session);
      await SessionRepository.clearSession();
      const retrieved = await SessionRepository.getSession();
      expect(retrieved).toBeNull();
    });
  });

  describe('Demo Password Authentication Flow', () => {
    it('authenticates demo credentials successfully and creates session', async () => {
      const result = await demoAuthAdapter.loginWithPassword({
        identifier: DEMO_CREDENTIALS.EMAIL,
        password: DEMO_CREDENTIALS.PASSWORD,
      });

      expect(result.success).toBe(true);
      const session = await SessionRepository.getSession();
      expect(session?.isAuthenticated).toBe(true);
      expect(session?.email).toBe(DEMO_CREDENTIALS.EMAIL);
    });

    it('rejects invalid password', async () => {
      const result = await demoAuthAdapter.loginWithPassword({
        identifier: DEMO_CREDENTIALS.EMAIL,
        password: 'WrongPassword!123',
      });

      expect(result.success).toBe(false);
      expect(result.error).toBe('Invalid email or password. Please try again.');
    });
  });

  describe('Demo OTP Authentication Flow', () => {
    it('dispatches demo OTP request', async () => {
      const result = await demoAuthAdapter.requestLoginOtp({
        identifier: DEMO_CREDENTIALS.EMAIL,
      });
      expect(result.success).toBe(true);
    });

    it('verifies 123456 and creates session', async () => {
      const result = await demoAuthAdapter.verifyOtp({
        context: 'login',
        identifier: DEMO_CREDENTIALS.EMAIL,
        code: DEMO_CREDENTIALS.OTP,
      });

      expect(result.success).toBe(true);
      const session = await SessionRepository.getSession();
      expect(session?.isAuthenticated).toBe(true);
      expect(session?.authMode).toBe('otp');
    });

    it('rejects invalid OTP', async () => {
      const result = await demoAuthAdapter.verifyOtp({
        context: 'login',
        identifier: DEMO_CREDENTIALS.EMAIL,
        code: '999999',
      });

      expect(result.success).toBe(false);
      expect(result.error).toContain("That code isn't correct");
    });
  });

  describe('Bootstrap Route Resolution for Authenticated State', () => {
    it('routes authenticated users directly to /home when profile is complete', () => {
      const state: BootstrapRestoredState = {
        hasLaunchedBefore: true,
        language: 'en',
        hasLanguageSelected: true,
        isOnboardingCompleted: true,
        isAuthenticated: true,
        isProfileCompleted: true,
      };
      expect(BootstrapService.resolveInitialRoute(state)).toBe('/home');
    });

    it('routes unauthenticated users to /auth-welcome after onboarding and language selection', () => {
      const state: BootstrapRestoredState = {
        hasLaunchedBefore: true,
        language: 'en',
        hasLanguageSelected: true,
        isOnboardingCompleted: true,
        isAuthenticated: false,
        isProfileCompleted: false,
      };
      expect(BootstrapService.resolveInitialRoute(state)).toBe('/auth-welcome');
    });
  });
});
