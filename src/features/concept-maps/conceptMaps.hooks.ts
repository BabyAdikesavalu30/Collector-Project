/**
 * Concept Maps React Hooks
 * Clean state coordination for Concept Maps Hub and Detail views.
 */

import { useState, useEffect, useCallback, useMemo } from 'react';
import {
  ConceptMap,
  ConceptMapNode,
  ConceptMapFilterState,
  ConceptMapProgress,
  ConceptViewMode,
} from './conceptMaps.types';
import { conceptMapRepository } from './conceptMaps.repository';
import {
  filterConceptMaps,
  getRecentlyViewedMap,
  getRecommendedConceptMaps,
  calculateConceptMapsSummary,
  calculateConceptMapProgress,
} from './conceptMaps.engine';

export function useConceptMapsHub() {
  const [allMaps, setAllMaps] = useState<ConceptMap[]>([]);
  const [todayMap, setTodayMap] = useState<ConceptMap | null>(null);
  const [progressMap, setProgressMap] = useState<Record<string, ConceptMapProgress>>({});
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [filterState, setFilterState] = useState<ConceptMapFilterState>({
    status: 'all',
    subjectId: 'all',
    searchQuery: '',
  });

  const updateFilterState = useCallback((filters: Partial<ConceptMapFilterState>) => {
    setFilterState((prev) => ({ ...prev, ...filters }));
  }, []);

  const loadData = useCallback(async () => {
    try {
      setIsLoading(true);
      const [mapsList, today, prog, bmarks] = await Promise.all([
        conceptMapRepository.getAllMaps(),
        conceptMapRepository.getTodayMap(),
        conceptMapRepository.getAllProgress(),
        conceptMapRepository.getBookmarks(),
      ]);

      setAllMaps(mapsList);
      setTodayMap(today);
      setProgressMap(prog);
      setBookmarks(bmarks);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const filteredMaps = useMemo(() => {
    return filterConceptMaps(allMaps, filterState, progressMap, bookmarks);
  }, [allMaps, filterState, progressMap, bookmarks]);

  const recentMap = useMemo(() => {
    return getRecentlyViewedMap(allMaps, progressMap);
  }, [allMaps, progressMap]);

  const recommendedMaps = useMemo(() => {
    return getRecommendedConceptMaps(allMaps, progressMap, 4);
  }, [allMaps, progressMap]);

  const summary = useMemo(() => {
    return calculateConceptMapsSummary(allMaps, progressMap);
  }, [allMaps, progressMap]);

  const toggleBookmark = useCallback(async (mapId: string) => {
    const isNowBookmarked = await conceptMapRepository.toggleBookmark(mapId);
    setBookmarks((prev) => {
      const set = new Set(prev);
      if (isNowBookmarked) set.add(mapId);
      else set.delete(mapId);
      return Array.from(set);
    });
    setProgressMap((prev) => ({
      ...prev,
      [mapId]: {
        ...(prev[mapId] || {
          mapId,
          exploredNodeIds: [],
          status: 'not_started',
          progressPercent: 0,
        }),
        bookmarked: isNowBookmarked,
      },
    }));
    return isNowBookmarked;
  }, []);

  return {
    allMaps,
    filteredMaps,
    todayMap,
    recentMap,
    recommendedMaps,
    summary,
    progressMap,
    bookmarks,
    filterState,
    setFilterState: updateFilterState,
    toggleBookmark,
    isLoading,
    refresh: loadData,
  };
}

export function useConceptMapDetail(mapId: string) {
  const [map, setMap] = useState<ConceptMap | null>(null);
  const [progress, setProgress] = useState<ConceptMapProgress | null>(null);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<ConceptViewMode>('canvas');
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  const [isBookmarkedState, setIsBookmarkedState] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const loadMap = useCallback(async () => {
    try {
      setIsLoading(true);
      const [m, p, bmarks] = await Promise.all([
        conceptMapRepository.getMapById(mapId),
        conceptMapRepository.getProgress(mapId),
        conceptMapRepository.getBookmarks(),
      ]);

      setMap(m);
      setProgress(p);
      setIsBookmarkedState(p?.bookmarked || bmarks.includes(mapId));

      // Initial node selection: restore last selected, or root node, or first node
      const rootNode = m?.nodes.find((n) => n.type === 'root') || m?.nodes[0];
      const initialNodeId = p?.lastSelectedNodeId || rootNode?.id || null;
      setSelectedNodeId(initialNodeId);

      // Auto-initialize progress record and register the root node as explored
      if (m && !p) {
        const exploredIds = initialNodeId ? [initialNodeId] : [];
        const { progressPercent, isCompleted } = calculateConceptMapProgress(m, exploredIds);
        const initialProgress: ConceptMapProgress = {
          mapId,
          exploredNodeIds: exploredIds,
          progressPercent,
          status: isCompleted ? 'completed' : 'in_progress',
          completed: isCompleted,
          startedAt: Date.now(),
          lastSelectedNodeId: initialNodeId || undefined,
          bookmarked: bmarks.includes(mapId),
        };
        await conceptMapRepository.saveProgress(initialProgress);
        setProgress(initialProgress);
      }
    } finally {
      setIsLoading(false);
    }
  }, [mapId]);

  useEffect(() => {
    loadMap();
  }, [loadMap]);

  const selectNode = useCallback((nodeId: string | null) => {
    setSelectedNodeId(nodeId);
  }, []);

  const exploreNode = useCallback(
    async (nodeId: string) => {
      if (!map) return;
      setSelectedNodeId(nodeId);
      const updated = await conceptMapRepository.exploreNode(map.id, nodeId);
      if (updated) {
        const wasCompleted = progress?.status === 'completed' || progress?.completed;
        setProgress(updated);
        if ((updated.status === 'completed' || updated.completed) && !wasCompleted) {
          setShowCompletionModal(true);
        }
      }
    },
    [map, progress]
  );

  const toggleViewMode = useCallback(() => {
    setViewMode((prev) => (prev === 'canvas' ? 'list' : 'canvas'));
  }, []);

  const dismissCompletion = useCallback(() => {
    setShowCompletionModal(false);
  }, []);

  const toggleBookmark = useCallback(async () => {
    if (!mapId) return false;
    const res = await conceptMapRepository.toggleBookmark(mapId);
    setIsBookmarkedState(res);
    setProgress((prev) => (prev ? { ...prev, bookmarked: res } : null));
    return res;
  }, [mapId]);

  const resetProgress = useCallback(async () => {
    if (!mapId || !map) return false;
    const res = await conceptMapRepository.resetProgress(mapId);
    if (res) {
      const rootNode = map.nodes.find((n) => n.type === 'root') || map.nodes[0];
      const resetState: ConceptMapProgress = {
        mapId,
        exploredNodeIds: rootNode ? [rootNode.id] : [],
        progressPercent: 0,
        status: 'in_progress',
        completed: false,
        startedAt: Date.now(),
        lastSelectedNodeId: rootNode?.id,
        bookmarked: isBookmarkedState,
      };
      await conceptMapRepository.saveProgress(resetState);
      setProgress(resetState);
      setSelectedNodeId(rootNode?.id || null);
    }
    return res;
  }, [mapId, map, isBookmarkedState]);

  const completeMap = useCallback(async () => {
    if (!map) return { ok: false, xpAwarded: 0, alreadyCompleted: false };
    const res = await conceptMapRepository.completeMap(map.id);
    const updated = await conceptMapRepository.getProgress(map.id);
    if (updated) setProgress(updated);
    return res;
  }, [map]);

  const selectedNode = useMemo<ConceptMapNode | null>(() => {
    if (!map || !selectedNodeId) return null;
    return map.nodes.find((n) => n.id === selectedNodeId) || null;
  }, [map, selectedNodeId]);

  const connectedNodes = useMemo<ConceptMapNode[]>(() => {
    if (!map || !selectedNodeId) return [];
    const connectedIds = new Set<string>();

    map.connections.forEach((c) => {
      if (c.fromNodeId === selectedNodeId) connectedIds.add(c.toNodeId);
      if (c.toNodeId === selectedNodeId) connectedIds.add(c.fromNodeId);
    });

    return map.nodes.filter((n) => connectedIds.has(n.id));
  }, [map, selectedNodeId]);

  return {
    map,
    progress,
    selectedNode,
    selectedNodeId,
    connectedNodes,
    viewMode,
    showCompletionModal,
    isBookmarked: isBookmarkedState,
    selectNode,
    exploreNode,
    toggleViewMode,
    dismissCompletion,
    toggleBookmark,
    resetProgress,
    completeMap,
    isLoading,
    refresh: loadMap,
  };
}

