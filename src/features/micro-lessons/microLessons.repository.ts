/**
 * Micro Lessons Repository Boundary
 * MicroLessonRepository contract with DemoMicroLessonRepository implementation
 * backed by bundled local content and existing activity/XP/progress pipelines.
 */

import {
  MicroLesson,
  MicroLessonCollection,
  MicroLessonProgress,
  MicroLessonSubjectId,
} from './microLessons.types';
import {
  MICRO_LESSONS,
  MICRO_LESSONS_MAP,
  MICRO_LESSON_COLLECTIONS,
} from './microLessons.data';
import {
  getAllProgress,
  getProgressForLesson,
  saveProgress as saveProgressStorage,
  getAllBookmarks,
  toggleBookmark as toggleBookmarkStorage,
} from './microLessons.storage';
import { getTodayQuickLesson } from './microLessons.engine';
import { recordActivity } from '../activity';

export interface LessonCompletionResult {
  ok: boolean;
  xpAwarded: number;
  alreadyCompleted: boolean;
}

export interface MicroLessonRepository {
  getAllLessons(): Promise<MicroLesson[]>;
  getLessonById(id: string): Promise<MicroLesson | null>;
  getLessonsBySubject(subjectId: MicroLessonSubjectId): Promise<MicroLesson[]>;
  getCollections(): Promise<MicroLessonCollection[]>;
  getTodayLesson(): Promise<MicroLesson>;
  getAllProgress(): Promise<Record<string, MicroLessonProgress>>;
  getProgress(lessonId: string): Promise<MicroLessonProgress | null>;
  saveProgress(progress: MicroLessonProgress): Promise<boolean>;
  completeLesson(lessonId: string): Promise<LessonCompletionResult>;
  toggleBookmark(lessonId: string): Promise<boolean>;
  getBookmarks(): Promise<string[]>;
}

export class DemoMicroLessonRepository implements MicroLessonRepository {
  async getAllLessons(): Promise<MicroLesson[]> {
    return MICRO_LESSONS;
  }

  async getLessonById(id: string): Promise<MicroLesson | null> {
    return MICRO_LESSONS_MAP[id] || null;
  }

  async getLessonsBySubject(subjectId: MicroLessonSubjectId): Promise<MicroLesson[]> {
    return MICRO_LESSONS.filter((l) => l.subject === subjectId);
  }

  async getCollections(): Promise<MicroLessonCollection[]> {
    return MICRO_LESSON_COLLECTIONS;
  }

  async getTodayLesson(): Promise<MicroLesson> {
    return getTodayQuickLesson(MICRO_LESSONS);
  }

  async getAllProgress(): Promise<Record<string, MicroLessonProgress>> {
    return getAllProgress();
  }

  async getProgress(lessonId: string): Promise<MicroLessonProgress | null> {
    return getProgressForLesson(lessonId);
  }

  async saveProgress(progress: MicroLessonProgress): Promise<boolean> {
    return saveProgressStorage(progress);
  }

  async completeLesson(lessonId: string): Promise<LessonCompletionResult> {
    const lesson = MICRO_LESSONS_MAP[lessonId];
    if (!lesson) {
      return { ok: false, xpAwarded: 0, alreadyCompleted: false };
    }

    const currentProgress = await getProgressForLesson(lessonId);
    if (currentProgress && currentProgress.status === 'completed') {
      return { ok: true, xpAwarded: 0, alreadyCompleted: true };
    }

    const now = Date.now();
    const updatedProgress: MicroLessonProgress = {
      lessonId,
      status: 'completed',
      progressPercent: 100,
      startedAt: currentProgress?.startedAt || now,
      completedAt: now,
      lastSectionIndex: lesson.sections.length - 1,
      quickCheckCompleted: true,
      bookmarked: currentProgress?.bookmarked || false,
    };

    await saveProgressStorage(updatedProgress);

    const xpAmount = lesson.xpReward || 20;

    // Record through canonical unified activity/XP architecture
    // Downstream Daily Goal, Achievements, and Celebrations are orchestrated centrally
    await recordActivity({
      type: 'micro_lesson_completed',
      dedupeKey: `micro-lesson-${lesson.id}`,
      title: lesson.title.en,
      titleTa: lesson.title.ta,
      subtitle: `${lesson.durationMinutes} min micro lesson`,
      subtitleTa: `${lesson.durationMinutes} நிமிட நுண்ணிய பாடம்`,
      xpEarned: xpAmount,
      timestamp: now,
      metadata: {
        lessonId: lesson.id,
        subject: lesson.subject,
        icon: lesson.icon,
      },
    });

    // Evaluate achievements for this newly completed lesson
    try {
      const { evaluateAndSyncAchievements } = await import('../achievements');
      await evaluateAndSyncAchievements();
    } catch {
      // Best-effort
    }

    return { ok: true, xpAwarded: xpAmount, alreadyCompleted: false };
  }

  async toggleBookmark(lessonId: string): Promise<boolean> {
    return toggleBookmarkStorage(lessonId);
  }

  async getBookmarks(): Promise<string[]> {
    return getAllBookmarks();
  }
}

/** Singleton instance used across the app */
export const microLessonRepository: MicroLessonRepository = new DemoMicroLessonRepository();
