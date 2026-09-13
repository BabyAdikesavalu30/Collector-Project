/**
 * Authentication Configuration
 * Explicit mode switch for development demo adapter vs future production backend.
 */

export const AUTH_CONFIG = {
  /**
   * 'demo' | 'backend'
   * In 'demo' mode, isolated development credentials (demo@vigyaan.app)
   * produce an authenticated local session for rapid frontend testing.
   * Can be configured via EXPO_PUBLIC_AUTH_MODE environment variable.
   */
  AUTH_MODE: ((typeof process !== 'undefined' && process.env?.EXPO_PUBLIC_AUTH_MODE) || 'demo') as 'demo' | 'backend',
  ENABLE_DEMO_AUTH: true,
} as const;
