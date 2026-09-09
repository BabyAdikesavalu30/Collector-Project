/**
 * Micro Lessons Dataset Validator
 * Pure validation utility verifying dataset integrity, uniqueness,
 * difficulty/grade range constraints, quick check validity, and localization completeness.
 */

import { MicroLesson, MicroLessonSubjectId } from './microLessons.types';

export const VALID_SUBJECTS: MicroLessonSubjectId[] = [
  'physics',
  'chemistry',
  'biology',
  'space',
  'environment',
  'human-body',
  'everyday-science',
];

export const VALID_GRADE_GROUPS = ['junior', 'secondary', 'senior'];
export const VALID_DIFFICULTIES = ['easy', 'medium', 'hard'];

export interface ValidationIssue {
  lessonId: string;
  field: string;
  message: string;
}

export interface ValidationResult {
  isValid: boolean;
  totalLessons: number;
  issues: ValidationIssue[];
}

export function validateMicroLesson(lesson: MicroLesson): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  const id = lesson.id;

  // ID validation
  if (!id || typeof id !== 'string' || id.trim().length === 0) {
    issues.push({ lessonId: id || 'unknown', field: 'id', message: 'Lesson ID must be a non-empty string' });
  }

  // Subject validation
  if (!VALID_SUBJECTS.includes(lesson.subject)) {
    issues.push({ lessonId: id, field: 'subject', message: `Invalid subject: ${lesson.subject}` });
  }

  // Grade group
  if (!VALID_GRADE_GROUPS.includes(lesson.gradeGroup)) {
    issues.push({ lessonId: id, field: 'gradeGroup', message: `Invalid gradeGroup: ${lesson.gradeGroup}` });
  }

  // Difficulty
  if (!VALID_DIFFICULTIES.includes(lesson.difficulty)) {
    issues.push({ lessonId: id, field: 'difficulty', message: `Invalid difficulty: ${lesson.difficulty}` });
  }

  // Duration
  if (typeof lesson.durationMinutes !== 'number' || lesson.durationMinutes < 1 || lesson.durationMinutes > 5) {
    issues.push({ lessonId: id, field: 'durationMinutes', message: 'Duration must be between 1 and 5 minutes' });
  }

  // Localization - Title
  if (!lesson.title?.en?.trim() || !lesson.title?.ta?.trim()) {
    issues.push({ lessonId: id, field: 'title', message: 'Title must be non-empty in both English and Tamil' });
  }

  // Localization - Subtitle
  if (!lesson.subtitle?.en?.trim() || !lesson.subtitle?.ta?.trim()) {
    issues.push({ lessonId: id, field: 'subtitle', message: 'Subtitle must be non-empty in both English and Tamil' });
  }

  // Localization - Description
  if (!lesson.description?.en?.trim() || !lesson.description?.ta?.trim()) {
    issues.push({ lessonId: id, field: 'description', message: 'Description must be non-empty in both English and Tamil' });
  }

  // Remember Statement
  if (!lesson.rememberStatement?.en?.trim() || !lesson.rememberStatement?.ta?.trim()) {
    issues.push({ lessonId: id, field: 'rememberStatement', message: 'Remember statement must be present in both EN and TA' });
  }

  // Sections
  if (!Array.isArray(lesson.sections) || lesson.sections.length === 0) {
    issues.push({ lessonId: id, field: 'sections', message: 'Lesson must contain at least one section' });
  } else {
    lesson.sections.forEach((sec, idx) => {
      if (!sec.content?.en?.trim() || !sec.content?.ta?.trim()) {
        issues.push({ lessonId: id, field: `sections[${idx}].content`, message: 'Section content must be non-empty in EN and TA' });
      }
    });
  }

  // Key points
  if (!Array.isArray(lesson.keyPoints) || lesson.keyPoints.length < 2) {
    issues.push({ lessonId: id, field: 'keyPoints', message: 'Lesson must have at least 2 key points' });
  } else {
    lesson.keyPoints.forEach((kp, idx) => {
      if (!kp.en?.trim() || !kp.ta?.trim()) {
        issues.push({ lessonId: id, field: `keyPoints[${idx}]`, message: 'Key point must be non-empty in EN and TA' });
      }
    });
  }

  // Quick check
  if (!lesson.quickCheck) {
    issues.push({ lessonId: id, field: 'quickCheck', message: 'Quick check is required' });
  } else {
    const qc = lesson.quickCheck;
    if (!qc.question?.en?.trim() || !qc.question?.ta?.trim()) {
      issues.push({ lessonId: id, field: 'quickCheck.question', message: 'Quick check question must be non-empty in EN and TA' });
    }
    if (!Array.isArray(qc.options) || qc.options.length < 2) {
      issues.push({ lessonId: id, field: 'quickCheck.options', message: 'Quick check must have at least 2 options' });
    } else {
      const correctCount = qc.options.filter((o) => o.isCorrect).length;
      if (correctCount !== 1) {
        issues.push({ lessonId: id, field: 'quickCheck.options', message: `Quick check must have exactly 1 correct answer (found ${correctCount})` });
      }
      qc.options.forEach((opt, idx) => {
        if (!opt.text?.en?.trim() || !opt.text?.ta?.trim()) {
          issues.push({ lessonId: id, field: `quickCheck.options[${idx}].text`, message: 'Option text must be non-empty in EN and TA' });
        }
        if (!opt.explanation?.en?.trim() || !opt.explanation?.ta?.trim()) {
          issues.push({ lessonId: id, field: `quickCheck.options[${idx}].explanation`, message: 'Option explanation must be non-empty in EN and TA' });
        }
      });
    }
  }

  return issues;
}

export function validateMicroLessonsCatalog(lessons: MicroLesson[]): ValidationResult {
  const issues: ValidationIssue[] = [];
  const seenIds = new Set<string>();

  for (const lesson of lessons) {
    if (seenIds.has(lesson.id)) {
      issues.push({ lessonId: lesson.id, field: 'id', message: `Duplicate lesson ID detected: ${lesson.id}` });
    }
    seenIds.add(lesson.id);

    const lessonIssues = validateMicroLesson(lesson);
    issues.push(...lessonIssues);
  }

  return {
    isValid: issues.length === 0,
    totalLessons: lessons.length,
    issues,
  };
}
