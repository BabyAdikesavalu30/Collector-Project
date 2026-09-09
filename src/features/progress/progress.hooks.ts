/**
 * Progress Feature React Hooks
 * Provides responsive lifecycle-managed hooks for the Progress Center.
 */

import { useState, useEffect, useCallback } from 'react';
import { progressService } from './progress.service';
import { focusAreaService } from '../weak-areas';
import { FocusArea } from '../weak-areas/weakAreas.types';
import {
  OverallProgress,
  RecentProgressActivity,
  SubjectProgress,
  SubjectStrength,
  TopicProgress,
} from './progress.types';

export interface UseProgressHubResult {
  overall: OverallProgress | null;
  subjects: SubjectProgress[];
  strengths: SubjectStrength[];
  recentActivities: RecentProgressActivity[];
  focusAreasCount: number;
  isLoading: boolean;
  refresh: () => Promise<void>;
}

export function useProgressHub(): UseProgressHubResult {
  const [overall, setOverall] = useState<OverallProgress | null>(null);
  const [subjects, setSubjects] = useState<SubjectProgress[]>([]);
  const [strengths, setStrengths] = useState<SubjectStrength[]>([]);
  const [recentActivities, setRecentActivities] = useState<RecentProgressActivity[]>([]);
  const [focusAreasCount, setFocusAreasCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const refresh = useCallback(async () => {
    try {
      setIsLoading(true);
      const [ov, subs, str, rec, focusSnap] = await Promise.all([
        progressService.getOverallProgress(),
        progressService.getAllSubjectProgress(),
        progressService.getStrengths(),
        progressService.getRecentActivities(undefined, 6),
        focusAreaService.getFocusAreasSnapshot().catch(() => null),
      ]);
      setOverall(ov);
      setSubjects(subs);
      setStrengths(str);
      setRecentActivities(rec);
      setFocusAreasCount(focusSnap?.focusAreas.length ?? 0);
    } catch (err) {
      console.warn('[useProgressHub] Failed to refresh progress:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return {
    overall,
    subjects,
    strengths,
    recentActivities,
    focusAreasCount,
    isLoading,
    refresh,
  };
}

export interface UseSubjectProgressResult {
  subjectProgress: SubjectProgress | null;
  topics: TopicProgress[];
  recentActivities: RecentProgressActivity[];
  focusAreas: FocusArea[];
  isLoading: boolean;
  refresh: () => Promise<void>;
}

export function useSubjectProgress(subjectId: string): UseSubjectProgressResult {
  const [subjectProgress, setSubjectProgress] = useState<SubjectProgress | null>(null);
  const [topics, setTopics] = useState<TopicProgress[]>([]);
  const [recentActivities, setRecentActivities] = useState<RecentProgressActivity[]>([]);
  const [focusAreas, setFocusAreas] = useState<FocusArea[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const refresh = useCallback(async () => {
    if (!subjectId) return;
    try {
      setIsLoading(true);
      const [sp, tps, rec, focusSnap] = await Promise.all([
        progressService.getSubjectProgress(subjectId),
        progressService.getTopicProgressForSubject(subjectId),
        progressService.getRecentActivities(subjectId, 6),
        focusAreaService.getFocusAreasSnapshot().catch(() => null),
      ]);
      setSubjectProgress(sp);
      setTopics(tps);
      setRecentActivities(rec);

      const matchingFocus = (focusSnap?.focusAreas || []).filter(
        (f) => f.subjectId === subjectId
      );
      setFocusAreas(matchingFocus);
    } catch (err) {
      console.warn(`[useSubjectProgress] Error loading subject "${subjectId}":`, err);
    } finally {
      setIsLoading(false);
    }
  }, [subjectId]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return {
    subjectProgress,
    topics,
    recentActivities,
    focusAreas,
    isLoading,
    refresh,
  };
}
