/**
 * Screen 16 — Production Home Dashboard Comprehensive Verification Suite
 */

import { MOCK_ACTIVE_DASHBOARD, MOCK_EMPTY_DASHBOARD } from '../features/home/home.mock';
import { dashboardService } from '../features/home/home.service';
import { getTranslation } from '../config/i18n';
import { storage, STORAGE_KEYS } from '../storage/asyncStorage';
import { SessionRepository } from '../features/auth';

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

async function runDashboardTests() {
  console.log('====================================================');
  console.log('SCREEN 16 — HOME DASHBOARD VERIFICATION SUITE');
  console.log('====================================================\n');

  // 1. Data Contract Checks
  console.log('--- Phase 1: Data Contracts & Gamification ---');
  assert(
    MOCK_ACTIVE_DASHBOARD.student.name === 'Anu' &&
    MOCK_ACTIVE_DASHBOARD.student.grade === 'Grade 8' &&
    MOCK_ACTIVE_DASHBOARD.student.unreadNotificationsCount === 2,
    'Student Header Identity Contract',
    `Name: ${MOCK_ACTIVE_DASHBOARD.student.name}, Grade: ${MOCK_ACTIVE_DASHBOARD.student.grade}`
  );

  assert(
    MOCK_ACTIVE_DASHBOARD.overallProgressPercentage === 72 &&
    MOCK_ACTIVE_DASHBOARD.streakDays === 5 &&
    MOCK_ACTIVE_DASHBOARD.points === 840 &&
    MOCK_ACTIVE_DASHBOARD.rank === 12,
    'Learning Progress & Metrics Contract',
    `Progress: ${MOCK_ACTIVE_DASHBOARD.overallProgressPercentage}%, Streak: ${MOCK_ACTIVE_DASHBOARD.streakDays}d, Points: ${MOCK_ACTIVE_DASHBOARD.points}, Rank: #${MOCK_ACTIVE_DASHBOARD.rank}`
  );

  assert(
    MOCK_ACTIVE_DASHBOARD.continueTopic?.subject === 'Physics' &&
    MOCK_ACTIVE_DASHBOARD.continueTopic?.topicTitle === 'Force & Laws of Motion' &&
    MOCK_ACTIVE_DASHBOARD.continueTopic?.progressPercentage === 72,
    'Continue Learning Card Contract',
    `Topic: ${MOCK_ACTIVE_DASHBOARD.continueTopic?.topicTitle}`
  );

  assert(
    MOCK_ACTIVE_DASHBOARD.dailyChallenge?.id === 'dc-101' &&
    MOCK_ACTIVE_DASHBOARD.dailyChallenge?.xpReward === 50 &&
    Boolean(MOCK_ACTIVE_DASHBOARD.dailyChallenge?.questionPreview),
    'Daily Science Challenge Contract',
    `XP: +${MOCK_ACTIVE_DASHBOARD.dailyChallenge?.xpReward}`
  );

  assert(
    MOCK_ACTIVE_DASHBOARD.recentAchievement?.id === 'ach-01' &&
    MOCK_ACTIVE_DASHBOARD.recentAchievement?.title === 'Concept Explorer',
    'Recent Achievement Preview Contract',
    `Title: ${MOCK_ACTIVE_DASHBOARD.recentAchievement?.title}`
  );

  // 2. New Student Zero-Data State
  console.log('\n--- Phase 2: Zero-Data / New Student State ---');
  assert(
    MOCK_EMPTY_DASHBOARD.overallProgressPercentage === 0 &&
    MOCK_EMPTY_DASHBOARD.continueTopic === null &&
    MOCK_EMPTY_DASHBOARD.recentAchievement === null &&
    MOCK_EMPTY_DASHBOARD.isNewStudent === true,
    'Zero-Data State Model Contract',
    'isNewStudent = true, continueTopic = null'
  );

  // 3. Dashboard Service & Caching
  console.log('\n--- Phase 3: Service Layer & Local Caching ---');
  const fetched = await dashboardService.getDashboard();
  assert(
    Boolean(fetched) && fetched.overallProgressPercentage === 72,
    'Dashboard Service Fetch Simulation',
    `Fetched student: ${fetched.student.name}`
  );

  const cached = await dashboardService.getCachedDashboard();
  assert(
    Boolean(cached) && cached?.student.name === fetched.student.name,
    'Dashboard Local Cache Persistence',
    'Retrieved from AsyncStorage'
  );

  // 4. Bilingual Localization
  console.log('\n--- Phase 4: Bilingual Localization Completeness ---');
  const en = getTranslation('en').home;
  const ta = getTranslation('ta').home;

  assert(
    en.title === 'Home' &&
    en.learningProgress === 'Science Learning Progress' &&
    en.continueLearning === 'Continue Learning' &&
    en.quickActions === 'Quick Actions' &&
    en.quizzes === 'Quizzes' &&
    en.riddles === 'Science Riddles' &&
    en.spinWheel === 'Spin Wheel' &&
    en.escapeRoom === 'Escape Room' &&
    en.dailyChallenge === 'Daily Challenge' &&
    en.nav.home === 'Home' &&
    en.nav.learn === 'Learn' &&
    en.nav.games === 'Games' &&
    en.nav.profile === 'Profile',
    'English Dashboard Translation Completeness',
    'All 13 core keys present'
  );

  assert(
    ta.title === 'முகப்பு' &&
    ta.learningProgress === 'அறிவியல் கற்றல் முன்னேற்றம்' &&
    ta.continueLearning === 'கற்றலைத் தொடரவும்' &&
    ta.quizzes === 'வினாடி வினா' &&
    ta.riddles === 'அறிவியல் புதிர்கள்' &&
    ta.spinWheel === 'சுழல் சக்கரம்' &&
    ta.escapeRoom === 'ரகசிய அறை' &&
    ta.dailyChallenge === 'தினசரி சவால்' &&
    ta.nav.home === 'முகப்பு' &&
    ta.nav.learn === 'கற்போம்' &&
    ta.nav.games === 'ஆடுவோம்' &&
    ta.nav.profile === 'சுயவிவரம்',
    'Tamil Dashboard Translation Completeness',
    'All 12 core keys present in Tamil'
  );

  // 5. Session Guard & Returning User
  console.log('\n--- Phase 5: Session Guard & Auth Persistence ---');
  // Seed demo session
  await SessionRepository.saveSession({
    userId: 'demo-user-1',
    email: 'demo@vigyaan.app',
    fullName: 'Anu S',
    isAuthenticated: true,
    authMode: 'password',
    createdAt: Date.now(),
  });

  const validSession = await SessionRepository.getSession();
  assert(
    validSession !== null && validSession.isAuthenticated === true,
    'Authenticated Student Session Active',
    `User: ${validSession?.fullName}`
  );

  // Clear session for logout verification
  await SessionRepository.clearSession();
  const clearedSession = await SessionRepository.getSession();
  assert(
    clearedSession === null,
    'Logout Clears Auth Session Securely',
    'Session is null'
  );

  // Summary
  console.log('\n====================================================');
  const allPassed = results.every((r) => r.passed);
  if (allPassed) {
    console.log(`🎉 ALL ${results.length} DASHBOARD TESTS PASSED SUCCESSFULLY!`);
  } else {
    console.log(`⚠️ ${results.filter((r) => !r.passed).length} TESTS FAILED!`);
  }
  console.log('====================================================\n');
}

runDashboardTests();
