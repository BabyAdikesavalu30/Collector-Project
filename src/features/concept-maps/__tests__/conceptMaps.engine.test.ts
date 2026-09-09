/**
 * Concept Maps Engine Unit Tests
 */

import { CONCEPT_MAPS } from '../conceptMaps.data';
import {
  getLocalDateKey,
  getTodayConceptMap,
  filterConceptMaps,
  calculateConceptMapProgress,
  calculateConceptMapsSummary,
  getRecentlyViewedMap,
  getRecommendedConceptMaps,
  calculateMapViewport,
} from '../conceptMaps.engine';
import {
  ConceptMapProgress,
  ConceptMapFilterState,
} from '../conceptMaps.types';

describe('Concept Maps Engine', () => {
  describe('getTodayConceptMap', () => {
    it('returns a deterministic concept map for any given date key', () => {
      const pick1 = getTodayConceptMap(CONCEPT_MAPS, '2026-09-05');
      const pick2 = getTodayConceptMap(CONCEPT_MAPS, '2026-09-05');

      expect(pick1).not.toBeNull();
      expect(pick2).not.toBeNull();
      expect(pick1.id).toBe(pick2.id);
    });

    it('returns different maps on different days as hash advances', () => {
      const pickA = getTodayConceptMap(CONCEPT_MAPS, '2026-01-01');
      const pickB = getTodayConceptMap(CONCEPT_MAPS, '2026-01-02');

      expect(pickA).not.toBeNull();
      expect(pickB).not.toBeNull();
      expect(pickA.id).not.toBe(pickB.id);
    });
  });

  describe('filterConceptMaps', () => {
    const progressMap: Record<string, ConceptMapProgress> = {
      'map-force-and-motion': {
        mapId: 'map-force-and-motion',
        exploredNodeIds: ['fnm-force', 'fnm-net-force', 'fnm-inertia', 'fnm-mass', 'fnm-acceleration'],
        progressPercent: 100,
        status: 'completed',
        completed: true,
      },
      'map-energy-and-conservation': {
        mapId: 'map-energy-and-conservation',
        exploredNodeIds: ['ec-energy'],
        progressPercent: 20,
        status: 'in_progress',
        completed: false,
      },
    };
    const bookmarks = ['map-photosynthesis'];

    it('returns all maps when filter state is default', () => {
      const filter: ConceptMapFilterState = {
        status: 'all',
        subjectId: 'all',
        searchQuery: '',
      };
      const result = filterConceptMaps(CONCEPT_MAPS, filter, progressMap, bookmarks);
      expect(result.length).toBe(CONCEPT_MAPS.length);
    });

    it('filters by subject', () => {
      const filter: ConceptMapFilterState = {
        status: 'all',
        subjectId: 'physics',
        searchQuery: '',
      };
      const result = filterConceptMaps(CONCEPT_MAPS, filter, progressMap, bookmarks);
      expect(result.length).toBe(5);
      result.forEach((m) => expect(m.subject).toBe('physics'));
    });

    it('filters by status: completed', () => {
      const filter: ConceptMapFilterState = {
        status: 'completed',
        subjectId: 'all',
        searchQuery: '',
      };
      const result = filterConceptMaps(CONCEPT_MAPS, filter, progressMap, bookmarks);
      expect(result.length).toBe(1);
      expect(result[0].id).toBe('map-force-and-motion');
    });

    it('filters by status: in_progress', () => {
      const filter: ConceptMapFilterState = {
        status: 'in_progress',
        subjectId: 'all',
        searchQuery: '',
      };
      const result = filterConceptMaps(CONCEPT_MAPS, filter, progressMap, bookmarks);
      expect(result.length).toBe(1);
      expect(result[0].id).toBe('map-energy-and-conservation');
    });

    it('filters by status: bookmarked', () => {
      const filter: ConceptMapFilterState = {
        status: 'bookmarked',
        subjectId: 'all',
        searchQuery: '',
      };
      const result = filterConceptMaps(CONCEPT_MAPS, filter, progressMap, bookmarks);
      expect(result.length).toBe(1);
      expect(result[0].id).toBe('map-photosynthesis');
    });

    it('filters by search query matching title or description', () => {
      const filter: ConceptMapFilterState = {
        status: 'all',
        subjectId: 'all',
        searchQuery: 'Newton',
      };
      const result = filterConceptMaps(CONCEPT_MAPS, filter, progressMap, bookmarks);
      expect(result.length).toBeGreaterThanOrEqual(1);
      expect(result[0].id).toBe('map-force-and-motion');
    });

    it('filters by Tamil search query', () => {
      const filter: ConceptMapFilterState = {
        status: 'all',
        subjectId: 'all',
        searchQuery: 'ஒளிச்சேர்க்கை',
      };
      const result = filterConceptMaps(CONCEPT_MAPS, filter, progressMap, bookmarks);
      expect(result.length).toBe(1);
      expect(result[0].id).toBe('map-photosynthesis');
    });
  });

  describe('calculateConceptMapProgress', () => {
    const sampleMap = CONCEPT_MAPS[0]; // map-force-and-motion has 5 key nodes
    const keyNodeIds = sampleMap.nodes.filter((n) => n.keyNode).map((n) => n.id);

    it('calculates 0% when no nodes explored', () => {
      const { progressPercent, isCompleted } = calculateConceptMapProgress(sampleMap, []);
      expect(progressPercent).toBe(0);
      expect(isCompleted).toBe(false);
    });

    it('calculates partial progress when some nodes explored', () => {
      const { progressPercent, isCompleted } = calculateConceptMapProgress(sampleMap, [keyNodeIds[0]]);
      expect(progressPercent).toBeGreaterThan(0);
      expect(progressPercent).toBeLessThan(100);
      expect(isCompleted).toBe(false);
    });

    it('marks completed when all key nodes are explored', () => {
      const { progressPercent, isCompleted } = calculateConceptMapProgress(sampleMap, keyNodeIds);
      expect(progressPercent).toBeGreaterThanOrEqual(60);
      expect(isCompleted).toBe(true);

      const allNodeIds = sampleMap.nodes.map((n) => n.id);
      const fullProgress = calculateConceptMapProgress(sampleMap, allNodeIds);
      expect(fullProgress.progressPercent).toBe(100);
      expect(fullProgress.isCompleted).toBe(true);
    });
  });

  describe('calculateConceptMapsSummary', () => {
    it('accurately computes total, completed, inProgress, and completion percent', () => {
      const id1 = CONCEPT_MAPS[0].id;
      const id2 = CONCEPT_MAPS[1].id;
      const progressMap: Record<string, ConceptMapProgress> = {
        [id1]: { mapId: id1, exploredNodeIds: ['a'], progressPercent: 100, status: 'completed', completed: true },
        [id2]: { mapId: id2, exploredNodeIds: ['b'], progressPercent: 40, status: 'in_progress', completed: false },
      };
      const summary = calculateConceptMapsSummary(CONCEPT_MAPS, progressMap);

      expect(summary.total).toBe(CONCEPT_MAPS.length);
      expect(summary.completed).toBe(1);
      expect(summary.inProgress).toBe(1);
      expect(summary.percent).toBe(Math.round((1 / CONCEPT_MAPS.length) * 100));
    });
  });

  describe('getRecentlyViewedMap', () => {
    it('returns the map with most recent startedAt time that is not completed', () => {
      const progressMap: Record<string, ConceptMapProgress> = {
        'map-force-and-motion': {
          mapId: 'map-force-and-motion',
          exploredNodeIds: ['a'],
          progressPercent: 30,
          status: 'in_progress',
          startedAt: 1000,
        },
        'map-energy-and-conservation': {
          mapId: 'map-energy-and-conservation',
          exploredNodeIds: ['b'],
          progressPercent: 50,
          status: 'in_progress',
          startedAt: 2000,
        },
      };

      const recent = getRecentlyViewedMap(CONCEPT_MAPS, progressMap);
      expect(recent?.id).toBe('map-energy-and-conservation');
    });
  });

  describe('calculateMapViewport', () => {
    it('computes scale and dimensions accommodating container width and height', () => {
      const viewport = calculateMapViewport(CONCEPT_MAPS[0], 360, 600);
      expect(viewport.scale).toBeGreaterThan(0);
      expect(viewport.canvasWidth).toBeGreaterThanOrEqual(300);
      expect(viewport.canvasHeight).toBeGreaterThanOrEqual(400);
    });
  });
});
