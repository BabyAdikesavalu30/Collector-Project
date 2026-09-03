/**
 * Vigyaan Design System — Typography Tokens
 * Robust cross-platform system font stack supporting English and Tamil scripts.
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
  hero: {
    fontSize: 34,
    lineHeight: 42,
    fontWeight: '800',
    letterSpacing: 2,
  } as TextStyle,
  h1: {
    fontSize: 26,
    lineHeight: 34,
    fontWeight: '700',
    letterSpacing: 1,
  } as TextStyle,
  h2: {
    fontSize: 20,
    lineHeight: 28,
    fontWeight: '700',
    letterSpacing: 0.5,
  } as TextStyle,
  h3: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '600',
    letterSpacing: 0.25,
  } as TextStyle,
  bodyLarge: {
    fontSize: 15,
    lineHeight: 22,
    fontWeight: '500',
    letterSpacing: 0.15,
  } as TextStyle,
  body: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '400',
    letterSpacing: 0.1,
  } as TextStyle,
  caption: {
    fontSize: 11,
    lineHeight: 15,
    fontWeight: '500',
    letterSpacing: 0.5,
  } as TextStyle,
  overline: {
    fontSize: 10,
    lineHeight: 14,
    fontWeight: '700',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  } as TextStyle,
  badge: {
    fontSize: 11,
    lineHeight: 14,
    fontWeight: '600',
    letterSpacing: 0.4,
  } as TextStyle,
  button: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '700',
    letterSpacing: 0.5,
  } as TextStyle,
  tamilSubtitle: {
    fontSize: 13,
    lineHeight: 19,
    fontWeight: '600',
    letterSpacing: 0.2,
  } as TextStyle,
} as const;

export type TypographyToken = keyof typeof typography;
