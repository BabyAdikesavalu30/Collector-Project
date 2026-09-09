/**
 * CertificatePreview — Certificate 2.0 academic presentation.
 * Double-border academic layout in navy/blue/green on pearl, with a
 * restrained gold accent, verification-ready QR placeholder, and signature
 * section. Demo verification is clearly labeled — never claims external
 * validation.
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../../theme';
import { SupportedLanguage, getTranslation } from '../../config/i18n';
import { Certificate } from '../../features/certificates';

interface CertificatePreviewProps {
  certificate: Certificate;
  language: SupportedLanguage;
}

function formatDate(timestamp: number, isTamil: boolean): string {
  const d = new Date(timestamp);
  const day = d.getDate();
  const months = isTamil
    ? ['ஜன', 'பிப்', 'மார்', 'ஏப்', 'மே', 'ஜூன்', 'ஜூலை', 'ஆக', 'செப்', 'அக்', 'நவ', 'டிச']
    : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${day} ${months[d.getMonth()]} ${d.getFullYear()}`;
}

export const CertificatePreview: React.FC<CertificatePreviewProps> = ({ certificate, language }) => {
  const isTamil = language === 'ta';
  const t = getTranslation(language).progress.certificates;

  return (
    <View style={styles.outerBorder}>
      <View style={styles.innerBorder}>
        <View style={styles.paper} accessible accessibilityLabel={`${t.title} — ${certificate.title[language]}`}>
          {/* Institution header */}
          <Text style={styles.institution}>VIGYAANXPO</Text>
          <View style={styles.goldRule} />
          <Text style={styles.department}>{isTamil ? t.signature : 'R.M.K. Group of Institutions'}</Text>

          {/* Body */}
          <Text style={styles.certificateTitle}>{t.achievement.toUpperCase()}</Text>
          <Text style={styles.certificateHeading}>{t.title}</Text>
          <Text style={styles.certificateOf}>CERTIFICATE OF ACHIEVEMENT</Text>

          <Text style={styles.issuedTo}>{t.issuedTo.toUpperCase()}</Text>
          <Text style={styles.studentName}>{certificate.recipientName}</Text>

          <Text style={styles.achievementLine}>
            {isTamil ? certificate.title.ta : certificate.title.en}
          </Text>

          {/* Metadata row */}
          <View style={styles.metaRow}>
            <View style={styles.metaItem}>
              <Text style={styles.metaLabel}>{t.grade}</Text>
              <Text style={styles.metaValue}>{certificate.grade}</Text>
            </View>
            <View style={styles.metaItem}>
              <Text style={styles.metaLabel}>{t.school}</Text>
              <Text style={styles.metaValue}>{certificate.location}</Text>
            </View>
            <View style={styles.metaItem}>
              <Text style={styles.metaLabel}>{t.dateEarned}</Text>
              <Text style={styles.metaValue}>{formatDate(certificate.dateEarned, isTamil)}</Text>
            </View>
          </View>

          {/* Signature + verification */}
          <View style={styles.bottomRow}>
            <View style={styles.signatureBlock}>
              <View style={styles.signatureLine} />
              <Text style={styles.signatureLabel}>{isTamil ? t.signature : 'Department of Information Technology'}</Text>
            </View>

            <View style={styles.qrBlock}>
              <View style={styles.qrPlaceholder}>
                <View style={styles.qrDot} />
                <View style={styles.qrDot} />
                <View style={styles.qrDot} />
                <View style={styles.qrDot} />
                <View style={styles.qrDot} />
                <View style={styles.qrDot} />
                <View style={styles.qrDot} />
                <View style={styles.qrDot} />
                <View style={styles.qrDot} />
              </View>
              <Text style={styles.qrLabel}>{t.verification.toUpperCase()}</Text>
            </View>
          </View>

          {/* Certificate id */}
          <Text style={styles.certificateId}>
            {t.certificateId}: {certificate.certificateNumber}
          </Text>

          <Text style={styles.demoNote}>{t.demoVerification}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  outerBorder: {
    borderWidth: 3,
    borderColor: theme.colors.navy900,
    borderRadius: theme.borderRadius.lg,
    padding: 5,
    backgroundColor: theme.colors.white,
  },
  innerBorder: {
    borderWidth: 1.5,
    borderColor: '#B45309',
    borderRadius: theme.borderRadius.md,
    padding: 4,
  },
  paper: {
    backgroundColor: theme.colors.pearlWhite,
    borderRadius: theme.borderRadius.sm,
    padding: theme.spacing.xl,
    alignItems: 'center',
  },
  institution: {
    ...theme.typography.h2,
    fontSize: 22,
    fontWeight: '900',
    letterSpacing: 4,
    color: theme.colors.navy900,
  },
  goldRule: {
    width: 90,
    height: 3,
    backgroundColor: '#B45309',
    borderRadius: 2,
    marginVertical: theme.spacing.sm,
  },
  department: {
    ...theme.typography.caption,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.5,
    color: theme.colors.slate500,
    textTransform: 'uppercase',
    marginBottom: theme.spacing.lg,
  },
  certificateTitle: {
    ...theme.typography.overline,
    fontSize: 10,
    letterSpacing: 3,
    color: theme.colors.brandPrimary,
    fontWeight: '800',
  },
  certificateHeading: {
    ...theme.typography.h1,
    fontSize: 22,
    fontWeight: '900',
    color: theme.colors.navy900,
    textAlign: 'center',
    marginTop: 4,
  },
  certificateOf: {
    ...theme.typography.caption,
    fontSize: 11,
    letterSpacing: 2.5,
    color: theme.colors.success,
    fontWeight: '800',
    textTransform: 'uppercase',
    marginTop: 2,
    marginBottom: theme.spacing.lg,
  },
  issuedTo: {
    ...theme.typography.overline,
    fontSize: 9.5,
    letterSpacing: 2,
    color: theme.colors.slate500,
    fontWeight: '700',
  },
  studentName: {
    ...theme.typography.h2,
    fontSize: 22,
    fontWeight: '900',
    color: theme.colors.navy900,
    marginVertical: theme.spacing.sm,
  },
  achievementLine: {
    ...theme.typography.body,
    fontSize: 13.5,
    color: theme.colors.slate600,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: theme.spacing.lg,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignSelf: 'stretch',
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.sm,
    borderWidth: 1,
    borderColor: theme.colors.border,
    paddingVertical: theme.spacing.md,
    marginBottom: theme.spacing.lg,
  },
  metaItem: {
    alignItems: 'center',
    flex: 1,
  },
  metaLabel: {
    ...theme.typography.caption,
    fontSize: 9.5,
    letterSpacing: 1,
    color: theme.colors.slate500,
    fontWeight: '800',
  },
  metaValue: {
    ...theme.typography.caption,
    fontSize: 11.5,
    fontWeight: '700',
    color: theme.colors.navy900,
    marginTop: 2,
    textAlign: 'center',
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    alignSelf: 'stretch',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.md,
  },
  signatureBlock: {
    alignItems: 'center',
    maxWidth: '60%',
  },
  signatureLine: {
    width: 120,
    height: 1.5,
    backgroundColor: theme.colors.navy900,
    marginBottom: 4,
  },
  signatureLabel: {
    ...theme.typography.caption,
    fontSize: 9,
    color: theme.colors.slate500,
    textAlign: 'center',
  },
  qrBlock: {
    alignItems: 'center',
  },
  qrPlaceholder: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: 44,
    height: 44,
    backgroundColor: theme.colors.white,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: 4,
    gap: 3,
  },
  qrDot: {
    width: 8,
    height: 8,
    backgroundColor: theme.colors.navy900,
  },
  qrLabel: {
    ...theme.typography.caption,
    fontSize: 8,
    letterSpacing: 1,
    color: theme.colors.slate500,
    fontWeight: '800',
    marginTop: 4,
  },
  certificateId: {
    ...theme.typography.caption,
    fontSize: 10.5,
    color: theme.colors.navy800,
    fontWeight: '700',
    letterSpacing: 0.5,
    marginTop: theme.spacing.sm,
  },
  demoNote: {
    ...theme.typography.caption,
    fontSize: 9.5,
    color: theme.colors.slate400,
    marginTop: theme.spacing.xs,
    textAlign: 'center',
  },
});