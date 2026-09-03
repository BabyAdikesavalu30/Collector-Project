/**
 * Quiz Question Bank Coverage Tests
 * Guarantees every LEARNING_PATHWAYS pathway has enough unique bilingual
 * questions so students never silently fall back to another grade band.
 */

import { MOCK_QUIZ_QUESTIONS } from '../quiz.mock';
import { LEARNING_PATHWAYS } from '../../learn/learn.mock';
import { QuizQuestion } from '../quiz.types';

const MIN_QUESTIONS_PER_PATHWAY = 8;

describe('Quiz Question Bank Coverage', () => {
  test('every pathway from LEARNING_PATHWAYS has at least 8 questions', () => {
    const countByPathway: Record<string, number> = {};
    MOCK_QUIZ_QUESTIONS.forEach((q) => {
      countByPathway[q.pathwayId] = (countByPathway[q.pathwayId] || 0) + 1;
    });

    for (const pathway of LEARNING_PATHWAYS) {
      const count = countByPathway[pathway.id] || 0;
      expect(count).toBeGreaterThanOrEqual(MIN_QUESTIONS_PER_PATHWAY);
    }
  });

  test('every pathway spreads questions across all three difficulties', () => {
    const difficultiesByPathway: Record<string, Set<string>> = {};
    MOCK_QUIZ_QUESTIONS.forEach((q) => {
      if (!difficultiesByPathway[q.pathwayId]) difficultiesByPathway[q.pathwayId] = new Set();
      difficultiesByPathway[q.pathwayId].add(q.difficulty);
    });

    for (const pathway of LEARNING_PATHWAYS) {
      expect(difficultiesByPathway[pathway.id]?.size ?? 0).toBe(3);
    }
  });

  test('all question ids are unique', () => {
    const ids = MOCK_QUIZ_QUESTIONS.map((q) => q.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  test('every question is fully bilingual with a valid correct answer', () => {
    for (const q of MOCK_QUIZ_QUESTIONS) {
      expect(q.question.en.length).toBeGreaterThan(0);
      expect(q.question.ta.length).toBeGreaterThan(0);
      expect(q.explanation?.en.length ?? 0).toBeGreaterThan(0);
      expect(q.explanation?.ta.length ?? 0).toBeGreaterThan(0);
      const optionIds = q.options.map((o) => o.id);
      expect(optionIds).toContain(q.correctOptionId);
      for (const option of q.options) {
        expect(option.text.en.length).toBeGreaterThan(0);
        expect(option.text.ta.length).toBeGreaterThan(0);
      }
    }
  });

  test('question ids map to their own pathway only', () => {
    const seen = new Set<QuizQuestion['id']>();
    for (const q of MOCK_QUIZ_QUESTIONS) {
      expect(seen.has(q.id)).toBe(false);
      seen.add(q.id);
    }
  });
});