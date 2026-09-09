/**
 * CertificateView Component
 * Full-screen certificate render matching the approved reference design:
 * navy double border, green "CERTIFICATE OF ACHIEVEMENT" heading, recipient
 * name, grade / location / date row, achievements-earned count, two
 * signature blocks, and a QR placeholder.
 * Built entirely with plain Views + StyleSheet (no react-native-svg needed).
 */

import React from 'react';
import { View, Text, StyleSheet, ScrollView, useWindowDimensions } from 'react-native';
import { theme } from '../../theme';
import { SupportedLanguage } from '../../config/i18n';
import { Certificate } from '../../features/certificates';

interface CertificateViewProps {
  certificate: Certificate;
  language?: SupportedLanguage;
  /** Renders a one-line note instead of the layout when export isn't wired. */
  showExportNote?: boolean;
}

const NAVY = '#0F2A4A';
const GREEN = '#1E7A46';

function formatDate(timestamp: number, isTamil: boolean): string {
  const d = new Date(timestamp);
  const day = d.getDate();
  const months = isTamil
    ? ['ஜன', 'பிப்', 'மார்', 'ஏப்', 'மே', 'ஜூன்', 'ஜூலை', 'ஆக', 'செப்', 'அக்', 'நவ', 'டிச']
    : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${day} ${months[d.getMonth()]} ${d.getFullYear()}`;
}

export const CertificateView: React.FC<CertificateViewProps> = ({
  certificate,
  language = 'en',
  showExportNote = false,
}) => {
  const isTamil = language === 'ta';
  const { width } = useWindowDimensions();
  const isCompact = width < 360;
  const innerWidth = Math.min(width - (isCompact ? 16 : 48), 620);
  const innerPadding = isCompact ? 12 : 20;

  const title = isTamil ? certificate.title.ta : certificate.title.en;
  const subtitle = isTamil ? certificate.subtitle.ta : certificate.subtitle.en;

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={[styles.scrollContent, isCompact && { paddingVertical: 12, paddingHorizontal: 4 }]}
      showsVerticalScrollIndicator={false}
    >
      {/* Outer navy border */}
      <View
        style={[styles.outerBorder, { width: innerWidth }]}
        accessible={true}
        accessibilityRole="summary"
        accessibilityLabel={
          isTamil
            ? `சான்றிதழ்: ${title}. பெறுநர்: ${certificate.recipientName}. வகுப்பு: ${certificate.grade || 'குறிப்பிடப்படவில்லை'}. தேதி: ${formatDate(certificate.dateEarned, isTamil)}. சான்றிதழ் எண்: ${certificate.certificateNumber}.`
            : `Certificate of Achievement: ${title}. Presented to: ${certificate.recipientName}. Grade: ${certificate.grade || 'N/A'}. Date: ${formatDate(certificate.dateEarned, false)}. Certificate Number: ${certificate.certificateNumber}.`
        }
      >
        {/* Inner gold-ish border */}
        <View style={[styles.innerBorder, { padding: innerPadding }]}>
          <View style={styles.headerRow}>
            <Text style={[styles.medalLeft, isCompact && { fontSize: 20 }]}>🏅</Text>
            <View style={styles.headerTextWrap}>
              <Text style={[styles.institutionLine, isCompact && { fontSize: 8.5 }]}>
                {isTamil
                  ? 'ஆர்.எம்.கே கல்வி நிறுவனங்கள் · விஞ்ஞான் அறிவியல் களம்'
                  : 'R.M.K. GROUP OF INSTITUTIONS · VIGYAAN SCIENCE PLATFORM'}
              </Text>
              <Text style={[styles.certHeading, isCompact && { fontSize: 13.5, letterSpacing: 0.8 }]}>
                CERTIFICATE OF ACHIEVEMENT
              </Text>
              <Text style={[styles.certHeadingTa, isCompact && { fontSize: 10.5 }]}>
                சிறப்புச் சான்றிதழ்
              </Text>
            </View>
            <Text style={[styles.medalRight, isCompact && { fontSize: 20 }]}>🎓</Text>
          </View>

          {/* Divider */}
          <View style={styles.divider} />

          {/* This is to certify that */}
          <Text style={styles.certifiesLine}>
            {isTamil
              ? 'இதன் மூலம் சான்றளிக்கப்படுகிறது'
              : 'This is to certify that'}
          </Text>

          {/* Recipient name */}
          <Text style={[styles.recipientName, isCompact && { fontSize: 20 }]}>
            {certificate.recipientName}
          </Text>

          {/* Subtitle */}
          <Text style={styles.subtitle}>{subtitle}</Text>
          <Text style={[styles.titleLine, isCompact && { fontSize: 13 }]}>{title}</Text>

          {/* Grade / Location / Date row */}
          <View style={styles.metaRow}>
            <View style={styles.metaItem}>
              <Text style={styles.metaLabel}>{isTamil ? 'வகுப்பு' : 'GRADE'}</Text>
              <Text style={styles.metaValue}>{certificate.grade || '—'}</Text>
            </View>
            <View style={styles.metaItem}>
              <Text style={styles.metaLabel}>{isTamil ? 'இடம்' : 'LOCATION'}</Text>
              <Text style={styles.metaValue}>{certificate.location || '—'}</Text>
            </View>
            <View style={styles.metaItem}>
              <Text style={styles.metaLabel}>{isTamil ? 'தேதி' : 'DATE'}</Text>
              <Text style={styles.metaValue}>{formatDate(certificate.dateEarned, isTamil)}</Text>
            </View>
          </View>

          {/* Achievements count */}
          <View style={styles.achievementsPill}>
            <Text style={styles.achievementsPillText}>
              {certificate.achievementsCount}{' '}
              {isTamil ? 'சாதனைகள் திறக்கப்பட்டன' : 'ACHIEVEMENTS UNLOCKED'}
            </Text>
          </View>

          {/* Signature blocks */}
          <View style={styles.signatureRow}>
            <View style={styles.signatureBlock}>
              <View style={styles.signatureLine} />
              <Text style={[styles.signatureLabel, isCompact && { fontSize: 8.5 }]}>
                {isTamil ? 'ஆசிரியர் கையெழுத்து' : 'Teacher Signature'}
              </Text>
            </View>
            <View style={[styles.qrPlaceholder, isCompact && { width: 44, height: 44 }]}>
              <Text style={[styles.qrIcon, isCompact && { fontSize: 18, lineHeight: 20 }]}>▦</Text>
              <Text style={[styles.qrLabel, isCompact && { fontSize: 6.5 }]}>
                {isTamil ? 'QR' : 'VERIFY'}
              </Text>
            </View>
            <View style={styles.signatureBlock}>
              <View style={styles.signatureLine} />
              <Text style={[styles.signatureLabel, isCompact && { fontSize: 8.5 }]}>
                {isTamil ? 'முதல்வர் கையெழுத்து' : 'Principal Signature'}
              </Text>
            </View>
          </View>

          {/* Certificate number */}
          <Text style={styles.certNumber}>{certificate.certificateNumber}</Text>
        </View>
      </View>

      {showExportNote && (
        <Text style={styles.exportNote}>
          {isTamil
            ? 'குறிப்பு: படமாகச் சேமித்து/பகிரும் வசதி விரைவில் சேர்க்கப்படும்.'
            : 'Note: Save/share to image is a follow-up feature.'}
        </Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.pearlWhite,
  },
  scrollContent: {
    alignItems: 'center',
    paddingVertical: 24,
    paddingHorizontal: 8,
  },
  outerBorder: {
    borderWidth: 4,
    borderColor: NAVY,
    borderRadius: 14,
    padding: 8,
    backgroundColor: theme.colors.white,
  },
  innerBorder: {
    borderWidth: 2,
    borderColor: '#C9A227',
    borderRadius: 8,
    padding: 20,
    alignItems: 'center',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 6,
  },
  medalLeft: {
    fontSize: 26,
  },
  medalRight: {
    fontSize: 26,
  },
  headerTextWrap: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 6,
  },
  institutionLine: {
    fontSize: 9.5,
    fontWeight: '700',
    color: NAVY,
    letterSpacing: 0.6,
    textAlign: 'center',
    marginBottom: 4,
  },
  certHeading: {
    fontSize: 17,
    fontWeight: '900',
    color: GREEN,
    letterSpacing: 1.4,
    textAlign: 'center',
  },
  certHeadingTa: {
    fontSize: 12,
    fontWeight: '800',
    color: NAVY,
    letterSpacing: 0.8,
    textAlign: 'center',
    marginTop: 2,
  },
  divider: {
    width: '100%',
    height: 2,
    backgroundColor: '#C9A227',
    marginVertical: 12,
  },
  certifiesLine: {
    fontSize: 12,
    fontWeight: '600',
    color: theme.colors.slate600,
    letterSpacing: 0.4,
    marginBottom: 6,
  },
  recipientName: {
    fontSize: 26,
    fontWeight: '900',
    color: NAVY,
    textAlign: 'center',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 12.5,
    color: theme.colors.slate600,
    textAlign: 'center',
    lineHeight: 18,
  },
  titleLine: {
    fontSize: 15,
    fontWeight: '800',
    color: GREEN,
    textAlign: 'center',
    marginTop: 4,
    marginBottom: 14,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 12,
  },
  metaItem: {
    flex: 1,
    alignItems: 'center',
  },
  metaLabel: {
    fontSize: 8.5,
    fontWeight: '800',
    color: theme.colors.slate500,
    letterSpacing: 0.8,
    marginBottom: 2,
  },
  metaValue: {
    fontSize: 11.5,
    fontWeight: '700',
    color: NAVY,
    textAlign: 'center',
  },
  achievementsPill: {
    backgroundColor: '#E6F7F0',
    borderWidth: 1,
    borderColor: '#BEEBD7',
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 5,
    marginBottom: 16,
  },
  achievementsPillText: {
    fontSize: 10.5,
    fontWeight: '800',
    color: GREEN,
    letterSpacing: 0.5,
  },
  signatureRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 10,
  },
  signatureBlock: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  signatureLine: {
    width: '90%',
    height: 1.5,
    backgroundColor: NAVY,
    marginBottom: 5,
  },
  signatureLabel: {
    fontSize: 9.5,
    fontWeight: '700',
    color: theme.colors.slate600,
    textAlign: 'center',
  },
  qrPlaceholder: {
    width: 52,
    height: 52,
    borderWidth: 1.5,
    borderColor: NAVY,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.white,
  },
  qrIcon: {
    fontSize: 22,
    color: NAVY,
    lineHeight: 24,
  },
  qrLabel: {
    fontSize: 7,
    fontWeight: '800',
    color: NAVY,
    letterSpacing: 0.6,
  },
  certNumber: {
    fontSize: 9.5,
    fontWeight: '700',
    color: theme.colors.slate500,
    letterSpacing: 1,
    marginTop: 4,
  },
  exportNote: {
    marginTop: 16,
    fontSize: 12,
    color: theme.colors.slate500,
    textAlign: 'center',
    paddingHorizontal: 24,
  },
});