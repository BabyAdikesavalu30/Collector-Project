/**
 * Micro Lessons React Hooks
 * Clean state coordination for Hub and Detail views.
 */

import { useState, useEffect, useCallback, useMemo } from 'react';
import {
  MicroLesson,
  MicroLessonCollection,
  MicroLessonFilterState,
  MicroLessonProgress,
} from './microLessons.types';
import { microLessonRepository } from './microLessons.repository';
import {
  filterMicroLessons,
  getRecentlyOpenedLesson,
  getRecommendedLessons,
  calculateMicroLessonsSummary,
} from './microLessons.engine';

export function useMicroLessonsHub() {
  const [allLessons, setAllLessons] = useState<MicroLesson[]>([]);
  const [collections, setCollections] = useState<MicroLessonCollection[]>([]);
  const [todayLesson, setTodayLesson] = useState<MicroLesson | null>(null);
  const [progressMap, setProgressMap] = useState<Record<string, MicroLessonProgress>>({});
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [filterState, setFilterState] = useState<MicroLessonFilterState>({
    status: 'all',
    subjectId: 'all',
    searchQuery: '',
  });

  const loadData = useCallback(async () => {
    try {
      setIsLoading(true);
      const [lessonsList, colls, today, prog, bmarks] = await Promise.all([
        microLessonRepository.getAllLessons(),
        microLessonRepository.getCollections(),
        microLessonRepository.getTodayLesson(),
        microLessonRepository.getAllProgress(),
        microLessonRepository.getBookmarks(),
      ]);

      setAllLessons(lessonsList);
      setCollections(colls);
      setTodayLesson(today);
      setProgressMap(prog);
      setBookmarks(bmarks);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const filteredLessons = useMemo(() => {
    return filterMicroLessons(allLessons, filterState, progressMap, bookmarks);
  }, [allLessons, filterState, progressMap, bookmarks]);

  const recentLesson = useMemo(() => {
    return getRecentlyOpenedLesson(allLessons, progressMap);
  }, [allLessons, progressMap]);

  const recommendedLessons = useMemo(() => {
    return getRecommendedLessons(allLessons, progressMap, 4);
  }, [allLessons, progressMap]);

  const summary = useMemo(() => {
    return calculateMicroLessonsSummary(allLessons, progressMap);
  }, [allLessons, progressMap]);

  const toggleBookmark = useCallback(async (lessonId: string) => {
    const isNowBookmarked = await microLessonRepository.toggleBookmark(lessonId);
    setBookmarks((prev) => {
      const set = new Set(prev);
      if (isNowBookmarked) set.add(lessonId);
      else set.delete(lessonId);
      return Array.from(set);
    });
    setProgressMap((prev) => ({
      ...prev,
      [lessonId]: {
        ...(prev[lessonId] || {
          lessonId,
          status: 'not_started',
          progressPercent: 0,
        }),
        bookmarked: isNowBookmarked,
      },
    }));
    return isNowBookmarked;
  }, []);

  return {
    allLessons,
    filteredLessons,
    collections,
    todayLesson,
    recentLesson,
    recommendedLessons,
    summary,
    progressMap,
    bookmarks,
    filterState,
    setFilterState,
    toggleBookmark,
    isLoading,
    refresh: loadData,
  };
}

export function useMicroLessonDetail(lessonId: string) {
  const [lesson, setLesson] = useState<MicroLesson | null>(null);
  const [progress, setProgress] = useState<MicroLessonProgress | null>(null);
  const [isBookmarkedState, setIsBookmarkedState] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const loadLesson = useCallback(async () => {
    try {
      setIsLoading(true);
      const [l, p, bmarks] = await Promise.all([
        microLessonRepository.getLessonById(lessonId),
        microLessonRepository.getProgress(lessonId),
        microLessonRepository.getBookmarks(),
      ]);

      setLesson(l);
      setProgress(p);
      setIsBookmarkedState(p?.bookmarked || bmarks.includes(lessonId));

      // Auto-initialize progress if first open
      if (l && !p) {
        const initialProgress: MicroLessonProgress = {
          lessonId,
          status: 'in_progress',
          progressPercent: 10,
          startedAt: Date.now(),
          lastSectionIndex: 0,
          quickCheckCompleted: false,
          bookmarked: bmarks.includes(lessonId),
        };
        await microLessonRepository.saveProgress(initialProgress);
        setProgress(initialProgress);
      }
    } finally {
      setIsLoading(false);
    }
  }, [lessonId]);

  useEffect(() => {
    loadLesson();
  }, [loadLesson]);

  const toggleBookmark = useCallback(async () => {
    if (!lessonId) return false;
    const res = await microLessonRepository.toggleBookmark(lessonId);
    setIsBookmarkedState(res);
    setProgress((prev) => prev ? { ...prev, bookmarked: res } : null);
    return res;
  }, [lessonId]);

  const updateProgress = useCallback(
    async (sectionIndex: number, totalSections: number) => {
      if (!lesson) return;
      const pct = Math.min(100, Math.round(((sectionIndex + 1) / totalSections) * 100));

      const updated: MicroLessonProgress = {
        lessonId: lesson.id,
        status: progress?.status === 'completed' ? 'completed' : 'in_progress',
        progressPercent: progress?.status === 'completed' ? 100 : Math.max(progress?.progressPercent || 0, pct),
        startedAt: progress?.startedAt || Date.now(),
        lastSectionIndex: sectionIndex,
        quickCheckCompleted: progress?.quickCheckCompleted || false,
        bookmarked: isBookmarkedState,
      };

      await microLessonRepository.saveProgress(updated);
      setProgress(updated);
    },
    [lesson, progress, isBookmarkedState]
  );

  const completeLesson = useCallback(async () => {
    if (!lesson) return { ok: false, xpAwarded: 0, alreadyCompleted: false };
    const res = await microLessonRepository.completeLesson(lesson.id);
    const updated = await microLessonRepository.getProgress(lesson.id);
    if (updated) setProgress(updated);
    return res;
  }, [lesson]);

  return {
    lesson,
    progress,
    isBookmarked: isBookmarkedState,
    toggleBookmark,
    updateProgress,
    completeLesson,
    isLoading,
    refresh: loadLesson,
  };
}
