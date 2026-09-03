/**
 * Certificates Feature Storage
 * Persists earned certificates locally. Eligibility is recomputed on every
 * load so certificates appear retroactively once requirements are met.
 */

import { storage, STORAGE_KEYS } from '../../storage/asyncStorage';
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

  return [...existing, ...newlyEarned].sort((a, b) => b.dateEarned - a.dateEarned);
}

/**
 * Finds a certificate by id (used by the full-screen certificate view).
 */
export async function getCertificateById(id: string): Promise<Certificate | null> {
  const all = await getCertificates();
  return all.find((c) => c.id === id) || null;
}