/**
 * Master Verification Test Suite for Frontend Remediation
 * Tests Demo Access, Demo Auth, Session Persistence, Logout, Reset, and Bootstrap Routing.
 */

import { authService } from '../auth.service';
import { SessionRepository } from '../auth.session';
import { DEMO_CREDENTIALS, DEMO_DEFAULT_PROFILE } from '../auth.demo';
import { storage, STORAGE_KEYS } from '../../../storage/asyncStorage';
import { BootstrapService } from '../../../services/bootstrap/bootstrapService';
import { colors } from '../../../theme/colors';

describe('Frontend Remediation Master Test Suite', () => {
  beforeEach(async () => {
    await SessionRepository.clearSession();
    await storage.removeItem(STORAGE_KEYS.STUDENT_PROFILE);
    await storage.removeItem(STORAGE_KEYS.DASHBOARD_CACHE);
  });

  describe('Direct Demo Access Flow', () => {
    it('activates direct demo session and configures default student profile', async () => {
      const result = await authService.loginAsDemo();
      expect(result.success).toBe(true);

      const session = await SessionRepository.getSession();
      expect(session).not.toBeNull();
      expect(session?.isAuthenticated).toBe(true);
      expect(session?.authMode).toBe('demo');

      const profile = await storage.getItem<typeof DEMO_DEFAULT_PROFILE>(STORAGE_KEYS.STUDENT_PROFILE);
      expect(profile?.fullName).toBe(DEMO_DEFAULT_PROFILE.fullName);
      expect(profile?.grade).toBe(DEMO_DEFAULT_PROFILE.grade);
    });
  });

  describe('Demo Credentials Authentication', () => {
    it('authenticates demo email & password and sets up active session', async () => {
      const result = await authService.loginWithPassword({
        identifier: DEMO_CREDENTIALS.EMAIL,
        password: DEMO_CREDENTIALS.PASSWORD,
      });

      expect(result.success).toBe(true);
      const session = await SessionRepository.getSession();
      expect(session?.isAuthenticated).toBe(true);
      expect(session?.email).toBe(DEMO_CREDENTIALS.EMAIL);
    });

    it('rejects invalid password credentials', async () => {
      const result = await authService.loginWithPassword({
        identifier: DEMO_CREDENTIALS.EMAIL,
        password: 'IncorrectPassword',
      });

      expect(result.success).toBe(false);
      expect(result.error).toBeTruthy();
    });
  });

  describe('Demo Logout and Reset Lifecycle', () => {
    it('clears active session on logout while preserving language and onboarding', async () => {
      await storage.setItem(STORAGE_KEYS.USER_LANGUAGE, 'ta');
      await storage.setItem(STORAGE_KEYS.ONBOARDING_COMPLETED, true);
      await authService.loginAsDemo();

      expect(await SessionRepository.getSession()).not.toBeNull();

      await authService.logout();

      expect(await SessionRepository.getSession()).toBeNull();
      expect(await storage.getItem(STORAGE_KEYS.USER_LANGUAGE)).toBe('ta');
      expect(await storage.getItem(STORAGE_KEYS.ONBOARDING_COMPLETED)).toBe(true);
    });

    it('resets demo state completely', async () => {
      await authService.loginAsDemo();
      await authService.resetDemo();

      expect(await SessionRepository.getSession()).toBeNull();
      expect(await storage.getItem(STORAGE_KEYS.STUDENT_PROFILE)).toBeNull();
    });
  });

  describe('Bootstrap Route Resolution Authority', () => {
    it('routes authenticated demo sessions directly to /home when profile complete', () => {
      const route = BootstrapService.resolveInitialRoute({
        hasLaunchedBefore: true,
        language: 'en',
        hasLanguageSelected: true,
        isOnboardingCompleted: true,
        isAuthenticated: true,
        isProfileCompleted: true,
      });
      expect(route).toBe('/home');
    });

    it('routes first-time users to /welcome', () => {
      const route = BootstrapService.resolveInitialRoute({
        hasLaunchedBefore: false,
        language: null,
        hasLanguageSelected: false,
        isOnboardingCompleted: false,
        isAuthenticated: false,
        isProfileCompleted: false,
      });
      expect(route).toBe('/welcome');
    });

    it('routes post-onboarding unauthenticated users to /auth-welcome', () => {
      const route = BootstrapService.resolveInitialRoute({
        hasLaunchedBefore: true,
        language: 'en',
        hasLanguageSelected: true,
        isOnboardingCompleted: true,
        isAuthenticated: false,
        isProfileCompleted: false,
      });
      expect(route).toBe('/auth-welcome');
    });
  });

  describe('Semantic Color System Compliance', () => {
    it('provides all mandatory semantic color tokens', () => {
      expect(colors.brandPrimary).toBe('#7E22CE');
      expect(colors.actionPrimary).toBe('#2563EB');
      expect(colors.success).toBe('#16A34A');
      expect(colors.pearlWhite).toBe('#F8FAFC');
      expect(colors.error).toBe('#DC2626');
      expect(colors.surface).toBeTruthy();
      expect(colors.border).toBeTruthy();
      expect(colors.textPrimary).toBeTruthy();
    });
  });
});
