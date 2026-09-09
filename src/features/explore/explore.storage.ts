/**
 * Explore 2.0 — Storage Layer
 * Persists favorites, recently viewed, and filter preferences.
 * Validates data, recovers from malformed state.
 */

import { storage, STORAGE_KEYS } from '../../storage/asyncStorage';
import { FavoriteEntry, RecentlyViewedEntry } from './explore.types';

// ============================================================================
// Storage Keys
// ============================================================================

const EXPLORE_FAVORITES_KEY = STORAGE_KEYS.EXPLORE_FAVORITES;
const EXPLORE_RECENT_KEY = STORAGE_KEYS.EXPLORE_RECENTLY_VIEWED;

const FAVORITES_LIMIT = 100;
const RECENTLY_VIEWED_LIMIT = 30;

// ============================================================================
// Favorites
// ============================================================================

function isValidFavorite(entry: unknown): entry is FavoriteEntry {
  if (typeof entry !== 'object' || entry === null) return false;
  const e = entry as Record<string, unknown>;
  return (
    typeof e.id === 'string' &&
    typeof e.type === 'string' &&
    typeof e.route === 'string' &&
    typeof e.savedAt === 'number' &&
    typeof e.icon === 'string' &&
    typeof e.title === 'object' &&
    e.title !== null &&
    typeof (e.title as Record<string, unknown>).en === 'string' &&
    typeof (e.title as Record<string, unknown>).ta === 'string'
  );
}

export async function getFavorites(): Promise<FavoriteEntry[]> {
  try {
    const list = await storage.getItem<FavoriteEntry[]>(EXPLORE_FAVORITES_KEY);
    if (!Array.isArray(list)) return [];
    return list.filter(isValidFavorite);
  } catch {
    return [];
  }
}

export async function isFavorited(itemId: string): Promise<boolean> {
  const favorites = await getFavorites();
  return favorites.some((f) => f.id === itemId);
}

export async function toggleFavorite(entry: Omit<FavoriteEntry, 'savedAt'>): Promise<boolean> {
  const favorites = await getFavorites();
  const existingIndex = favorites.findIndex((f) => f.id === entry.id);

  let next: FavoriteEntry[];
  if (existingIndex >= 0) {
    // Remove from favorites
    next = [...favorites.slice(0, existingIndex), ...favorites.slice(existingIndex + 1)];
  } else {
    // Add to favorites
    const newEntry: FavoriteEntry = { ...entry, savedAt: Date.now() };
    next = [newEntry, ...favorites].slice(0, FAVORITES_LIMIT);
  }

  await storage.setItem(EXPLORE_FAVORITES_KEY, next);
  return existingIndex < 0; // Returns true if added, false if removed
}

// ============================================================================
// Recently Viewed
// ============================================================================

function isValidRecent(entry: unknown): entry is RecentlyViewedEntry {
  if (typeof entry !== 'object' || entry === null) return false;
  const e = entry as Record<string, unknown>;
  return (
    typeof e.id === 'string' &&
    typeof e.type === 'string' &&
    typeof e.route === 'string' &&
    typeof e.viewedAt === 'number' &&
    typeof e.icon === 'string' &&
    typeof e.title === 'object' &&
    e.title !== null &&
    typeof (e.title as Record<string, unknown>).en === 'string' &&
    typeof (e.title as Record<string, unknown>).ta === 'string'
  );
}

export async function getRecentlyViewed(): Promise<RecentlyViewedEntry[]> {
  try {
    const list = await storage.getItem<RecentlyViewedEntry[]>(EXPLORE_RECENT_KEY);
    if (!Array.isArray(list)) return [];
    // Filter valid entries and deduplicate by ID (keep newest)
    const seen = new Set<string>();
    const valid: RecentlyViewedEntry[] = [];
    for (const entry of list) {
      if (!isValidRecent(entry)) continue;
      if (seen.has(entry.id)) continue;
      seen.add(entry.id);
      valid.push(entry);
    }
    return valid.slice(0, RECENTLY_VIEWED_LIMIT);
  } catch {
    return [];
  }
}

/**
 * Add an item to recently viewed history.
 * Only meaningful content opens are tracked (not list views or filter clicks).
 */
export async function addRecentlyViewed(entry: Omit<RecentlyViewedEntry, 'viewedAt'>): Promise<RecentlyViewedEntry[]> {
  const recent = await getRecentlyViewed();
  // Remove existing entry for this item (to move to front)
  const filtered = recent.filter((r) => r.id !== entry.id);
  const newEntry: RecentlyViewedEntry = { ...entry, viewedAt: Date.now() };
  const next = [newEntry, ...filtered].slice(0, RECENTLY_VIEWED_LIMIT);
  await storage.setItem(EXPLORE_RECENT_KEY, next);
  return next;
}

export async function clearRecentlyViewed(): Promise<void> {
  await storage.removeItem(EXPLORE_RECENT_KEY);
}
