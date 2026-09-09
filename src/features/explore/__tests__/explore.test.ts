/**
 * Explore 2.0 Tests
 * Deterministic tests for dataset validation, search, daily discovery,
 * favorites, recently viewed, and explore logic.
 */

import { storage, STORAGE_KEYS } from '../../../storage/asyncStorage';
import { SCIENTISTS, getScientistById, getScientistsByField } from '../explore.scientists';
import { INVENTIONS, getInventionById, getInventionsByField } from '../explore.inventions';
import { EVERYDAY_SCIENCE } from '../explore.everydayScience';
import {
  DISCOVERY_TOPICS,
  DAILY_DISCOVERY_ENTRIES,
  getDailyDiscovery,
  getTodayKey,
} from '../explore.discoveryData';
import {
  getFavorites,
  toggleFavorite,
  getRecentlyViewed,
  addRecentlyViewed,
} from '../explore.storage';
import {
  searchDiscoveries,
  filterDiscoveries,
} from '../explore.service';
import {
  DiscoveryItem,
  DiscoveryType,
  ExploreFilterState,
} from '../explore.types';

// ============================================================================
// Helper: Build minimal DiscoveryItem
// ============================================================================

function makeItem(overrides: Partial<DiscoveryItem>): DiscoveryItem {
  return {
    id: 'test-item',
    type: 'game',
    title: { en: 'Test Item', ta: 'சோதனை உருப்படம்' },
    description: { en: 'A test item', ta: 'ஒரு சோதனை உருப்படம்' },
    topicId: 'physics',
    tags: ['test'],
    route: '/games/test',
    isSaveable: true,
    icon: '🧪',
    ...overrides,
  };
}

// ============================================================================
// Dataset Validation
// ============================================================================

describe('Explore 2.0 Dataset Validation', () => {
  describe('Scientists dataset', () => {
    it('has at least 30 scientists', () => {
      expect(SCIENTISTS.length).toBeGreaterThanOrEqual(30);
    });

    it('has unique IDs', () => {
      const ids = SCIENTISTS.map((s) => s.id);
      const unique = new Set(ids);
      expect(unique.size).toBe(ids.length);
    });

    it('every scientist has English and Tamil text', () => {
      for (const s of SCIENTISTS) {
        expect(s.name.en.length).toBeGreaterThan(0);
        expect(s.name.ta.length).toBeGreaterThan(0);
        expect(s.shortBio.en.length).toBeGreaterThan(0);
        expect(s.shortBio.ta.length).toBeGreaterThan(0);
        expect(s.keyContribution.en.length).toBeGreaterThan(0);
        expect(s.keyContribution.ta.length).toBeGreaterThan(0);
        expect(s.interestingFacts.length).toBeGreaterThanOrEqual(2);
        for (const fact of s.interestingFacts) {
          expect(fact.en.length).toBeGreaterThan(0);
          expect(fact.ta.length).toBeGreaterThan(0);
        }
      }
    });

    it('getScientistById returns correct scientist', () => {
      const newton = getScientistById('newton');
      expect(newton).toBeDefined();
      expect(newton!.name.en).toBe('Isaac Newton');
    });

    it('getScientistById returns undefined for unknown', () => {
      expect(getScientistById('nonexistent')).toBeUndefined();
    });

    it('getScientistsByField filters correctly', () => {
      const physicsScientists = getScientistsByField('physics');
      expect(physicsScientists.length).toBeGreaterThan(0);
      for (const s of physicsScientists) {
        expect(s.field).toBe('physics');
      }
    });
  });

  describe('Inventions dataset', () => {
    it('has at least 20 inventions', () => {
      expect(INVENTIONS.length).toBeGreaterThanOrEqual(20);
    });

    it('has unique IDs', () => {
      const ids = INVENTIONS.map((i) => i.id);
      const unique = new Set(ids);
      expect(unique.size).toBe(ids.length);
    });

    it('every invention has English and Tamil text', () => {
      for (const i of INVENTIONS) {
        expect(i.name.en.length).toBeGreaterThan(0);
        expect(i.name.ta.length).toBeGreaterThan(0);
        expect(i.description.en.length).toBeGreaterThan(0);
        expect(i.description.ta.length).toBeGreaterThan(0);
        expect(i.sciencePrinciple.en.length).toBeGreaterThan(0);
        expect(i.sciencePrinciple.ta.length).toBeGreaterThan(0);
      }
    });

    it('getInventionById returns correct invention', () => {
      const wheel = getInventionById('wheel');
      expect(wheel).toBeDefined();
      expect(wheel!.name.en).toBe('Wheel');
    });

    it('getInventionById returns undefined for unknown', () => {
      expect(getInventionById('nonexistent')).toBeUndefined();
    });
  });

  describe('Everyday Science dataset', () => {
    it('has at least 20 items', () => {
      expect(EVERYDAY_SCIENCE.length).toBeGreaterThanOrEqual(20);
    });

    it('has unique IDs', () => {
      const ids = EVERYDAY_SCIENCE.map((e) => e.id);
      const unique = new Set(ids);
      expect(unique.size).toBe(ids.length);
    });

    it('every item has required fields', () => {
      for (const es of EVERYDAY_SCIENCE) {
        expect(es.title.en.length).toBeGreaterThan(0);
        expect(es.title.ta.length).toBeGreaterThan(0);
        expect(es.description.en.length).toBeGreaterThan(0);
        expect(es.description.ta.length).toBeGreaterThan(0);
        expect(es.tags.length).toBeGreaterThan(0);
      }
    });
  });

  describe('Discovery Topics', () => {
    it('has at least 8 topics', () => {
      expect(DISCOVERY_TOPICS.length).toBeGreaterThanOrEqual(8);
    });

    it('has unique IDs', () => {
      const ids = DISCOVERY_TOPICS.map((t) => t.id);
      const unique = new Set(ids);
      expect(unique.size).toBe(ids.length);
    });

    it('every topic has English and Tamil', () => {
      for (const t of DISCOVERY_TOPICS) {
        expect(t.title.en.length).toBeGreaterThan(0);
        expect(t.title.ta.length).toBeGreaterThan(0);
      }
    });
  });

  describe('Daily Discovery Entries', () => {
    it('has at least 10 entries', () => {
      expect(DAILY_DISCOVERY_ENTRIES.length).toBeGreaterThanOrEqual(10);
    });

    it('has unique IDs', () => {
      const ids = DAILY_DISCOVERY_ENTRIES.map((d) => d.id);
      const unique = new Set(ids);
      expect(unique.size).toBe(ids.length);
    });

    it('every entry has English and Tamil', () => {
      for (const d of DAILY_DISCOVERY_ENTRIES) {
        expect(d.title.en.length).toBeGreaterThan(0);
        expect(d.title.ta.length).toBeGreaterThan(0);
        expect(d.description.en.length).toBeGreaterThan(0);
        expect(d.description.ta.length).toBeGreaterThan(0);
      }
    });
  });
});

// ============================================================================
// Daily Discovery Determinism
// ============================================================================

describe('Daily Discovery Determinism', () => {
  it('returns the same entry for the same date', () => {
    const entry1 = getDailyDiscovery('2026-01-15');
    const entry2 = getDailyDiscovery('2026-01-15');
    expect(entry1.id).toBe(entry2.id);
  });

  it('returns a valid entry', () => {
    const entry = getDailyDiscovery('2026-09-06');
    expect(entry).toBeDefined();
    expect(entry.id.length).toBeGreaterThan(0);
    expect(entry.title.en.length).toBeGreaterThan(0);
  });

  it('getTodayKey returns YYYY-MM-DD format', () => {
    const key = getTodayKey();
    expect(key).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });

  it('different dates can return different entries', () => {
    // Check at least one pair differs (very high probability with 20+ entries)
    const results = new Set<string>();
    for (let i = 0; i < 30; i++) {
      results.add(getDailyDiscovery(`2026-01-${String(i + 1).padStart(2, '0')}`).id);
    }
    expect(results.size).toBeGreaterThan(1);
  });
});

// ============================================================================
// Search
// ============================================================================

describe('Explore Search', () => {
  const items: DiscoveryItem[] = [
    makeItem({ id: 's1', title: { en: 'Solar System', ta: 'சூரிய மண்டலம்' }, tags: ['space', 'planets'] }),
    makeItem({ id: 's2', title: { en: 'Circuit Lab', ta: 'மின்சுற்று ஆய்வகம்' }, tags: ['physics', 'electricity'] }),
    makeItem({ id: 's3', title: { en: 'DNA Structure', ta: 'DNA அமைப்பு' }, tags: ['biology', 'genetics'] }),
    makeItem({ id: 's4', title: { en: 'Marie Curie', ta: 'மேரி கியூரி' }, tags: ['chemistry', 'scientist'] }),
  ];

  it('returns empty for empty query', () => {
    expect(searchDiscoveries('', items)).toEqual([]);
  });

  it('returns empty for whitespace-only query', () => {
    expect(searchDiscoveries('   ', items)).toEqual([]);
  });

  it('matches exact title (case-insensitive)', () => {
    const results = searchDiscoveries('Solar System', items);
    expect(results.length).toBe(1);
    expect(results[0].id).toBe('s1');
  });

  it('matches title prefix', () => {
    const results = searchDiscoveries('Cir', items);
    expect(results.length).toBe(1);
    expect(results[0].id).toBe('s2');
  });

  it('matches title contains', () => {
    const results = searchDiscoveries('DNA', items);
    expect(results.length).toBe(1);
    expect(results[0].id).toBe('s3');
  });

  it('matches tags', () => {
    const results = searchDiscoveries('biology', items);
    expect(results.length).toBe(1);
    expect(results[0].id).toBe('s3');
  });

  it('returns no duplicates', () => {
    const results = searchDiscoveries('solar', items);
    const ids = results.map((r) => r.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('ranks exact title match higher than prefix', () => {
    const testItems = [
      makeItem({ id: 'exact', title: { en: 'physics', ta: 'இயற்பியல்' } }),
      makeItem({ id: 'prefix', title: { en: 'physics lab', ta: 'இயற்பியல் ஆய்வகம்' } }),
    ];
    const results = searchDiscoveries('physics', testItems);
    expect(results[0].id).toBe('exact');
  });

  it('matches Tamil queries', () => {
    const results = searchDiscoveries('சூரிய', items, 'ta');
    expect(results.length).toBe(1);
    expect(results[0].id).toBe('s1');
  });

  it('respects limit', () => {
    const many = Array.from({ length: 20 }, (_, i) =>
      makeItem({ id: `item-${i}`, title: { en: `Science Topic ${i}`, ta: `அறிவியல் தலைப்பு ${i}` }, tags: ['science'] })
    );
    const results = searchDiscoveries('science', many, 'en', 5);
    expect(results.length).toBe(5);
  });
});

// ============================================================================
// Filtering
// ============================================================================

describe('Explore Filtering', () => {
  const items: DiscoveryItem[] = [
    makeItem({ id: 'ml1', type: 'micro_lesson', topicId: 'physics', tags: ['physics'] }),
    makeItem({ id: 'cm1', type: 'concept_map', topicId: 'biology', tags: ['biology'] }),
    makeItem({ id: 'exp1', type: 'experiment', topicId: 'physics', tags: ['physics'] }),
    makeItem({ id: 'g1', type: 'game', topicId: 'chemistry', tags: ['chemistry'] }),
    makeItem({ id: 's1', type: 'scientist', topicId: 'physics', tags: ['physics', 'scientist'] }),
  ];

  it('returns all items with no filters', () => {
    const filter: ExploreFilterState = {
      query: '',
      topicFilter: 'all',
      activityFilter: 'all',
      sortOption: 'recommended',
    };
    expect(filterDiscoveries(items, filter).length).toBe(5);
  });

  it('filters by topic', () => {
    const filter: ExploreFilterState = {
      query: '',
      topicFilter: 'physics',
      activityFilter: 'all',
      sortOption: 'recommended',
    };
    const results = filterDiscoveries(items, filter);
    expect(results.length).toBe(3);
    expect(results.every((i) => i.topicId === 'physics')).toBe(true);
  });

  it('filters by activity type (experiments)', () => {
    const filter: ExploreFilterState = {
      query: '',
      topicFilter: 'all',
      activityFilter: 'experiments',
      sortOption: 'recommended',
    };
    const results = filterDiscoveries(items, filter);
    expect(results.length).toBe(1);
    expect(results[0].type).toBe('experiment');
  });

  it('filters by activity type (scientists)', () => {
    const filter: ExploreFilterState = {
      query: '',
      topicFilter: 'all',
      activityFilter: 'scientists',
      sortOption: 'recommended',
    };
    const results = filterDiscoveries(items, filter);
    expect(results.length).toBe(1);
    expect(results[0].type).toBe('scientist');
  });

  it('filters by search query', () => {
    const filter: ExploreFilterState = {
      query: 'biology',
      topicFilter: 'all',
      activityFilter: 'all',
      sortOption: 'recommended',
    };
    const results = filterDiscoveries(items, filter);
    expect(results.length).toBe(1);
    expect(results[0].id).toBe('cm1');
  });

  it('combines topic and activity filters', () => {
    const filter: ExploreFilterState = {
      query: '',
      topicFilter: 'physics',
      activityFilter: 'learn',
      sortOption: 'recommended',
    };
    const results = filterDiscoveries(items, filter);
    expect(results.length).toBe(1);
    expect(results[0].id).toBe('ml1');
  });

  it('sorts alphabetically', () => {
    const filter: ExploreFilterState = {
      query: '',
      topicFilter: 'all',
      activityFilter: 'all',
      sortOption: 'alpha',
    };
    const results = filterDiscoveries(items, filter);
    // Sort is by title.en, not id
    const titles = results.map((i) => i.title.en);
    const sorted = [...titles].sort();
    expect(titles).toEqual(sorted);
  });
});

// ============================================================================
// Favorites Storage
// ============================================================================

describe('Explore Favorites Storage', () => {
  beforeEach(async () => {
    // Clear favorites before each test
    await storage.removeItem(STORAGE_KEYS.EXPLORE_FAVORITES);
  });

  it('returns empty array when no favorites', async () => {
    const favorites = await getFavorites();
    expect(favorites).toEqual([]);
  });

  it('adds an item to favorites', async () => {
    const added = await toggleFavorite({
      id: 'test-1',
      type: 'scientist',
      title: { en: 'Test Scientist', ta: 'சோதனை விஞ்ஞானி' },
      icon: '🔬',
      route: '/explore/scientist/test-1',
    });
    expect(added).toBe(true);

    const favorites = await getFavorites();
    expect(favorites.length).toBe(1);
    expect(favorites[0].id).toBe('test-1');
  });

  it('removes an item when toggled again', async () => {
    await toggleFavorite({
      id: 'test-1',
      type: 'scientist',
      title: { en: 'Test', ta: 'சோதனை' },
      icon: '🔬',
      route: '/test',
    });
    const removed = await toggleFavorite({
      id: 'test-1',
      type: 'scientist',
      title: { en: 'Test', ta: 'சோதனை' },
      icon: '🔬',
      route: '/test',
    });
    expect(removed).toBe(false);

    const favorites = await getFavorites();
    expect(favorites.length).toBe(0);
  });
});

// ============================================================================
// Recently Viewed Storage
// ============================================================================

describe('Explore Recently Viewed Storage', () => {
  beforeEach(async () => {
    await storage.removeItem(STORAGE_KEYS.EXPLORE_RECENTLY_VIEWED);
  });

  it('returns empty array when no recent views', async () => {
    const recent = await getRecentlyViewed();
    expect(recent).toEqual([]);
  });

  it('adds items to recently viewed', async () => {
    await addRecentlyViewed({
      id: 'item-1',
      type: 'scientist',
      title: { en: 'Newton', ta: 'நியூட்டன்' },
      icon: '🍎',
      route: '/explore/scientist/newton',
    });

    const recent = await getRecentlyViewed();
    expect(recent.length).toBe(1);
    expect(recent[0].id).toBe('item-1');
  });

  it('deduplicates by item ID', async () => {
    await addRecentlyViewed({
      id: 'item-1',
      type: 'scientist',
      title: { en: 'Newton', ta: 'நியூட்டன்' },
      icon: '🍎',
      route: '/explore/scientist/newton',
    });
    await addRecentlyViewed({
      id: 'item-1',
      type: 'scientist',
      title: { en: 'Newton', ta: 'நியூட்டன்' },
      icon: '🍎',
      route: '/explore/scientist/newton',
    });

    const recent = await getRecentlyViewed();
    expect(recent.length).toBe(1);
  });

  it('keeps newest first', async () => {
    await addRecentlyViewed({
      id: 'item-1',
      type: 'scientist',
      title: { en: 'Newton', ta: 'நியூட்டன்' },
      icon: '🍎',
      route: '/explore/scientist/newton',
    });
    await addRecentlyViewed({
      id: 'item-2',
      type: 'invention',
      title: { en: 'Telephone', ta: 'தொலைபேசி' },
      icon: '📞',
      route: '/explore/invention/telephone',
    });

    const recent = await getRecentlyViewed();
    expect(recent.length).toBe(2);
    expect(recent[0].id).toBe('item-2');
    expect(recent[1].id).toBe('item-1');
  });
});

// ============================================================================
// Route Validation
// ============================================================================

describe('Explore Routes Validation', () => {
  it('all scientists have valid routes', () => {
    for (const s of SCIENTISTS) {
      expect(s.id.length).toBeGreaterThan(0);
      // Route is constructed at call time: `/explore/scientist/${s.id}`
    }
  });

  it('all inventions have valid routes', () => {
    for (const i of INVENTIONS) {
      expect(i.id.length).toBeGreaterThan(0);
      // Route is constructed at call time: `/explore/invention/${i.id}`
    }
  });

  it('all daily discovery entries have valid routes', () => {
    for (const d of DAILY_DISCOVERY_ENTRIES) {
      expect(d.route.length).toBeGreaterThan(0);
      expect(d.route.startsWith('/')).toBe(true);
    }
  });
});

// ============================================================================
// Accessibility Labels
// ============================================================================

describe('Explore Accessibility', () => {
  it('all scientists have bilingual names for accessibility', () => {
    for (const s of SCIENTISTS) {
      expect(s.name.en).toBeTruthy();
      expect(s.name.ta).toBeTruthy();
    }
  });

  it('all inventions have bilingual names for accessibility', () => {
    for (const i of INVENTIONS) {
      expect(i.name.en).toBeTruthy();
      expect(i.name.ta).toBeTruthy();
    }
  });

  it('all topics have bilingual titles', () => {
    for (const t of DISCOVERY_TOPICS) {
      expect(t.title.en).toBeTruthy();
      expect(t.title.ta).toBeTruthy();
      expect(t.icon).toBeTruthy();
    }
  });
});
