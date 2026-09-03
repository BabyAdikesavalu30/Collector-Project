/**
 * Vigyaan Games Universe Data Types & Models
 * Core definitions for the 20 mini-games, scoring, state machines, progression, collections, and persistence.
 */

export type GameId =
  | 'zip'
  | 'wend'
  | 'patches'
  | 'mini-sudoku'
  | 'tango'
  | 'queens'
  | 'element-match'
  | 'molecule-builder'
  | 'circuit-lab'
  | 'memory-matrix'
  | 'orbit'
  | 'reaction-sort'
  | 'science-word-grid'
  | 'pattern-lab'
  | 'logic-lock'
  | 'gravity-path'
  | 'lab-escape'
  | 'time-machine'
  | 'dna-sequence'
  | 'magnet-maze'
  | 'fun-facts';

export type GameCategory =
  | 'all'
  | 'logic'
  | 'words'
  | 'grid'
  | 'numbers'
  | 'memory'
  | 'science'
  | 'chemistry'
  | 'physics'
  | 'biology'
  | 'spatial'
  | 'patterns'
  | 'discovery';

export type GameMode =
  | 'classic'
  | 'daily'
  | 'timed'
  | 'zen'
  | 'challenge'
  | 'practice'
  | 'endless';

export type GameStatus = 'ready' | 'playing' | 'paused' | 'completed';

export interface LocalizedGameText {
  en: string;
  ta: string;
}

export interface GameDefinition {
  id: GameId;
  title: LocalizedGameText;
  subtitle: LocalizedGameText;
  description: LocalizedGameText;
  category: GameCategory;
  tags?: string[];
  icon: string;
  badgeNumber: number;
  route: string;
  bgGlow: string;
  accentColor: string;
  totalLevels: number;
  supportedModes: GameMode[];
  supportsHints?: boolean;
}

export interface GameResult {
  gameId: GameId;
  levelId: string;
  levelIndex: number;
  completed: boolean;
  score: number;
  stars?: 1 | 2 | 3;
  timeMs: number;
  moves: number;
  mistakes: number;
  isPerfect?: boolean;
  completedAt: number;
}

export interface GameLevelProgress {
  completed: boolean;
  unlocked: boolean;
  stars?: 1 | 2 | 3;
  isPerfect?: boolean;
  bestTimeSeconds?: number;
  bestMoves?: number;
  highScore?: number;
  completedAt?: number;
}

export interface GameProgress {
  gameId: GameId;
  levels: Record<string, GameLevelProgress>;
  highestUnlockedLevel: number;
  lastPlayedAt: number;
  masteryPercent?: number;
}

export interface GamesStateSummary {
  [gameId: string]: GameProgress;
}

export interface GameStreakInfo {
  currentStreak: number;
  longestStreak: number;
  lastPlayedDate: string; // YYYY-MM-DD
  history: string[]; // dates played
}

export interface DailyChallengeInfo {
  date: string; // YYYY-MM-DD
  gameId: GameId;
  levelIndex: number;
  completed: boolean;
  rewardStars: number;
  completedAt?: number;
}

export interface GameCollection {
  id: string;
  title: LocalizedGameText;
  description: LocalizedGameText;
  icon: string;
  accentColor: string;
  gameIds: GameId[];
}

export type BadgeRequirement =
  | { type: 'levelsCompleted'; value: number }
  | { type: 'gamesPlayed'; value: number }
  | { type: 'streak'; value: number }
  | { type: 'perfectLevel' }
  | { type: 'speedTime'; seconds: number }
  | { type: 'mastery'; category: GameCategory; value: number };

export interface GameBadge {
  id: string;
  title: LocalizedGameText;
  description: LocalizedGameText;
  icon: string;
  category: 'streak' | 'mastery' | 'completion' | 'special';
  unlockedAt?: number;
  requirement: BadgeRequirement | string;
  requirementDescription?: string;
}

export interface GameRecommendation {
  gameId: GameId;
  reason: LocalizedGameText;
}

export interface RecentGameSession {
  gameId: GameId;
  levelIndex: number;
  score: number;
  completedAt: number;
}
