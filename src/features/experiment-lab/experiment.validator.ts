/**
 * Experiment Lab Catalog Validator
 * Pure validation utility guaranteeing data integrity across all simulations.
 */

import { Experiment, ExperimentSubject, GradeGroup, ExperimentDifficulty } from './experiment.types';

export const VALID_SUBJECTS: ExperimentSubject[] = ['physics', 'chemistry', 'biology', 'environment', 'space'];
export const VALID_GRADE_GROUPS: GradeGroup[] = ['6-7', '8-10', '11-12'];
export const VALID_DIFFICULTIES: ExperimentDifficulty[] = ['easy', 'medium', 'hard'];

export interface ValidationIssue {
  experimentId: string;
  field: string;
  message: string;
}

export interface CatalogValidationResult {
  isValid: boolean;
  totalExperiments: number;
  issues: ValidationIssue[];
}

export function validateExperiment(exp: Experiment): ValidationIssue[] {
  const issues: ValidationIssue[] = [];

  // ID
  if (!exp.id || typeof exp.id !== 'string' || exp.id.trim() === '') {
    issues.push({ experimentId: exp.id || 'unknown', field: 'id', message: 'Experiment ID is required.' });
  }

  // Subject
  if (!VALID_SUBJECTS.includes(exp.subject)) {
    issues.push({ experimentId: exp.id, field: 'subject', message: `Invalid subject: "${exp.subject}".` });
  }

  // Grade group
  if (!VALID_GRADE_GROUPS.includes(exp.gradeGroup)) {
    issues.push({ experimentId: exp.id, field: 'gradeGroup', message: `Invalid grade group: "${exp.gradeGroup}".` });
  }

  // Difficulty
  if (!VALID_DIFFICULTIES.includes(exp.difficulty)) {
    issues.push({ experimentId: exp.id, field: 'difficulty', message: `Invalid difficulty: "${exp.difficulty}".` });
  }

  // Duration
  if (!exp.durationMinutes || exp.durationMinutes < 1) {
    issues.push({ experimentId: exp.id, field: 'durationMinutes', message: 'Duration must be at least 1 minute.' });
  }

  // Bilingual strings
  if (!exp.title?.en || !exp.title?.ta) {
    issues.push({ experimentId: exp.id, field: 'title', message: 'Both English and Tamil titles are required.' });
  }
  if (!exp.subtitle?.en || !exp.subtitle?.ta) {
    issues.push({ experimentId: exp.id, field: 'subtitle', message: 'Both English and Tamil subtitles are required.' });
  }
  if (!exp.description?.en || !exp.description?.ta) {
    issues.push({ experimentId: exp.id, field: 'description', message: 'Both English and Tamil descriptions are required.' });
  }
  if (!exp.learningObjective?.en || !exp.learningObjective?.ta) {
    issues.push({ experimentId: exp.id, field: 'learningObjective', message: 'Learning objective is required in EN and TA.' });
  }

  // Variables
  if (!exp.variables || !Array.isArray(exp.variables) || exp.variables.length === 0) {
    issues.push({ experimentId: exp.id, field: 'variables', message: 'At least one variable control is required.' });
  } else {
    const varIds = new Set<string>();
    exp.variables.forEach((v, index) => {
      if (!v.id) {
        issues.push({ experimentId: exp.id, field: `variables[${index}].id`, message: 'Variable ID is required.' });
      } else if (varIds.has(v.id)) {
        issues.push({ experimentId: exp.id, field: `variables[${index}].id`, message: `Duplicate variable ID: "${v.id}".` });
      } else {
        varIds.add(v.id);
      }

      if (!v.label?.en || !v.label?.ta) {
        issues.push({ experimentId: exp.id, field: `variables[${index}].label`, message: 'Variable label required in EN and TA.' });
      }

      if (v.type === 'slider' || v.type === 'stepper') {
        if (v.min === undefined || v.max === undefined) {
          issues.push({ experimentId: exp.id, field: `variables[${index}].bounds`, message: 'Min and Max required for numeric controls.' });
        } else if (v.min > v.max) {
          issues.push({ experimentId: exp.id, field: `variables[${index}].bounds`, message: `Min (${v.min}) cannot exceed Max (${v.max}).` });
        } else if (typeof v.defaultValue === 'number' && (v.defaultValue < v.min || v.defaultValue > v.max)) {
          issues.push({ experimentId: exp.id, field: `variables[${index}].defaultValue`, message: `Default value (${v.defaultValue}) out of bounds [${v.min}, ${v.max}].` });
        }
      }

      if (v.type === 'segmented') {
        if (!v.options || v.options.length < 2) {
          issues.push({ experimentId: exp.id, field: `variables[${index}].options`, message: 'Segmented control must have at least 2 options.' });
        }
      }
    });
  }

  // Observations
  if (!exp.observations || !Array.isArray(exp.observations) || exp.observations.length === 0) {
    issues.push({ experimentId: exp.id, field: 'observations', message: 'At least one observation rule is required.' });
  } else {
    exp.observations.forEach((obs, index) => {
      if (!obs.id) {
        issues.push({ experimentId: exp.id, field: `observations[${index}].id`, message: 'Observation ID is required.' });
      }
      if (typeof obs.condition !== 'function') {
        issues.push({ experimentId: exp.id, field: `observations[${index}].condition`, message: 'Observation condition must be a function.' });
      }
      if (!obs.text?.en || !obs.text?.ta) {
        issues.push({ experimentId: exp.id, field: `observations[${index}].text`, message: 'Observation text required in EN and TA.' });
      }
      if (!obs.explanation?.en || !obs.explanation?.ta) {
        issues.push({ experimentId: exp.id, field: `observations[${index}].explanation`, message: 'Observation explanation required in EN and TA.' });
      }
    });
  }

  // Reflection Question
  if (!exp.reflectionQuestion) {
    issues.push({ experimentId: exp.id, field: 'reflectionQuestion', message: 'Reflection question is required.' });
  } else {
    const q = exp.reflectionQuestion;
    if (!q.question?.en || !q.question?.ta) {
      issues.push({ experimentId: exp.id, field: 'reflectionQuestion.question', message: 'Question required in EN and TA.' });
    }
    if (!q.options || q.options.length < 2) {
      issues.push({ experimentId: exp.id, field: 'reflectionQuestion.options', message: 'At least 2 options are required.' });
    } else {
      const optionIds = new Set(q.options.map((o) => o.id));
      if (!optionIds.has(q.correctOptionId)) {
        issues.push({ experimentId: exp.id, field: 'reflectionQuestion.correctOptionId', message: `correctOptionId "${q.correctOptionId}" not found in options.` });
      }
    }
  }

  // Key takeaways
  if (!exp.keyTakeaways?.en || exp.keyTakeaways.en.length < 2 || !exp.keyTakeaways?.ta || exp.keyTakeaways.ta.length < 2) {
    issues.push({ experimentId: exp.id, field: 'keyTakeaways', message: 'At least 2 key takeaways required in EN and TA.' });
  }

  return issues;
}

export function validateExperimentsCatalog(catalog: Experiment[]): CatalogValidationResult {
  const allIssues: ValidationIssue[] = [];
  const seenIds = new Set<string>();

  for (const exp of catalog) {
    if (seenIds.has(exp.id)) {
      allIssues.push({ experimentId: exp.id, field: 'id', message: `Duplicate experiment ID: "${exp.id}".` });
    } else {
      seenIds.add(exp.id);
    }

    const itemIssues = validateExperiment(exp);
    allIssues.push(...itemIssues);
  }

  return {
    isValid: allIssues.length === 0,
    totalExperiments: catalog.length,
    issues: allIssues,
  };
}
