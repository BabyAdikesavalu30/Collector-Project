/**
 * Science Levels Feature Types
 * Data-driven science progression: levels, titles, thresholds.
 */

export interface ScienceLevelConfig {
  /** 1-based level number. */
  level: number;
  /** Minimum total XP required to reach this level. */
  xpThreshold: number;
  title: string;
  titleTa: string;
  icon: string;
}

export interface ScienceLevelInfo {
  level: number;
  title: string;
  titleTa: string;
  icon: string;
  totalXp: number;
  /** XP required to enter the current level (inclusive). */
  levelStartXp: number;
  /** XP required to enter the next level (exclusive). */
  levelEndXp: number;
  progressPercent: number; // 0 - 100
  xpToNextLevel: number;
  isMaxLevel: boolean;
}