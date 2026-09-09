/**
 * Unit Tests for Progress Curriculum Catalog
 * Verifies subjects, grade scoping, cross-feature references, and resolution.
 */

import {
  ORDERED_SUBJECT_IDS,
  SUBJECT_METAS,
  TOPIC_CATALOG,
  findTopicForActivity,
  getTopicsForSubject,
  resolveGradeContext,
} from '../progress.catalog';
import { SubjectId } from '../progress.types';
import { MICRO_LESSONS } from '../../micro-lessons/microLessons.data';
import { CONCEPT_MAPS } from '../../concept-maps/conceptMaps.data';
import { EXPERIMENTS } from '../../experiment-lab/experiment.data';

describe('Progress Catalog — Subjects', () => {
  const expectedSubjects: SubjectId[] = [
    'physics',
    'chemistry',
    'biology',
    'space',
    'environment',
    'human-body',
    'everyday-science',
  ];

  it('contains all 7 expected science subjects in stable order', () => {
    expect(ORDERED_SUBJECT_IDS).toEqual(expectedSubjects);
    for (const sub of expectedSubjects) {
      expect(SUBJECT_METAS[sub]).toBeDefined();
      expect(SUBJECT_METAS[sub].id).toBe(sub);
      expect(SUBJECT_METAS[sub].title.en).toBeDefined();
      expect(SUBJECT_METAS[sub].title.ta).toBeDefined();
      expect(SUBJECT_METAS[sub].icon).toBeDefined();
    }
  });

  it('provides topics for every subject across grade levels', () => {
    for (const sub of expectedSubjects) {
      const topics = getTopicsForSubject(sub, 'grade_8_10');
      expect(topics.length).toBeGreaterThan(0);
    }
  });
});

describe('Progress Catalog — Grade Scoping', () => {
  it('correctly parses various grade representation strings', () => {
    expect(resolveGradeContext('Class 6')).toBe('grade_6_7');
    expect(resolveGradeContext('Grade 7')).toBe('grade_6_7');
    expect(resolveGradeContext(7)).toBe('grade_6_7');

    expect(resolveGradeContext('Class 8')).toBe('grade_8_10');
    expect(resolveGradeContext('Grade 9')).toBe('grade_8_10');
    expect(resolveGradeContext('Grade 10')).toBe('grade_8_10');
    expect(resolveGradeContext(10)).toBe('grade_8_10');

    expect(resolveGradeContext('Class 11')).toBe('grade_11_12');
    expect(resolveGradeContext('Grade 12')).toBe('grade_11_12');
    expect(resolveGradeContext('Advanced')).toBe('grade_11_12');
    expect(resolveGradeContext(12)).toBe('grade_11_12');

    // Unknown defaults to core
    expect(resolveGradeContext(null)).toBe('grade_8_10');
    expect(resolveGradeContext(undefined)).toBe('grade_8_10');
    expect(resolveGradeContext('Unknown')).toBe('grade_8_10');
  });

  it('scopes topics appropriately by grade group', () => {
    const fndPhysics = getTopicsForSubject('physics', 'grade_6_7');
    const advPhysics = getTopicsForSubject('physics', 'grade_11_12');
    expect(fndPhysics.length).toBeGreaterThan(0);
    expect(advPhysics.length).toBeGreaterThan(0);
  });
});

describe('Progress Catalog — Cross-Feature Integration Integrity', () => {
  const lessonIds = new Set(MICRO_LESSONS.map((l) => l.id));
  const mapIds = new Set(CONCEPT_MAPS.map((m) => m.id));
  const expIds = new Set(EXPERIMENTS.map((e) => e.id));

  it('verifies all referenced micro lessons exist in MICRO_LESSONS catalog', () => {
    for (const t of TOPIC_CATALOG) {
      if (t.microLessonId) {
        expect(lessonIds.has(t.microLessonId)).toBe(true);
      }
    }
  });

  it('verifies all referenced concept maps exist in CONCEPT_MAPS catalog', () => {
    for (const t of TOPIC_CATALOG) {
      if (t.conceptMapId) {
        expect(mapIds.has(t.conceptMapId)).toBe(true);
      }
    }
  });

  it('verifies all referenced experiments exist in EXPERIMENTS catalog', () => {
    for (const t of TOPIC_CATALOG) {
      if (t.experimentId) {
        expect(expIds.has(t.experimentId)).toBe(true);
      }
    }
  });

  it('finds topics by related activity IDs', () => {
    const foundByLesson = findTopicForActivity('micro-newtons-first-law');
    expect(foundByLesson).toBeDefined();
    expect(foundByLesson?.id).toBe('phy-force-motion');

    const foundByMap = findTopicForActivity('map-light-and-optics');
    expect(foundByMap).toBeDefined();
    expect(foundByMap?.id).toBe('phy-light-optics');

    const foundByExp = findTopicForActivity('exp-density');
    expect(foundByExp).toBeDefined();
    expect(foundByExp?.id).toBe('chem-states-matter');
  });
});
