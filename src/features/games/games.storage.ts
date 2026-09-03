/**
 * Games Suite Storage & Progression Service
 * Manages local progress, level unlocks, best scores, stars, streaks, daily challenges, favorites, and mastery.
 */

import { storage, STORAGE_KEYS } from '../../storage/asyncStorage';
import {
  GameId,
  GameProgress,
  GameLevelProgress,
  GameStreakInfo,
  DailyChallengeInfo,
  RecentGameSession,
  GameBadge,
  BadgeRequirement,
} from './games.types';
import { GAMES_REGISTRY, GAME_BADGES } from './games.registry';

export interface LastPlayedGameInfo {
  gameId: GameId;
  levelIndex: number;
  playedAt: number;
}

export const ALL_GAME_IDS: GameId[] = [
  'zip',
  'wend',
  'patches',
  'mini-sudoku',
  'tango',
  'queens',
  'element-match',
  'molecule-builder',
  'circuit-lab',
  'memory-matrix',
  'orbit',
  'reaction-sort',
  'science-word-grid',
  'pattern-lab',
  'logic-lock',
  'gravity-path',
  'lab-escape',
  'time-machine',
  'dna-sequence',
  'magnet-maze',
];

export const GAME_LEVEL_INFO: Record<GameId, { count: number; prefix: string }> = {
  zip: { count: 15, prefix: 'zip' },
  wend: { count: 15, prefix: 'wend' },
  patches: { count: 15, prefix: 'patches' },
  'mini-sudoku': { count: 15, prefix: 'sudoku' },
  tango: { count: 15, prefix: 'tango' },
  queens: { count: 15, prefix: 'queens' },
  'element-match': { count: 10, prefix: 'elem' },
  'molecule-builder': { count: 10, prefix: 'mol' },
  'circuit-lab': { count: 10, prefix: 'circuit' },
  'memory-matrix': { count: 10, prefix: 'mem' },
  orbit: { count: 10, prefix: 'orbit' },
  'reaction-sort': { count: 10, prefix: 'sort' },
  'science-word-grid': { count: 10, prefix: 'grid' },
  'pattern-lab': { count: 10, prefix: 'pat' },
  'logic-lock': { count: 10, prefix: 'lock' },
  'gravity-path': { count: 10, prefix: 'grav' },
  'lab-escape': { count: 10, prefix: 'esc' },
  'time-machine': { count: 10, prefix: 'time' },
  'dna-sequence': { count: 10, prefix: 'dna' },
  'magnet-maze': { count: 10, prefix: 'mag' },
  'fun-facts': { count: 1, prefix: 'ff' },
};

export function getGameLevelCount(gameId: GameId): number {
  return GAME_LEVEL_INFO[gameId]?.count || 10;
}

export function getGameLevelId(gameId: GameId, levelIndex: number): string {
  const info = GAME_LEVEL_INFO[gameId] || { count: 10, prefix: String(gameId) };
  const padded = String(levelIndex + 1).padStart(2, '0');
  return `${info.prefix}-${padded}`;
}

/**
 * Determines whether a stored progress key is a legacy positional alias (level-N)
 * rather than a canonical dataset level ID (e.g. zip-01).
 * Legacy aliases were written by an older storage version and are never
 * created anymore; they are only read during migration and then removed.
 */
function isLegacyLevelKey(key: string): boolean {
  return key.startsWith('level-');
}

/**
 * Migrates any legacy positional level keys (level-0, level-1, ...) stored by
 * an older app version into their canonical dataset level IDs (zip-01, ...)
 * and removes the aliases. Existing canonical entries win on conflict.
 */
function normalizeGameLevels(gameId: GameId, levels: Record<string, GameLevelProgress>): boolean {
  let changed = false;
  Object.keys(levels).forEach((key) => {
    if (isLegacyLevelKey(key)) {
      const index = parseInt(key.replace('level-', ''), 10);
      if (!Number.isNaN(index) && index >= 0) {
        const canonicalId = getGameLevelId(gameId, index);
        if (canonicalId !== key && !levels[canonicalId]) {
          levels[canonicalId] = levels[key];
          changed = true;
        }
      }
      delete levels[key];
      changed = true;
    }
  });
  return changed;
}

/**
 * Returns formatted local ISO date string: YYYY-MM-DD
 */
export function getTodayDateString(): string {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Helper to calculate day difference between two YYYY-MM-DD strings
 */
function getDaysDifference(dateA: string, dateB: string): number {
  const msPerDay = 1000 * 60 * 60 * 24;
  const utcA = Date.UTC(
    parseInt(dateA.substring(0, 4), 10),
    parseInt(dateA.substring(5, 7), 10) - 1,
    parseInt(dateA.substring(8, 10), 10)
  );
  const utcB = Date.UTC(
    parseInt(dateB.substring(0, 4), 10),
    parseInt(dateB.substring(5, 7), 10) - 1,
    parseInt(dateB.substring(8, 10), 10)
  );
  return Math.floor((utcB - utcA) / msPerDay);
}

// =========================================================================
// Progress & Levels
// =========================================================================

export async function getAllGamesProgress(): Promise<Record<GameId, GameProgress>> {
  try {
    const data = await storage.getItem<Record<GameId, GameProgress>>(STORAGE_KEYS.GAMES_PROGRESS);
    const progress = data || ({} as Record<GameId, GameProgress>);

    // Normalize any legacy level-N keys from older installs into canonical
    // dataset level IDs, persisting once so the aliases are removed for good.
    let migrated = false;
    Object.entries(progress).forEach(([gameId, gameProgress]) => {
      if (!gameProgress || typeof gameProgress !== 'object') return;
      if (!gameProgress.levels || typeof gameProgress.levels !== 'object') {
        gameProgress.levels = {};
        migrated = true;
      }
      if (normalizeGameLevels(gameId as GameId, gameProgress.levels)) {
        migrated = true;
      }
      const totalLevels = getGameLevelCount(gameId as GameId);
      if (
        typeof gameProgress.highestUnlockedLevel !== 'number' ||
        gameProgress.highestUnlockedLevel < 0
      ) {
        gameProgress.highestUnlockedLevel = 0;
        migrated = true;
      } else if (gameProgress.highestUnlockedLevel >= totalLevels) {
        gameProgress.highestUnlockedLevel = totalLevels - 1;
        migrated = true;
      }
    });
    if (migrated) {
      await storage.setItem(STORAGE_KEYS.GAMES_PROGRESS, progress);
    }
    return progress;
  } catch {
    return {} as Record<GameId, GameProgress>;
  }
}

export async function getGameProgress(gameId: GameId): Promise<GameProgress> {
  const all = await getAllGamesProgress();
  const firstLevelId = getGameLevelId(gameId, 0);
  return (
    all[gameId] || {
      gameId,
      levels: {
        [firstLevelId]: { completed: false, unlocked: true, stars: 1 },
      },
      highestUnlockedLevel: 0,
      lastPlayedAt: 0,
      masteryPercent: 0,
    }
  );
}

export function calculateMasteryPercent(
  levels: Record<string, GameLevelProgress>,
  totalLevels: number = 10
): number {
  if (totalLevels <= 0) return 0;
  let earnedStars = 0;
  Object.entries(levels).forEach(([levelKey, lvl]) => {
    // Only canonical dataset level IDs count toward mastery; legacy
    // positional aliases (level-N) are ignored to avoid double counting.
    if (!isLegacyLevelKey(levelKey) && lvl.completed) {
      earnedStars += lvl.stars || 1;
    }
  });
  const maxStars = totalLevels * 3;
  return Math.min(100, Math.round((earnedStars / maxStars) * 100));
}

export async function saveLevelCompletion(
  gameId: GameId,
  levelIndex: number,
  levelId: string,
  progress: Partial<GameLevelProgress> & { score?: number; stars?: 1 | 2 | 3; isPerfect?: boolean }
): Promise<void> {
  try {
    const all = await getAllGamesProgress();
    const current = all[gameId] || {
      gameId,
      levels: {},
      highestUnlockedLevel: 0,
      lastPlayedAt: Date.now(),
      masteryPercent: 0,
    };

    // Read prior data from the canonical level ID, falling back to a legacy
    // positional alias (level-N) written by older versions for migration.
    const legacyKey = `level-${levelIndex}`;
    const prevLevelData =
      current.levels[levelId] || current.levels[legacyKey] || {
        completed: false,
        unlocked: true,
        stars: 1,
      };
    // Canonical dataset ID is the single source of truth; drop legacy alias.
    if (current.levels[legacyKey]) {
      delete current.levels[legacyKey];
    }
    const nextUnlockedLevel = Math.max(current.highestUnlockedLevel, levelIndex + 1);

    const bestTime = prevLevelData.bestTimeSeconds
      ? Math.min(prevLevelData.bestTimeSeconds, progress.bestTimeSeconds || 9999)
      : progress.bestTimeSeconds;

    const bestMoves = prevLevelData.bestMoves
      ? Math.min(prevLevelData.bestMoves, progress.bestMoves || 9999)
      : progress.bestMoves;

    const highScore = Math.max(prevLevelData.highScore || 0, progress.highScore || progress.score || 0);
    const bestStars = Math.max(prevLevelData.stars || 1, progress.stars || 1) as 1 | 2 | 3;
    const isPerfect = Boolean(prevLevelData.isPerfect || progress.isPerfect);

    const updatedLevelRecord: GameLevelProgress = {
      ...prevLevelData,
      ...progress,
      completed: true,
      unlocked: true,
      stars: bestStars,
      isPerfect,
      bestTimeSeconds: bestTime,
      bestMoves: bestMoves,
      highScore,
      completedAt: Date.now(),
    };

    // Persist only under the canonical dataset level ID (e.g. zip-01).
    current.levels[levelId] = updatedLevelRecord;

    // Unlock the real next level using its canonical dataset ID.
    const totalLevels = getGameLevelCount(gameId);
    if (levelIndex + 1 < totalLevels) {
      const nextLevelId = getGameLevelId(gameId, levelIndex + 1);
      if (!current.levels[nextLevelId]) {
        current.levels[nextLevelId] = { completed: false, unlocked: true };
      } else {
        current.levels[nextLevelId].unlocked = true;
      }
    }

    current.highestUnlockedLevel = Math.min(nextUnlockedLevel, totalLevels - 1);
    current.lastPlayedAt = Date.now();
    current.masteryPercent = calculateMasteryPercent(current.levels, totalLevels);

    all[gameId] = current;
    await storage.setItem(STORAGE_KEYS.GAMES_PROGRESS, all);
    await setLastPlayedGame({ gameId, levelIndex, playedAt: Date.now() });

    // Update streak & recent history
    const streak = await updateGamesStreakOnPlay();
    await addRecentGame({
      gameId,
      levelIndex,
      score: progress.score || 100,
      completedAt: Date.now(),
    });

    // Evaluate badges
    await evaluateAndUnlockBadges(all, streak, {
      gameId,
      levelId,
      levelIndex,
      score: progress.score || 100,
      stars: bestStars,
      isPerfect,
      elapsedSeconds: progress.bestTimeSeconds,
    });
  } catch (err) {
    console.error('Failed to save game level completion:', err);
  }
}

export async function getLastPlayedGame(): Promise<LastPlayedGameInfo | null> {
  try {
    return await storage.getItem<LastPlayedGameInfo>(STORAGE_KEYS.LAST_PLAYED_GAME);
  } catch {
    return null;
  }
}

export async function setLastPlayedGame(info: LastPlayedGameInfo): Promise<void> {
  try {
    await storage.setItem(STORAGE_KEYS.LAST_PLAYED_GAME, info);
  } catch (err) {
    console.error('Failed to set last played game:', err);
  }
}

// =========================================================================
// Games Streak
// =========================================================================

export async function getGamesStreak(): Promise<GameStreakInfo> {
  try {
    const data = await storage.getItem<GameStreakInfo>(STORAGE_KEYS.GAMES_STREAK);
    if (data) {
      const today = getTodayDateString();
      const diff = getDaysDifference(data.lastPlayedDate, today);
      if (diff > 1) {
        // Missed day -> reset streak to 0, keep longest
        return {
          currentStreak: 0,
          longestStreak: data.longestStreak || 0,
          lastPlayedDate: data.lastPlayedDate,
          history: data.history || [],
        };
      }
      return data;
    }
    return {
      currentStreak: 0,
      longestStreak: 0,
      lastPlayedDate: '',
      history: [],
    };
  } catch {
    return {
      currentStreak: 0,
      longestStreak: 0,
      lastPlayedDate: '',
      history: [],
    };
  }
}

export async function updateGamesStreakOnPlay(): Promise<GameStreakInfo> {
  try {
    const current = await getGamesStreak();
    const today = getTodayDateString();

    if (current.lastPlayedDate === today) {
      return current; // already counted today
    }

    let newStreak = 1;
    if (current.lastPlayedDate) {
      const diff = getDaysDifference(current.lastPlayedDate, today);
      if (diff === 1) {
        newStreak = current.currentStreak + 1;
      }
    }

    const updated: GameStreakInfo = {
      currentStreak: newStreak,
      longestStreak: Math.max(current.longestStreak, newStreak),
      lastPlayedDate: today,
      history: Array.from(new Set([...current.history, today])),
    };

    await storage.setItem(STORAGE_KEYS.GAMES_STREAK, updated);
    return updated;
  } catch {
    return {
      currentStreak: 1,
      longestStreak: 1,
      lastPlayedDate: getTodayDateString(),
      history: [getTodayDateString()],
    };
  }
}

// =========================================================================
// Daily Challenge (Deterministic date-derived)
// =========================================================================

export function deriveDailyChallengeGame(dateStr: string): {
  gameId: GameId;
  levelIndex: number;
  levelId: string;
} {
  let hash = 0;
  for (let i = 0; i < dateStr.length; i++) {
    hash = (hash * 31 + dateStr.charCodeAt(i)) & 0xffffffff;
  }
  const positiveHash = Math.abs(hash);
  const gameIndex = positiveHash % ALL_GAME_IDS.length;
  const gameId = ALL_GAME_IDS[gameIndex];
  const totalLevels = getGameLevelCount(gameId);
  const levelIndex = (positiveHash >> 3) % totalLevels;
  const levelId = getGameLevelId(gameId, levelIndex);

  return {
    gameId,
    levelIndex,
    levelId,
  };
}

export async function getDailyChallenge(targetDate?: string): Promise<DailyChallengeInfo> {
  const date = targetDate || getTodayDateString();
  try {
    const stored = await storage.getItem<Record<string, DailyChallengeInfo>>(
      STORAGE_KEYS.GAMES_DAILY_CHALLENGE
    );
    if (stored && stored[date]) {
      return stored[date];
    }
    const derived = deriveDailyChallengeGame(date);
    const initial: DailyChallengeInfo = {
      date,
      gameId: derived.gameId,
      levelIndex: derived.levelIndex,
      completed: false,
      rewardStars: 3,
    };
    return initial;
  } catch {
    const derived = deriveDailyChallengeGame(date);
    return {
      date,
      gameId: derived.gameId,
      levelIndex: derived.levelIndex,
      completed: false,
      rewardStars: 3,
    };
  }
}

export async function completeDailyChallenge(targetDate?: string): Promise<DailyChallengeInfo> {
  const date = targetDate || getTodayDateString();
  try {
    const stored =
      (await storage.getItem<Record<string, DailyChallengeInfo>>(
        STORAGE_KEYS.GAMES_DAILY_CHALLENGE
      )) || {};

    const challenge = stored[date] || (await getDailyChallenge(date));
    challenge.completed = true;
    challenge.completedAt = Date.now();
    stored[date] = challenge;

    await storage.setItem(STORAGE_KEYS.GAMES_DAILY_CHALLENGE, stored);
    await updateGamesStreakOnPlay();
    return challenge;
  } catch {
    return {
      date,
      gameId: 'zip',
      levelIndex: 0,
      completed: true,
      rewardStars: 3,
      completedAt: Date.now(),
    };
  }
}

// =========================================================================
// Favorites
// =========================================================================

export async function getFavoriteGames(): Promise<GameId[]> {
  try {
    const favs = await storage.getItem<GameId[]>(STORAGE_KEYS.GAMES_FAVORITES);
    return favs || [];
  } catch {
    return [];
  }
}

export async function toggleFavoriteGame(gameId: GameId): Promise<boolean> {
  try {
    const favs = await getFavoriteGames();
    const exists = favs.includes(gameId);
    const updated = exists ? favs.filter((id) => id !== gameId) : [...favs, gameId];
    await storage.setItem(STORAGE_KEYS.GAMES_FAVORITES, updated);
    return !exists;
  } catch {
    return false;
  }
}

// =========================================================================
// Recent History
// =========================================================================

export async function getRecentGames(): Promise<RecentGameSession[]> {
  try {
    const list = await storage.getItem<RecentGameSession[]>(STORAGE_KEYS.GAMES_RECENT_HISTORY);
    return list || [];
  } catch {
    return [];
  }
}

export async function addRecentGame(session: RecentGameSession): Promise<void> {
  try {
    const list = await getRecentGames();
    // Keep max 5 most recent
    const filtered = list.filter((item) => item.gameId !== session.gameId);
    const updated = [session, ...filtered].slice(0, 5);
    await storage.setItem(STORAGE_KEYS.GAMES_RECENT_HISTORY, updated);
  } catch (err) {
    console.error('Failed to add recent game session:', err);
  }
}

// =========================================================================
// Badges
// =========================================================================

export async function getUnlockedBadges(): Promise<string[]> {
  try {
    const badges = await storage.getItem<string[]>(STORAGE_KEYS.GAMES_BADGES);
    return badges || [];
  } catch {
    return [];
  }
}

export async function unlockBadge(badgeId: string): Promise<void> {
  try {
    const badges = await getUnlockedBadges();
    if (!badges.includes(badgeId)) {
      await storage.setItem(STORAGE_KEYS.GAMES_BADGES, [...badges, badgeId]);
    }
  } catch (err) {
    console.error('Failed to unlock badge:', err);
  }
}

/**
 * Automatically evaluates all badge criteria against current user achievements and unlocks them.
 */
export async function evaluateAndUnlockBadges(
  allProgress: Record<GameId, GameProgress>,
  streak: GameStreakInfo,
  lastSession?: {
    gameId: GameId;
    levelId: string;
    levelIndex: number;
    score: number;
    stars: 1 | 2 | 3;
    isPerfect?: boolean;
    elapsedSeconds?: number;
  }
): Promise<string[]> {
  try {
    const unlocked = await getUnlockedBadges();
    const newlyUnlocked: string[] = [];

    // Calculate total completed levels across universe
    let totalCompletedLevels = 0;
    let playedGameCount = 0;
    const categoryMastery: Record<string, number[]> = {};

    Object.entries(allProgress).forEach(([gId, p]) => {
      let gameHasCompleted = false;
      const totalLevels = getGameLevelCount(gId as GameId);
      let earnedStars = 0;

      Object.entries(p.levels).forEach(([lvlKey, lvl]) => {
        // Only count canonical level IDs (avoid counting legacy aliases twice)
        if (!isLegacyLevelKey(lvlKey) && lvl.completed) {
          totalCompletedLevels++;
          gameHasCompleted = true;
          earnedStars += lvl.stars || 1;
        }
      });

      if (gameHasCompleted) playedGameCount++;

      const gameDef = GAMES_REGISTRY.find((g) => g.id === gId);
      if (gameDef) {
        const cat = gameDef.category;
        if (!categoryMastery[cat]) categoryMastery[cat] = [];
        const maxStars = totalLevels * 3;
        const pct = maxStars > 0 ? (earnedStars / maxStars) * 100 : 0;
        categoryMastery[cat].push(pct);
      }
    });

    for (const badge of GAME_BADGES) {
      if (unlocked.includes(badge.id)) continue;

      const req = badge.requirement;
      if (typeof req === 'object') {
        switch (req.type) {
          case 'levelsCompleted':
            if (totalCompletedLevels >= req.value) newlyUnlocked.push(badge.id);
            break;
          case 'gamesPlayed':
            if (playedGameCount >= req.value) newlyUnlocked.push(badge.id);
            break;
          case 'streak':
            if (streak.currentStreak >= req.value || streak.longestStreak >= req.value) {
              newlyUnlocked.push(badge.id);
            }
            break;
          case 'perfectLevel':
            if (lastSession?.isPerfect && lastSession.stars === 3) {
              newlyUnlocked.push(badge.id);
            }
            break;
          case 'speedTime':
            if (lastSession?.elapsedSeconds !== undefined && lastSession.elapsedSeconds < req.seconds) {
              newlyUnlocked.push(badge.id);
            }
            break;
          case 'mastery':
            const categoryScores = categoryMastery[req.category] || [];
            const avgMastery =
              categoryScores.length > 0
                ? categoryScores.reduce((a, b) => a + b, 0) / categoryScores.length
                : 0;
            if (avgMastery >= req.value) newlyUnlocked.push(badge.id);
            break;
        }
      }
    }

    if (newlyUnlocked.length > 0) {
      const merged = Array.from(new Set([...unlocked, ...newlyUnlocked]));
      await storage.setItem(STORAGE_KEYS.GAMES_BADGES, merged);
    }

    return newlyUnlocked;
  } catch (err) {
    console.error('Failed to evaluate badges:', err);
    return [];
  }
}
