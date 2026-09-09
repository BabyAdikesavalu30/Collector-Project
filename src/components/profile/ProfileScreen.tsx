/**
 * ProfileScreen — Student Profile 2.0
 * The student's science identity center: header, science identity card,
 * activity summary, science strengths, recognition, recent activity,
 * and the account area. Preserves the canonical back button and the
 * four-tab AppShell navigation.
 */

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { theme } from '../../theme';
import { SupportedLanguage, getTranslation } from '../../config/i18n';
import { ProfileViewData } from '../../features/profile';
import { focusAreaService } from '../../features/weak-areas';
import { ScreenHeader, LoadingState } from '../shared';
import { ProfileHeaderCard } from './ProfileHeaderCard';
import { ScienceIdentityCard } from './ScienceIdentityCard';
import { ActivitySummaryCard } from './ActivitySummaryCard';
import { ScienceStrengthsCard } from './ScienceStrengthsCard';
import { RecognitionCard } from './RecognitionCard';
import { RecentActivityCard } from './RecentActivityCard';

export interface ProfileMenuEntry {
  key: string;
  icon: string;
  label: string;
  subtitle: string;
  route: string;
  destructive?: boolean;
}

interface ProfileScreenProps {
  language: SupportedLanguage;
  data: ProfileViewData | null;
  isLoading: boolean;
  unreadNotifications: number;
  onBack: () => void;
  onNavigate: (route: string) => void;
  onLogout: () => void;
}

const ACCOUNT_ROWS: Array<{ key: string; icon: string; labelKey: 'editProfile' | 'language' | 'notifications' | 'settings' | 'security' | 'legal'; subtitleKey: string; route: string }> = [
  { key: 'edit', icon: '👤', labelKey: 'editProfile', subtitleKey: 'profile-edit-sub', route: '/settings' },
  { key: 'language', icon: '🌐', labelKey: 'language', subtitleKey: 'profile-lang-sub', route: '/language' },
  { key: 'notifications', icon: '🔔', labelKey: 'notifications', subtitleKey: 'profile-notif-sub', route: '/notifications' },
  { key: 'settings', icon: '⚙️', labelKey: 'settings', subtitleKey: 'profile-settings-sub', route: '/settings' },
  { key: 'security', icon: '🔒', labelKey: 'security', subtitleKey: 'profile-security-sub', route: '/account-security' },
  { key: 'legal', icon: '📜', labelKey: 'legal', subtitleKey: 'profile-legal-sub', route: '/terms' },
];

const SUBTITLES: Record<string, string> = {
  'profile-edit-sub': 'Profile & academic details',
  'profile-edit-sub-ta': 'சுயவிவரம் & கல்வி விவரங்கள்',
  'profile-lang-sub': 'English / தமிழ்',
  'profile-lang-sub-ta': 'English / தமிழ்',
  'profile-notif-sub': 'In-app updates',
  'profile-notif-sub-ta': 'இன்-ஆப் புதுப்பிப்புகள்',
  'profile-settings-sub': 'Preferences & account',
  'profile-settings-sub-ta': 'விருப்பத்தேர்வுகள் & கணக்கு',
  'profile-security-sub': 'Password & security',
  'profile-security-sub-ta': 'கடவுச்சொல் & பாதுகாப்பு',
  'profile-legal-sub': 'Terms, privacy & info',
  'profile-legal-sub-ta': 'விதிமுறைகள், தனியுரிமை & தகவல்',
};

export const ProfileScreen: React.FC<ProfileScreenProps> = ({
  language,
  data,
  isLoading,
  unreadNotifications,
  onBack,
  onNavigate,
  onLogout,
}) => {
  const insets = useSafeAreaInsets();
  const t = getTranslation(language).progress.profile;
  const isTamil = language === 'ta';
  const [focusAreasCount, setFocusAreasCount] = useState<number | null>(null);

  useEffect(() => {
    focusAreaService
      .getFocusAreasSnapshot()
      .then((snap) => setFocusAreasCount(snap.focusAreas.length))
      .catch(() => {});
  }, []);

  const accountRows = ACCOUNT_ROWS.map((row) => ({
    ...row,
    label: t[row.labelKey],
    subtitle: SUBTITLES[isTamil ? `${row.subtitleKey}-ta` : row.subtitleKey] || SUBTITLES[row.subtitleKey],
  }));

  return (
    <View style={styles.container}>
      <StatusBar style="dark" translucent backgroundColor="transparent" />
      <ScreenHeader title={t.title} language={language} onBack={onBack} />

      {isLoading && !data ? (
        <LoadingState rows={4} />
      ) : (
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={[
            styles.content,
            { paddingBottom: Math.max(insets.bottom + 24, 32) },
          ]}
          showsVerticalScrollIndicator={false}
        >
          {data ? (
            <>
              <ProfileHeaderCard
                name={data.profile.name}
                grade={data.profile.grade}
                section={data.profile.section}
                school={data.profile.school}
                initials={data.profile.initials}
                unreadNotifications={unreadNotifications}
                language={language}
                onNotificationsPress={() => onNavigate('/notifications')}
              />

              <ScienceIdentityCard
                level={data.level}
                totalXp={data.totalXp}
                streak={data.streak}
                language={language}
                onOpenRewards={() => onNavigate('/rewards')}
                onOpenStreak={() => onNavigate('/streak')}
              />

              {/* Quick progression shortcuts */}
              <View style={styles.quickRow}>
                {[
                  { key: 'rewards', icon: '🏆', label: t.rewards, route: '/rewards' },
                  { key: 'explore', icon: '🧭', label: t.explore, route: '/explore' },
                  { key: 'search', icon: '🔍', label: t.search, route: '/search' },
                  { key: 'leaderboard', icon: '📊', label: t.leaderboard, route: '/leaderboard' },
                ].map((item) => (
                  <TouchableOpacity
                    key={item.key}
                    style={styles.quickItem}
                    onPress={() => onNavigate(item.route)}
                    accessibilityRole="button"
                    accessibilityLabel={item.label}
                  >
                    <Text style={styles.quickIcon}>{item.icon}</Text>
                    <Text style={styles.quickLabel} numberOfLines={1}>
                      {item.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <ActivitySummaryCard summary={data.activitySummary} language={language} />
              <ScienceStrengthsCard strengths={data.strengths} language={language} />
              <RecognitionCard
                recognition={data.recognition}
                language={language}
                onOpenAchievements={() => onNavigate('/achievements')}
                onOpenCertificates={() => onNavigate('/certificates')}
              />
              <RecentActivityCard items={data.recentActivity} language={language} />

              {/* Account area */}
              <Text style={styles.sectionTitle}>{t.accountArea.toUpperCase()}</Text>

              {/* Science Progress 2.0 (Phase 42) */}
              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => onNavigate('/progress')}
                activeOpacity={0.75}
                accessibilityRole="button"
                accessibilityLabel={
                  isTamil ? 'அறிவியல் முன்னேற்றம்: பாட வாரியான கற்றல் பயணம்' : 'Science Progress: Subject-wise learning journey'
                }
              >
                <Text style={styles.menuIcon}>📈</Text>
                <View style={styles.menuContent}>
                  <Text style={styles.menuLabel}>
                    {isTamil ? 'அறிவியல் முன்னேற்றம்' : 'Science Progress'}
                  </Text>
                  <Text style={styles.menuSub}>
                    {isTamil
                      ? 'பாட வாரியான கற்றல் பயணம் மற்றும் சாதனைகள்'
                      : 'Subject journey, topic coverage & achievements'}
                  </Text>
                </View>
                <Text style={styles.menuChevron}>›</Text>
              </TouchableOpacity>

              {/* Focus Areas (Phase 41) */}
              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => onNavigate('/weak-areas')}
                activeOpacity={0.75}
                accessibilityRole="button"
                accessibilityLabel={
                  isTamil
                    ? `கவனம் செலுத்த வேண்டிய பகுதிகள்: ${focusAreasCount !== null && focusAreasCount > 0 ? `${focusAreasCount} தலைப்புகள்` : 'பயிற்சிப் பரிந்துரைகள்'}`
                    : `Focus Areas: ${focusAreasCount !== null && focusAreasCount > 0 ? `${focusAreasCount} topics to strengthen` : 'Practice suggestions'}`
                }
              >
                <Text style={styles.menuIcon}>🎯</Text>
                <View style={styles.menuContent}>
                  <Text style={styles.menuLabel}>
                    {isTamil ? 'கவனம் செலுத்த வேண்டிய பகுதிகள்' : 'Focus Areas'}
                  </Text>
                  <Text style={styles.menuSub}>
                    {focusAreasCount !== null && focusAreasCount > 0
                      ? isTamil
                        ? `${focusAreasCount} தலைப்புகளை வலுப்படுத்தலாம்`
                        : `${focusAreasCount} topics to strengthen`
                      : isTamil
                        ? 'பயிற்சிப் பரிந்துரைகளைக் காண்க'
                        : 'Practice suggestions based on activity'}
                  </Text>
                </View>
                <Text style={styles.menuChevron}>›</Text>
              </TouchableOpacity>

              {/* Streak & Activity Calendar (Phase 43) */}
              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => onNavigate('/streak')}
                activeOpacity={0.75}
                accessibilityRole="button"
                accessibilityLabel={
                  isTamil
                    ? `தொடர்ச்சி & நாட்காட்டி: ${data.streak.currentStreak} நாள் தொடர்ச்சி`
                    : `Streak & Activity Calendar: ${data.streak.currentStreak} day streak`
                }
              >
                <Text style={styles.menuIcon}>🔥</Text>
                <View style={styles.menuContent}>
                  <Text style={styles.menuLabel}>
                    {isTamil ? 'தொடர்ச்சி & நாட்காட்டி' : 'Streak & Activity Calendar'}
                  </Text>
                  <Text style={styles.menuSub}>
                    {isTamil
                      ? `${data.streak.currentStreak} நாள் தொடர்ச்சி · செயல்பாட்டு நாட்காட்டி`
                      : `${data.streak.currentStreak} day streak · Activity calendar`}
                  </Text>
                </View>
                <Text style={styles.menuChevron}>›</Text>
              </TouchableOpacity>

              {/* Science Passport (Phase 46) */}
              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => onNavigate('/science-passport')}
                activeOpacity={0.75}
                accessibilityRole="button"
                accessibilityLabel={
                  isTamil ? 'அறிவியல் கடவுச்சீட்டு: உங்கள் அறிவியல் பயண அடையாளம்' : 'Science Passport: Your science journey identity'
                }
              >
                <Text style={styles.menuIcon}>📘</Text>
                <View style={styles.menuContent}>
                  <Text style={styles.menuLabel}>
                    {isTamil ? 'அறிவியல் கடவுச்சீட்டு' : 'Science Passport'}
                  </Text>
                  <Text style={styles.menuSub}>
                    {isTamil
                      ? 'உங்கள் அறிவியல் பயண அடையாளம்'
                      : 'Your science journey identity'}
                  </Text>
                </View>
                <Text style={styles.menuChevron}>›</Text>
              </TouchableOpacity>

              {accountRows.map((row) => (
                <TouchableOpacity
                  key={row.key}
                  style={styles.menuItem}
                  onPress={() => onNavigate(row.route)}
                  activeOpacity={0.75}
                  accessibilityRole="button"
                  accessibilityLabel={row.label}
                >
                  <Text style={styles.menuIcon}>{row.icon}</Text>
                  <View style={styles.menuContent}>
                    <Text style={styles.menuLabel}>{row.label}</Text>
                    <Text style={styles.menuSub}>{row.subtitle}</Text>
                  </View>
                  <Text style={styles.menuChevron}>›</Text>
                </TouchableOpacity>
              ))}

              {data.profile.isDemo && (
                <View style={styles.demoBadge} accessible>
                  <Text style={styles.demoBadgeText}>
                    ✨ {getTranslation(language).progress.demoBadge}
                  </Text>
                </View>
              )}

              <TouchableOpacity
                style={styles.logoutButton}
                onPress={onLogout}
                activeOpacity={0.8}
                accessibilityRole="button"
                accessibilityLabel={t.logout}
              >
                <Text style={styles.logoutButtonText}>🚪 {t.logout}</Text>
              </TouchableOpacity>
            </>
          ) : null}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.pearlWhite,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: theme.spacing.base,
  },
  quickRow: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
    marginBottom: theme.spacing.md,
  },
  quickItem: {
    flex: 1,
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    paddingVertical: theme.spacing.md,
    alignItems: 'center',
  },
  quickIcon: {
    fontSize: 20,
    marginBottom: 2,
  },
  quickLabel: {
    ...theme.typography.caption,
    fontSize: 10.5,
    fontWeight: '700',
    color: theme.colors.navy800,
    maxWidth: 80,
  },
  sectionTitle: {
    ...theme.typography.caption,
    fontSize: 12,
    fontWeight: '800',
    color: theme.colors.navy900,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 8,
    marginTop: 6,
  },
  menuItem: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: theme.spacing.base,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  menuIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  menuContent: {
    flex: 1,
  },
  menuLabel: {
    ...theme.typography.body,
    fontSize: 14,
    fontWeight: '700',
    color: theme.colors.navy900,
  },
  menuSub: {
    ...theme.typography.caption,
    fontSize: 11.5,
    color: theme.colors.slate600,
    marginTop: 1,
  },
  menuChevron: {
    fontSize: 18,
    color: theme.colors.slate400,
    fontWeight: '700',
  },
  demoBadge: {
    backgroundColor: theme.colors.purple100,
    borderWidth: 1,
    borderColor: theme.colors.purple200,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: theme.borderRadius.full,
    alignSelf: 'center',
    marginVertical: theme.spacing.sm,
  },
  demoBadgeText: {
    ...theme.typography.overline,
    fontSize: 9.5,
    color: theme.colors.brandPrimary,
    letterSpacing: 1.1,
    fontWeight: '700',
  },
  logoutButton: {
    backgroundColor: theme.colors.errorSurface,
    borderWidth: 1,
    borderColor: theme.colors.errorBorder,
    borderRadius: theme.borderRadius.md,
    paddingVertical: 12,
    alignItems: 'center',
  },
  logoutButtonText: {
    ...theme.typography.button,
    fontSize: 13.5,
    fontWeight: '700',
    color: theme.colors.error,
  },
});