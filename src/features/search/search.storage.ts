/**
 * Search Feature Storage
 * Persists recent search queries locally (capped, deduped, newest first).
 */

import { storage, STORAGE_KEYS } from '../../storage/asyncStorage';

export const RECENT_SEARCHES_KEY = STORAGE_KEYS.RECENT_SEARCHES;
export const RECENT_SEARCHES_LIMIT = 8;

export async function getRecentSearches(): Promise<string[]> {
  try {
    const list = await storage.getItem<string[]>(RECENT_SEARCHES_KEY);
    if (!Array.isArray(list)) return [];
    return list.filter((q) => typeof q === 'string' && q.trim().length > 0).slice(0, RECENT_SEARCHES_LIMIT);
  } catch {
    return [];
  }
}

export async function addRecentSearch(query: string): Promise<string[]> {
  const trimmed = query.trim();
  if (!trimmed) return getRecentSearches();
  const existing = await getRecentSearches();
  const next = [trimmed, ...existing.filter((q) => q.toLowerCase() !== trimmed.toLowerCase())].slice(
    0,
    RECENT_SEARCHES_LIMIT
  );
  await storage.setItem(RECENT_SEARCHES_KEY, next);
  return next;
}

export async function clearRecentSearches(): Promise<void> {
  await storage.removeItem(RECENT_SEARCHES_KEY);
}