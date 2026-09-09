/**
 * Micro Lessons Storage Layer
 * Persists learner progress, checkpoints, and bookmarks safely in AsyncStorage.
 * No remote API dependency, fully offline.
 */

import { storage, STORAGE_KEYS } from '../../storage/asyncStorage';
import { MicroLessonProgress } from './microLessons.types';

export const PROGRESS_KEY = STORAGE_KEYS.MICRO_LESSONS_PROGRESS;
export const BOOKMARKS_KEY = STORAGE_KEYS.MICRO_LESSONS_BOOKMARKS;

export async function getAllProgress(): Promise<Record<string, MicroLessonProgress>> {
  try {
    const data = await storage.getItem<Record<string, MicroLessonProgress>>(PROGRESS_KEY);
    if (!data || typeof data !== 'object') {
      return {};
    }
    return data;
  } catch {
    return {};
  }
}

export async function getProgressForLesson(lessonId: string): Promise<MicroLessonProgress | null> {
  const all = await getAllProgress();
  return all[lessonId] || null;
}

export async function saveProgress(progress: MicroLessonProgress): Promise<boolean> {
  try {
    const all = await getAllProgress();
    all[progress.lessonId] = {
      ...all[progress.lessonId],
      ...progress,
    };
    return await storage.setItem(PROGRESS_KEY, all);
  } catch {
    return false;
  }
}

export async function getAllBookmarks(): Promise<string[]> {
  try {
    const list = await storage.getItem<string[]>(BOOKMARKS_KEY);
    if (Array.isArray(list)) {
      return list;
    }
    return [];
  } catch {
    return [];
  }
}

export async function isBookmarked(lessonId: string): Promise<boolean> {
  const bookmarks = await getAllBookmarks();
  return bookmarks.includes(lessonId);
}

export async function toggleBookmark(lessonId: string): Promise<boolean> {
  try {
    const bookmarks = await getAllBookmarks();
    const set = new Set(bookmarks);
    const nowBookmarked = !set.has(lessonId);

    if (nowBookmarked) {
      set.add(lessonId);
    } else {
      set.delete(lessonId);
    }

    const updated = Array.from(set);
    await storage.setItem(BOOKMARKS_KEY, updated);

    // Update progress bookmark flag if progress exists
    const progress = await getProgressForLesson(lessonId);
    if (progress) {
      await saveProgress({ ...progress, bookmarked: nowBookmarked });
    }

    return nowBookmarked;
  } catch {
    return false;
  }
}

export async function clearMicroLessonsStorage(): Promise<void> {
  await storage.removeItem(PROGRESS_KEY);
  await storage.removeItem(BOOKMARKS_KEY);
}
