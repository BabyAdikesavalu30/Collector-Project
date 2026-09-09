/**
 * Unit Tests for Achievements Navigation Configuration
 * Validates:
 * - Route to Profile tab mapping
 * - Visibility of bottom navigation on achievement screens
 * - Dynamic route handling (/achievement/[id])
 */

import {
  getActiveTab,
  isNavVisible,
  ROUTE_TAB_MAP,
} from '../../../components/navigation/navigation.config';

describe('Achievements Navigation Config', () => {
  it('maps /achievements and /achievement/[id] to the profile tab', () => {
    expect(ROUTE_TAB_MAP['/achievements']).toBe('profile');
    expect(ROUTE_TAB_MAP['/achievement']).toBe('profile');
    expect(ROUTE_TAB_MAP['/achievement/[id]']).toBe('profile');
  });

  it('resolves active tab as profile for all achievement routes', () => {
    expect(getActiveTab('/achievements')).toBe('profile');
    expect(getActiveTab('/achievement')).toBe('profile');
    expect(getActiveTab('/achievement/streak-7')).toBe('profile');
    expect(getActiveTab('/achievement/micro-lesson-explorer')).toBe('profile');
  });

  it('ensures bottom navigation is visible on achievement routes', () => {
    expect(isNavVisible('/achievements')).toBe(true);
    expect(isNavVisible('/achievement')).toBe(true);
    expect(isNavVisible('/achievement/first-quiz')).toBe(true);
    expect(isNavVisible('/achievement/quiz-10')).toBe(true);
  });
});
