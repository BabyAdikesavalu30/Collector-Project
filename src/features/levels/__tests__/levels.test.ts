/**
 * Science Levels Engine Tests
 */

import { calculateScienceLevel } from '../levels.engine';
import { SCIENCE_LEVELS, MAX_SCIENCE_LEVEL } from '../levels.config';

describe('calculateScienceLevel', () => {
  it('starts at Level 1 with 0 XP', () => {
    const result = calculateScienceLevel(0);
    expect(result.level).toBe(1);
    expect(result.title).toBe('Curious Explorer');
    expect(result.progressPercent).toBe(0);
    expect(result.xpToNextLevel).toBe(100);
  });

  it('handles negative and non-finite XP gracefully', () => {
    expect(calculateScienceLevel(-50).level).toBe(1);
    expect(calculateScienceLevel(NaN).level).toBe(1);
    expect(calculateScienceLevel(Infinity).level).toBe(1);
  });

  it('computes progress inside a level window', () => {
    // Level 2: threshold 100, next 250 → span 150. 175 XP → 50% into level.
    const result = calculateScienceLevel(175);
    expect(result.level).toBe(2);
    expect(result.levelStartXp).toBe(100);
    expect(result.levelEndXp).toBe(250);
    expect(result.progressPercent).toBe(50);
    expect(result.xpToNextLevel).toBe(75);
  });

  it('clamps progress to 100 at the max level', () => {
    const maxLevel = SCIENCE_LEVELS[SCIENCE_LEVELS.length - 1];
    const result = calculateScienceLevel(maxLevel.xpThreshold + 5000);
    expect(result.level).toBe(MAX_SCIENCE_LEVEL);
    expect(result.isMaxLevel).toBe(true);
    expect(result.progressPercent).toBe(100);
    expect(result.xpToNextLevel).toBe(0);
  });

  it('is data-driven: every level in the config is reachable', () => {
    for (const config of SCIENCE_LEVELS) {
      const result = calculateScienceLevel(config.xpThreshold);
      expect(result.level).toBe(config.level);
      expect(result.title).toBe(config.title);
    }
  });

  it('returns a Tamil title for every level', () => {
    for (const config of SCIENCE_LEVELS) {
      expect(config.titleTa.length).toBeGreaterThan(0);
    }
  });

  it('keeps thresholds strictly increasing', () => {
    for (let i = 1; i < SCIENCE_LEVELS.length; i += 1) {
      expect(SCIENCE_LEVELS[i].xpThreshold).toBeGreaterThan(SCIENCE_LEVELS[i - 1].xpThreshold);
    }
  });

  it('sits at 99% just below the next threshold and 0% exactly at it', () => {
    // Level 2 spans 100 → 250; 249 XP is 99% of the way up.
    const justBelow = calculateScienceLevel(249);
    expect(justBelow.level).toBe(2);
    expect(justBelow.progressPercent).toBe(99);
    expect(justBelow.xpToNextLevel).toBe(1);

    const atThreshold = calculateScienceLevel(250);
    expect(atThreshold.level).toBe(3);
    expect(atThreshold.levelStartXp).toBe(250);
    expect(atThreshold.progressPercent).toBe(0);
    expect(atThreshold.xpToNextLevel).toBe(200); // next threshold is 450
  });

  it('handles very large XP values above the final threshold', () => {
    const huge = calculateScienceLevel(1_000_000);
    expect(huge.level).toBe(MAX_SCIENCE_LEVEL);
    expect(huge.isMaxLevel).toBe(true);
    expect(huge.progressPercent).toBe(100);
    expect(huge.totalXp).toBe(1_000_000);
    expect(huge.titleTa.length).toBeGreaterThan(0);
  });

  it('floors fractional XP and exposes bilingual titles on every result', () => {
    const fractional = calculateScienceLevel(100.9);
    expect(fractional.totalXp).toBe(100);
    expect(fractional.level).toBe(2);
    expect(fractional.titleTa).toBe('அறிவியல் தொடக்கநிலையாளர்');
    expect(calculateScienceLevel(0).title).toBe('Curious Explorer');
  });
});