/**
 * Incorrect Answer Coach Test Suite
 * Phase 40 verification: correct/incorrect feedback, escalation by attempt,
 * safe fallbacks, invalid references, tone guarantees, duplication guards.
 */

import { resolveCoach, resolveAnswerFeedback, findFeedbackEntry, getFeedbackEntryById } from '../feedback.engine';
import { FEEDBACK_ENTRIES } from '../feedback.data';
import { buildFallbackExplanation, buildFallbackTakeaway, sanitizeAnswerText, pickLocalized } from '../feedback.utils';

const baseRequest = {
  studentAnswer: 'Gravity suddenly pulls the passenger forward',
  correctAnswer: 'Inertia of motion keeps the upper body moving forward',
  isCorrect: false,
  attemptNumber: 1,
  language: 'en' as const,
};

describe('Coach — content library', () => {
  it('authors at least 50 feedback entries', () => {
    expect(FEEDBACK_ENTRIES.length).toBeGreaterThanOrEqual(50);
  });

  it('spans physics, chemistry, biology, space, and environment', () => {
    const subjects = new Set(FEEDBACK_ENTRIES.map((e) => e.subject));
    for (const s of ['physics', 'chemistry', 'biology', 'space', 'environment']) {
      expect(subjects.has(s as never)).toBe(true);
    }
  });

  it('resolves entries by id and by key+activity', () => {
    const entry = FEEDBACK_ENTRIES[0];
    expect(getFeedbackEntryById(entry.id)?.id).toBe(entry.id);
    expect(findFeedbackEntry(entry.key, entry.activity)?.id).toBe(entry.id);
  });

  it('returns null for unknown references instead of throwing', () => {
    expect(getFeedbackEntryById('fb-unknown')).toBeNull();
    expect(findFeedbackEntry('nope', 'micro_lesson')).toBeNull();
  });
});

describe('Coach — correct answers', () => {
  it('returns positive feedback with a takeaway when content exists', () => {
    const reference = { feedbackId: 'fb-micro-newtons-first-law', activityType: 'micro_lesson' as const, subject: 'physics' as const };
    const result = resolveCoach({
      ...baseRequest,
      isCorrect: true,
      reference,
    });
    expect(result.result).toBe('correct');
    expect(result.explanation.length).toBeGreaterThan(0);
    expect(result.takeaway).toBeTruthy();
    expect(result.retryAvailable).toBe(false);
    expect(result.hint).toBeNull();
  });

  it('returns correct feedback without reference (no crash)', () => {
    const result = resolveCoach({ ...baseRequest, isCorrect: true, reference: null });
    expect(result.result).toBe('correct');
    expect(result.takeaway).toBeNull();
  });
});

describe('Coach — incorrect answers', () => {
  it('provides explanation and takeaway from authored content', () => {
    const reference = { feedbackId: 'fb-micro-newtons-first-law', activityType: 'micro_lesson' as const, subject: 'physics' as const };
    const result = resolveCoach({ ...baseRequest, reference });
    expect(result.result).toBe('incorrect');
    expect(result.explanation).toContain('upper body');
    expect(result.takeaway).toContain('motion');
    expect(result.retryAvailable).toBe(true);
  });

  it('escalates guidance on attempt 2 (guidedExplanation)', () => {
    const reference = { feedbackId: 'fb-micro-newtons-first-law', activityType: 'micro_lesson' as const, subject: 'physics' as const };
    const first = resolveCoach({ ...baseRequest, attemptNumber: 1, reference });
    const second = resolveCoach({ ...baseRequest, attemptNumber: 2, reference });
    expect(second.explanation).not.toBe(first.explanation);
    expect(second.hint).toBeTruthy();
  });

  it('uses safe fallback when no authored content exists', () => {
    const result = resolveCoach({ ...baseRequest, reference: null });
    expect(result.result).toBe('incorrect');
    expect(result.explanation).toBe(buildFallbackExplanation('en'));
    expect(result.explanation.toLowerCase()).not.toContain('undefined');
    expect(result.takeaway).toBe(buildFallbackTakeaway('en'));
  });

  it('never fabricates a question-specific reason in fallback', () => {
    const result = resolveCoach({ ...baseRequest, reference: null });
    expect(result.explanation).not.toContain('inertia');
    expect(result.explanation).not.toContain('gravity');
  });

  it('treats invalid feedback ids as missing content (safe fallback)', () => {
    const result = resolveCoach({
      ...baseRequest,
      reference: { feedbackId: 'fb-does-not-exist', activityType: 'quiz', subject: 'general' },
    });
    expect(result.explanation).toBe(buildFallbackExplanation('en'));
  });
});

describe('Coach — tone guarantees', () => {
  it('never uses punitive wording', () => {
    const banned = ['wrong!', 'failure', 'you lost', 'bad answer', 'stupid'];
    const reference = { feedbackId: 'fb-micro-newtons-first-law', activityType: 'micro_lesson' as const, subject: 'physics' as const };
    const result = resolveCoach({ ...baseRequest, reference });
    const all = `${result.greeting} ${result.explanation} ${result.takeaway}`.toLowerCase();
    for (const phrase of banned) {
      expect(all).not.toContain(phrase);
    }
  });

  it('greets in Tamil when requested', () => {
    const result = resolveCoach({ ...baseRequest, language: 'ta', reference: null });
    expect(result.greeting).toBe('சரியாக இல்லை');
  });

  it('localizes explanation and takeaway into Tamil', () => {
    const reference = { feedbackId: 'fb-micro-newtons-first-law', activityType: 'micro_lesson' as const, subject: 'physics' as const };
    const result = resolveCoach({ ...baseRequest, language: 'ta', reference });
    expect(/[\u0B80-\u0BFF]/.test(result.explanation)).toBe(true);
    expect(/[\u0B80-\u0BFF]/.test(result.takeaway || '')).toBe(true);
  });
});

describe('Coach — answer sanitization', () => {
  it('rejects undefined/null/[object Object] answers', () => {
    expect(sanitizeAnswerText('undefined')).toBeNull();
    expect(sanitizeAnswerText('null')).toBeNull();
    expect(sanitizeAnswerText('[object Object]')).toBeNull();
    expect(sanitizeAnswerText('')).toBeNull();
    expect(sanitizeAnswerText('  ')).toBeNull();
  });

  it('accepts real answers', () => {
    expect(sanitizeAnswerText('Inertia')).toBe('Inertia');
  });

  it('never surfaces unusable answer text through the coach', () => {
    const result = resolveCoach({
      ...baseRequest,
      studentAnswer: 'undefined',
      correctAnswer: null,
      reference: null,
    });
    expect(result.studentAnswer).toBeNull();
    expect(result.correctAnswer).toBeNull();
  });
});

describe('Coach — retry and similar question flags', () => {
  it('exposes similar question only when a deterministic sibling exists', () => {
    const withSibling = resolveCoach({
      ...baseRequest,
      reference: { feedbackId: 'fb-micro-newtons-first-law', activityType: 'micro_lesson', subject: 'physics' },
    });
    expect(withSibling.similarQuestionAvailable).toBe(true);

    const withoutSibling = resolveCoach({
      ...baseRequest,
      reference: null,
    });
    expect(withoutSibling.similarQuestionAvailable).toBe(false);
  });

  it('can disable retry via config without touching scoring', () => {
    const result = resolveCoach({
      ...baseRequest,
      reference: null,
      config: { retryEnabled: false },
    });
    expect(result.retryAvailable).toBe(false);
  });
});

describe('Coach — AnswerFeedback model', () => {
  it('builds a complete model with weak-area metadata', () => {
    const model = resolveAnswerFeedback({
      ...baseRequest,
      reference: { feedbackId: 'fb-micro-newtons-first-law', activityType: 'micro_lesson', subject: 'physics' },
    });
    expect(model.id).toBe('fb-micro-newtons-first-law');
    expect(model.metadata?.topicId).toBe('force-and-motion');
    expect(model.metadata?.misconceptionTag).toBe('confusesInertiaWithForce');
    expect(model.relatedLessonId).toBe('micro-newtons-first-law');
  });

  it('keeps pickLocalized robust for missing Tamil', () => {
    expect(pickLocalized({ en: 'Hello', ta: '' }, 'ta')).toBe('Hello');
    expect(pickLocalized({ en: 'Hello', ta: 'வணக்கம்' }, 'ta')).toBe('வணக்கம்');
  });
});
