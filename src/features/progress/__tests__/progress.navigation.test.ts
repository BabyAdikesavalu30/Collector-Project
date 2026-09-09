/**
 * Navigation and Routing Integration Tests for Progress 2.0
 * Verifies tab resolution, bottom nav visibility, and action route validity.
 */

import { getActiveTab, isNavVisible } from '../../../components/navigation/navigation.config';
import { ORDERED_SUBJECT_IDS, TOPIC_CATALOG } from '../progress.catalog';

describe('Progress Navigation — Tab & Shell Integration', () => {
  it('maps /progress directly to the canonical learn tab', () => {
    expect(getActiveTab('/progress')).toBe('learn');
    expect(getActiveTab('/progress/')).toBe('learn');
  });

  it('maps all /progress/[subject] sub-routes to the learn tab', () => {
    for (const sub of ORDERED_SUBJECT_IDS) {
      expect(getActiveTab(`/progress/${sub}`)).toBe('learn');
    }
  });

  it('ensures bottom navigation remains visible on progress routes', () => {
    expect(isNavVisible('/progress')).toBe(true);
    for (const sub of ORDERED_SUBJECT_IDS) {
      expect(isNavVisible(`/progress/${sub}`)).toBe(true);
    }
  });
});

describe('Progress Navigation — Topic Action Destinations', () => {
  it('ensures all topic action targets point to supported route patterns', () => {
    for (const topic of TOPIC_CATALOG) {
      if (topic.microLessonId) {
        expect(`/micro-lesson/${topic.microLessonId}`).toMatch(/^\/micro-lesson\/[\w-]+$/);
      }
      if (topic.conceptMapId) {
        expect(`/concept-map/${topic.conceptMapId}`).toMatch(/^\/concept-map\/[\w-]+$/);
      }
      if (topic.experimentId) {
        expect(`/experiment/${topic.experimentId}`).toMatch(/^\/experiment\/[\w-]+$/);
      }
      if (topic.quizReference) {
        expect(topic.quizReference.levelId).toBeDefined();
        expect(topic.quizReference.subjectId).toBeDefined();
        expect(topic.quizReference.pathwayId).toBeDefined();
      }
    }
  });
});
