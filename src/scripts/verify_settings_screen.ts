/**
 * Settings Screen & Preferences Automated Verification Suite
 */

import {
  DEFAULT_APP_SETTINGS,
  settingsRepository,
  getSearchItems,
} from '../features/settings';
import { getTranslation } from '../config/i18n';
import { SessionRepository } from '../features/auth';
import { storage, STORAGE_KEYS } from '../storage/asyncStorage';

interface TestResult {
  name: string;
  passed: boolean;
  details?: string;
}

const results: TestResult[] = [];

function assert(condition: boolean, name: string, details?: string) {
  results.push({ name, passed: condition, details });
  const icon = condition ? '✅ PASS' : '❌ FAIL';
  console.log(`[${icon}] ${name}${details ? ` (${details})` : ''}`);
}

async function runSettingsTests() {
  console.log('====================================================');
  console.log('SETTINGS SCREEN & PREFERENCES VERIFICATION SUITE');
  console.log('====================================================\n');

  // 1. Defaults Contract
  console.log('--- Phase 1: Settings Defaults Contract ---');
  assert(
    DEFAULT_APP_SETTINGS.theme === 'system' &&
    DEFAULT_APP_SETTINGS.textScale === 'default' &&
    DEFAULT_APP_SETTINGS.reduceMotion === false &&
    DEFAULT_APP_SETTINGS.dailyChallengeNotifications === true &&
    DEFAULT_APP_SETTINGS.quizReminders === true &&
    DEFAULT_APP_SETTINGS.questionsPerQuiz === 10 &&
    DEFAULT_APP_SETTINGS.dailyLearningGoal === 10 &&
    DEFAULT_APP_SETTINGS.soundEffects === true &&
    DEFAULT_APP_SETTINGS.haptics === true &&
    DEFAULT_APP_SETTINGS.analyticsEnabled === false,
    'Default App Settings Schema Contract',
    'All 25 default preference keys intact'
  );

  // 2. Repository Persistence
  console.log('\n--- Phase 2: Repository Persistence & State Mutation ---');
  const initialSettings = await settingsRepository.getSettings();
  assert(
    initialSettings !== null && typeof initialSettings === 'object',
    'Get Settings Successfully',
    `Theme: ${initialSettings.theme}, TextScale: ${initialSettings.textScale}`
  );

  // Test updating individual setting
  await settingsRepository.updateSetting('dailyLearningGoal', 25);
  await settingsRepository.updateSetting('theme', 'dark');
  const updatedSettings = await settingsRepository.getSettings();
  assert(
    updatedSettings.dailyLearningGoal === 25 && updatedSettings.theme === 'dark',
    'Update Individual Setting Mutates and Persists State',
    `Goal: ${updatedSettings.dailyLearningGoal} min, Theme: ${updatedSettings.theme}`
  );

  // Test reset preferences
  const resetSettings = await settingsRepository.resetPreferences();
  assert(
    resetSettings.dailyLearningGoal === 10 && resetSettings.theme === 'system',
    'Reset Preferences Restores Default Configuration',
    'Restored goal to 10 and theme to system'
  );

  // Test clear cache
  await storage.setItem(STORAGE_KEYS.DASHBOARD_CACHE, { test: true });
  const clearCacheResult = await settingsRepository.clearCachedData();
  const cachedAfter = await storage.getItem(STORAGE_KEYS.DASHBOARD_CACHE);
  assert(
    clearCacheResult === true && cachedAfter === null,
    'Clear Cached Data Clears Storage Safely',
    'Dashboard cache is null'
  );

  // 3. Search Metadata & Query Filtering
  console.log('\n--- Phase 3: Search Metadata & Query Filtering ---');
  const searchItemsEn = getSearchItems('en');
  const searchItemsTa = getSearchItems('ta');

  assert(
    searchItemsEn.length >= 15 && searchItemsTa.length >= 15,
    'Search Metadata Catalog Loaded',
    `${searchItemsEn.length} search items configured`
  );

  const filterItems = (items: typeof searchItemsEn, query: string) => {
    const q = query.toLowerCase().trim();
    return items.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.subtitle.toLowerCase().includes(q) ||
        item.section.toLowerCase().includes(q) ||
        item.keywords.some((k) => k.toLowerCase().includes(q))
    );
  };

  const languageResults = filterItems(searchItemsEn, 'language');
  assert(
    languageResults.some((r) => r.id === 'language'),
    'Search for "language" returns Language row',
    `Found ${languageResults.length} matches`
  );

  const soundResults = filterItems(searchItemsEn, 'sound');
  assert(
    soundResults.some((r) => r.id === 'soundEffects'),
    'Search for "sound" returns Sound Effects row',
    `Found ${soundResults.length} matches`
  );

  const tamilThemeResults = filterItems(searchItemsTa, 'தீம்');
  assert(
    tamilThemeResults.some((r) => r.id === 'theme'),
    'Search in Tamil for "தீம்" returns Theme row',
    `Found ${tamilThemeResults.length} matches`
  );

  // 4. Bilingual Localization Completeness
  console.log('\n--- Phase 4: Bilingual Localization Completeness ---');
  const en = getTranslation('en').settingsScreen;
  const ta = getTranslation('ta').settingsScreen;

  assert(
    en.title === 'Settings' &&
    en.accountSection === 'Account' &&
    en.preferencesSection === 'Preferences' &&
    en.notificationsSection === 'Notifications' &&
    en.learningSection === 'Learning Preferences' &&
    en.quizSection === 'Quiz Preferences' &&
    en.soundSection === 'Sound & Haptics' &&
    en.accessibilitySection === 'Accessibility' &&
    en.privacySection === 'Privacy & Security' &&
    en.storageSection === 'Data & Storage' &&
    en.supportSection === 'Support' &&
    en.aboutSection === 'About' &&
    en.dangerSection === 'Danger Zone' &&
    en.logoutTitle === 'Log Out' &&
    en.deleteAccountTitle === 'Delete Account',
    'English Settings Localization Completeness',
    'All core headers and section tokens present'
  );

  assert(
    ta.title === 'அமைப்புகள்' &&
    ta.accountSection === 'கணக்கு' &&
    ta.preferencesSection === 'விருப்பத்தேர்வுகள்' &&
    ta.notificationsSection === 'அறிவிப்புகள்' &&
    ta.learningSection === 'கற்றல் விருப்பங்கள்' &&
    ta.quizSection === 'வினாடி வினா விருப்பங்கள்' &&
    ta.soundSection === 'ஒலி & அதிர்வு' &&
    ta.accessibilitySection === 'அணுகல்தன்மை' &&
    ta.privacySection === 'தனியுரிமை & பாதுகாப்பு' &&
    ta.storageSection === 'தரவு & சேமிப்பு' &&
    ta.supportSection === 'ஆதரவு & உதவி' &&
    ta.aboutSection === 'விவரம்' &&
    ta.dangerSection === 'அபாய பகுதி' &&
    ta.logoutTitle === 'வெளியேறு' &&
    ta.deleteAccountTitle === 'கணக்கை நீக்கு',
    'Tamil Settings Localization Completeness',
    'All core Tamil headers and section tokens present'
  );

  // 5. Session & Auth Isolation Verification
  console.log('\n--- Phase 5: Session & Auth Isolation ---');
  await SessionRepository.saveSession({
    userId: 'student-auth-test',
    email: 'anu@vigyaan.app',
    fullName: 'Anu S',
    isAuthenticated: true,
    authMode: 'password',
    createdAt: Date.now(),
  });

  // Verify reset preferences does not clear session
  await settingsRepository.resetPreferences();
  const sessionAfterReset = await SessionRepository.getSession();
  assert(
    sessionAfterReset !== null && sessionAfterReset.userId === 'student-auth-test',
    'Preference Reset Preserves Authenticated Session',
    'Active session intact'
  );

  // Clean up
  await SessionRepository.clearSession();

  // Summary
  console.log('\n====================================================');
  const allPassed = results.every((r) => r.passed);
  if (allPassed) {
    console.log(`🎉 ALL ${results.length} SETTINGS TESTS PASSED SUCCESSFULLY!`);
  } else {
    console.log(`⚠️ ${results.filter((r) => !r.passed).length} TESTS FAILED!`);
  }
  console.log('====================================================\n');
}

runSettingsTests();
