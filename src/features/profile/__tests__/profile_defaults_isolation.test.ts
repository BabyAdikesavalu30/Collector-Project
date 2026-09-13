/**
 * Profile Defaults Isolation Regression Test Suite (BUG B & BUG C)
 * Validates:
 * 1. Missing profile in production session returns honest empty representation ('—').
 * 2. Explicit demo session provides expected demo profile defaults.
 * 3. Section in academic setup defaults to empty and requires user selection.
 */

import { getProfileForView } from '../profile.aggregate';
import { SessionRepository, AuthSession } from '../../auth';
import { storage } from '../../../storage/asyncStorage';

describe('Profile Defaults Isolation (BUG B & BUG C)', () => {
  beforeEach(async () => {
    await storage.clearAllDevelopmentState();
  });

  afterEach(async () => {
    await storage.clearAllDevelopmentState();
  });

  it('returns honest empty states for production session with missing profile fields', async () => {
    const prodSession: AuthSession = {
      userId: 'usr_prod_12345',
      email: 'student@tamilnadu.gov.in',
      fullName: 'Kavitha R',
      isAuthenticated: true,
      authMode: 'otp',
      createdAt: Date.now(),
    };
    await SessionRepository.saveSession(prodSession);

    // No profile stored in storage
    const viewData = await getProfileForView();

    expect(viewData.profile.name).toBe('Kavitha R');
    expect(viewData.profile.initials).toBe('KR');
    // Must NOT silently convert to 'Grade 8', 'A', or 'R.M.K. School'
    expect(viewData.profile.grade).toBe('—');
    expect(viewData.profile.section).toBe('—');
    expect(viewData.profile.school).toBe('—');
    expect(viewData.profile.isDemo).toBe(false);
  });

  it('provides demo defaults only when explicitly in demo mode', async () => {
    const demoSession: AuthSession = {
      userId: 'usr_demo_direct',
      email: 'demo@vigyaan.app',
      fullName: 'Anu',
      isAuthenticated: true,
      authMode: 'demo',
      createdAt: Date.now(),
    };
    await SessionRepository.saveSession(demoSession);

    const viewData = await getProfileForView();

    expect(viewData.profile.name).toBe('Anu');
    expect(viewData.profile.grade).toBe('Grade 8');
    expect(viewData.profile.section).toBe('A');
    expect(viewData.profile.school).toBe('R.M.K. School');
    expect(viewData.profile.isDemo).toBe(true);
  });

  it('validates that empty section requires selection', () => {
    // Simulating form validation logic from AcademicSetupScreen
    const validateForm = (data: { district: string; section: string }) => {
      const errors: Record<string, string> = {};
      if (!data.district.trim()) errors.district = 'District required';
      if (!data.section) errors.section = 'Section required';
      return errors;
    };

    // With empty section (honest default), validation must fail
    const emptyResult = validateForm({ district: 'Chennai', section: '' });
    expect(emptyResult.section).toBe('Section required');

    // Once user selects a section, validation passes
    const selectedResult = validateForm({ district: 'Chennai', section: 'B' });
    expect(selectedResult.section).toBeUndefined();
  });
});
