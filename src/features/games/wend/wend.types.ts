/**
 * Wend Game Types & Models
 * Word-path weaving logic models for Game 2.
 */

import { LocalizedGameText } from '../games.types';

export interface WendCell {
  row: number;
  col: number;
}

export interface WendLevel {
  id: string;
  name: string;
  targetWord: LocalizedGameText;
  hint: LocalizedGameText;
  grid: string[][]; // English letter matrix
  taGrid?: string[][]; // Tamil letter matrix
}

export interface WendGameState {
  levelIndex: number;
  level: WendLevel;
  selectedPath: WendCell[];
  currentWord: string;
  isCompleted: boolean;
  moves: number;
  mistakes: number;
  elapsedSeconds: number;
}
