/**
 * Bootstrap Domain Types
 */

import { SupportedLanguage } from '../../config/i18n';

export type BootstrapStatus =
  | 'idle'
  | 'initializing'
  | 'restoring'
  | 'ready'
  | 'slow'
  | 'error';

export interface BootstrapRestoredState {
  hasLaunchedBefore: boolean;
  language: SupportedLanguage | null;
  hasLanguageSelected: boolean;
  isOnboardingCompleted: boolean;
  isAuthenticated: boolean;
  isProfileCompleted: boolean;
}

export interface BootstrapResult {
  status: BootstrapStatus;
  initialRoute: string;
  restoredState: BootstrapRestoredState;
  errorMessage?: string;
}
