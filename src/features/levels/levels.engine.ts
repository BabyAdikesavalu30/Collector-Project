/**
 * Science Levels Feature Engine
 * Pure, testable level calculation. Given a total XP value it returns the
 * current level, title, progress within the level, and XP remaining.
 */

import { ScienceLevelInfo } from './levels.types';
import { SCIENCE_LEVELS, MAX_SCIENCE_LEVEL } from './levels.config';

/**
 * Calculates the science level info for a given total XP.
 * Pure function — safe to call anywhere without touching storage.
 */
export function calculateScienceLevel(totalXp: number): ScienceLevelInfo {
  const safeXp = Number.isFinite(totalXp) && totalXp > 0 ? Math.floor(totalXp) : 0;

  let current = SCIENCE_LEVELS[0];
  for (const level of SCIENCE_LEVELS) {
    if (safeXp >= level.xpThreshold) {
      current = level;
    } else {
      break;
    }
  }

  const isMaxLevel = current.level >= MAX_SCIENCE_LEVEL;
  const nextLevel = isMaxLevel ? null : SCIENCE_LEVELS.find((l) => l.level === current.level + 1);

  const levelStartXp = current.xpThreshold;
  const levelEndXp = nextLevel ? nextLevel.xpThreshold : current.xpThreshold;
  const span = levelEndXp - levelStartXp;
  const intoLevel = safeXp - levelStartXp;

  let progressPercent = 100;
  let xpToNextLevel = 0;
  if (!isMaxLevel && span > 0) {
    progressPercent = Math.min(100, Math.round((intoLevel / span) * 100));
    xpToNextLevel = Math.max(0, levelEndXp - safeXp);
  }

  return {
    level: current.level,
    title: current.title,
    titleTa: current.titleTa,
    icon: current.icon,
    totalXp: safeXp,
    levelStartXp,
    levelEndXp,
    progressPercent,
    xpToNextLevel,
    isMaxLevel,
  };
}