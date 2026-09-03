/**
 * Production Games Universe Verification Script
 * Validates all 20 game level datasets, progression algorithms, canonical IDs, badges, and scoring.
 */

import { GAMES_REGISTRY, GAME_BADGES, GAME_COLLECTIONS } from '../features/games/games.registry';
import {
  GAME_LEVEL_INFO,
  getGameLevelCount,
  getGameLevelId,
  calculateMasteryPercent,
  deriveDailyChallengeGame,
} from '../features/games/games.storage';
import { GameId, GameLevelProgress } from '../features/games/games.types';

// Import level datasets for all 20 games
import { ZIP_LEVELS } from '../features/games/zip/zip.levels';
import { WEND_LEVELS } from '../features/games/wend/wend.levels';
import { PATCHES_LEVELS } from '../features/games/patches/patches.levels';
import { SUDOKU_LEVELS } from '../features/games/sudoku/sudoku.levels';
import { TANGO_LEVELS } from '../features/games/tango/tango.levels';
import { QUEENS_LEVELS } from '../features/games/queens/queens.levels';
import { ELEMENT_MATCH_LEVELS } from '../features/games/element-match/element-match.levels';
import { MOLECULE_BUILDER_LEVELS } from '../features/games/molecule-builder/molecule-builder.levels';
import { CIRCUIT_LAB_LEVELS } from '../features/games/circuit-lab/circuit-lab.levels';
import { MEMORY_MATRIX_LEVELS } from '../features/games/memory-matrix/memory-matrix.levels';
import { ORBIT_LEVELS } from '../features/games/orbit/orbit.levels';
import { REACTION_SORT_LEVELS } from '../features/games/reaction-sort/reaction-sort.levels';
import { SCIENCE_WORD_GRID_LEVELS } from '../features/games/science-word-grid/science-word-grid.levels';
import { PATTERN_LAB_LEVELS } from '../features/games/pattern-lab/pattern-lab.levels';
import { LOGIC_LOCK_LEVELS } from '../features/games/logic-lock/logic-lock.levels';
import { GRAVITY_PATH_LEVELS } from '../features/games/gravity-path/gravity-path.levels';
import { LAB_ESCAPE_LEVELS } from '../features/games/lab-escape/lab-escape.levels';
import { TIME_MACHINE_LEVELS } from '../features/games/time-machine/time-machine.levels';
import { DNA_SEQUENCE_LEVELS } from '../features/games/dna-sequence/dna-sequence.levels';
import { MAGNET_MAZE_LEVELS } from '../features/games/magnet-maze/magnet-maze.levels';

let failures: string[] = [];

function assert(condition: boolean, msg: string) {
  if (!condition) {
    failures.push(`❌ ${msg}`);
    console.error(`❌ ${msg}`);
  } else {
    console.log(`✅ ${msg}`);
  }
}

console.log('\n======================================================');
console.log('--- 1. GAMES REGISTRY & COLLECTIONS AUDIT ---');
console.log('======================================================');

const playableGames = GAMES_REGISTRY.filter((g) => g.id !== 'fun-facts');
assert(playableGames.length === 20, `Exactly 20 playable games registered in GAMES_REGISTRY (found ${playableGames.length})`);
assert(GAME_COLLECTIONS.length >= 4, `At least 4 game collections registered (found ${GAME_COLLECTIONS.length})`);
assert(GAME_BADGES.length >= 10, `At least 10 achievement badges registered (found ${GAME_BADGES.length})`);

for (const badge of GAME_BADGES) {
  const reqType = typeof badge.requirement === 'string' ? badge.requirement : badge.requirement.type;
  assert(
    Boolean(badge.id && badge.title.en && badge.title.ta && badge.description.en && badge.description.ta && reqType),
    `Badge ${badge.id} has complete bilingual metadata and requirement: ${reqType}`
  );
}

console.log('\n======================================================');
console.log('--- 2. GAME LEVEL DATASETS & CANONICAL IDs AUDIT ---');
console.log('======================================================');

const datasets: Record<string, { levels: Array<{ id: string; name: string }>; expectedCount: number }> = {
  zip: { levels: ZIP_LEVELS, expectedCount: 15 },
  wend: { levels: WEND_LEVELS, expectedCount: 15 },
  patches: { levels: PATCHES_LEVELS, expectedCount: 15 },
  'mini-sudoku': { levels: SUDOKU_LEVELS, expectedCount: 15 },
  tango: { levels: TANGO_LEVELS, expectedCount: 15 },
  queens: { levels: QUEENS_LEVELS, expectedCount: 15 },
  'element-match': { levels: ELEMENT_MATCH_LEVELS, expectedCount: 10 },
  'molecule-builder': { levels: MOLECULE_BUILDER_LEVELS, expectedCount: 10 },
  'circuit-lab': { levels: CIRCUIT_LAB_LEVELS, expectedCount: 10 },
  'memory-matrix': { levels: MEMORY_MATRIX_LEVELS, expectedCount: 10 },
  orbit: { levels: ORBIT_LEVELS, expectedCount: 10 },
  'reaction-sort': { levels: REACTION_SORT_LEVELS, expectedCount: 10 },
  'science-word-grid': { levels: SCIENCE_WORD_GRID_LEVELS, expectedCount: 10 },
  'pattern-lab': { levels: PATTERN_LAB_LEVELS, expectedCount: 10 },
  'logic-lock': { levels: LOGIC_LOCK_LEVELS, expectedCount: 10 },
  'gravity-path': { levels: GRAVITY_PATH_LEVELS, expectedCount: 10 },
  'lab-escape': { levels: LAB_ESCAPE_LEVELS, expectedCount: 10 },
  'time-machine': { levels: TIME_MACHINE_LEVELS, expectedCount: 10 },
  'dna-sequence': { levels: DNA_SEQUENCE_LEVELS, expectedCount: 10 },
  'magnet-maze': { levels: MAGNET_MAZE_LEVELS, expectedCount: 10 },
};

for (const [gameId, { levels, expectedCount }] of Object.entries(datasets)) {
  assert(levels.length === expectedCount, `${gameId}: contains exact expected level count ${expectedCount} (found ${levels.length})`);
  assert(getGameLevelCount(gameId as GameId) === expectedCount, `${gameId}: getGameLevelCount matches ${expectedCount}`);

  for (let idx = 0; idx < levels.length; idx++) {
    const level = levels[idx];
    const canonicalId = getGameLevelId(gameId as GameId, idx);
    assert(level.id === canonicalId, `${gameId} level ${idx + 1}: ID "${level.id}" matches canonical ID "${canonicalId}"`);
    assert(Boolean(level.name && level.name.length > 0), `${gameId} level ${level.id}: has name "${level.name}"`);
  }
}

console.log('\n======================================================');
console.log('--- 3. MASTERY & PROGRESSION LOGIC AUDIT ---');
console.log('======================================================');

// 15-level game: 15 * 3 = 45 stars
const mock15GameProgress: Record<string, GameLevelProgress> = {};
for (let i = 0; i < 15; i++) {
  const id = getGameLevelId('zip', i);
  mock15GameProgress[id] = { unlocked: true, completed: true, stars: 3 };
}
const mastery15 = calculateMasteryPercent(mock15GameProgress, 15);
assert(mastery15 === 100, `15-level 100% mastery calculated correctly: ${mastery15}%`);

// 10-level game: 10 * 3 = 30 stars
const mock10GameProgress: Record<string, GameLevelProgress> = {};
for (let i = 0; i < 10; i++) {
  const id = getGameLevelId('orbit', i);
  mock10GameProgress[id] = { unlocked: true, completed: true, stars: 3 };
}
const mastery10 = calculateMasteryPercent(mock10GameProgress, 10);
assert(mastery10 === 100, `10-level 100% mastery calculated correctly: ${mastery10}%`);

console.log('\n======================================================');
console.log('--- 4. DAILY CHALLENGE DYNAMIC LEVEL RANGE AUDIT ---');
console.log('======================================================');

const sampleDates = ['2026-01-01', '2026-03-15', '2026-07-20', '2026-09-02', '2026-12-31'];
for (const date of sampleDates) {
  const daily = deriveDailyChallengeGame(date);
  const totalLevels = getGameLevelCount(daily.gameId);
  assert(
    daily.levelIndex >= 0 && daily.levelIndex < totalLevels,
    `Daily challenge on ${date} chooses game ${daily.gameId} with valid levelIndex ${daily.levelIndex} in [0, ${totalLevels - 1}]`
  );
}

console.log('\n======================================================');
console.log('--- FINAL GAMES PRODUCTION SUMMARY ---');
console.log('======================================================');

if (failures.length > 0) {
  console.error(`\n❌ Games Universe Verification FAILED with ${failures.length} errors:`);
  failures.forEach((f) => console.error(f));
  process.exit(1);
} else {
  console.log('\n✨ ALL 20 GAMES AND PROGRESSION ENGINES FULLY VERIFIED! ✨\n');
  process.exit(0);
}
