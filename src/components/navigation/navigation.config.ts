/**
 * Navigation Configuration
 * Centralized mapping of routes to active parent tabs and navigation visibility rules.
 */

import { AppTab, AppTabConfig } from './navigation.types';

export const APP_TAB_ROUTES: Record<AppTab, string> = {
  home: '/home',
  learn: '/learn',
  games: '/games',
  profile: '/profile',
};

export const TAB_CONFIGS: AppTabConfig[] = [
  { id: 'home', route: '/home', bgColor: 'transparent', borderColor: 'transparent', iconColor: '#3B82C4', labelKey: 'home' },
  { id: 'learn', route: '/learn', bgColor: 'transparent', borderColor: 'transparent', iconColor: '#3B82C4', labelKey: 'learn' },
  { id: 'games', route: '/games', bgColor: 'transparent', borderColor: 'transparent', iconColor: '#3B82C4', labelKey: 'games' },
  { id: 'profile', route: '/profile', bgColor: 'transparent', borderColor: 'transparent', iconColor: '#3B82C4', labelKey: 'profile' },
];

export const ROUTE_TAB_MAP: Record<string, AppTab> = {
  // Home Section
  '/home': 'home',
  '/notifications': 'home',
  '/search': 'home',

  // Learn Section
  '/learn': 'learn',
  '/learn-topic': 'learn',
  '/quiz-setup': 'learn',
  '/quiz-result': 'learn',
  '/quiz-review': 'learn',
  '/quizzes': 'learn',
  '/micro-lessons': 'learn',
  '/micro-lesson': 'learn',
  '/concept-maps': 'learn',
  '/concept-map': 'learn',
  '/experiment-lab': 'learn',
  '/experiment': 'learn',
  '/weak-areas': 'learn',

  // Library Section (Renamed to Games)
  '/explore': 'games',
  '/explore/scientist': 'games',
  '/explore/invention': 'games',
  '/games': 'games',
  '/riddles': 'games',
  '/riddle-quiz': 'games',
  '/riddle-result': 'games',
  '/fun-facts': 'games',
  '/spin-wheel': 'games',
  '/escape-room': 'games',
  '/challenges': 'games',
  '/mystery-lab': 'games',
  '/mystery-lab/cases': 'games',

  // Progress Section (Merged into Profile)
  '/progress': 'profile',
  '/points-history': 'profile',
  '/daily-missions': 'profile',
  '/daily-goal': 'profile',
  '/streak': 'profile',
  '/leaderboard': 'profile',

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
  '/science-passport': 'profile',
  '/activity-calendar': 'profile',
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

export const HIDDEN_NAV_ROUTES = new Set<string>([
  '/', '/index', '/welcome', '/onboarding', '/onboarding-grow', '/onboarding-achieve', '/onboarding-learn', '/language',
  '/auth', '/auth-welcome', '/login', '/register', '/otp', '/forgot-password', '/reset-password',
  '/profile-create', '/profile-academic', '/profile-complete', '/profile-setup',
  '/quiz', '/mystery-lab/case',
  '/games/zip', '/games/wend', '/games/patches', '/games/mini-sudoku', '/games/tango', '/games/queens', '/games/element-match', '/games/molecule-builder', '/games/circuit-lab', '/games/memory-matrix', '/games/orbit', '/games/reaction-sort', '/games/science-word-grid', '/games/pattern-lab', '/games/logic-lock', '/games/gravity-path', '/games/lab-escape', '/games/time-machine', '/games/dna-sequence', '/games/magnet-maze',
]);

export type KnownRoute = '/' | '/home' | '/learn' | '/explore' | '/progress' | '/games' | '/profile' | '/notifications' | '/search' | '/learn-topic' | '/quiz-setup' | '/quiz-result' | '/quiz-review' | '/quizzes' | '/micro-lessons' | '/concept-maps' | '/experiment-lab' | '/weak-areas' | '/riddles' | '/riddle-quiz' | '/riddle-result' | '/fun-facts' | '/spin-wheel' | '/challenges' | '/mystery-lab' | '/mystery-lab/cases' | '/settings' | '/settings/notifications' | '/achievements' | '/certificates' | '/certificate-view' | '/rewards' | '/points-history' | '/daily-missions' | '/daily-goal' | '/streak' | '/science-passport' | '/leaderboard' | '/about' | '/account-security' | '/delete-account' | '/faq' | '/feedback' | '/guidelines' | '/help' | '/licenses' | '/privacy' | '/report-problem' | '/terms' | '/safety' | '/safe-science' | '/micro-lesson/[id]' | '/concept-map/[id]' | '/experiment/[id]' | '/progress/[subject]' | '/achievement/[id]' | '/certificate/[id]' | '/quiz' | '/onboarding' | '/onboarding-grow' | '/onboarding-learn' | '/onboarding-achieve' | '/language' | '/auth-welcome' | '/auth' | '/login' | '/register' | '/otp' | '/forgot-password' | '/reset-password' | '/profile-create' | '/profile-academic' | '/profile-complete' | '/profile-setup' | '/welcome' | '/escape-room';

export const DYNAMIC_ROUTE_PATTERNS = [
  '/micro-lesson/', '/concept-map/', '/experiment/', '/progress/', '/achievement/', '/certificate/', '/quiz-setup?subject=',
] as const;

export function normalizePathname(pathname: string | null | undefined): string {
  if (!pathname) return '/';
  const clean = pathname.split('?')[0].split('#')[0];
  if (clean.length > 1 && clean.endsWith('/')) {
    return clean.slice(0, -1);
  }
  return clean;
}

export function getActiveTab(pathname: string | null | undefined): AppTab {
  const normalized = normalizePathname(pathname);
  if (ROUTE_TAB_MAP[normalized]) {
    return ROUTE_TAB_MAP[normalized];
  }
  if (normalized.startsWith('/progress') || normalized.startsWith('/leaderboard')) return 'profile';
  if (normalized.startsWith('/games') || normalized.startsWith('/mystery-lab') || normalized.startsWith('/explore')) return 'games';
  if (normalized.startsWith('/learn') || normalized.startsWith('/quiz') || normalized.startsWith('/micro-lesson') || normalized.startsWith('/concept-map') || normalized.startsWith('/experiment') || normalized.startsWith('/weak-areas')) {
    return 'learn';
  }
  if (normalized.startsWith('/profile') || normalized.startsWith('/settings') || normalized.startsWith('/certificate') || normalized.startsWith('/achievement') || normalized.startsWith('/science-passport')) {
    return 'profile';
  }
  if (normalized.startsWith('/riddle') || normalized.startsWith('/fun-facts') || normalized.startsWith('/spin-wheel')) {
    return 'games';
  }
  return 'home';
}

export function navigate(router: { push: (route: KnownRoute | `${string}?${string}` | { pathname: KnownRoute; params?: Record<string, string> }) => void }, route: KnownRoute): void {
  router.push(route);
}

export function navigateDynamic(router: { push: (route: string) => void }, route: string): void {
  router.push(route);
}

export function isNavVisible(pathname: string | null | undefined): boolean {
  const normalized = normalizePathname(pathname);
  if (HIDDEN_NAV_ROUTES.has(normalized)) return false;
  if (normalized.startsWith('/games/') && normalized !== '/games') return false;
  return true;
}
