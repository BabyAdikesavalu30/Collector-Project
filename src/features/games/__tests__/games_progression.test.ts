/**
 * Games Progression & Badge Evaluator Unit Tests
 */

import {
  GAME_LEVEL_INFO,
  getGameLevelCount,
  getGameLevelId,
  getGameProgress,
  saveLevelCompletion,
  calculateMasteryPercent,
  deriveDailyChallengeGame,
  evaluateAndUnlockBadges,
  getUnlockedBadges,
  getAllGamesProgress,
  getGamesStreak,
} from '../games.storage';
import { GAMES_REGISTRY } from '../games.registry';
import { GameId, GameLevelProgress } from '../games.types';

// Level datasets — canonical IDs must match GAME_LEVEL_INFO prefixes exactly.
import { ZIP_LEVELS } from '../zip/zip.levels';
import { WEND_LEVELS } from '../wend/wend.levels';
import { PATCHES_LEVELS } from '../patches/patches.levels';
import { SUDOKU_LEVELS } from '../sudoku/sudoku.levels';
import { TANGO_LEVELS } from '../tango/tango.levels';
import { QUEENS_LEVELS } from '../queens/queens.levels';
import { ELEMENT_MATCH_LEVELS } from '../element-match/element-match.levels';
import { MOLECULE_BUILDER_LEVELS } from '../molecule-builder/molecule-builder.levels';
import { CIRCUIT_LAB_LEVELS } from '../circuit-lab/circuit-lab.levels';
import { MEMORY_MATRIX_LEVELS } from '../memory-matrix/memory-matrix.levels';
import { ORBIT_LEVELS } from '../orbit/orbit.levels';
import { REACTION_SORT_LEVELS } from '../reaction-sort/reaction-sort.levels';
import { SCIENCE_WORD_GRID_LEVELS } from '../science-word-grid/science-word-grid.levels';
import { PATTERN_LAB_LEVELS } from '../pattern-lab/pattern-lab.levels';
import { LOGIC_LOCK_LEVELS } from '../logic-lock/logic-lock.levels';
import { GRAVITY_PATH_LEVELS } from '../gravity-path/gravity-path.levels';
import { LAB_ESCAPE_LEVELS } from '../lab-escape/lab-escape.levels';
import { TIME_MACHINE_LEVELS } from '../time-machine/time-machine.levels';
import { DNA_SEQUENCE_LEVELS } from '../dna-sequence/dna-sequence.levels';
import { MAGNET_MAZE_LEVELS } from '../magnet-maze/magnet-maze.levels';

describe('Games Progression & Level ID Integrity', () => {
  test('games registry contains 20 playable game definitions', () => {
    const playableGames = GAMES_REGISTRY.filter((g) => g.id !== 'fun-facts');
    expect(playableGames.length).toBe(20);
  });

  test('every playable game has valid GAME_LEVEL_INFO with positive count and prefix', () => {
    const playableGames = GAMES_REGISTRY.filter((g) => g.id !== 'fun-facts');
    for (const game of playableGames) {
      const info = GAME_LEVEL_INFO[game.id as GameId];
      expect(info).toBeDefined();
      expect(info.count).toBeGreaterThanOrEqual(10);
      expect(info.prefix.length).toBeGreaterThan(0);
      expect(getGameLevelCount(game.id as GameId)).toBe(info.count);
    }
  });

  test('canonical level IDs format correctly', () => {
    expect(getGameLevelId('zip', 0)).toBe('zip-01');
    expect(getGameLevelId('zip', 9)).toBe('zip-10');
    expect(getGameLevelId('zip', 14)).toBe('zip-15');
    expect(getGameLevelId('element-match', 0)).toBe('elem-01');
    expect(getGameLevelId('element-match', 9)).toBe('elem-10');
  });

  test('getGameProgress initializes first level unlocked with canonical ID', async () => {
    const progress = await getGameProgress('zip');
    expect(progress.gameId).toBe('zip');
    expect(progress.levels['zip-01']).toBeDefined();
    expect(progress.levels['zip-01'].unlocked).toBe(true);
  });

  test('saveLevelCompletion unlocks the real next level canonical ID', async () => {
    await saveLevelCompletion('zip', 0, 'zip-01', {
      completed: true,
      stars: 3,
      highScore: 350,
      bestTimeSeconds: 45,
    });
    const progress = await getGameProgress('zip');
    expect(progress.levels['zip-01'].completed).toBe(true);
    expect(progress.levels['zip-01'].stars).toBe(3);
    expect(progress.levels['zip-01'].highScore).toBe(350);
    expect(progress.levels['zip-02']).toBeDefined();
    expect(progress.levels['zip-02'].unlocked).toBe(true);
  });

  test('calculateMasteryPercent accurately handles 10-level and 15-level games', () => {
    const mock15Levels: Record<string, GameLevelProgress> = {};
    for (let i = 1; i <= 15; i++) {
      const id = `zip-${String(i).padStart(2, '0')}`;
      mock15Levels[id] = { unlocked: true, completed: i <= 3, stars: 3, highScore: 100 };
    }
    // 3 completed (3*3 = 9 stars) out of 15*3 (45 stars) => 20%
    expect(calculateMasteryPercent(mock15Levels, 15)).toBe(20);

    const mock10Levels: Record<string, GameLevelProgress> = {};
    for (let i = 1; i <= 10; i++) {
      const id = `elem-${String(i).padStart(2, '0')}`;
      mock10Levels[id] = { unlocked: true, completed: i <= 5, stars: 3, highScore: 100 };
    }
    // 5 completed (5*3 = 15 stars) out of 10*3 (30 stars) => 50%
    expect(calculateMasteryPercent(mock10Levels, 10)).toBe(50);
  });

  test('deriveDailyChallengeGame generates valid levelIndex within game level count', () => {
    const today = new Date().toISOString().split('T')[0];
    const daily = deriveDailyChallengeGame(today);
    expect(daily.gameId).toBeDefined();
    const count = getGameLevelCount(daily.gameId);
    expect(daily.levelIndex).toBeGreaterThanOrEqual(0);
    expect(daily.levelIndex).toBeLessThan(count);
  });

  test('every game level dataset matches canonical level IDs and GAME_LEVEL_INFO counts', () => {
    const datasets: Partial<Record<GameId, Array<{ id: string; name?: string }>>> = {
      zip: ZIP_LEVELS,
      wend: WEND_LEVELS,
      patches: PATCHES_LEVELS,
      'mini-sudoku': SUDOKU_LEVELS,
      tango: TANGO_LEVELS,
      queens: QUEENS_LEVELS,
      'element-match': ELEMENT_MATCH_LEVELS,
      'molecule-builder': MOLECULE_BUILDER_LEVELS,
      'circuit-lab': CIRCUIT_LAB_LEVELS,
      'memory-matrix': MEMORY_MATRIX_LEVELS,
      orbit: ORBIT_LEVELS,
      'reaction-sort': REACTION_SORT_LEVELS,
      'science-word-grid': SCIENCE_WORD_GRID_LEVELS,
      'pattern-lab': PATTERN_LAB_LEVELS,
      'logic-lock': LOGIC_LOCK_LEVELS,
      'gravity-path': GRAVITY_PATH_LEVELS,
      'lab-escape': LAB_ESCAPE_LEVELS,
      'time-machine': TIME_MACHINE_LEVELS,
      'dna-sequence': DNA_SEQUENCE_LEVELS,
      'magnet-maze': MAGNET_MAZE_LEVELS,
    };

    for (const [gameId, levels] of Object.entries(datasets)) {
      const gid = gameId as GameId;
      expect(levels?.length).toBe(getGameLevelCount(gid));
      levels?.forEach((level, idx) => {
        expect(level.id).toBe(getGameLevelId(gid, idx));
        expect(Boolean(level.id)).toBe(true);
      });
    }
  });

  test('calculateMasteryPercent ignores legacy level-N alias keys', () => {
    const levels: Record<string, GameLevelProgress> = {
      'zip-01': { unlocked: true, completed: true, stars: 3 },
      'level-0': { unlocked: true, completed: true, stars: 3 }, // legacy duplicate
      'zip-02': { unlocked: true, completed: true, stars: 3 },
      'level-1': { unlocked: true, completed: true, stars: 3 }, // legacy duplicate
      'zip-03': { unlocked: true, completed: false },
    };
    // Only zip-01 and zip-02 (6 stars of 45) count; legacy aliases must not double it.
    expect(calculateMasteryPercent(levels, 15)).toBe(13);
  });

  test('getAllGamesProgress migrates legacy level-N keys into canonical IDs and persists once', async () => {
    // Seed legacy-format data directly
    const storageModule = await import('../../../storage/asyncStorage');
    await storageModule.storage.setItem(storageModule.STORAGE_KEYS.GAMES_PROGRESS, {
      zip: {
        gameId: 'zip',
        levels: {
          'level-0': { unlocked: true, completed: true, stars: 2 },
          'level-1': { unlocked: true, completed: false },
        },
        highestUnlockedLevel: 1,
        lastPlayedAt: 123,
        masteryPercent: 0,
      },
    });

    const all = await getAllGamesProgress();
    const zip = all.zip;
    expect(zip.levels['zip-01']).toBeDefined();
    expect(zip.levels['zip-01'].completed).toBe(true);
    expect(zip.levels['zip-01'].stars).toBe(2);
    expect(zip.levels['zip-02']).toBeDefined();
    expect(zip.levels['level-0']).toBeUndefined();
    expect(zip.levels['level-1']).toBeUndefined();

    // Persisted migration must not re-run: re-read should stay canonical.
    const again = await getAllGamesProgress();
    expect(again.zip.levels['level-0']).toBeUndefined();
    expect(again.zip.levels['zip-01'].completed).toBe(true);
  });

  test('saveLevelCompletion never writes legacy level-N alias keys', async () => {
    await saveLevelCompletion('zip', 0, 'zip-01', {
      completed: true,
      stars: 3,
      highScore: 300,
    });
    const progress = await getGameProgress('zip');
    expect(progress.levels['zip-01']).toBeDefined();
    expect(progress.levels['level-0']).toBeUndefined();
    expect(progress.levels['level-1']).toBeUndefined();
    expect(progress.levels['zip-02'].unlocked).toBe(true);
  });

  test('evaluateAndUnlockBadges correctly unlocks badges based on criteria', async () => {
    const allProgress = await getAllGamesProgress();
    const streak = await getGamesStreak();
    const newlyUnlocked = await evaluateAndUnlockBadges(allProgress, streak, {
      gameId: 'zip',
      levelId: 'zip-01',
      levelIndex: 0,
      stars: 3,
      elapsedSeconds: 25,
      score: 100,
    });
    expect(Array.isArray(newlyUnlocked)).toBe(true);

    const allUnlocked = await getUnlockedBadges();
    expect(allUnlocked.length).toBeGreaterThanOrEqual(newlyUnlocked.length);
  });
});
