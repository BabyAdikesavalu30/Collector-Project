/**
 * Vigyaan Design System — Responsive & Adaptive Layout Engine (Phase 52)
 * Centralized breakpoint model, adaptive spacing tokens, dynamic layout hooks,
 * and responsive utilities for mobile device sizes (compact <360dp, standard 360-430dp, expanded >430dp).
 */

import { useWindowDimensions, ViewStyle, TextStyle } from 'react-native';

export type ScreenSizeCategory = 'compact' | 'standard' | 'expanded';
export type ScreenOrientation = 'portrait' | 'landscape';

export const BREAKPOINTS = {
  COMPACT_MAX: 359,
  STANDARD_MAX: 430,
} as const;

export const responsiveSpacing = {
  screenHorizontalPaddingCompact: 12,
  screenHorizontalPaddingStandard: 16,
  screenHorizontalPaddingExpanded: 24,
  maxContentWidth: 540,
  maxCardWidth: 500,
} as const;

/**
 * Returns the screen size category based on screen width.
 * - compact: < 360dp (e.g. 320dp small Androids, small iPhones)
 * - standard: 360–430dp (e.g. iPhone 13/14/15/16, Pixel 7/8, Galaxy S23/S24)
 * - expanded: > 430dp (e.g. Pro Max, Plus, foldables, tablets)
 */
export function getScreenSizeCategory(width: number): ScreenSizeCategory {
  if (width < 360) return 'compact';
  if (width <= 430) return 'standard';
  return 'expanded';
}

/**
 * Returns consistent horizontal screen padding matching the responsive tokens.
 */
export function getResponsiveHorizontalPadding(width: number): number {
  const category = getScreenSizeCategory(width);
  switch (category) {
    case 'compact':
      return responsiveSpacing.screenHorizontalPaddingCompact;
    case 'expanded':
      return responsiveSpacing.screenHorizontalPaddingExpanded;
    case 'standard':
    default:
      return responsiveSpacing.screenHorizontalPaddingStandard;
  }
}

/**
 * Computes optimal column count for grid-based views without cramping on small screens.
 */
export function getResponsiveGridColumns(
  width: number,
  minColumnWidth: number = 140,
  maxColumns: number = 4
): number {
  const padding = getResponsiveHorizontalPadding(width) * 2;
  const availableWidth = width - padding;
  const computed = Math.floor(availableWidth / minColumnWidth);
  return Math.max(1, Math.min(maxColumns, computed));
}

/**
 * Safely scales font size based on device category while preventing text clipping.
 */
export function getResponsiveFontSize(
  baseSize: number,
  category: ScreenSizeCategory,
  maxScale: number = 1.3
): number {
  if (category === 'compact') {
    // Subtle, safe decrease on compact screens to prevent overflow
    return Math.max(10, Math.round(baseSize * 0.92));
  }
  if (category === 'expanded') {
    return Math.min(Math.round(baseSize * maxScale), Math.round(baseSize * 1.08));
  }
  return baseSize;
}

/**
 * Computes adaptive spacing token based on screen size category.
 */
export function getResponsiveSpacing(baseSpacing: number, category: ScreenSizeCategory): number {
  if (category === 'compact') {
    return Math.max(4, Math.round(baseSpacing * 0.8));
  }
  if (category === 'expanded') {
    return Math.round(baseSpacing * 1.2);
  }
  return baseSpacing;
}

/**
 * Computes safe game board size and maximum cell size preventing horizontal overflow.
 */
export function getGameBoardSize(
  windowWidth: number,
  windowHeight: number = 800,
  insets?: { top?: number; bottom?: number },
  maxDesiredSize: number = 360
): { boardSize: number; maxCellSize: number } {
  const horizontalPadding = windowWidth < 360 ? 24 : 36;
  const availableWidth = windowWidth - horizontalPadding;

  const topInset = insets?.top || 0;
  const bottomInset = insets?.bottom || 0;
  // Reserve vertical space for header (60), controls/keys (140), and insets
  const availableHeight = Math.max(260, windowHeight - topInset - bottomInset - 240);

  const boardSize = Math.min(availableWidth, availableHeight, maxDesiredSize);
  const maxCellSize = Math.floor(boardSize / 4);

  return {
    boardSize: Math.max(240, boardSize),
    maxCellSize: Math.max(36, maxCellSize),
  };
}

export interface ResponsiveLayoutInfo {
  width: number;
  height: number;
  category: ScreenSizeCategory;
  isCompact: boolean;
  isStandard: boolean;
  isExpanded: boolean;
  isLandscape: boolean;
  horizontalPadding: number;
  contentMaxWidth: number;
  containerStyle: ViewStyle;
}

/**
 * Hook providing dynamic window dimensions and responsive layout classifications.
 */
export function useResponsiveLayout(): ResponsiveLayoutInfo {
  const { width, height } = useWindowDimensions();
  const category = getScreenSizeCategory(width);
  const isCompact = category === 'compact';
  const isStandard = category === 'standard';
  const isExpanded = category === 'expanded';
  const isLandscape = width > height;
  const horizontalPadding = getResponsiveHorizontalPadding(width);

  return {
    width,
    height,
    category,
    isCompact,
    isStandard,
    isExpanded,
    isLandscape,
    horizontalPadding,
    contentMaxWidth: responsiveSpacing.maxContentWidth,
    containerStyle: {
      width: '100%',
      maxWidth: isExpanded ? responsiveSpacing.maxContentWidth : undefined,
      alignSelf: isExpanded ? 'center' : undefined,
      paddingHorizontal: horizontalPadding,
    },
  };
}

/**
 * Hook returning true if current device screen width is compact (<360dp).
 */
export function useIsCompactScreen(): boolean {
  const { width } = useWindowDimensions();
  return width < 360;
}

/**
 * Hook returning true if current device screen width is expanded (>430dp).
 */
export function useIsLargeScreen(): boolean {
  const { width } = useWindowDimensions();
  return width > 430;
}
