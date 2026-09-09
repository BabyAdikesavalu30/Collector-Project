/**
 * Hint Engine Test Suite
 * Phase 40 verification: hint levels, progression, missing hints,
 * repeated requests, attempt gating, localization, invalid questions.
 */

import {
  getHintsForQuestion,
  getHintCount,
  requestNextHint,
  requestHint,
} from '../feedback.engine';
import { FEEDBACK_HINTS, FEEDBACK_HINT_SET_COUNT } from '../feedback.hintData';
import { MICRO_LESSONS } from '../../micro-lessons/microLessons.data';
import { EXPERIMENTS } from '../../experiment-lab/experiment.data';

describe('Feedback Hint Library', () => {
  it('authors at least 30 hint sets', () => {
    expect(FEEDBACK_HINT_SET_COUNT).toBeGreaterThanOrEqual(30);
    expect(Object.keys(FEEDBACK_HINTS).length).toBe(FEEDBACK_HINT_SET_COUNT);
  });

  it('covers every micro lesson with an authored hint set', () => {
    for (const lesson of MICRO_LESSONS) {
      expect(FEEDBACK_HINTS[lesson.id]).toBeDefined();
      expect(FEEDBACK_HINTS[lesson.id].length).toBe(3);
    }
  });

  it('covers every experiment with an authored hint set', () => {
    for (const exp of EXPERIMENTS) {
      expect(FEEDBACK_HINTS[exp.id]).toBeDefined();
      expect(FEEDBACK_HINTS[exp.id].length).toBe(3);
    }
  });

  it('never authors generic placeholder hints', () => {
    const banned = ['think carefully', 'good luck', 'try your best'];
    for (const hints of Object.values(FEEDBACK_HINTS)) {
      for (const hint of hints) {
        for (const text of [hint.localizedText.en, hint.localizedText.ta]) {
          const lower = text.toLowerCase();
          for (const phrase of banned) {
            expect(lower).not.toContain(phrase);
          }
          expect(text.trim().length).toBeGreaterThan(15);
        }
      }
    }
  });
});

describe('Hint Engine — level resolution', () => {
  it('returns three authored hints for a known question', () => {
    const hints = getHintsForQuestion('micro-newtons-first-law');
    expect(hints.length).toBe(3);
    expect(getHintCount('micro-newtons-first-law')).toBe(3);
  });

  it('reveals hint 1, then 2, then 3 progressively', () => {
    const first = requestNextHint('micro-newtons-first-law', 0);
    expect(first.hint?.level).toBe(1);
    expect(first.remainingHints).toBe(2);
    expect(first.answerRevealed).toBe(false);

    const second = requestNextHint('micro-newtons-first-law', 1);
    expect(second.hint?.level).toBe(2);
    expect(second.remainingHints).toBe(1);

    const third = requestNextHint('micro-newtons-first-law', 2);
    expect(third.hint?.level).toBe(3);
    expect(third.remainingHints).toBe(0);
  });

  it('never reveals all hints at once', () => {
    const result = requestNextHint('micro-newtons-first-law', 0);
    expect(result.hint?.level).toBe(1);
  });

  it('does not consume the same hint twice when exhausted', () => {
    const overdrawn = requestNextHint('micro-newtons-first-law', 3);
    expect(overdrawn.hint).toBeNull();
    expect(overdrawn.remainingHints).toBe(0);
  });

  it('respects maxHints configuration (0 disables hints)', () => {
    const result = requestNextHint('micro-newtons-first-law', 0, { maxHints: 0 });
    expect(result.hint).toBeNull();
  });

  it('caps progression at configured maxHints', () => {
    const result = requestNextHint('micro-newtons-first-law', 1, { maxHints: 1 });
    expect(result.hint).toBeNull();
    expect(result.remainingHints).toBe(0);
  });
});

describe('Hint Engine — missing and invalid questions', () => {
  it('returns empty for an unknown question key', () => {
    expect(getHintsForQuestion('does-not-exist')).toEqual([]);
    expect(getHintCount('does-not-exist')).toBe(0);
  });

  it('returns a null hint (never throws) for an unknown question', () => {
    const result = requestNextHint('does-not-exist', 0);
    expect(result.hint).toBeNull();
    expect(result.remainingHints).toBe(0);
    expect(result.answerRevealed).toBe(false);
  });
});

describe('Hint Engine — localization', () => {
  it('authors both English and Tamil for every hint', () => {
    for (const hints of Object.values(FEEDBACK_HINTS)) {
      for (const hint of hints) {
        expect(hint.localizedText.en.trim().length).toBeGreaterThan(0);
        expect(hint.localizedText.ta.trim().length).toBeGreaterThan(0);
      }
    }
  });

  it('keeps level text distinct across levels (real progression)', () => {
    const hints = getHintsForQuestion('exp-ohms-law');
    expect(hints[0].localizedText.en).not.toBe(hints[1].localizedText.en);
    expect(hints[1].localizedText.en).not.toBe(hints[2].localizedText.en);
  });
});

describe('Hint Engine — attempt gating', () => {
  it('exposes hints immediately when availableAfterAttempt is 0', () => {
    const result = requestHint({
      questionId: 'micro-newtons-first-law',
      activityType: 'micro_lesson',
      attemptNumber: 0,
      hintLevel: 1,
    });
    expect(result.hint).not.toBeNull();
  });

  it('gates a hint until its required attempt number', () => {
    const hints = getHintsForQuestion('micro-newtons-first-law');
    const gated = { ...hints[0], availableAfterAttempt: 2 };
    const patched = { ...FEEDBACK_HINTS, 'test-gated': [gated] };

    // Temporarily register a gated set through the public data surface.
    const original = FEEDBACK_HINTS['test-gated'];
    (FEEDBACK_HINTS as Record<string, typeof hints>)['test-gated'] = [gated];

    const early = requestHint({
      questionId: 'test-gated',
      activityType: 'micro_lesson',
      attemptNumber: 1,
      hintLevel: 1,
    });
    expect(early.hint).toBeNull();

    const onTime = requestHint({
      questionId: 'test-gated',
      activityType: 'micro_lesson',
      attemptNumber: 2,
      hintLevel: 1,
    });
    expect(onTime.hint).not.toBeNull();

    // Restore
    if (original) {
      (FEEDBACK_HINTS as Record<string, typeof hints>)['test-gated'] = original;
    } else {
      delete (FEEDBACK_HINTS as Record<string, unknown>)['test-gated'];
    }
  });
});
