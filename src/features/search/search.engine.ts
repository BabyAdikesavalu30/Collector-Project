/**
 * Search Feature Engine
 * Pure, testable text normalization, matching, and ranking. Supports
 * English and Tamil (Tamil has no case, so normalization is Unicode-safe
 * lowercasing plus whitespace/punctuation cleanup).
 */

import { SearchCategory, SearchIndex, SearchItem, SearchResult } from './search.types';

/** Normalized lowercase query/index text. */
export function normalizeText(input: string): string {
  return input
    .toLowerCase()
    .replace(/[\u0300-\u036f]/g, '') // strip diacritics
    .replace(/[^a-z0-9\u0B80-\u0BFF\s]/g, '') // keep letters, digits, Tamil, spaces (delete punctuation)
    .replace(/\s+/g, ' ')
    .trim();
}

/** Splits normalized text into tokens (English words + Tamil words). */
export function tokenizeText(input: string): string[] {
  const normalized = normalizeText(input);
  if (!normalized) return [];
  return normalized.split(' ').filter(Boolean);
}

const SEARCHABLE_FIELDS: Array<'title' | 'subtitle' | 'tags' | 'category'> = [
  'title',
  'subtitle',
  'tags',
  'category',
];

/**
 * Ranks an item against a query across EN + TA fields.
 * Exact/prefix title matches outrank substring and tag matches.
 */
export function scoreItem(item: SearchItem, query: string, language: 'en' | 'ta' = 'en'): number {
  const q = normalizeText(query);
  if (!q) return 0;

  const normTitle = language === 'ta'
    ? (item._normTitleTa ?? normalizeText(item.titleTa))
    : (item._normTitleEn ?? normalizeText(item.title));
  const normSubtitle = language === 'ta'
    ? (item._normSubtitleTa ?? normalizeText(item.subtitleTa))
    : (item._normSubtitleEn ?? normalizeText(item.subtitle));
  const normTags = item._normTags ?? normalizeText(item.tags.join(' '));
  const normCategory = language === 'ta'
    ? (item._normCategoryTa ?? normalizeText(item.categoryLabelTa))
    : (item._normCategoryEn ?? normalizeText(item.categoryLabel));

  const altNormTitle = language === 'ta'
    ? (item._normTitleEn ?? normalizeText(item.title))
    : (item._normTitleTa ?? normalizeText(item.titleTa));
  const altNormSubtitle = language === 'ta'
    ? (item._normSubtitleEn ?? normalizeText(item.subtitle))
    : (item._normSubtitleTa ?? normalizeText(item.subtitleTa));
  const altNormCategory = language === 'ta'
    ? (item._normCategoryEn ?? normalizeText(item.categoryLabel))
    : (item._normCategoryTa ?? normalizeText(item.categoryLabelTa));

  const normFields: Record<'title' | 'subtitle' | 'tags' | 'category', string> = {
    title: normTitle,
    subtitle: normSubtitle,
    tags: normTags,
    category: normCategory,
  };

  const altNormFields: Record<'title' | 'subtitle' | 'tags' | 'category', string> = {
    title: altNormTitle,
    subtitle: altNormSubtitle,
    tags: normTags,
    category: altNormCategory,
  };

  let bestScore = 0;
  for (const field of SEARCHABLE_FIELDS) {
    const value = normFields[field];
    const altValue = altNormFields[field];
    // Tags only score via token matches so a tag cannot outrank a title.
    const score = field === 'tags' ? tagFieldScore(value, altValue, q) : fieldScore(value, altValue, q);
    if (score > bestScore) bestScore = score;
  }
  return bestScore;
}

function tagFieldScore(value: string, altValue: string, q: string): number {
  let best = 0;
  for (const candidate of [value, altValue]) {
    if (!candidate) continue;
    const tokens = tokenizeText(candidate);
    if (tokens.some((t) => t === q)) best = Math.max(best, 75);
    else if (tokens.some((t) => t.startsWith(q))) best = Math.max(best, 55);
    else if (tokens.some((t) => t.includes(q))) best = Math.max(best, 40);
  }
  return best;
}

function fieldScore(value: string, altValue: string, q: string): number {
  const candidates = [value, altValue].filter((v) => v.length > 0);
  let best = 0;
  for (const candidate of candidates) {
    if (candidate === q) best = Math.max(best, 100);
    else if (candidate.startsWith(q)) best = Math.max(best, 80);
    else if (candidate.includes(q)) best = Math.max(best, 60);
    else {
      // Token-level match (e.g. "maze" inside "magnet maze").
      const tokens = tokenizeText(candidate);
      if (tokens.some((t) => t === q)) best = Math.max(best, 75);
      else if (tokens.some((t) => t.startsWith(q))) best = Math.max(best, 55);
      else if (tokens.some((t) => t.includes(q))) best = Math.max(best, 40);
    }
  }
  return best;
}

export interface SearchOptions {
  query: string;
  categories?: SearchCategory[];
  language?: 'en' | 'ta';
  limit?: number;
}

/** Filters + ranks the catalog. Pure and deterministic. */
export function searchCatalog(
  index: SearchIndex,
  options: SearchOptions
): SearchResult[] {
  const { query, categories, language = 'en', limit = 50 } = options;
  const q = normalizeText(query);
  if (!q) return [];

  const categorySet = categories && categories.length > 0 ? new Set(categories) : null;

  const results: SearchResult[] = [];
  for (const item of index.items) {
    if (categorySet && !categorySet.has(item.category)) continue;
    const score = scoreItem(item, q, language);
    if (score <= 0) continue;

    let matchedField: SearchResult['matchedField'] = 'title';
    for (const field of SEARCHABLE_FIELDS) {
      const fieldScoreValue = scoreFieldFor(item, field, q, language);
      if (fieldScoreValue >= 40) {
        matchedField = field;
        break;
      }
    }
    results.push({ item, score, matchedField });
  }

  results.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return a.item.title.localeCompare(b.item.title);
  });

  return results.slice(0, limit);
}

function scoreFieldFor(
  item: SearchItem,
  field: 'title' | 'subtitle' | 'tags' | 'category',
  q: string,
  language: 'en' | 'ta'
): number {
  const enValue = normalizeText(
    field === 'title' ? item.title : field === 'subtitle' ? item.subtitle : field === 'tags' ? item.tags.join(' ') : item.categoryLabel
  );
  const taValue = normalizeText(
    field === 'title' ? item.titleTa : field === 'subtitle' ? item.subtitleTa : field === 'tags' ? item.tags.join(' ') : item.categoryLabelTa
  );
  return fieldScore(enValue, taValue, q);
}

/** Deterministic suggested queries shown before the student types. */
export function getSuggestedQueries(language: 'en' | 'ta' = 'en'): string[] {
  return language === 'ta'
    ? ['அறிவியல்', 'வேதியியல்', 'விண்வெளி', 'மின்சுற்று', 'டி.என்.ஏ']
    : ['Physics', 'Chemistry', 'Space', 'Circuit', 'DNA', 'Quiz'];
}