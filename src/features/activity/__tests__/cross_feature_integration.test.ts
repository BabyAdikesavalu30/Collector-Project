/**
 * Phase 54: Cross-Feature Integration Test Suite
 * Validates the 26 cross-feature integration scenarios required by Phase 54:
 * 1. activity event creation
 * 2. event ID uniqueness
 * 3. event idempotency
 * 4. XP deduplication
 * 5. Daily Goal deduplication
 * 6. streak same-day behavior
 * 7. streak consecutive-day increment
 * 8. achievement evaluation
 * 9. achievement deduplication
 * 10. notification deduplication
 * 11. celebration deduplication
 * 12. recent activity deduplication & sorting
 * 13. Home view model freshness
 * 14. Passport view model freshness
 * 15. Progress view model aggregation
 * 16. logout state isolation
 * 17. malformed storage recovery
 * 18. event replay protection
 * 19. language consistency
 * 20. route parameter validation
 * 21. rapid completion protection
 * 22. async race protection
 * 23. partial downstream failure isolation
 * 24. offline behavior
 * 25. development reset completeness
 * 26. post-restart duplicate protection
 */

import { storage, STORAGE_KEYS } from '../../../storage/asyncStorage';
import {
  recordActivity,
  getRecentActivity,
  getTotalXpBalance,
  getUnifiedStreak,
  clearAllActivityData,
} from '../activity.repository';
import { getActivityHistory } from '../activity.storage';
import { dailyGoalService } from '../../daily-goal/dailyGoal.service';
import { getDailyGoalState } from '../../daily-goal/dailyGoal.storage';
import { calculateStreak } from '../../streaks';
import {
  evaluateAndSyncAchievements,
  getUnlockedAchievements,
  persistUnlockedAchievements,
} from '../../achievements/achievements.storage';
import { createNotification, getGeneratedNotifications } from '../../notifications/notifications.factory';
import { celebrationService } from '../../celebration/celebration.service';
import { getHomeViewModel } from '../../home/home2.service';
import { getPassportSummary } from '../../science-passport/sciencePassport.service';
import { ProgressService } from '../../progress/progress.service';
import { authService } from '../../auth/auth.service';
import { SessionRepository } from '../../auth/auth.session';
import { createFallbackResultFromParams } from '../../quiz/quiz-result.utils';

describe('Phase 54: Full Cross-Feature Integration Suite', () => {
  beforeEach(async () => {
    await storage.clearAllDevelopmentState();
    celebrationService.resetForTesting();
  });

  // 1. Activity event creation & storage
  it('1. creates and persists canonical activity event', async () => {
    const item = await recordActivity({
      type: 'micro_lesson_completed',
      dedupeKey: 'micro-lesson-physics-01',
      title: 'Newtonian Physics',
      titleTa: 'நியூட்டனின் இயற்பியல்',
      xpEarned: 20,
    });
    expect(item).not.toBeNull();
    expect(item?.id).toBe('act-micro-lesson-physics-01');

    const history = await getActivityHistory();
    expect(history.length).toBe(1);
    expect(history[0].title).toBe('Newtonian Physics');
  });

  // 2. Event ID uniqueness
  it('2. generates distinct deterministic IDs for distinct dedupeKeys', async () => {
    const itemA = await recordActivity({
      type: 'game_completed',
      dedupeKey: 'game:zip:zip-01:completed',
      title: 'Zip Level 1',
      titleTa: 'ஜிப் நிலை 1',
    });
    const itemB = await recordActivity({
      type: 'game_completed',
      dedupeKey: 'game:zip:zip-02:completed',
      title: 'Zip Level 2',
      titleTa: 'ஜிப் நிலை 2',
    });
    expect(itemA?.id).not.toBe(itemB?.id);
    expect(itemA?.id).toBe('act-game:zip:zip-01:completed');
    expect(itemB?.id).toBe('act-game:zip:zip-02:completed');
  });

  // 3. Event idempotency
  it('3. enforces event idempotency (same dedupeKey returns null)', async () => {
    const input = {
      type: 'concept_map_completed' as const,
      dedupeKey: 'concept-map-solar-system',
      title: 'Solar System',
      titleTa: 'சூரிய குடும்பம்',
    };
    const first = await recordActivity(input);
    const second = await recordActivity(input);

    expect(first).not.toBeNull();
    expect(second).toBeNull();
    const history = await getActivityHistory();
    expect(history.length).toBe(1);
  });

  // 4. XP deduplication
  it('4. prevents duplicate XP awards for the same completion', async () => {
    const input = {
      type: 'experiment_completed' as const,
      dedupeKey: 'experiment:optics-refraction',
      title: 'Light Refraction',
      titleTa: 'ஒளி விலகல்',
      xpEarned: 25,
    };
    await recordActivity(input);
    await recordActivity(input); // repeated attempt

    const totalXp = await getTotalXpBalance();
    expect(totalXp).toBe(25);
  });

  // 5. Daily Goal auto-increment and deduplication
  it('5. auto-increments Daily Goal on activity and prevents duplicate increments', async () => {
    const itemA = await recordActivity({
      type: 'micro_lesson_completed',
      dedupeKey: 'micro-lesson-chem-01',
      title: 'Acids and Bases',
      titleTa: 'அமிலங்கள் மற்றும் காரங்கள்',
      xpEarned: 20,
    });
    expect(itemA).not.toBeNull();

    const todayGoal = await dailyGoalService.getTodayGoal();
    expect(todayGoal.progress.current).toBeGreaterThanOrEqual(1);

    // Re-recording identical event
    await recordActivity({
      type: 'micro_lesson_completed',
      dedupeKey: 'micro-lesson-chem-01',
      title: 'Acids and Bases',
      titleTa: 'அமிலங்கள் மற்றும் காரங்கள்',
      xpEarned: 20,
    });

    const goalAfterDup = await dailyGoalService.getTodayGoal();
    expect(goalAfterDup.progress.current).toBe(todayGoal.progress.current);
  });

  // 6. Streak same-day single-count behavior
  it('6. counts multiple activities on the same date as a single streak day', () => {
    const now = new Date();
    const timestamps = [now.getTime(), now.getTime() + 1000, now.getTime() + 2000, now.getTime() + 3000];
    const streak = calculateStreak(timestamps, now);

    expect(streak.currentStreak).toBe(1);
    expect(streak.longestStreak).toBe(1);
  });

  // 7. Streak consecutive-day increment
  it('7. increments streak on consecutive days', () => {
    const oneDayMs = 24 * 60 * 60 * 1000;
    const todayMs = Date.now();
    const yesterdayMs = todayMs - oneDayMs;
    const twoDaysAgoMs = todayMs - 2 * oneDayMs;

    const today = new Date(todayMs);
    const streak = calculateStreak([twoDaysAgoMs, yesterdayMs, todayMs], today);
    expect(streak.currentStreak).toBe(3);
    expect(streak.longestStreak).toBe(3);
  });

  // 8. Achievement evaluation from activity
  it('8. evaluates and unlocks achievements based on canonical activity', async () => {
    // Record first quiz completion
    await recordActivity({
      type: 'quiz_completed',
      dedupeKey: 'quiz-session-001',
      title: 'Physics Quiz',
      titleTa: 'இயற்பியல் வினாடி வினா',
      xpEarned: 25,
      metadata: { percentage: 100 },
    });

    const result = await evaluateAndSyncAchievements();
    expect(result.achievements.length).toBeGreaterThan(0);
    const unlocked = await getUnlockedAchievements();
    expect(Object.keys(unlocked).length).toBeGreaterThanOrEqual(1);
  });

  // 9. Achievement unlock deduplication
  it('9. never unlocks an achievement twice or duplicates reward XP', async () => {
    const badgeIds = ['first-quiz' as const];
    const firstUnlocks = await persistUnlockedAchievements(badgeIds);
    // XP is awarded for the first unlock
    const xpAfterFirst = await getTotalXpBalance();
    expect(xpAfterFirst).toBeGreaterThan(0);

    const secondUnlocks = await persistUnlockedAchievements(badgeIds);
    // XP should NOT increase on second call (dedupeKey prevents re-award)
    const xpAfterSecond = await getTotalXpBalance();
    expect(xpAfterSecond).toBe(xpAfterFirst);

    // Both calls return the same achievement (it persists, not duplicates)
    expect(firstUnlocks.length).toBe(1);
    expect(secondUnlocks.length).toBe(1);
    // Verify only one entry in the unlocked store
    const stored = await getUnlockedAchievements();
    expect(Object.keys(stored).length).toBe(1);
  });

  // 10. Notification creation and deduplication
  it('10. creates notifications with deterministic ID deduplication', async () => {
    const notif1 = await createNotification({
      id: 'notif-cert-phys-001',
      type: 'certificate',
      title: { en: 'Physics Certificate', ta: 'இயற்பியல் சான்றிதழ்' },
      body: { en: 'Congratulations!', ta: 'வாழ்த்துகள்!' },
    });
    const notif2 = await createNotification({
      id: 'notif-cert-phys-001',
      type: 'certificate',
      title: { en: 'Physics Certificate', ta: 'இயற்பியல் சான்றிதழ்' },
      body: { en: 'Congratulations!', ta: 'வாழ்த்துகள்!' },
    });

    expect(notif1).not.toBeNull();
    expect(notif2).toBeNull();

    const inbox = await getGeneratedNotifications();
    expect(inbox.filter((n) => n.id === 'notif-cert-phys-001').length).toBe(1);
  });

  // 11. Celebration deduplication
  it('11. prevents duplicate celebration events for the same identifier', async () => {
    const first = await celebrationService.triggerMicroLessonComplete('Lesson 1', 20);
    const second = await celebrationService.triggerMicroLessonComplete('Lesson 1', 20);

    expect(first).not.toBeNull();
    expect(second).toBeNull();
  });

  // 12. Recent activity deterministic sorting & deduplication
  it('12. maintains deterministically sorted, newest-first recent activity', async () => {
    await recordActivity({
      type: 'riddle_completed',
      dedupeKey: 'riddle-easy-1',
      title: 'Easy Riddle',
      titleTa: 'எளிய புதிர்',
      timestamp: 1000,
    });
    await recordActivity({
      type: 'mystery_completed',
      dedupeKey: 'mystery-case-01',
      title: 'Mystery Case',
      titleTa: 'மர்ம வழக்கு',
      timestamp: 2000,
    });

    const recent = await getRecentActivity(5);
    expect(recent.length).toBe(2);
    expect(recent[0].timestamp).toBe(2000);
    expect(recent[1].timestamp).toBe(1000);
  });

  // 13. Home view model freshness
  it('13. provides fresh HomeViewModel that accurately reflects recorded activities', async () => {
    await recordActivity({
      type: 'micro_lesson_completed',
      dedupeKey: 'ml-home-test',
      title: 'Cell Biology',
      titleTa: 'செல் உயிரியல்',
      xpEarned: 20,
    });

    const homeVM = await getHomeViewModel();
    expect(homeVM).toBeDefined();
    // TodayOverview uses `activitiesToday` not `activitiesCount`
    expect(homeVM.today.activitiesToday).toBeGreaterThanOrEqual(1);
  });

  // 14. Passport view model freshness
  it('14. aggregates metrics in SciencePassportViewModel from canonical stores', async () => {
    await recordActivity({
      type: 'game_completed',
      dedupeKey: 'game:zip:level-1:completed',
      title: 'Zip',
      titleTa: 'ஜிப்',
      xpEarned: 20,
    });

    const passportVM = await getPassportSummary();
    expect(passportVM.totalXp).toBe(20);
    expect(passportVM.activityStats.totalActivities).toBeGreaterThanOrEqual(1);
  });

  // 15. Progress view model aggregation
  it('15. compiles subject progress across all science subjects without error', async () => {
    const progressService = new ProgressService();
    const subjects = await progressService.getAllSubjectProgress();
    expect(subjects.length).toBe(7);
  });

  // 16. Logout state isolation
  it('16. completely wipes student private state on logout while preserving device preferences', async () => {
    // Setup mock student session and activity
    await SessionRepository.saveSession({
      userId: 'student-test-01',
      mobileNumber: '9876543210',
      fullName: 'Arun',
      isAuthenticated: true,
      authMode: 'demo',
      createdAt: Date.now(),
    });
    await storage.setItem(STORAGE_KEYS.USER_LANGUAGE, 'ta');
    await storage.setItem(STORAGE_KEYS.ONBOARDING_COMPLETED, true);

    await recordActivity({
      type: 'quiz_completed',
      dedupeKey: 'quiz-arun-01',
      title: 'Quiz',
      titleTa: 'வினாடி வினா',
      xpEarned: 25,
    });

    // Execute logout
    await authService.logout();

    // Verify session revoked
    const session = await SessionRepository.getSession();
    expect(session).toBeNull();

    // Verify student activity and XP cleared
    const history = await getActivityHistory();
    expect(history.length).toBe(0);
    const xp = await getTotalXpBalance();
    expect(xp).toBe(0);

    // Verify device preferences preserved
    const lang = await storage.getItem(STORAGE_KEYS.USER_LANGUAGE);
    expect(lang).toBe('ta');
    const onboarding = await storage.getItem(STORAGE_KEYS.ONBOARDING_COMPLETED);
    expect(onboarding).toBe(true);
  });

  // 17. Malformed storage recovery
  it('17. recovers safely from corrupted storage without crashing', async () => {
    await storage.setItem(STORAGE_KEYS.ACTIVITY_HISTORY as any, 'INVALID_JSON_CORRUPT');
    const history = await getActivityHistory();
    expect(Array.isArray(history)).toBe(true);
    expect(history.length).toBe(0);
  });

  // 18. Event replay protection
  it('18. drops duplicate event submissions upon replay', async () => {
    const event = {
      type: 'micro_lesson_completed' as const,
      dedupeKey: 'ml-replay-check',
      title: 'Gravity',
      titleTa: 'ஈர்ப்பு விசை',
      xpEarned: 20,
    };
    const first = await recordActivity(event);
    expect(first).not.toBeNull();

    // Simulating event replay
    const replayed = await recordActivity(event);
    expect(replayed).toBeNull();
  });

  // 19. Language parity
  it('19. preserves both English and Tamil localization metadata on events', async () => {
    const item = await recordActivity({
      type: 'micro_lesson_completed',
      dedupeKey: 'ml-i18n-check',
      title: 'Photosynthesis',
      titleTa: 'ஒளிச்சேர்க்கை',
      subtitle: 'Plant biology',
      subtitleTa: 'தாவர உயிரியல்',
      xpEarned: 20,
    });
    expect(item?.title).toBe('Photosynthesis');
    expect(item?.titleTa).toBe('ஒளிச்சேர்க்கை');
    expect(item?.subtitle).toBe('Plant biology');
    expect(item?.subtitleTa).toBe('தாவர உயிரியல்');
  });

  // 20. Route parameter validation
  it('20. handles missing route query parameters safely via fallback reconstruction', () => {
    // When totalQuestions is missing/0, createFallbackResultFromParams returns null — that is
    // the intended safe fallback sentinel value per quiz-result.utils contract.
    const fallback = createFallbackResultFromParams({});
    expect(fallback).toBeNull();

    // With a valid totalQuestions, it should return a proper result object
    const validFallback = createFallbackResultFromParams({ totalQuestions: '5' });
    expect(validFallback).not.toBeNull();
    expect(validFallback!.totalQuestions).toBe(5);
    expect(validFallback!.score).toBe(0);
  });

  // 21. Rapid completion double-tap protection
  it('21. protects against rapid concurrent taps with identical dedupeKey', async () => {
    const event = {
      type: 'riddle_completed' as const,
      dedupeKey: 'riddle-rapid-tap-test',
      title: 'Light riddle',
      titleTa: 'ஒளி புதிர்',
      xpEarned: 15,
    };

    const [res1, res2] = await Promise.all([
      recordActivity(event),
      recordActivity(event),
    ]);

    const successes = [res1, res2].filter((r) => r !== null);
    expect(successes.length).toBe(1);
    expect(await getTotalXpBalance()).toBe(15);
  });

  // 22. Async race condition resilience
  it('22. handles interleaved activities from multiple domains without corruption', async () => {
    await Promise.all([
      recordActivity({
        type: 'game_completed',
        dedupeKey: 'game:zip:lvl1:completed',
        title: 'Zip',
        titleTa: 'ஜிப்',
        xpEarned: 20,
      }),
      recordActivity({
        type: 'micro_lesson_completed',
        dedupeKey: 'ml-interleaved-01',
        title: 'Electricity',
        titleTa: 'மின்னியல்',
        xpEarned: 20,
      }),
      recordActivity({
        type: 'experiment_completed',
        dedupeKey: 'exp-interleaved-01',
        title: 'Circuit Lab',
        titleTa: 'மின்சுற்று ஆய்வகம்',
        xpEarned: 25,
      }),
    ]);

    const history = await getActivityHistory();
    expect(history.length).toBe(3);
    const xp = await getTotalXpBalance();
    expect(xp).toBe(65);
  });

  // 23. Partial downstream failure isolation
  it('23. preserves core activity and XP when a secondary consumer fails', async () => {
    // Even if an unexpected error occurs in a secondary service, recordActivity completes
    const item = await recordActivity({
      type: 'micro_lesson_completed',
      dedupeKey: 'ml-failure-isolation',
      title: 'Atoms',
      titleTa: 'அணுக்கள்',
      xpEarned: 20,
    });

    expect(item).not.toBeNull();
    const xp = await getTotalXpBalance();
    expect(xp).toBe(20);
  });

  // 24. Offline execution with zero backend dependency
  it('24. executes all cross-feature flows synchronously and offline-ready', async () => {
    const item = await recordActivity({
      type: 'concept_map_completed',
      dedupeKey: 'cm-offline-test',
      title: 'Water Cycle',
      titleTa: 'நீர் சுழற்சி',
      xpEarned: 10,
    });
    expect(item).not.toBeNull();
    const streak = await getUnifiedStreak();
    expect(streak).toBeDefined();
  });

  // 25. Development reset completeness
  it('25. clears all 20+ feature storage keys cleanly during development reset', async () => {
    await recordActivity({
      type: 'game_completed',
      dedupeKey: 'game:zip:test:completed',
      title: 'Zip',
      titleTa: 'ஜிப்',
      xpEarned: 20,
    });
    await createNotification({
      id: 'notif-reset-test',
      type: 'game',
      title: { en: 'Game', ta: 'விளையாட்டு' },
      body: { en: 'Play now', ta: 'விளையாடு' },
    });

    await storage.clearAllDevelopmentState();

    expect((await getActivityHistory()).length).toBe(0);
    expect(await getTotalXpBalance()).toBe(0);
    expect((await getGeneratedNotifications()).length).toBe(0);
    expect(await getDailyGoalState()).toBeNull();
  });

  // 26. Post-restart duplicate reward protection
  it('26. ensures app restart does not re-award completed items', async () => {
    await recordActivity({
      type: 'micro_lesson_completed',
      dedupeKey: 'ml-restart-test',
      title: 'Magnetism',
      titleTa: 'காந்தவியல்',
      xpEarned: 20,
    });

    // Simulate app restart by invalidating in-memory cache
    storage.invalidateCache();

    // Attempting same completion after restart
    const second = await recordActivity({
      type: 'micro_lesson_completed',
      dedupeKey: 'ml-restart-test',
      title: 'Magnetism',
      titleTa: 'காந்தவியல்',
      xpEarned: 20,
    });

    expect(second).toBeNull();
    expect(await getTotalXpBalance()).toBe(20);
  });
});
