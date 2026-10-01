/**
 * Vigyaan Design System — Semantic Color Tokens
 * Master Palette: PEARL WHITE base + PEARL BLUE primary action + DEEP NAVY typography
 */

export const colors = {
  // --- NEW PEARL BLUE MINIMAL UI TOKENS ---
  deepNavy: '#0B1F3A',
  darkBlue: '#123A63',
  pearlBlue: '#3B82C4',
  softBlue: '#EEF5FB',
  background: '#F8FAFC',
  textDisabled: '#9AA9B8',
  borderSubtle: '#F0F4F8',
  borderStrong: '#BCCCDC',
  accent: '#3B82C4',
  accentSurface: '#EEF5FB',
  accentPressed: '#2E69A3', 
  accentLavender: '#8B5CF6',
  accentMint: '#10B981',
  accentCyan: '#06B6D4',
  accentYellow: '#F59E0B',
  accentCoral: '#F43F5E',
  accentPink: '#EC4899',
  glassSurface: 'rgba(255, 255, 255, 0.75)',
  glassBorder: 'rgba(255, 255, 255, 0.5)',

  // --- EXISTING TOKENS (Mapped to Pearl Blue system) ---
  // 1. Pearl White & Surface Foundations
  pearlWhite: '#F8FAFC', 
  white: '#FFFFFF', 
  surfaceWhite: '#FFFFFF',
  surfaceCardLight: '#FFFFFF',
  black: '#0B1F3A',

  // 2. Navy & Slate Typography Hierarchy
  navy900: '#0B1F3A', // Deep Navy
  navy800: '#102A43', // Primary Text
  navy700: '#123A63', // Dark Blue
  slate600: '#52667A', // Secondary Text
  slate500: '#9AA9B8', // Disabled Text
  slate400: '#D9E3EC', // Border

  // 3. Royal / Electric Blue Scale -> Pearl Blue Scale
  blue50: '#F0F4F8',
  blue100: '#EEF5FB', // Soft Blue
  blue200: '#D9E3EC',
  blue300: '#BCCCDC',
  blue400: '#82A5C9',
  blue500: '#5C93C4',
  blue600: '#3B82C4', // Pearl Blue
  blue700: '#2E69A3', 
  blue800: '#205082',
  blue900: '#123A63', // Dark Blue

  // 4. Purple Scale (Brand) -> Mapped to Pearl Blue to remove visual noise
  purple50: '#EEF5FB',
  purple100: '#D9E3EC',
  purple200: '#BCCCDC',
  purple300: '#82A5C9',
  purple400: '#5C93C4',
  purple500: '#3B82C4',
  purple600: '#3B82C4',
  purple700: '#3B82C4', // Pearl Blue
  purple800: '#2E69A3',
  purple900: '#123A63',

  // 5. Green Scale -> Mint / Success
  green50: '#ECFDF5',
  green100: '#D1FAE5',
  green200: '#A7F3D0',
  green300: '#6EE7B7',
  green400: '#34D399',
  green500: '#10B981',
  green600: '#059669', // Success
  green700: '#047857',
  green800: '#065F46',
  green900: '#064E3B',

  // 6. Neutral Grays & Borders -> Pearl System
  gray50: '#F8FAFC',
  gray100: '#F0F4F8',
  gray200: '#D9E3EC', 
  gray300: '#BCCCDC', 
  gray400: '#9AA9B8',
  gray500: '#52667A',
  gray600: '#123A63',
  gray700: '#102A43',

  // 7. Error / Alert Red Scale
  error50: '#FEF2F2',
  error100: '#FEE2E2',
  error200: '#FECACA',
  error500: '#EF4444',
  error600: '#DC2626',
  error700: '#B91C1C',

  // Semantic Role Mapping: Primary Interaction
  actionPrimary: '#3B82C4',
  actionPrimaryPressed: '#2E69A3',
  actionSecondary: '#EEF5FB',
  actionBorder: '#D9E3EC',
  accentBlue: '#3B82C4',
  interactiveActive: '#3B82C4',
  interactiveFocus: '#3B82C4',

  // Semantic Role Mapping: Brand Identity
  brandPrimary: '#3B82C4',
  brandSecondary: '#2E69A3',
  brandTertiary: '#3B82C4',
  brandBadge: '#EEF5FB',
  brandBadgeBorder: '#D9E3EC',
  brandBadgeText: '#123A63',
  accentPurple: '#3B82C4', // mapped to blue

  // Semantic Role Mapping: Positive Learning & Mastery
  success: '#10B981',
  successBackground: '#ECFDF5',
  successSurface: '#ECFDF5',
  successBorder: '#A7F3D0',
  accentGreen: '#10B981',
  progressFill: '#3B82C4',
  progressActive: '#3B82C4',

  // Semantic Role Mapping: Surfaces & Backgrounds
  backgroundPrimary: '#F8FAFC',
  backgroundSecondary: '#FFFFFF',
  backgroundCard: '#FFFFFF',
  backgroundOverlay: 'rgba(11, 31, 58, 0.65)',
  backgroundLight: '#F8FAFC',
  surface: '#FFFFFF',
  surfaceElevated: '#FFFFFF',
  surfaceMuted: '#F0F4F8',
  surfaceGlow: 'rgba(59, 130, 196, 0.08)',

  // Borders & Dividers
  border: '#D9E3EC',
  divider: '#F0F4F8',
  surfaceBorder: '#D9E3EC',
  surfaceBorderBright: 'rgba(59, 130, 196, 0.4)',

  // Typography Tokens
  textPrimary: '#102A43',
  textSecondary: '#52667A',
  textMuted: '#9AA9B8', 
  textAccent: '#3B82C4', 
  textAction: '#3B82C4', 
  textSuccess: '#10B981', 
  textGold: '#F59E0B',
  textOnBrand: '#FFFFFF',
  textOnAction: '#FFFFFF',
  textInverse: '#FFFFFF',

  // Semantic Alerts & Feedback
  error: '#EF4444',
  errorBackground: '#FEF2F2',
  errorSurface: '#FEF2F2',
  errorBorder: '#FECACA',
  warning: '#F59E0B',
  warningBackground: '#FFFBEB',
  warningSurface: '#FFFBEB',
  warningBorder: '#FDE68A',
  info: '#3B82C4',
  infoBackground: '#EEF5FB',
  infoSurface: '#EEF5FB',
  infoBorder: '#D9E3EC',
  accentGold: '#F59E0B',
  accentTeal: '#06B6D4',
  accentRed: '#EF4444',

  // Decorative Elements
  accentGlow: 'rgba(59, 130, 196, 0.15)',
  orbitRing: 'rgba(59, 130, 196, 0.15)',
  orbitRingActive: 'rgba(59, 130, 196, 0.35)',
  particleGlow: 'rgba(59, 130, 196, 0.4)',
} as const;

export type ColorToken = keyof typeof colors;
