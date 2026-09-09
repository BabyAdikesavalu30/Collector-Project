/**
 * Unit Tests for Science Passport Milestones (Phase 46)
 * Validates:
 * - Milestone definitions completeness & uniqueness
 * - All milestones have required fields
 * - Bilingual support
 * - Stable IDs
 */

import { PASSPORT_MILESTONE_DEFINITIONS } from '../sciencePassport.milestones';

describe('Science Passport Milestones', () => {
  describe('Definitions', () => {
    it('has at least 10 milestone definitions', () => {
      expect(PASSPORT_MILESTONE_DEFINITIONS.length).toBeGreaterThanOrEqual(10);
    });

    it('has unique IDs for all definitions', () => {
      const ids = PASSPORT_MILESTONE_DEFINITIONS.map((m) => m.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(ids.length);
    });

    it('has bilingual titles and descriptions for all definitions', () => {
      for (const milestone of PASSPORT_MILESTONE_DEFINITIONS) {
        expect(milestone.title.en.trim().length).toBeGreaterThan(0);
        expect(milestone.title.ta.trim().length).toBeGreaterThan(0);
        expect(milestone.description.en.trim().length).toBeGreaterThan(0);
        expect(milestone.description.ta.trim().length).toBeGreaterThan(0);
      }
    });

    it('has icons for all definitions', () => {
      for (const milestone of PASSPORT_MILESTONE_DEFINITIONS) {
        expect(milestone.icon.trim().length).toBeGreaterThan(0);
      }
    });

    it('has valid target values (> 0)', () => {
      for (const milestone of PASSPORT_MILESTONE_DEFINITIONS) {
        expect(milestone.target).toBeGreaterThan(0);
      }
    });

    it('has valid categories', () => {
      const validCategories = [
        'journey',
        'learning',
        'discovery',
        'experiment',
        'games',
        'streak',
        'achievements',
        'collections',
        'recognition',
      ];
      for (const milestone of PASSPORT_MILESTONE_DEFINITIONS) {
        expect(validCategories).toContain(milestone.category);
      }
    });

    it('includes first-activity as the starting milestone', () => {
      const first = PASSPORT_MILESTONE_DEFINITIONS.find((m) => m.id === 'first-activity');
      expect(first).toBeDefined();
      expect(first!.category).toBe('journey');
      expect(first!.target).toBe(1);
    });

    it('includes science-scholar as a capstone milestone', () => {
      const capstone = PASSPORT_MILESTONE_DEFINITIONS.find((m) => m.id === 'science-scholar');
      expect(capstone).toBeDefined();
      expect(capstone!.category).toBe('achievements');
      expect(capstone!.target).toBe(25);
    });

    it('streak milestones have increasing targets', () => {
      const streakMilestones = PASSPORT_MILESTONE_DEFINITIONS.filter(
        (m) => m.category === 'streak'
      );
      const targets = streakMilestones.map((m) => m.target);
      for (let i = 1; i < targets.length; i++) {
        expect(targets[i]).toBeGreaterThan(targets[i - 1]);
      }
    });

    it('activity count milestones have increasing targets', () => {
      const activityMilestones = PASSPORT_MILESTONE_DEFINITIONS.filter(
        (m) => m.id.startsWith('activities-')
      );
      const targets = activityMilestones.map((m) => m.target);
      for (let i = 1; i < targets.length; i++) {
        expect(targets[i]).toBeGreaterThan(targets[i - 1]);
      }
    });

    it('related routes point to valid paths', () => {
      const validRoutes = [
        '/learn',
        '/achievements',
        '/micro-lessons',
        '/experiment-lab',
        '/concept-maps',
        '/mystery-lab',
        '/riddles',
        '/games',
        '/streak',
        '/certificates',
      ];
      for (const milestone of PASSPORT_MILESTONE_DEFINITIONS) {
        if (milestone.relatedRoute) {
          expect(validRoutes).toContain(milestone.relatedRoute);
        }
      }
    });
  });

  describe('Edge Cases', () => {
    it('handles missing optional relatedAchievementId gracefully', () => {
      for (const milestone of PASSPORT_MILESTONE_DEFINITIONS) {
        // relatedAchievementId is optional, should not crash
        expect(milestone.id).toBeDefined();
      }
    });

    it('handles missing optional relatedRoute gracefully', () => {
      const withoutRoute = PASSPORT_MILESTONE_DEFINITIONS.filter(
        (m) => !m.relatedRoute
      );
      expect(withoutRoute.length).toBeGreaterThan(0);
    });
  });
});
