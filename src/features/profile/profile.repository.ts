/**
 * Profile Feature Repository Contract & Local Implementation
 * Abstracts profile retrieval, incremental updates, and setup completion.
 * UI components interact with this repository, allowing a future backend
 * adapter (GET/PUT /api/v1/profile) to replace the local implementation
 * without touching screen logic.
 */

import { storage, STORAGE_KEYS } from '../../storage/asyncStorage';
import { StoredProfile } from '../auth';

export interface IProfileRepository {
  /**
   * Retrieves the current student's stored academic profile.
   */
  getProfile(): Promise<StoredProfile | null>;

  /**
   * Persists or incrementally updates the student profile.
   */
  saveProfile(partialProfile: Partial<StoredProfile>): Promise<boolean>;

  /**
   * Checks whether the multi-step profile setup is marked completed.
   */
  isSetupComplete(): Promise<boolean>;

  /**
   * Sets the profile setup completion flag.
   */
  setSetupComplete(complete?: boolean): Promise<boolean>;
}

export class LocalProfileRepository implements IProfileRepository {
  async getProfile(): Promise<StoredProfile | null> {
    try {
      const data = await storage.getItem<StoredProfile>(STORAGE_KEYS.STUDENT_PROFILE, null);
      if (data && typeof data === 'object') {
        return data;
      }
      return null;
    } catch {
      return null;
    }
  }

  async saveProfile(partialProfile: Partial<StoredProfile>): Promise<boolean> {
    try {
      const existing = (await this.getProfile()) || {};
      const updated: StoredProfile = {
        ...existing,
        ...partialProfile,
      };
      return await storage.setItem(STORAGE_KEYS.STUDENT_PROFILE, updated);
    } catch {
      return false;
    }
  }

  async isSetupComplete(): Promise<boolean> {
    try {
      const complete = await storage.getItem<boolean>(
        STORAGE_KEYS.STUDENT_PROFILE_SETUP_COMPLETE,
        false
      );
      return Boolean(complete);
    } catch {
      return false;
    }
  }

  async setSetupComplete(complete: boolean = true): Promise<boolean> {
    try {
      return await storage.setItem(STORAGE_KEYS.STUDENT_PROFILE_SETUP_COMPLETE, complete);
    } catch {
      return false;
    }
  }
}

export const profileRepository: IProfileRepository = new LocalProfileRepository();
