/**
 * Automated Verification Suite for Global Navigation & Authenticated App Shell
 * Tests:
 * 1. Canonical 4-Tab Route Configuration
 * 2. Active Parent Tab Mapping for all Main App and Child Routes
 * 3. Navigation Visibility Evaluation (Visible vs Hidden screens)
 * 4. Bilingual Localization for Navigation Bar (English and Tamil)
 * 5. Tab Config Integrity (Colors, Keys, Routes)
 */

import {
  APP_TAB_ROUTES,
  TAB_CONFIGS,
  getActiveTab,
  isNavVisible,
  normalizePathname,
} from '../components/navigation/navigation.config';
import { getTranslation } from '../config/i18n';

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;

function assert(condition: boolean, testName: string) {
  totalTests++;
  if (condition) {
    passedTests++;
    console.log(`  ✓ ${testName}`);
  } else {
    failedTests++;
    console.error(`  ✕ FAILED: ${testName}`);
  }
}

console.log('========================================================');
console.log('🚀 RUNNING GLOBAL NAVIGATION APP SHELL VERIFICATION');
console.log('========================================================\n');

// 1. Canonical 4-Tab Configuration
console.log('--- 1. Canonical 4-Tab Configuration ---');
assert(APP_TAB_ROUTES.home === '/home', 'Home tab routes to /home');
assert(APP_TAB_ROUTES.learn === '/learn', 'Learn tab routes to /learn');
assert(APP_TAB_ROUTES.games === '/games', 'Games tab routes to /games');
assert(APP_TAB_ROUTES.profile === '/profile', 'Profile tab routes to /profile');

assert(TAB_CONFIGS.length === 4, 'Exactly 4 tab configurations exist');
TAB_CONFIGS.forEach((config) => {
  assert(Boolean(config.id && config.route && config.bgColor && config.iconColor), `Tab ${config.id} has complete visual tokens`);
});

// 2. Active Tab Resolution on Child Routes
console.log('\n--- 2. Active Tab Mapping on Main & Child Routes ---');

const expectedTabMappings: [string, string][] = [
  // Home
  ['/home', 'home'],
  ['/notifications', 'home'],

  // Learn
  ['/learn', 'learn'],
  ['/quiz-setup', 'learn'],
  ['/quiz-result', 'learn'],
  ['/quiz-review', 'learn'],
  ['/progress', 'learn'],
  ['/quizzes', 'learn'],

  // Games
  ['/games', 'games'],
  ['/games/', 'games'],
  ['/riddles', 'games'],
  ['/riddle-quiz', 'games'],
  ['/riddle-result', 'games'],
  ['/fun-facts', 'games'],
  ['/spin-wheel', 'games'],
  ['/escape-room', 'games'],
  ['/challenges', 'games'],

  // Profile
  ['/profile', 'profile'],
  ['/settings', 'profile'],
  ['/achievements', 'profile'],
  ['/certificates', 'profile'],
  ['/about', 'profile'],
  ['/account-security', 'profile'],
  ['/delete-account', 'profile'],
  ['/faq', 'profile'],
  ['/feedback', 'profile'],
  ['/guidelines', 'profile'],
  ['/help', 'profile'],
  ['/licenses', 'profile'],
  ['/privacy', 'profile'],
  ['/report-problem', 'profile'],
  ['/terms', 'profile'],
];

expectedTabMappings.forEach(([route, expectedTab]) => {
  const resolved = getActiveTab(route);
  assert(resolved === expectedTab, `Route ${route} resolves to active tab "${expectedTab}" (got "${resolved}")`);
});

// 3. Navigation Visibility Matrix
console.log('\n--- 3. Navigation Visibility Matrix (Visible vs Hidden) ---');

const visibleRoutes = [
  '/home',
  '/learn',
  '/games',
  '/profile',
  '/riddles',
  '/riddle-quiz',
  '/riddle-result',
  '/fun-facts',
  '/spin-wheel',
  '/quiz-setup',
  '/quiz-result',
  '/quiz-review',
  '/notifications',
  '/settings',
  '/progress',
  '/certificates',
  '/achievements',
  '/about',
  '/faq',
  '/help',
  '/feedback',
  '/privacy',
  '/terms',
];

visibleRoutes.forEach((route) => {
  assert(isNavVisible(route) === true, `Bottom nav is VISIBLE on ${route}`);
});

const hiddenRoutes = [
  '/',
  '/index',
  '/welcome',
  '/onboarding',
  '/onboarding-grow',
  '/onboarding-achieve',
  '/onboarding-learn',
  '/language',
  '/auth-welcome',
  '/login',
  '/register',
  '/otp',
  '/forgot-password',
  '/reset-password',
  '/profile-create',
  '/profile-academic',
  '/profile-complete',
  '/profile-setup',
  '/quiz', // Active timed quiz session
  '/games/zip',
  '/games/wend',
  '/games/patches',
  '/games/mini-sudoku',
  '/games/tango',
  '/games/queens',
  '/games/element-match',
  '/games/molecule-builder',
  '/games/circuit-lab',
  '/games/orbit',
  '/games/dna-sequence',
];

hiddenRoutes.forEach((route) => {
  assert(isNavVisible(route) === false, `Bottom nav is HIDDEN on ${route}`);
});

// 4. Pathname Normalization
console.log('\n--- 4. Pathname Normalization ---');
assert(normalizePathname('/home?refresh=true') === '/home', 'Query parameters stripped');
assert(normalizePathname('/learn#section1') === '/learn', 'Hash anchor stripped');
assert(normalizePathname('/games/') === '/games', 'Trailing slash stripped');
assert(normalizePathname(null) === '/', 'Null path safely normalized');

// 5. Bilingual Localization Integrity
console.log('\n--- 5. Bilingual Localization for Navigation Bar ---');
const enNav = getTranslation('en').home.nav;
const taNav = getTranslation('ta').home.nav;

assert(Boolean(enNav.home && taNav.home), `Home label translated (en: "${enNav.home}", ta: "${taNav.home}")`);
assert(Boolean(enNav.learn && taNav.learn), `Learn label translated (en: "${enNav.learn}", ta: "${taNav.learn}")`);
assert(Boolean(enNav.games && taNav.games), `Games label translated (en: "${enNav.games}", ta: "${taNav.games}")`);
assert(Boolean(enNav.profile && taNav.profile), `Profile label translated (en: "${enNav.profile}", ta: "${taNav.profile}")`);

console.log('\n========================================================');
console.log(`📊 SUMMARY: ${passedTests} / ${totalTests} tests passed (${failedTests} failed)`);
console.log('========================================================\n');

if (failedTests > 0) {
  process.exit(1);
} else {
  console.log('🎉 ALL TESTS PASSED SUCCESSFULLY!');
}
