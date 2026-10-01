/**
 * Vigyaan Design System — Typography Tokens
 * Robust cross-platform system font stack supporting English and Tamil scripts.
 * PEARL BLUE MINIMAL UI
 */

import { Platform, TextStyle } from 'react-native';

export const fontFamilies = {
  regular: Platform.select({
    ios: undefined,
    android: 'sans-serif',
    default: undefined,
  }),
  medium: Platform.select({
    ios: undefined,
    android: 'sans-serif-medium',
    default: undefined,
  }),
  bold: Platform.select({
    ios: undefined,
    android: 'sans-serif-condensed',
    default: undefined,
  }),
};

export const typography = {
  // NEW TOKENS
  display: {
    fontSize: 34,
    lineHeight: 40,
    fontWeight: '800',
    letterSpacing: -0.5,
  } as TextStyle,
  bodyMedium: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '400',
    letterSpacing: 0.1,
  } as TextStyle,
  bodySmall: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '400',
    letterSpacing: 0.1,
  } as TextStyle,
  label: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '600',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  } as TextStyle,

  // EXISTING TOKENS (Updated sizes for Phase 2)
  hero: {
    fontSize: 34,
    lineHeight: 40,
    fontWeight: '800',
    letterSpacing: -0.5,
  } as TextStyle,
  h1: {
    fontSize: 28,
    lineHeight: 34,
    fontWeight: '700',
    letterSpacing: -0.3,
  } as TextStyle,
  h2: {
    fontSize: 22,
    lineHeight: 28,
    fontWeight: '600',
    letterSpacing: -0.2,
  } as TextStyle,
  h3: {
    fontSize: 18,
    lineHeight: 24,
    fontWeight: '600',
    letterSpacing: -0.1,
  } as TextStyle,
  bodyLarge: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '500',
    letterSpacing: 0,
  } as TextStyle,
  body: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '400',
    letterSpacing: 0,
  } as TextStyle,
  caption: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '500',
    letterSpacing: 0.2,
  } as TextStyle,
  overline: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '600',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  } as TextStyle,
  badge: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '600',
    letterSpacing: 0.5,
  } as TextStyle,
  button: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '600',
    letterSpacing: 0.2,
  } as TextStyle,
  tamilSubtitle: {
    fontSize: 14,
    lineHeight: 22,
    fontWeight: '600',
    letterSpacing: 0.1,
  } as TextStyle,
} as const;

export type TypographyToken = keyof typeof typography;
