/**
 * Unit Verification Test Suite for Screen 01 (Bootstrap, Config, i18n, Theme)
 */

import { BootstrapService } from '../bootstrapService';
import { institutionConfig } from '../../../config/institution';
import { getTranslation } from '../../../config/i18n';
import { theme } from '../../../theme';

describe('Screen 01 - Production Splash & Bootstrap Verification', () => {
  describe('Institution Configuration', () => {
    it('contains valid R.M.K. Engineering College and IT Department metadata', () => {
      expect(institutionConfig.name.en).toBe('R.M.K. ENGINEERING COLLEGE');
      expect(institutionConfig.department.en).toBe('Department of Information Technology');
      expect(institutionConfig.app.name).toBe('VIGYAAN');
      expect(institutionConfig.app.tamilName).toBe('விஞ்ஞான்');
      expect(institutionConfig.app.tagline.en).toBe('Science Learning for Young Achievers');
      expect(institutionConfig.app.tagline.ta).toBe('இளம் சாதனையாளர்களுக்கான அறிவியல் கற்றல்');
      expect(institutionConfig.languages.supported).toContain('en');
      expect(institutionConfig.languages.supported).toContain('ta');
    });
  });

  describe('Localization (i18n)', () => {
    it('provides complete translations for English and Tamil without missing keys', () => {
      const en = getTranslation('en');
      const ta = getTranslation('ta');

      expect(en.splash.appName).toBe('VIGYAAN');
      expect(ta.splash.appName).toBe('விஞ்ஞான்');
      expect(en.splash.errorMessage).toBe("Vigyaan couldn't finish preparing the app.");
      expect(ta.splash.errorMessage).toBe('செயலியைத் தயார்படுத்துவதில் சிக்கல் ஏற்பட்டது.');
      expect(en.splash.retryButton).toBe('Try Again');
      expect(ta.splash.retryButton).toBe('மீண்டும் முயற்சிக்கவும்');
    });
  });

  describe('Route Resolver', () => {
    it('resolves /welcome for fresh install (not launched before)', () => {
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

    it('resolves /welcome when launched before but onboarding is not completed', () => {
      const route = BootstrapService.resolveInitialRoute({
        hasLaunchedBefore: true,
        language: null,
        hasLanguageSelected: false,
        isOnboardingCompleted: false,
        isAuthenticated: false,
        isProfileCompleted: false,
      });
      expect(route).toBe('/welcome');
    });

    it('resolves /language when onboarding completed but language not chosen', () => {
      const route = BootstrapService.resolveInitialRoute({
        hasLaunchedBefore: true,
        language: null,
        hasLanguageSelected: false,
        isOnboardingCompleted: true,
        isAuthenticated: false,
        isProfileCompleted: false,
      });
      expect(route).toBe('/language');
    });

    it('resolves /auth-welcome when onboarding & language chosen but unauthenticated', () => {
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

    it('resolves /profile-create when authenticated but profile not complete', () => {
      const route = BootstrapService.resolveInitialRoute({
        hasLaunchedBefore: true,
        language: 'en',
        hasLanguageSelected: true,
        isOnboardingCompleted: true,
        isAuthenticated: true,
        isProfileCompleted: false,
      });
      expect(route).toBe('/profile-create');
    });

    it('resolves /home for authenticated user with all requirements complete', () => {
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
  });

  describe('Theme Tokens', () => {
    it('provides semantic color tokens without missing references', () => {
      expect(theme.colors.pearlWhite).toBe('#F8FAFC');
      expect(theme.colors.actionPrimary).toBe('#2563EB');
      expect(theme.colors.brandPrimary).toBe('#7E22CE');
      expect(theme.colors.navy900).toBe('#0F172A');
    });
  });
});
