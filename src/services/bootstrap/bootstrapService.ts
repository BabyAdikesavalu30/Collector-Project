/**
 * Bootstrap Service
 * Executes pure initialization tasks (offline-safe, zero blocking network calls),
 * reads persisted startup preferences, and determines the initial destination route.
 * Strictly adheres to the 5-step Route Priority hierarchy:
 * 1. Fresh launch / Onboarding incomplete -> /welcome
 * 2. Language not selected -> /language
 * 3. Unauthenticated -> /auth-welcome
 * 4. Profile incomplete -> /profile-create
 * 5. Authenticated & Complete -> /home
 */

import { storage, STORAGE_KEYS } from '../../storage/asyncStorage';
import { SupportedLanguage } from '../../config/i18n';
import { SessionRepository } from '../../features/auth';
import { BootstrapResult, BootstrapRestoredState } from './types';

export class BootstrapService {
  /**
   * Initializes local state and resolves the destination route.
   */
  public static async execute(): Promise<BootstrapResult> {
    try {
      // 1. Read locally cached state in parallel for fast cold-start performance
      const [hasLaunched, savedLanguage, onboardingDone, authSession, profileComplete] =
        await Promise.all([
          storage.getItem<boolean>(STORAGE_KEYS.HAS_LAUNCHED_BEFORE, false),
          storage.getItem<SupportedLanguage>(STORAGE_KEYS.USER_LANGUAGE, null),
          storage.getItem<boolean>(STORAGE_KEYS.ONBOARDING_COMPLETED, false),
          SessionRepository.getSession(),
          storage.getItem<boolean>(STORAGE_KEYS.STUDENT_PROFILE_SETUP_COMPLETE, false),
        ]);

      const hasLanguageSelected = savedLanguage === 'en' || savedLanguage === 'ta';

      const restoredState: BootstrapRestoredState = {
        hasLaunchedBefore: Boolean(hasLaunched),
        language: hasLanguageSelected ? (savedLanguage as SupportedLanguage) : null,
        hasLanguageSelected,
        isOnboardingCompleted: Boolean(onboardingDone),
        isAuthenticated: Boolean(authSession && authSession.isAuthenticated),
        isProfileCompleted: Boolean(profileComplete),
      };

      // 2. Mark initial launch in storage
      if (!hasLaunched) {
        await storage.setItem(STORAGE_KEYS.HAS_LAUNCHED_BEFORE, true);
      }

      // 3. Resolve destination route cleanly according to locked priority
      const initialRoute = this.resolveInitialRoute(restoredState);

      return {
        status: 'ready',
        initialRoute,
        restoredState,
      };
    } catch (err) {
      console.error('[BOOTSTRAP] Initialization error:', err);
      return {
        status: 'error',
        initialRoute: '/welcome',
        restoredState: {
          hasLaunchedBefore: false,
          language: null,
          hasLanguageSelected: false,
          isOnboardingCompleted: false,
          isAuthenticated: false,
          isProfileCompleted: false,
        },
        errorMessage: "Vigyaan couldn't finish preparing the app.",
      };
    }
  }

  /**
   * Pure route resolver based on restored state hierarchy:
   * 1. If first launch OR onboarding not completed -> /welcome
   * 2. Else if language not selected -> /language
   * 3. Else if not authenticated -> /auth-welcome
   * 4. Else if profile not completed -> /profile-create
   * 5. Else (all prerequisites met) -> /home
   */
  public static resolveInitialRoute(state: BootstrapRestoredState): string {
    // 1. Fresh install OR onboarding incomplete
    if (!state.hasLaunchedBefore || !state.isOnboardingCompleted) {
      return '/welcome';
    }

    // 2. Language not explicitly chosen
    if (!state.hasLanguageSelected) {
      return '/language';
    }

    // 3. Unauthenticated session
    if (!state.isAuthenticated) {
      return '/auth-welcome';
    }

    // 4. Authenticated but profile setup incomplete
    if (!state.isProfileCompleted) {
      return '/profile-create';
    }

    // 5. Authenticated returning user with completed onboarding & profile
    return '/home';
  }

  /**
   * Development-only utility to completely clear all application state
   * and restore a clean fresh-install environment.
   */
  public static async resetDevelopmentState(): Promise<void> {
    await storage.clearAllDevelopmentState();
  }
}
