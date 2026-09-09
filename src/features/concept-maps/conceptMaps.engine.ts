/**
 * Concept Maps Feature Engine
 * Pure deterministic algorithms for daily map selection, filtering, progress calculation,
 * viewport scaling, and recommendation scoring.
 */

import {
  ConceptMap,
  ConceptMapFilterState,
  ConceptMapProgress,
  ConceptMapSubjectId,
} from './conceptMaps.types';

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
 * Deterministically selects today's featured concept map based on date hash.
 */
export function getTodayConceptMap(
  maps: ConceptMap[],
  dateKey: string = getLocalDateKey()
): ConceptMap {
  if (maps.length === 0) {
    throw new Error('Cannot select daily concept map from an empty catalog');
  }

  let hash = 0;
  for (let i = 0; i < dateKey.length; i++) {
    hash = (hash * 31 + dateKey.charCodeAt(i)) & 0xffffffff;
  }
  const index = Math.abs(hash) % maps.length;
  return maps[index];
}

/**
 * Calculates progress and completion state based on explored key nodes.
 */
export function calculateConceptMapProgress(
  map: ConceptMap,
  exploredNodeIds: string[]
): {
  progressPercent: number;
  isCompleted: boolean;
  exploredCount: number;
  totalCount: number;
  keyNodesExplored: number;
  totalKeyNodes: number;
} {
  const totalCount = map.nodes.length;
  const exploredSet = new Set(exploredNodeIds);
  const exploredCount = map.nodes.filter((n) => exploredSet.has(n.id)).length;

  const keyNodes = map.nodes.filter((n) => n.keyNode);
  const totalKeyNodes = keyNodes.length > 0 ? keyNodes.length : totalCount;
  const keyNodesExplored = keyNodes.filter((n) => exploredSet.has(n.id)).length;

  // Completion criteria: all key nodes explored
  const isCompleted = totalKeyNodes > 0 && keyNodesExplored >= totalKeyNodes;
  const progressPercent = totalCount > 0 ? Math.min(100, Math.round((exploredCount / totalCount) * 100)) : 0;

  return {
    progressPercent,
    isCompleted,
    exploredCount,
    totalCount,
    keyNodesExplored,
    totalKeyNodes,
  };
}

/**
 * Filters the concept maps list by subject tab, status, and search query.
 */
export function filterConceptMaps(
  maps: ConceptMap[],
  filters: ConceptMapFilterState,
  progressMap: Record<string, ConceptMapProgress>,
  bookmarks: string[] = []
): ConceptMap[] {
  const bookmarkSet = new Set(bookmarks);
  const q = filters.searchQuery.trim().toLowerCase();

  return maps.filter((map) => {
    // 1. Subject filter
    if (filters.subjectId !== 'all' && map.subject !== filters.subjectId) {
      return false;
    }

    // 2. Status filter
    const prog = progressMap[map.id];
    const status = prog?.status || 'not_started';
    const isBookmarked = prog?.bookmarked || bookmarkSet.has(map.id);

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

    // 3. Search query (matches title, subtitle, description, tags, or node titles in EN & TA)
    if (q.length > 0) {
      const matchEn =
        map.title.en.toLowerCase().includes(q) ||
        map.subtitle.en.toLowerCase().includes(q) ||
        map.description.en.toLowerCase().includes(q) ||
        map.tags.some((t) => t.toLowerCase().includes(q)) ||
        map.nodes.some((n) => n.title.en.toLowerCase().includes(q) || n.shortLabel.en.toLowerCase().includes(q));

      const matchTa =
        map.title.ta.toLowerCase().includes(q) ||
        map.subtitle.ta.toLowerCase().includes(q) ||
        map.description.ta.toLowerCase().includes(q) ||
        map.nodes.some((n) => n.title.ta.toLowerCase().includes(q) || n.shortLabel.ta.toLowerCase().includes(q));

      if (!matchEn && !matchTa) {
        return false;
      }
    }

    return true;
  });
}

/**
 * Computes overall progress statistics across all maps.
 */
export function calculateConceptMapsSummary(
  maps: ConceptMap[],
  progressMap: Record<string, ConceptMapProgress>
): {
  total: number;
  completed: number;
  inProgress: number;
  percent: number;
} {
  const total = maps.length;
  let completed = 0;
  let inProgress = 0;

  for (const m of maps) {
    const p = progressMap[m.id];
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

/**
 * Returns a recently viewed map that is in progress to continue.
 */
export function getRecentlyViewedMap(
  maps: ConceptMap[],
  progressMap: Record<string, ConceptMapProgress>
): ConceptMap | null {
  const inProgressList = maps
    .filter((m) => {
      const p = progressMap[m.id];
      return p && p.status === 'in_progress' && p.progressPercent < 100;
    })
    .sort((a, b) => {
      const pA = progressMap[a.id];
      const pB = progressMap[b.id];
      return (pB.startedAt || 0) - (pA.startedAt || 0);
    });

  return inProgressList[0] || null;
}

/**
 * Deterministic recommendation engine based on completed subjects.
 */
export function getRecommendedConceptMaps(
  maps: ConceptMap[],
  progressMap: Record<string, ConceptMapProgress>,
  limit = 4
): ConceptMap[] {
  const completedSubjects = new Set<ConceptMapSubjectId>();
  const uncompleted: ConceptMap[] = [];

  for (const m of maps) {
    const p = progressMap[m.id];
    if (p?.status === 'completed') {
      completedSubjects.add(m.subject);
    } else {
      uncompleted.push(m);
    }
  }

  if (uncompleted.length === 0) {
    return maps.slice(0, limit);
  }

  const ranked = [...uncompleted].sort((a, b) => {
    const aFav = completedSubjects.has(a.subject) ? 1 : 0;
    const bFav = completedSubjects.has(b.subject) ? 1 : 0;
    if (aFav !== bFav) return bFav - aFav;
    return a.estimatedMinutes - b.estimatedMinutes;
  });

  return ranked.slice(0, limit);
}

/**
 * Computes responsive viewport bounding and scale factor.
 */
export function calculateMapViewport(
  map: ConceptMap,
  containerWidth: number,
  containerHeight: number
): {
  scale: number;
  offsetX: number;
  offsetY: number;
  canvasWidth: number;
  canvasHeight: number;
} {
  const cWidth = map.canvasWidth || 360;
  const cHeight = map.canvasHeight || 460;

  if (containerWidth <= 0 || containerHeight <= 0) {
    return { scale: 1, offsetX: 0, offsetY: 0, canvasWidth: cWidth, canvasHeight: cHeight };
  }

  // Scale to fit available width with comfortable margins
  const scaleX = (containerWidth - 24) / cWidth;
  const scaleY = (containerHeight - 24) / cHeight;
  const scale = Math.min(1.2, Math.max(0.65, Math.min(scaleX, scaleY)));

  const offsetX = Math.max(0, (containerWidth - cWidth * scale) / 2);
  const offsetY = Math.max(0, (containerHeight - cHeight * scale) / 4);

  return {
    scale,
    offsetX,
    offsetY,
    canvasWidth: cWidth,
    canvasHeight: cHeight,
  };
}
