/**
 * Streak Navigation Integration Tests
 * Verifies tab mapping and visibility in the navigation configuration.
 */

import { getActiveTab, isNavVisible, ROUTE_TAB_MAP } from '../../../components/navigation/navigation.config';

describe('Streak Navigation Configuration', () => {
  it('maps /streak to the canonical profile tab', () => {
    expect(ROUTE_TAB_MAP['/streak']).toBe('profile');
    expect(getActiveTab('/streak')).toBe('profile');
  });

  it('maps /activity-calendar to the profile tab', () => {
    expect(ROUTE_TAB_MAP['/activity-calendar']).toBe('profile');
    expect(getActiveTab('/activity-calendar')).toBe('profile');
  });

  it('keeps the 4-tab bottom navigation visible on /streak', () => {
    expect(isNavVisible('/streak')).toBe(true);
    expect(isNavVisible('/activity-calendar')).toBe(true);
  });
});
