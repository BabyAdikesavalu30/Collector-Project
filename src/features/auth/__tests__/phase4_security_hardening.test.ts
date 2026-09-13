/**
 * Phase 4: Auth, Storage, Security & Session Hardening Test Suite
 * Validates session integrity, password non-retention, comprehensive logout cleanup,
 * defensive storage parsing, input bounds, and XP ledger sanitization.
 */

import { storage, STORAGE_KEYS } from '../../../storage/asyncStorage';
import { SessionRepository, AuthSession } from '../auth.session';
import { authService } from '../auth.service';
import { demoAuthAdapter, DEMO_CREDENTIALS } from '../auth.demo';
import { validateIdentifier, validatePassword } from '../auth.validation';
import { validateRegistrationForm } from '../registration.validation';
import { getXpTransactions, recordXp } from '../../xp/xp.storage';

describe('Phase 4: Auth, Storage & Security Hardening', () => {
  beforeEach(async () => {
    storage.invalidateCache();
    await storage.clearAllDevelopmentState();
  });

  // ==========================================================================
  // 1. SESSION REPOSITORY & DATA STRUCTURE INTEGRITY
  // ==========================================================================
  describe('1. Session Source of Truth & Structural Validation', () => {
    it('validates a complete, authentic AuthSession object', () => {
      const validSession: AuthSession = {
        userId: 'usr_real_001',
        email: 'student@example.com',
        fullName: 'Kavitha S',
        isAuthenticated: true,
        authMode: 'password',
        createdAt: Date.now(),
      };

      expect(SessionRepository.isValidSession(validSession)).toBe(true);
    });

    it('rejects invalid or corrupted session structures', () => {
      expect(SessionRepository.isValidSession(null)).toBe(false);
      expect(SessionRepository.isValidSession({})).toBe(false);
      expect(SessionRepository.isValidSession({ userId: '' })).toBe(false);
      expect(SessionRepository.isValidSession({ userId: '123', isAuthenticated: false })).toBe(false);
      expect(SessionRepository.isValidSession({ userId: '123', isAuthenticated: true, authMode: 'fake' as any })).toBe(false);
      expect(SessionRepository.isValidSession({ userId: '123', isAuthenticated: true, authMode: 'password' })).toBe(false); // missing createdAt
    });

    it('saves and deterministically restores valid session', async () => {
      const session: AuthSession = {
        userId: 'usr_student_101',
        isAuthenticated: true,
        authMode: 'otp',
        createdAt: Date.now(),
      };

      await SessionRepository.saveSession(session);
      const restored = await SessionRepository.getSession();

      expect(restored).not.toBeNull();
      expect(restored?.userId).toBe('usr_student_101');
      expect(restored?.isAuthenticated).toBe(true);
      expect(restored?.authMode).toBe('otp');
    });

    it('recovers gracefully from corrupted session data in storage', async () => {
      await storage.setItem(STORAGE_KEYS.AUTH_SESSION, { corrupt: true });
      const restored = await SessionRepository.getSession();

      expect(restored).toBeNull();
      // Should have purged the corrupt entry
      const rawAfter = await storage.getItem(STORAGE_KEYS.AUTH_SESSION);
      expect(rawAfter).toBeNull();
    });
  });

  // ==========================================================================
  // 2. PASSWORD NON-RETENTION IN PENDING REGISTRATION
  // ==========================================================================
  describe('2. Credential Security & Password Non-Retention', () => {
    it('strips password and confirmPassword from staged registration memory', async () => {
      const sensitiveRegistration = {
        fullName: 'Suresh Kumar',
        mobile: '9876543210',
        email: 'suresh@school.edu',
        grade: 'Grade 9',
        section: 'B',
        school: 'Govt Higher Secondary',
        city: 'Salem',
        password: 'TopSecretPassword@123',
        confirmPassword: 'TopSecretPassword@123',
        acceptedTerms: true,
      };

      const result = await demoAuthAdapter.registerStudent(sensitiveRegistration);
      expect(result.success).toBe(true);

      // Verify OTP and check resulting session and profile
      const otpResult = await demoAuthAdapter.verifyOtp({
        context: 'register',
        identifier: sensitiveRegistration.email,
        code: DEMO_CREDENTIALS.OTP,
      });

      expect(otpResult.success).toBe(true);

      // Stored profile must NOT contain passwords
      const profile = await storage.getItem<any>(STORAGE_KEYS.STUDENT_PROFILE);
      expect(profile).toBeDefined();
      expect(profile.password).toBeUndefined();
      expect(profile.confirmPassword).toBeUndefined();

      // Session must NOT contain passwords
      const session = await SessionRepository.getSession();
      expect(session).toBeDefined();
      expect((session as any)?.password).toBeUndefined();
    });
  });

  // ==========================================================================
  // 3. COMPREHENSIVE LOGOUT & DATA ISOLATION
  // ==========================================================================
  describe('3. Deterministic Logout & User Data Isolation', () => {
    it('purges all user-specific stores on logout while preserving device preferences', async () => {
      // 1. Establish mock user-specific state
      await storage.setItem(STORAGE_KEYS.USER_LANGUAGE, 'ta');
      await storage.setItem(STORAGE_KEYS.ONBOARDING_COMPLETED, true);
      await storage.setItem(STORAGE_KEYS.HAS_LAUNCHED_BEFORE, true);

      await SessionRepository.saveSession({
        userId: 'usr_user_a',
        isAuthenticated: true,
        authMode: 'password',
        createdAt: Date.now(),
      });
      await storage.setItem(STORAGE_KEYS.STUDENT_PROFILE, { fullName: 'User A', points: 500 });
      await storage.setItem(STORAGE_KEYS.MICRO_LESSONS_BOOKMARKS, ['lesson-1', 'lesson-2']);
      await storage.setItem(STORAGE_KEYS.GAMES_FAVORITES, ['orbit', 'tango']);
      await storage.setItem(STORAGE_KEYS.GAMES_BADGES, ['speed_demon']);
      await storage.setItem(STORAGE_KEYS.NOTIFICATION_INBOX, [{ id: 'notif-1' }]);
      await storage.setItem(STORAGE_KEYS.COLLECTIONS_PROGRESS, { count: 3 });

      // 2. Perform Logout
      const loggedOut = await authService.logout();
      expect(loggedOut).toBe(true);

      // 3. Verify user session and student stores are completely deleted
      expect(await SessionRepository.getSession()).toBeNull();
      expect(await storage.getItem(STORAGE_KEYS.STUDENT_PROFILE)).toBeNull();
      expect(await storage.getItem(STORAGE_KEYS.MICRO_LESSONS_BOOKMARKS)).toBeNull();
      expect(await storage.getItem(STORAGE_KEYS.GAMES_FAVORITES)).toBeNull();
      expect(await storage.getItem(STORAGE_KEYS.GAMES_BADGES)).toBeNull();
      expect(await storage.getItem(STORAGE_KEYS.NOTIFICATION_INBOX)).toBeNull();
      expect(await storage.getItem(STORAGE_KEYS.COLLECTIONS_PROGRESS)).toBeNull();

      // 4. Verify device-level preferences are preserved
      expect(await storage.getItem(STORAGE_KEYS.USER_LANGUAGE)).toBe('ta');
      expect(await storage.getItem(STORAGE_KEYS.ONBOARDING_COMPLETED)).toBe(true);
      expect(await storage.getItem(STORAGE_KEYS.HAS_LAUNCHED_BEFORE)).toBe(true);
    });

    it('isolates Demo Login from normal user sessions', async () => {
      // Login as Demo
      const demoResult = await authService.loginAsDemo();
      expect(demoResult.success).toBe(true);

      const demoSession = await SessionRepository.getSession();
      expect(demoSession?.userId).toBe('usr_demo_direct');
      expect(demoSession?.authMode).toBe('demo');

      // Logout
      await authService.logout();
      expect(await SessionRepository.getSession()).toBeNull();

      // Simulate a regular user registering
      await demoAuthAdapter.registerStudent({
        fullName: 'Real Student',
        mobile: '9123456780',
        email: 'real@student.in',
        grade: 'Grade 10',
        section: 'C',
        school: 'Kendriya Vidyalaya',
        password: 'Password@123',
        confirmPassword: 'Password@123',
        acceptedTerms: true,
      });

      await demoAuthAdapter.verifyOtp({
        context: 'register',
        identifier: 'real@student.in',
        code: DEMO_CREDENTIALS.OTP,
      });

      const normalSession = await SessionRepository.getSession();
      expect(normalSession?.userId).not.toBe('usr_demo_direct');
      expect(normalSession?.authMode).toBe('register');
      expect(normalSession?.email).toBe('real@student.in');
    });
  });

  // ==========================================================================
  // 4. DEFENSIVE STORAGE PARSING & CORRUPT RECOVERY
  // ==========================================================================
  describe('4. Storage Resilience & Type Fallbacks', () => {
    it('falls back to defaultValue when storage item is null or missing', async () => {
      const result = await storage.getItem('non_existent_key' as any, { fallback: true });
      expect(result).toEqual({ fallback: true });
    });

    it('falls back to defaultValue when storage item contains literal null string', async () => {
      await storage.setItem(STORAGE_KEYS.DASHBOARD_CACHE, null);
      const result = await storage.getItem(STORAGE_KEYS.DASHBOARD_CACHE, { defaultItem: true });
      expect(result).toEqual({ defaultItem: true });
    });
  });

  // ==========================================================================
  // 5. XP LEDGER SANITIZATION (NaN, Infinity, Negative Prevention)
  // ==========================================================================
  describe('5. XP Transaction Validation', () => {
    it('accepts valid non-negative numeric XP amounts', async () => {
      const tx = await recordXp({
        source: 'quiz_completion',
        amount: 50,
        description: 'Completed Quiz',
        descriptionTa: 'வினாடி வினா முடிந்தது',
      });

      expect(tx).not.toBeNull();
      expect(tx?.amount).toBe(50);

      const transactions = await getXpTransactions();
      expect(transactions.length).toBeGreaterThanOrEqual(1);
    });

    it('rejects corrupt transactions with NaN or negative amounts', async () => {
      // Inject corrupt transactions directly into storage
      await storage.setItem(STORAGE_KEYS.XP_TRANSACTIONS, [
        { id: 'tx-1', amount: 50, timestamp: Date.now(), source: 'quiz_completion' },
        { id: 'tx-corrupt-nan', amount: NaN, timestamp: Date.now(), source: 'quiz_completion' },
        { id: 'tx-corrupt-neg', amount: -100, timestamp: Date.now(), source: 'quiz_completion' },
        { id: 'tx-corrupt-inf', amount: Infinity, timestamp: Date.now(), source: 'quiz_completion' },
      ]);

      const sanitized = await getXpTransactions();
      expect(sanitized.length).toBe(1);
      expect(sanitized[0].id).toBe('tx-1');
      expect(sanitized[0].amount).toBe(50);
    });
  });

  // ==========================================================================
  // 6. FORM VALIDATION BOUNDS & LENGTH LIMITS
  // ==========================================================================
  describe('6. Input Validation & Maximum Length Boundaries', () => {
    it('rejects identifier exceeding 100 characters', () => {
      const longIdentifier = 'a'.repeat(90) + '@example.com';
      expect(validateIdentifier(longIdentifier, 'en')).toBeDefined();
    });

    it('rejects password exceeding 128 characters', () => {
      const longPassword = 'p'.repeat(129);
      expect(validatePassword(longPassword, 'en')).toBeDefined();
    });

    it('rejects full name exceeding 100 characters in registration form', () => {
      const form = {
        fullName: 'x'.repeat(101),
        mobile: '9876543210',
        email: 'test@example.com',
        grade: 'Grade 8',
        section: 'A',
        school: 'Valid School',
        password: 'Password@123',
        confirmPassword: 'Password@123',
        acceptedTerms: true,
      };

      const result = validateRegistrationForm(form, 'en');
      expect(result.isValid).toBe(false);
      expect(result.errors.fullName).toBeDefined();
    });

    it('rejects school name exceeding 150 characters in registration form', () => {
      const form = {
        fullName: 'Valid Name',
        mobile: '9876543210',
        email: 'test@example.com',
        grade: 'Grade 8',
        section: 'A',
        school: 's'.repeat(151),
        password: 'Password@123',
        confirmPassword: 'Password@123',
        acceptedTerms: true,
      };

      const result = validateRegistrationForm(form, 'en');
      expect(result.isValid).toBe(false);
      expect(result.errors.school).toBeDefined();
    });
  });
});
