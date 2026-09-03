/**
 * Riddle Feature Utilities
 * Category resolution and validation helpers.
 */

import { RiddleDifficulty, RiddleCategory } from './riddle.types';
import { RIDDLE_CATEGORIES } from './riddle.mock';

const VALID_DIFFICULTIES: RiddleDifficulty[] = ['easy', 'medium', 'hard', 'genius'];

export function isValidRiddleDifficulty(val?: string | null): val is RiddleDifficulty {
  if (!val) return false;
  return VALID_DIFFICULTIES.includes(val as RiddleDifficulty);
}

export function resolveCategoryById(id?: string | null): RiddleCategory | undefined {
  if (!id) return undefined;
  return RIDDLE_CATEGORIES.find((cat) => cat.id === id);
}
