/**
 * CertificatesScreen Component (/certificates)
 * Lists earned certificates as cards; tapping a card opens the full-screen
 * certificate view. Empty state explains exactly what is needed to earn
 * the first certificate. Eligibility is recomputed on load from local data.
 */

import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { theme } from '../../theme';
import { SupportedLanguage } from '../../config/i18n';
import { AppBackButton } from '../navigation';
import { getQuizStats } from '../../features/quiz';
import { getUnlockedAchievements } from '../../features/achievements';
import { storage, STORAGE_KEYS } from '../../storage/asyncStorage';
import {
  Certificate,
  recomputeAndPersistCertificates,
  computeEligibleCertificates,
  getCertificateTitle,
  SUBJECT_CERT_MIN_QUIZZES,
  SUBJECT_CERT_MIN_ACCURACY,
  MILESTONE_BADGE_COUNTS,
} from '../../features/certificates';
import { LEARNING_SUBJECTS } from '../../features/learn';
import { getTranslation } from '../../config/i18n';

interface CertificatesScreenProps {
  language?: SupportedLanguage;
  onBack: () => void;
  onOpenCertificate: (certificate: Certificate) => void;
  onStartLearning: () => void;
}

function formatDate(timestamp: number, isTamil: boolean): string {
  const d = new Date(timestamp);
  const day = d.getDate();
  const months = isTamil
    ? ['ஜன', 'பிப்', 'மார்', 'ஏப்', 'மே', 'ஜூன்', 'ஜூலை', 'ஆக', 'செப்', 'அக்', 'நவ', 'டிச']
    : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${day} ${months[d.getMonth()]} ${d.getFullYear()}`;
}

export const CertificatesScreen: React.FC<CertificatesScreenProps> = ({
  language = 'en',
  onBack,
  onOpenCertificate,
  onStartLearning,
}) => {
  const insets = useSafeAreaInsets();
  const isTamil = language === 'ta';

  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [lockedMilestones, setLockedMilestones] = useState<Array<{ id: string; title: { en: string; ta: string }; hint: string }>>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadCertificates = useCallback(async () => {
    try {
      const [stats, unlocked] = await Promise.all([
        getQuizStats(),
        getUnlockedAchievements(),
      ]);

      const storedProfile = await storage
        .getItem<{ fullName?: string; name?: string; grade?: string; city?: string; school?: string }>(
          STORAGE_KEYS.STUDENT_PROFILE
        )
        .catch(() => null);

      const recipient = {
        name: storedProfile?.fullName || storedProfile?.name || 'Young Scientist',
        grade: storedProfile?.grade || '—',
        location: storedProfile?.city || storedProfile?.school || '—',
      };

      const badgeCount = Object.keys(unlocked).length;
      const result = await recomputeAndPersistCertificates(
        {
          quizStats: stats,
          unlockedBadgeCount: badgeCount,
        },
        recipient
      );
      setCertificates(result);

      // Locked milestones: subject certificates not yet earned for each
      // subject, plus milestone certificates at higher badge counts.
      const eligible = computeEligibleCertificates({ quizStats: stats, unlockedBadgeCount: badgeCount });
      const earnedIds = new Set(result.map((c) => c.id));
      const locked: Array<{ id: string; title: { en: string; ta: string }; hint: string }> = [];
      const eligibleSubjectIds = new Set(eligible.subjectCertificates.map((s) => s.subjectId));
      for (const subject of LEARNING_SUBJECTS) {
        const id = `cert-subject-${subject.id}`;
        if (!earnedIds.has(id) && !eligibleSubjectIds.has(subject.id)) {
          locked.push({
            id,
            title: getCertificateTitle('subject', subject.id),
            hint: `${SUBJECT_CERT_MIN_QUIZZES}+ quizzes at ${SUBJECT_CERT_MIN_ACCURACY}%+ accuracy`,
          });
        }
      }
      for (const count of MILESTONE_BADGE_COUNTS) {
        const id = `cert-milestone-${count}`;
        if (!earnedIds.has(id) && badgeCount < count) {
          locked.push({
            id,
            title: getCertificateTitle('milestone', undefined, count),
            hint: `Unlock ${count} achievement badges`,
          });
        }
      }
      setLockedMilestones(locked);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadCertificates();
  }, [loadCertificates]);

  const isEmpty = !isLoading && certificates.length === 0;

  return (
    <View style={styles.container}>
      <StatusBar style="dark" translucent backgroundColor="transparent" />

      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + 8 }]}>
        <AppBackButton onPress={onBack} language={language} style={styles.headerBackBtn} />
        <Text style={styles.headerTitle}>{isTamil ? 'எனது சான்றிதழ்கள்' : 'My Certificates'}</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        style={styles.scrollBody}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: Math.max(insets.bottom + 24, 32) },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {isLoading ? (
          <Text style={styles.loadingText}>{isTamil ? 'ஏற்றுகிறது...' : 'Loading...'}</Text>
        ) : isEmpty ? (
          /* ---- Empty state ---- */
          <View style={styles.emptyCard}>
            <Text style={styles.emptyIcon}>🏅</Text>
            <Text style={styles.emptyTitle}>
              {isTamil ? 'இன்னும் சான்றிதழ்கள் இல்லை' : 'No Certificates Yet'}
            </Text>
            <Text style={styles.emptySubtitle}>
              {isTamil
                ? `ஒரு பாடத்தில் ${SUBJECT_CERT_MIN_QUIZZES} வினாடி வினாக்களை ${SUBJECT_CERT_MIN_ACCURACY}% துல்லியத்துடன் முடிக்கவும் — முதல் சான்றிதழ் தானாகவே கிடைக்கும். மேலும் 3 சாதனை பேட்ஜ்களைத் திறந்தாலும் ஒரு மைல்கல் சான்றிதழ் கிடைக்கும்.`
                : `Complete ${SUBJECT_CERT_MIN_QUIZZES} quizzes in one subject at ${SUBJECT_CERT_MIN_ACCURACY}%+ accuracy to earn your first certificate automatically. Unlock 3 achievement badges for a milestone certificate.`}
            </Text>
            <TouchableOpacity
              style={styles.primaryButton}
              onPress={onStartLearning}
              activeOpacity={0.85}
              accessible={true}
              accessibilityRole="button"
            >
              <Text style={styles.primaryButtonText}>
                {isTamil ? 'கற்றலைத் தொடங்கவும் →' : 'Start Learning →'}
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            <Text style={styles.countLabel}>
              {certificates.length} {isTamil ? 'சான்றிதழ்கள்' : 'certificates earned'}
            </Text>
            {certificates.map((cert) => (
              <TouchableOpacity
                key={cert.id}
                style={styles.certCard}
                onPress={() => onOpenCertificate(cert)}
                activeOpacity={0.85}
                accessible={true}
                accessibilityRole="button"
                accessibilityLabel={`${isTamil ? cert.title.ta : cert.title.en}. ${formatDate(cert.dateEarned, isTamil)}.`}
                accessibilityHint={isTamil ? 'சான்றிதழை முழுமையாகக் காண தட்டவும்' : 'Tap to view full certificate'}
              >
                <View style={styles.certIconBox}>
                  <Text style={styles.certIcon}>🏆</Text>
                </View>
                <View style={styles.certInfo}>
                  <Text style={styles.certTitle}>
                    {isTamil ? cert.title.ta : cert.title.en}
                  </Text>
                  <Text style={styles.certDate}>
                    {formatDate(cert.dateEarned, isTamil)} · {cert.certificateNumber}
                  </Text>
                </View>
                <Text style={styles.chevron}>→</Text>
              </TouchableOpacity>
            ))}

            {/* Locked milestones (Certificate 2.0) */}
            {lockedMilestones.length > 0 && (
              <>
                <Text style={styles.countLabel}>
                  {getTranslation(language).progress.certificates.locked.toUpperCase()}
                </Text>
                {lockedMilestones.map((locked) => {
                  const lockedTitle = isTamil ? locked.title.ta : locked.title.en;
                  return (
                    <View
                      key={locked.id}
                      style={styles.lockedCard}
                      accessible={true}
                      accessibilityRole="text"
                      accessibilityLabel={`${lockedTitle}. ${isTamil ? 'பூட்டப்பட்டுள்ளது' : 'Locked'}. ${locked.hint}`}
                    >
                      <View style={styles.lockedIconBox}>
                        <Text style={styles.lockedIcon}>🔒</Text>
                      </View>
                      <View style={styles.certInfo}>
                        <Text style={styles.lockedTitle}>
                          {lockedTitle}
                        </Text>
                        <Text style={styles.certDate}>{locked.hint}</Text>
                      </View>
                    </View>
                  );
                })}
              </>
            )}
          </>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.pearlWhite,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.base,
    paddingBottom: theme.spacing.sm,
  },
  headerBackBtn: {},
  headerTitle: {
    ...theme.typography.h2,
    fontSize: 18,
    fontWeight: '800',
    color: theme.colors.navy900,
    flex: 1,
    textAlign: 'center',
  },
  headerSpacer: {
    width: 44,
  },
  scrollBody: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: theme.spacing.base,
  },
  loadingText: {
    ...theme.typography.body,
    color: theme.colors.slate600,
    textAlign: 'center',
    marginTop: 40,
  },
  countLabel: {
    ...theme.typography.caption,
    fontSize: 12,
    fontWeight: '800',
    color: theme.colors.brandPrimary,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 8,
  },
  emptyCard: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: theme.spacing.xl,
    alignItems: 'center',
    marginTop: 24,
    shadowColor: theme.colors.navy900,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  emptyIcon: {
    fontSize: 44,
    marginBottom: theme.spacing.sm,
  },
  emptyTitle: {
    ...theme.typography.h2,
    fontSize: 18,
    fontWeight: '800',
    color: theme.colors.navy900,
    textAlign: 'center',
    marginBottom: 4,
  },
  emptySubtitle: {
    ...theme.typography.body,
    fontSize: 13.5,
    color: theme.colors.slate600,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: theme.spacing.lg,
  },
  primaryButton: {
    backgroundColor: theme.colors.actionPrimary,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: theme.borderRadius.md,
    shadowColor: theme.colors.actionPrimary,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 3,
  },
  primaryButtonText: {
    ...theme.typography.button,
    fontSize: 14,
    fontWeight: '800',
    color: theme.colors.textOnAction,
  },
  certCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.sm,
    shadowColor: theme.colors.navy900,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 1,
  },
  certIconBox: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: '#FEF3C7',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  certIcon: {
    fontSize: 24,
  },
  certInfo: {
    flex: 1,
  },
  certTitle: {
    ...theme.typography.body,
    fontSize: 14.5,
    fontWeight: '800',
    color: theme.colors.navy900,
  },
  certDate: {
    ...theme.typography.caption,
    fontSize: 11.5,
    color: theme.colors.slate500,
    marginTop: 2,
  },
  chevron: {
    fontSize: 16,
    color: theme.colors.slate500,
    marginLeft: 8,
    fontWeight: '700',
  },
  lockedCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surfaceMuted,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderStyle: 'dashed',
    padding: theme.spacing.md,
    marginBottom: theme.spacing.sm,
  },
  lockedIconBox: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: theme.colors.gray100,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  lockedIcon: {
    fontSize: 20,
  },
  lockedTitle: {
    ...theme.typography.body,
    fontSize: 14,
    fontWeight: '700',
    color: theme.colors.slate500,
  },
});