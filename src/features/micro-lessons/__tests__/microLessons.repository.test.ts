/**
 * Micro Lessons Repository Unit Tests
 */

import { storage, STORAGE_KEYS } from '../../../storage/asyncStorage';
import { DemoMicroLessonRepository } from '../microLessons.repository';
import { MICRO_LESSONS } from '../microLessons.data';
import { getActivityHistory, getTotalXpBalance } from '../../activity';
import { getUnlockedAchievements } from '../../achievements';

describe('DemoMicroLessonRepository', () => {
  let repository: DemoMicroLessonRepository;
  const testLesson = MICRO_LESSONS[0];

  beforeEach(async () => {
    await storage.removeItem(STORAGE_KEYS.MICRO_LESSONS_PROGRESS);
    await storage.removeItem(STORAGE_KEYS.MICRO_LESSONS_BOOKMARKS);
    await storage.removeItem(STORAGE_KEYS.ACTIVITY_HISTORY);
    await storage.removeItem(STORAGE_KEYS.XP_TRANSACTIONS);
    await storage.removeItem(STORAGE_KEYS.ACHIEVEMENTS_UNLOCKED);
    repository = new DemoMicroLessonRepository();
  });

  it('retrieves all lessons, by id, and by subject', async () => {
    const all = await repository.getAllLessons();
    expect(all.length).toBe(30);

    const found = await repository.getLessonById(testLesson.id);
    expect(found).not.toBeNull();
    expect(found?.id).toBe(testLesson.id);

    const notFound = await repository.getLessonById('non-existent-lesson-id');
    expect(notFound).toBeNull();

    const physics = await repository.getLessonsBySubject('physics');
    expect(physics.length).toBe(7);
  });

  it('retrieves collections and today quick lesson', async () => {
    const collections = await repository.getCollections();
    expect(collections.length).toBe(5);

    const today = await repository.getTodayLesson();
    expect(today).toBeDefined();
    expect(today.id).toBeTruthy();
  });

  it('persists and retrieves lesson progress', async () => {
    const initial = await repository.getProgress(testLesson.id);
    expect(initial).toBeNull();

    await repository.saveProgress({
      lessonId: testLesson.id,
      status: 'in_progress',
      progressPercent: 60,
      startedAt: 12345,
      lastSectionIndex: 2,
      quickCheckCompleted: false,
    });

    const loaded = await repository.getProgress(testLesson.id);
    expect(loaded).not.toBeNull();
    expect(loaded?.status).toBe('in_progress');
    expect(loaded?.progressPercent).toBe(60);
    expect(loaded?.lastSectionIndex).toBe(2);

    const allProg = await repository.getAllProgress();
    expect(allProg[testLesson.id]).toBeDefined();
  });

  it('toggles bookmarks correctly', async () => {
    const bmarksInitial = await repository.getBookmarks();
    expect(bmarksInitial).toEqual([]);

    const state1 = await repository.toggleBookmark(testLesson.id);
    expect(state1).toBe(true);

    let bmarks = await repository.getBookmarks();
    expect(bmarks).toContain(testLesson.id);

    const state2 = await repository.toggleBookmark(testLesson.id);
    expect(state2).toBe(false);

    bmarks = await repository.getBookmarks();
    expect(bmarks).not.toContain(testLesson.id);
  });

  it('completes a lesson, awards +20 XP, triggers first-micro-lesson badge, and records activity', async () => {
    const result = await repository.completeLesson(testLesson.id);

    expect(result.ok).toBe(true);
    expect(result.xpAwarded).toBe(20);
    expect(result.alreadyCompleted).toBe(false);

    // Verify progress updated to completed
    const prog = await repository.getProgress(testLesson.id);
    expect(prog?.status).toBe('completed');
    expect(prog?.progressPercent).toBe(100);
    expect(prog?.quickCheckCompleted).toBe(true);

    // Verify activity event was recorded with 20 XP
    const history = await getActivityHistory();
    const lessonEvent = history.find((h) => h.type === 'micro_lesson_completed');
    expect(lessonEvent).toBeDefined();
    expect(lessonEvent?.metadata?.lessonId).toBe(testLesson.id);
    expect(lessonEvent?.xpEarned).toBe(20);

    // Verify first-micro-lesson badge unlocked (+40 XP bonus)
    const unlocked = await getUnlockedAchievements();
    expect(unlocked['first-micro-lesson']).toBeDefined();

    // Total XP: 20 (lesson) + 20 (first-step badge) + 40 (first-micro-lesson badge) = 80
    // Phase 54: the canonical achievement pipeline now correctly triggers both
    // `first-step` (any 1st activity, 20 XP) and `first-micro-lesson` (40 XP)
    // badges via evaluateAndSyncAchievements inside completeLesson.
    const balance = await getTotalXpBalance();
    expect(balance).toBe(80);
  });

  it('deduplicates completion and avoids awarding XP twice', async () => {
    // First completion
    const result1 = await repository.completeLesson(testLesson.id);
    expect(result1.xpAwarded).toBe(20);
    expect(result1.alreadyCompleted).toBe(false);

    const balanceAfterFirst = await getTotalXpBalance();
    // Phase 54: 20 (lesson) + 20 (first-step badge) + 40 (first-micro-lesson badge) = 80
    expect(balanceAfterFirst).toBe(80);

    // Second completion
    const result2 = await repository.completeLesson(testLesson.id);
    expect(result2.ok).toBe(true);
    expect(result2.xpAwarded).toBe(0);
    expect(result2.alreadyCompleted).toBe(true);

    // XP balance remains unchanged
    const balanceAfterSecond = await getTotalXpBalance();
    expect(balanceAfterSecond).toBe(balanceAfterFirst);
  });
});
