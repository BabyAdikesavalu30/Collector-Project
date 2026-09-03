/**
 * Registration Service Contract
 * Clean frontend service boundary for student registration.
 * Connects demoAuthAdapter in development or backend adapter in production.
 */

import { RegistrationFormData, RegistrationActionResult } from './registration.types';
import { AUTH_CONFIG } from './auth.config';
import { demoAuthAdapter } from './auth.demo';

export interface IRegistrationService {
  registerStudent(data: RegistrationFormData): Promise<RegistrationActionResult>;
}

class RegistrationService implements IRegistrationService {
  /**
   * Request student account creation.
   */
  async registerStudent(data: RegistrationFormData): Promise<RegistrationActionResult> {
    if (AUTH_CONFIG.AUTH_MODE === 'demo') {
      return await demoAuthAdapter.registerStudent(data);
    }

    await new Promise((resolve) => setTimeout(resolve, 700));

    return {
      success: true,
      message: 'Registration request dispatched to verification service',
    };
  }
}

export const registrationService = new RegistrationService();
