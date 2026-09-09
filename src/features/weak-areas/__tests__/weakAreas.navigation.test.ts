/**
 * Navigation and Routing Integrity Tests for Weak Areas
 * Validates route configuration in AppShell and that action generators only
 * produce valid, existing routes without fabricated paths.
 */

import { ROUTE_TAB_MAP, HIDDEN_NAV_ROUTES } from '../../../components/navigation/navigation.config';
import {
  getTopicDescriptorForLesson,
  getTopicDescriptorForPathway,
  resolveRecommendedAction,
} from '../weakAreas.topics';
import { MICRO_LESSONS } from '../../micro-lessons/microLessons.data';
import { LEARNING_PATHWAYS } from '../../learn/learn.mock';

describe('Weak Areas Navigation & Route Integrity (Section 83)', () => {
  describe('Route and Shell Integration (Section 68)', () => {
    it('maps /weak-areas to the canonical learn tab in ROUTE_TAB_MAP', () => {
      expect(ROUTE_TAB_MAP['/weak-areas']).toBe('learn');
    });

    it('keeps bottom navigation visible on /weak-areas (not in HIDDEN_NAV_ROUTES)', () => {
      expect(HIDDEN_NAV_ROUTES.has('/weak-areas')).toBe(false);
    });
  });

  describe('Action Route Validity (Sections 17-23)', () => {
    it('generates valid /micro-lesson routes for micro lesson topics', () => {
      for (const lesson of MICRO_LESSONS.slice(0, 5)) {
        const descriptor = getTopicDescriptorForLesson(lesson.id);
        if (descriptor) {
          const action = resolveRecommendedAction(descriptor);
          expect(action).not.toBeNull();
          expect(action!.route).toMatch(/^\/micro-lesson\/.+/);
          expect(action!.labelKey).toBe('learnIn2Min');
        }
      }
    });

    it('generates valid /learn or /quiz-setup routes for Learn pathway topics', () => {
      for (const pathway of LEARNING_PATHWAYS.slice(0, 5)) {
        const descriptor = getTopicDescriptorForPathway(pathway.id);
        if (descriptor) {
          const action = resolveRecommendedAction(descriptor);
          expect(action).not.toBeNull();
          const validPrefixes = ['/micro-lesson/', '/learn', '/concept-map/', '/experiment/', '/quiz-setup'];
          const hasValidPrefix = validPrefixes.some((prefix) => action!.route.startsWith(prefix));
          expect(hasValidPrefix).toBe(true);
        }
      }
    });

    it('never fabricates invalid routes for non-existent topics', () => {
      const nonExistent = getTopicDescriptorForLesson('fake-lesson-id-999');
      expect(nonExistent).toBeNull();

      const nonExistentPathway = getTopicDescriptorForPathway('fake-pathway-999');
      expect(nonExistentPathway).toBeNull();
    });
  });
});
