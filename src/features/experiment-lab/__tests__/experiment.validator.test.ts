/**
 * Experiment Lab Validator Unit Tests
 */

import { EXPERIMENTS, EXPERIMENT_SUBJECTS } from '../experiment.data';
import {
  validateExperimentsCatalog,
  validateExperiment,
  VALID_SUBJECTS,
  VALID_GRADE_GROUPS,
  VALID_DIFFICULTIES,
} from '../experiment.validator';

describe('Experiment Lab Dataset Validator', () => {
  it('validates the complete 15-experiment starter catalog without any issues', () => {
    const result = validateExperimentsCatalog(EXPERIMENTS);

    if (!result.isValid) {
      console.error('Validation issues:', JSON.stringify(result.issues, null, 2));
    }

    expect(result.isValid).toBe(true);
    expect(result.issues).toEqual([]);
    expect(result.totalExperiments).toBe(15);
  });

  it('contains at least 12 experiments across Physics, Chemistry, Biology, Environment, and Space', () => {
    expect(EXPERIMENTS.length).toBeGreaterThanOrEqual(12);

    const counts: Record<string, number> = {};
    EXPERIMENTS.forEach((exp) => {
      counts[exp.subject] = (counts[exp.subject] || 0) + 1;
    });

    expect(counts['physics']).toBe(6);
    expect(counts['chemistry']).toBe(4);
    expect(counts['biology']).toBe(2);
    expect(counts['environment']).toBe(2);
    expect(counts['space']).toBe(1);
  });

  it('verifies all 5 subject definitions have English and Tamil labels', () => {
    expect(EXPERIMENT_SUBJECTS.length).toBe(5);
    EXPERIMENT_SUBJECTS.forEach((sub) => {
      expect(VALID_SUBJECTS).toContain(sub.id);
      expect(sub.title.en).toBeTruthy();
      expect(sub.title.ta).toBeTruthy();
      expect(sub.subtitle.en).toBeTruthy();
      expect(sub.subtitle.ta).toBeTruthy();
      expect(sub.icon).toBeTruthy();
    });
  });

  it('ensures every experiment has valid variables with bounded defaults', () => {
    EXPERIMENTS.forEach((exp) => {
      expect(exp.variables.length).toBeGreaterThanOrEqual(1);
      exp.variables.forEach((v) => {
        expect(v.id).toBeTruthy();
        expect(v.label.en).toBeTruthy();
        expect(v.label.ta).toBeTruthy();

        if (v.type === 'slider' || v.type === 'stepper') {
          expect(typeof v.min).toBe('number');
          expect(typeof v.max).toBe('number');
          expect(v.min!).toBeLessThanOrEqual(v.max!);
          expect(Number(v.defaultValue)).toBeGreaterThanOrEqual(v.min!);
          expect(Number(v.defaultValue)).toBeLessThanOrEqual(v.max!);
        }
      });
    });
  });

  it('ensures every experiment has a valid reflection question and matching correct option ID', () => {
    EXPERIMENTS.forEach((exp) => {
      const q = exp.reflectionQuestion;
      expect(q.question.en).toBeTruthy();
      expect(q.question.ta).toBeTruthy();
      expect(q.options.length).toBeGreaterThanOrEqual(2);

      const optionIds = q.options.map((o) => o.id);
      expect(optionIds).toContain(q.correctOptionId);
      expect(q.explanation.en).toBeTruthy();
      expect(q.explanation.ta).toBeTruthy();
    });
  });

  it('ensures every experiment has at least 2 key takeaways in EN and TA', () => {
    EXPERIMENTS.forEach((exp) => {
      expect(exp.keyTakeaways.en.length).toBeGreaterThanOrEqual(2);
      expect(exp.keyTakeaways.ta.length).toBeGreaterThanOrEqual(2);
    });
  });

  it('catches invalid experiment data correctly', () => {
    const invalidExp: any = {
      id: '',
      title: { en: '', ta: '' },
      subtitle: { en: '', ta: '' },
      description: { en: '', ta: '' },
      subject: 'magic',
      gradeGroup: 'kindergarten',
      difficulty: 'impossible',
      durationMinutes: 0,
      learningObjective: { en: '', ta: '' },
      variables: [],
      observations: [],
      reflectionQuestion: null,
      keyTakeaways: { en: [], ta: [] },
    };

    const issues = validateExperiment(invalidExp);
    expect(issues.length).toBeGreaterThan(0);
    const fields = issues.map((i) => i.field);
    expect(fields).toContain('id');
    expect(fields).toContain('subject');
    expect(fields).toContain('gradeGroup');
    expect(fields).toContain('difficulty');
    expect(fields).toContain('variables');
  });
});
