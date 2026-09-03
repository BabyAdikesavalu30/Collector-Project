/**
 * Wend Game Engine
 * Word weaving validation, letter adjacency, and prefix checking.
 */

import { WendCell, WendLevel } from './wend.types';

export function isSameWendCell(a: WendCell, b: WendCell): boolean {
  return a.row === b.row && a.col === b.col;
}

export function isWendAdjacent(a: WendCell, b: WendCell): boolean {
  const dRow = Math.abs(a.row - b.row);
  const dCol = Math.abs(a.col - b.col);
  return dRow <= 1 && dCol <= 1 && (dRow !== 0 || dCol !== 0);
}

export function getLetterAt(
  level: WendLevel,
  row: number,
  col: number,
  language: 'en' | 'ta' = 'en'
): string {
  const grid = (language === 'ta' && level.taGrid) ? level.taGrid : level.grid;
  if (row < 0 || row >= grid.length || col < 0 || col >= grid[row].length) {
    return '';
  }
  return grid[row][col];
}

export function getConstructedWord(
  path: WendCell[],
  level: WendLevel,
  language: 'en' | 'ta' = 'en'
): string {
  return path.map((cell) => getLetterAt(level, cell.row, cell.col, language)).join('');
}

export function validateWendStep(
  currentPath: WendCell[],
  nextCell: WendCell,
  level: WendLevel,
  language: 'en' | 'ta' = 'en'
): { valid: boolean; isUndo?: boolean; error?: string } {
  // 1. Tapping the previous cell is an UNDO
  if (
    currentPath.length >= 2 &&
    isSameWendCell(currentPath[currentPath.length - 2], nextCell)
  ) {
    return { valid: true, isUndo: true };
  }

  // 2. Empty path allows any cell containing the 1st character of target word
  const target = (language === 'ta' ? level.targetWord.ta : level.targetWord.en).toUpperCase();
  const letter = getLetterAt(level, nextCell.row, nextCell.col, language).toUpperCase();

  if (currentPath.length === 0) {
    if (target.startsWith(letter)) {
      return { valid: true };
    }
    return { valid: false, error: 'Must start with the first letter' };
  }

  // 3. Must be adjacent to last cell
  const lastCell = currentPath[currentPath.length - 1];
  if (isSameWendCell(lastCell, nextCell)) {
    return { valid: false, error: 'Already selected' };
  }

  if (!isWendAdjacent(lastCell, nextCell)) {
    return { valid: false, error: 'Must be adjacent to last letter' };
  }

  // 4. Cannot reuse cell in same word
  if (currentPath.some((c) => isSameWendCell(c, nextCell))) {
    return { valid: false, error: 'Cell already used' };
  }

  // 5. Letter must match next character of target word
  const currentWord = getConstructedWord(currentPath, level, language).toUpperCase();
  const candidateWord = currentWord + letter;

  if (target.startsWith(candidateWord)) {
    return { valid: true };
  }

  return { valid: false, error: 'Does not match target word' };
}

export function isWendComplete(
  path: WendCell[],
  level: WendLevel,
  language: 'en' | 'ta' = 'en'
): boolean {
  const currentWord = getConstructedWord(path, level, language).toUpperCase();
  const target = (language === 'ta' ? level.targetWord.ta : level.targetWord.en).toUpperCase();
  return currentWord === target;
}
