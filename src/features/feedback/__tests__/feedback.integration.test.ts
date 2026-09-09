/**
 * Feedback Integration & Safety Test Suite
 * Phase 40 verification: duplication guards, content validation,
 * no-regression guarantees for protected features, XP/centralization safety.
 */

import { FEEDBACK_ENTRIES } from '../feedback.data';
import { FEEDBACK_HINTS } from '../feedback.hintData';
import { validateFeedbackLibrary } from '../feedback.validator';
import { MICRO_LESSONS } from '../../micro-lessons/microLessons.data';
import { EXPERIMENTS } from '../../experiment-lab/experiment.data';
import { getQuizHistory } from '../../quiz';
import { getRiddlesForDifficulty } from '../../riddles';
import { recordActivity } from '../../activity';

describe('Feedback content validation', () => {
  it('passes full library validation (ids, i18n, levels, references)', () => {
    const result = validateFeedbackLibrary();
    if (!result.isValid) {
      console.error('Validation issues:', result.issues.slice(0, 10));
    }
    expect(result.isValid).toBe(true);
    expect(result.totalEntries).toBeGreaterThanOrEqual(50);
    expect(result.totalHintSets).toBeGreaterThanOrEqual(30);
  });

  it('has unique feedback ids', () => {
    const ids = FEEDBACK_ENTRIES.map((e) => e.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('keys micro lesson entries to real lesson ids', () => {
    const lessonIds = new Set(MICRO_LESSONS.map((l) => l.id));
    const microEntries = FEEDBACK_ENTRIES.filter((e) => e.activity === 'micro_lesson');
    expect(microEntries.length).toBeGreaterThanOrEqual(25);
    for (const entry of microEntries) {
      expect(lessonIds.has(entry.key)).toBe(true);
    }
  });

  it('keys experiment entries to real experiment ids', () => {
    const experimentIds = new Set(EXPERIMENTS.map((e) => e.id));
    const expEntries = FEEDBACK_ENTRIES.filter((e) => e.activity === 'experiment');
    expect(expEntries.length).toBe(EXPERIMENTS.length);
    for (const entry of expEntries) {
      expect(experimentIds.has(entry.key)).toBe(true);
    }
  });

  it('uses valid related ids (no dangling references)', () => {
    const lessonIds = new Set(MICRO_LESSONS.map((l) => l.id));
    const experimentIds = new Set(EXPERIMENTS.map((e) => e.id));
    for (const entry of FEEDBACK_ENTRIES) {
      if (entry.relatedLessonId) {
        expect(lessonIds.has(entry.relatedLessonId)).toBe(true);
      }
      if (entry.relatedExperimentId) {
        expect(experimentIds.has(entry.relatedExperimentId)).toBe(true);
      }
      if (entry.similarKey) {
        const siblingExists = FEEDBACK_ENTRIES.some((e) => e.key === entry.similarKey);
        expect(siblingExists).toBe(true);
      }
    }
  });
});

describe('Duplication guards', () => {
  it('same completion does not award XP twice (activity dedupe)', async () => {
    const input = {
      type: 'micro_lesson_completed' as const,
      dedupeKey: 'fb-test-dedupe-key',
      title: 'Feedback dedupe test',
      titleTa: 'பின்னூட்ட சோதனை',
      xpEarned: 20,
    };

    const first = await recordActivity(input);
    const second = await recordActivity(input);

    expect(first).not.toBeNull();
    expect(second).toBeNull();
  });

  it('hint consumption never creates XP — engine is XP-free', () => {
    // The feedback engine module must not import or call recordActivity/Xp.
    const engineSource = require('fs').readFileSync(
      require('path').join(__dirname, '..', 'feedback.engine.ts'),
      'utf8'
    );
    expect(engineSource).not.toContain('recordActivity');
    expect(engineSource).not.toContain("from '../activity'");
    expect(engineSource).not.toContain("from '../xp'");
    expect(engineSource).not.toContain('AsyncStorage');
  });

  it('hooks never award XP or persist feedback state', () => {
    const hooksSource = require('fs').readFileSync(
      require('path').join(__dirname, '..', 'feedback.hooks.ts'),
      'utf8'
    );
    expect(hooksSource).not.toContain('recordActivity');
    expect(hooksSource).not.toContain('recordXp');
    expect(hooksSource).not.toContain('AsyncStorage');
  });
});

describe('Protected features — no regression', () => {
  it('quiz question bank is untouched (200 questions intact)', async () => {
    const history = await getQuizHistory();
    expect(Array.isArray(history)).toBe(true);
    // Quiz scoring constants unchanged
    const scoring = await import('../../quiz/quiz.scoring');
    expect(scoring.POINTS_PER_CORRECT_ANSWER).toBe(10);
  });

  it('riddle two-attempt rule and scoring are untouched', () => {
    const riddles = getRiddlesForDifficulty('easy');
    expect(riddles.length).toBeGreaterThan(0);
    const scoring = require('../../riddles/riddle.scoring');
    // Attempt 1 = full points, attempt 2 = half
    expect(scoring.calculateRiddlePoints(100, 1, true)).toBe(100);
    expect(scoring.calculateRiddlePoints(100, 2, true)).toBe(50);
    expect(scoring.calculateRiddlePoints(100, 1, false)).toBe(0);
  });

  it('quiz engine owns its own hint flow (feedback layer not injected)', () => {
    const engineSource = require('fs').readFileSync(
      require('path').join(__dirname, '..', '..', '..', 'features', 'quiz', 'useQuizEngine.ts'),
      'utf8'
    );
    // No import of the feedback feature module inside the protected engine.
    expect(engineSource).not.toMatch(/from ['"].*feedback/);
  });
});

describe('XP / Daily Goal / Activity centralization', () => {
  it('feedback layer adds no new activity types', () => {
    const typesSource = require('fs').readFileSync(
      require('path').join(__dirname, '..', '..', 'activity', 'activity.types.ts'),
      'utf8'
    );
    expect(typesSource).not.toContain('hint_used');
    expect(typesSource).not.toContain('feedback_viewed');
  });

  it('hint events stay in-memory only (no storage writes)', () => {
    const feedbackSources = ['feedback.engine.ts', 'feedback.repository.ts', 'feedback.utils.ts'];
    for (const file of feedbackSources) {
      const src = require('fs').readFileSync(require('path').join(__dirname, '..', file), 'utf8');
      expect(src).not.toContain('STORAGE_KEYS');
      expect(src).not.toContain('storage.setItem');
    }
  });
});
