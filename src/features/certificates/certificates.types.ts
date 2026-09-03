/**
 * Certificates Feature Types
 * Certificates are earned entirely from local data, reusing the Phase 3
 * achievements rule set rather than inventing a parallel system:
 *  - one subject certificate per subject (5+ quizzes at 70%+ accuracy)
 *  - milestone certificates tied to unlocked badge counts (3 and 6 badges)
 */

import { QuizStats } from '../quiz';

export type CertificateKind = 'subject' | 'milestone';

export interface CertificateText {
  en: string;
  ta: string;
}

export interface Certificate {
  id: string;
  kind: CertificateKind;
  /** subjectId present only for subject certificates. */
  subjectId?: string;
  /** Badge count threshold, present only for milestone certificates. */
  milestoneBadgeCount?: number;
  title: CertificateText;
  /** One-line descriptor under the certificate title. */
  subtitle: CertificateText;
  recipientName: string;
  /** Grade / Class line shown on the certificate. */
  grade: string;
  /** City / location line shown on the certificate. */
  location: string;
  dateEarned: number;
  /** Number of achievements (badges) unlocked when earned. */
  achievementsCount: number;
  /** Human-readable certificate number, e.g. VIG-2026-0003. */
  certificateNumber: string;
}

/**
 * Inputs consumed by the pure certificate eligibility evaluator.
 */
export interface CertificateInput {
  quizStats: QuizStats;
  /** Count of currently unlocked achievement badges. */
  unlockedBadgeCount: number;
}

export interface CertificateEligibility {
  subjectCertificates: { subjectId: string }[];
  milestoneCertificates: { badgeCount: number }[];
}