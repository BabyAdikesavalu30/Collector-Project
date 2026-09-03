/**
 * Vigyaan Design System — Unified Theme
 */

import { colors } from './colors';
import { typography, fontFamilies } from './typography';
import { spacing, borderRadius, elevation } from './spacing';

export const theme = {
  colors,
  typography,
  fontFamilies,
  spacing,
  borderRadius,
  elevation,
} as const;

export type Theme = typeof theme;
export * from './colors';
export * from './typography';
export * from './spacing';
