/**
 * Navigation Configuration
 * Centralized mapping of routes to active parent tabs and navigation visibility rules.
 */

import { AppTab, AppTabConfig } from './navigation.types';

/**
 * 4 Canonical Top-Level Tab Routes
 */
export const APP_TAB_ROUTES: Record<AppTab, string> = {
  home: '/home',
  learn: '/learn',
  games: '/games',
  profile: '/profile',
};

/**
 * Tab Visual Theming Configurations
 */
export const TAB_CONFIGS: AppTabConfig[] = [
  {
    id: 'home',
    route: '/home',
    bgColor: '#EBF4FF',
    borderColor: '#CBE2FC',
    iconColor: '#0F4C81',
    labelKey: 'home',
  },
  {
    id: 'learn',
    route: '/learn',
    bgColor: '#E6F7F0',
    borderColor: '#BEEBD7',
    iconColor: '#0D5C3A',
    labelKey: 'learn',
  },
  {
    id: 'games',
    route: '/games',
    bgColor: '#FDF0E9',
    borderColor: '#F7D9CA',
    iconColor: '#8B3A1C',
    labelKey: 'games',
  },
  {
    id: 'profile',
    route: '/profile',
    bgColor: '#FDEEF2',
    borderColor: '#F8D0DC',
    iconColor: '#782245',
    labelKey: 'profile',
  },
];

/**
 * Mapping of Child and Sub-Routes to their Canonical Parent Tab
 */
export const ROUTE_TAB_MAP: Record<string, AppTab> = {
  // Home Section
  '/home': 'home',
  '/notifications': 'home',

  // Learn Section
  '/learn': 'learn',
  '/learn-topic': 'learn',
  '/quiz-setup': 'learn',
  '/quiz-result': 'learn',
  '/quiz-review': 'learn',
  '/progress': 'learn',
  '/quizzes': 'learn',

  // Games Section
  '/games': 'games',
  '/games/': 'games',
  '/riddles': 'games',
  '/riddle-quiz': 'games',
  '/riddle-result': 'games',
  '/fun-facts': 'games',
  '/spin-wheel': 'games',
  '/escape-room': 'games',
  '/challenges': 'games',
  '/mystery-lab': 'games',
  '/mystery-lab/cases': 'games',

  // Profile Section
  '/profile': 'profile',
  '/settings': 'profile',
  '/achievements': 'profile',
  '/certificates': 'profile',
  '/certificate-view': 'profile',
  '/about': 'profile',
  '/account-security': 'profile',
  '/delete-account': 'profile',
  '/faq': 'profile',
  '/feedback': 'profile',
  '/guidelines': 'profile',
  '/help': 'profile',
  '/licenses': 'profile',
  '/privacy': 'profile',
  '/report-problem': 'profile',
  '/terms': 'profile',
};

/**
 * Routes where the bottom navigation must remain completely HIDDEN:
 * 1. Pre-App / Welcome / Onboarding / Language Setup
 * 2. Authentication (Login, Register, OTP, Password Reset)
 * 3. Profile Setup / Academic Setup flows
 * 4. Active Fullscreen Timed Quiz & Interactive Canvas Games
 */
export const HIDDEN_NAV_ROUTES = new Set<string>([
  // Pre-App / Onboarding / Setup
  '/',
  '/index',
  '/welcome',
  '/onboarding',
  '/onboarding-grow',
  '/onboarding-achieve',
  '/onboarding-learn',
  '/language',

  // Auth Flow
  '/auth',
  '/auth-welcome',
  '/login',
  '/register',
  '/otp',
  '/forgot-password',
  '/reset-password',

  // Profile Setup Flow
  '/profile-create',
  '/profile-academic',
  '/profile-complete',
  '/profile-setup',

  // Fullscreen Timed Quiz Engine
  '/quiz',

  // Fullscreen Active Games
  '/games/zip',
  '/games/wend',
  '/games/patches',
  '/games/mini-sudoku',
  '/games/tango',
  '/games/queens',
  '/games/element-match',
  '/games/molecule-builder',
  '/games/circuit-lab',
  '/games/memory-matrix',
  '/games/orbit',
  '/games/reaction-sort',
  '/games/science-word-grid',
  '/games/pattern-lab',
  '/games/logic-lock',
  '/games/gravity-path',
  '/games/lab-escape',
  '/games/time-machine',
  '/games/dna-sequence',
  '/games/magnet-maze',
]);

/**
 * Normalize route string by removing trailing slashes (except root) and query/params.
 */
export function normalizePathname(pathname: string | null | undefined): string {
  if (!pathname) return '/';
  const clean = pathname.split('?')[0].split('#')[0];
  if (clean.length > 1 && clean.endsWith('/')) {
    return clean.slice(0, -1);
  }
  return clean;
}

/**
 * Determine which parent tab is currently active based on the URL pathname.
 */
export function getActiveTab(pathname: string | null | undefined): AppTab {
  const normalized = normalizePathname(pathname);

  // Exact match from lookup table
  if (ROUTE_TAB_MAP[normalized]) {
    return ROUTE_TAB_MAP[normalized];
  }

  // Prefix matching for nested sub-routes
  if (normalized.startsWith('/games') || normalized.startsWith('/mystery-lab')) return 'games';
  if (normalized.startsWith('/learn') || normalized.startsWith('/quiz')) return 'learn';
  if (normalized.startsWith('/profile') || normalized.startsWith('/settings')) return 'profile';
  if (normalized.startsWith('/riddle') || normalized.startsWith('/fun-facts') || normalized.startsWith('/spin-wheel')) {
    return 'games';
  }

  return 'home';
}

/**
 * Determine whether the bottom navigation should be visible on the given route.
 */
export function isNavVisible(pathname: string | null | undefined): boolean {
  const normalized = normalizePathname(pathname);

  // Check if route is in the explicit hidden list
  if (HIDDEN_NAV_ROUTES.has(normalized)) {
    return false;
  }

  // Check prefix matches for active game board screens
  if (normalized.startsWith('/games/') && normalized !== '/games') {
    return false;
  }

  return true;
}
