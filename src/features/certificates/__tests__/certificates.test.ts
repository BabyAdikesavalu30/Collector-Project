/**
 * Certificates Feature Tests
 * Eligibility boundaries, stable certificate ids, bilingual titles,
 * duplicate prevention across recomputes, retrieval by id, and XP wiring.
 */

import { storage, STORAGE_KEYS } from '../../../storage/asyncStorage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getXpTransactions } from '../../xp';
import { getActivityHistory } from '../../activity';
import { QuizStats } from '../../quiz';
import {
  computeEligibleCertificates,
  getCertificateId,
  getCertificateTitle,
  getCertificateSubtitle,
  SUBJECT_CERT_MIN_QUIZZES,
  SUBJECT_CERT_MIN_ACCURACY,
} from '../certificates.engine';
import { recomputeAndPersistCertificates, getCertificates, getCertificateById } from '../certificates.storage';
import { CertificateInput } from '../certificates.types';

function makeStats(subjects: Array<{ subjectId: string; quizzesCompleted: number; accuracy: number }>): QuizStats {
  return {
    totalPoints: 0,
    quizzesCompleted: subjects.reduce((s, x) => s + x.quizzesCompleted, 0),
    totalQuestionsAttempted: 0,
    totalCorrectAnswers: 0,
    overallAccuracy: 0,
    currentStreakDays: 0,
    longestStreakDays: 0,
    streakHistory: [],
    subjectStats: subjects.map((s) => ({
      subjectId: s.subjectId,
      quizzesCompleted: s.quizzesCompleted,
      questionsAttempted: 0,
      correctAnswers: 0,
      accuracy: s.accuracy,
    })),
  };
}

function makeInput(quizStats: QuizStats, unlockedBadgeCount = 0): CertificateInput {
  return { quizStats, unlockedBadgeCount };
}

const RECIPIENT = { name: 'Aarav', grade: 'Grade 8', location: 'Chennai' };

describe('certificate eligibility engine', () => {
  it('requires the configured minimum quizzes and accuracy', () => {
    expect(SUBJECT_CERT_MIN_QUIZZES).toBe(5);
    expect(SUBJECT_CERT_MIN_ACCURACY).toBe(70);

    const atThreshold = computeEligibleCertificates(
      makeInput(makeStats([{ subjectId: 'physics', quizzesCompleted: 5, accuracy: 70 }]))
    );
    expect(atThreshold.subjectCertificates.map((s) => s.subjectId)).toEqual(['physics']);

    const belowQuizzes = computeEligibleCertificates(
      makeInput(makeStats([{ subjectId: 'physics', quizzesCompleted: 4, accuracy: 90 }]))
    );
    expect(belowQuizzes.subjectCertificates).toEqual([]);

    const belowAccuracy = computeEligibleCertificates(
      makeInput(makeStats([{ subjectId: 'chemistry', quizzesCompleted: 5, accuracy: 69 }]))
    );
    expect(belowAccuracy.subjectCertificates).toEqual([]);
  });

  it('evaluates each subject independently', () => {
    const eligible = computeEligibleCertificates(
      makeInput(
        makeStats([
          { subjectId: 'physics', quizzesCompleted: 6, accuracy: 85 },
          { subjectId: 'biology', quizzesCompleted: 2, accuracy: 95 },
        ])
      )
    );
    expect(eligible.subjectCertificates).toEqual([{ subjectId: 'physics' }]);
  });

  it('awards milestone certificates at 3 and 6 badges', () => {
    expect(computeEligibleCertificates(makeInput(makeStats([]), 2)).milestoneCertificates).toEqual([]);
    expect(computeEligibleCertificates(makeInput(makeStats([]), 3)).milestoneCertificates).toEqual([{ badgeCount: 3 }]);
    expect(computeEligibleCertificates(makeInput(makeStats([]), 6)).milestoneCertificates).toEqual([
      { badgeCount: 3 },
      { badgeCount: 6 },
    ]);
  });

  it('uses stable ids and localized bilingual titles', () => {
    expect(getCertificateId('subject', 'physics')).toBe('cert-subject-physics');
    expect(getCertificateId('milestone', undefined, 6)).toBe('cert-milestone-6');

    const subjectTitle = getCertificateTitle('subject', 'physics');
    expect(subjectTitle.en).toBe('Physics Excellence');
    expect(subjectTitle.ta.length).toBeGreaterThan(0);
    expect(getCertificateTitle('milestone', undefined, 6).en).toBe('Science Master');
    expect(getCertificateTitle('milestone', undefined, 3).en).toBe('Science Achiever');

    const subtitle = getCertificateSubtitle('subject');
    expect(subtitle.en.length).toBeGreaterThan(0);
    expect(subtitle.ta.length).toBeGreaterThan(0);
  });
});

describe('certificate storage', () => {
  beforeEach(async () => {
    await storage.removeItem(STORAGE_KEYS.CERTIFICATES_EARNED);
    await storage.removeItem(STORAGE_KEYS.XP_TRANSACTIONS);
    await storage.removeItem(STORAGE_KEYS.ACTIVITY_HISTORY);
  });

  it('persists newly earned certificates exactly once', async () => {
    const input = makeInput(
      makeStats([{ subjectId: 'physics', quizzesCompleted: 5, accuracy: 80 }]),
      3
    );

    const first = await recomputeAndPersistCertificates(input, RECIPIENT);
    const ids = first.map((c) => c.id).sort();
    expect(ids).toEqual(['cert-milestone-3', 'cert-subject-physics']);

    // Recomputing with identical data must not create duplicates.
    const second = await recomputeAndPersistCertificates(input, RECIPIENT);
    expect(second.length).toBe(first.length);

    const stored = await getCertificates();
    expect(stored.length).toBe(2);
    expect(new Set(stored.map((c) => c.id)).size).toBe(2);
  });

  it('wires certificate_earned activity and XP exactly once per certificate', async () => {
    const input = makeInput(makeStats([{ subjectId: 'physics', quizzesCompleted: 5, accuracy: 80 }]));
    await recomputeAndPersistCertificates(input, RECIPIENT);
    // Recompute again with identical data → no new events.
    await recomputeAndPersistCertificates(input, RECIPIENT);

    const history = await getActivityHistory();
    expect(history.filter((h) => h.type === 'certificate_earned').length).toBe(1);

    const transactions = await getXpTransactions();
    expect(transactions.filter((t) => t.source === 'certificate').length).toBe(1);
    expect(transactions[0].amount).toBe(60);
  });

  it('retrieves by id and returns null for missing certificates', async () => {
    await recomputeAndPersistCertificates(
      makeInput(makeStats([{ subjectId: 'biology', quizzesCompleted: 5, accuracy: 75 }])),
      RECIPIENT
    );

    const found = await getCertificateById('cert-subject-biology');
    expect(found).not.toBeNull();
    expect(found?.recipientName).toBe('Aarav');
    expect(found?.certificateNumber).toMatch(/^VIG-\d{4}-\d{4}$/);

    expect(await getCertificateById('cert-subject-does-not-exist')).toBeNull();
    expect(await getCertificates()).toHaveLength(1);
  });

  it('recovers from corrupted certificate storage', async () => {
    await AsyncStorage.setItem(STORAGE_KEYS.CERTIFICATES_EARNED, '{{{{corrupt');
    expect(await getCertificates()).toEqual([]);

    const after = await recomputeAndPersistCertificates(
      makeInput(makeStats([{ subjectId: 'chemistry', quizzesCompleted: 5, accuracy: 90 }])),
      RECIPIENT
    );
    expect(after.length).toBe(1);
  });
});
