/**
 * Authentication Session Repository
 * Manages persisted demo/production user session in local storage.
 * Strictly avoids persisting passwords, OTPs, or plain secrets.
 */

import { storage, STORAGE_KEYS } from '../../storage/asyncStorage';

export interface AuthSession {
  userId: string;
  email?: string;
  mobileNumber?: string;
  fullName?: string;
  isAuthenticated: boolean;
  authMode: 'password' | 'otp' | 'register' | 'demo';
  createdAt: number;
}

export class SessionRepository {
  /**
   * Validate session structure against corrupted data.
   */
  public static isValidSession(data: unknown): data is AuthSession {
    if (!data || typeof data !== 'object') return false;
    const session = data as Partial<AuthSession>;
    return (
      typeof session.userId === 'string' &&
      session.userId.length > 0 &&
      session.isAuthenticated === true &&
      (session.authMode === 'password' ||
        session.authMode === 'otp' ||
        session.authMode === 'register' ||
        session.authMode === 'demo') &&
      typeof session.createdAt === 'number'
    );
  }

  /**
   * Persist active authenticated session.
   */
  public static async saveSession(session: AuthSession): Promise<boolean> {
    try {
      return await storage.setItem(STORAGE_KEYS.AUTH_SESSION, session);
    } catch {
      return false;
    }
  }

  /**
   * Retrieve and validate stored session.
   */
  public static async getSession(): Promise<AuthSession | null> {
    try {
      const raw = await storage.getItem<unknown>(STORAGE_KEYS.AUTH_SESSION, null);
      if (!raw) return null;

      if (this.isValidSession(raw)) {
        return raw;
      }

      // Corrupted session -> clear safely
      console.warn('[SESSION_REPOSITORY] Corrupted session detected, clearing');
      await this.clearSession();
      return null;
    } catch {
      return null;
    }
  }

  /**
   * Clear active session (Logout).
   */
  public static async clearSession(): Promise<boolean> {
    try {
      return await storage.removeItem(STORAGE_KEYS.AUTH_SESSION);
    } catch {
      return false;
    }
  }
}
