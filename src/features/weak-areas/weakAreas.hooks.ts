/**
 * Weak Areas Hooks
 * Race-safe loading of the focus-area snapshot: late responses from stale
 * loads never overwrite newer state, and unmounted components never update.
 */

import { useCallback, useEffect, useRef, useState } from 'react';
import { FocusAreasSnapshot, FocusSubjectId } from './weakAreas.types';
import { focusAreaService } from './weakAreas.service';

export interface UseFocusAreasResult {
  snapshot: FocusAreasSnapshot | null;
  isLoading: boolean;
  hasError: boolean;
  selectedSubjectId: FocusSubjectId | 'all';
  setSelectedSubjectId: (subjectId: FocusSubjectId | 'all') => void;
  reload: () => void;
}

export function useFocusAreas(): UseFocusAreasResult {
  const [snapshot, setSnapshot] = useState<FocusAreasSnapshot | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [selectedSubjectId, setSelectedSubjectId] = useState<FocusSubjectId | 'all'>('all');

  const loadGenerationRef = useRef(0);
  const isMountedRef = useRef(true);

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const load = useCallback(() => {
    const generation = ++loadGenerationRef.current;
    setIsLoading(true);
    setHasError(false);

    focusAreaService
      .getFocusAreasSnapshot()
      .then((next) => {
        if (!isMountedRef.current || generation !== loadGenerationRef.current) return;
        setSnapshot(next);
        setIsLoading(false);
      })
      .catch(() => {
        if (!isMountedRef.current || generation !== loadGenerationRef.current) return;
        setHasError(true);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return {
    snapshot,
    isLoading,
    hasError,
    selectedSubjectId,
    setSelectedSubjectId,
    reload: load,
  };
}

/**
 * Home-card variant: returns only the top focus area (or null) plus loading
 * state, so Home can render a compact "FOCUS ON" card when one exists.
 */
export function useTopFocusArea(): {
  topArea: FocusAreasSnapshot['focusAreas'][number] | null;
  isLoading: boolean;
} {
  const [topArea, setTopArea] = useState<FocusAreasSnapshot['focusAreas'][number] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const isMountedRef = useRef(true);
  const generationRef = useRef(0);

  useEffect(() => {
    isMountedRef.current = true;
    const generation = ++generationRef.current;
    focusAreaService
      .getRecommendedNextStep()
      .then((area) => {
        if (!isMountedRef.current || generation !== generationRef.current) return;
        setTopArea(area);
        setIsLoading(false);
      })
      .catch(() => {
        if (!isMountedRef.current || generation !== generationRef.current) return;
        setTopArea(null);
        setIsLoading(false);
      });
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  return { topArea, isLoading };
}
