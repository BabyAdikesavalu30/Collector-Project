/**
 * Vigyaan Design System — Semantic Color Tokens
 * Master Palette: PEARL WHITE base + ROYAL BLUE primary action + PURPLE brand + GREEN positive + NAVY typography
 */

export const colors = {
  // 1. Pearl White & Surface Foundations
  pearlWhite: '#F8FAFC', // Primary app screen background
  white: '#FFFFFF', // Clean floating cards, inputs, navigation
  surfaceWhite: '#FFFFFF',
  surfaceCardLight: '#FFFFFF',
  black: '#0F172A',

  // 2. Navy & Slate Typography Hierarchy
  navy900: '#0F172A', // Primary headings, titles, high-emphasis text
  navy800: '#1E293B', // Body text, active form labels
  navy700: '#334155', // Subheadings, table headers
  slate600: '#475569', // Secondary captions, supportive text
  slate500: '#64748B', // Muted timestamps, disabled placeholders
  slate400: '#94A3B8', // Inactive icons, subtle borders

  // 3. Royal / Electric Blue Scale (Primary Action & Active Controls)
  blue50: '#EFF6FF',
  blue100: '#DBEAFE',
  blue200: '#BFDBFE',
  blue300: '#93C5FD',
  blue400: '#60A5FA',
  blue500: '#3B82F6',
  blue600: '#2563EB', // Primary interactive brand action
  blue700: '#1D4ED8', // Pressed / Hover state
  blue800: '#1E40AF',
  blue900: '#1E3A8A',

  // 4. Purple Scale (Vigyaan Identity & Premium Accents)
  purple50: '#FAF5FF',
  purple100: '#F3E8FF',
  purple200: '#E9D5FF',
  purple300: '#D8B4FE',
  purple400: '#C084FC',
  purple500: '#A855F7',
  purple600: '#9333EA',
  purple700: '#7E22CE', // Vibrant brand identity
  purple800: '#6B21A8',
  purple900: '#581C87',

  // 5. Green Scale (Positive Learning States, Mastery & Success)
  green50: '#F0FDF4',
  green100: '#DCFCE7',
  green200: '#BBF7D0',
  green300: '#86EFAC',
  green400: '#4ADE80',
  green500: '#22C55E',
  green600: '#16A34A', // Science success, correct answer, progress mastery
  green700: '#15803D',
  green800: '#166534',
  green900: '#14532D',

  // 6. Neutral Grays & Borders
  gray50: '#F8FAFC',
  gray100: '#F1F5F9',
  gray200: '#E2E8F0', // Subtle card border
  gray300: '#CBD5E1', // Input border default
  gray400: '#94A3B8',
  gray500: '#64748B',
  gray600: '#475569',
  gray700: '#334155',

  // 7. Error / Alert Red Scale
  error50: '#FEF2F2',
  error100: '#FEE2E2',
  error200: '#FECACA',
  error500: '#EF4444',
  error600: '#DC2626', // Validation errors, incorrect answer, destructive
  error700: '#B91C1C',

  // Semantic Role Mapping: Primary Interaction (BLUE)
  actionPrimary: '#2563EB',
  actionPrimaryPressed: '#1D4ED8',
  actionSecondary: '#EFF6FF',
  actionBorder: '#BFDBFE',
  accentBlue: '#2563EB',
  interactiveActive: '#2563EB',
  interactiveFocus: '#2563EB',

  // Semantic Role Mapping: Brand Identity (PURPLE)
  brandPrimary: '#7E22CE',
  brandSecondary: '#6B21A8',
  brandTertiary: '#9333EA',
  brandBadge: '#F3E8FF',
  brandBadgeBorder: '#D8B4FE',
  brandBadgeText: '#7E22CE',
  accentPurple: '#7E22CE',

  // Semantic Role Mapping: Positive Learning & Mastery (GREEN)
  success: '#16A34A',
  successBackground: '#F0FDF4',
  successSurface: '#F0FDF4',
  successBorder: '#86EFAC',
  accentGreen: '#16A34A',
  progressFill: '#16A34A',
  progressActive: '#2563EB',

  // Semantic Role Mapping: Surfaces & Backgrounds
  backgroundPrimary: '#F8FAFC', // Pearl White base
  backgroundSecondary: '#FFFFFF',
  backgroundCard: '#FFFFFF', // Clean white cards
  backgroundOverlay: 'rgba(15, 23, 42, 0.65)',
  backgroundLight: '#F8FAFC',
  surface: '#FFFFFF',
  surfaceElevated: '#FFFFFF',
  surfaceMuted: '#F1F5F9',
  surfaceGlow: 'rgba(37, 99, 235, 0.08)',

  // Borders & Dividers
  border: '#E2E8F0',
  divider: '#F1F5F9',
  surfaceBorder: '#E2E8F0',
  surfaceBorderBright: 'rgba(37, 99, 235, 0.4)',

  // Typography Tokens
  textPrimary: '#0F172A', // Navy (Crisp readable headings and titles)
  textSecondary: '#475569', // Slate (Clear readable subtitles & captions)
  textMuted: '#64748B', // Muted Gray (Secondary details & placeholders)
  textAccent: '#7E22CE', // Purple brand highlight
  textAction: '#2563EB', // Royal Blue link highlight
  textSuccess: '#16A34A', // Green positive indicator
  textGold: '#D97706',
  textOnBrand: '#FFFFFF',
  textOnAction: '#FFFFFF',
  textInverse: '#FFFFFF',

  // Semantic Alerts & Feedback
  error: '#DC2626',
  errorBackground: '#FEF2F2',
  errorSurface: '#FEF2F2',
  errorBorder: '#FECACA',
  warning: '#D97706',
  warningBackground: '#FFFBEB',
  warningSurface: '#FFFBEB',
  warningBorder: '#FDE68A',
  info: '#2563EB',
  infoBackground: '#EFF6FF',
  infoSurface: '#EFF6FF',
  infoBorder: '#BFDBFE',
  accentGold: '#D97706',
  accentTeal: '#2563EB',
  accentRed: '#DC2626',

  // Decorative Science & Orbit Elements
  accentGlow: 'rgba(126, 34, 206, 0.15)',
  orbitRing: 'rgba(37, 99, 235, 0.15)',
  orbitRingActive: 'rgba(126, 34, 206, 0.35)',
  particleGlow: 'rgba(37, 99, 235, 0.4)',
} as const;

export type ColorToken = keyof typeof colors;
