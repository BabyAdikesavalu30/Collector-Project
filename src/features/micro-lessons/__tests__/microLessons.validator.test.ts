/**
 * Micro Lessons Dataset Validator Unit Tests
 */

import { MICRO_LESSONS, MICRO_LESSON_COLLECTIONS, MICRO_LESSON_SUBJECTS } from '../microLessons.data';
import {
  validateMicroLessonsCatalog,
  validateMicroLesson,
  VALID_SUBJECTS,
} from '../microLessons.validator';

describe('Micro Lessons Dataset Validator', () => {
  it('validates the complete 30-lesson starter catalog without issues', () => {
    const result = validateMicroLessonsCatalog(MICRO_LESSONS);

    if (!result.isValid) {
      console.error('Validation issues:', JSON.stringify(result.issues, null, 2));
    }

    expect(result.isValid).toBe(true);
    expect(result.issues).toEqual([]);
    expect(result.totalLessons).toBeGreaterThanOrEqual(30);
  });

  it('contains at least 30 micro lessons across all 7 science subjects', () => {
    expect(MICRO_LESSONS.length).toBe(30);

    const counts: Record<string, number> = {};
    MICRO_LESSONS.forEach((lesson) => {
      counts[lesson.subject] = (counts[lesson.subject] || 0) + 1;
    });

    expect(counts['physics']).toBe(7);
    expect(counts['chemistry']).toBe(6);
    expect(counts['biology']).toBe(6);
    expect(counts['space']).toBe(4);
    expect(counts['environment']).toBe(3);
    expect(counts['human-body']).toBe(2);
    expect(counts['everyday-science']).toBe(2);

    VALID_SUBJECTS.forEach((subject) => {
      expect(counts[subject]).toBeGreaterThan(0);
    });
  });

  it('verifies all 5 curated collections are properly structured', () => {
    expect(MICRO_LESSON_COLLECTIONS.length).toBe(5);

    const lessonIds = new Set(MICRO_LESSONS.map((l) => l.id));
    MICRO_LESSON_COLLECTIONS.forEach((col) => {
      expect(col.id).toBeTruthy();
      expect(col.title.en).toBeTruthy();
      expect(col.title.ta).toBeTruthy();
      expect(col.lessonIds.length).toBeGreaterThanOrEqual(3);
      // Every referenced lesson ID exists in the catalog
      col.lessonIds.forEach((id) => {
        expect(lessonIds.has(id)).toBe(true);
      });
    });
  });

  it('verifies all 7 subject definitions have English and Tamil labels', () => {
    expect(MICRO_LESSON_SUBJECTS.length).toBe(7);
    MICRO_LESSON_SUBJECTS.forEach((sub) => {
      expect(VALID_SUBJECTS).toContain(sub.id);
      expect(sub.title.en).toBeTruthy();
      expect(sub.title.ta).toBeTruthy();
      expect(sub.icon).toBeTruthy();
    });
  });

  it('catches invalid lesson data correctly', () => {
    const invalidLesson: any = {
      id: '',
      subject: 'invalid_subject',
      gradeGroup: 'kindergarten',
      difficulty: 'extreme',
      durationMinutes: 10,
      title: { en: '', ta: '' },
      subtitle: { en: '', ta: '' },
      description: { en: '', ta: '' },
      rememberStatement: { en: '', ta: '' },
      sections: [],
      keyPoints: [],
      quickCheck: null,
    };

    const issues = validateMicroLesson(invalidLesson);
    expect(issues.length).toBeGreaterThan(5);
    expect(issues.some((i) => i.field === 'subject')).toBe(true);
    expect(issues.some((i) => i.field === 'durationMinutes')).toBe(true);
    expect(issues.some((i) => i.field === 'quickCheck')).toBe(true);
  });
});
