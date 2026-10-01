/**
 * Vigyaan Design System — Spacing & Layout Tokens
 * PEARL BLUE MINIMAL UI
 */

export const spacing = {
  // NEW TOKENS
  space1: 4,
  space2: 8,
  space3: 12,
  space4: 16,
  space5: 20,
  space6: 24,
  space7: 32,
  space8: 40,
  space9: 48,

  // EXISTING TOKENS
  xxs: 4,
  xs: 8,
  sm: 12,
  md: 16,
  base: 16,
  lg: 20,
  xl: 24,
  xxl: 32,
  xxxl: 48,
  huge: 64,
} as const;

export const borderRadius = {
  // NEW TOKENS
  small: 8,
  medium: 12,
  large: 16,
  xlarge: 20,
  pill: 999,

  // EXISTING TOKENS
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  full: 9999,
} as const;

export const elevation = {
  // NEW TOKENS
  none: {
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  subtle: {
    shadowColor: '#0B1F3A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  medium: {
    shadowColor: '#0B1F3A',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 24,
    elevation: 8,
  },

  // EXISTING TOKENS
  card: {
    shadowColor: '#0B1F3A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  glow: {
    shadowColor: '#3B82C4',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 4,
  },
} as const;

export const motion = {
  fast: 150,
  normal: 300,
  slow: 500,
} as const;

export const opacity = {
  transparent: 0,
  glass: 0.75,
  disabled: 0.5,
  opaque: 1,
} as const;
