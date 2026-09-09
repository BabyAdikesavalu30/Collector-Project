/**
 * Vigyaan Design System — Unified Theme
 */

import { colors } from './colors';
import { typography, fontFamilies } from './typography';
import { spacing, borderRadius, elevation } from './spacing';
import { responsiveSpacing, BREAKPOINTS } from './responsive';

export const theme = {
  colors,
  typography,
  fontFamilies,
  spacing,
  borderRadius,
  elevation,
  responsive: responsiveSpacing,
  breakpoints: BREAKPOINTS,
} as const;

export type Theme = typeof theme;
export * from './colors';
export * from './typography';
export * from './spacing';
export * from './responsive';
