/**
 * ProfileCompletionScreen Component (Screen 15 — Profile Completion & Success)
 * Final step of 3-step profile onboarding.
 * Clean Pearl White & White card layout with celebration badge and "Get Started →" CTA.
 */

import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { theme } from '../../theme';
import { SupportedLanguage, getTranslation } from '../../config/i18n';
import { SCIENCE_AVATARS } from './AvatarPicker';

export interface CompleteStudentProfile {
  avatarId: string;
  fullName: string;
  school: string;
  grade: string;
  district: string;
  section: string;
  preferredLanguage: SupportedLanguage;
}

interface ProfileCompletionScreenProps {
  language?: SupportedLanguage;
  profile: CompleteStudentProfile;
  onGetStarted: () => void;
}

export const ProfileCompletionScreen: React.FC<ProfileCompletionScreenProps> = ({
  language = 'en',
  profile,
  onGetStarted,
}) => {
  const insets = useSafeAreaInsets();
  const t = getTranslation(language).profileComplete;
  const isTamil = language === 'ta';

  const avatar = SCIENCE_AVATARS.find((a) => a.id === profile.avatarId) || SCIENCE_AVATARS[0];

  return (
    <View style={styles.container}>
      <StatusBar style="dark" translucent backgroundColor="transparent" />

      <ScrollView
        style={styles.scrollBody}
        contentContainerStyle={[
          styles.scrollContent,
          {
            paddingTop: Math.max(insets.top + 16, 28),
            paddingBottom: Math.max(insets.bottom + 24, 32),
          },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Step Badge */}
        <View style={styles.stepBadge}>
          <Text style={styles.stepText}>{t.step}</Text>
        </View>

        {/* Header Celebration Title */}
        <View style={styles.headerContainer}>
          <View style={styles.badgePill}>
            <View style={styles.badgeDot} />
            <Text style={styles.badgeText}>{t.badge}</Text>
          </View>
          <Text style={styles.title}>{t.title}</Text>
          {isTamil && <Text style={styles.tamilTitle}>{t.tamilTitle}</Text>}
          <Text style={styles.subtitle}>{t.subtitle}</Text>
        </View>

        {/* Student Passport Summary Card */}
        <View style={styles.passportCard}>
          <View style={styles.passportHeader}>
            <Text style={styles.passportHeading}>{t.summaryCardTitle}</Text>
            <View style={styles.verifiedPill}>
              <Text style={styles.verifiedText}>✓ VERIFIED</Text>
            </View>
          </View>

          {/* Avatar & Name Row */}
          <View style={styles.identityRow}>
            <View style={[styles.avatarCircle, { backgroundColor: avatar.bgColor }]}>
              <Text style={styles.avatarEmoji}>{avatar.emoji}</Text>
            </View>
            <View style={styles.nameBlock}>
              <Text style={styles.studentName} numberOfLines={1}>
                {profile.fullName || 'Vigyaan Achiever'}
              </Text>
              <Text style={styles.avatarRole}>
                {isTamil ? avatar.nameTa : avatar.nameEn}
              </Text>
            </View>
          </View>

          <View style={styles.divider} />

          {/* Academic Meta Grid */}
          <View style={styles.metaGrid}>
            <View style={styles.metaItem}>
              <Text style={styles.metaLabel}>{isTamil ? 'வகுப்பு & பிரிவு' : 'Class & Section'}</Text>
              <Text style={styles.metaValue}>
                {profile.grade} • Sec {profile.section}
              </Text>
            </View>

            <View style={styles.metaItem}>
              <Text style={styles.metaLabel}>{isTamil ? 'மாவட்டம்' : 'District'}</Text>
              <Text style={styles.metaValue}>{profile.district}</Text>
            </View>

            <View style={styles.metaItem}>
              <Text style={styles.metaLabel}>{isTamil ? 'பள்ளி' : 'School'}</Text>
              <Text style={styles.metaValue} numberOfLines={1}>
                {profile.school}
              </Text>
            </View>

            <View style={styles.metaItem}>
              <Text style={styles.metaLabel}>{isTamil ? 'வினாடி வினா மொழி' : 'Quiz Language'}</Text>
              <Text style={styles.metaValue}>
                {profile.preferredLanguage === 'ta' ? 'தமிழ் (Tamil)' : 'English'}
              </Text>
            </View>
          </View>
        </View>

        {/* Starter Bonus Celebration Card */}
        <View style={styles.bonusCard}>
          <Text style={styles.bonusIcon}>🎁</Text>
          <View style={styles.bonusContent}>
            <Text style={styles.bonusTitle}>{t.starterBonus}</Text>
            <Text style={styles.bonusDesc}>{t.starterBonusDesc}</Text>
          </View>
        </View>

        {/* Get Started CTA */}
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={onGetStarted}
          activeOpacity={0.85}
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel={t.getStarted}
          accessibilityHint={t.accessibility.getStartedHint}
        >
          <Text style={styles.primaryButtonText}>{t.getStarted}</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.pearlWhite,
  },
  scrollBody: {
    flex: 1,
  },
  scrollContent: {
    alignItems: 'center',
    paddingHorizontal: theme.spacing.base,
  },
  stepBadge: {
    backgroundColor: theme.colors.green50,
    borderWidth: 1,
    borderColor: theme.colors.green200,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: theme.borderRadius.full,
    marginBottom: theme.spacing.xs,
  },
  stepText: {
    ...theme.typography.caption,
    fontSize: 12,
    fontWeight: '800',
    color: theme.colors.success,
  },
  headerContainer: {
    alignItems: 'center',
    marginVertical: theme.spacing.sm,
  },
  badgePill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.purple100,
    borderWidth: 1,
    borderColor: theme.colors.purple200,
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: theme.borderRadius.full,
    marginBottom: theme.spacing.xs,
  },
  badgeDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: theme.colors.brandPrimary,
    marginRight: 6,
  },
  badgeText: {
    ...theme.typography.overline,
    fontSize: 9.5,
    color: theme.colors.brandPrimary,
    letterSpacing: 1.2,
    fontWeight: '700',
  },
  title: {
    ...theme.typography.h1,
    fontSize: 26,
    lineHeight: 34,
    color: theme.colors.navy900,
    textAlign: 'center',
    marginBottom: 2,
  },
  tamilTitle: {
    ...theme.typography.tamilSubtitle,
    color: theme.colors.brandPrimary,
    textAlign: 'center',
    marginBottom: 4,
    fontSize: 14,
  },
  subtitle: {
    ...theme.typography.body,
    fontSize: 13.5,
    color: theme.colors.slate600,
    textAlign: 'center',
    maxWidth: 300,
  },
  passportCard: {
    width: '100%',
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1.5,
    borderColor: theme.colors.border,
    padding: theme.spacing.base,
    marginVertical: theme.spacing.sm,
    shadowColor: theme.colors.navy900,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  passportHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.sm,
  },
  passportHeading: {
    ...theme.typography.overline,
    fontSize: 10,
    fontWeight: '800',
    color: theme.colors.brandPrimary,
    letterSpacing: 1.2,
  },
  verifiedPill: {
    backgroundColor: theme.colors.green50,
    borderWidth: 1,
    borderColor: theme.colors.green200,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: theme.borderRadius.full,
  },
  verifiedText: {
    ...theme.typography.caption,
    fontSize: 10,
    fontWeight: '800',
    color: theme.colors.success,
  },
  identityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  avatarCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    borderWidth: 2,
    borderColor: theme.colors.purple200,
  },
  avatarEmoji: {
    fontSize: 28,
  },
  nameBlock: {
    flex: 1,
  },
  studentName: {
    ...theme.typography.h3,
    fontSize: 18,
    fontWeight: '800',
    color: theme.colors.navy900,
  },
  avatarRole: {
    ...theme.typography.caption,
    fontSize: 12,
    color: theme.colors.brandPrimary,
    fontWeight: '700',
    marginTop: 2,
  },
  divider: {
    height: 1,
    backgroundColor: theme.colors.divider,
    marginVertical: theme.spacing.sm,
  },
  metaGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 10,
  },
  metaItem: {
    width: '48%',
  },
  metaLabel: {
    ...theme.typography.caption,
    fontSize: 11,
    color: theme.colors.slate500,
    marginBottom: 2,
  },
  metaValue: {
    ...theme.typography.body,
    fontSize: 13,
    fontWeight: '700',
    color: theme.colors.navy900,
  },
  bonusCard: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.purple50,
    borderWidth: 1,
    borderColor: theme.colors.purple200,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.sm,
    marginVertical: theme.spacing.xs,
  },
  bonusIcon: {
    fontSize: 24,
    marginRight: 10,
  },
  bonusContent: {
    flex: 1,
  },
  bonusTitle: {
    ...theme.typography.caption,
    fontSize: 12.5,
    fontWeight: '800',
    color: theme.colors.brandPrimary,
    letterSpacing: 0.5,
  },
  bonusDesc: {
    ...theme.typography.caption,
    fontSize: 11,
    color: theme.colors.slate600,
    marginTop: 1,
  },
  primaryButton: {
    width: '100%',
    height: 52,
    backgroundColor: theme.colors.actionPrimary,
    borderRadius: theme.borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: theme.colors.actionPrimary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 3,
    marginTop: theme.spacing.md,
  },
  primaryButtonText: {
    ...theme.typography.button,
    color: theme.colors.textOnAction,
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
});
