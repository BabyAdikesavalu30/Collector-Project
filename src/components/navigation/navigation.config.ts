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
  '/explore': 'home',
  '/explore/scientist': 'home',
  '/explore/invention': 'home',
  '/search': 'home',

  // Learn Section
  '/learn': 'learn',
  '/learn-topic': 'learn',
  '/quiz-setup': 'learn',
  '/quiz-result': 'learn',
  '/quiz-review': 'learn',
  '/progress': 'learn',
  '/quizzes': 'learn',
  '/micro-lessons': 'learn',
  '/micro-lesson': 'learn',
  '/concept-maps': 'learn',
  '/concept-map': 'learn',
  '/experiment-lab': 'learn',
  '/experiment': 'learn',
  '/weak-areas': 'learn',

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
  '/settings/notifications': 'profile',
  '/achievements': 'profile',
  '/achievement': 'profile',
  '/achievement/[id]': 'profile',
  '/certificates': 'profile',
  '/certificate-view': 'profile',
  '/certificate': 'profile',
  '/rewards': 'profile',
  '/points-history': 'profile',
  '/daily-missions': 'profile',
  '/daily-goal': 'profile',
  '/streak': 'profile',
  '/science-passport': 'profile',
  '/activity-calendar': 'profile',
  '/leaderboard': 'profile',
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
  '/safety': 'profile',
  '/safe-science': 'profile',
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

  // Fullscreen Interactive Investigation
  '/mystery-lab/case',

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
 * Known navigable route targets used across the app.
 * This is a curated union of the routes the UI actually navigates to,
 * not the entire file-based route list.
 */
export type KnownRoute =
  | '/'
  | '/home'
  | '/learn'
  | '/games'
  | '/profile'
  | '/notifications'
  | '/explore'
  | '/search'
  | '/learn-topic'
  | '/quiz-setup'
  | '/quiz-result'
  | '/quiz-review'
  | '/progress'
  | '/quizzes'
  | '/micro-lessons'
  | '/concept-maps'
  | '/experiment-lab'
  | '/weak-areas'
  | '/riddles'
  | '/riddle-quiz'
  | '/riddle-result'
  | '/fun-facts'
  | '/spin-wheel'
  | '/challenges'
  | '/mystery-lab'
  | '/mystery-lab/cases'
  | '/settings'
  | '/settings/notifications'
  | '/achievements'
  | '/certificates'
  | '/certificate-view'
  | '/rewards'
  | '/points-history'
  | '/daily-missions'
  | '/daily-goal'
  | '/streak'
  | '/science-passport'
  | '/leaderboard'
  | '/about'
  | '/account-security'
  | '/delete-account'
  | '/faq'
  | '/feedback'
  | '/guidelines'
  | '/help'
  | '/licenses'
  | '/privacy'
  | '/report-problem'
  | '/terms'
  | '/safety'
  | '/safe-science'
  | '/micro-lesson/[id]'
  | '/concept-map/[id]'
  | '/experiment/[id]'
  | '/progress/[subject]'
  | '/achievement/[id]'
  | '/certificate/[id]'
  | '/quiz'
  | '/onboarding'
  | '/onboarding-grow'
  | '/onboarding-learn'
  | '/onboarding-achieve'
  | '/language'
  | '/auth-welcome'
  | '/auth'
  | '/login'
  | '/register'
  | '/otp'
  | '/forgot-password'
  | '/reset-password'
  | '/profile-create'
  | '/profile-academic'
  | '/profile-complete'
  | '/profile-setup'
  | '/welcome'
  | '/escape-room';

/**
 * Catalog of routes that are built dynamically from trusted runtime values
 * (deep links with ids, subject slugs, etc.). These are still real routes,
 * but they are not a closed literal union.
 */
export const DYNAMIC_ROUTE_PATTERNS = [
  '/micro-lesson/',
  '/concept-map/',
  '/experiment/',
  '/progress/',
  '/achievement/',
  '/certificate/',
  '/quiz-setup?subject=',
] as const;

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
  if (
    normalized.startsWith('/learn') ||
    normalized.startsWith('/quiz') ||
    normalized.startsWith('/micro-lesson') ||
    normalized.startsWith('/concept-map') ||
    normalized.startsWith('/progress') ||
    normalized.startsWith('/experiment') ||
    normalized.startsWith('/weak-areas')
  ) {
    return 'learn';
  }  if (normalized.startsWith('/profile') || normalized.startsWith('/settings') || normalized.startsWith('/certificate') || normalized.startsWith('/achievement') || normalized.startsWith('/science-passport')) {
    return 'profile';
  }
  if (normalized.startsWith('/riddle') || normalized.startsWith('/fun-facts') || normalized.startsWith('/spin-wheel')) {
    return 'games';
  }
  if (normalized.startsWith('/explore')) return 'home';

  return 'home';
}

/**
 * Navigate to a known route without unsafe casts.
 * Use `navigateDynamic` for routes built from runtime ids/slugs.
 */
export function navigate(router: { push: (route: KnownRoute | `${string}?${string}` | { pathname: KnownRoute; params?: Record<string, string> }) => void }, route: KnownRoute): void {
  router.push(route);
}

/**
 * Navigate to a dynamically constructed route string.
 * Only use for values that are not part of the closed KnownRoute union
 * (for example deep links with embedded ids or query params).
 */
export function navigateDynamic(
  router: { push: (route: string) => void },
  route: string,
): void {
  router.push(route);
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
