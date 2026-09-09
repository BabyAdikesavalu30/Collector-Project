/**
 * Micro Lessons Feature Engine
 * Pure deterministic algorithms for daily lesson selection, filtering, search,
 * recommendation scoring, and progress metrics.
 */

import {
  MicroLesson,
  MicroLessonFilterState,
  MicroLessonProgress,
  MicroLessonSubjectId,
} from './microLessons.types';

/**
 * Returns a stable local YYYY-MM-DD string for deterministic date hashing.
 */
export function getLocalDateKey(date: Date = new Date()): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

/**
 * Deterministically selects today's featured quick lesson based on date hash.
 * Guaranteed same lesson for the entire day.
 */
export function getTodayQuickLesson(
  lessons: MicroLesson[],
  dateKey: string = getLocalDateKey()
): MicroLesson {
  if (lessons.length === 0) {
    throw new Error('Cannot select daily lesson from an empty catalog');
  }

  let hash = 0;
  for (let i = 0; i < dateKey.length; i++) {
    hash = (hash * 31 + dateKey.charCodeAt(i)) & 0xffffffff;
  }
  const index = Math.abs(hash) % lessons.length;
  return lessons[index];
}

/**
 * Filters the lessons list based on subject tab, status chip, and text query.
 */
export function filterMicroLessons(
  lessons: MicroLesson[],
  filters: MicroLessonFilterState,
  progressMap: Record<string, MicroLessonProgress>,
  bookmarks: string[] = []
): MicroLesson[] {
  const bookmarkSet = new Set(bookmarks);
  const q = filters.searchQuery.trim().toLowerCase();

  return lessons.filter((lesson) => {
    // 1. Subject filter
    if (filters.subjectId !== 'all' && lesson.subject !== filters.subjectId) {
      return false;
    }

    // 2. Status filter
    const prog = progressMap[lesson.id];
    const status = prog?.status || 'not_started';
    const isBookmarked = prog?.bookmarked || bookmarkSet.has(lesson.id);

    if (filters.status === 'not_started' && status !== 'not_started') {
      return false;
    }
    if (filters.status === 'in_progress' && status !== 'in_progress') {
      return false;
    }
    if (filters.status === 'completed' && status !== 'completed') {
      return false;
    }
    if (filters.status === 'bookmarked' && !isBookmarked) {
      return false;
    }

    // 3. Search query
    if (q.length > 0) {
      const matchEn =
        lesson.title.en.toLowerCase().includes(q) ||
        lesson.subtitle.en.toLowerCase().includes(q) ||
        lesson.description.en.toLowerCase().includes(q) ||
        lesson.category.toLowerCase().includes(q);

      const matchTa =
        lesson.title.ta.toLowerCase().includes(q) ||
        lesson.subtitle.ta.toLowerCase().includes(q) ||
        lesson.description.ta.toLowerCase().includes(q);

      if (!matchEn && !matchTa) {
        return false;
      }
    }

    return true;
  });
}

/**
 * Returns a recently opened lesson that is still in progress so the student can resume.
 */
export function getRecentlyOpenedLesson(
  lessons: MicroLesson[],
  progressMap: Record<string, MicroLessonProgress>
): MicroLesson | null {
  const inProgressList = lessons
    .filter((l) => {
      const p = progressMap[l.id];
      return p && p.status === 'in_progress' && p.progressPercent > 0 && p.progressPercent < 100;
    })
    .sort((a, b) => {
      const pA = progressMap[a.id];
      const pB = progressMap[b.id];
      return (pB.startedAt || 0) - (pA.startedAt || 0);
    });

  return inProgressList[0] || null;
}

/**
 * Deterministic recommendation engine:
 * 1. Prioritize uncompleted lessons in subjects the learner has engaged with.
 * 2. If all completed or none started, recommend foundational short lessons.
 */
export function getRecommendedLessons(
  lessons: MicroLesson[],
  progressMap: Record<string, MicroLessonProgress>,
  limit = 4
): MicroLesson[] {
  const completedSubjects = new Set<MicroLessonSubjectId>();
  const uncompleted: MicroLesson[] = [];

  for (const l of lessons) {
    const p = progressMap[l.id];
    if (p?.status === 'completed') {
      completedSubjects.add(l.subject);
    } else {
      uncompleted.push(l);
    }
  }

  // If all completed, return the first few for review
  if (uncompleted.length === 0) {
    return lessons.slice(0, limit);
  }

  // Rank by: same subject as completed activity, then short duration
  const ranked = [...uncompleted].sort((a, b) => {
    const aFav = completedSubjects.has(a.subject) ? 1 : 0;
    const bFav = completedSubjects.has(b.subject) ? 1 : 0;
    if (aFav !== bFav) return bFav - aFav;
    return a.durationMinutes - b.durationMinutes;
  });

  return ranked.slice(0, limit);
}

/**
 * Computes overall completion statistics across the micro lesson library.
 */
export function calculateMicroLessonsSummary(
  lessons: MicroLesson[],
  progressMap: Record<string, MicroLessonProgress>
): {
  total: number;
  completed: number;
  inProgress: number;
  percent: number;
} {
  const total = lessons.length;
  let completed = 0;
  let inProgress = 0;

  for (const l of lessons) {
    const p = progressMap[l.id];
    if (p?.status === 'completed') {
      completed++;
    } else if (p?.status === 'in_progress') {
      inProgress++;
    }
  }

  const percent = total > 0 ? Math.round((completed / total) * 100) : 0;

  return {
    total,
    completed,
    inProgress,
    percent,
  };
}
