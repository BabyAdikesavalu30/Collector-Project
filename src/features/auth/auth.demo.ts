/**
 * Development-Only Authentication Demo Adapter
 * Isolated mock authentication provider for frontend-only testing.
 *
 * DEVELOPMENT CREDENTIALS ONLY:
 * Email: demo@vigyaan.app
 * Password: VigyaanDemo@123
 * OTP: 123456
 */

import { storage, STORAGE_KEYS } from '../../storage/asyncStorage';
import { PasswordLoginPayload, OtpLoginPayload, AuthActionResult } from './auth.types';
import { OtpVerifyPayload, OtpResendPayload, OtpActionResult } from './otp.types';
import { RegistrationFormData, RegistrationActionResult } from './registration.types';
import { SessionRepository, AuthSession } from './auth.session';
import { settingsRepository } from '../../features/settings';

export const DEMO_CREDENTIALS = {
  EMAIL: 'demo@vigyaan.app',
  PASSWORD: 'VigyaanDemo@123',
  OTP: '123456',
} as const;

export const DEMO_DEFAULT_PROFILE = {
  fullName: 'Anu',
  grade: 'Grade 8',
  section: 'A',
  school: 'R.M.K. School',
  city: 'Thiruvallur',
  subjects: ['Physics', 'Chemistry', 'Biology'],
  points: 840,
  streak: 5,
  progress: 72,
};

// In-memory pending registration holder during OTP verification phase (passwords stripped)
export type PendingRegistration = Omit<RegistrationFormData, 'password' | 'confirmPassword'>;
const REGISTRATION_TTL_MS = 5 * 60 * 1000; // 5 minutes
let pendingRegistration: PendingRegistration | null = null;
let pendingRegistrationTimestamp: number = 0;

export const demoAuthAdapter = {
  /**
   * Direct Instant Demo Access (No password, no OTP)
   */
  async createDemoAccessSession(): Promise<AuthActionResult> {

    const session: AuthSession = {
      userId: 'usr_demo_direct',
      email: DEMO_CREDENTIALS.EMAIL,
      fullName: DEMO_DEFAULT_PROFILE.fullName,
      isAuthenticated: true,
      authMode: 'demo',
      createdAt: Date.now(),
    };

    await SessionRepository.saveSession(session);
    await storage.setItem(STORAGE_KEYS.STUDENT_PROFILE, DEMO_DEFAULT_PROFILE);
    await storage.setItem(STORAGE_KEYS.STUDENT_PROFILE_SETUP_COMPLETE, true);

    return {
      success: true,
      message: 'Demo access session activated',
    };
  },

  /**
   * Demo Password Sign In
   */
  async loginWithPassword(payload: PasswordLoginPayload): Promise<AuthActionResult> {

    // Simulate short network delay
    await new Promise((resolve) => setTimeout(resolve, 550));

    const normalizedId = payload.identifier.trim().toLowerCase();
    const isEmailMatch = normalizedId === DEMO_CREDENTIALS.EMAIL.toLowerCase();
    const isPasswordMatch = payload.password === DEMO_CREDENTIALS.PASSWORD;

    if (!isEmailMatch || !isPasswordMatch) {
      return {
        success: false,
        error: 'Invalid email or password. Please try again.',
      };
    }

    // Create and persist demo session
    const session: AuthSession = {
      userId: 'usr_demo_001',
      email: DEMO_CREDENTIALS.EMAIL,
      fullName: DEMO_DEFAULT_PROFILE.fullName,
      isAuthenticated: true,
      authMode: 'password',
      createdAt: Date.now(),
    };

    await SessionRepository.saveSession(session);

    // Ensure student profile is set in storage for Dashboard
    await storage.setItem(STORAGE_KEYS.STUDENT_PROFILE, DEMO_DEFAULT_PROFILE);
    await storage.setItem(STORAGE_KEYS.STUDENT_PROFILE_SETUP_COMPLETE, true);

    return {
      success: true,
      message: 'Demo sign in successful',
    };
  },

  /**
   * Demo OTP Request
   */
  async requestLoginOtp(payload: OtpLoginPayload): Promise<AuthActionResult> {
    await new Promise((resolve) => setTimeout(resolve, 450));

    return {
      success: true,
      message: 'Demo OTP dispatched (Use 123456)',
    };
  },

  /**
   * Demo OTP Verification (for both login and registration contexts)
   */
  async verifyOtp(payload: OtpVerifyPayload): Promise<OtpActionResult> {
    await new Promise((resolve) => setTimeout(resolve, 500));

    if (payload.code !== DEMO_CREDENTIALS.OTP) {
      return {
        success: false,
        error: "That code isn't correct. Check the code and try again.",
      };
    }


    // Handle Registration context
    if (payload.context === 'register' && pendingRegistration) {
      // Check if pending registration has expired
      if (Date.now() - pendingRegistrationTimestamp > REGISTRATION_TTL_MS) {
        pendingRegistration = null;
        return {
          success: false,
          error: 'Registration session expired. Please register again.',
        };
      }
      const studentProfile = {
        fullName: pendingRegistration.fullName.trim(),
        grade: pendingRegistration.grade,
        section: pendingRegistration.section,
        school: pendingRegistration.school.trim(),
        city: pendingRegistration.city?.trim() || 'Thiruvallur',
        subjects: ['Physics', 'Chemistry', 'Biology'],
        points: 100,
        streak: 1,
        progress: 10,
      };

      await storage.setItem(STORAGE_KEYS.STUDENT_PROFILE, studentProfile);

      const session: AuthSession = {
        userId: `usr_reg_${Date.now()}`,
        email: pendingRegistration.email,
        mobileNumber: pendingRegistration.mobile,
        fullName: pendingRegistration.fullName,
        isAuthenticated: true,
        authMode: 'register',
        createdAt: Date.now(),
      };

      await SessionRepository.saveSession(session);
      pendingRegistration = null;

      return {
        success: true,
        message: 'Account verified and session created',
      };
    }

    // Handle Login context
    const session: AuthSession = {
      userId: 'usr_demo_001',
      email: payload.identifier.includes('@') ? payload.identifier : DEMO_CREDENTIALS.EMAIL,
      mobileNumber: !payload.identifier.includes('@') ? payload.identifier : undefined,
      fullName: DEMO_DEFAULT_PROFILE.fullName,
      isAuthenticated: true,
      authMode: 'otp',
      createdAt: Date.now(),
    };

    await SessionRepository.saveSession(session);
    await storage.setItem(STORAGE_KEYS.STUDENT_PROFILE, DEMO_DEFAULT_PROFILE);
    await storage.setItem(STORAGE_KEYS.STUDENT_PROFILE_SETUP_COMPLETE, true);

    return {
      success: true,
      message: 'OTP verified and session created',
    };
  },

  /**
   * Demo OTP Resend
   */
  async resendOtp(payload: OtpResendPayload): Promise<OtpActionResult> {
    await new Promise((resolve) => setTimeout(resolve, 400));

    return {
      success: true,
      message: 'New demo OTP dispatched (Use 123456)',
      expiresAt: Date.now() + 5 * 60 * 1000,
    };
  },

  /**
   * Demo Student Registration
   */
  async registerStudent(data: RegistrationFormData): Promise<RegistrationActionResult> {
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Stash pending registration for creation upon OTP verification,
    // explicitly dropping sensitive credentials so passwords are never retained in memory.
    const { password: _pw, confirmPassword: _cpw, ...safeData } = data;
    pendingRegistration = safeData;
    pendingRegistrationTimestamp = Date.now();

    return {
      success: true,
      message: 'Registration staged for OTP verification',
    };
  },

  /**
   * Safe Reset of Demo State (Full Fresh-Install Reset)
   */
  async resetDemoData(): Promise<boolean> {
    await SessionRepository.clearSession();
    await storage.clearAllDevelopmentState();
    settingsRepository.clearCache();
    pendingRegistration = null;
    pendingRegistrationTimestamp = 0;
    return true;
  },
};
