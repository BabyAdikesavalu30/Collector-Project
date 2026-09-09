/**
 * PassportSections — Feature section cards showing badges, collections,
 * experiments, lessons, and other passport areas with links to their respective screens.
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { theme } from '../../theme';
import { SupportedLanguage } from '../../config/i18n';
import { PassportActivityStats, PassportFeatureCounts } from '../../features/science-passport';
import { Certificate } from '../../features/certificates';

interface PassportSectionsProps {
  activityStats: PassportActivityStats;
  featureCounts: PassportFeatureCounts;
  latestCertificate: Certificate | null;
  language: SupportedLanguage;
  onNavigate?: (route: string) => void;
}

interface SectionCardProps {
  icon: string;
  title: { en: string; ta: string };
  stat: string;
  subtitle?: string;
  ctaLabel: { en: string; ta: string };
  route: string;
  language: SupportedLanguage;
  onNavigate?: (route: string) => void;
  accentColor?: string;
}

const SectionCard: React.FC<SectionCardProps> = ({
  icon,
  title,
  stat,
  subtitle,
  ctaLabel,
  route,
  language,
  onNavigate,
  accentColor,
}) => {
  const isTamil = language === 'ta';
  const titleText = isTamil ? title.ta : title.en;
  const ctaText = isTamil ? ctaLabel.ta : ctaLabel.en;
  const accessibleLabel = `${titleText}, ${stat}${subtitle ? `, ${subtitle}` : ''}. ${ctaText}`;

  return (
    <TouchableOpacity
      style={styles.sectionCard}
      onPress={() => onNavigate?.(route)}
      activeOpacity={0.75}
      accessible={true}
      accessibilityRole="button"
      accessibilityLabel={accessibleLabel}
      accessibilityHint={isTamil ? `${titleText} பகுதிக்குச் செல்லும்` : `Navigates to ${titleText}`}
    >
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionIcon}>{icon}</Text>
        <View style={styles.sectionTitleGroup}>
          <Text style={styles.sectionTitle}>{titleText}</Text>
          <Text style={[styles.sectionStat, accentColor && { color: accentColor }]}>{stat}</Text>
        </View>
      </View>
      {subtitle && (
        <Text style={styles.sectionSubtitle} numberOfLines={1}>
          {subtitle}
        </Text>
      )}
      <Text style={styles.sectionCta}>{ctaText} →</Text>
    </TouchableOpacity>
  );
};

export const PassportSections: React.FC<PassportSectionsProps> = ({
  activityStats,
  featureCounts,
  latestCertificate,
  language,
  onNavigate,
}) => {
  const isTamil = language === 'ta';

  const sections: Array<{
    icon: string;
    title: { en: string; ta: string };
    stat: string;
    ctaLabel: { en: string; ta: string };
    route: string;
    accentColor?: string;
  }> = [];

  // Badges section
  sections.push({
    icon: '🏅',
    title: { en: 'BADGES', ta: 'சாதனைகள்' },
    stat: `${featureCounts.badges.earned} / ${featureCounts.badges.total}`,
    ctaLabel: { en: 'View All', ta: 'அனைத்தையும் காண்க' },
    route: '/achievements',
    accentColor: theme.colors.purple600,
  });

  // Collections section
  sections.push({
    icon: '📦',
    title: { en: 'SCIENCE COLLECTIONS', ta: 'அறிவியல் தொகுப்புகள்' },
    stat: `${featureCounts.collections.completed} / ${featureCounts.collections.total} ${isTamil ? 'நிறைவடைந்தது' : 'complete'}`,
    ctaLabel: { en: 'Explore', ta: 'ஆராயுங்கள்' },
    route: '/explore',
  });

  // Experiments
  sections.push({
    icon: '🧪',
    title: { en: 'EXPERIMENTS', ta: 'சோதனைகள்' },
    stat: activityStats.experimentsCompleted > 0
      ? `${activityStats.experimentsCompleted} ${isTamil ? 'நிறைவடைந்தது' : 'completed'}`
      : isTamil ? 'இன்னும் தொடங்கவில்லை' : 'Not started yet',
    ctaLabel: { en: 'Explore Lab', ta: 'ஆய்வகத்தை ஆராயுங்கள்' },
    route: '/experiment-lab',
    accentColor: theme.colors.green600,
  });

  // Micro Lessons
  sections.push({
    icon: '📖',
    title: { en: 'QUICK LESSONS', ta: 'விரைவு பாடங்கள்' },
    stat: activityStats.microLessonsCompleted > 0
      ? `${activityStats.microLessonsCompleted} ${isTamil ? 'நிறைவடைந்தது' : 'completed'}`
      : isTamil ? 'இன்னும் தொடங்கவில்லை' : 'Not started yet',
    ctaLabel: { en: 'Continue Learning', ta: 'கற்றலைத் தொடருங்கள்' },
    route: '/micro-lessons',
  });

  // Concept Maps
  sections.push({
    icon: '🗺️',
    title: { en: 'CONCEPT MAPS', ta: 'கருத்து வரைபடங்கள்' },
    stat: activityStats.conceptMapsCompleted > 0
      ? `${activityStats.conceptMapsCompleted} ${isTamil ? 'நிறைவடைந்தது' : 'completed'}`
      : isTamil ? 'இன்னும் தொடங்கவில்லை' : 'Not started yet',
    ctaLabel: { en: 'Explore Maps', ta: 'வரைபடங்களை ஆராயுங்கள்' },
    route: '/concept-maps',
  });

  // Mystery Lab
  sections.push({
    icon: '🕵️',
    title: { en: 'MYSTERY LAB', ta: 'மர்ம ஆய்வகம்' },
    stat: activityStats.mysteriesSolved > 0
      ? `${activityStats.mysteriesSolved} ${isTamil ? 'வழக்குகள் தீர்க்கப்பட்டன' : 'cases solved'}`
      : isTamil ? 'இன்னும் தொடங்கவில்லை' : 'Not started yet',
    ctaLabel: { en: 'Investigate More', ta: 'மேலும் விசாரியுங்கள்' },
    route: '/mystery-lab',
  });

  // Riddles
  sections.push({
    icon: '🧩',
    title: { en: 'RIDDLES', ta: 'புதிர்கள்' },
    stat: activityStats.riddlesSolved > 0
      ? `${activityStats.riddlesSolved} ${isTamil ? 'தீர்க்கப்பட்டது' : 'solved'}`
      : isTamil ? 'இன்னும் தொடங்கவில்லை' : 'Not started yet',
    ctaLabel: { en: 'Keep Solving', ta: 'தொடர்ந்து தீர்க்கவும்' },
    route: '/riddles',
  });

  // Games
  sections.push({
    icon: '🎮',
    title: { en: 'GAMES', ta: 'ஆட்டங்கள்' },
    stat: activityStats.gamesCompleted > 0
      ? `${activityStats.gamesCompleted} ${isTamil ? 'நிலைகள் நிறைவடைந்தன' : 'levels completed'}`
      : isTamil ? 'இன்னும் தொடங்கவில்லை' : 'Not started yet',
    ctaLabel: { en: 'Play', ta: 'விளையாடுங்கள்' },
    route: '/games',
    accentColor: theme.colors.blue600,
  });

  // Certificates (show even if 0 — with empty state)
  const certStat = latestCertificate
    ? `${featureCounts.certificates.earned} ${isTamil ? 'பெறப்பட்டது' : 'earned'}`
    : isTamil ? 'சான்றிதழ் இன்னும் பெறப்படவில்லை' : 'No certificates yet';
  const certSubtitle = latestCertificate
    ? isTamil ? latestCertificate.title.ta : latestCertificate.title.en
    : isTamil ? 'முதல் சான்றிதழ் இங்கே தோன்றும்' : 'Your first certificate will appear here when you earn one.';

  sections.push({
    icon: '📜',
    title: { en: 'CERTIFICATES', ta: 'சான்றிதழ்கள்' },
    stat: certStat,
    ctaLabel: { en: 'View Certificates', ta: 'சான்றிதழ்களைக் காண்க' },
    route: '/certificates',
  });

  return (
    <View style={styles.container}>
      {sections.map((section) => (
        <SectionCard
          key={section.title.en}
          {...section}
          subtitle={section.title.en === 'CERTIFICATES' ? certSubtitle : undefined}
          language={language}
          onNavigate={onNavigate}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: theme.spacing.sm,
    marginBottom: theme.spacing.md,
  },
  sectionCard: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: theme.spacing.base,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionIcon: {
    fontSize: 22,
    marginRight: 12,
  },
  sectionTitleGroup: {
    flex: 1,
  },
  sectionTitle: {
    ...theme.typography.caption,
    fontSize: 11,
    fontWeight: '800',
    color: theme.colors.navy900,
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },
  sectionStat: {
    ...theme.typography.body,
    fontSize: 15,
    fontWeight: '700',
    color: theme.colors.navy800,
    marginTop: 2,
  },
  sectionSubtitle: {
    ...theme.typography.caption,
    fontSize: 12,
    color: theme.colors.slate600,
    marginTop: 4,
    marginLeft: 34,
  },
  sectionCta: {
    ...theme.typography.body,
    fontSize: 13,
    fontWeight: '600',
    color: theme.colors.textAction,
    marginTop: 8,
    marginLeft: 34,
  },
});
