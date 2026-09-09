/**
 * Automated Verification Suite for Vigyaan Games Universe
 * Tests:
 * 1. 20 Games Registry Integrity
 * 2. Level counts and puzzle structure
 * 3. Bilingual Localization Integrity (en & ta)
 * 4. Deterministic Daily Challenge derivation
 * 5. Streak progression & date calculations
 * 6. Collections & Badges registries
 * 7. Game Engine mechanics for all 14 new games
 */

import { GAMES_REGISTRY, GAME_COLLECTIONS, GAME_BADGES, getGameById, getRecommendedGames } from '../features/games/games.registry';
import { getTranslation } from '../config/i18n';
import { deriveDailyChallengeGame, getGameLevelCount } from '../features/games/games.storage';

// Import all 14 new game levels & engines
import { ELEMENT_MATCH_LEVELS, checkElementMatch } from '../features/games/element-match';
import { MOLECULE_BUILDER_LEVELS, isMoleculeComplete } from '../features/games/molecule-builder';
import { CIRCUIT_LAB_LEVELS, isCircuitComplete } from '../features/games/circuit-lab';
import { MEMORY_MATRIX_LEVELS, isMemoryMatrixComplete, isCardPairMatch } from '../features/games/memory-matrix';
import { ORBIT_LEVELS, isOrbitComplete } from '../features/games/orbit';
import { REACTION_SORT_LEVELS, isSortCorrect } from '../features/games/reaction-sort';
import { SCIENCE_WORD_GRID_LEVELS, checkWordSelection } from '../features/games/science-word-grid';
import { PATTERN_LAB_LEVELS, isPatternAnswerCorrect } from '../features/games/pattern-lab';
import { LOGIC_LOCK_LEVELS, isLockSolved } from '../features/games/logic-lock';
import { GRAVITY_PATH_LEVELS, slideParticle } from '../features/games/gravity-path';
import { LAB_ESCAPE_LEVELS, isStageAnswerCorrect } from '../features/games/lab-escape';
import { TIME_MACHINE_LEVELS, isTimelineCorrect } from '../features/games/time-machine';
import { DNA_SEQUENCE_LEVELS, isDnaSequenceComplete, getComplementBase } from '../features/games/dna-sequence';
import { MAGNET_MAZE_LEVELS, isMagnetMazeComplete } from '../features/games/magnet-maze';

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;

function assert(condition: boolean, testName: string) {
  totalTests++;
  if (condition) {
    passedTests++;
    console.log(`  ✓ ${testName}`);
  } else {
    failedTests++;
    console.error(`  ✕ FAILED: ${testName}`);
  }
}

console.log('========================================================');
console.log('🚀 RUNNING VIGYAAN GAMES UNIVERSE VERIFICATION SUITE');
console.log('========================================================\n');

// 1. Registry Integrity
console.log('--- 1. Games Registry Integrity ---');
assert(GAMES_REGISTRY.length >= 20, `GAMES_REGISTRY has ${GAMES_REGISTRY.length} registered games/activities`);

const uniqueIds = new Set(GAMES_REGISTRY.map((g) => g.id));
assert(uniqueIds.size === GAMES_REGISTRY.length, `All ${uniqueIds.size} Game IDs are unique`);

GAMES_REGISTRY.forEach((g) => {
  assert(Boolean(g.title.en && g.title.ta), `Game ${g.id} has bilingual English and Tamil titles`);
  assert(Boolean(g.subtitle.en && g.subtitle.ta), `Game ${g.id} has bilingual subtitles`);
  assert(Boolean(g.description.en && g.description.ta), `Game ${g.id} has bilingual descriptions`);
  if (g.id === 'fun-facts') {
    assert(g.totalLevels >= 1, `Activity ${g.id} is available (has ${g.totalLevels} mode)`);
  } else {
    assert(g.totalLevels >= 10, `Game ${g.id} has at least 10 levels (has ${g.totalLevels})`);
  }
});

// 2. Localization Integrity
console.log('\n--- 2. Localization Integrity (English & Tamil) ---');
const enGames = getTranslation('en').games;
const taGames = getTranslation('ta').games;

assert(Boolean(enGames.title && taGames.title), 'Hub titles localized in en & ta');
assert(Boolean(enGames.streakTitle && taGames.streakTitle), 'Streak title localized');
assert(Boolean(enGames.dailyChallenge && taGames.dailyChallenge), 'Daily challenge localized');
assert(Boolean(enGames.collectionsTitle && taGames.collectionsTitle), 'Collections title localized');
assert(Boolean(enGames.badgesTitle && taGames.badgesTitle), 'Badges title localized');
assert(Boolean(enGames.searchPlaceholder && taGames.searchPlaceholder), 'Search placeholder localized');

const gameKeyMap: Record<string, string> = {
  'zip': 'zip',
  'wend': 'wend',
  'patches': 'patches',
  'mini-sudoku': 'miniSudoku',
  'tango': 'tango',
  'queens': 'queens',
  'element-match': 'elementMatch',
  'molecule-builder': 'moleculeBuilder',
  'circuit-lab': 'circuitLab',
  'memory-matrix': 'memoryMatrix',
  'orbit': 'orbit',
  'reaction-sort': 'reactionSort',
  'science-word-grid': 'scienceWordGrid',
  'pattern-lab': 'patternLab',
  'logic-lock': 'logicLock',
  'gravity-path': 'gravityPath',
  'lab-escape': 'labEscape',
  'time-machine': 'timeMachine',
  'dna-sequence': 'dnaSequence',
  'magnet-maze': 'magnetMaze',
};

Object.entries(gameKeyMap).forEach(([gameId, i18nKey]) => {
  type GameI18nEntry = { title: { en: string; ta: string } };
  const enGameObj = (enGames as Record<string, unknown>)[i18nKey] as GameI18nEntry | undefined;
  const taGameObj = (taGames as Record<string, unknown>)[i18nKey] as GameI18nEntry | undefined;
  assert(Boolean(enGameObj && enGameObj.title), `i18n English contains entry for ${gameId} (${i18nKey})`);
  assert(Boolean(taGameObj && taGameObj.title), `i18n Tamil contains entry for ${gameId} (${i18nKey})`);
});

// 3. Collections Registry
console.log('\n--- 3. Game Collections Registry ---');
assert(GAME_COLLECTIONS.length >= 5, 'At least 5 curated game collections');
GAME_COLLECTIONS.forEach((col) => {
  assert(col.gameIds.length >= 2, `Collection ${col.id} contains at least 2 games`);
  col.gameIds.forEach((gid) => {
    assert(Boolean(getGameById(gid)), `Collection ${col.id} references valid game ${gid}`);
  });
});

// 4. Badges Registry
console.log('\n--- 4. Game Badges Registry ---');
assert(GAME_BADGES.length >= 8, 'At least 8 achievements/badges registered');
GAME_BADGES.forEach((b) => {
  assert(Boolean(b.id && b.title.en && b.title.ta && b.icon && b.requirement), `Badge ${b.id} is fully defined`);
});

// 5. Daily Challenge Determinism
console.log('\n--- 5. Deterministic Daily Challenge Engine ---');
const dates = [
  '2026-09-01',
  '2026-09-02',
  '2026-09-03',
  '2026-10-15',
  '2026-12-31',
  '2027-01-01',
];
dates.forEach((d) => {
  const result1 = deriveDailyChallengeGame(d);
  const result2 = deriveDailyChallengeGame(d);
  assert(result1.gameId === result2.gameId && result1.levelIndex === result2.levelIndex, `Date ${d} produces identical deterministic challenge (${result1.gameId} Lvl ${result1.levelIndex + 1})`);
  assert(Boolean(getGameById(result1.gameId)), `Daily challenge game ${result1.gameId} exists in registry`);
  const maxLevels = getGameLevelCount(result1.gameId);
  assert(result1.levelIndex >= 0 && result1.levelIndex < maxLevels, `Daily challenge level ${result1.levelIndex} is within bounds (< ${maxLevels})`);
});

// 6. Recommendation Engine
console.log('\n--- 6. Recommendation Engine ---');
const rec1 = getRecommendedGames('mini-sudoku');
assert(rec1.length >= 2, 'Recommends games based on mini-sudoku history');
const rec2 = getRecommendedGames('element-match');
assert(rec2.length >= 1, 'Recommends games based on element-match history');

// 7. Engine Validations for 14 New Games
console.log('\n--- 7. Game Engine Verification for 14 New Games ---');

// Game 7: Element Match
assert(ELEMENT_MATCH_LEVELS.length === 10, 'Element Match has 10 levels');
assert(checkElementMatch('h', 'h'), 'Element Match pair check works');

// Game 8: Molecule Builder
assert(MOLECULE_BUILDER_LEVELS.length === 10, 'Molecule Builder has 10 levels');
const h2oAtoms = [
  { id: '1', symbol: 'H', valence: 1, name: { en: 'Hydrogen', ta: 'ஹைட்ரஜன்' }, color: '#3B82F6' },
  { id: '2', symbol: 'H', valence: 1, name: { en: 'Hydrogen', ta: 'ஹைட்ரஜன்' }, color: '#3B82F6' },
  { id: '3', symbol: 'O', valence: 2, name: { en: 'Oxygen', ta: 'ஆக்சிஜன்' }, color: '#EF4444' },
];
assert(isMoleculeComplete(h2oAtoms, MOLECULE_BUILDER_LEVELS[0]), 'Molecule Builder H2O verification passed');

// Game 9: Circuit Lab
assert(CIRCUIT_LAB_LEVELS.length === 10, 'Circuit Lab has 10 levels');
const sampleGrid: any = [
  ['corner-tl', 'wire-horizontal', 'corner-tr'],
  ['wire-vertical', 'empty', 'wire-vertical'],
  ['corner-bl', 'wire-horizontal', 'corner-br'],
];
assert(isCircuitComplete(sampleGrid, CIRCUIT_LAB_LEVELS[0]), 'Circuit Lab closed loop detection works');

// Game 10: Memory Matrix
assert(MEMORY_MATRIX_LEVELS.length === 10, 'Memory Matrix has 10 levels');
const card0 = MEMORY_MATRIX_LEVELS[0].cards[0];
const card1 = MEMORY_MATRIX_LEVELS[0].cards[1];
assert(isCardPairMatch(card0, card1), 'Memory Matrix card pair match check works');
assert(isMemoryMatrixComplete(['p1', 'p2', 'p3', 'p4'], MEMORY_MATRIX_LEVELS[0]), 'Memory Matrix completion check works');

// Game 11: Orbit
assert(ORBIT_LEVELS.length === 10, 'Orbit has 10 levels');
const orbitLevel0 = ORBIT_LEVELS[0];
const validOrbitPath = [
  { row: 0, col: 0 },
  { row: 0, col: 1 },
  { row: 0, col: 2 },
  { row: 1, col: 2 }, // Waypoint 1
  { row: 2, col: 2 },
  { row: 3, col: 2 },
  { row: 3, col: 3 }, // Target
];
assert(isOrbitComplete(validOrbitPath, orbitLevel0), 'Orbit target path resolution works');

// Game 12: Reaction Sort
assert(REACTION_SORT_LEVELS.length === 10, 'Reaction Sort has 10 levels');
const lemonJuice = REACTION_SORT_LEVELS[0].items[0]; // Lemon Juice (Acid)
assert(isSortCorrect(lemonJuice, 'acid'), 'Reaction Sort acid classification works');

// Game 13: Science Word Grid
assert(SCIENCE_WORD_GRID_LEVELS.length === 10, 'Science Word Grid has 10 levels');
const word0 = SCIENCE_WORD_GRID_LEVELS[0].words[0];
assert(Boolean(checkWordSelection(word0.path, SCIENCE_WORD_GRID_LEVELS[0])), 'Science Word Grid path recognition works');

// Game 14: Pattern Lab
assert(PATTERN_LAB_LEVELS.length === 10, 'Pattern Lab has 10 levels');
assert(isPatternAnswerCorrect('opt-8', PATTERN_LAB_LEVELS[0]), 'Pattern Lab Fibonacci level works');

// Game 15: Logic Lock
assert(LOGIC_LOCK_LEVELS.length === 10, 'Logic Lock has 10 levels');
assert(isLockSolved(['0', '4', '2'], LOGIC_LOCK_LEVELS[0]), 'Logic Lock vault solution check works');

// Game 16: Gravity Path
assert(GRAVITY_PATH_LEVELS.length === 10, 'Gravity Path has 10 levels');
const slideResult = slideParticle({ row: 0, col: 0 }, 'right', GRAVITY_PATH_LEVELS[0]);
assert(slideResult.finalPos.col === 3, 'Gravity Path slide physics works');

// Game 17: Lab Escape
assert(LAB_ESCAPE_LEVELS.length === 10, 'Lab Escape has 10 levels');
assert(isStageAnswerCorrect(0, 'opt-baking-soda', LAB_ESCAPE_LEVELS[0]), 'Lab Escape acid neutralization stage works');

// Game 18: Time Machine
assert(TIME_MACHINE_LEVELS.length === 10, 'Time Machine has 10 levels');
const time0 = TIME_MACHINE_LEVELS[0];
const correctTimeline = ['ev-gravity', 'ev-lightbulb', 'ev-relativity', 'ev-moon'];
assert(isTimelineCorrect(correctTimeline, time0), 'Time Machine chronological verification works');

// Game 19: DNA Sequence
assert(DNA_SEQUENCE_LEVELS.length === 10, 'DNA Sequence has 10 levels');
assert(getComplementBase('A', 'dna-pair') === 'T', 'DNA base pairing A -> T works');
assert(getComplementBase('A', 'rna-transcribe') === 'U', 'RNA transcription A -> U works');
assert(isDnaSequenceComplete(['T', 'A', 'G', 'C'], DNA_SEQUENCE_LEVELS[0]), 'DNA sequence level 1 complete');

// Game 20: Magnet Maze
assert(MAGNET_MAZE_LEVELS.length === 10, 'Magnet Maze has 10 levels');
assert(isMagnetMazeComplete({ row: 3, col: 3 }, 'S', MAGNET_MAZE_LEVELS[0]), 'Magnet Maze target reached check works');

console.log('\n========================================================');
console.log(`📊 SUMMARY: ${passedTests} / ${totalTests} tests passed (${failedTests} failed)`);
console.log('========================================================\n');

if (failedTests > 0) {
  process.exit(1);
} else {
  console.log('🎉 ALL TESTS PASSED SUCCESSFULLY!');
}
