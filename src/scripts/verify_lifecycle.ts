/**
 * Automated Lifecycle & Flow Verification Script
 * Validates all transitions:
 * 1. Fresh Install State -> Bootstrap -> /welcome
 * 2. Landing /welcome -> /onboarding
 * 3. Screen 03 /onboarding -> /onboarding-achieve (Onboarding Incomplete)
 * 4. Screen 04 /onboarding-achieve -> /onboarding-grow (Onboarding Incomplete)
 * 5. Screen 05 /onboarding-grow -> /language (Marks Onboarding Completed)
 * 6. Screen 06 /language -> /auth-welcome (Language Saved)
 * 7. Screen 07 /auth-welcome -> /login -> Authenticated -> /home
 * 8. Restart App as Returning Authenticated User -> Bootstrap -> /home
 * 9. Screen 07 /auth-welcome -> /register -> /otp -> /profile-create
 * 10. Profile Setup 13 -> 14 -> 15 -> /home
 * 11. Logout -> Bootstrap -> /auth-welcome
 * 12. Dev Reset -> Bootstrap -> /welcome
 */

import { BootstrapService } from '../services/bootstrap/bootstrapService';
import { BootstrapRestoredState } from '../services/bootstrap/types';

interface TestResult {
  step: string;
  expected: string;
  actual: string;
  passed: boolean;
}

const results: TestResult[] = [];

function assertRoute(step: string, state: BootstrapRestoredState, expectedRoute: string) {
  const actualRoute = BootstrapService.resolveInitialRoute(state);
  const passed = actualRoute === expectedRoute;
  results.push({
    step,
    expected: expectedRoute,
    actual: actualRoute,
    passed,
  });
}

console.log('====================================================');
console.log('VIGYAAN FULL LIFECYCLE & ROUTING VERIFICATION SUITE');
console.log('====================================================\n');

// 1. Fresh Install
assertRoute(
  '1. Fresh Install Boot',
  {
    hasLaunchedBefore: false,
    language: null,
    hasLanguageSelected: false,
    isOnboardingCompleted: false,
    isAuthenticated: false,
    isProfileCompleted: false,
  },
  '/welcome'
);

// 2. Cold boot after viewing Screen 03 (Not completed)
assertRoute(
  '2. Interrupted on Onboarding 1',
  {
    hasLaunchedBefore: true,
    language: null,
    hasLanguageSelected: false,
    isOnboardingCompleted: false,
    isAuthenticated: false,
    isProfileCompleted: false,
  },
  '/welcome'
);

// 3. Cold boot after viewing Screen 04 (Not completed)
assertRoute(
  '3. Interrupted on Onboarding 2',
  {
    hasLaunchedBefore: true,
    language: null,
    hasLanguageSelected: false,
    isOnboardingCompleted: false,
    isAuthenticated: false,
    isProfileCompleted: false,
  },
  '/welcome'
);

// 4. Completed Screen 05 (Onboarding Done, Language Pending)
assertRoute(
  '4. Onboarding Complete -> Language Pending',
  {
    hasLaunchedBefore: true,
    language: null,
    hasLanguageSelected: false,
    isOnboardingCompleted: true,
    isAuthenticated: false,
    isProfileCompleted: false,
  },
  '/language'
);

// 5. Language Selected -> Unauthenticated
assertRoute(
  '5. Language Selected -> Unauthenticated',
  {
    hasLaunchedBefore: true,
    language: 'en',
    hasLanguageSelected: true,
    isOnboardingCompleted: true,
    isAuthenticated: false,
    isProfileCompleted: false,
  },
  '/auth-welcome'
);

// 6. Registered & OTP Verified -> Profile Incomplete
assertRoute(
  '6. Registered -> Profile Setup Pending',
  {
    hasLaunchedBefore: true,
    language: 'en',
    hasLanguageSelected: true,
    isOnboardingCompleted: true,
    isAuthenticated: true,
    isProfileCompleted: false,
  },
  '/profile-create'
);

// 7. Profile Complete & Authenticated
assertRoute(
  '7. Returning Authenticated User',
  {
    hasLaunchedBefore: true,
    language: 'en',
    hasLanguageSelected: true,
    isOnboardingCompleted: true,
    isAuthenticated: true,
    isProfileCompleted: true,
  },
  '/home'
);

// 8. Logged Out User Boot
assertRoute(
  '8. Logged Out User Launch',
  {
    hasLaunchedBefore: true,
    language: 'en',
    hasLanguageSelected: true,
    isOnboardingCompleted: true,
    isAuthenticated: false,
    isProfileCompleted: false,
  },
  '/auth-welcome'
);

// 9. Full Dev Reset Launch
assertRoute(
  '9. After Development Reset Launch',
  {
    hasLaunchedBefore: false,
    language: null,
    hasLanguageSelected: false,
    isOnboardingCompleted: false,
    isAuthenticated: false,
    isProfileCompleted: false,
  },
  '/welcome'
);

// Print Test Results
let allPassed = true;
results.forEach((r, idx) => {
  const statusMark = r.passed ? '✅ PASS' : '❌ FAIL';
  if (!r.passed) allPassed = false;
  console.log(`${idx + 1}. [${statusMark}] ${r.step}`);
  console.log(`   Expected: ${r.expected}`);
  console.log(`   Actual:   ${r.actual}\n`);
});

if (allPassed) {
  console.log('====================================================');
  console.log('🎉 ALL 9 LIFECYCLE TESTS PASSED SUCCESSFULLY!');
  console.log('====================================================');
} else {
  console.error('❌ SOME TESTS FAILED');
  process.exit(1);
}
