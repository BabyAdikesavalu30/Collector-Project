/**
 * Certificates Feature Storage
 * Persists earned certificates locally. Eligibility is recomputed on every
 * load so certificates appear retroactively once requirements are met.
 */

import { storage, STORAGE_KEYS } from '../../storage/asyncStorage';
import { recordActivity } from '../activity';
import { Certificate, CertificateInput } from './certificates.types';
import {
  computeEligibleCertificates,
  getCertificateId,
  getCertificateSubtitle,
  getCertificateTitle,
  getSubjectTitle,
} from './certificates.engine';

export const CERTIFICATES_KEY = STORAGE_KEYS.CERTIFICATES_EARNED;

export async function getCertificates(): Promise<Certificate[]> {
  try {
    const list = await storage.getItem<Certificate[]>(CERTIFICATES_KEY);
    if (!Array.isArray(list)) return [];
    return [...list].sort((a, b) => b.dateEarned - a.dateEarned);
  } catch {
    return [];
  }
}

/**
 * Recomputes which certificates the current data earns and persists any
 * newly earned ones (existing certificates keep their original date).
 */
export async function recomputeAndPersistCertificates(
  input: CertificateInput,
  recipient: { name: string; grade: string; location: string }
): Promise<Certificate[]> {
  const eligible = computeEligibleCertificates(input);
  const existing = await getCertificates();
  const existingIds = new Set(existing.map((c) => c.id));

  const now = Date.now();
  const newlyEarned: Certificate[] = [];

  eligible.subjectCertificates.forEach(({ subjectId }, index) => {
    const id = getCertificateId('subject', subjectId);
    if (existingIds.has(id)) return;
    const subject = getSubjectTitle(subjectId);
    newlyEarned.push({
      id,
      kind: 'subject',
      subjectId,
      title: getCertificateTitle('subject', subjectId),
      subtitle: getCertificateSubtitle('subject'),
      recipientName: recipient.name,
      grade: recipient.grade,
      location: recipient.location,
      dateEarned: now + index, // stable ordering within same batch
      achievementsCount: input.unlockedBadgeCount,
      certificateNumber: `VIG-${new Date(now).getFullYear()}-${String(existing.length + newlyEarned.length + 1).padStart(4, '0')}`,
    });
  });

  eligible.milestoneCertificates.forEach(({ badgeCount }, index) => {
    const id = getCertificateId('milestone', undefined, badgeCount);
    if (existingIds.has(id)) return;
    newlyEarned.push({
      id,
      kind: 'milestone',
      milestoneBadgeCount: badgeCount,
      title: getCertificateTitle('milestone', undefined, badgeCount),
      subtitle: getCertificateSubtitle('milestone'),
      recipientName: recipient.name,
      grade: recipient.grade,
      location: recipient.location,
      dateEarned: now + index,
      achievementsCount: input.unlockedBadgeCount,
      certificateNumber: `VIG-${new Date(now).getFullYear()}-${String(existing.length + newlyEarned.length + 1).padStart(4, '0')}`,
    });
  });

  if (newlyEarned.length > 0) {
    await storage.setItem(CERTIFICATES_KEY, [...existing, ...newlyEarned]);
  }

  // Safe, additive shared integration: each new certificate feeds the
  // unified activity/XP layer, celebration, and notification systems exactly once.
  for (const certificate of newlyEarned) {
    await recordActivity({
      type: 'certificate_earned',
      dedupeKey: `certificate-${certificate.id}`,
      title: certificate.title.en,
      titleTa: certificate.title.ta,
      subtitle: certificate.subtitle.en,
      subtitleTa: certificate.subtitle.ta,
      xpEarned: 60,
      timestamp: certificate.dateEarned,
      metadata: { certificateId: certificate.id, icon: '📜' },
    });

    try {
      const { celebrationService } = await import('../celebration');
      await celebrationService.triggerCertificateEarned(certificate.id, certificate.title.en);
    } catch {
      // Best effort celebration
    }

    try {
      const { createNotification } = await import('../notifications/notifications.factory');
      await createNotification({
        id: `notif-cert-${certificate.id}`,
        type: 'certificate',
        title: {
          en: `Certificate Earned: ${certificate.title.en}!`,
          ta: `சான்றிதழ் பெறப்பட்டது: ${certificate.title.ta}!`,
        },
        body: {
          en: certificate.subtitle.en,
          ta: certificate.subtitle.ta,
        },
        action: { route: '/certificates' },
        timestamp: certificate.dateEarned,
      });
    } catch {
      // Best effort notification
    }
  }

  return [...existing, ...newlyEarned].sort((a, b) => b.dateEarned - a.dateEarned);
}

/**
 * Finds a certificate by id (used by the full-screen certificate view).
 */
export async function getCertificateById(id: string): Promise<Certificate | null> {
  const all = await getCertificates();
  return all.find((c) => c.id === id) || null;
}