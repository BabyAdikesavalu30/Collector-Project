/**
 * Search Feature Tests
 * Normalization, bilingual matching, ranking, filters, and recents.
 */

import { storage, STORAGE_KEYS } from '../../../storage/asyncStorage';
import { normalizeText, scoreItem, searchCatalog } from '../search.engine';
import { buildSearchIndex } from '../search.indexer';
import { addRecentSearch, getRecentSearches, clearRecentSearches } from '../search.storage';
import { SearchIndex, SearchItem } from '../search.types';

function makeItem(overrides: Partial<SearchItem>): SearchItem {
  return {
    id: 'i1',
    category: 'game',
    title: 'Circuit Lab',
    titleTa: 'மின்சுற்று ஆய்வகம்',
    subtitle: 'Build the circuit',
    subtitleTa: 'மின்சுற்றை உருவாக்குங்கள்',
    route: '/games/circuit-lab',
    icon: '💡',
    tags: ['physics', 'electricity', 'circuits'],
    categoryLabel: 'Game',
    categoryLabelTa: 'விளையாட்டு',
    ...overrides,
  };
}

describe('normalizeText', () => {
  it('lowercases, trims, and collapses whitespace', () => {
    expect(normalizeText('  CIRCUIT   Lab ')).toBe('circuit lab');
  });

  it('strips punctuation', () => {
    expect(normalizeText("What's up?")).toBe('whats up');
  });

  it('keeps Tamil characters intact', () => {
    expect(normalizeText('மின்சுற்று ஆய்வகம்')).toBe('மின்சுற்று ஆய்வகம்');
  });
});

describe('scoreItem', () => {
  it('gives exact title matches the highest score', () => {
    const item = makeItem({});
    expect(scoreItem(item, 'circuit lab')).toBe(100);
  });

  it('matches prefix titles at 80', () => {
    const item = makeItem({});
    expect(scoreItem(item, 'circuit')).toBe(80);
  });

  it('matches Tamil titles', () => {
    const item = makeItem({});
    // Prefix match on the Tamil title scores 80 (below exact full-title 100).
    expect(scoreItem(item, 'மின்சுற்று', 'ta')).toBe(80);
    expect(scoreItem(item, 'மின்சுற்று', 'en')).toBe(80); // other language always searched too
  });

  it('matches tags with a lower score', () => {
    const item = makeItem({});
    const tagScore = scoreItem(item, 'physics');
    expect(tagScore).toBeGreaterThan(0);
    expect(tagScore).toBeLessThan(80);
  });

  it('returns zero for unrelated queries', () => {
    const item = makeItem({});
    expect(scoreItem(item, 'banana')).toBe(0);
  });
});

describe('searchCatalog', () => {
  const index: SearchIndex = {
    items: [
      makeItem({ id: 'g1' }),
      makeItem({
        id: 'f1',
        category: 'fact',
        title: 'Water Freezes',
        titleTa: 'நீர் உறைகிறது',
        subtitle: 'A freezing fact',
        subtitleTa: 'உறைதல் தகவல்',
        tags: ['chemistry'],
      }),
      makeItem({
        id: 'r1',
        category: 'riddle',
        title: 'What Am I?',
        titleTa: 'நான் யார்?',
        subtitle: 'A tricky brain teaser',
        subtitleTa: 'கடின மூளை புதிர்',
        tags: ['brain'],
      }),
    ],
    suggestedQueries: ['Physics'],
  };

  it('returns an empty list for an empty query', () => {
    expect(searchCatalog(index, { query: '' })).toEqual([]);
  });

  it('ranks title matches first', () => {
    const results = searchCatalog(index, { query: 'circuit' });
    expect(results.length).toBe(1);
    expect(results[0].item.id).toBe('g1');
  });

  it('filters by category', () => {
    const results = searchCatalog(index, { query: 'water', categories: ['fact'] });
    expect(results.length).toBe(1);
    expect(results[0].item.id).toBe('f1');
    const blocked = searchCatalog(index, { query: 'water', categories: ['game'] });
    expect(blocked.length).toBe(0);
  });

  it('matches Tamil queries', () => {
    const results = searchCatalog(index, { query: 'நீர்', language: 'ta' });
    expect(results.some((r) => r.item.id === 'f1')).toBe(true);
  });

  it('respects the result limit', () => {
    const many: SearchIndex = {
      items: Array.from({ length: 10 }, (_, i) => makeItem({ id: `g${i}`, title: `Game ${i}` })),
      suggestedQueries: [],
    };
    const results = searchCatalog(many, { query: 'game', limit: 3 });
    expect(results.length).toBe(3);
  });
});

describe('buildSearchIndex', () => {
  it('includes games, riddles, facts, mysteries, achievements, collections, and certificates', () => {
    const index = buildSearchIndex([
      {
        id: 'cert-1',
        kind: 'milestone',
        title: { en: 'Science Master', ta: 'அறிவியல் மேதை' },
        subtitle: { en: 'Sub', ta: 'Sub' },
        recipientName: 'Anu',
        grade: '8',
        location: 'Chennai',
        dateEarned: Date.now(),
        achievementsCount: 3,
        certificateNumber: 'VIG-2026-0001',
      },
    ]);
    const categories = new Set(index.items.map((i) => i.category));
    expect(categories.has('game')).toBe(true);
    expect(categories.has('riddle')).toBe(true);
    expect(categories.has('fact')).toBe(true);
    expect(categories.has('mystery')).toBe(true);
    expect(categories.has('achievement')).toBe(true);
    expect(categories.has('certificate')).toBe(true);
    expect(categories.has('collection')).toBe(true);
  });
});

describe('recent searches storage', () => {
  beforeEach(async () => {
    await clearRecentSearches();
  });

  it('stores recents newest-first and deduped', async () => {
    await addRecentSearch('Physics');
    await addRecentSearch('chemistry');
    await addRecentSearch('Physics'); // dedupe, moves to front
    const recents = await getRecentSearches();
    expect(recents).toEqual(['Physics', 'chemistry']);
  });

  it('caps the number of stored queries', async () => {
    for (let i = 0; i < 20; i += 1) {
      await addRecentSearch(`query-${i}`);
    }
    const recents = await getRecentSearches();
    expect(recents.length).toBeLessThanOrEqual(8);
  });

  it('clears history', async () => {
    await addRecentSearch('Physics');
    await clearRecentSearches();
    expect(await getRecentSearches()).toEqual([]);
  });
});