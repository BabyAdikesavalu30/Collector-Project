/**
 * Certificates Feature Engine
 * Pure, documented eligibility rules (kept small and aligned with the
 * achievements system from Phase 3 — no parallel rule set).
 *
 * RULES:
 *  - Subject certificate: awarded once per subject when the student has
 *    >= SUBJECT_CERT_MIN_QUIZZES quizzes in that subject at
 *    >= SUBJECT_CERT_MIN_ACCURACY accuracy.
 *  - Milestone certificates: one "Achiever" certificate at 3 unlocked
 *    badges and one "Master" certificate at 6 unlocked badges.
 */

import { CertificateEligibility, CertificateInput, CertificateKind, CertificateText } from './certificates.types';
import { LEARNING_SUBJECTS } from '../learn';

export const SUBJECT_CERT_MIN_QUIZZES = 5;
export const SUBJECT_CERT_MIN_ACCURACY = 70;
export const MILESTONE_BADGE_COUNTS = [3, 6] as const;

const SUBJECT_TA_NAMES: Record<string, string> = {
  physics: 'இயற்பியல்',
  chemistry: 'வேதியியல்',
  biology: 'உயிரியல்',
};

/**
 * Pure eligibility evaluation — which certificates the current data earns.
 */
export function computeEligibleCertificates(input: CertificateInput): CertificateEligibility {
  const subjectCertificates = input.quizStats.subjectStats
    .filter((s) => s.quizzesCompleted >= SUBJECT_CERT_MIN_QUIZZES && s.accuracy >= SUBJECT_CERT_MIN_ACCURACY)
    .map((s) => ({ subjectId: s.subjectId }));

  const milestoneCertificates = MILESTONE_BADGE_COUNTS.filter(
    (count) => input.unlockedBadgeCount >= count
  ).map((badgeCount) => ({ badgeCount }));

  return { subjectCertificates, milestoneCertificates };
}

export function getSubjectTitle(subjectId: string): CertificateText {
  const fromLearn = LEARNING_SUBJECTS.find((s) => s.id === subjectId);
  return {
    en: fromLearn?.title || subjectId,
    ta: SUBJECT_TA_NAMES[subjectId] || subjectId,
  };
}

export function getCertificateTitle(
  kind: CertificateKind,
  subjectId?: string,
  milestoneBadgeCount?: number
): CertificateText {
  if (kind === 'subject' && subjectId) {
    const subject = getSubjectTitle(subjectId);
    return {
      en: `${subject.en} Excellence`,
      ta: `${subject.ta} சிறப்பு`,
    };
  }
  if (kind === 'milestone') {
    if (milestoneBadgeCount && milestoneBadgeCount >= 6) {
      return { en: 'Science Master', ta: 'அறிவியல் மேதை' };
    }
    return { en: 'Science Achiever', ta: 'அறிவியல் சாதனையாளர்' };
  }
  return { en: 'Science Achiever', ta: 'அறிவியல் சாதனையாளர்' };
}

export function getCertificateSubtitle(kind: CertificateKind): CertificateText {
  if (kind === 'subject') {
    return {
      en: 'For consistent subject mastery in quizzes',
      ta: 'வினாடி வினாக்களில் நிலையான பாடத் தேர்ச்சிக்காக',
    };
  }
  return {
    en: 'For outstanding achievement milestones',
    ta: 'சிறந்த சாதனை மைல்கற்களுக்காக',
  };
}

/**
 * Stable certificate id for a given kind + discriminator.
 */
export function getCertificateId(
  kind: CertificateKind,
  subjectId?: string,
  milestoneBadgeCount?: number
): string {
  if (kind === 'subject' && subjectId) return `cert-subject-${subjectId}`;
  if (kind === 'milestone') return `cert-milestone-${milestoneBadgeCount ?? 0}`;
  return `cert-${kind}`;
}